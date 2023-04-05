'use client';
import Image from "next/image";

interface Props {
    size: string,
    style?: string

}

const Logo = ({size, style}: Props) => {
    return <img src={`/logo${size}x.png`} alt={"logo"} className={style}/>
};

export default Logo;
