import { ReactNode, useContext } from "react";
// import { UserContext } from "@/lib/context";
import Link from "next/link";

interface Props {
    children?: ReactNode,
    fallback?: ReactNode
}

const AuthCheck = (props: Props) => {
    // const { user } = useContext(UserContext);
    const user = null;

    return (
        <>
            { user ? props.children : props.fallback || <Link href={"/login"}>You must be signed in</Link>}
        </>
    )

};

export default AuthCheck;
