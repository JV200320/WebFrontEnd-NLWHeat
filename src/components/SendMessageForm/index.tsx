import React from 'react'
import styles from './styles.module.scss'
import { VscSignOut, VscGithubInverted } from 'react-icons/vsc'
import { AuthContext } from '../../context/auth'
import { CreateMessageService } from '../../services/CreateMessageService'

export const SendMessageForm: React.FC = () => {

  const { user, signOut } = React.useContext(AuthContext)

  const [message, setMessage] = React.useState('')

  async function handleSendMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!message.trim()) {
      return
    }

    await CreateMessageService.createMessage(message).then(() => {
      setMessage('')
    }).catch((err) => {
      console.log(err)
    })

  }

  return (
    <div className={styles.sendMessageFormWrapper}>
      <button className={styles.signOutButton} onClick={signOut}>
        <VscSignOut size="32" />
      </button>

      <header className={styles.userInformation}>
        <div className={styles.userImage}>
          <img src={user?.avatar_url} alt={user?.name} />
        </div>
        <strong className={styles.userName}>{user?.name}</strong>
        <span className={styles.userGithub}>
          <VscGithubInverted size="16" />
          {user?.login}
        </span>
      </header>

      <form className={styles.sendMessageForm} onSubmit={e => handleSendMessage(e)}>
        <label htmlFor="message">Mensagem</label>
        <textarea
          name="message"
          id="message"
          placeholder="Qual sua expectativa para o evento?"
          onChange={e => setMessage(e.target.value)}
          value={message}
        />
        <button type="submit">Enviar mensagem</button>
      </form>
    </div>
  )
}
