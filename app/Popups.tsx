'use client';
import { Toaster } from "react-hot-toast";

const Popups = () => {
    return (
        <>
            <Toaster
                toastOptions={{
                    style: {
                        border: "1px solid #7E7E7E",
                        background: "#3A3D43",
                        color: "#ffffff",
                    },
                }}
                position={"bottom-right"}
            />
        </>
    );
};

export default Popups;
