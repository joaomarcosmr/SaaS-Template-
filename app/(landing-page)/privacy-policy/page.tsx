import Footer from "../footer";
import Navbar from "../navbar";

export default function PoliticaDePrivacidade() {
	return (
		<div className="bg-[#f9f8f6] text-gray-900 font-sans relative">
			<Navbar />

			<main className="max-w-3xl mx-auto p-4 pt-28">
				<h1 className="text-3xl font-bold mb-4">Política de Privacidade</h1>

				<p className="mb-4">
					Olá! Nesta página explicamos como coletamos, usamos e protegemos
					seus dados. Se tiver qualquer dúvida, fique à vontade para entrar
					em contato conosco.
				</p>

				<p className="mb-2">
					<strong>Coleta de dados:</strong> Coletamos informações como nome,
					e-mail e outras que podem ser necessárias para oferecer uma
					experiência personalizada e segura em nossa plataforma.
				</p>
				<p className="mb-2">
					<strong>Uso das informações:</strong> Utilizamos seus dados para
					melhorar nossos serviços, enviar atualizações importantes e
					fornecer suporte ao cliente.
				</p>
				<p className="mb-2">
					<strong>Compartilhamento de dados:</strong> Não vendemos ou
					compartilhamos seus dados com terceiros, exceto quando for
					exigido por lei ou necessário para cumprir obrigações contratuais
					(por exemplo, processar pagamentos).
				</p>
				<p className="mb-2">
					<strong>Segurança:</strong> Adotamos medidas de segurança para
					proteger suas informações contra acesso não autorizado, alteração
					ou divulgação indevida.
				</p>

				<hr className="my-8" />

				<h2 className="text-2xl font-semibold mb-4">Termos de Uso</h2>
				<p className="mb-2">
					Ao utilizar nossa plataforma, você se compromete a agir de forma
					legal e ética, evitando qualquer ação que possa violar direitos de
					terceiros ou prejudicar o funcionamento do nosso site.
				</p>
				<p className="mb-2">
					Em caso de uso inadequado, poderemos suspender ou encerrar seu
					acesso, e você será responsabilizado(a) por eventuais violações à
					legislação vigente.
				</p>
				<p className="mb-2">
					Podemos atualizar estes termos a qualquer momento para refletir
					alterações em nossas práticas ou requisitos legais. Se mudanças
					significativas ocorrerem, notificaremos você por meio de e-mail ou
					aviso em nossa plataforma.
				</p>

				<hr className="my-8" />

				<p className="text-sm text-gray-500">
					Última atualização: 30 de janeiro de 2025
				</p>
			</main>

			<Footer />
		</div>
	);
}
