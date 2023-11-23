'use client'

import Button from "@/components/button";
import {getItemWithTicket, updatePurchaseStatus} from "@/api/api";
import {getLocalToken} from "@/api/utils";
import {TOKEN} from "@/models/Token";
import {useEffect, useState} from "react";
import {ITEM_WITH_TICKET} from "@/models/Item";
import {useRouter} from "next/navigation";

function moveToHistoryAction(item_id: number) {
    let access_token: TOKEN | null = getLocalToken()
    if (access_token) {
        updatePurchaseStatus(item_id, true, access_token)
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

export default function Payment({params}: { params: { id: number } }) {
    const router = useRouter()
    const [accessToken, setToken]: [TOKEN | null, any] = useState(null)
    const [item, setItem]: [ITEM_WITH_TICKET, any] = useState({
        id: 0,
        ticket: {
            id: 0,
            origin: '',
            destination: '',
            depart_time: '',
            arrive_time: '',
            price: 0,
        },
        has_purchased: false,
    })

    useEffect(() => {
        setToken(getLocalToken())
    }, [])

    useEffect(() => {
        if (accessToken) {
            getItemWithTicket(params.id, accessToken)
                .then((r: ITEM_WITH_TICKET) => {
                    setItem(r)
                })
                .catch((e) => {
                    console.log(e)
                })
        }
    }, [accessToken])

    return (
        <main className="flex min-h-screen flex-col items-center w-full lg:max-w-5xl px-24">
            <h1 className="mb-16 text-4xl font-semibold transition-transform group-hover:translate-x-2 motion-reduce:transform-none">
                Payment
            </h1>
            <div
                className="pt-10 mb-32 flex flex-col text-center items-center lg:max-w-5xl lg:w-full lg:mb-0 lg:text-center">
                <h2 className="mb-6 text-2xl font-semibold transition-transform group-hover:translate-x-2 motion-reduce:transform-none">
                    {item.ticket.origin + ' '}
                    <span className="inline-block">
                        -&gt;
                    </span>
                    {' ' + item.ticket.destination}
                </h2>
                <p className={`mb-6 text-sm opacity-50`}>
                    {`Depart: ${item.ticket.depart_time} | Arrive: ${item.ticket.arrive_time}`}
                </p>
                <p className={`mb-6 text-2xl`}>
                    {`Price: ${item.ticket.price} VND`}
                </p>
                <Button onClick={() => {
                    moveToHistoryAction(params.id)
                    router.push('/history')
                }} text={'Finish payment'}
                />
            </div>
        </main>
    )
}