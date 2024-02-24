import styles from "./style.module.scss";
import { forwardRef, useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

export const InputPassword = forwardRef(({ error, label, ...rest }, ref) => {
  const [isHidden, setIsHidden] = useState(true);

  return (
    <div className={styles.inputBox}>
      <label className="label">{label}</label>
      <input
        type={isHidden ? "password" : "text"}
        ref={ref}
        {...rest}
        className={error ? "errorBorder" : null}
      />
      <button type="button" onClick={() => setIsHidden(!isHidden)}>
        {isHidden ? <MdVisibility /> : <MdVisibilityOff />}
      </button>
      {error ? <p className="inputError">*{error.message}</p> : null}
    </div>
  );
});
