import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { addEvent, clearEvents, setSubscribers, setActiveChannels } from '../store/slices/pubsubSlice';
import { EventBus, EventTypes, EventPublisher } from '../patterns/pubsub/EventBus';
import { Radio, Send, Users, Trash2, Bell } from 'lucide-react';

export const PubSubDemo: React.FC = () => {
  const dispatch = useDispatch();
  const { events, subscribers, activeChannels } = useSelector((state: RootState) => state.pubsub);
  const [eventBus] = useState(() => EventBus.getInstance());
  const [eventPublisher] = useState(() => new EventPublisher());
  const [subscriberIds, setSubscriberIds] = useState<string[]>([]);
  
  const [customEventType, setCustomEventType] = useState('');
  const [customPayload, setCustomPayload] = useState('');
  const [selectedEventType, setSelectedEventType] = useState(EventTypes.USER_LOGIN);
  
  useEffect(() => {
    // 创建一些示例订阅者
    const ids: string[] = [];
    
    // 用户登录订阅者
    const loginId = eventBus.subscribe(EventTypes.USER_LOGIN, (data) => {
      console.log('用户登录事件:', data);
      dispatch(addEvent(data));
    });
    ids.push(loginId);
    
    // 通知发送订阅者
    const notificationId = eventBus.subscribe(EventTypes.NOTIFICATION_SENT, (data) => {
      console.log('通知发送事件:', data);
      dispatch(addEvent(data));
    });
    ids.push(notificationId);
    
    // 主题变更订阅者
    const themeId = eventBus.subscribe(EventTypes.THEME_CHANGED, (data) => {
      console.log('主题变更事件:', data);
      dispatch(addEvent(data));
    });
    ids.push(themeId);
    
    setSubscriberIds(ids);
    
    // 定期更新订阅者信息
    const interval = setInterval(() => {
      const currentSubscribers = eventBus.getSubscribers();
      const currentChannels = eventBus.getActiveEventTypes();
      
      dispatch(setSubscribers(currentSubscribers));
      dispatch(setActiveChannels(currentChannels));
    }, 500);
    
    return () => {
      clearInterval(interval);
      // 清理订阅
      ids.forEach(id => {
        Object.values(EventTypes).forEach(eventType => {
          eventBus.unsubscribe(eventType, id);
        });
      });
    };
  }, [eventBus, dispatch]);
  
  const handlePublishPredefined = () => {
    switch (selectedEventType) {
      case EventTypes.USER_LOGIN:
        eventPublisher.publishUserLogin('user123', 'John Doe');
        break;
      case EventTypes.NOTIFICATION_SENT:
        eventPublisher.publishNotificationSent('新消息', 'user123');
        break;
      case EventTypes.THEME_CHANGED:
        eventPublisher.publishThemeChanged('dark');
        break;
      case EventTypes.DATA_UPDATED:
        eventPublisher.publishDataUpdated('userProfile', { name: 'John', age: 30 });
        break;
    }
  };
  
  const handlePublishCustom = () => {
    if (customEventType.trim() && customPayload.trim()) {
      try {
        const payload = JSON.parse(customPayload);
        eventBus.publish(customEventType, payload);
      } catch (error) {
        eventBus.publish(customEventType, customPayload);
      }
      setCustomEventType('');
      setCustomPayload('');
    }
  };
  
  const handleSubscribeToCustom = () => {
    if (customEventType.trim()) {
      const id = eventBus.subscribe(customEventType, (data) => {
        console.log(`自定义事件 ${customEventType}:`, data);
        dispatch(addEvent(data));
      });
      setSubscriberIds([...subscriberIds, id]);
    }
  };
  
  const handleClearEvents = () => {
    dispatch(clearEvents());
  };
  
  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('zh-CN');
  };
  
  const getEventTypeDisplayName = (eventType: string) => {
    const typeMap: Record<string, string> = {
      [EventTypes.USER_LOGIN]: '用户登录',
      [EventTypes.USER_LOGOUT]: '用户登出',
      [EventTypes.NOTIFICATION_SENT]: '通知发送',
      [EventTypes.TAB_MESSAGE]: '标签页消息',
      [EventTypes.THEME_CHANGED]: '主题变更',
      [EventTypes.DATA_UPDATED]: '数据更新'
    };
    return typeMap[eventType] || eventType;
  };
  
  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center space-x-2 mb-4">
        <Radio className="text-blue-400" size={24} />
        <h2 className="text-xl font-semibold text-white">发布订阅模式演示</h2>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Users className="text-green-400" size={16} />
              <h3 className="text-white font-medium">订阅者统计</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-300">活跃频道:</span>
                <span className="text-white">{activeChannels.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">总订阅数:</span>
                <span className="text-white">
                  {Object.values(subscribers).reduce((sum, count) => sum + count, 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">事件历史:</span>
                <span className="text-white">{events.length}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="text-white font-medium mb-3">活跃频道</h3>
            <div className="space-y-1 max-h-24 overflow-y-auto">
              {activeChannels.length === 0 ? (
                <p className="text-gray-400 text-sm">暂无活跃频道</p>
              ) : (
                activeChannels.map((channel) => (
                  <div key={channel} className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">{getEventTypeDisplayName(channel)}</span>
                    <span className="text-blue-400">{subscribers[channel] || 0} 订阅者</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="text-white font-medium mb-3">发布预定义事件</h3>
            <div className="space-y-2">
              <select
                value={selectedEventType}
                onChange={(e) => setSelectedEventType(e.target.value)}
                className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white text-sm"
              >
                {Object.entries(EventTypes).map(([key, value]) => (
                  <option key={key} value={value}>
                    {getEventTypeDisplayName(value)}
                  </option>
                ))}
              </select>
              <button
                onClick={handlePublishPredefined}
                className="flex items-center justify-center space-x-2 w-full px-3 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
              >
                <Send size={14} />
                <span>发布事件</span>
              </button>
            </div>
          </div>
          
          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="text-white font-medium mb-3">自定义事件</h3>
            <div className="space-y-2">
              <input
                type="text"
                value={customEventType}
                onChange={(e) => setCustomEventType(e.target.value)}
                className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white text-sm"
                placeholder="事件类型..."
              />
              <input
                type="text"
                value={customPayload}
                onChange={(e) => setCustomPayload(e.target.value)}
                className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white text-sm"
                placeholder="事件数据 (JSON)..."
              />
              <div className="flex space-x-1">
                <button
                  onClick={handlePublishCustom}
                  disabled={!customEventType.trim() || !customPayload.trim()}
                  className="flex-1 px-2 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
                >
                  发布
                </button>
                <button
                  onClick={handleSubscribeToCustom}
                  disabled={!customEventType.trim()}
                  className="flex-1 px-2 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
                >
                  订阅
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Bell className="text-blue-400" size={16} />
              <h3 className="text-white font-medium">事件历史</h3>
            </div>
            <button
              onClick={handleClearEvents}
              className="flex items-center space-x-1 px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors"
            >
              <Trash2 size={14} />
              <span>清除</span>
            </button>
          </div>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {events.length === 0 ? (
              <p className="text-gray-400 text-center py-4">暂无事件记录</p>
            ) : (
              events.map((event, index) => (
                <div
                  key={index}
                  className="bg-gray-600 rounded p-3 border border-gray-500"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-blue-400 font-medium text-sm">
                      {getEventTypeDisplayName(event.type)}
                    </span>
                    <span className="text-xs text-gray-400">
                      {formatTimestamp(event.timestamp)}
                    </span>
                  </div>
                  <pre className="text-gray-300 text-xs overflow-x-auto">
                    {JSON.stringify(event.payload, null, 2)}
                  </pre>
                </div>
              ))
            )}
          </div>
        </div>
        
        <div className="bg-gray-700 rounded-lg p-4">
          <h3 className="text-white font-medium mb-2">发布订阅模式说明</h3>
          <p className="text-gray-300 text-sm">
            发布订阅模式定义了对象间的一对多依赖关系，当一个对象状态改变时，所有依赖它的对象都会收到通知。
            EventBus作为中介者，发布者和订阅者不需要直接知道对方的存在，实现了松耦合的通信机制。
            这种模式广泛应用于事件系统、消息队列、响应式编程等场景。
          </p>
        </div>
      </div>
    </div>
  );
};