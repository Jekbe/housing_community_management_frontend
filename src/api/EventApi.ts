import type {BuildingShortResponse} from "./BuildingApi.ts";

const API_URL = "http://localhost:8080";
type EventStatus = Readonly<"PLANNED" | "CONFIRMED" | "CANCELED" | "ENDED">;

export type EventChangeStatusRequest = {
    status: EventStatus;
}

export type EventEditRequest = {
    buildingId: number;
    title: string;
    description: string;
    eventTime: string;
}

export type EventRequest = {
    buildingId: number;
    title: string;
    description: string;
    eventTime: string;
}

export type EventResponse = Readonly<{
    eventId: number;
    building: BuildingShortResponse
    title: string;
    description: string;
    eventTime: string;
    status: EventStatus;
}>

export type EventShortResponse = Readonly<{
    eventId: number;
    title: string;
    eventTime: string;
}>

export async function createEvent(request: EventRequest): Promise<EventShortResponse>  {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/events`, {
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

export async function getEvent(id: number): Promise<EventResponse> {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/events/${id}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}

export async function editEvent(id: number, request: EventEditRequest): Promise<EventShortResponse> {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/events/${id}`, {
        method: "PUT",
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

export async function changeEventStatus(id: number, request: EventChangeStatusRequest): Promise<EventShortResponse> {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/events/${id}`, {
        method: "PATCH",
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

export async function deleteEvent(id: number): Promise<void> {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/events/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }
}
