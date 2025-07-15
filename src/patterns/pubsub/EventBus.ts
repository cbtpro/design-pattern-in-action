import { EventData, Subscriber } from '../../types';

// 发布订阅模式 - 事件总线
export class EventBus {
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
  
  // 取消订阅
  unsubscribe(eventType: string, subscriberId: string): boolean {
    const subscribers = this.subscribers.get(eventType);
    if (!subscribers) return false;
    
    const index = subscribers.findIndex(sub => sub.id === subscriberId);
    if (index === -1) return false;
    
    subscribers.splice(index, 1);
    
    // 如果没有订阅者了，删除事件类型
    if (subscribers.length === 0) {
      this.subscribers.delete(eventType);
    }
    
    return true;
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
    if (this.eventHistory.length > 50) {
      this.eventHistory = this.eventHistory.slice(0, 50);
    }
    
    // 通知所有订阅者
    const subscribers = this.subscribers.get(eventType);
    if (subscribers) {
      subscribers.forEach(subscriber => {
        try {
          subscriber.callback(eventData);
        } catch (error) {
          console.error(`Error in subscriber ${subscriber.id}:`, error);
        }
      });
    }
  }
  
  // 获取所有订阅者信息
  getSubscribers(): Record<string, number> {
    const result: Record<string, number> = {};
    this.subscribers.forEach((subscribers, eventType) => {
      result[eventType] = subscribers.length;
    });
    return result;
  }
  
  // 获取事件历史
  getEventHistory(): EventData[] {
    return [...this.eventHistory];
  }
  
  // 获取活跃的事件类型
  getActiveEventTypes(): string[] {
    return Array.from(this.subscribers.keys());
  }
  
  // 清除所有订阅
  clear(): void {
    this.subscribers.clear();
    this.eventHistory = [];
  }
}

// 预定义的事件类型
export const EventTypes = {
  USER_LOGIN: 'user:login',
  USER_LOGOUT: 'user:logout',
  NOTIFICATION_SENT: 'notification:sent',
  TAB_MESSAGE: 'tab:message',
  THEME_CHANGED: 'theme:changed',
  DATA_UPDATED: 'data:updated'
} as const;

// 事件发布器示例
export class EventPublisher {
  private eventBus: EventBus;
  
  constructor() {
    this.eventBus = EventBus.getInstance();
  }
  
  // 用户登录事件
  publishUserLogin(userId: string, username: string): void {
    this.eventBus.publish(EventTypes.USER_LOGIN, {
      userId,
      username,
      loginTime: new Date().toISOString()
    });
  }
  
  // 通知发送事件
  publishNotificationSent(title: string, recipient: string): void {
    this.eventBus.publish(EventTypes.NOTIFICATION_SENT, {
      title,
      recipient,
      sentAt: new Date().toISOString()
    });
  }
  
  // 主题变更事件
  publishThemeChanged(theme: string): void {
    this.eventBus.publish(EventTypes.THEME_CHANGED, {
      theme,
      changedAt: new Date().toISOString()
    });
  }
  
  // 数据更新事件
  publishDataUpdated(dataType: string, data: any): void {
    this.eventBus.publish(EventTypes.DATA_UPDATED, {
      dataType,
      data,
      updatedAt: new Date().toISOString()
    });
  }
}