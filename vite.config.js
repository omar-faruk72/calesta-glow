import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// প্লাগইন লিস্ট থেকে tailwindcss() সরিয়ে দিন
export default defineConfig({
  plugins: [react()],
})