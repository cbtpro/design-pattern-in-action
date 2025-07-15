import { BrowserBridge, NotificationOptions, BrowserInfo } from '../types';
import { BrowserDetector } from '../utils/browserDetector';

abstract class BaseBrowserBridge implements BrowserBridge {
  protected browserInfo: BrowserInfo;
  protected messageChannel: BroadcastChannel | null = null;

  constructor() {
    this.browserInfo = BrowserDetector.detect();
    this.initializeMessageChannel();
  }

  protected initializeMessageChannel(): void {
    if ('BroadcastChannel' in window) {
      this.messageChannel = new BroadcastChannel('tab-communication');
    }
  }

  abstract showNotification(options: NotificationOptions): Promise<boolean>;
  abstract requestPermission(): Promise<string>;

  sendTabMessage(message: any): void {
    if (this.messageChannel) {
      this.messageChannel.postMessage({
        ...message,
        timestamp: Date.now(),
        fromTab: document.title || 'Unknown Tab'
      });
    } else {
      // 降级到localStorage
      const storageKey = 'tab-messages';
      const existing = JSON.parse(localStorage.getItem(storageKey) || '[]');
      existing.push({
        ...message,
        timestamp: Date.now(),
        fromTab: document.title || 'Unknown Tab'
      });
      localStorage.setItem(storageKey, JSON.stringify(existing));

      // 触发storage事件
      window.dispatchEvent(new StorageEvent('storage', {
        key: storageKey,
        newValue: JSON.stringify(existing)
      }));
    }
  }

  onTabMessage(callback: (message: any) => void): void {
    if (this.messageChannel) {
      this.messageChannel.onmessage = (event) => {
        callback(event.data);
      };
    } else {
      // 降级到localStorage监听
      window.addEventListener('storage', (event) => {
        if (event.key === 'tab-messages' && event.newValue) {
          const messages = JSON.parse(event.newValue);
          const latestMessage = messages[messages.length - 1];
          if (latestMessage) {
            callback(latestMessage);
          }
        }
      });
    }
  }

  getBrowserInfo(): BrowserInfo {
    return this.browserInfo;
  }
}

export { BaseBrowserBridge };