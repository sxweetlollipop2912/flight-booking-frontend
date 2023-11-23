import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'
import React from "react";
import TopBar from "@/components/top_bar";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Flight Booking System',
    description: 'Generated by create next app',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className={inter.className + " flex flex-col items-center min-h-screen w-full"}>
        <TopBar/>
        {children}
        </body>
        </html>
    )
}
