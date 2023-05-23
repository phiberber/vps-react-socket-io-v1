import react from '@vitejs/plugin-react'
import ssr from 'vite-plugin-ssr/plugin'
import socketVite from './socket/plugin'

export default {
  plugins: [react(), ssr(), socketVite()]
}