'use client'

import EditBenchmarkInput from "@/components/inputs/EditBenchmarkInput";
import api from "@/utils/api";
import { useEffect, useState } from "react";
import { LuTrash2 } from "react-icons/lu";

export default function Benchmarks() {

  const [benchmarks, setBenchmarks] = useState([])
  const [reload, setReload] = useState(false)

  useEffect(() => {
    const loadBenchmarks = async () => {
      try {
        const results = await api.get("/benchmarkings")
        setBenchmarks(results.data)
      } catch (error) {
        alert("Erro ao carregar benchmarks")
      }
    }

    loadBenchmarks()
  }, [reload])

  const deleteBenchmark = async (id) => {
    try {
      await api.delete(`/benchmarkings/${id}`)
      alert("Benchmark excluido com sucesso!")
      setReload(!reload)
    } catch (error) {
      alert("Erro ao excluir benchmark")
      console.log(error)
    }
  }

  return (
    <main className="bg-blue-300 min-h-screen p-6 flex justify-center items-start">
      <section className="bg-white text-black p-6 rounded-lg shadow-md min-h-screen w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Benchmarks Realizados</h1>

        {benchmarks.length === 0 ? (
          <p className="text-center text-gray-600">Nenhum resultado encontrado.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
            {benchmarks.map((bench) => {
              return (
                <div
                  key={bench._id}
                  className="bg-slate-100 border border-gray-300 rounded-xl p-5 shadow hover:shadow-lg transition-shadow duration-300"
                >
                  <h2 className="text-xl font-semibold mb-2">
                    {bench.nome}
                  </h2>

                  <ul className="text-sm space-y-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <li className="pt-2 mt-2 font-bold">
                      <p>Estado 1: {bench.estado_1}</p>
                      <p>Estado 2 {bench.estado_2}</p>
                      <p>De: {bench.data_inicio}</p>
                      <p>Até: {bench.data_fim}</p>
                    </li>
                  </ul>
                  <section className="mt-4 flex flex-row justify-between">
                    <EditBenchmarkInput id={bench._id} onReload={() => setReload(!reload)} />

                    <LuTrash2
                      onClick={() => deleteBenchmark(bench._id)}
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