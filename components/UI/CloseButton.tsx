import styles from './Button.module.css'

interface Props {
    onClick: () => void
    className?: string
}

const CloseButton = ( { onClick, className }: Props) => {
    return (
        <button onClick={onClick} type="button" className={`${styles['close-btn']} ${className ? className : ''}`}>
            <img src={'/close.svg'} alt={'close'}/>
        </button>
    )
};

export default CloseButton;
