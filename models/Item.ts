import {TICKET} from "@/models/Ticket";

export type ITEM_WITH_TICKET = {
    id: number,
    ticket: TICKET,
    has_purchased: boolean,
}