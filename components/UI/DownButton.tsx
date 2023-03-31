import styles from './Button.module.css'
import Image from "next/image";
import { ReactNode } from "react";

interface ButtonProps {
    children?: ReactNode;
    className?: string;
    onClick?: () => void;
}

const DownButton = ( props: ButtonProps ) => {
    return <button className={`${styles['down-button']} ${props.className ? props.className : ''}`} onClick={props.onClick}><Image width={60} height={60} src="/down.svg" alt="down arrow"/></button>
};

export default DownButton;
