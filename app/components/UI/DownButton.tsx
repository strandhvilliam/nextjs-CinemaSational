'use client';

import styles from './Button.module.css'
import Image from "next/image";
import { ReactNode } from "react";

interface ButtonProps {
    children?: ReactNode;
    className?: string;
}

const DownButton = ( props: ButtonProps ) => {

    const scrollTo = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        })
    }

    return <button className={`${styles['down-button']} ${props.className ? props.className : ''}`} onClick={scrollTo}><Image width={60} height={60} src="/down.svg" alt="down arrow"/></button>
};

export default DownButton;
