import React from 'react';
import { BrowserInfo } from '../components/BrowserInfo';
import { NotificationDemo } from '../components/NotificationDemo';
import { TabCommunicationDemo } from '../components/TabCommunicationDemo';
import { CodeExample } from '../components/CodeExample';
import { GitBranch, Code2, BookOpen } from 'lucide-react';

export const BridgePage: React.FC = () => {
  const bridgePatternCode = `// 桥接模式实现
interface BrowserBridge {
  showNotification(options: NotificationOptions): Promise<boolean>;
  requestPermission(): Promise<string>;
  sendTabMessage(message: any): void;
  onTabMessage(callback: (message: any) => void): void;
}

class ChromeBridge extends BaseBrowserBridge {
  async showNotification(options: NotificationOptions): Promise<boolean> {
    // Chrome 特定的通知实现
    const notification = new Notification(options.title, {
      body: options.body,
      icon: options.icon,
      requireInteraction: options.requireInteraction,
      silent: false,
      renotify: true
    });
    return true;
  }
}

class FirefoxBridge extends BaseBrowserBridge {
  async showNotification(options: NotificationOptions): Promise<boolean> {
    // Firefox 特定的通知实现
    const notification = new Notification(options.title, {
      body: options.body,
      icon: options.icon,
      dir: 'auto',
      lang: 'zh-CN'
    });
    return true;
  }
}

// 工厂模式创建桥接器
class BridgeFactory {
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
        return new ChromeBridge();
    }
  }
}`;

  const usageCode = `// 使用示例
const bridge = BridgeFactory.createBridge();

// 发送通知
await bridge.showNotification({
  title: '桥接模式通知',
  body: '这是一个跨浏览器的通知示例',
  requireInteraction: true
});

// 标签页通信
bridge.sendTabMessage({
  content: '来自其他标签页的消息',
  type: 'user-message'
});

bridge.onTabMessage((message) => {
  console.log('收到消息:', message);
});`;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <GitBranch className="text-blue-400" size={32} />
            <h1 className="text-3xl font-bold">桥接模式 (Bridge Pattern)</h1>
          </div>
          <p className="text-gray-400 text-lg">
            将抽象部分与实现部分分离，使它们都可以独立变化。适用于跨平台开发和API适配。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <BrowserInfo />
          <div className="lg:col-span-2 space-y-6">
            <NotificationDemo />
            <TabCommunicationDemo />
          </div>
        </div>

        <div className="space-y-6 mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Code2 className="text-blue-400" size={24} />
            <h2 className="text-2xl font-semibold">代码实现</h2>
          </div>

          <CodeExample
            title="桥接模式实现"
            code={bridgePatternCode}
            language="typescript"
          />

          <CodeExample
            title="使用示例"
            code={usageCode}
            language="typescript"
          />
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center space-x-2 mb-4">
            <BookOpen className="text-blue-400" size={24} />
            <h2 className="text-xl font-semibold">桥接模式说明</h2>
          </div>
          <div className="text-gray-300 space-y-4">
            <p>
              桥接模式通过将抽象和实现分离，使得两者可以独立变化。在本例中，我们创建了一个统一的浏览器桥接接口，
              然后为不同的浏览器（Chrome、Firefox、Safari）提供具体的实现。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-blue-400 mb-2">优点</h3>
                <ul className="text-sm space-y-1">
                  <li>• 分离抽象接口及其实现部分</li>
                  <li>• 提高可扩展性</li>
                  <li>• 实现细节对客户透明</li>
                  <li>• 支持运行时切换实现</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium text-green-400 mb-2">应用场景</h3>
                <ul className="text-sm space-y-1">
                  <li>• 跨平台应用开发</li>
                  <li>• 数据库驱动程序</li>
                  <li>• 图形渲染引擎</li>
                  <li>• 消息队列适配器</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};