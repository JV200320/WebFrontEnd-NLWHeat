import React from 'react'
import styles from './App.module.scss'

import { LoginBox } from './components/LoginBox'
import { MessageList } from './components/MessageList'
import { SendMessageForm } from './components/SendMessageForm'
import { AuthContext } from './context/auth'

export function App() {

  const { user } = React.useContext(AuthContext)

  const renderSendMessageFormORLoginBox = (): JSX.Element => {
    if (user) {
      return <SendMessageForm />
    }
    return <LoginBox />
  }

  return (
    <main className={`${styles.contentWrapper} ${!!user ? styles.contentSigned : ''}`}>
      <MessageList />
      {renderSendMessageFormORLoginBox()}
    </main>
  )
}
