export type RegisterRequest = {
	name: string;
	email: string;
	confirmEmail: string;
	password: string;
	confirmPassword: string;
}

export type RegisterResponse = {
	name: string;
	email: string;
}