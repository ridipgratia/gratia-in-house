import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [
    react({
      loader: {
        '.js': 'jsx', // Configure .js files to be treated as JSX
      },
    }),
  ],
});
