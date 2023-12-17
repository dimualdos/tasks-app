import React, { useCallback, useEffect, useRef, useState, FunctionComponent } from 'react';
import styles from './chat.module.css';
import { Message } from './message';
import { Input } from './input';
import sendIcon from './images/send.svg';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { _WebSocketChatsURL } from '../../utils/srm-api';


const Chat: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const messages = useAppSelector(state => state.chatUser.messages);
  const user = useAppSelector(state => state.userData.user);
  const isConnected = useAppSelector(state => state.chatUser.status);

  const [textInput, setTextInput] = useState('');
  const messagesContainerRef = useRef<any>(null);

  const scrollToBottom = useCallback(
    () => {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTo(0, messagesContainerRef.current.scrollHeight);
      }
    },
    [messagesContainerRef]
  );
  useEffect(
    () => {
      scrollToBottom();
    },
    [messages, scrollToBottom]
  );

  // const pushMessage = useCallback(
  //   (message: {}) => {
  //     setData([...data, message]);
  //     scrollToBottom();
  //   },
  //   [data, scrollToBottom]
  // );

  // const processEvent = useCallback(
  //   (event: any) => {
  //     const normalizedMessage = JSON.parse(event.data);
  //     if (normalizedMessage.success === true) {
  //       pushMessage({
  //         text: normalizedMessage.message,
  //         username: normalizedMessage.username,
  //         id: normalizedMessage.id,
  //         timestamp: new Date().getTime() / 1000,
  //         isBot: normalizedMessage.isBot
  //       });
  //     }
  //   },
  //   [pushMessage]
  // );

  useEffect(
    () => {
      if (user.token.length > 1) {
        dispatch({
          type: 'WS_CONNECT',
          payload: `${_WebSocketChatsURL}?token=${user.token}`
        });
        return () => {
          dispatch({ type: 'WS_CONNECTION_CLOSED' });
        }
      }

    },
    [dispatch, user]
  );


  const submit = useCallback(
    () => {
      if (isConnected && user && !!textInput.trim()) {
        dispatch({
          type: 'WS_SEND',
          payload: `${textInput}`
        });
        setTextInput('');
      }
    },
    [isConnected, user, textInput, dispatch]
  );

  useEffect(
    () => {
      const listener = (event: KeyboardEvent) => {
        if (event.code === 'Enter' || event.code === 'NumpadEnter') {
          event.preventDefault();
          submit();
        }
      };
      document.addEventListener('keydown', listener);
      return () => {
        document.removeEventListener('keydown', listener);
      };
    },
    [submit]
  );

  const handleClick = useCallback((e: { preventDefault: () => void; target: { value: React.SetStateAction<string>; }; }) => {
    e.preventDefault();
    setTextInput(e.target.value);
  }, []);

  const buttonLabel = isConnected ? 'Отправить сообщение' : 'Ошибка подключения';

  if (user) {
    return (
      <div className={styles.container}>
        <div className={styles.messagesWrapper}
          ref={messagesContainerRef}>
          {messages ? (messages!.map((item: any, index: number) => (
            <Message message={item} key={index} isOwnMessage={user!.id === item!.id} />
          ))) : (null)
          }
        </div>

        <div className={styles.replyBar}>
          <Input
            placeholder={buttonLabel}
            onChange={handleClick}
            disabled={!isConnected}
            icon={undefined}
            onIconClick={undefined}
            type={undefined}
            value={textInput} />

          <img
            className={isConnected ? styles.activeButton : styles.inactiveButton}
            height="auto"
            src={sendIcon}
            alt="send"
            onClick={submit}
          />
        </div>

      </div>
    );
  }
  return null;
};

export default Chat;
