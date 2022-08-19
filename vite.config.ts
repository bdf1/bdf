import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJSX from '@vitejs/plugin-vue2-jsx'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),vueJSX()],
  resolve: {
    alias: {
        "@": path.resolve(__dirname, 'src'), // 路径别名
    },
    extensions: ['.js', '.json', '.ts', '.tsx'] // 使用路径别名时想要省略的后缀名，可以自己 增减
  }
})
