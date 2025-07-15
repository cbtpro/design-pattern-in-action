import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { useBridge } from '../hooks/useBridge';
import { clearMessages } from '../store/slices/tabCommunicationSlice';
import { MessageSquare, Send, Trash2, ExternalLink } from 'lucide-react';

export const TabCommunicationDemo: React.FC = () => {
  const dispatch = useDispatch();
  const bridge = useBridge();
  const { messages } = useSelector((state: RootState) => state.tabCommunication);

  const [messageContent, setMessageContent] = useState('');

  const handleSendMessage = () => {
    if (bridge && messageContent.trim()) {
      bridge.current?.sendTabMessage({
        content: messageContent,
        type: 'user-message'
      });
      setMessageContent('');
    }
  };

  const handleOpenNewTab = () => {
    window.open(window.location.href, '_blank');
  };

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('zh-CN');
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center space-x-2 mb-4">
        <MessageSquare className="text-blue-400" size={24} />
        <h2 className="text-xl font-semibold text-white">标签页通信演示</h2>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={handleOpenNewTab}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            <ExternalLink size={16} />
            <span>打开新标签页</span>
          </button>
          <span className="text-gray-300 text-sm">
            打开新标签页后，在不同标签页间发送消息进行测试
          </span>
        </div>

        <div className="flex space-x-2">
          <input
            type="text"
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="输入要发送的消息..."
          />
          <button
            onClick={handleSendMessage}
            disabled={!messageContent.trim()}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={16} />
            <span>发送</span>
          </button>
        </div>

        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-white">消息历史</h3>
          <button
            onClick={() => dispatch(clearMessages())}
            className="flex items-center space-x-2 px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            <Trash2 size={14} />
            <span>清除</span>
          </button>
        </div>

        <div className="space-y-2 max-h-60 overflow-y-auto">
          {messages.length === 0 ? (
            <p className="text-gray-400 text-center py-4">暂无消息记录</p>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className="bg-gray-700 rounded-md p-3 border border-gray-600"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-blue-400 text-sm font-medium">
                        {message.fromTab}
                      </span>
                      <span className="text-xs text-gray-400">
                        {formatTimestamp(message.timestamp)}
                      </span>
                    </div>
                    <p className="text-gray-300 mt-1">{message.content}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};