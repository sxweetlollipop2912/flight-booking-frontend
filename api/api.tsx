import {TOKEN} from "@/models/Token";
import {CART_ITEM_WITH_TICKET} from "@/models/CartItem";

const apiUrl = "http://localhost:80"

export async function loginGetToken(email: string, password: string) {
    const params = new URLSearchParams();
    params.append('username', email);
    params.append('password', password);
    const res = await fetch(`${apiUrl}/api/login/access-token`, {
        method: 'POST',
        body: params,
    })

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export async function addToCart(ticket_id: number, access_token: TOKEN) {
    console.log("adding to cart ticket_id: ", ticket_id);
    const res = await fetch(`${apiUrl}/api/items/`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${access_token.access_token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            has_purchased: false,
            ticket_id: ticket_id
        }),
    })

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export async function getCartItems(access_token: TOKEN) {
    const res = await fetch(`${apiUrl}/api/items/cart`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${access_token.access_token}`,
        },
    })

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export async function getCartItemsWithTicket(access_token: TOKEN) {
    const itemsGet = await getCartItems(access_token)
    const items: CART_ITEM_WITH_TICKET[] = []
    for (const item of itemsGet) {
        const ticket = await getTicket(item.ticket_id)
        items.push({
            id: item.id,
            ticket: ticket
        })
    }
    return items
}

export async function getTickets() {
    const res = await fetch(`${apiUrl}/api/tickets/`)

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export async function getTicket(id: number) {
    const res = await fetch(`${apiUrl}/api/tickets/${id}`)

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}
