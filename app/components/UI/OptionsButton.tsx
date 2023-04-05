import styles from './Button.module.css'
import Image from "next/image";

interface Props {
    className?: string
    onClick?: () => void
}

const OptionsButton = (props: Props) => {
    return (
        <button type={"button"} className={`${styles.options} ${props.className ? props.className : ''}`} onClick={props.onClick ? props.onClick : () => {}}>
            <Image src={"/options.svg"} width={20} height={20} alt={"options"}/>
        </button>
    )
}

export default OptionsButton;
