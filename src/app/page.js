'use client'

import SelectState from "@/components/inputs/SelectState";

export default function Home() {
  return (
    <>
      <main className="bg-blue-300 min-h-screen p-6 flex justify-center items-start">
        <section className="bg-white text-black p-6 rounded-lg shadow-md w-full max-w-lg">
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-2">Criar Benchmark</h2>
            <p className="text-gray-600">Preencha os campos abaixo, especificando o período que gostaria de comparar</p>
          </div>

          <form className="space-y-4">

            <div>
              <label className="block mb-1 font-medium">Nome do Benchmark</label>
              <input
                placeholder="Ex: Comparativo COVID"
                className="w-full border border-blue-500 rounded px-4 py-2"
                type="text"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Data de Início</label>
              <input
                className="w-full border border-blue-500 rounded px-4 py-2"
                type="text"
                placeholder="DD/MM/AAAA"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => {
                  if (!e.target.value) e.target.type = "text";
                }}
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Data de Término</label>
              <input
                className="w-full border border-blue-500 rounded px-4 py-2"
                type="text"
                placeholder="DD/MM/AAAA"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => {
                  if (!e.target.value) e.target.type = "text";
                }}
              />
            </div>

            <SelectState label="Estado 1" />

            <SelectState label="Estado 2" />
          </form>
        </section>
      </main>

      <footer className="bg-blue-500 text-white text-center p-4">
        <p>&copy; 2025 - Todos os direitos reservados</p>
      </footer>
    </>
  );
}
