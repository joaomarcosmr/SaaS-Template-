"use client";

import { useToast } from "@/hooks/use-toast";
import { ForgotPasswordForm } from "@/components/forgot-password-form";

export default function ForgotPassword() {

	const { toast } = useToast()

	const emailRequest = (email: string) => {

	}

	return (
		<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-sm">
				<ForgotPasswordForm onEmailRequestSubmit={emailRequest} />
			</div>
		</div>
	)
}
