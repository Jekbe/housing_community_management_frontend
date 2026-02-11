import type {FailureStatus} from "./FailureApi.ts";
import type {UserShortResponse} from "./usersApi.ts";

const API_URL = "http://localhost:8080";

export type ComplaintChangeStatusRequest = {
    status: FailureStatus;
}

export type ComplaintEditRequest = {
    description: string;
}

export type ComplaintRequest = {
    managerId: number;
    description: string;
}

export type ComplaintResponse = Readonly<{
    complaintId: number;
    reporting: object;
    manager: UserShortResponse;
    description: string;
    status: FailureStatus;
    creationTime: string;
}>

export type ComplaintShortResponse = Readonly<{
    complaintId: number;
    description: string;
    status: FailureStatus;
    creationTime: string;
}>

export async function createComplaint(request: ComplaintRequest): Promise<ComplaintShortResponse> {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/complaints`, {
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

export async function getComplaint(id: number): Promise<ComplaintResponse>{
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/complaints/${id}`, {
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

export async function editComplaint(id: number, request: ComplaintEditRequest): Promise<ComplaintShortResponse> {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/complaints/${id}`, {
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

export async function changeComplaintStatus(id: number, request: ComplaintChangeStatusRequest): Promise<ComplaintShortResponse> {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/complaints/${id}`, {
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

export async function deleteComplaint(id: number): Promise<void> {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/complaints/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }
}
