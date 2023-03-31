import styles from './MovieRow.module.css'


interface Props {
    children?: any
}

const MovieRow = ({ children }: Props) => {
    return (
        <ul className={styles.row}>
            {children}
        </ul>
    )
}

export default MovieRow;
