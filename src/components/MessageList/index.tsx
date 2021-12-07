import React from 'react'

import { io } from 'socket.io-client'

import styles from './styles.module.scss'

import logoImg from '../../assets/logo.svg'
import { MessageListService } from '../../services/MessageListService'
import { IMessage } from '../../dtos/Message'
import { Message } from './Message'

const messagesQueue: IMessage[] = []

const socket = io('http://localhost:4000')

socket.on('new_message', (newMessage: IMessage) => {
  messagesQueue.push(newMessage)
})

export const MessageList: React.FC = () => {

  const [messages, setMessages] = React.useState<IMessage[]>([])

  React.useEffect(() => {
    setInterval(() => {
      if (messagesQueue.length > 0) {
        setMessages(previousMessages => {
          return [messagesQueue[0], ...previousMessages.slice(0, 2)].filter(Boolean)
        })
      }
      messagesQueue.shift()
    }, 500)
  }, [])

  React.useEffect(() => {
    MessageListService.get3LastMessages()
      .then(messagesArray => setMessages(messagesArray))
      .catch(err => console.log(err))
  }, [])

  const renderMessages = (): JSX.Element[] | null => {
    if (messages.length == 0) return null

    return messages.map(message => {
      return (
        <Message text={message.text} user={message.user} key={message.id} />
      )
    })
  }

  return (
    <div className={styles.messageListWrapper}>
      <img src={logoImg} alt="DoWhile 2021" />

      <ul className={styles.messageList}>
        {renderMessages()}
      </ul>
    </div>
  )
}
