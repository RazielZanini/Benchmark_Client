export default function Home() {
  return (
    <>
      <header className="flex flex-row justify-between bg-blue-500 w-full h-16 items-center">
        <h1 className="font-bold text-3xl text-white ml-4 rounded-xl bg-blue-400 p-2">
          Covid BenchMark Planisa
        </h1>
        <nav>
          <ul className="flex flex-row gap-2 rounded-xl p-2 h-12 items-center text-white hover:cursor-pointer font-bold">
            <li className="border-r p-2 border-slate-400 hover:text-slate-500">
              BenchMark
            </li>
            <li className="hover:text-slate-500 p-2">Resultados</li>
          </ul>
        </nav>
      </header>

      <main className="bg-amber-200 min-h-screen p-4">
        <section className="bg-black text-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-2">Seção de Teste</h2>
          <p>Este é um conteúdo de teste dentro de uma seção.</p>
        </section>
      </main>

      <footer className="bg-blue-500 text-white text-center p-4">
        <p>&copy; 2025 - Todos os direitos reservados</p>
      </footer>
    </>
  );
}
