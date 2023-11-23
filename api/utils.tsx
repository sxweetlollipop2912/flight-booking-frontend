import {TOKEN} from "@/models/Token";

export function saveLocalToken(access_token: TOKEN) {
    localStorage.setItem('access-token', JSON.stringify(access_token));
}

export function removeLocalToken() {
    localStorage.removeItem('access-token');
}

export function getLocalToken(): TOKEN | null {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('access-token');
        if (token) {
            return JSON.parse(token);
        }
    }
    return null;
}
