import React from 'react';
import { PubSubDemo } from '../components/PubSubDemo';
import { CodeExample } from '../components/CodeExample';
import { Radio, Code2, BookOpen } from 'lucide-react';

export const PubSubPage: React.FC = () => {
  const pubsubCode = `// 发布订阅模式实现
class EventBus {
  private static instance: EventBus | null = null;
  private subscribers: Map<string, Subscriber[]> = new Map();
  private eventHistory: EventData[] = [];
  
  private constructor() {}
  
  static getInstance(): EventBus {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus();
    }
    return EventBus.instance;
  }
  
  // 订阅事件
  subscribe(eventType: string, callback: (data: EventData) => void): string {
    const subscriber: Subscriber = {
      id: Math.random().toString(36).substr(2, 9),
      callback
    };
    
    if (!this.subscribers.has(eventType)) {
      this.subscribers.set(eventType, []);
    }
    
    this.subscribers.get(eventType)!.push(subscriber);
    return subscriber.id;
  }
  
  // 发布事件
  publish(eventType: string, payload: any): void {
    const eventData: EventData = {
      type: eventType,
      payload,
      timestamp: Date.now()
    };
    
    // 记录事件历史
    this.eventHistory.unshift(eventData);
    
    // 通知所有订阅者
    const subscribers = this.subscribers.get(eventType);
    if (subscribers) {
      subscribers.forEach(subscriber => {
        try {
          subscriber.callback(eventData);
        } catch (error) {
          console.error(\`Error in subscriber \${subscriber.id}:\`, error);
        }
      });
    }
  }
  
  // 取消订阅
  unsubscribe(eventType: string, subscriberId: string): boolean {
    const subscribers = this.subscribers.get(eventType);
    if (!subscribers) return false;
    
    const index = subscribers.findIndex(sub => sub.id === subscriberId);
    if (index === -1) return false;
    
    subscribers.splice(index, 1);
    return true;
  }
}`;

  const usageCode = `// 使用示例
const eventBus = EventBus.getInstance();

// 订阅用户登录事件
const loginSubscriberId = eventBus.subscribe('user:login', (data) => {
  console.log('用户登录:', data.payload);
  // 更新UI状态
  updateUserStatus(data.payload.username);
});

// 订阅通知事件
const notificationSubscriberId = eventBus.subscribe('notification:sent', (data) => {
  console.log('通知已发送:', data.payload);
  // 显示通知反馈
  showNotificationFeedback(data.payload.title);
});

// 发布事件
eventBus.publish('user:login', {
  userId: '123',
  username: 'John Doe',
  loginTime: new Date().toISOString()
});

eventBus.publish('notification:sent', {
  title: '欢迎回来',
  recipient: 'John Doe',
  sentAt: new Date().toISOString()
});

// 取消订阅
eventBus.unsubscribe('user:login', loginSubscriberId);`;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Radio className="text-yellow-400" size={32} />
            <h1 className="text-3xl font-bold">发布订阅模式 (Pub-Sub Pattern)</h1>
          </div>
          <p className="text-gray-400 text-lg">
            定义对象间一对多的依赖关系，实现松耦合的事件通信机制。
          </p>
        </div>
        
        <div className="mb-8">
          <PubSubDemo />
        </div>
        
        <div className="space-y-6 mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Code2 className="text-yellow-400" size={24} />
            <h2 className="text-2xl font-semibold">代码实现</h2>
          </div>
          
          <CodeExample
            title="发布订阅模式实现"
            code={pubsubCode}
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
            <BookOpen className="text-yellow-400" size={24} />
            <h2 className="text-xl font-semibold">发布订阅模式说明</h2>
          </div>
          <div className="text-gray-300 space-y-4">
            <p>
              发布订阅模式通过事件总线实现发布者和订阅者之间的松耦合通信。
              发布者不需要知道订阅者的存在，订阅者也不需要知道发布者的具体实现。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-yellow-400 mb-2">核心组件</h3>
                <ul className="text-sm space-y-1">
                  <li>• <strong>事件总线</strong>：管理事件的发布和订阅</li>
                  <li>• <strong>发布者</strong>：触发事件的对象</li>
                  <li>• <strong>订阅者</strong>：监听事件的对象</li>
                  <li>• <strong>事件</strong>：传递的消息和数据</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium text-blue-400 mb-2">应用场景</h3>
                <ul className="text-sm space-y-1">
                  <li>• 事件系统 (DOM事件、自定义事件)</li>
                  <li>• 状态管理 (Redux、MobX、Vuex)</li>
                  <li>• 消息队列系统</li>
                  <li>• 响应式编程 (RxJS、Vue响应式)</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 p-4 bg-green-600/20 border border-green-600/30 rounded-lg">
              <h4 className="text-green-400 font-medium mb-2">优势</h4>
              <p className="text-sm">
                发布订阅模式实现了组件间的松耦合，提高了代码的可维护性和可扩展性。
                新的订阅者可以随时加入，发布者也可以独立变化，非常适合大型应用的架构设计。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};