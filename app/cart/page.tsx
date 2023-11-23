'use client'

import Link from "next/link";
import {getCartItemsWithTicket} from "@/api/api";
import {TOKEN} from "@/models/Token";
import {useEffect, useState} from "react";
import {getLocalToken} from "@/api/utils";
import {ITEM_WITH_TICKET} from "@/models/Item";

export default function Cart() {
    const [accessToken, setToken]: [TOKEN | null, any] = useState(null)
    const [items, setItems]: [ITEM_WITH_TICKET[], any] = useState([])

    useEffect(() => {
        setToken(getLocalToken())
    }, [])

    useEffect(() => {
        if (accessToken) {
            getCartItemsWithTicket(accessToken)
                .then((r: ITEM_WITH_TICKET[]) => {
                    setItems(r)
                })
                .catch((e) => {
                    console.log(e)
                })
        } else {
            setItems([])
        }
    }, [accessToken])

    return (
        <main className="flex min-h-screen flex-col items-center w-full lg:max-w-5xl px-24">
            <h1 className="mb-16 text-4xl font-semibold transition-transform group-hover:translate-x-2 motion-reduce:transform-none">
                Cart
            </h1>
            <div className="mb-32 flex flex-col text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:text-left">
                {
                    items.map((item: ITEM_WITH_TICKET) =>
                            <>
                                <Link
                                    key={item.id}
                                    href={`cart/payment/${item.id}`}
                                    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                                >
                                    <h2 className="mb-3 text-2xl font-semibold transition-transform group-hover:translate-x-2 motion-reduce:transform-none">
                                        {item.ticket.origin + ' '}
                                        <span className="inline-block">
                    -&gt;
                  </span>
                                        {' ' + item.ticket.destination}
                                    </h2>
                                    <p className={`m-0 text-sm opacity-50`}>
                                        {`Depart: ${item.ticket.depart_time} | Arrive: ${item.ticket.arrive_time}`}
                                    </p>
                                    <p className={`m-0 text-sm opacity-50`}>
                                        {`Price: ${item.ticket.price} VND`}
                                    </p>
                                </Link>
                            </>
                    )
                }
            </div>
        </main>
    )
}
