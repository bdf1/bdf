/// <reference types="vite/client" />

declare module '*.vue' {
  import { defineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: ReturnType<typeof defineComponent>
  export default component
}

declare const main: {
  /**
   * 是否使用压缩资源
   */
  useCompress: boolean;

  /**
   * 游戏资源版本号
   */
  version: number;

  /**
   * 游戏模式
   */
  mode: string;

  log(err: any): void
}
