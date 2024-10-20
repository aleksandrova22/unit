import classes from './index.module.css';

export function PopupWindow({ children }) {
  return <div className={classes.popup}>
    {children}
  </div>
}