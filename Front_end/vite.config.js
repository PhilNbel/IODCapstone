import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const dotenv = require("dotenv");
dotenv.config({ path: `./.env.${process.env.NODE_ENV || "dev"}` }); // support multiple environments, see package.json

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 80,
  },

  plugins: [react()],
})
