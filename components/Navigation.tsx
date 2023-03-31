'use client';
import styles from './Navigation.module.css'
import { createPortal } from "react-dom";
import Link from "next/link";
import CloseButton from "@/components/UI/CloseButton";
import { usePathname, useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import Logo from "@/components/UI/Logo";
import MenuButton from "@/components/UI/MenuButton";
import Searchbar from "@/components/UI/Searchbar";
import Card from "@/components/UI/Card";
import Button from "@/components/UI/Button";
import SecondaryButton from "@/components/UI/SecondaryButton";
import { useAuth } from "@/app/AuthProvider";
import firebase from "firebase/compat/app";
import { User } from "@firebase/auth";
import toast from "react-hot-toast";

const Navigation = () => {
    const auth = useAuth();
    const path = usePathname();

    const [open, setOpen] = useState(false);
    const [mount, setMount] = useState(false);
    const bodyRef = useRef<any>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const backdropRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        bodyRef.current = document.querySelector('body');
        setMount(true);
    }, []);

    useEffect(() => {
        closeMenu();
    }, [path]);

    const openMenu = () => {
        setOpen(true);

    }

    const closeMenu = () => {
        containerRef.current?.classList.add(styles['close-animation']);
        backdropRef.current?.classList.add(styles['fade-out-animation']);
        setTimeout(() => {
            setOpen(false);
        }, 500);
    }

    const submitHandler = (value: string) => {
        // TODO: Implement search
    }

    const logoutHandler = async () => {
        await auth.signOut();
        toast('Logged out successfully')
    }

    const nav = open ? (
        <div ref={containerRef} className={styles.container}>
            {mount && createPortal(<div onClick={closeMenu} ref={backdropRef}
                                        className={styles.backdrop}></div>, bodyRef.current)}
            <Link onClick={closeMenu} href={"/"}><Logo size={"1"} style={styles.logo}/></Link>
            <CloseButton onClick={closeMenu}/>
            <NavList onSubmit={submitHandler} path={path}/>
            <NavProfile user={auth.user} onLogout={logoutHandler} onNavigate={closeMenu}/>
        </div>) : <MenuButton onClick={openMenu}/>


    return (
        <>
            {nav}
            <Link className={styles['logo-link']} href={"/"}>
                <Logo size={"1"} style={styles['main-logo']}/>
            </Link>
        </>
    );
};

export default Navigation;

interface ListProps {
    onSubmit: (value: string) => void
    path: string
}

const NavList = ({onSubmit, path}: ListProps) => {
    return (
        <ul className={styles.nav}>
            <li className={`${styles['nav-item']}`}><Searchbar onSubmit={onSubmit}/></li>
            <li className={`${styles['nav-item']} ${path === '/' ? styles.active : ''}`}>
                <Link href={"/"}>Home</Link>
            </li>
            <li className={`${styles['nav-item']} ${path === '/categories' ? styles.active : ''}`}>
                <Link href={"/login"}>Categories</Link>
            </li>
            <li className={`${styles['nav-item']} ${path === '/discussion' ? styles.active : ''}`}>
                <Link href={"/discussion"}>Discussion</Link>
            </li>
        </ul>
    );
}

interface ProfileProps {
    onNavigate: () => void
    onLogout: () => void
    user: User | null
}

const NavProfile = ({onNavigate, onLogout, user}: ProfileProps) => {

    const router = useRouter();


    const loginHandler = () => {
        router.push('/login');
        onNavigate();
    }

    const linkHandler = (e: React.MouseEvent<HTMLDivElement | MouseEvent>) => {
        if (e.target instanceof HTMLButtonElement) return;

        router.push(`/user/${user?.uid}`);
        onNavigate();
    }

    return (
        user ?
            (
                <Card className={styles.profile} onClick={linkHandler}>
                    <img className={styles['profile-image']} src={`${user.photoURL}`} alt={'profile'}/>
                    <h4>{user.displayName}</h4>
                    <SecondaryButton className={styles['btn-on-top']} onClick={onLogout}>Logout</SecondaryButton>
                </Card>
            )
            :
            (<Button onClick={loginHandler}>Login</Button>)
    )
}
