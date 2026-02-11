const API_URL = 'http://localhost:8080';
type Role = Readonly<"HOUSING_MANAGER" | "BUILDING_MANAGER" | "RESIDENT">;

export type LoginRequest = {
    email: string;
    password: string;
}

export type LoginResponse = Readonly <{
    token: string;
    id: number;
    role: Role;
}>;

export async function login(request: LoginRequest): Promise<LoginResponse> {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}