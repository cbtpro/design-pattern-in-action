// 浏览器类型定义
export interface BrowserInfo {
  name: string;
  version: string;
  platform: string;
}

// 通知接口
export interface NotificationOptions {
  title: string;
  body?: string;
  icon?: string;
  tag?: string;
  requireInteraction?: boolean;
}

// 桥接模式接口
export interface BrowserBridge {
  showNotification(options: NotificationOptions): Promise<boolean>;
  requestPermission(): Promise<string>;
  sendTabMessage(message: any): void;
  onTabMessage(callback: (message: any) => void): void;
  getBrowserInfo(): BrowserInfo;
}

// Redux状态类型
export interface RootState {
  notifications: NotificationState;
  tabCommunication: TabCommunicationState;
  browser: BrowserState;
  flyweight: FlyweightState;
  pubsub: PubSubState;
  singleton: SingletonState;
}

export interface NotificationState {
  permission: string | undefined;
  notifications: Array<{
    id: string;
    title: string;
    body: string;
    timestamp: number;
  }>;
}

export interface TabCommunicationState {
  messages: Array<{
    id: string;
    content: string;
    timestamp: number;
    fromTab: string;
  }>;
  activeChannels: string[];
}

export interface BrowserState {
  info: BrowserInfo;
  supportedFeatures: string[];
}
export interface IIconContext {
  x: number;
  y: number;
  size: number;
  color: string;
}

// 享元模式相关类型
export interface IconFlyweight {
  render(context: IIconContext): string;
}

export interface IconInstance {
  id: string;
  type: string;
  context: IIconContext;
}

// 发布订阅模式相关类型
export interface EventData {
  type: string;
  payload: any;
  timestamp: number;
}

export interface Subscriber {
  id: string;
  callback: (data: EventData) => void;
}

// 单例模式相关类型
export interface LogEntry {
  id: string;
  level: 'info' | 'warn' | 'error';
  message: string;
  timestamp: number;
}

// Redux状态扩展
export interface FlyweightState {
  icons: IconInstance[];
  flyweights: Record<string, IconFlyweight>;
  memoryUsage: {
    withFlyweight: number;
    withoutFlyweight: number;
  };
}

export interface PubSubState {
  events: EventData[];
  subscribers: Record<string, Subscriber[]>;
  activeChannels: string[];
}

export interface SingletonState {
  logs: LogEntry[];
  instanceCount: number;
}