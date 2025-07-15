import React from 'react';
import { Link } from 'react-router-dom';
import { BrowserInfo } from '../components/BrowserInfo';
import { CodeExample } from '../components/CodeExample';
import { 
  Code2, 
  BookOpen, 
  GitBranch, 
  Layers, 
  FileText, 
  Radio,
  ArrowRight,
  Target,
  Zap,
  Shield
} from 'lucide-react';

export const Home: React.FC = () => {
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

  const patterns = [
    {
      id: 'bridge',
      title: '桥接模式',
      description: '分离抽象和实现，支持跨浏览器通知和标签页通信',
      icon: <GitBranch className="text-blue-400" size={24} />,
      path: '/bridge',
      color: 'blue',
      features: ['跨浏览器兼容', '通知系统', '标签页通信']
    },
    {
      id: 'flyweight',
      title: '享元模式',
      description: '通过共享减少内存使用，支持大量图标实例',
      icon: <Layers className="text-green-400" size={24} />,
      path: '/flyweight',
      color: 'green',
      features: ['内存优化', '对象共享', '性能提升']
    },
    {
      id: 'singleton',
      title: '单例模式',
      description: '确保唯一实例，全局日志管理系统',
      icon: <FileText className="text-purple-400" size={24} />,
      path: '/singleton',
      color: 'purple',
      features: ['唯一实例', '全局访问', '资源管理']
    },
    {
      id: 'pubsub',
      title: '发布订阅',
      description: '松耦合事件通信，支持多种事件类型',
      icon: <Radio className="text-yellow-400" size={24} />,
      path: '/pubsub',
      color: 'yellow',
      features: ['事件通信', '松耦合', '异步处理']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="p-3 bg-blue-600 rounded-lg">
              <Code2 size={32} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              设计模式学习项目
            </h1>
          </div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            通过交互式演示和实际代码示例，深入理解常用设计模式的原理和应用场景
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center space-x-3 mb-4">
              <Target className="text-blue-400" size={24} />
              <h3 className="text-xl font-semibold">实践导向</h3>
            </div>
            <p className="text-gray-300">
              每个模式都配有完整的代码实现和交互式演示，让你在实践中掌握设计模式
            </p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center space-x-3 mb-4">
              <Zap className="text-green-400" size={24} />
              <h3 className="text-xl font-semibold">现代技术</h3>
            </div>
            <p className="text-gray-300">
              使用React、TypeScript、Redux等现代前端技术栈实现，贴近实际开发场景
            </p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="text-purple-400" size={24} />
              <h3 className="text-xl font-semibold">最佳实践</h3>
            </div>
            <p className="text-gray-300">
              展示设计模式在实际项目中的应用，包含错误处理、性能优化等最佳实践
            </p>
          </div>
        </div>

        {/* Browser Info */}
        <div className="mb-12">
          <BrowserInfo />
        </div>

        {/* Pattern Cards */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 flex items-center space-x-2">
            <BookOpen className="text-blue-400" size={28} />
            <span>设计模式演示</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {patterns.map((pattern) => (
              <Link
                key={pattern.id}
                to={pattern.path}
                className="group bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {pattern.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                        {pattern.title}
                      </h3>
                      <ArrowRight className="text-gray-400 group-hover:text-blue-400 transition-colors" size={20} />
                    </div>
                    <p className="text-gray-300 mb-4">{pattern.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {pattern.features.map((feature, index) => (
                        <span
                          key={index}
                          className={`px-2 py-1 text-xs rounded-full bg-${pattern.color}-600/20 text-${pattern.color}-400 border border-${pattern.color}-600/30`}
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Code Example */}
        <div className="mb-12">
          <div className="flex items-center space-x-2 mb-6">
            <Code2 className="text-blue-400" size={24} />
            <h2 className="text-2xl font-semibold">代码示例</h2>
          </div>
          
          <CodeExample
            title="桥接模式实现"
            code={bridgePatternCode}
            language="typescript"
          />
        </div>

        {/* Getting Started */}
        <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
          <div className="flex items-center space-x-2 mb-4">
            <BookOpen className="text-blue-400" size={24} />
            <h2 className="text-2xl font-semibold">开始学习</h2>
          </div>
          <div className="text-gray-300 space-y-4">
            <p>
              设计模式是软件设计中常见问题的典型解决方案。它们就像预先制作的蓝图，可以定制来解决代码中反复出现的设计问题。
            </p>
            <p>
              本项目通过实际的代码示例和交互式演示，帮助你理解和掌握四种重要的设计模式：
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li><strong>桥接模式</strong> - 处理不同浏览器API差异，实现跨平台兼容</li>
              <li><strong>享元模式</strong> - 通过共享减少内存使用，支持大量对象实例</li>
              <li><strong>单例模式</strong> - 确保全局唯一实例，如日志管理系统</li>
              <li><strong>发布订阅模式</strong> - 实现松耦合的事件通信机制</li>
            </ul>
            <div className="mt-6">
              <Link
                to="/bridge"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <span>开始学习桥接模式</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};