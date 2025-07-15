import { BrowserBridge } from '../types';
import { ChromeBridge } from './ChromeBridge';
import { FirefoxBridge } from './FirefoxBridge';
import { SafariBridge } from './SafariBridge';
import { BrowserDetector } from '../utils/browserDetector';

export class BridgeFactory {
  static createBridge(): BrowserBridge {
    const browserInfo = BrowserDetector.detect();
    
    switch (browserInfo.name) {
      case 'Chrome':
        return new ChromeBridge();
      case 'Firefox':
        return new FirefoxBridge();
      case 'Safari':
        return new SafariBridge();
      default:
        // 默认使用Chrome实现
        return new ChromeBridge();
    }
  }
}