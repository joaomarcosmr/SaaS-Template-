"use client";

import {
	Dialog,
	DialogContent,
} from "@/components/ui/dialog";

import {
	Settings,
	User,
} from "lucide-react";
import { SettingsTabs } from "@/types/SettingsTypes";
import AccountSettings from "@/components/account-settings-dialog";
import GeneralSettings from "@/components/general-settings-dialog";

interface ISettingsDialog {
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
	activeTab: string;
	setActiveTab: (tab: SettingsTabs) => void;
}

const menuItems = [
	{ title: "Minha conta", icon: User, id: SettingsTabs.ACCOUNT },
	{ title: "Configurações", icon: Settings, id: SettingsTabs.SETTINGS },
];

export function SettingsDialog({
	isOpen,
	setIsOpen,
	activeTab,
	setActiveTab,
}: ISettingsDialog) {
	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			{/* Modal Content */}
			<DialogContent className="max-w-4xl w-full bg-white dark:bg-gray-900 lg:flex lg:p-0 lg:rounded-lg lg:overflow-hidden">
				{/* Sidebar */}
				<aside className="lg:w-64 bg-gray-100 dark:bg-gray-900 p-4 lg:border-r lg:dark:border-gray-700">
					{/* For Mobile - Dropdown Menu */}
					<div className="lg:hidden mb-4">
						<select
							value={activeTab}
							onChange={(e) => setActiveTab(e.target.value as SettingsTabs)}
							className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900"
						>
							{menuItems.map(({ title, id }) => (
								<option key={id} value={id}>
									{title}
								</option>
							))}
						</select>
					</div>

					{/* For Desktop - Sidebar Navigation */}
					<nav className="hidden lg:mt-4 lg:space-y-2 lg:block">
						{menuItems.map(({ title, icon: Icon, id }) => (
							<button
								key={id}
								onClick={() => setActiveTab(id)}
								className={`flex items-center w-full gap-4 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition ${activeTab === id ? "bg-gray-200 dark:bg-gray-800" : ""
									} ${id === SettingsTabs.LOGOUT && "text-red-700"}`}
							>
								<Icon className="h-5 w-5" />
								{title}
							</button>
						))}
					</nav>
				</aside>

				{/* Main Content Area */}
				<main className="p-4 lg:p-6 flex-1 bg-white dark:bg-gray-900">
					{activeTab === SettingsTabs.ACCOUNT && <AccountSettings />}
					{activeTab === SettingsTabs.SETTINGS && <GeneralSettings />}
				</main>
			</DialogContent>
		</Dialog>
	);
}
