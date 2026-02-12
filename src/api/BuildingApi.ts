import type {ApartmentShortResponse} from "./ApartmentApi.ts";
import type {EventShortResponse} from "./EventApi.ts";
import type {UserShortResponse} from "./usersApi.ts";

const API_URL = 'http://localhost:8080';

export type AddressResponse = Readonly<{
    country: string;
    city: string;
    postalCode: string;
    street: string;
    buildingNumber: string;
}>

export type BuildingEditRequest = {
    country: string;
    city: string;
    postalCode: string;
    street: string;
    buildingNumber: string;
    managerId: number;
}

export type BuildingRequest = {
    country: string;
    city: string;
    postalCode: string;
    street: string;
    buildingNumber: string;
    managerId: number;
}

export type BuildingResponse = Readonly<{
    buildingId: number;
    address: AddressResponse;
    manager: UserShortResponse;
    apartments: ApartmentShortResponse[];
    events: EventShortResponse[];
}>

export type BuildingShortResponse = Readonly<{
    buildingID: number;
    address: AddressResponse;
}>

export async function createBuilding(request: BuildingRequest): Promise<BuildingShortResponse> {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/buildings`, {
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

export async function getBuildings(): Promise<BuildingShortResponse[]> {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/buildings`, {
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

export async function getBuilding(id: number): Promise<BuildingResponse> {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/buildings/${id}`, {
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

export async function editBuilding(id: number, request: BuildingEditRequest): Promise<BuildingShortResponse> {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/buildings/${id}`, {
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

export async function deleteBuilding(id: number): Promise<void> {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/buildings/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }
}
