import { formatRelative } from 'date-fns';
import { ru } from 'date-fns/locale';
import styles from './message.module.css';
import statusImage from '../images/status.svg';
import { Avatar } from '../avatar';

export const getTimeFromTimestamp = () => {
  const timeValues = formatRelative(new Date(), new Date(), { locale: ru });
  // timeValues.splice(-1, 1);
  // return timeValues.join(':');
  return timeValues
};

export interface IItemMessage {
  username: string,
  message: string,
  isBot: boolean
}

export interface IMessage {
  message: IItemMessage,
  isOwnMessage: boolean
}

export const Message = ({ message, isOwnMessage }: IMessage) => {
  const messageClassname = isOwnMessage ? styles.ownMessage : styles.message;
  const containerClassname = isOwnMessage ? styles.ownMessageContainer : styles.messageContainer;
  const status = isOwnMessage ? <img src={statusImage} alt="status" /> : null;
  const sender = isOwnMessage ? null : (
    <b>{message.username}</b>
  );

  let avatar = isOwnMessage ? null : <Avatar name={message.username} />;
  return (
    <>
      <div className={containerClassname}>
        {/* {avatar} */}
        <div className={messageClassname}>
          <div className={styles.userName}>
            {sender} {message.isBot ? ` @bot` : ''}
          </div>
          {message.message}
          <div className={styles.messageInfo}>
            <p>{getTimeFromTimestamp()}</p>
            {status}
          </div>
        </div>
      </div>
    </>
  );
};
