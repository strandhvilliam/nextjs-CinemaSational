import styles from './Button.module.css'

interface Props {
    onClick: () => void
}

const CloseButton = ( { onClick }: Props) => {
    return (
        <button onClick={onClick} type="button" className={styles['close-btn']}>
            <img src={'/close.svg'} alt={'close'}/>
        </button>
    )
};

export default CloseButton;
