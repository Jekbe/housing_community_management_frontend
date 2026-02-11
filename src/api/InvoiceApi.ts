import type {ApartmentShortResponse} from "./ApartmentApi.ts";
import type {PaymentShortResponse} from "./PaymentApi.ts";

const API_URL = "http://localhost:8080";
type InvoiceStatus = Readonly<'NEW' | 'PAID' | 'EXPIRED' | 'CANCELLED'>;

export type InvoiceChangeStatusRequest = {
    status: InvoiceStatus;
}

export type InvoiceEditRequest = {
    apartmentId: number;
    description: string;
    amount: number;
    dueTime: string;
}

export type InvoiceRequest = {
    apartmentId: number;
    description: string;
    amount: number;
    dueTime: string;
}

export type InvoiceResponse = Readonly<{
    invoiceId: number;
    apartment: ApartmentShortResponse;
    description: string;
    amount: number;
    status: InvoiceStatus;
    dueTime: string;
    creationTime: string;
    payment: PaymentShortResponse;
}>

export type InvoiceShortResponse = Readonly<{
    invoiceId: number;
    amount: number;
    status: InvoiceStatus;
    dueTime: string;
}>

export async function createInvoice(request: InvoiceRequest): Promise<InvoiceShortResponse> {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/invoices`, {
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

export async function getInvoice(id: number): Promise<InvoiceResponse> {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/invoices/${id}`, {
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

export async function editInvoice(id: number, request: InvoiceEditRequest): Promise<InvoiceShortResponse> {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/invoices/${id}`, {
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

export async function changeInvoiceStatus(id: number, request: InvoiceChangeStatusRequest): Promise<InvoiceShortResponse> {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/invoices/${id}`, {
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

export async function deleteInvoice(id: number): Promise<void> {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/invoices/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }
}
