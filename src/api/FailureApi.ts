import type {ApartmentShortResponse} from "./ApartmentApi.ts";
import type {UserShortResponse} from "./usersApi.ts";

const API_URL = "http://localhost:8080";
export type FailureStatus = Readonly<"NEW" | "IN_PROGRESS" | "RESOLVED">;

export type PhotoResponse = Readonly<{
    photoId: number;
    name: string;
}>

export type FailureChangeStatusRequest = {
    status: FailureStatus;
}

export type FailureEditRequest = {
    apartmentId: number;
    description: string;
    photoToDelete: number[];
}

export type FailureRequest = {
    apartmentId: number;
    description: string;
}

export type FailureResponse = Readonly<{
    failureId: number;
    reporting: object;
    manager: UserShortResponse;
    apartment: ApartmentShortResponse;
    description: string;
    photos: PhotoResponse[];
    status: FailureStatus;
    creationTime: string;
}>

export type FailureShortResponse = Readonly<{
    failureId: number;
    description: string;
    status: FailureStatus;
    creationTime: string;
}>

export async function createFailure(request: FailureRequest, photos?: File[]): Promise<FailureShortResponse> {
    const token = localStorage.getItem("token");
    const formData = new FormData();

    formData.append('data', new Blob([JSON.stringify(request)], {type: "application/json"}));
    if (photos){
        photos.forEach(photo => {
            formData.append('photos', photo);
        });
    }

    const response = await fetch(`${API_URL}/failures/`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}

export async function getFailure(id: number): Promise<FailureResponse> {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/failures/${id}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}

export async function editFailure(id: number, request: FailureEditRequest, photos?: File[]): Promise<FailureShortResponse> {
    const token = localStorage.getItem("token");
    const formData = new FormData();

    formData.append('data', new Blob([JSON.stringify(request)], {type: "application/json"}));
    if (photos){
        photos.forEach(photo => {
            formData.append('photos', photo);
        });
    }

    const response = await fetch(`${API_URL}/failures/${id}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}

export async function changeFailureStatus(id: number, request: FailureChangeStatusRequest): Promise<FailureShortResponse> {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/failures/${id}`, {
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

export async function deleteFailure(id: number): Promise<void> {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/failures/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }
}
