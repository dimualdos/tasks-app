
import styles from './input.module.css';

export interface IInputMessage {
  icon: any,
  onIconClick: undefined,
  placeholder: string,
  onChange: (e: any) => void,
  type: undefined,
  disabled: boolean,
  value?: string
}


export const Input = ({
  icon: Icon,
  onIconClick,
  placeholder,
  onChange,
  type,
  ...props
}: IInputMessage) => {
  const icon = Icon ? <Icon onClick={onIconClick} className={styles.inputContainer} /> : null;
  return (
    <div className={styles.inputContainer}>
      <input
        className={styles.input}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        {...props}
      />
      {icon}
    </div>
  );
};