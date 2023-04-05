import './globals.css'
import { ReactNode } from "react";
import AuthProvider from "@/app/AuthProvider";
import Navigation from "@/app/components/Navigation/Navigation";
import Popups from "@/app/Popups";
import { getMovieGenres } from "@/app/lib/tmdb/tmdb";
import { Category } from "@/app/lib/interfaces/category";

export const metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
}

export default async function RootLayout({
                                       children,
                                   }: {
    children: ReactNode
}) {
    const categories: Category[] = await getMovieGenres();


    return (
        <AuthProvider>
            <html lang="en">
            <body>
            <Navigation categories={categories}/>
            {children}
            <Popups/>
            </body>
            </html>
        </AuthProvider>
    )
}
