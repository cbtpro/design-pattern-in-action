import { LogEntry } from '../../types';

// 单例模式 - 日志管理器
export class Logger {
  private static instance: Logger | null = null;
  private static instanceCount = 0;
  private logs: LogEntry[] = [];
  
  private constructor() {
    Logger.instanceCount++;
    this.log('info', 'Logger instance created');
  }
  
  // 获取单例实例
  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }
  
  // 获取实例创建次数（用于演示）
  static getInstanceCount(): number {
    return Logger.instanceCount;
  }
  
  // 重置单例（仅用于演示）
  static reset(): void {
    Logger.instance = null;
  }
  
  // 记录日志
  log(level: 'info' | 'warn' | 'error', message: string): void {
    const entry: LogEntry = {
      id: Math.random().toString(36).substr(2, 9),
      level,
      message,
      timestamp: Date.now()
    };
    
    this.logs.unshift(entry);
    
    // 限制日志数量
    if (this.logs.length > 100) {
      this.logs = this.logs.slice(0, 100);
    }
    
    // 输出到控制台
    console[level](`[${new Date(entry.timestamp).toLocaleTimeString()}] ${message}`);
  }
  
  // 获取所有日志
  getLogs(): LogEntry[] {
    return [...this.logs];
  }
  
  // 清除日志
  clearLogs(): void {
    this.logs = [];
    this.log('info', 'Logs cleared');
  }
  
  // 信息日志
  info(message: string): void {
    this.log('info', message);
  }
  
  // 警告日志
  warn(message: string): void {
    this.log('warn', message);
  }
  
  // 错误日志
  error(message: string): void {
    this.log('error', message);
  }
}

// 演示多次尝试创建实例
export class LoggerDemo {
  static demonstrateSingleton(): { 
    instances: Logger[], 
    areEqual: boolean, 
    instanceCount: number 
  } {
    const instances: Logger[] = [];
    
    // 尝试创建多个实例
    for (let i = 0; i < 5; i++) {
      instances.push(Logger.getInstance());
    }
    
    // 检查所有实例是否相等
    const areEqual = instances.every(instance => instance === instances[0]);
    
    return {
      instances,
      areEqual,
      instanceCount: Logger.getInstanceCount()
    };
  }
}