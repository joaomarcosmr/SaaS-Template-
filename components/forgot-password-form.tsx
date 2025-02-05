"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { LoginRequest } from "@/app/(login)/login/LoginInterface"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

type forgotPasswordFormProps = {
	id?: string,
	onEmailRequestSubmit?: (email: string) => void
	onPasswordRequestSubmit?: (password: string) => void
} & React.ComponentPropsWithoutRef<"div">

export function ForgotPasswordForm({
	id,
	onEmailRequestSubmit,
	onPasswordRequestSubmit,
	className,
	...props
}: forgotPasswordFormProps) {
	const { toast } = useToast()
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [email, setEmail] = useState<string>('')
	const [passwords, setPasswords] = useState<{ password?: string, confirmPassword?: string }>({})

	const handleEmailSubmiting = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (isSubmitting) return;
		setIsSubmitting(true);

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!email || !emailRegex.test(email)) {
			toast({
				variant: "destructive",
				title: "O e-mail digitado é inválido!",
			});
			setIsSubmitting(false);
			return;
		}

		if (onEmailRequestSubmit) {
			await onEmailRequestSubmit(email);
		}

		setIsSubmitting(false);
	};

	const handlePasswordSubmiting = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (isSubmitting) return;
		setIsSubmitting(true);

		if (!passwords.password || !passwords.confirmPassword || passwords.password === passwords.confirmPassword) {
			toast({
				variant: "destructive",
				title: "As senhas devem ser iguais!",
			});
			setIsSubmitting(false);
			return;
		}

		if (onPasswordRequestSubmit) {
			await onPasswordRequestSubmit(passwords.password);
		}

		setIsSubmitting(false);
	};

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader className="flex items-center">
					<CardTitle className="text-2xl">Recupere sua senha</CardTitle>
					<CardDescription className="text-center">
						{!id ? "Digite o seu e-mail e caso seja válido você receberá na caixa de entrada para trocar sua senha"
							: "Digite sua nova senha abaixo"
						}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={!id ? handleEmailSubmiting : handlePasswordSubmiting}>
						<div className="flex flex-col gap-6">
							{!id && onEmailRequestSubmit ? (
								<div className="grid gap-2">
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										type="email"
										name="email"
										placeholder="seuemail@exemplo.com"
										value={email}
										onChange={(e) =>
											setEmail(e.target.value)
										}
									/>
								</div>
							) : (
								<>
									<div className="grid gap-2">
										<div className="flex items-center">
											<Label htmlFor="password">Senha</Label>
										</div>
										<Input
											id="password"
											type="password"
											name="password"
											value={passwords?.password}
											onChange={(e) =>
												setPasswords((prev) => ({
													...prev,
													password: e.target.value
												}))
											}
										/>
									</div>
									<div className="grid gap-2">
										<div className="flex items-center">
											<Label htmlFor="confirmPassword">Confirme sua senha</Label>
										</div>
										<Input
											id="confirmPassword"
											type="password"
											name="confirmPassword"
											value={passwords?.confirmPassword}
											onChange={(e) =>
												setPasswords((prev) => ({
													...prev,
													confirmPassword: e.target.value
												}))
											}
										/>
									</div>
								</>
							)}
							<Button type="submit" className="w-full" disabled={isSubmitting}>
								{isSubmitting && <Loader2 className="animate-spin" />}
								{isSubmitting ? "Carregando..." : !id ? "Enviar e-mail de recuperação" : "Alterar senha"}
							</Button>
						</div>
						{!id && (
							<div className="mt-4 text-center text-sm">
								Lembrou sua senha?{" "}
								<a href="/login" className="underline underline-offset-4">
									Entre aqui
								</a>
							</div>
						)}
					</form>
				</CardContent>
			</Card>
		</div>
	)
}
