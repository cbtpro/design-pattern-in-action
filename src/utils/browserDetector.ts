import { BrowserInfo } from '../types';

export class BrowserDetector {
  static detect(): BrowserInfo {
    const userAgent = navigator.userAgent;
    const platform = navigator.platform;
    
    let name = 'Unknown';
    let version = '0.0.0';
    
    // Chrome 检测
    if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) {
      name = 'Chrome';
      const match = userAgent.match(/Chrome\/(\d+\.\d+\.\d+)/);
      version = match ? match[1] : '0.0.0';
    }
    // Firefox 检测
    else if (userAgent.includes('Firefox')) {
      name = 'Firefox';
      const match = userAgent.match(/Firefox\/(\d+\.\d+)/);
      version = match ? match[1] : '0.0.0';
    }
    // Safari 检测
    else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
      name = 'Safari';
      const match = userAgent.match(/Version\/(\d+\.\d+)/);
      version = match ? match[1] : '0.0.0';
    }
    
    return { name, version, platform };
  }
  
  static getSupportedFeatures(): string[] {
    const features = [];
    
    if ('Notification' in window) {
      features.push('Notifications');
    }
    
    if ('BroadcastChannel' in window) {
      features.push('BroadcastChannel');
    }
    
    if ('ServiceWorker' in navigator) {
      features.push('ServiceWorker');
    }
    
    if ('localStorage' in window) {
      features.push('LocalStorage');
    }
    
    return features;
  }
}