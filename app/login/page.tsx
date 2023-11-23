'use client'

import Button from "@/components/button";
import {TOKEN} from "@/models/Token";
import {loginGetToken} from "@/api/api";
import {saveLocalToken} from "@/api/utils";

function loginAction(email: string, password: string) {
    loginGetToken(email, password)
        .then((r: TOKEN) => {
            saveLocalToken(r)
        })
        .catch((e) => {
            console.log(e)
        })
}

export default function Login() {
    return (
        <main className="flex min-h-screen flex-col items-center w-full lg:max-w-5xl px-24">
            <div
                className="pt-10 mb-32 flex flex-col text-center items-center lg:max-w-5xl lg:w-full lg:mb-0 lg:text-center">
                <h2 className="mb-6 text-2xl font-semibold transition-transform group-hover:translate-x-2 motion-reduce:transform-none">
                    Login
                </h2>
                <form className="flex flex-col w-full lg:max-w-5xl lg:w-full lg:mb-0 lg:text-center items-center">
                    <label className="mb-6 text-sm">
                        Email
                    </label>
                    <input className={`mb-6 text-2xl`} type="email" name="email"/>
                    <label className="mb-6 text-sm">
                        Password
                    </label>
                    <input className={`mb-6 text-2xl`} type="password" name="password"/>
                </form>
                <Button onClick={() => {
                    loginAction(
                        (document.querySelector('input[name="email"]') as HTMLInputElement).value,
                        (document.querySelector('input[name="password"]') as HTMLInputElement).value
                    )
                }} text="Log in"/>
            </div>
        </main>
    )
}