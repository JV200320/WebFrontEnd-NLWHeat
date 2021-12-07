import React from 'react'

import styles from './styles.module.scss'
import { IUser } from '../../../dtos/User'

interface Props {
  text: string,
  user: IUser
}

export const Message: React.FC<Props> = ({ text, user }) => {
  return (
    <li className={styles.message}>
      <p className={styles.messageContent}>
        {text}
      </p>
      <div className={styles.messageUser}>
        <div className={styles.userImage}>
          <img src={user.avatar_url} alt={user.name} />
        </div>
        <span>{user.name}</span>
      </div>
    </li>
  )
}
