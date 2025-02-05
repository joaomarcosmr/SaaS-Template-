"use client"

import { useToast } from "@/hooks/use-toast"
import {
	Toast,
	ToastClose,
	ToastDescription,
	ToastProvider,
	ToastTitle,
	ToastViewport,
} from "@/components/ui/toast"
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react"

export function Toaster() {
	const { toasts } = useToast()

	// Função para retornar o ícone de acordo com o variant
	const getIcon = (variant: "success" | "default" | "destructive" | null | undefined) => {
		switch (variant) {
			case "success":
				return <CheckCircle className="text-green-500" size={18} />
			case "destructive":
				return <XCircle className="text-white" size={18} />
			// case "warning":
			// 	return <AlertTriangle className="text-yellow-500" size={18} />
			default:
				return null
		}
	}

	return (
		<ToastProvider>
			{toasts.map(({ id, title, description, action, ...props }) => (
				<Toast key={id} {...props}>
					<div className="flex items-start gap-2"> {/* Melhor alinhamento */}
						{getIcon(props.variant)} {/* Ícone dinâmico */}
						<div className="grid gap-1">
							{title && <ToastTitle>{title}</ToastTitle>}
							{description && <ToastDescription>{description}</ToastDescription>}
						</div>
					</div>
					{action}
					<ToastClose />
				</Toast>
			))}
			<ToastViewport className="fixed top-4 right-4 flex flex-col gap-2 z-[99999]" />
		</ToastProvider>
	)
}
