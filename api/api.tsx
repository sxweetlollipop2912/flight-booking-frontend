import {TOKEN} from "@/models/Token";
import {ITEM_WITH_TICKET} from "@/models/Item";
import {TICKET} from "@/models/Ticket";

// TODO: mock database
class DB {
    static ACCESS_TOKEN: TOKEN = {
        access_token: "test",
        token_type: "bearer",
    }
    static EMAIL = "test@test.com"
    static PASSWORD = "test"
    static TICKETS: TICKET[] = [
        {
            id: 1,
            origin: "Origin 1",
            destination: "Destination 1",
            depart_time: "2021-01-01 10:00",
            arrive_time: "2021-01-01 11:00",
            price: 1000,
        },
        {
            id: 2,
            origin: "Origin 2",
            destination: "Destination 2",
            depart_time: "2021-01-01 10:00",
            arrive_time: "2021-01-01 11:00",
            price: 2000,
        },
        {
            id: 3,
            origin: "Origin 3",
            destination: "Destination 3",
            depart_time: "2021-01-01 10:00",
            arrive_time: "2021-01-01 11:00",
            price: 3000,
        },
        {
            id: 4,
            origin: "Origin 4",
            destination: "Destination 4",
            depart_time: "2021-01-01 10:00",
            arrive_time: "2021-01-01 11:00",
            price: 4000,
        },
        {
            id: 5,
            origin: "Origin 5",
            destination: "Destination 5",
            depart_time: "2021-01-01 10:00",
            arrive_time: "2021-01-01 11:00",
            price: 5000,
        },
        {
            id: 6,
            origin: "Origin 6",
            destination: "Destination 6",
            depart_time: "2021-01-01 10:00",
            arrive_time: "2021-01-01 11:00",
            price: 6000,
        },
        {
            id: 7,
            origin: "Origin 7",
            destination: "Destination 7",
            depart_time: "2021-01-01 10:00",
            arrive_time: "2021-01-01 11:00",
            price: 7000,
        },
        {
            id: 8,
            origin: "Origin 8",
            destination: "Destination 8",
            depart_time: "2021-01-01 10:00",
            arrive_time: "2021-01-01 11:00",
            price: 8000,
        },
    ]
    static ITEMS: any = []
}

export async function loginGetToken(email: string, password: string) {
    if (email !== DB.EMAIL || password !== DB.PASSWORD) {
        throw new Error('loginGetToken: Failed to fetch data')
    }
    return DB.ACCESS_TOKEN
}

export async function addToCart(ticket_id: number, access_token: TOKEN) {
    if (access_token.access_token !== DB.ACCESS_TOKEN.access_token || access_token.token_type !== DB.ACCESS_TOKEN.token_type) {
        throw new Error('addToCart: Failed to fetch data')
    }
    if (DB.TICKETS.findIndex(ticket => ticket.id == ticket_id) == -1) {
        throw new Error('addToCart: Failed to fetch data')
    }
    const item = {
        id: DB.ITEMS.length + 1,
        ticket_id: ticket_id,
        has_purchased: false,
    }
    DB.ITEMS.push(item)
    return item
}

export async function updatePurchaseStatus(item_id: number, has_purchased: boolean, access_token: TOKEN) {
    if (access_token.access_token !== DB.ACCESS_TOKEN.access_token || access_token.token_type !== DB.ACCESS_TOKEN.token_type) {
        throw new Error('updatePurchaseStatus: Failed to fetch data')
    }
    const index: number = DB.ITEMS.findIndex((item: any) => item.id == item_id)
    if (index == -1) {
        throw new Error('updatePurchaseStatus: Failed to fetch data')
    }
    DB.ITEMS[index].has_purchased = has_purchased
    return DB.ITEMS[index]
}

export async function getCartItems(access_token: TOKEN) {
    if (access_token.access_token !== DB.ACCESS_TOKEN.access_token || access_token.token_type !== DB.ACCESS_TOKEN.token_type) {
        throw new Error('getCartItems: Failed to fetch data')
    }
    return DB.ITEMS
}

export async function getItemWithTicket(item_id: number, access_token: TOKEN) {
    if (access_token.access_token !== DB.ACCESS_TOKEN.access_token || access_token.token_type !== DB.ACCESS_TOKEN.token_type) {
        throw new Error('getItemWithTicket: Failed to fetch data')
    }
    const item = DB.ITEMS.find((item: any) => item.id == item_id)
    if (item) {
        const ticket = DB.TICKETS.find(ticket => ticket.id == item.ticket_id)
        if (ticket) {
            return {
                id: item.id,
                ticket: ticket,
                has_purchased: item.has_purchased,
            }
        } else {
            throw new Error('getItemWithTicket: Failed to fetch data')
        }
    } else {
        throw new Error('getItemWithTicket: Failed to fetch data')
    }
}

export async function getCartItemsWithTicket(access_token: TOKEN) {
    if (access_token.access_token !== DB.ACCESS_TOKEN.access_token || access_token.token_type !== DB.ACCESS_TOKEN.token_type) {
        throw new Error('getCartItemsWithTicket: Failed to fetch data')
    }
    const items: ITEM_WITH_TICKET[] = []
    for (const item of DB.ITEMS) {
        if (item.has_purchased == false) {
            const ticket = DB.TICKETS.find(ticket => ticket.id == item.ticket_id)
            if (ticket) {
                items.push({
                    id: item.id,
                    ticket: ticket,
                    has_purchased: item.has_purchased,
                })
            } else {
                throw new Error('getCartItemsWithTicket: Failed to fetch data')
            }
        }
    }
    return items
}

export async function getHistoryItemsWithTicket(access_token: TOKEN) {
    if (access_token.access_token !== DB.ACCESS_TOKEN.access_token || access_token.token_type !== DB.ACCESS_TOKEN.token_type) {
        throw new Error('getHistoryItemsWithTicket: Failed to fetch data')
    }
    const items: ITEM_WITH_TICKET[] = []
    for (const item of DB.ITEMS) {
        if (item.has_purchased == true) {
            const ticket = DB.TICKETS.find(ticket => ticket.id == item.ticket_id)
            if (ticket) {
                items.push({
                    id: item.id,
                    ticket: ticket,
                    has_purchased: item.has_purchased,
                })
            } else {
                throw new Error('getHistoryItemsWithTicket: Failed to fetch data')
            }
        }
    }
    return items
}

export async function getTickets() {
    return DB.TICKETS
}

export async function getTicket(id: number) {
    const ticket = DB.TICKETS.find(ticket => ticket.id == id)
    if (ticket) {
        return ticket
    } else {
        throw new Error('getTicket: Failed to fetch data')
    }
}
