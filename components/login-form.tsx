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
import { login } from "@/app/(login)/actions"
import { useRouter } from "next/navigation";

export function LoginForm({
	className,
	...props
}: React.ComponentPropsWithoutRef<"div">) {
	const { toast } = useToast();
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [loginState, setLoginState] = useState<LoginRequest>({ email: "", password: "" });

	const handleValidateLoginForms = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (isSubmitting) return;
		setIsSubmitting(true);

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!loginState?.email || !emailRegex.test(loginState.email)) {
			toast({
				variant: "destructive",
				title: "Digite um e-mail válido!",
			});
			setIsSubmitting(false);
			return;
		}

		if (!loginState?.password || loginState.password.length < 6) {
			toast({
				variant: "destructive",
				title: "A senha deve ter pelo menos 6 caracteres!",
			});
			setIsSubmitting(false);
			return;
		}

		const response = await login({
			email: loginState.email,
			password: loginState.password,
		});

		if (!response.success) {
			toast({
				variant: "destructive",
				description: response.message,
			});
		} else {
			toast({
				variant: "success",
				description: "Bem-vindo(a)!",
			});
		}

		setIsSubmitting(false);
	};


	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader className="flex items-center">
					<CardTitle className="text-2xl">Entre na sua conta</CardTitle>
					<CardDescription>
						Digite seu e-mail abaixo para fazer login na sua conta
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleValidateLoginForms}>
						<div className="flex flex-col gap-6">
							<div className="grid gap-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									name="email"
									placeholder="seuemail@exemplo.com"
									value={loginState?.email}
									onChange={(e) =>
										setLoginState((prev) => ({
											...prev,
											email: e.target.value,
										}))
									}
								/>

							</div>
							<div className="grid gap-2">
								<div className="flex items-center">
									<Label htmlFor="password">Senha</Label>
									<a
										href="#"
										className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
									>
										Esqueceu sua senha?
									</a>
								</div>
								<Input
									id="password"
									type="password"
									name="password"
									value={loginState?.password}
									onChange={(e) =>
										setLoginState((prev) => ({
											...prev,
											password: e.target.value
										}))
									}
								/>
							</div>
							<Button type="submit" className="w-full" disabled={isSubmitting}>
								{isSubmitting && <Loader2 className="animate-spin" />}
								{isSubmitting ? "Carregando..." : "Login"}
							</Button>
							{/* <Button variant="outline" className="w-full">
								Faça login com Google
							</Button> */}
						</div>
						<div className="mt-4 text-center text-sm">
							Não possui uma conta?{" "}
							<a href="/#pricing" className="underline underline-offset-4">
								Veja os planos aqui
							</a>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	)
}
