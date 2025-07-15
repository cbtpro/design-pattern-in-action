import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  GitBranch,
  Layers,
  FileText,
  Radio,
  BookOpen,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface MenuItem {
  id: string;
  label: string;
  path: string;
  icon: React.ReactNode;
  description?: string;
}

const menuItems: MenuItem[] = [
  {
    id: 'home',
    label: '首页',
    path: '/',
    icon: <Home size={20} />,
    description: '项目概览'
  },
  {
    id: 'bridge',
    label: '桥接模式',
    path: '/bridge',
    icon: <GitBranch size={20} />,
    description: '跨浏览器适配'
  },
  {
    id: 'flyweight',
    label: '享元模式',
    path: '/flyweight',
    icon: <Layers size={20} />,
    description: '内存优化'
  },
  {
    id: 'singleton',
    label: '单例模式',
    path: '/singleton',
    icon: <FileText size={20} />,
    description: '唯一实例'
  },
  {
    id: 'pubsub',
    label: '发布订阅',
    path: '/pubsub',
    icon: <Radio size={20} />,
    description: '事件通信'
  },
  {
    id: 'patterns',
    label: '模式详解',
    path: '/patterns',
    icon: <BookOpen size={20} />,
    description: '理论知识'
  }
];

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className={`bg-gray-800 border-r border-gray-700 transition-all duration-300 ${isCollapsed ? 'w-18' : 'w-64'
      }`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {!isCollapsed && (
          <h2 className="text-white font-bold text-lg">设计模式</h2>
        )}
        <button
          onClick={onToggle}
          className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md transition-colors"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <Link
                to={item.path}
                className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive(item.path)
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                title={isCollapsed ? item.label : undefined}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <div className="truncate">{item.label}</div>
                    {item.description && (
                      <div className="text-xs text-gray-400 truncate">
                        {item.description}
                      </div>
                    )}
                  </div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* {!isCollapsed && (
        <div className="sticky bottom-4 left-4 right-4">
          <div className="bg-gray-700 rounded-lg p-3">
            <div className="text-xs text-gray-400 mb-1">学习进度</div>
            <div className="w-full bg-gray-600 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '10%' }}></div>
            </div>
            <div className="text-xs text-gray-400 mt-1">0/5 模式已学习</div>
          </div>
        </div>
      )} */}
    </div>
  );
};