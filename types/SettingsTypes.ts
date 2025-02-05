// enum

export enum SettingsTabs {
	GENERAL = "general",
	PAYMENT = "payment",
	SETTINGS = "settings",
	ACCOUNT = "account",
	LOGOUT = "logout",
}

export enum LanguageOptions {
	PORTUGUESE = "pt",
}

// types

export type ResponseError = {
	success: boolean,
	message: string
	data?: any
}

export type GeneralSettingsData = {
	theme: string,
	language: LanguageOptions,
	notification: boolean
}

// default settings

export const generalSettingsData: GeneralSettingsData = {
	theme: '',
	language: LanguageOptions.PORTUGUESE,
	notification: true,
}