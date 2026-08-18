<template>
  <!-- <xxt-layout tabbar="/pages/home-design/home-design"> -->
  <xxt-unlogin v-if="shouldShowUnloginView" :to-login="false" @click-btn="go2Login"></xxt-unlogin>
  <xxt-unlogin
    v-else-if="webAccountFlag && isShowAddClass"
    :tip="tipMessage"
    :show-btn="showLoginBtn"
    btn-desc="加入班级"
    :to-login="false"
    @click-btn="go2AddClass"
  ></xxt-unlogin>
  <view v-else :class="classStyleName">
    <slot></slot>
    <slot name="contentData" :data="{ isTeacher, isStudent }"></slot>
  </view>
  <!-- </xxt-layout> -->
</template>

<script setup lang="ts">
import { isHostManagedUnimpApp } from '@/uni-module-common/config';
import bridge from '@/uni-module-common/utils/uniToNativeBridge';
import { stuAddClassH5 } from '@/uni-module-common/utils/uniToAppH5Bridge';
import { natToUniSyncLoginInfo } from '@/uni-module-common/utils/uniToNavProtocol';
import { initAPPData } from '@/uni-module-common/utils/loginGetInfo';
const props = withDefaults(
  defineProps<{
    loginUrl: string; // 登录成功后，回跳的地址。
    isShowAddClass?: boolean; // 是否展示加班按钮
    stuAddClassH5Url?: string; // 加班按钮的 H5 地址
    classStyleName?: string; // 班级按钮的样式
    allowPreviewWhenUnlogin?: boolean; // APP 预览模式下允许未登录先看内容
  }>(),
  {
    loginUrl: '',
    isShowAddClass: false,
    stuAddClassH5Url: '',
    classStyleName: 'container',
    allowPreviewWhenUnlogin: false
  }
);
const instance = getCurrentInstance();
const eventBus = instance!.appContext.config.globalProperties.$eventBus;
const { isLogin, userInfo } = useStore('user');
const userType = ref<number | undefined>();

// 登录相关代码
const isTeacher = ref(false);
const isStudent = ref(false);
const webAccountFlag = ref(false);
const tipMessage = ref('');
const showLoginBtn = ref(true);
const router = useRouter();

// 未登录预览必须由宿主管理 App 页面显式开启，避免公共组件默认放开受限内容。
const shouldAllowPreviewContent = computed(() => {
  let allowPreviewContent = false;

  // #ifdef APP-PLUS
  allowPreviewContent =
    isHostManagedUnimpApp() &&
    props.allowPreviewWhenUnlogin &&
    (!isLogin.value || userType.value === 99);
  // #endif

  return allowPreviewContent;
});

const shouldShowUnloginView = computed(() => {
  return (!isLogin.value || userType.value === 99) && !shouldAllowPreviewContent.value;
});

watch(
  () => userInfo,
  (newvalue) => {
    userType.value = newvalue?.value?.jut;
    isTeacher.value = false;
    isStudent.value = false;
    if (isLogin.value) {
      const jut = userInfo.value.jut;
      if (jut === -1) {
        // 登录身份是网站注册身份
        webAccountFlag.value = true;
        // #ifdef MP-WEIXIN
        tipMessage.value = '你还不在班级内，请联系老师加入班级后再尝试吧';
        showLoginBtn.value = false;
        // #endif
        // #ifdef H5 || APP-PLUS
        tipMessage.value = '您还没有加入任何班级，请先加入班级';
        showLoginBtn.value = true;
        // #endif
      }
      // 有 schoolId 时说明已完成 getLoginUserInfo 接口调用，此时再跳转页面
      else if ((jut === 0 || jut === 3) && userInfo.value.schoolId) {
        // 教师身份
        isTeacher.value = true;
      } else if ((jut === 1 || jut === 2) && userInfo.value.schoolId) {
        // 学生身份
        isStudent.value = true;
      }
    }
  },
  {
    immediate: true,
    deep: true
  }
);

const go2Login = async () => {
  console.log('go2Login-----');
  // #ifdef APP-PLUS || APP
  // 宿主管理 App 复用 Uni 登录页，其他 App 继续沿用 master 的原生登录入口。
  if (isHostManagedUnimpApp()) {
    router.push({
      path: `/uni_modules/uni-module-public/login/login`,
      query: {
        redictUrl: encodeURIComponent(props.loginUrl)
      }
    });
    return;
  }
  bridge.login(props.loginUrl);
  // #endif
  // #ifdef MP-WEIXIN || H5
  router.push({
    path: `/uni_modules/uni-module-public/login/login`,
    query: {
      redictUrl: encodeURIComponent(props.loginUrl)
    }
  });
  // #endif
};
// 去加入班级
const go2AddClass = () => {
  // #ifdef APP-PLUS
  stuAddClassH5();
  // #endif
  // #ifdef MP-WEIXIN
  router.push({
    path: '/pages/common-pages/xxt-webview',
    query: {
      url: props.stuAddClassH5Url
    }
  });
  // #endif
  // #ifdef H5
  window.location.href = props.stuAddClassH5Url;
  // #endif
};
onLoad(() => {
  // 宿主管理 App 由 App.vue 全局消费；其他项目保留 master 的组件监听，避免公共模块单独合入后丢失登录态同步。
  if (!isHostManagedUnimpApp()) {
    eventBus.on(natToUniSyncLoginInfo, (res: any) => {
      console.log('natToUniSyncLoginInfo----', res);
      eventBus.emit('uniToNatLogin', '我是登录成功后的回调到applunch-iOS');
      initAPPData(
        {
          referrerInfo: {
            extraData: res
          }
        },
        3
      );
    });
  }
  // bridge.receiveNativeEvent(natToUniSyncLoginInfo).then((res) => {
  //   uni.$emit('uniToNatLogin', '我是登录成功后的回调到applunch-iOS');
  //   initAPPData(
  //     {
  //       referrerInfo: {
  //         extraData: res
  //       }
  //     },
  //     3
  //   );
  // });
});
</script>

<style scoped lang="scss">
.container {
  @include normalContainer();
}
</style>
