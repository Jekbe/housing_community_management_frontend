import type {ApartmentShortResponse} from "./ApartmentApi.ts";
import type {FailureShortResponse} from "./FailureApi.ts";
import type {InvoiceShortResponse} from "./InvoiceApi.ts";
import type {PaymentShortResponse} from "./PaymentApi.ts";
import type {ComplaintShortResponse} from "./ComplaintApi.ts";
import type {BuildingShortResponse} from "./BuildingApi.ts";
import type {EventShortResponse} from "./EventApi.ts";

const API_URL = "http://localhost:8080";
export type Role = Readonly<'HOUSING_MANAGER' | 'BUILDING_MANAGER' | 'RESIDENT'>

export const roleLabel: Record<Role, string> = {
    HOUSING_MANAGER: "Zarządca wspólnoty",
    BUILDING_MANAGER: "Zarządca budynku",
    RESIDENT: "Mieszkaniec"
}

export type UserEditRequest = {
    name: string;
    surname: string;
    pesel: string;
    email: string;
    password: string;
}

export type UserProfileResponse = Readonly<{
    userId: number;
    profileId: number;
    name: string;
    surname: string;
    pesel: string;
    email: string;
    role: string;
    apartments: ApartmentShortResponse[];
    failures: FailureShortResponse[];
    invoices: InvoiceShortResponse[];
    payments: PaymentShortResponse[];
    complaints: ComplaintShortResponse[];
    managedBuildings: BuildingShortResponse[];
    events: EventShortResponse[];
}>;

export type UserRequest = {
    name: string;
    surname: string;
    pesel: string;
    email: string;
    password: string;
    role: Role;
}

export type UserShortResponse = Readonly<{
    userId: number;
    name: string;
    surname: string;
    email: string;
    role: Role;
}>

export async function createUser(request: UserRequest): Promise<UserShortResponse> {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/users`, {
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

export async function getUsersList(): Promise<UserShortResponse[]> {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/users`, {
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

export async function getUserProfile(userId: number): Promise<UserProfileResponse> {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/users/${userId}`, {
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

export async function editUser(id: number, request: UserEditRequest): Promise<UserShortResponse> {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/users/${id}`, {
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

export async function addApartmentForUser(userId: number, apartmentId: number): Promise<UserShortResponse> {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/users/${userId}/apartments/${apartmentId}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}

export async function deleteApartmentForUser(userId: number, apartmentId: number): Promise<UserShortResponse> {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/users/${userId}/apartments/${apartmentId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}

export async function deleteUser(id: number): Promise<void> {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/users/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }
}
