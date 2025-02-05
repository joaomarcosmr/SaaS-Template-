import Link from 'next/link';

export default function ErrorPage() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white p-8 rounded-lg shadow-md text-center">
				<h1 className="text-2xl font-bold text-red-600 mb-4">Algo deu errado!</h1>
				<p className="text-gray-700 mb-6">Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.</p>
				<Link href="/dashboard">
					<a className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
						Voltar
					</a>
				</Link>
			</div>
		</div>
	);
}
