import React from 'react';
import { SingletonDemo } from '../components/SingletonDemo';
import { CodeExample } from '../components/CodeExample';
import { FileText, Code2, BookOpen } from 'lucide-react';

export const SingletonPage: React.FC = () => {
  const singletonCode = `// 单例模式实现
class Logger {
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
    console[level](\`[\${new Date(entry.timestamp).toLocaleTimeString()}] \${message}\`);
  }
  
  // 获取所有日志
  getLogs(): LogEntry[] {
    return [...this.logs];
  }
}`;

  const usageCode = `// 使用示例
// 无论调用多少次，都返回同一个实例
const logger1 = Logger.getInstance();
const logger2 = Logger.getInstance();
const logger3 = Logger.getInstance();

console.log(logger1 === logger2); // true
console.log(logger2 === logger3); // true
console.log(Logger.getInstanceCount()); // 1

// 使用日志功能
logger1.info('应用程序启动');
logger2.warn('这是一个警告消息');
logger3.error('发生了一个错误');

// 所有实例共享相同的日志数据
console.log(logger1.getLogs().length); // 4 (包括创建时的日志)
console.log(logger2.getLogs().length); // 4
console.log(logger3.getLogs().length); // 4`;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <FileText className="text-purple-400" size={32} />
            <h1 className="text-3xl font-bold">单例模式 (Singleton Pattern)</h1>
          </div>
          <p className="text-gray-400 text-lg">
            确保一个类只有一个实例，并提供全局访问点。常用于配置管理和日志系统。
          </p>
        </div>
        
        <div className="mb-8">
          <SingletonDemo />
        </div>
        
        <div className="space-y-6 mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Code2 className="text-purple-400" size={24} />
            <h2 className="text-2xl font-semibold">代码实现</h2>
          </div>
          
          <CodeExample
            title="单例模式实现"
            code={singletonCode}
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
            <BookOpen className="text-purple-400" size={24} />
            <h2 className="text-xl font-semibold">单例模式说明</h2>
          </div>
          <div className="text-gray-300 space-y-4">
            <p>
              单例模式通过私有构造函数和静态方法确保类只能创建一个实例。
              这在需要全局唯一对象的场景中非常有用，如日志管理器、配置管理器等。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-purple-400 mb-2">实现要点</h3>
                <ul className="text-sm space-y-1">
                  <li>• 私有构造函数防止外部实例化</li>
                  <li>• 静态方法提供全局访问点</li>
                  <li>• 延迟初始化节省资源</li>
                  <li>• 线程安全考虑（在多线程环境中）</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium text-blue-400 mb-2">应用场景</h3>
                <ul className="text-sm space-y-1">
                  <li>• 日志管理器 (Logger)</li>
                  <li>• 配置管理器 (Config Manager)</li>
                  <li>• 数据库连接池</li>
                  <li>• 缓存管理器 (Cache Manager)</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 p-4 bg-yellow-600/20 border border-yellow-600/30 rounded-lg">
              <h4 className="text-yellow-400 font-medium mb-2">注意事项</h4>
              <p className="text-sm">
                单例模式虽然有用，但也要谨慎使用。过度使用可能导致代码耦合度增加，
                测试困难等问题。在现代开发中，依赖注入等模式往往是更好的选择。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};