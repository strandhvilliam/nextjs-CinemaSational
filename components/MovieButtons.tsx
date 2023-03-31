'use client';

import { ReactNode } from "react";
import styles from "./MovieButtons.module.css";

const MovieButtons = () => {
    return (
        <div className={styles.container}>
            <OutlineButton>Watch</OutlineButton>
            <OutlineButton>Add to favorites</OutlineButton>
        </div>
    );
};

export default MovieButtons;


interface ButtonProps {
    children: ReactNode;
}

const OutlineButton = ({ children }: ButtonProps) => {
    return <button className={styles.button}>{children}</button>
};
