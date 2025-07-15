import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { addLog, clearLogs, setInstanceCount } from '../store/slices/singletonSlice';
import { Logger, LoggerDemo } from '../patterns/singleton/Logger';
import { FileText, AlertCircle, Info, AlertTriangle, Trash2, RefreshCw } from 'lucide-react';

export const SingletonDemo: React.FC = () => {
  const dispatch = useDispatch();
  const { logs, instanceCount } = useSelector((state: RootState) => state.singleton);
  const [logger] = useState(() => Logger.getInstance());
  const [message, setMessage] = useState('');
  const [logLevel, setLogLevel] = useState<'info' | 'warn' | 'error'>('info');
  
  useEffect(() => {
    // 监听日志变化
    const interval = setInterval(() => {
      const currentLogs = logger.getLogs();
      const currentCount = Logger.getInstanceCount();
      
      // 同步日志到Redux
      if (currentLogs.length !== logs.length) {
        currentLogs.forEach(log => {
          if (!logs.find(existingLog => existingLog.id === log.id)) {
            dispatch(addLog(log));
          }
        });
      }
      
      dispatch(setInstanceCount(currentCount));
    }, 100);
    
    return () => clearInterval(interval);
  }, [logger, logs, dispatch]);
  
  const handleAddLog = () => {
    if (message.trim()) {
      logger.log(logLevel, message);
      setMessage('');
    }
  };
  
  const handleClearLogs = () => {
    logger.clearLogs();
    dispatch(clearLogs());
  };
  
  const handleDemonstrateSingleton = () => {
    const demo = LoggerDemo.demonstrateSingleton();
    logger.info(`创建了 ${demo.instances.length} 个实例引用`);
    logger.info(`所有引用是否指向同一个对象: ${demo.areEqual}`);
    logger.info(`实际创建的实例数量: ${demo.instanceCount}`);
  };
  
  const handleResetSingleton = () => {
    Logger.reset();
    logger.warn('单例已重置（仅用于演示）');
    // 重新获取实例
    const newLogger = Logger.getInstance();
    newLogger.info('新的单例实例已创建');
  };
  
  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('zh-CN');
  };
  
  const getLogIcon = (level: string) => {
    switch (level) {
      case 'info':
        return <Info className="text-blue-400" size={16} />;
      case 'warn':
        return <AlertTriangle className="text-yellow-400" size={16} />;
      case 'error':
        return <AlertCircle className="text-red-400" size={16} />;
      default:
        return <Info className="text-gray-400" size={16} />;
    }
  };
  
  const getLogColor = (level: string) => {
    switch (level) {
      case 'info':
        return 'text-blue-400';
      case 'warn':
        return 'text-yellow-400';
      case 'error':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };
  
  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center space-x-2 mb-4">
        <FileText className="text-blue-400" size={24} />
        <h2 className="text-xl font-semibold text-white">单例模式演示</h2>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="text-white font-medium mb-3">实例信息</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-300">创建次数:</span>
                <span className="text-white">{instanceCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">日志条数:</span>
                <span className="text-white">{logs.length}</span>
              </div>
            </div>
            <div className="mt-3 space-y-2">
              <button
                onClick={handleDemonstrateSingleton}
                className="w-full px-3 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
              >
                演示单例特性
              </button>
              <button
                onClick={handleResetSingleton}
                className="flex items-center justify-center space-x-1 w-full px-3 py-2 bg-yellow-600 text-white rounded text-sm hover:bg-yellow-700 transition-colors"
              >
                <RefreshCw size={14} />
                <span>重置单例</span>
              </button>
            </div>
          </div>
          
          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="text-white font-medium mb-3">添加日志</h3>
            <div className="space-y-2">
              <select
                value={logLevel}
                onChange={(e) => setLogLevel(e.target.value as 'info' | 'warn' | 'error')}
                className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white text-sm"
              >
                <option value="info">信息</option>
                <option value="warn">警告</option>
                <option value="error">错误</option>
              </select>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddLog()}
                className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white text-sm"
                placeholder="输入日志消息..."
              />
              <div className="flex space-x-2">
                <button
                  onClick={handleAddLog}
                  disabled={!message.trim()}
                  className="flex-1 px-3 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
                >
                  添加日志
                </button>
                <button
                  onClick={handleClearLogs}
                  className="flex items-center space-x-1 px-3 py-2 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors"
                >
                  <Trash2 size={14} />
                  <span>清除</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-700 rounded-lg p-4">
          <h3 className="text-white font-medium mb-3">日志输出</h3>
          <div className="space-y-1 max-h-60 overflow-y-auto">
            {logs.length === 0 ? (
              <p className="text-gray-400 text-center py-4">暂无日志记录</p>
            ) : (
              logs.map((log) => (
                <div
                  key={log.id}
                  className="flex items-start space-x-2 p-2 bg-gray-600 rounded text-sm"
                >
                  {getLogIcon(log.level)}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className={`font-medium ${getLogColor(log.level)}`}>
                        [{log.level.toUpperCase()}]
                      </span>
                      <span className="text-xs text-gray-400">
                        {formatTimestamp(log.timestamp)}
                      </span>
                    </div>
                    <p className="text-gray-300 mt-1">{log.message}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        
        <div className="bg-gray-700 rounded-lg p-4">
          <h3 className="text-white font-medium mb-2">单例模式说明</h3>
          <p className="text-gray-300 text-sm">
            单例模式确保一个类只有一个实例，并提供全局访问点。
            Logger类使用单例模式，无论调用多少次getInstance()，都返回同一个实例。
            这在日志系统、配置管理、数据库连接池等场景中非常有用。
          </p>
        </div>
      </div>
    </div>
  );
};