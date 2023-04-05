import styles from './Button.module.css'
import { ReactNode } from "react";

interface Props {
    children: ReactNode,
    className?: string,
    onClick?: () => void
}

const SecondaryButton = (props: Props) => {
    return (
        <button
            type={"button"}
            className={
                `${styles.btn} ${styles['secondary-btn']} 
                 ${props.className ? props.className : ''}
                 `}
            onClick={props.onClick ? props.onClick : () => {
            }}>
            {props.children}
        </button>
    )
}

export default SecondaryButton
