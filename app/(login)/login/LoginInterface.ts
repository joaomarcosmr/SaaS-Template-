export type LoginRequest = {
	email: string;
	password: string;
}

export type LoginResponse = {
	email?: string;
	password?: string;
}

export type UserRequest = {
	name: string;
	cpf?: string;
	cnpj?: string;
	email: string;
	password: string;
}

export type UserResponse = {
	name: string;
	cpf?: string;
	cnpj?: string;
	email: string;
	password: string;
} 