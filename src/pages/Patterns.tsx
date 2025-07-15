import React from 'react';
import { CodeExample } from '../components/CodeExample';
import { Grid, Users, FileText, Radio, Layers, GitBranch } from 'lucide-react';

export const Patterns: React.FC = () => {
  const bridgeCode = `// 桥接模式 - 分离抽象和实现
interface BrowserBridge {
  showNotification(options: NotificationOptions): Promise<boolean>;
  requestPermission(): Promise<string>;
}

class ChromeBridge extends BaseBrowserBridge {
  async showNotification(options: NotificationOptions): Promise<boolean> {
    // Chrome 特定实现
    const notification = new Notification(options.title, {
      requireInteraction: options.requireInteraction,
      silent: false,
      renotify: true
    });
    return true;
  }
}

// 工厂创建适当的桥接器
const bridge = BridgeFactory.createBridge();
await bridge.showNotification({ title: '跨浏览器通知' });`;

  const flyweightCode = `// 享元模式 - 共享内在状态
class IconFlyweight {
  private iconType: string;
  private svgPath: string;
  
  constructor(iconType: string, svgPath: string) {
    this.iconType = iconType;
    this.svgPath = svgPath;
  }
  
  render(context: IconContext): string {
    return \`<svg width="\${context.size}" fill="\${context.color}">
      <path d="\${this.svgPath}" />
    </svg>\`;
  }
}

class IconFlyweightFactory {
  private static flyweights = new Map<string, IconFlyweight>();
  
  static getFlyweight(iconType: string): IconFlyweight {
    if (!this.flyweights.has(iconType)) {
      this.flyweights.set(iconType, new IconFlyweight(iconType, svgPath));
    }
    return this.flyweights.get(iconType)!;
  }
}`;

  const singletonCode = `// 单例模式 - 确保唯一实例
class Logger {
  private static instance: Logger | null = null;
  private logs: LogEntry[] = [];
  
  private constructor() {
    // 私有构造函数
  }
  
  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }
  
  log(level: string, message: string): void {
    this.logs.push({
      id: generateId(),
      level,
      message,
      timestamp: Date.now()
    });
  }
}

// 无论调用多少次，都返回同一个实例
const logger1 = Logger.getInstance();
const logger2 = Logger.getInstance();
console.log(logger1 === logger2); // true`;

  const pubsubCode = `// 发布订阅模式 - 松耦合通信
class EventBus {
  private subscribers = new Map<string, Subscriber[]>();
  
  subscribe(eventType: string, callback: Function): string {
    const subscriber = { id: generateId(), callback };
    
    if (!this.subscribers.has(eventType)) {
      this.subscribers.set(eventType, []);
    }
    this.subscribers.get(eventType)!.push(subscriber);
    
    return subscriber.id;
  }
  
  publish(eventType: string, data: any): void {
    const subscribers = this.subscribers.get(eventType);
    if (subscribers) {
      subscribers.forEach(sub => sub.callback(data));
    }
  }
  
  unsubscribe(eventType: string, subscriberId: string): void {
    const subscribers = this.subscribers.get(eventType);
    if (subscribers) {
      const index = subscribers.findIndex(sub => sub.id === subscriberId);
      if (index !== -1) subscribers.splice(index, 1);
    }
  }
}

// 使用示例
const eventBus = EventBus.getInstance();
const id = eventBus.subscribe('user:login', (data) => {
  console.log('用户登录:', data);
});
eventBus.publish('user:login', { userId: '123', username: 'John' });`;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">设计模式详解</h1>
          <p className="text-gray-400 text-lg">
            深入了解常用设计模式的原理和实现
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center space-x-2 mb-4">
              <GitBranch className="text-blue-400" size={24} />
              <h3 className="text-xl font-semibold">桥接模式</h3>
            </div>
            <p className="text-gray-300 text-sm">
              将抽象部分与实现部分分离，使它们都可以独立变化。适用于跨平台开发和API适配。
            </p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center space-x-2 mb-4">
              <Layers className="text-green-400" size={24} />
              <h3 className="text-xl font-semibold">享元模式</h3>
            </div>
            <p className="text-gray-300 text-sm">
              通过共享技术有效支持大量细粒度对象。减少内存使用，提高性能。
            </p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center space-x-2 mb-4">
              <FileText className="text-purple-400" size={24} />
              <h3 className="text-xl font-semibold">单例模式</h3>
            </div>
            <p className="text-gray-300 text-sm">
              确保一个类只有一个实例，并提供全局访问点。常用于配置管理和日志系统。
            </p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center space-x-2 mb-4">
              <Radio className="text-yellow-400" size={24} />
              <h3 className="text-xl font-semibold">发布订阅</h3>
            </div>
            <p className="text-gray-300 text-sm">
              定义对象间一对多的依赖关系，实现松耦合的事件通信机制。
            </p>
          </div>
        </div>
        
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4 flex items-center space-x-2">
              <GitBranch className="text-blue-400" size={28} />
              <span>桥接模式 (Bridge Pattern)</span>
            </h2>
            <CodeExample
              title="桥接模式实现"
              code={bridgeCode}
              language="typescript"
            />
            <div className="mt-4 bg-gray-800 rounded-lg p-4 border border-gray-700">
              <h3 className="text-lg font-medium text-blue-400 mb-2">应用场景</h3>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• 跨平台应用开发（iOS、Android、Web）</li>
                <li>• 数据库驱动程序（MySQL、PostgreSQL、MongoDB）</li>
                <li>• 图形渲染引擎（OpenGL、DirectX、Vulkan）</li>
                <li>• 消息队列适配器（RabbitMQ、Kafka、Redis）</li>
              </ul>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4 flex items-center space-x-2">
              <Layers className="text-green-400" size={28} />
              <span>享元模式 (Flyweight Pattern)</span>
            </h2>
            <CodeExample
              title="享元模式实现"
              code={flyweightCode}
              language="typescript"
            />
            <div className="mt-4 bg-gray-800 rounded-lg p-4 border border-gray-700">
              <h3 className="text-lg font-medium text-green-400 mb-2">应用场景</h3>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• 游戏中的粒子系统（子弹、特效、NPC）</li>
                <li>• 文本编辑器的字符渲染</li>
                <li>• 图标库和UI组件库</li>
                <li>• 大量相似对象的缓存系统</li>
              </ul>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4 flex items-center space-x-2">
              <FileText className="text-purple-400" size={28} />
              <span>单例模式 (Singleton Pattern)</span>
            </h2>
            <CodeExample
              title="单例模式实现"
              code={singletonCode}
              language="typescript"
            />
            <div className="mt-4 bg-gray-800 rounded-lg p-4 border border-gray-700">
              <h3 className="text-lg font-medium text-purple-400 mb-2">应用场景</h3>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• 日志管理器（Logger）</li>
                <li>• 配置管理器（Config Manager）</li>
                <li>• 数据库连接池</li>
                <li>• 缓存管理器（Cache Manager）</li>
              </ul>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4 flex items-center space-x-2">
              <Radio className="text-yellow-400" size={28} />
              <span>发布订阅模式 (Pub-Sub Pattern)</span>
            </h2>
            <CodeExample
              title="发布订阅模式实现"
              code={pubsubCode}
              language="typescript"
            />
            <div className="mt-4 bg-gray-800 rounded-lg p-4 border border-gray-700">
              <h3 className="text-lg font-medium text-yellow-400 mb-2">应用场景</h3>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• 事件系统（DOM事件、自定义事件）</li>
                <li>• 状态管理（Redux、MobX、Vuex）</li>
                <li>• 消息队列系统</li>
                <li>• 响应式编程（RxJS、Vue响应式系统）</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-12 bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-2xl font-semibold mb-4 flex items-center space-x-2">
            <Grid className="text-blue-400" size={28} />
            <span>设计模式分类</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-medium text-blue-400 mb-3">创建型模式</h3>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>• 单例模式 (Singleton)</li>
                <li>• 工厂模式 (Factory)</li>
                <li>• 建造者模式 (Builder)</li>
                <li>• 原型模式 (Prototype)</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-green-400 mb-3">结构型模式</h3>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>• 桥接模式 (Bridge)</li>
                <li>• 享元模式 (Flyweight)</li>
                <li>• 适配器模式 (Adapter)</li>
                <li>• 装饰器模式 (Decorator)</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-yellow-400 mb-3">行为型模式</h3>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>• 发布订阅模式 (Pub-Sub)</li>
                <li>• 观察者模式 (Observer)</li>
                <li>• 策略模式 (Strategy)</li>
                <li>• 命令模式 (Command)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};