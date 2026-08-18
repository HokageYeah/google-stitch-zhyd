import { cloneDeep } from 'lodash';
import {
  type GetVipInfoApiResultType,
  getVipInfoApi
} from '@/uni-module-common/components/xxt-components/xxt-switch-class/hooks/requestApi';
import event from '@/uni-module-common/utils/eventBus';

/**
 * VIP信息类型
 */
export interface VipInfoType {
  showVip: boolean; // 是否展示VIP内容
  vipOpened: boolean; // 是否已开通VIP
  vipExpireTime: Date | string | null; // VIP过期时间
  payType: number; // 支付方式，1:第三方支付方式、2:运营商订购方式
  orderType: number; // 订购方式，1:第三方支付方式、2:运营商订购方式
}

export interface classListType {
  classId?: string; // 班级id
  className?: string; // 班级名称
  isAdmin?: boolean; // 是否是管理员
  jut?: number; // 用户角色 // 角色 // jxlx身份类型 -1, "网站注册账号" 0, "教师" 1, "学生" 2, "家长" 3, "管理员"  99, "访客（未登录）"
  isBookListing?: boolean; // 是否有图书柜
}
type classListTypeKey = keyof classListType;
// 定义一个索引签名类型
interface SwitchClassObject {
  [key: string]: classListType; // 这里的 key 可以是任意字符串 主要是用户的wid
}
// 默认的选择的班级信息
const defaultSwitchClassInfo: SwitchClassObject = {
  '': {
    classId: '',
    className: '',
    isAdmin: false,
    jut: 0,
    isBookListing: false
  }
};

// 默认VIP信息
const defaultVipInfo: VipInfoType = {
  showVip: false,
  vipOpened: false,
  vipExpireTime: null,
  payType: 0,
  orderType: 0
};

let vipInfoRefreshSeq = 0;

const switchClassInfo = defineStore({
  id: 'switchClassInfo',
  state: () => {
    console.log('initSwitchClassDataList-----store数据---');
    return {
      switchClassInfo: cloneDeep(defaultSwitchClassInfo), // 班级信息
      vipInfo: cloneDeep(defaultVipInfo) // VIP信息
    };
  },
  actions: {
    setSwitchClassInfo(data: any) {
      console.log('initSwitchClassDataList-----setSwitchClassInfo---', data);
      this.switchClassInfo = { ...this.switchClassInfo, ...data };
      // 切换班级后需要对搜索条件初始化，并在内部设置班级id， 需要将事件传递出去
      event.emit('switchClassEvent', data);
    },
    // 设置VIP信息
    setVipInfo(data: VipInfoType) {
      console.log('setVipInfo-----', data);
      this.vipInfo = { ...this.vipInfo, ...data };
    },
    // 重置圈子信息
    resetSwitchClassInfo() {
      this.switchClassInfo = cloneDeep(defaultSwitchClassInfo);
    },
    clearSwitchClassInfoByWid(wid: string | number) {
      if (!wid) {
        return;
      }
      const nextSwitchClassInfo = { ...this.switchClassInfo };
      delete nextSwitchClassInfo[`${wid}`];
      this.switchClassInfo = nextSwitchClassInfo;
    },
    // 重置VIP信息
    resetVipInfo() {
      this.vipInfo = cloneDeep(defaultVipInfo);
    },
    /**
     * 刷新 VIP 状态并写回 store。
     * 该状态由切班入口和支付成功回调共同使用，放在 store 中统一维护，避免多个组件各自处理接口字段和失败重置。
     */
    async refreshVipInfo() {
      const currentSeq = ++vipInfoRefreshSeq;

      try {
        const vipInfo = (await getVipInfoApi()) as GetVipInfoApiResultType;

        // 多次刷新并发时只允许最后一次请求写入，避免旧响应覆盖最新支付状态。
        if (currentSeq !== vipInfoRefreshSeq) {
          return this.vipInfo;
        }

        this.setVipInfo({
          showVip: Boolean(vipInfo.showVip),
          vipOpened: Boolean(vipInfo.vipOpened || vipInfo.vipOpenned),
          vipExpireTime: vipInfo.vipExpireTime || null,
          payType: Number(vipInfo.payType || 0),
          orderType: Number(vipInfo.orderType || 0)
        });
      } catch (error) {
        console.error('刷新VIP信息失败:', error);
        // 只有当前最后一次请求失败时才重置，避免较早失败请求清掉后续成功请求写入的状态。
        if (currentSeq === vipInfoRefreshSeq) {
          this.resetVipInfo();
        }
      }

      return this.vipInfo;
    },
    // 根据wid获取圈子信息，修改圈子信息
    setSwitchClassInfoByWid(wid: string, key: classListTypeKey, value: any) {
      if (this.switchClassInfo[wid]) {
        this.switchClassInfo[wid][key] = value;
      }
    }
    // resetAppConfigData() {
    //   this.appConfig = cloneDeep(appModuleConfig.defalutAppConfig);
    //   console.log('resetAppConfigData-----', this.appConfig);
    //   console.log('resetAppConfigData-----defalutAppConfig---', appModuleConfig.defalutAppConfig);
    // },
  },
  persist: {
    enabled: true,
    H5Storage: window?.localStorage,
    strategies: [
      {
        // 之前的
        // storage: window?.localStorage
        //  存储在本地
        storage: {
          getItem: (key: string) => {
            return uni.getStorageSync(key);
          },
          setItem: (key: string, value: string) => {
            uni.setStorageSync(key, value);
          },
          removeItem: (key: string) => {
            uni.removeStorageSync(key);
          },
          length: 1,
          key: (index: number) => {
            console.log('key--', index);
            return 'switchClassInfo';
          },
          clear: () => {
            uni.clearStorageSync();
          }
        }
        // paths: ['userInfo']
      }
    ]
  }
});
export default switchClassInfo;
