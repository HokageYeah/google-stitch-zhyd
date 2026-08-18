<template>
  <view
    class="page-app"
    :class="{
      'page-app--with-tabbar': shouldApplyTabbarLayout,
      'page-app--host-managed-safe-bottom': shouldUseHostManagedSafeBottom
    }"
  >
    <view class="page-main">
      <view class="page-body">
        <slot />
        <!-- 底部导航 只有不是app中才有导航 -->
        <!-- #ifndef APP-PLUS || APP -->
        <!-- <xxt-tabbar v-if="tabbar !== ''" :path="tabbar" /> -->
        <!-- #endif -->
        <!-- app内也可以有导航只要有tabbar就显示导航 -->
        <xxt-tabbar v-if="hasTabbar" :path="tabbarPath" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { isHostManagedUnimpApp } from '@/uni-module-common/config';

const props = withDefaults(
  defineProps<{
    tabbar: string | boolean;
    leftWidth?: number | string;
    rightWidth?: number | string;
  }>(),
  {
    tabbar: '',
    leftWidth: 100,
    rightWidth: 100
  }
);

// 布尔值只表示隐藏 tabbar，避免继续把 false 当作页面路径传给子组件。
const tabbarPath = computed(() => (typeof props.tabbar === 'string' ? props.tabbar : ''));
const hasTabbar = computed(() => tabbarPath.value !== '');
const hostManagedUnimpApp = isHostManagedUnimpApp();
const safeBottomHeight = uni.getSystemInfoSync().safeAreaInsets?.bottom || 0;
// 新增的页面高度和底部留白只服务宿主管理 App，其他平台继续沿用 master 布局。
const shouldApplyTabbarLayout = computed(() => hostManagedUnimpApp && hasTabbar.value);
// 只有设备存在真实底部安全区时才将内容区增至 54px，并与 xxt-sub-tabbar 保持一致。
const shouldUseHostManagedSafeBottom = computed(
  () => shouldApplyTabbarLayout.value && safeBottomHeight > 0
);
</script>

<style lang="scss" scoped>
.page-app {
  --xxt-tabbar-content-height: 50px;
  --xxt-tabbar-height: 0px;
  --xxt-tabbar-page-height: 100vh;
  --xxt-tabbar-bottom-space: 0rpx;
  display: flex;
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100vh;
  background-color: var(--ui-BG-1) !important; /* stylelint-disable-line custom-property-pattern */
  color: var(--ui-TC); /* stylelint-disable-line custom-property-pattern */
  /* background-color: yellow; */
  .page-main {
    display: flex;
    position: absolute;
    z-index: 1;
    flex-direction: column;
    width: 100%;
    min-height: 100%;
    .page-body {
      position: relative;
      z-index: 1;
      flex: 1;
      width: 100%;
      // 业务页面只声明用途 class，高度和留白统一由 layout 变量提供，避免各页面继续写死 100vh。
      :deep(.xxt-tabbar-safe-page) {
        height: var(--xxt-tabbar-page-height);
        min-height: var(--xxt-tabbar-page-height);
      }
      :deep(.xxt-tabbar-safe-scroll) {
        height: var(--xxt-tabbar-page-height);
      }
      :deep(.xxt-tabbar-safe-bottom) {
        padding-bottom: var(--xxt-tabbar-bottom-space);
      }
    }
    .page-img {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 0;
      width: 100vw;
      height: 100vh;
    }
  }
}
// 只有 shouldApplyTabbarLayout 命中时才扣除 tabbar 和系统安全区高度。
.page-app--with-tabbar {
  --xxt-tabbar-height: calc(var(--xxt-tabbar-content-height) + env(safe-area-inset-bottom));
  --xxt-tabbar-page-height: calc(100vh - var(--xxt-tabbar-height));
  --xxt-tabbar-bottom-space: 48rpx;
}
/* #ifdef APP-PLUS */
// 与 xxt-sub-tabbar 的安全区内容高度保持一致，无底部安全区的设备继续使用 50px。
.page-app--with-tabbar.page-app--host-managed-safe-bottom {
  --xxt-tabbar-content-height: 54px;
}
/* #endif */
</style>
