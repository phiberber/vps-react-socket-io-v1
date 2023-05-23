export { PageLayout }

import { navigate } from 'vite-plugin-ssr/client/router'
import React, { useEffect, useState } from 'react'
import { PageContext } from './PageContext'
import { usePersistentState } from '../utils/usePersistentState'
import './PageLayout.css'

function PageLayout({ children, pageContext }) {
  const {urlPathname} = pageContext
  const [roomName, setRoomName] = useState('')
  const [rooms, setRooms] = usePersistentState(() => urlPathname.startsWith('/room/') ? [urlPathname.split('/room/')[1]] : [], 'open-channels')

  function createRoom(room) {
    setRooms([...rooms, room])
    setRoomName('')
  }

  function deleteRoom(room) {
    setRooms(rooms.filter(it => it !== room))
    if (urlPathname === `/room/${room}`) navigate('/')
  }

  return (
    <React.StrictMode>
      <PageContext.Provider value={pageContext}>
        <Layout>
          <Sidebar>
            <a href='/'>Home</a>
            { rooms.length ? <hr style={{ width: '100%' }} /> : null }
            {
              rooms.map(room => (
                <div className='navitem' key={room}>
                  <a href={`/room/${room}`}>
                    {room}
                  </a>
                  <button onClick={() => deleteRoom(room)}>
                    x
                  </button>
                </div>
              ))
            }
            <hr style={{ width: '100%' }} />
            <input placeholder='Join room'
              value={roomName}
              onInput={e => setRoomName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && createRoom(e.target.value)}
            />
          </Sidebar>
          <Content>{children}</Content>
        </Layout>
      </PageContext.Provider>

    </React.StrictMode>
  )
}

function Layout({ children }) {
  return (
    <div
      style={{
        display: 'flex',
        maxWidth: 900,
        margin: 'auto'
      }}
    >
      {children}
    </div>
  )
}

function Sidebar({ children }) {
  return (
    <div
      style={{
        padding: 20,
        paddingTop: 42,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        lineHeight: '1.8em'
      }}
    >
      {children}
    </div>
  )
}

function Content({ children }) {
  return (
    <div
      style={{
        position: 'relative',
        padding: 20,
        paddingBottom: 50,
        borderLeft: '2px solid #eee',
        minHeight: '100vh',
        width: '100%'
      }}
    >
      {children}
    </div>
  )
}
