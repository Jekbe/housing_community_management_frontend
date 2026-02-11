import type {UserShortResponse} from "./usersApi.ts";

const API_URL = "http://localhost:8080";

export type MessageRequest = {
    recipientId: number;
    subject: string;
    content: string;
}

export type MessageResponse = Readonly<{
    messageId: number;
    sender: UserShortResponse;
    subject: string;
    content: string;
    sendTime: string;
}>

export type MessageShortResponse = Readonly<{
    messageId: number;
    sender: UserShortResponse;
    subject: string;
    sendTime: string;
}>

export async function sendMessage(request: MessageRequest): Promise<MessageShortResponse> {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/messages`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}

export async function getMessagesList(id: number): Promise<MessageShortResponse[]> {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/messages/user/${id}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    if (!response.ok) {
        return response.json();
    }

    return response.json();
}

export async function getMessage(id: number): Promise<MessageResponse> {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/messages/${id}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        return response.json();
    }

    return response.json();
}

export async function deleteMessage(id: number): Promise<void> {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/messages/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        return response.json();
    }
}
