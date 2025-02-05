"use client";

import { createContext, useContext, useEffect, useState } from "react";

type ThemeContextType = {
	theme: string;
	setTheme: (theme: string) => void;
};

const ThemeContext = createContext<ThemeContextType>({
	theme: "light",
	setTheme: () => { },
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [theme, setTheme] = useState<string>("light");

	// Load theme from localStorage or system preference
	useEffect(() => {
		const savedTheme = localStorage.getItem("theme");
		const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
		setTheme(savedTheme || systemTheme);
	}, []);

	// Apply theme
	useEffect(() => {
		document.documentElement.classList.remove("light", "dark");
		document.documentElement.classList.add(theme);
		localStorage.setItem("theme", theme);
	}, [theme]);

	return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
	return useContext(ThemeContext);
}
