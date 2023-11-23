'use client'

import Link from "next/link";
import React, {useEffect, useState} from "react";
import {getLocalToken, removeLocalToken} from "@/api/utils";
import {TOKEN} from "@/models/Token";

export default function TopBar() {
    const [accessToken, setToken]: [TOKEN | null, any] = useState(null)

    useEffect(() => {
        setToken(getLocalToken())
    }, [])

    return (
        <div className="p-24 z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
            <Link
                className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30"
                href="/">
                Flight Booking System
            </Link>
            <TopRightBar hasLoggedIn={accessToken !== null}/>
        </div>
    )
}

function TopRightBar({hasLoggedIn}: { hasLoggedIn: boolean }) {
    if (hasLoggedIn) {
        return (
            <div
                className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
                <Link
                    className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
                    href="/cart"
                    rel="noopener noreferrer"
                >
                    Cart
                </Link>
                <span className="px-3">|</span>
                <Link
                    className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
                    href="/"
                    rel="noopener noreferrer"
                >
                    <button onClick={removeLocalToken}>
                        Log out
                    </button>
                </Link>
            </div>
        )
    } else {
        return (
            <div
                className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
                <Link
                    className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
                    href="/login"
                    rel="noopener noreferrer"
                >
                    Log in
                </Link>
            </div>
        )
    }
}