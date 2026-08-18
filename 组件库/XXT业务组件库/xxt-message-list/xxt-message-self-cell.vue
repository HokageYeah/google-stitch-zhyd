<template>
  <view class="message-self-cell" :class="{ 'host-managed-unimp-app': hostManagedUnimpApp }">
    <view v-if="messageType === 'text'" class="message-self-cell-bg">
      <view class="message-self-cell-content">
        <tui-text
          class="message-self-cell-content-text"
          block
          :size="text_size"
          :text="message"
        ></tui-text>
      </view>
      <view class="message-self-cell-time">{{ utils.formatTimeWithChinese(sendTime) }}</view>
    </view>
    <view v-if="messageType === 'voice'" class="message-self-cell-voice">
      <view class="message-self-cell-bg">
        <message-voice
          :voice-url="voiceUrl"
          :voice-translate="voiceTranslate"
          :voice-time="voiceTime"
          :is-self="true"
          :message-id="messageId"
        />
        <view
          v-if="voiceTranslate.length > 0"
          class="message-self-cell-content message-self-cell-voice-translate"
        >
          <tui-text
            class="message-self-cell-content-text"
            block
            :size="text_size"
            :text="voiceTranslate"
          ></tui-text>
        </view>
        <view class="message-self-cell-time">{{ utils.formatTimeWithChinese(sendTime) }}</view>
      </view>
    </view>
    <image
      class="avator-img"
      mode="aspectFill"
      :src="`${$cdn}/nb/m/base/img/login-student.png`"
    ></image>
  </view>
</template>

<script setup lang="ts">
import messageVoice from './xxt-message-voice.vue';
import { $cdn, isHostManagedUnimpApp } from '@/uni-module-common/config';
import utils from '@/uni-module-common/utils';
const props = withDefaults(
  defineProps<{
    message?: string; // 消息内容
    messageType?: 'text' | 'voice'; // 消息类型 文本 语音
    voiceUrl?: string; // 语音url
    voiceTranslate?: string; //  语音翻译内容
    voiceTime?: number; // 语音时长
    sendTime?: number; // 发送时间
    messageId?: string | number; // 消息id
  }>(),
  {
    message: '',
    messageType: 'text',
    voiceUrl: '',
    voiceTranslate: '',
    voiceTime: 0,
    isSelf: false,
    sendTime: 0,
    messageId: ''
  }
);
// 宿主管理 App 使用接近小程序的新视觉字号，避免影响其他 App 旧版大字号展示。
const hostManagedUnimpApp = isHostManagedUnimpApp();
const text_size = ref(hostManagedUnimpApp ? 28 : 40);
// #ifdef MP-WEIXIN
text_size.value = 28;
// #endif
</script>

<style scoped lang="scss">
.message-self-cell {
  padding: 16px 16px 0;
  /* #ifndef MP-WEIXIN */
  background-color: #edfbf1;
  /* #endif */
  /* #ifdef MP-WEIXIN */
  background-color: #f5f5f5;
  /* #endif */
  @include normalFlex(row, flex-end, flex-start);
  .avator-img {
    /* #ifndef MP-WEIXIN */
    width: 75px;
    height: 75px;
    /* #endif */
    /* #ifdef MP-WEIXIN */
    width: 34px;
    height: 34px;
    /* #endif */
  }
  .message-self-cell-bg {
    flex: 1;
    width: 100%;
    @include normalFlex(column, flex-start, flex-end);
    .message-self-cell-time {
      margin-top: 8px;
      margin-right: 25px;
      color: #999;
      font-size: 18px;
      /* #ifdef MP-WEIXIN */
      font-size: 12px;
      margin-right: 15px;
      /* #endif */
    }
  }
  .message-self-cell-content {
    flex: 1;
    box-sizing: border-box;
    margin-right: 25px;
    padding: 20px;
    border-radius: 8px 4px 8px 8px;
    background-color: #ccffdb;
    max-width: 70%;
    /* #ifdef MP-WEIXIN */
    max-width: none;
    margin-right: 15px;
    padding: 12px;
    /* #endif */
  }
  .message-self-cell-content-text {
    /* 设置行间距 */
    line-height: 1.5;
  }
  .message-self-cell-voice {
    flex: 1;
    @include normalFlex(column, flex-start, flex-end);
  }
  .message-self-cell-voice-translate {
    margin-top: 8px;
    background-color: #fff;
    /* #ifdef MP-WEIXIN */
    background-color: #ccffdb;
    /* #endif */
  }
}
.message-self-cell.host-managed-unimp-app {
  background-color: #f5f5f5;
  .avator-img {
    width: 34px;
    height: 34px;
  }
  .message-self-cell-bg .message-self-cell-time {
    font-size: 12px;
    margin-right: 15px;
  }
  .message-self-cell-content {
    max-width: none;
    margin-right: 15px;
    padding: 12px;
  }
  .message-self-cell-voice-translate {
    background-color: #ccffdb;
  }
}
</style>
