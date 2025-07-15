import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import basicSsl from '@vitejs/plugin-basic-ssl';

// https://vitejs.dev/config/
export default defineConfig({
  base: 'design-pattern-in-action',
  server: {
    https: true,
    host: '0.0.0.0',
    /**
     * 端口，如果配置了以配置的为准，否则以默使用或自增
     */
    // port: 443,
  },
  plugins: [
    react(),
    tailwindcss(),
    basicSsl({
      /** 
       * 证书名称，不可以使用中文、韩文、特殊字符等，只允许使用英文字母和数字符号
       * 否则，服务器启动时报错，尝试删除缓存后，
       * 重新安装依赖`npm install`再启动服务即可解决
       */
      name: 'test',
      /** 自定义证书支持的域名，支持数组通配符 */
      domains: [
        // '10.10.246.238',
        // '172.31.176.1',
        // 'localhost',
        '*.custom.com',
      ],
      /**
       * 自定义证书目录， 默认目录：./node_modules/.vite/basic-ssl
       */
      // certDir: './node_modules/.vite/basic-ssl/',
    }),
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
