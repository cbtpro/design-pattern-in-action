import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { getBridge } from '../bridge/bridgeInstance';
import { setBrowserInfo, setSupportedFeatures } from '../store/slices/browserSlice';
import { setPermission } from '../store/slices/notificationSlice';
import { addMessage } from '../store/slices/tabCommunicationSlice';
import { BrowserDetector } from '../utils/browserDetector';
import { BrowserBridge } from '../types';

let subscribed = false; // ✅ 避免重复绑定事件
const globalBridge: BrowserBridge = getBridge(); // 全局单例

export const useBridge = () => {
  const dispatch = useDispatch();
  const bridgeRef = useRef(globalBridge); // 永远是同一个实例

  useEffect(() => {
    const bridge = bridgeRef.current;
    // 初始化一次
    const browserInfo = bridge.getBrowserInfo();
    dispatch(setBrowserInfo(browserInfo));

    // 设置支持的特性
    const supportedFeatures = BrowserDetector.getSupportedFeatures();
    dispatch(setSupportedFeatures(supportedFeatures));

    // 获取当前通知权限
    if ('Notification' in window) {
      dispatch(setPermission(Notification.permission));
    }

    /**
     * 避免重复订阅
     */
    if (!subscribed) {
      subscribed = true;
      console.log('[bridge] onTabMessage subscribed');
      bridge.onTabMessage((message) => {
        dispatch(addMessage({
          id: Math.random().toString(36).substring(2, 9),
          content: message.content || JSON.stringify(message),
          timestamp: message.timestamp,
          fromTab: message.fromTab
        }));
      });
    }
  }, [dispatch]);

  return bridgeRef;
};