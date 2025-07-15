import { BaseBrowserBridge } from './BaseBrowserBridge';
import { NotificationOptions } from '../types';

export class FirefoxBridge extends BaseBrowserBridge {
  async showNotification(options: NotificationOptions): Promise<boolean> {
    try {
      // Firefox 特定的通知实现
      if (Notification.permission === 'granted') {
        const notification = new Notification(options.title, {
          body: options.body,
          icon: options.icon || '/vite.svg',
          tag: options.tag,
          // Firefox 特有选项
          dir: 'auto',
          lang: 'zh-CN'
        });
        
        // Firefox 特定的事件处理
        notification.addEventListener('click', () => {
          window.focus();
          notification.close();
        });
        
        // Firefox 自动关闭
        setTimeout(() => {
          notification.close();
        }, 5000);
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('Firefox notification error:', error);
      return false;
    }
  }
  
  async requestPermission(): Promise<string> {
    try {
      // Firefox 使用 Notification.requestPermission()
      const permission = await Notification.requestPermission();
      return permission;
    } catch (error) {
      console.error('Firefox permission error:', error);
      return 'denied';
    }
  }
}