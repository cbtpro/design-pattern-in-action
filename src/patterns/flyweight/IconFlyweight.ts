import { IconFlyweight, IIconContext } from '../../types';

// 上下文类 - 管理外部状态
export class IconContext {
  private icons: Array<{
    id: string;
    type: string;
    x: number;
    y: number;
    size: number;
    color: string;
  }> = [];

  addIcon(type: string, x: number, y: number, size: number, color: string): string {
    const id = Math.random().toString(36).substring(2, 9);
    this.icons.push({ id, type, x, y, size, color });
    return id;
  }

  removeIcon(id: string): void {
    this.icons = this.icons.filter(icon => icon.id !== id);
  }
  getIcons() {
    return [...this.icons];
  }

  getMemoryUsage() {
    // 模拟内存使用计算
    const flyweightMemory = IconFlyweightFactory.getFlyweightCount() * 100; // 每个享元100字节
    const contextMemory = this.icons.length * 50; // 每个上下文50字节
    const withFlyweight = flyweightMemory + contextMemory;

    // 不使用享元模式的内存使用（每个图标都包含完整数据）
    const withoutFlyweight = this.icons.length * 150; // 每个图标150字节

    return { withFlyweight, withoutFlyweight };
  }
}
// 具体享元类 - 图标类型
export class ConcreteIconFlyweight implements IconFlyweight {
  private iconType: string;
  private svgPath: string;

  constructor(iconType: string, svgPath: string) {
    this.iconType = iconType;
    this.svgPath = svgPath;
  }

  render(context: IIconContext): string {
    return `
      <svg
        data-id="${context.id}"
        data-icon-type="${this.iconType}"
        width="${context.size}" 
        height="${context.size}" 
        viewBox="0 0 24 24" 
        fill="${context.color}"
      >
        <path d="${this.svgPath}" />
      </svg>
    `;
  }

  getType(): string {
    return this.iconType;
  }
}

// 享元工厂
export class IconFlyweightFactory {
  private static flyweights: Map<string, IconFlyweight> = new Map();

  // 预定义的图标路径
  private static iconPaths: Record<string, string> = {
    首页: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    用户: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
    星星: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
    爱心: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
    铃铛: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
  };

  static getFlyweight(iconType: string): IconFlyweight {
    if (!this.flyweights.has(iconType)) {
      const svgPath = this.iconPaths[iconType] || this.iconPaths.home;
      this.flyweights.set(iconType, new ConcreteIconFlyweight(iconType, svgPath));
    }
    return this.flyweights.get(iconType)!;
  }

  static getFlyweightCount(): number {
    return this.flyweights.size;
  }

  static getAllFlyweights(): Record<string, IconFlyweight> {
    const result: Record<string, IconFlyweight> = {};
    this.flyweights.forEach((flyweight, key) => {
      result[key] = flyweight;
    });
    return result;
  }
  static removeAll() {
    this.flyweights.clear();
  }
}
