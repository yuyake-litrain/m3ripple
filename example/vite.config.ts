import react from '@vitejs/plugin-react-swc';
import Unfonts from 'unplugin-fonts/vite';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Unfonts({
      google: {
        families: ['Inter'],
      },
    }),
  ],
});
