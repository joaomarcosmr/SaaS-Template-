// enum

export enum SettingsTabs {
	GENERAL = "general",
	PAYMENT = "payment",
	SETTINGS = "settings",
	ACCOUNT = "account",
	LOGOUT = "logout",
}

// interface



// types

export type UserData = {
	id: number;
	name: string;
	email: string;
	auth_id: string;
	hasAccess: boolean;
	customerId?: string;
	planPriceId: string;
	notification: boolean;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date | null;
  };


export type PasswordData = {
	currentPassword: string;
	newPassword: string;
	confirmPassword:  string;
}


// default settings

export const defaultUserData: UserData = {
	id: 0,
	name: "",
	email: "",
	auth_id: "",
	hasAccess: true,
	planPriceId: "string",
	createdAt: new Date(),
	updatedAt: new Date(),
	deletedAt: null,
	notification: false
}

export const defaultPasswordData = {
	currentPassword: "",
	newPassword: "",
	confirmPassword: "",
}