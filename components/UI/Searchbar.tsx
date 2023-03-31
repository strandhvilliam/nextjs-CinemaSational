import styles from './Searchbar.module.css'

import { ChangeEvent, FormEvent, useState } from "react";
interface Props {
    onSubmit: (value: string) => void
}

const Searchbar = ( {onSubmit: submitHandler}: Props) => {
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
        <form onSubmit={onSubmit}>
            <input className={styles.input} onChange={onChange} value={search} type="text" placeholder="Search"/>
        </form>
    );
};

export default Searchbar;
