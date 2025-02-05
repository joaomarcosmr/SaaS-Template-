"use client";

import { useToast } from "@/hooks/use-toast";
import { useParams } from "next/navigation";
import { ForgotPasswordForm } from "@/components/forgot-password-form";

export default function ForgotPasswordChangePassword() {

	const { toast } = useToast();
	const params = useParams();
	const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

	const passwordChangeRequest = (password: string) => {
		console.log("Password Change Request:", { id, password });
	};

	return (
		<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-sm">
				<ForgotPasswordForm id={id} onPasswordRequestSubmit={passwordChangeRequest} />
			</div>
		</div>
	);
}
