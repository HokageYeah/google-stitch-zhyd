<template>
  <tui-actionsheet
    :show="rotated"
    :item-list="classListSheet"
    tips="切换班级"
    @click="itemClick"
    @cancel="emit('update:rotated', false)"
  >
  </tui-actionsheet>
</template>

<script setup lang="ts">
import type { classListType } from '@/uni-module-common/components/xxt-components/xxt-switch-class/hooks/switchClassStore';
import useSwitchClassStore from '@/uni-module-common/components/xxt-components/xxt-switch-class/hooks/switchClassStore';
import { getUserAuthGroup } from '@/uni-module-common/components/xxt-components/xxt-switch-class/hooks/requestApi';
import { isHostManagedUnimpApp } from '@/uni-module-common/config';
import eventBus from '@/uni-module-common/utils/eventBus';
import bridge from '@/uni-module-common/utils/uniToNativeBridge';
import { uniToNatSyncUserInfo } from '@/uni-module-common/utils/uniToNavProtocol';

const props = withDefaults(
  defineProps<{
    switchClassInfo: classListType;
    rotated: boolean;
  }>(),
  {
    switchClassInfo: () => ({}),
    rotated: false
  }
);
const emit = defineEmits<{
  (e: 'update:rotated', val: boolean): void;
}>();

const { userInfo, setUserInfoAttr } = useStore('user');
const VIP_PAY_SUCCESS_EVENT = 'vipPaySuccessEvent';

const switchClassStore = useSwitchClassStore();
const classList = ref<any[]>([]);
const classListSheet = computed(() => {
  const webId = userInfo.value.wid;
  let list: any = [];
  if (webId) {
    console.log('circleStore.homeMainInfo----', props.switchClassInfo);
    const circleInfo = props.switchClassInfo;
    console.log('circleStore.backgroundMethod-----', circleInfo);
    if (circleInfo) {
      const classId = circleInfo.classId;
      list = classList.value.map((item) => ({
        text: item.className,
        color: `${item.classId}` === `${classId}` ? '#4AD975' : '#222222',
        classId: (item.classId || '').toString(),
        isAdmin: item.isAdmin,
        isBookListing: item.isBookListing
      }));
    }
  }
  return list;
});

const syncSelectedClassToUserInfo = (selectedClass: {
  classId: string;
  className: string;
  isAdmin: boolean;
  isBookListing: boolean;
}) => {
  if (!isHostManagedUnimpApp() || !userInfo.value.wid || !selectedClass.classId) {
    return;
  }

  const nextUserInfo = {
    ...userInfo.value,
    classId: selectedClass.classId,
    className: selectedClass.className,
    xxtClassId: selectedClass.classId,
    xxtClassName: selectedClass.className,
    xinzxClassId: Number(selectedClass.classId) || 0,
    xinzxClassName: selectedClass.className,
    isAdmin: selectedClass.isAdmin,
    xinzxAdmin: selectedClass.isAdmin,
    isBookListing: selectedClass.isBookListing
  };

  Object.entries(nextUserInfo).forEach(([key, value]) => {
    setUserInfoAttr(key, value);
  });
  uni.setStorageSync('userInfo', JSON.stringify(nextUserInfo));

  // #ifdef APP-PLUS
  bridge.sendNativeEvent(uniToNatSyncUserInfo, {
    userInfo: JSON.parse(JSON.stringify(nextUserInfo))
  });
  // #endif
};

const itemClick = (e: any) => {
  const classId = e.classId;
  const isAdmin = e.isAdmin;
  const className = e.text;
  const isBookListing = e.isBookListing;

  const obj: any = {};
  const wid = userInfo.value.wid;
  if (wid) {
    obj[wid] = {
      classId,
      isAdmin,
      className,
      jut: userInfo.value.jut,
      isBookListing
    };
    console.log('circleStore.circleInfo---clickSelectUnit--', obj);
    switchClassStore.setSwitchClassInfo(obj);
    syncSelectedClassToUserInfo({ classId, className, isAdmin, isBookListing });
  }
  const index = e.index;
  console.log(e, index);
  emit('update:rotated', false);
};

const switchRulesReloadData = async () => {
  // 从circle中获取store
  let storeBooksListingInfo = {};
  if (userInfo.value.wid) {
    storeBooksListingInfo = switchClassStore.switchClassInfo[userInfo!.value!.wid] || {};
  }
  const teacherGroupInfoList: any = await getUserAuthGroup({});
  classList.value = (teacherGroupInfoList?.groupInfos || []).map((item: any) => ({
    className: item.groupName,
    classId: item.groupId,
    isAdmin: item.admin, // true 管理员 false 非管理员
    isBookListing: item.device, // true有设备false无设备
    groupType: item.groupType // 组织类型
  }));

  // VIP 信息归属 switchClassStore，初始化和支付成功回调统一走同一个 action，避免组件内重复维护刷新逻辑。
  await switchClassStore.refreshVipInfo();

  let classId = '';
  let isAdmin = false;
  let className = '';
  let isBookListing = false;
  // classList  的数据更新是异步的。所以需要nextTick去数据同步操作
  await nextTick();
  // 如果storeCircleInfo没有值，则说明是第一次初始化
  if (Object.keys(storeBooksListingInfo).length <= 0 && userInfo.value.wid) {
    let shouldSyncUserInfo = true;
    if (classList.value.length > 0) {
      let currentUserClassId: any = '';
      let selectedClass = classList.value[0];

      if (isHostManagedUnimpApp()) {
        currentUserClassId = [
          userInfo.value.classId,
          userInfo.value.xxtClassId,
          userInfo.value.xinzxClassId
        ].find((value) => value !== undefined && value !== null && `${value}`.length > 0);
        selectedClass =
          classList.value.find((item) => `${item.classId}` === `${currentUserClassId}`) ||
          classList.value[0];
      }

      classId = (selectedClass.classId || '').toString();
      isAdmin = selectedClass.isAdmin;
      className = selectedClass.className;
      isBookListing = selectedClass.isBookListing;
      shouldSyncUserInfo = `${selectedClass.classId}` !== `${currentUserClassId}`;
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
    switchClassStore.setSwitchClassInfo(obj);
    if (shouldSyncUserInfo) {
      syncSelectedClassToUserInfo({ classId, className, isAdmin, isBookListing });
    }
  }
  console.log('storeBooksListingInfo---ipdate---', switchClassStore.switchClassInfo);
  console.log('storeBooksListingInfo---ipdate-----managerList-----', classList.value);
};
watch(
  () => userInfo.value.wid,
  async (newVal, oldVal) => {
    // 重制圈子信息
    // circleStore.resetCircleInfo();
    // 初始化圈子信息
    console.log('userInfo.value.wid---', newVal, oldVal, userInfo.value.wid);
    if (userInfo.value.wid) {
      switchRulesReloadData();
    }
  },
  { deep: true, immediate: true }
);

/**
 * 监听会员支付成功事件。
 * 详情页支付成功后会广播该事件，这里收到后更新 switchClassStore 中缓存的 VIP 信息。
 */
const handleVipPaySuccess = () => {
  // 支付成功只需要刷新 VIP 开通态，不重新拉班级列表，避免影响当前班级选择。
  switchClassStore.refreshVipInfo();
};

onMounted(() => {
  eventBus.on(VIP_PAY_SUCCESS_EVENT, handleVipPaySuccess);
});

onUnmounted(() => {
  eventBus.off(VIP_PAY_SUCCESS_EVENT, handleVipPaySuccess);
});
</script>

<style scoped lang="scss"></style>
