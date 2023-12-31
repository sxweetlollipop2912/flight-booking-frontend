'use client'

import Button from "@/components/button";
import {addToCart, getTicket} from "@/api/api";
import {getLocalToken} from "@/api/utils";
import {TOKEN} from "@/models/Token";
import {TICKET} from "@/models/Ticket";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

function addToCartAction(ticket_id: number) {
    let access_token: TOKEN | null = getLocalToken()
    if (access_token) {
        addToCart(ticket_id, access_token)
            .then((r) => {
                console.log(r)
            })
            .catch((e) => {
                console.log(e)
            })
    } else {
        console.log('Please login first')
    }
}

export default function Ticket({params}: { params: { id: number } }) {
    const router = useRouter()
    const [ticket, setTicket]: [TICKET, any] = useState({
        id: 0,
        origin: '',
        destination: '',
        depart_time: '',
        arrive_time: '',
        price: 0,
    })

    useEffect(() => {
        getTicket(params.id)
            .then((r: TICKET) => {
                setTicket(r)
            })
            .catch((e) => {
                console.log(e)
            })
    }, [])

    return (
        <main className="flex min-h-screen flex-col items-center w-full lg:max-w-5xl px-24">
            <h1 className="mb-16 text-4xl font-semibold transition-transform group-hover:translate-x-2 motion-reduce:transform-none">
                Ticket Details
            </h1>
            <div
                className="pt-10 mb-32 flex flex-col text-center items-center lg:max-w-5xl lg:w-full lg:mb-0 lg:text-center">
                <h2 className="mb-6 text-2xl font-semibold transition-transform group-hover:translate-x-2 motion-reduce:transform-none">
                    {ticket.origin + ' '}
                    <span className="inline-block">
                        -&gt;
                    </span>
                    {' ' + ticket.destination}
                </h2>
                <p className={`mb-6 text-sm opacity-50`}>
                    {`Depart: ${ticket.depart_time} | Arrive: ${ticket.arrive_time}`}
                </p>
                <p className={`mb-6 text-2xl`}>
                    {`Price: ${ticket.price} VND`}
                </p>
                <Button onClick={() => {
                    addToCartAction(ticket.id)
                    router.push('/cart')
                }} text={'Add to cart'}
                />
            </div>
        </main>
    )
}