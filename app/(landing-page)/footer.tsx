"use client";

import Link from "next/link";
import { Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
	return (
		<footer className="py-12 bg-white text-gray-900 px-4 md:px-52 border-t border-gray-200">
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center max-w-6xl mx-auto">
				<h1 className="text-xl font-bold mb-6 md:mb-0">Our Platform</h1>
				<div className="flex space-x-12">
					<div>
						<h2 className="font-semibold">Páginas</h2>
						<ul className="text-gray-600 mt-2 space-y-1">
							<li>
								<Link href="/privacy-policy" className="hover:underline">
									Políticas de Privacidade
								</Link>
							</li>
							{/* <li>
								<a href="#" className="hover:underline">
									Blog
								</a>
							</li> */}
						</ul>
					</div>
					{/* <div>
						<h2 className="font-semibold">Other Sites</h2>
						<ul className="text-gray-600 mt-2 space-y-1">
							<li>
								<a href="#" className="hover:underline">
									Intellisay
								</a>
							</li>
							<li>
								<a href="#" className="hover:underline">
									LogoGeneratorAI
								</a>
							</li>
							<li>
								<a href="#" className="hover:underline">
									craux.studio
								</a>
							</li>
						</ul>
					</div> */}
				</div>
			</div>
			<div className="mt-8 flex flex-col md:flex-row justify-between items-start md:items-center max-w-6xl mx-auto border-t pt-4">
				<p className="text-gray-500 text-sm mb-4 md:mb-0">
					© 2025 Our Platform. Todos os direitos reservados.
				</p>
				<div className="flex space-x-4 text-gray-500">
					<Instagram className="w-5 h-5 cursor-pointer" />
					<Twitter className="w-5 h-5 cursor-pointer" />
					<Youtube className="w-5 h-5 cursor-pointer" />
				</div>
			</div>
		</footer>
	);
}
