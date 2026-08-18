import useSwitchClassStore from './switchClassStore';
import { getUserAuthGroup } from './requestApi';
const { isLogin, userInfo } = useStore('user');
const switchClassStore = useSwitchClassStore();
export const useWatchSwitchClassHooks = (switchClassInfo: any, callBack: any, userType?: any) => {
  watch(
    [() => switchClassStore.switchClassInfo, () => userInfo.value],
    ([newvalue1, newvalue2], [oldvalue1, oldvalue2]) => {
      console.log('最新的obtainedUserNotice-----homeStore', newvalue1, oldvalue1);
      console.log('最新的app启动信息传递---userInfo---homeStore', newvalue2, oldvalue2);
      const webId = newvalue2?.wid;
      if (userType) {
        userType.value = newvalue2?.jut;
      }
      // 获取图书信息
      if (webId) {
        const newCircleInfo = newvalue1[webId];
        const oldCircleInfo = oldvalue1 && oldvalue1[webId];
        newCircleInfo &&
          console.log('最新的app启动信息传递webId---newHomeStore', newCircleInfo.classId);
        console.log(
          '最新的app启动信息传递webId---oldCircleInfo',
          oldCircleInfo && oldCircleInfo.classId
        );
        switchClassInfo.value = newvalue1[webId] || {};
        console.log('最新的app启动信息传递---userInfo---homeStore.value', switchClassInfo.value);
        if (!oldCircleInfo || oldCircleInfo?.classId !== newCircleInfo?.classId) {
          // 此处判断是在app端从后台切到前台的时候也会走这个监听，此时如果两个值相等，不要触发回调
          // 否则会导致筛选状态重置
          callBack();
        }
      }
    },
    { deep: true, immediate: true }
  );
};

export const switchRulesNewReloadData = async (switchClassStore: any) => {
  // 从circle中获取store
  let storeBooksListingInfo = {};
  if (userInfo.value.wid) {
    storeBooksListingInfo = switchClassStore.switchClassInfo[userInfo!.value!.wid] || {};
  }
  const teacherGroupInfoList: any = await getUserAuthGroup({});
  // 添加防护，确保 groupInfos 存在且是数组
  const classListAry = (teacherGroupInfoList?.groupInfos || []).map((item: any) => ({
    className: item.groupName,
    classId: item.groupId,
    isAdmin: item.admin, // true 管理员 false 非管理员
    isBookListing: item.device, // true有设备false无设备
    groupType: item.groupType // 组织类型
  }));

  let classId = '';
  let isAdmin = false;
  let className = '';
  let isBookListing = false;
  // 如果storeCircleInfo没有值，则说明是第一次初始化
  if (Object.keys(storeBooksListingInfo).length <= 0 && userInfo.value.wid) {
    if (classListAry.length > 0) {
      classId = (classListAry[0].classId || '').toString();
      isAdmin = classListAry[0].isAdmin;
      className = classListAry[0].className;
      isBookListing = classListAry[0].isBookListing;
    }
    const obj: any = {};
    const wid = userInfo.value.wid;
    obj[wid] = {
      classId,
      isAdmin,
      className,
      jut: userInfo.value.jut,
      isBookListing
    };
    // bookListingStore.setBookListingInfo(obj);
    switchClassStore.setSwitchClassInfo(obj);
  }
  console.log('storeBooksListingInfo---ipdate---', switchClassStore.switchClassInfo);
  console.log('storeBooksListingInfo---ipdate-----managerList-----', classListAry);
};
