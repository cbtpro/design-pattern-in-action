import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { addIcon, removeIcon, clearIcons, updateMemoryUsage } from '../store/slices/flyweightSlice';
import { IconFlyweightFactory } from '../patterns/flyweight/IconFlyweight';
import { getIconContext } from '../patterns/flyweight/singletonIconContext';
import { Layers, Plus, Trash2, BarChart3 } from 'lucide-react';

export const FlyweightDemo: React.FC = () => {
  const dispatch = useDispatch();
  const { icons, memoryUsage } = useSelector((state: RootState) => state.flyweight);
  const iconContext = getIconContext();
  const [selectedIconType, setSelectedIconType] = useState('首页');

  const iconTypes = ['首页', '用户', '星星', '爱心', '铃铛'];
  const colors = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6'];

  useEffect(() => {
    // 更新内存使用情况
    const usage = iconContext.getMemoryUsage();
    dispatch(updateMemoryUsage(usage));
  }, [icons.length, dispatch, iconContext]);

  const handleAddIcon = () => {
    const x = Math.random() * 400;
    const y = Math.random() * 200;
    const size = 20 + Math.random() * 20;
    const idx = iconTypes.indexOf(selectedIconType);
    const color = colors[idx];

    const id = iconContext.addIcon(selectedIconType, x, y, size, color);
    dispatch(addIcon({
      id,
      type: selectedIconType,
      context: { id, x, y, size, color }
    }));
  };
  const handleRemoveIcon = (id: string) => {
    iconContext.removeIcon(id);
    dispatch(removeIcon(id));
  };

  const handleClearIcons = () => {
    iconContext.getIcons().forEach(icon => iconContext.removeIcon(icon.id));
    dispatch(clearIcons());
    IconFlyweightFactory.removeAll();
  };

  const formatBytes = (bytes: number) => {
    return `${bytes} bytes`;
  };

  const savingsPercentage = memoryUsage.withoutFlyweight > 0
    ? Math.round((1 - memoryUsage.withFlyweight / memoryUsage.withoutFlyweight) * 100)
    : 0;

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center space-x-2 mb-4">
        <Layers className="text-blue-400" size={24} />
        <h2 className="text-xl font-semibold text-white">享元模式演示</h2>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <BarChart3 className="text-green-400" size={16} />
              <h3 className="text-white font-medium">内存使用</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-300">使用享元:</span>
                <span className="text-green-400">{formatBytes(memoryUsage.withFlyweight)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">不使用享元:</span>
                <span className="text-red-400">{formatBytes(memoryUsage.withoutFlyweight)}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span className="text-gray-300">节省:</span>
                <span className="text-blue-400">{savingsPercentage}%</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="text-white font-medium mb-2">统计信息</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-300">图标实例:</span>
                <span className="text-white">{icons.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">享元对象:</span>
                <span className="text-white">{IconFlyweightFactory.getFlyweightCount()}</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="text-white font-medium mb-2">控制面板</h3>
            <div className="space-y-2">
              <select
                value={selectedIconType}
                onChange={(e) => setSelectedIconType(e.target.value)}
                className="w-full px-2 py-1 bg-gray-600 border border-gray-500 rounded text-white text-sm"
              >
                {iconTypes.map(type => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
              <div className="flex space-x-1">
                <button
                  onClick={handleAddIcon}
                  className="flex items-center space-x-1 px-2 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
                >
                  <Plus size={12} />
                  <span>添加</span>
                </button>
                <button
                  onClick={handleClearIcons}
                  className="flex items-center space-x-1 px-2 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors"
                >
                  <Trash2 size={12} />
                  <span>清除</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h3 className="text-white font-medium mb-3">图标画布</h3>
          <div
            className="relative bg-gray-600 rounded border-2 border-dashed border-gray-500 overflow-hidden"
            style={{ height: '250px' }}
          >
            {icons.map((icon) => (
              <div
                key={icon.id}
                className="absolute cursor-pointer hover:opacity-75 transition-opacity"
                style={{
                  left: icon.context.x,
                  top: icon.context.y,
                  width: icon.context.size,
                  height: icon.context.size
                }}
                onClick={() => handleRemoveIcon(icon.id)}
                title={`${icon.type} - 点击删除`}
                dangerouslySetInnerHTML={{
                  __html: IconFlyweightFactory.getFlyweight(icon.type).render({
                    ...icon.context,
                  })
                }}
              >

              </div>
            ))}
            {icons.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                点击"添加"按钮创建图标实例
              </div>
            )}
          </div>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h3 className="text-white font-medium mb-2">享元模式说明</h3>
          <p className="text-gray-300 text-sm">
            享元模式通过共享相同的内在状态（图标类型和SVG路径）来减少内存使用。
            每种图标类型只创建一个享元对象，而位置、大小、颜色等外在状态存储在上下文中。
            这样可以支持大量图标实例而不会消耗过多内存。
          </p>
        </div>
      </div>
    </div>
  );
};