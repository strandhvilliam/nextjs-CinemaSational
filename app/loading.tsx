'use client';
import Loader from "@/components/UI/Loader";

export default function Loading() {
    console.log('Loading...')
    return (

        <div>
            <h1>Loading...</h1>
            <Loader />
        </div>
    );
};

