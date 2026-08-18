import ajax from '@/uni-module-common/http';

/**
 * 用户 VIP 状态接口返回值
 */
export interface GetVipInfoApiResultType {
  showVip: boolean; // 是否展示 VIP 相关内容
  vipOpened: boolean; // 是否已开通 VIP
  vipOpenned?: boolean; // 历史兼容字段，含义同 `vipOpened`
  vipExpireTime: Date | string | null; // VIP 过期时间
  payType: number; // 支付方式，1:第三方支付方式、2:运营商订购方式
  orderType: number; // 订购方式，1:第三方支付方式、2:运营商订购方式
}

/**
 * 获取用户权限班级
 */
export function getUserAuthGroup(data: any) {
  return ajax({
    url: '/book-reading/authenticate/get-user-auth-group',
    method: 'POST',
    data,
    custom: {
      showLoading: false
    }
  });
}

/**
 * 获取用户VIP信息
 * 接口ID: TODO
 *
 * @returns Promise<{
 *   showVip: boolean;    // 是否展示VIP内容
 *   vipOpened: boolean; // 是否已开通VIP
 *   vipExpireTime: Date; // VIP过期时间
 *   payType: number; // 支付方式，1:第三方支付方式、2:运营商订购方式
 *   orderType: number; // 订购方式，1:第三方支付方式、2:运营商订购方式
 * }>
 */
export function getVipInfoApi() {
  return ajax({
    url: '/book-reading/user/vip-info',
    method: 'POST',
    data: {},
    custom: {
      showLoading: false
    }
  });
}
