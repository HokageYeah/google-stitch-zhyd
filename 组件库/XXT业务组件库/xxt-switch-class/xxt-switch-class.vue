<template>
  <view class="content">
    <view class="content-header" :style="`margin-top: ${height - 50}px;`">
      <view class="content-header-user">
        <image class="content-header-user-img" mode="aspectFill" :src="userImageStr"></image>

        <view class="content-header-user-text" @click="switchClass">
          <view class="content-header-user-text-name">
            <tui-text size="28" color="#222222" :font-weight="500" :text="userInfoName"></tui-text>
          </view>
          <view class="content-header-user-text-class">
            <tui-text
              class="content-header-user-text-info"
              size="24"
              color="#666666"
              :text="switchClassInfo.className"
              block
            ></tui-text>
            <image
              v-if="isTeacher"
              class="content-header-user-text-info-img"
              mode="aspectFill"
              :src="`${$cdn}/nb/m/uni-zhyd/img/home_class_switch.png`"
            ></image>
            <!-- <tui-icon
              class="content-header-user-text-info-icon"
              name="exchange"
              color="#4ad975"
              :size="10"
              :bold="true"
            ></tui-icon> -->
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import useSwitchClassStore from './hooks/switchClassStore';
import type { classListType } from './hooks/switchClassStore';
import { isHostManagedUnimpApp } from '@/uni-module-common/config';
import { getCurPageUrlWithQS } from '@/uni-module-common/utils/util';
import bridge from '@/uni-module-common/utils/uniToNativeBridge';
const props = withDefaults(
  defineProps<{
    height: number;
    switchClassInfo: classListType;
    rotated: boolean;
  }>(),
  {
    height: 0,
    switchClassInfo: () => ({}),
    rotated: false
  }
);
const emit = defineEmits<{
  (e: 'update:rotated', val: boolean): void;
}>();
const { isLogin, userInfo } = useStore('user');
const instance = getCurrentInstance();
const router = useRouter();
const switchClassStore = useSwitchClassStore();
const classList = ref<any[]>([]);
const userImageStr = computed(() => {
  type keyType = '0' | '1' | '-1';
  let key: keyType = '0';
  // // 角色 // jxlx身份类型 -1, "网站注册账号" 0, "教师" 1, "学生" 2, "家长" 3, "管理员"  99, "访客（未登录）"
  const roleType = {
    '0': `${
      instance!.appContext.config.globalProperties.$cdn
    }/nb/m/uni-zhyd/img/user_teacher_img.png`,
    '1': `${
      instance!.appContext.config.globalProperties.$cdn
    }/nb/m/uni-zhyd/img/user_student_img.png`,
    '-1': `${
      instance!.appContext.config.globalProperties.$cdn
    }/nb/m/uni-zhyd/img/user_student_img.png`
  };
  if (userInfo.value.jut) {
    key = (
      '0,3'.includes(userInfo.value.jut.toString())
        ? '0'
        : '1,2'.includes(userInfo.value.jut.toString())
          ? '1'
          : '-1'
    ) as keyType;
  }
  return roleType[key];
});
const isTeacher = computed(() => {
  if (isHostManagedUnimpApp() && (!isLogin.value || !userInfo.value.wid)) {
    return false;
  }
  const jut = userInfo.value.jut;
  // 老师/管理员身份
  return jut === 0 || jut === 3;
});
const userInfoName = computed(() => {
  const { jut, username, nickname, wid } = userInfo.value;
  if (isHostManagedUnimpApp() && (!isLogin.value || !wid)) {
    return '未登录';
  }
  let name = username || nickname;
  const jutType = jut!.toString();
  if ('0,3'.includes(jutType)) {
    name = `${username}老师`;
  } else if ('1,2'.includes(jutType)) {
    name = `${username}家长`;
  } else if ('-1'.includes(jutType)) {
    name = name?.length === 0 ? '网站注册账号' : name;
  }
  return name;
});
const userInfoTitle = computed(() => {
  const { jut, schoolName, xxtGradeName, xinzxClassName } = userInfo.value;
  let title = '';
  jut === 0
    ? (title = schoolName || '')
    : jut === 1
      ? (title = `${schoolName || ''}  ${xxtGradeName || ''}  ${xinzxClassName || ''}`)
      : jut === -1 && (title = '网站注册账号');
  return title;
});
const switchClass = () => {
  console.log('switchClass---rotated---', props.rotated);
  if (!isLogin.value) {
    const redictUrl = `/${getCurPageUrlWithQS() || 'pages/index/index'}`;
    if (isHostManagedUnimpApp()) {
      router.push({
        path: `/uni_modules/uni-module-public/login/login`,
        query: {
          redictUrl: encodeURIComponent(redictUrl)
        }
      });
      return;
    }
    // #ifdef APP-PLUS
    bridge.login(redictUrl);
    // #endif
    return;
  }
  emit('update:rotated', !props.rotated);
};
</script>

<style scoped lang="scss">
.content-header {
  box-sizing: border-box;
  height: 50px;
  /* background-color: aqua; */
  @include normalFlex();
  &-user {
    @include normalFlex(row, flex-start);
    flex: 1;
    &-img {
      width: 40px;
      height: 40px;
    }
    &-text {
      box-sizing: border-box;
      margin-left: 8px;
      @include normalFlex(column, space-around, flex-start);
      &-name {
        @include normalFlex(row, center);
      }
      &-class {
        @include normalFlex(row, center);
      }
    }
    &-text-info {
      margin-right: 6px !important;
      max-width: 200px;
      :deep(.tui-text__content) {
        /* 文本超出时显示省略号 只显示一行 */
        overflow: hidden;
        /* 超出隐藏，必须同时设置该项才能生效 */
        text-overflow: ellipsis;
        /* 超过部分省略号代替 */
        white-space: nowrap !important;
        /* 强制不换行 */
      }
      &-icon {
        margin-left: 6px !important;
        padding: 2px;
        border-radius: 4px;
        background-color: #fff;
        /* 旋转90度 */
        transform: rotate(90deg);
      }
      &-img {
        width: 20px;
        height: 20px;
      }
    }
  }
}
</style>
