"use client";

import { AppSidebar } from "@/components/sidebar-menu";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useState } from "react";
import { SettingsDialog } from "./settings-dialog";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
	const [isSettingsOpen, setIsSettingsOpen] = useState(false);
	const [activeTab, setActiveTab] = useState("general");

	const openSettings = (tab: string) => {
		setActiveTab(tab);
		setIsSettingsOpen(true);
	};

	return (
		<SidebarProvider>
			<AppSidebar openSettings={openSettings} />
			<main>
				{children}
			</main>
			<SettingsDialog isOpen={isSettingsOpen} setIsOpen={setIsSettingsOpen} activeTab={activeTab} setActiveTab={setActiveTab} />
		</SidebarProvider>
	)
}
