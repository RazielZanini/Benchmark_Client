export default function Header() {

  return (
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
  );
}