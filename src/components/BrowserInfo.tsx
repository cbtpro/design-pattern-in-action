import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Monitor, CheckCircle } from 'lucide-react';
import { useBridge } from '../hooks/useBridge';

export const BrowserInfo: React.FC = () => {
  const { info, supportedFeatures } = useSelector((state: RootState) => state.browser);
  useBridge();
  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center space-x-2 mb-4">
        <Monitor className="text-blue-400" size={24} />
        <h2 className="text-xl font-semibold text-white">浏览器信息</h2>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-300">浏览器:</span>
          <span className="text-white font-medium">{info.name} {info.version}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-300">平台:</span>
          <span className="text-white font-medium">{info.platform}</span>
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-medium text-white mb-2">支持的特性</h3>
          <div className="space-y-2">
            {supportedFeatures.map((feature) => (
              <div key={feature} className="flex items-center space-x-2">
                <CheckCircle className="text-green-400" size={16} />
                <span className="text-gray-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};