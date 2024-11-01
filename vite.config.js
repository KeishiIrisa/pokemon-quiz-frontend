import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.GITHUB_PAGES ? "pokemon-quiz-frontend" : "./",
  plugins: [react()],
  build: {
    outDir: "docs", // ビルド出力ディレクトリを 'docs' に変更
  },
});
