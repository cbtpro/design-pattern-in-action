import React from 'react';
import { FlyweightDemo } from '../components/FlyweightDemo';
import { CodeExample } from '../components/CodeExample';
import { Layers, Code2, BookOpen } from 'lucide-react';

export const FlyweightPage: React.FC = () => {
  const flyweightCode = `// 享元模式实现
class ConcreteIconFlyweight implements IconFlyweight {
  private iconType: string;
  private svgPath: string;
  
  constructor(iconType: string, svgPath: string) {
    this.iconType = iconType;
    this.svgPath = svgPath;
  }
  
  render(context: IconContext): string {
    return \`
      <svg 
        width="\${context.size}" 
        height="\${context.size}" 
        viewBox="0 0 24 24" 
        fill="\${context.color}"
        style="position: absolute; left: \${context.x}px; top: \${context.y}px;"
      >
        <path d="\${this.svgPath}" />
      </svg>
    \`;
  }
}

// 享元工厂
class IconFlyweightFactory {
  private static flyweights: Map<string, IconFlyweight> = new Map();
  
  static getFlyweight(iconType: string): IconFlyweight {
    if (!this.flyweights.has(iconType)) {
      const svgPath = this.iconPaths[iconType] || this.iconPaths.home;
      this.flyweights.set(iconType, new ConcreteIconFlyweight(iconType, svgPath));
    }
    return this.flyweights.get(iconType)!;
  }
}

// 上下文类 - 管理外部状态
class IconContext {
  private icons: Array<{
    id: string;
    type: string;
    x: number;
    y: number;
    size: number;
    color: string;
  }> = [];
  
  addIcon(type: string, x: number, y: number, size: number, color: string): string {
    const id = Math.random().toString(36).substr(2, 9);
    this.icons.push({ id, type, x, y, size, color });
    return id;
  }
}`;

  const usageCode = `// 使用示例
const iconContext = new IconContext();

// 创建大量图标实例
for (let i = 0; i < 1000; i++) {
  iconContext.addIcon(
    'home',
    Math.random() * 800,
    Math.random() * 600,
    20 + Math.random() * 20,
    colors[Math.floor(Math.random() * colors.length)]
  );
}

// 内存使用对比
const memoryUsage = iconContext.getMemoryUsage();
console.log('使用享元模式:', memoryUsage.withFlyweight, 'bytes');
console.log('不使用享元模式:', memoryUsage.withoutFlyweight, 'bytes');
console.log('节省内存:', Math.round((1 - memoryUsage.withFlyweight / memoryUsage.withoutFlyweight) * 100), '%');`;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Layers className="text-green-400" size={32} />
            <h1 className="text-3xl font-bold">享元模式 (Flyweight Pattern)</h1>
          </div>
          <p className="text-gray-400 text-lg">
            通过共享技术有效支持大量细粒度对象，减少内存使用，提高性能。
          </p>
        </div>
        
        <div className="mb-8">
          <FlyweightDemo />
        </div>
        
        <div className="space-y-6 mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Code2 className="text-green-400" size={24} />
            <h2 className="text-2xl font-semibold">代码实现</h2>
          </div>
          
          <CodeExample
            title="享元模式实现"
            code={flyweightCode}
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
            <BookOpen className="text-green-400" size={24} />
            <h2 className="text-xl font-semibold">享元模式说明</h2>
          </div>
          <div className="text-gray-300 space-y-4">
            <p>
              享元模式通过共享相同的内在状态来减少内存使用。在图标系统中，每种图标类型只创建一个享元对象，
              而位置、大小、颜色等外在状态存储在上下文中。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-green-400 mb-2">核心概念</h3>
                <ul className="text-sm space-y-1">
                  <li>• <strong>内在状态</strong>：可以共享的不变数据</li>
                  <li>• <strong>外在状态</strong>：随环境变化的数据</li>
                  <li>• <strong>享元工厂</strong>：管理享元对象的创建</li>
                  <li>• <strong>上下文</strong>：存储外在状态</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium text-blue-400 mb-2">应用场景</h3>
                <ul className="text-sm space-y-1">
                  <li>• 游戏中的粒子系统</li>
                  <li>• 文本编辑器的字符渲染</li>
                  <li>• 图标库和UI组件库</li>
                  <li>• 大量相似对象的缓存</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};