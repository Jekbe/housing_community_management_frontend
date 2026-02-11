import type {InvoiceShortResponse} from "./InvoiceApi.ts";

const API_URL = "http://localhost:8080";

export type PaymentRequest = {
    invoiceId: number;
    amount: number;
    transactionId: string;
}

export type PaymentResponse = Readonly<{
    paymentId: number;
    invoice: InvoiceShortResponse;
    amount: number;
    paymentTime: string;
    transactionId: string;
}>

export type PaymentShortResponse = Readonly<{
    paymentId: number;
    amount: number;
    paymentTime: string;
}>

export async function payInvoice(request: PaymentRequest): Promise<PaymentResponse> {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/payments`, {
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

export async function getPaymentList(): Promise<PaymentShortResponse[]> {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/payments`, {
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

export async function getPayment(id: number): Promise<PaymentResponse> {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/payments/${id}`, {
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
