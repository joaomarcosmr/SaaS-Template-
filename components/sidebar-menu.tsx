"use client";

import { useState } from "react";
import {
	Home,
	ChevronLeft,
	ChevronRight,
	User,
	LogOut,
	Menu,
} from "lucide-react";

import {
	Sheet,
	SheetContent,
	SheetTrigger,
} from "@/components/ui/sheet";

import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/context/ThemeContext";
import { SettingsTabs } from "@/types/SettingsTypes";
import { logout } from "@/app/(login)/actions";
import { toast } from "@/hooks/use-toast";
import { useUser } from "@/context/UserContext";

const menuItems = [{ title: "Inicio", icon: Home, path: "/dashboard" }];

export function AppSidebar({ openSettings }: { openSettings: (tab: string) => void }) {
	const [isOpen, setIsOpen] = useState(true);
	const { theme } = useTheme();
	const { user } = useUser();

	const bgClass = theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800";
	const borderClass = theme === "dark" ? "border-gray-700" : "border-gray-200";
	const hoverClass = theme === "dark" ? "hover:bg-gray-800 hover:text-gray-100" : "hover:bg-gray-100 hover:text-gray-900";

	const handleLogout = async () => {
		const response = await logout();

		if (!response.success) {
			toast({
				variant: "destructive",
				description: response.message,
			});
		}
	};

	return (
		<div className="flex">
			{/* Mobile Menu Button */}
			<div className="absolute top-4 left-4 lg:hidden">
				<Sheet>
					<SheetTrigger asChild>
						<button className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
							<Menu className="h-6 w-6" />
						</button>
					</SheetTrigger>
					<SheetContent side="left" className={`w-full h-full p-4 ${bgClass}`}>
						<MobileSidebar openSettings={openSettings} handleLogout={handleLogout} />
					</SheetContent>
				</Sheet>
			</div>

			{/* Sidebar (Desktop) */}
			<aside className={`h-screen ${bgClass} shadow-md transition-all duration-300 ${isOpen ? "w-64" : "w-20"} rounded-r-2xl border-r ${borderClass} hidden lg:flex flex-col`}>
				{/* Header */}
				<div className={`flex items-center justify-between p-4 border-b ${borderClass}`}>
					<span className={`text-lg font-semibold transition-opacity ${isOpen ? "opacity-100" : "opacity-0"}`}>
						Meu SaaS
					</span>
					<button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200" onClick={() => setIsOpen(!isOpen)}>
						{isOpen ? <ChevronLeft /> : <ChevronRight />}
					</button>
				</div>

				{/* Menu */}
				<nav className="flex-1 p-4 gap-2">
					{menuItems.map(({ title, icon: Icon, path }) => (
						<a key={title} href={path} className={`flex items-center gap-4 p-3 rounded-lg text-gray-600 dark:text-gray-300 ${hoverClass} transition shadow-sm`}>
							<Icon className="h-5 w-5" />
							{isOpen && <span>{title}</span>}
						</a>
					))}
				</nav>

				{/* Footer - User Profile Dropdown */}
				<div className={`border-t ${borderClass} p-4`}>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<button className={`flex items-center gap-4 w-full p-3 rounded-lg text-gray-600 dark:text-gray-300 ${hoverClass} transition shadow-sm`}>
								<User className="h-5 w-5" />
								{isOpen && <span>Perfil</span>}
							</button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className={`${bgClass} ${borderClass} shadow-md rounded-lg`}>
							<DropdownMenuItem className={`${hoverClass} cursor-pointer`} onClick={() => openSettings(SettingsTabs.ACCOUNT)}>
								Minha conta
							</DropdownMenuItem>
							{user?.customerId && (
								<DropdownMenuItem
									className={`${hoverClass} cursor-pointer`}
									onClick={() => {
										const stripeDashboardUrl = `https://dashboard.stripe.com/customers/${user.customerId}`;
										window.open(stripeDashboardUrl, '_blank');
									}}
								>
									Pagamentos
								</DropdownMenuItem>
							)}
							<DropdownMenuItem className={`${hoverClass} cursor-pointer`} onClick={() => openSettings(SettingsTabs.SETTINGS)}>
								Configurações
							</DropdownMenuItem>
							<DropdownMenuItem className="text-red-500 hover:bg-red-100 dark:hover:bg-red-800 cursor-pointer" onClick={handleLogout}>
								<LogOut className="h-4 w-4 mr-2" />
								Sair
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</aside>
		</div>
	);
}

/* Mobile Sidebar */
function MobileSidebar({ openSettings, handleLogout }: { openSettings: (tab: string) => void; handleLogout: () => void }) {
	const { theme } = useTheme(); // Obtém o tema atual

	const bgClass = theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800";
	const borderClass = theme === "dark" ? "border-gray-700" : "border-gray-300";
	const hoverClass = theme === "dark" ? "hover:bg-gray-800 hover:text-gray-100" : "hover:bg-gray-100 hover:text-gray-900";

	return (
		<aside className={`w-full h-full ${bgClass} flex flex-col`}>
			{/* Header */}
			<div className={`flex items-center justify-between p-4 border-b ${borderClass}`}>
				<h1 className="text-lg font-semibold">Meu SaaS</h1>
			</div>

			{/* Menu */}
			<nav className="flex-1 p-4">
				{menuItems.map(({ title, icon: Icon, path }) => (
					<a key={title} href={path} className={`flex items-center gap-4 p-3 rounded-lg text-gray-600 dark:text-gray-300 ${hoverClass} transition shadow-sm`}>
						<Icon className="h-5 w-5" />
						<span>{title}</span>
					</a>
				))}
			</nav>

			{/* Footer */}
			<div className={`border-t ${borderClass} p-4`}>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<button className={`flex items-center gap-4 w-full p-3 rounded-lg text-gray-600 dark:text-gray-300 ${hoverClass} transition shadow-sm`}>
							<User className="h-5 w-5" />
							<span>Perfil</span>
						</button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className={`${bgClass} ${borderClass} shadow-md rounded-lg`}>
						<DropdownMenuItem className="text-red-500 hover:bg-red-100 dark:hover:bg-red-800 cursor-pointer" onClick={handleLogout}>
							<LogOut className="h-4 w-4 mr-2" />
							Sair
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</aside>
	);
}
