/**
 * @param {import('socket.io').Server} server
 */
export default (server) => {
    server.on('connection', (socket) => {

        socket.on('join-room', ({ roomId }) => {
            socket.join(roomId)
        })

        socket.on('leave-room', ({ roomId }) => {
            socket.leave(roomId)
        })

        socket.on('create-message', ({ roomId, content }) => {
            socket.to(roomId).emit('receive-message', { roomId, content })
        })

    })
}