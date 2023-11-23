import Link from "next/link";
import {getTickets} from "@/api/api";
import {TICKET} from "@/models/Ticket";

export default async function App() {
    let tickets = await getTickets();

    return (
        <main className="flex min-h-screen flex-col items-center w-full lg:max-w-5xl px-24">
            <div className="pt-10 mb-32 flex flex-col text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:text-left">
            </div>

            <div className="mb-32 flex flex-col text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:text-left">
                {
                    tickets.map((ticket: TICKET) =>
                            <>
                                <Link
                                    key={ticket.id}
                                    href={`/ticket/${ticket.id}`}
                                    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                                >
                                    <h2 className="mb-3 text-2xl font-semibold transition-transform group-hover:translate-x-2 motion-reduce:transform-none">
                                        {ticket.origin + ' '}
                                        <span className="inline-block">
                    -&gt;
                  </span>
                                        {' ' + ticket.destination}
                                    </h2>
                                    <p className={`m-0 text-sm opacity-50`}>
                                        {`Depart: ${ticket.depart_time} | Arrive: ${ticket.arrive_time}`}
                                    </p>
                                    <p className={`m-0 text-sm opacity-50`}>
                                        {`Price: ${ticket.price} VND`}
                                    </p>
                                </Link>
                            </>
                    )
                }
            </div>
        </main>
    )
}
