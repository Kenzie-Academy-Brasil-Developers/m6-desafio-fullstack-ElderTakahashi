import styles from "./style.module.scss";
import { forwardRef } from "react";

export const Input = forwardRef(({ error, label, ...rest }, ref) => {
  return (
    <div className={styles.inputBox}>
      <label className="label">{label}</label>
      <input ref={ref} {...rest} className={error ? "errorBorder" : null} />
      {error ? <p className="inputError">*{error.message}</p> : null}
    </div>
  );
});
