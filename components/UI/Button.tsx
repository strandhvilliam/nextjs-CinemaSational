import { ReactNode } from "react";
import styles from './Button.module.css'

interface Props {
    children: ReactNode,
    className?: string,
    onClick?: () => void
}

const Button = (props: Props) => {
    return (
        <button type={"button"} className={`${styles.btn} ${props.className ? props.className : ''}`} onClick={props.onClick ? props.onClick : () => {}}>
            {props.children}
        </button>
    )
}

export default Button;
