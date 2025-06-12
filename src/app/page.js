'use client'

import SelectState from "@/components/inputs/SelectState";
import ResultModal from "@/components/modal/ResultModal";
import api from "@/utils/api";
import { useState } from "react";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [benchmarkId, setBenchmarkId] = useState(null);
  const [benchmarkNome, setBenchmarkNome] = useState("");
  const [benchmark, setBenchmark] = useState({
    nome: "",
    estado_1: "",
    estado_2: "",
    data_inicio: "",
    data_fim: ""
  });

  const createBenchmark = async () => {
    try {
      const result = await api.post("/benchmarkings", benchmark);
      const benchmarking = result.data;

      if (benchmarking.message) {
        alert(benchmarking.message);
        setBenchmarkId(benchmarking.benchmarking._id);
        setBenchmarkNome(benchmarking.benchmarking.nome);
        setIsModalOpen(true);
        return;
      }

      setBenchmarkId(benchmarking._id);
      setBenchmarkNome(benchmarking.nome);
      setIsModalOpen(true);
    } catch (error) {
      alert("Erro ao criar benchmark!");
    }
  };

  const checkInputs = () => {
    const campos = Object.values(benchmark);
    const vazio = campos.some(valor => valor === "");

    if (vazio) {
      alert("Preencha todos os campos");
      return;
    }

    createBenchmark();
  };

  return (
    <>
      <main className="bg-blue-300 min-h-screen p-6 flex justify-center items-center">
        <section className="bg-white text-black p-6 rounded-lg shadow-md w-full max-w-2xl">
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-bold mb-2">Criar Benchmark</h2>
            <p className="text-gray-600">
              Preencha os campos abaixo, especificando o período que deseja comparar e os estados.
            </p>
          </div>

          <form className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Nome do Benchmark</label>
              <input
                placeholder="Ex: Comparativo COVID"
                className="w-full border border-blue-500 rounded px-4 py-2"
                type="text"
                value={benchmark.nome}
                onChange={(e) => setBenchmark({ ...benchmark, nome: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  onChange={(e) => setBenchmark({ ...benchmark, data_inicio: e.target.value })}
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
                  onChange={(e) => setBenchmark({ ...benchmark, data_fim: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SelectState
                label="Estado 1"
                value={benchmark.estado_1}
                onChange={(e) => setBenchmark({ ...benchmark, estado_1: e.target.value })}
              />
              <SelectState
                label="Estado 2"
                value={benchmark.estado_2}
                onChange={(e) => setBenchmark({ ...benchmark, estado_2: e.target.value })}
              />
            </div>

            <div className="flex justify-center mt-6">
              <button
                onClick={checkInputs}
                type="button"
                className="font-bold text-white rounded-md bg-blue-500 hover:bg-blue-600 px-6 py-2 min-w-44 cursor-pointer"
              >
                Criar
              </button>
            </div>
          </form>
        </section>
      </main>

      <ResultModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        benchmarking_id={benchmarkId}
        nome={benchmarkNome}
      />
    </>
  );
}
