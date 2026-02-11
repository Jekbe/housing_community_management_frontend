import type {UserShortResponse} from "./usersApi.ts";

const API_URL = "http://localhost:8080";
type FileType = Readonly<'CONTRACT' | 'INVOICE' | 'REGULATION' | 'OTHER'>;

export type FileEditRequest = {
    name: string,
    fileType: FileType,
    recipientId: number,
}

export type FileRequest = {
    name: string,
    fileType: FileType,
    recipientId: number,
}

export type FileResponse = Readonly<{
    fileId: number,
    name: string,
    fileType: FileType,
    uploadTime: string,
    sender: UserShortResponse,
    recipient: object,
}>

export async function uploadFile(request: FileRequest, file: File): Promise<FileResponse> {
    const token = localStorage.getItem("token");
    const formData = new FormData();

    formData.append('data', new Blob([JSON.stringify(request)], {type: "application/json"}));
    formData.append('file', file);

    const response = await fetch(`${API_URL}/files/`, {
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

export async function getFiles(id: number): Promise<FileResponse[]> {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/files/${id}`, {
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

export async function editFileData(id: number, request: FileEditRequest): Promise<FileResponse> {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/files/${id}`, {
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

export async function downloadFile(id: number): Promise<void> {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/files/${id}/download`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    const blob = await response.blob();
    const contentDisposition = response.headers.get('content-disposition');
    let filename = 'file';
    if (contentDisposition) {
        const match = contentDisposition.match(/filename="(.+)"/);
        if (match?.[1]) {
            filename = match[1];
        }
    }

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();

    a.remove();
    window.URL.revokeObjectURL(url);
}

export async function deleteFile(id: number): Promise<void> {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/files/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }
}
