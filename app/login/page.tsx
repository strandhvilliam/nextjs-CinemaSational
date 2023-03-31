'use client'

import Image from "next/image";
import Card from "@/components/UI/Card";
import styles from './Login.module.css'
import Button from "@/components/UI/Button";
import Logo from "@/components/UI/Logo";
import { useAuth } from "@/app/AuthProvider";
import Loader from "@/components/UI/Loader";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import SecondaryButton from "@/components/UI/SecondaryButton";

export default function Login() {

    const {user, loading, signInWithGoogle, signOut} = useAuth();


    return (
        <div className={styles.container}>
            <Logo size={'1'} style={styles.logo}/>
            {loading ? (
                    <Card className={styles['login-box']}>
                        <Loader />
                    </Card>
                ) :
                (<Card className={styles['login-box']}>

                    {user ? (<><h1>Welcome</h1> <SignOutButton onClick={signOut}/></>)
                        : (<><h1>Login</h1> <SignInButton onClick={signInWithGoogle}/></>)}

                </Card>)}
        </div>)

}
const SignInButton = ( { onClick: signInWithGoogle }: { onClick: () => Promise<void> }) => {
    const router = useRouter()

    const loginHandler = async () => {
        await signInWithGoogle();
        toast('Logged in successfully')
        router.push('/')
    }

    return (
        <Button className="btn" onClick={loginHandler}>
            <Image width={30} height={30} src={'/google-logo.png'} alt="google logo"/>
            <span>Sign in with Google</span>
        </Button>
    )
}

const SignOutButton = ( { onClick: signOut }: { onClick: () => Promise<void>}) => {

    const logoutHandler = async () => {
        await signOut();
        toast('Logged out successfully')
    }


    return <SecondaryButton onClick={logoutHandler}>Logout</SecondaryButton>
}
