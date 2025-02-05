"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getUserData } from "@/app/(login)/actions";
import { toast } from "@/hooks/use-toast";
import { UserData } from "@/types/UserTypes";
import { ResponseError } from "@/types/SettingsTypes";

interface UserContextType {
	user: UserData | null;
	loading: boolean;
	refreshUserData: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<UserData | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	const fetchUserData = async () => {
		setLoading(true);
		const response = await getUserData();

		if ((response as ResponseError).success === false) {
			setUser(null);
		} else {
			localStorage.setItem("notification", JSON.stringify((response as UserData).notification));
			setUser(response as UserData);
		}
		setLoading(false);
	};

	useEffect(() => {
		fetchUserData();
	}, []);

	return (
		<UserContext.Provider value={{ user, loading, refreshUserData: fetchUserData }}>
			{children}
		</UserContext.Provider>
	);
}

export function useUser() {
	const context = useContext(UserContext);
	if (context === undefined) {
		throw new Error("useUser deve ser usado dentro de um UserProvider");
	}
	return context;
}
