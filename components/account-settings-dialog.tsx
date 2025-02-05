"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateEmail, updatePassword } from "@/app/(login)/actions";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { useUser } from "@/context/UserContext";
import { defaultPasswordData, defaultUserData, PasswordData, UserData } from "@/types/UserTypes";
import { ResponseError } from "@/types/SettingsTypes";

export default function AccountSettings() {
	const { user, loading } = useUser();
	const [loadingChangePassword, setLoadingChangePassword] = useState<boolean>(false)
	const [loadingChangeUser, setLoadingChangeUser] = useState<boolean>(false)
	const [actualEmail, setActualEmail] = useState<string>('')
	const [userInfoData, setUserInfoData] = useState<UserData>(user ?? defaultUserData);
	const [passwordData, setPasswordData] = useState<PasswordData>(defaultPasswordData);

	const handleUserUpdate = async () => {
		setLoadingChangeUser(true);

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!userInfoData.email || !emailRegex.test(userInfoData.email)) {
			toast({
				variant: "destructive",
				title: "Digite um e-mail válido!",
			});
			setLoadingChangeUser(false);
			return;
		}

		if (actualEmail === userInfoData.email) {
			toast({
				variant: "destructive",
				title: "O e-mail é o mesmo cadastrado em seu usuário",
			});
			setLoadingChangeUser(false);
			return;
		}

		const response = await updateEmail(actualEmail, userInfoData.email)

		if ((response as ResponseError).success === false) {
			toast({
				variant: "destructive",
				title: response.message,
			});
			setLoadingChangeUser(false);
			return;
		}

		toast({
			variant: "success",
			title: response.message,
		});

		setLoadingChangeUser(false);
	};

	const handlePasswordChange = async () => {
		setLoadingChangePassword(true);

		if (!passwordData.confirmPassword || !passwordData.currentPassword || !passwordData.newPassword) {
			toast({
				variant: "destructive",
				title: "É preciso digitar todos os campos para atualizar sua senha!",
			});
			setLoadingChangePassword(false);
			return;
		}

		if (passwordData.newPassword !== passwordData.confirmPassword) {
			toast({
				variant: "destructive",
				title: "As senhas não coincidem!",
			});
			setLoadingChangePassword(false);
			return;
		}

		const response = await updatePassword(passwordData.currentPassword, passwordData.newPassword)

		if ((response as ResponseError).success === false) {
			toast({
				variant: "destructive",
				title: response.message,
			});
			setLoadingChangePassword(false);
			return;
		} else {
			toast({
				variant: "success",
				title: response.message,
			});
			setPasswordData({
				currentPassword: "",
				newPassword: "",
				confirmPassword: "",
			});
		}

		setLoadingChangePassword(false);
	};

	useEffect(() => {
		if (user) {
			setActualEmail(user.email)
		}
	}, [user])

	return (
		<div className="max-w-4xl mx-auto space-y-6 p-2 bg-white dark:bg-gray-900">
			<Card>
				<CardHeader>
					<CardTitle>Atualizar Dados</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="name">Nome</Label>
						{loading ? (
							<Skeleton className="h-8 w-full rounded-md" />
						) : (
							<Input
								id="name"
								value={userInfoData.name}
								disabled
								placeholder="Digite seu nome"
							/>
						)}
					</div>

					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						{loading ? (
							<Skeleton className="h-8 w-full rounded-md" />
						) : (
							<Input
								id="email"
								value={userInfoData.email}
								onChange={(e) =>
									setUserInfoData((prevInfo) => ({
										...prevInfo,
										email: e.target.value,
									}))
								}
								placeholder="Digite seu email"
								type="email"
							/>
						)}
					</div>
				</CardContent>
				<CardFooter>
					<Button onClick={handleUserUpdate} disabled={loadingChangeUser}>
						{loadingChangeUser && <Loader2 className="animate-spin mr-2" />}
						Salvar Alterações
					</Button>
				</CardFooter>
			</Card>

			{/* Change Password */}
			<Card>
				<CardHeader>
					<CardTitle>Trocar Senha</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="currentPassword">Senha Atual</Label>
						<Input
							id="currentPassword"
							value={passwordData.currentPassword}
							onChange={(e) =>
								setPasswordData({ ...passwordData, currentPassword: e.target.value })
							}
							placeholder="Digite sua senha atual"
							type="password"
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="newPassword">Nova Senha</Label>
						<Input
							id="newPassword"
							value={passwordData.newPassword}
							onChange={(e) =>
								setPasswordData({ ...passwordData, newPassword: e.target.value })
							}
							placeholder="Digite sua nova senha"
							type="password"
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
						<Input
							id="confirmPassword"
							value={passwordData.confirmPassword}
							onChange={(e) =>
								setPasswordData({ ...passwordData, confirmPassword: e.target.value })
							}
							placeholder="Confirme sua nova senha"
							type="password"
						/>
					</div>
				</CardContent>
				<CardFooter>
					<Button onClick={handlePasswordChange} disabled={loadingChangePassword}>
						{loadingChangePassword && <Loader2 className="animate-spin" />}
						Atualizar Senha
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
