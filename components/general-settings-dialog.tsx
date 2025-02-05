"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Moon, Sun, Monitor, Loader2 } from "lucide-react";
import { GeneralSettingsData, generalSettingsData, ResponseError } from "@/types/SettingsTypes";
import { useUser } from "@/context/UserContext";
import { Skeleton } from "./ui/skeleton";
import { updateNotificationData } from "@/app/(login)/actions";
import { toast } from "@/hooks/use-toast";

export default function GeneralSettings() {
	const { setTheme } = useTheme();
	const { user, loading } = useUser();
	const [settings, setSettings] = useState<GeneralSettingsData>(generalSettingsData);
	const [loadingButton, setLoadingButton] = useState<boolean>(false);
	const [loadingSettings, setLoadingSettings] = useState<boolean>(false);

	const handleSave = async () => {
		setLoadingButton(true);

		const currentNotification = user?.notification

		if (currentNotification !== settings.notification && user) {
			const response = await updateNotificationData(user.email, settings.notification);

			if (!response.success) {
				toast({
					variant: "destructive",
					description: response.message,
				});
				setLoadingButton(false);
				return
			}
		}

		setTheme(settings.theme);
		localStorage.setItem("theme", settings.theme);
		localStorage.setItem("language", settings.language);
		localStorage.setItem("notification", JSON.stringify(settings.notification));

		toast({
			variant: "success",
			description: "Configurações atualizadas com sucesso!",
		});
		setLoadingButton(false);
	};

	useEffect(() => {
		setLoadingSettings(true);

		const fetchSettings = async () => {
			try {
				const storedTheme = localStorage.getItem('theme') || settings.theme;

				setSettings((prevSettings) => ({
					...prevSettings,
					theme: storedTheme,
					notification: user?.notification ?? prevSettings.notification,
				}));

				setTheme(storedTheme);
			} catch (error) {
				console.error("Erro ao buscar configurações:", error);
			} finally {
				setLoadingSettings(false);
			}
		};

		fetchSettings();
	}, [user]);

	return (
		<div className="max-w-4xl mx-auto space-y-6 p-2 bg-white dark:bg-gray-900">
			{/* Theme Selection */}
			<Card>
				<CardHeader>
					<CardTitle>Configuração de Tema</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<Label>Tema</Label>
					{loading || loadingSettings ? (
						<Skeleton className="h-8 w-full rounded-md" />
					) : (
						<Select
							value={settings.theme}
							onValueChange={(value) => setSettings({ ...settings, theme: value })}
						>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Selecione um tema" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="light">
									<div className="flex items-center gap-2">
										<Sun className="h-4 w-4" /> Claro
									</div>
								</SelectItem>
								<SelectItem value="dark">
									<div className="flex items-center gap-2">
										<Moon className="h-4 w-4" /> Escuro
									</div>
								</SelectItem>
								<SelectItem value="system">
									<div className="flex items-center gap-2">
										<Monitor className="h-4 w-4" /> Automático (Sistema)
									</div>
								</SelectItem>
							</SelectContent>
						</Select>
					)}
				</CardContent>
			</Card>

			{/* Language Selection
			<Card>
				<CardHeader>
					<CardTitle>Idioma</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<Label>Idioma do Sistema</Label>
					<Select
						value={settings.language}
						onValueChange={(value) => setSettings({ ...settings, language: value })}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Selecione um idioma" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="pt">Português</SelectItem>
							<SelectItem value="en">Inglês</SelectItem>
							<SelectItem value="es">Espanhol</SelectItem>
						</SelectContent>
					</Select>
				</CardContent>
			</Card> */}

			{/* Notifications */}
			<Card>
				<CardHeader>
					<CardTitle>Notificações</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between">
						<Label>Ativar notificações</Label>
						{loading || loadingSettings ? (
							<Skeleton className="h-4 w-4 rounded-md" />
						) : (
							<Switch
								checked={settings.notification}
								onCheckedChange={(value) => setSettings({ ...settings, notification: value })}
							/>
						)}
					</div>
				</CardContent>
			</Card>

			{/* Save Button */}
			<div className="flex justify-end">
				<Button onClick={handleSave} disabled={loadingButton}>
					{loadingButton && <Loader2 className="animate-spin mr-2" />}
					Salvar Configurações
				</Button>
			</div>
		</div >
	);
}
