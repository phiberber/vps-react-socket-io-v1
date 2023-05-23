import { Server } from 'socket.io'
import configureChat from './chat'

/**
 * @returns {import('vite').PluginOption}
 */
export default () => ({
    name: 'socket-io',
    configureServer(server) {
        const io = new Server(server.httpServer)
        configureChat(io)
    }
})