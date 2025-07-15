import { BaseBrowserBridge } from './BaseBrowserBridge';
import { NotificationOptions } from '../types';

export class ChromeBridge extends BaseBrowserBridge {
  async showNotification(options: NotificationOptions): Promise<boolean> {
    try {
      // Chrome 特定的通知实现
      if (Notification.permission === 'granted') {
        const notification = new Notification(options.title, {
          body: options.body,
          icon: options.icon || '/vite.svg',
          tag: options.tag,
          requireInteraction: options.requireInteraction,
          // Chrome 特有选项
          silent: false,
          renotify: true
        });
        
        // Chrome 特定的事件处理
        notification.onclick = () => {
          window.focus();
          notification.close();
        };
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('Chrome notification error:', error);
      return false;
    }
  }
  
  async requestPermission(): Promise<string> {
    try {
      // Chrome 使用 Notification.requestPermission()
      const permission = await Notification.requestPermission();
      return permission;
    } catch (error) {
      console.error('Chrome permission error:', error);
      return 'denied';
    }
  }
}