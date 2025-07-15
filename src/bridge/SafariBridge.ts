import { BaseBrowserBridge } from './BaseBrowserBridge';
import { NotificationOptions } from '../types';

export class SafariBridge extends BaseBrowserBridge {
  async showNotification(options: NotificationOptions): Promise<boolean> {
    try {
      // Safari 特定的通知实现
      if (Notification.permission === 'granted') {
        const notification = new Notification(options.title, {
          body: options.body,
          icon: options.icon || '/vite.svg',
          tag: options.tag,
          // Safari 兼容性选项
          badge: options.icon
        });
        
        // Safari 特定的事件处理
        notification.onclick = () => {
          window.focus();
          notification.close();
        };
        
        // Safari 可能需要更短的显示时间
        setTimeout(() => {
          notification.close();
        }, 4000);
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('Safari notification error:', error);
      return false;
    }
  }
  
  async requestPermission(): Promise<string> {
    try {
      // Safari 可能需要用户手势
      const permission = await Notification.requestPermission();
      return permission;
    } catch (error) {
      console.error('Safari permission error:', error);
      return 'denied';
    }
  }
}