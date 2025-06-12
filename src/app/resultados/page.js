'use client'

import api from "@/utils/api";
import { useEffect, useState } from "react";
import { LuTrash2 } from "react-icons/lu";

export default function Resultados() {

  const [resultados, setResultados] = useState([])
  const [reload, setReload] = useState(false)

  useEffect(() => {
    const loadResults = async () => {
      try {
        const res = await api.get("/resultados")
        console.log(res.data)
        setResultados(res.data)
      } catch (error) {
        alert("Erro ao carregar resultados")
        console.log(error)
      }
    }

    loadResults()
  }, [reload])

  const deleteResult = async (result_id) => {
    try {
      await api.delete(`/resultados/${result_id}`)
      alert("Resultado excluido com sucesso!")
      setReload(!reload)
    } catch (error) {
      alert("Erro ao excluir resultado")
      console.log(error)
    }
  }

  return (
    <main className="bg-blue-300 min-h-screen p-6 flex justify-center items-start">
      <section className="bg-white text-black p-6 rounded-lg shadow-md min-h-screen w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Resultados do Benchmark</h1>

        {resultados.length === 0 ? (
          <p className="text-center text-gray-600">Nenhum resultado encontrado.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
            {resultados.map((res) => {
              const estados = res.dados;
              const benchmarkingId = res.benchmarking_id

              return (
                <div
                  key={res._id}
                  className="bg-slate-100 border border-gray-300 rounded-xl p-5 shadow hover:shadow-lg transition-shadow duration-300"
                >
                  <h2 className="text-xl font-semibold mb-2">
                    Benchmark de {res.periodo}
                  </h2>
                  <p className="text-sm text-gray-600 mb-2">{benchmarkingId}</p>

                  <ul className="text-sm space-y-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {estados.map((item, idx) => (
                      <li key={idx} className="pt-2 mt-2">
                        <p><strong>{item.estado}</strong></p>
                        <p className="text-amber-500">Casos: {item.casos_confirmados}</p>
                        <p className="text-rose-500">Mortes: {item.mortes}</p>
                        <p className="text-emerald-500">População: {item.populacao.toLocaleString('pt-BR')}</p>
                      </li>
                    ))}
                  </ul>
                  <section className="mt-4 flex flex-row gap-4">
                    <LuTrash2
                      onClick={() => deleteResult(res._id)}
                      size={30}
                      className="rounded-md text-rose-500 shadow-md hover:scale-105 transform cursor-pointer" />
                  </section>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>

  )
}