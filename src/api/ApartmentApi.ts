import type {BuildingShortResponse} from "./BuildingApi.ts";
import type {UserShortResponse} from "./usersApi.ts";
import type {InvoiceShortResponse} from "./InvoiceApi.ts";
import type {FailureShortResponse} from "./FailureApi.ts";

const API_URL = "http://localhost:8080";

export type ApartmentEditRequest = {
    number: string;
}

export type ApartmentRequest = {
    buildingId: number;
    number: string;
}

export type ApartmentResponse = Readonly<{
    apartmentId: number;
    building: BuildingShortResponse;
    number: string;
    residentsInfo: UserShortResponse[];
    invoices: InvoiceShortResponse[];
    failures: FailureShortResponse[];
}>

export type ApartmentShortResponse = Readonly<{
    apartmentId: number;
    number: string;
}>

export async function createApartment(request: ApartmentRequest): Promise<ApartmentShortResponse> {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/apartments`, {
        method: 'POST',
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

export async function getApartment(id: number): Promise<ApartmentResponse>{
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/apartments/${id}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}

export async function editApartment(id: number, request: ApartmentEditRequest): Promise<ApartmentShortResponse>{
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/apartments/${id}`, {
        method: 'PUT',
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

export async function deleteApartment(id: number): Promise<void>{
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/apartments/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }
}
