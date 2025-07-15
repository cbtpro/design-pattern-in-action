import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { useBridge } from '../hooks/useBridge';
import { setPermission, addNotification, clearNotifications } from '../store/slices/notificationSlice';
import { Bell, Send, Trash2, Settings } from 'lucide-react';

export const NotificationDemo: React.FC = () => {
  const dispatch = useDispatch();
  const bridge = useBridge();
  const { permission, notifications } = useSelector((state: RootState) => state.notifications);

  const [title, setTitle] = useState('测试通知');
  const [body, setBody] = useState('这是一个桥接模式的通知示例');
  const [requireInteraction, setRequireInteraction] = useState(false);

  const handleRequestPermission = async () => {
    if (bridge) {
      const newPermission = await bridge.current?.requestPermission();
      dispatch(setPermission(newPermission));
    }
  };

  const handleSendNotification = async () => {
    if (bridge && bridge.current && title) {
      const success = await bridge.current.showNotification({
        title,
        body,
        requireInteraction,
        tag: 'demo-notification'
      });

      if (success) {
        dispatch(addNotification({
          id: Math.random().toString(36).substr(2, 9),
          title,
          body,
          timestamp: Date.now()
        }));
      }
    }
  };

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('zh-CN');
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center space-x-2 mb-4">
        <Bell className="text-blue-400" size={24} />
        <h2 className="text-xl font-semibold text-white">通知系统演示</h2>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-300">通知权限:</span>
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded text-sm ${permission === 'granted' ? 'bg-green-600 text-white' :
              permission === 'denied' ? 'bg-red-600 text-white' :
                'bg-yellow-600 text-white'
              }`}>
              {permission === 'granted' ? '已授权' : permission === 'denied' ? '已拒绝' : '未授权'}
            </span>
            {permission !== 'granted' && (
              <button
                onClick={handleRequestPermission}
                className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                <Settings size={14} />
                <span>请求权限</span>
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">标题</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="输入通知标题"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">内容</label>
            <input
              type="text"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="输入通知内容"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="requireInteraction"
            checked={requireInteraction}
            onChange={(e) => setRequireInteraction(e.target.checked)}
            className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
          />
          <label htmlFor="requireInteraction" className="text-gray-300">
            需要用户交互才能关闭
          </label>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={handleSendNotification}
            disabled={permission !== 'granted' || !title}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={16} />
            <span>发送通知</span>
          </button>

          <button
            onClick={() => dispatch(clearNotifications())}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            <Trash2 size={16} />
            <span>清除历史</span>
          </button>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-medium text-white mb-3">通知历史</h3>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="text-gray-400 text-center py-4">暂无通知记录</p>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="bg-gray-700 rounded-md p-3 border border-gray-600"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-white">{notification.title}</h4>
                      <p className="text-gray-300 text-sm mt-1">{notification.body}</p>
                    </div>
                    <span className="text-xs text-gray-400">
                      {formatTimestamp(notification.timestamp)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};