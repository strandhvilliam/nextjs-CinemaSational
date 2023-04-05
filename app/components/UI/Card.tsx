import React, { ReactNode } from "react";
import styles from './Card.module.css'


interface Props {
    children: ReactNode,
    className?: string,
    onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

const Card = (props: Props) => {
    return (
        <div onClick={props.onClick} className={`${styles.card} ${props.className ? props.className : ''}`}>
            {props.children}
        </div>
    )
}

export default Card;
