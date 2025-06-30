import { defineConfig } from 'vite'
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(),
  Components({
    resolvers: [
      AntDesignVueResolver({
        importStyle: false, // css in js
      }),
    ],
  }),
  ],
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            "primary-color": "#2E2973",
            "link-color": "#0098D6",
          },
          javascriptEnabled: true,
        },
      },
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/styles/main.scss";`,
      },
      less: {
        javascriptEnabled: true,
        modifyVars: {
          "primary-color": "#2E2973",
          "menu-dark-color": "#FFFFFF",
          "layout-header-background": "#2E2973",
          "link-color": "#0098D6",
          "heading-color": "#2E2973",
          "btn-primary-bg": "#2E2973",
          "font-family": "Gotham-Book, sans-serif",
          "layout-body-background": "#9D9D9C33",
          "layout-footer-background": "#1D1D1BCC",
          "text-color": "#1D1D1B",
        },
      },
    },
  },
})
