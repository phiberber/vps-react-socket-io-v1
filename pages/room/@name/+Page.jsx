export default Page

import React, { useCallback, useEffect } from "react"
import { io } from "socket.io-client";
import { usePersistentState } from '../../../utils/usePersistentState'
import { usePageContext } from "../../../renderer/PageContext";
import { isClient } from "../../../utils/isClient";

function Page() {
    const pageContext = usePageContext()
    const roomName = pageContext.routeParams.name

    const [messages, setMessages] = usePersistentState(() => [], `messages-${roomName}`)
    const [writtenMessage, setWrittenMessage] = usePersistentState(() => '', `writtenMessage-${roomName}`)
    const [socket] = usePersistentState(() => isClient && io(), 'socket')

    const pushMessage = useCallback((message) => setMessages((prev) => [...prev, message]), [])

    useEffect(() => {
        if(!socket) return

        socket.emit('join-room', { roomId: roomName })
        socket.on('receive-message', function({ roomId, content }) {
            if(roomId !== roomName) return
            pushMessage({ author: 'Stranger', content })
        })

        // Leave the room and remove listeners on unmount
        return () => {
            socket.emit('leave-room', { roomId: roomName })
            socket.off('receive-message')
        }
    }, [socket, roomName])

    function sendMessage() {
        if(writtenMessage === '') return
        socket.emit('create-message', { roomId: roomName, content: writtenMessage })
        pushMessage({ author: 'Me', content: writtenMessage })
        setWrittenMessage('')
    }

    return (
        <>
            {
                messages.map(({ author, content }, index) => (
                    <div key={`${index}-${content}`}>
                        <span>{author}: </span>
                        <span>{content}</span>
                    </div>
                ))
            }
            <div style={{
                position: 'absolute',
                display: 'flex',
                flexWrap: 'nowrap',
                left: '0',
                bottom: '0',
                width: '100%'
            }}>
                <input placeholder='Write your message' style={{ width: '100%' }}
                    value={writtenMessage} 
                    onInput={(e) => setWrittenMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}  
                    />
            </div>
        </>
    )
}