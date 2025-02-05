"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Navbar() {
	return (
		<nav className="fixed top-0 left-0 w-full bg-[#f9f8f6]/80 backdrop-blur-lg py-4 px-4 md:px-52 flex justify-between items-center z-50 border-b border-gray-200">
			<h1 className="text-2xl font-bold tracking-tight text-gray-900">
				Our Platform
			</h1>
			<div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
				{/* Botão de Login com estilo fixo para o modo claro */}
				<Link href="/login" passHref>
					<Button
						variant="outline"
						className="!bg-white !text-black !border-gray-300 hover:!bg-gray-100 hover:!text-black"
					>
						Login
					</Button>
				</Link>

				{/* Botão "Veja os planos" com estilo fixo para o modo claro */}
				<Link href="/#pricing" passHref>
					<Button
						variant="default"
						className="!bg-black !text-white hover:!bg-gray-800 flex items-center gap-2"
					>
						Veja os planos <ArrowRight className="w-5 h-5" />
					</Button>
				</Link>
			</div>
		</nav>
	);
}
