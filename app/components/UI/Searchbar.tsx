import styles from './Searchbar.module.css'

import { ChangeEvent, FormEvent, useState } from "react";
interface Props {
    onSubmit: (value: string) => void
    className?: string
}

const Searchbar = ( {onSubmit: submitHandler, className}: Props) => {
    const [search, setSearch] = useState('');

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        submitHandler(search);
        setSearch('');
    }

    return (
        <form className={`${className ? className : ''}`} onSubmit={onSubmit}>
            <input className={styles.input} onChange={onChange} value={search} type="text" placeholder="Search"/>
        </form>
    );
};

export default Searchbar;
