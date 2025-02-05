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
import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import { RegisterRequest } from "@/app/(login)/register/RegisterInterface"
import { signup } from "@/app/(login)/actions"
import { useRouter, useSearchParams } from "next/navigation";
import { plans } from "@/types/PricingTypes"
import { UserData } from "@/types/UserTypes"
import Link from "next/link"

export function RegisterForm({
	className,
	...props
}: React.ComponentPropsWithoutRef<"div">) {
	const router = useRouter();
	const { toast } = useToast()
	const searchParams = useSearchParams();  // Hook to get URL params

	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [registerState, setRegisterState] = useState<RegisterRequest>({
		name: '',
		email: '',
		confirmEmail: '',
		password: '',
		confirmPassword: ''
	})
	const [priceId, setPriceId] = useState<string | null>(null);  // State for priceId

	useEffect(() => {
		const priceIdParam = searchParams.get('priceId');
		setPriceId(priceIdParam);
	}, [searchParams]);

	const handleValidateRegisterForms = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (isSubmitting) return;
		setIsSubmitting(true);

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (registerState?.email !== registerState?.confirmEmail) {
			toast({
				variant: "destructive",
				title: "Os e-mais não coincidem!",
			});
			setIsSubmitting(false);
			return;
		}

		if (!registerState?.email || !emailRegex.test(registerState.email)) {
			toast({
				variant: "destructive",
				title: "Digite um e-mail válido!",
			});
			setIsSubmitting(false);
			return;
		}

		if (!registerState?.password || registerState.password.length < 6) {
			toast({
				variant: "destructive",
				title: "A senha deve ter pelo menos 6 caracteres!",
			});
			setIsSubmitting(false);
			return;
		}

		if (registerState?.password !== registerState?.confirmPassword) {
			toast({
				variant: "destructive",
				title: "As senhas devem coincidir!",
			});
			setIsSubmitting(false);
			return;
		}

		const response = await signup(registerState);

		if (!response.success) {
			toast({
				variant: "destructive",
				description: response.message,
			});
		} else {
			toast({
				variant: "success",
				description: response.message,
			});
		}

		if (priceId) {
			const plan = plans.find(p => p.priceId === priceId);

			if (plan?.link) {
				router.push(plan.link + '?prefilled_email=' + registerState.email);
			} else {
				router.push('/login');
			}
		} else {
			router.push('/login');
		}

		setIsSubmitting(false);
	};


	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader className="flex items-center">
					<CardTitle className="text-2xl">Cadastre sua conta</CardTitle>
					<CardDescription>
						Preencha seus dados abaixo
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleValidateRegisterForms}>
						<div className="flex flex-col gap-6">
							<div className="grid gap-2">
								<Label htmlFor="emainamel">Seu nome completo</Label>
								<Input
									id="name"
									type="name"
									name="name"
									placeholder="João Marcos da Silva"
									value={registerState?.name}
									onChange={(e) =>
										setRegisterState((prev) => ({
											...prev,
											name: e.target.value,
										}))
									}
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="email">E-mail</Label>
								<Input
									id="email"
									type="email"
									name="email"
									placeholder="seuemail@exemplo.com"
									value={registerState?.email}
									onChange={(e) =>
										setRegisterState((prev) => ({
											...prev,
											email: e.target.value,
										}))
									}
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="confirmEmail">Confirmar e-mail</Label>
								<Input
									id="confirmEmail"
									type="email"
									name="confirmEmail"
									placeholder="seuemail@exemplo.com"
									value={registerState?.confirmEmail}
									onChange={(e) =>
										setRegisterState((prev) => ({
											...prev,
											confirmEmail: e.target.value,
										}))
									}
								/>
							</div>
							<div className="grid gap-2">
								<div className="flex items-center">
									<Label htmlFor="password">Senha</Label>
								</div>
								<Input
									id="password"
									type="password"
									name="password"
									value={registerState?.password}
									onChange={(e) =>
										setRegisterState((prev) => ({
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
									value={registerState?.confirmPassword}
									onChange={(e) =>
										setRegisterState((prev) => ({
											...prev,
											confirmPassword: e.target.value
										}))
									}
								/>
							</div>
							<Button type="submit" className="w-full" disabled={isSubmitting}>
								{isSubmitting && <Loader2 className="animate-spin" />}
								{isSubmitting ? "Carregando..." : "Registre-se"}
							</Button>
						</div>
						<div className="mt-4 text-center text-sm">
							Já possui uma conta?{" "}
							<Link href={`${priceId ? `/login?priceId=${priceId}` : '/login'}`} className="underline underline-offset-4">
								Entre aqui
							</Link>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	)
}
