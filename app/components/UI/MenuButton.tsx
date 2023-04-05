import styles from './Button.module.css'

interface Props {
    onClick: () => void
}

const MenuButton = ( { onClick }: Props) => {
    return (
        <button type="button" onClick={onClick} className={styles['menu-btn']}>
            <img src={'/menu.svg'} alt={'menu'}/>
        </button>
    )
};

export default MenuButton;
