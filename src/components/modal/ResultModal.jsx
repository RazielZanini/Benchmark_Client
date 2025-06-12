'use client'
import { useEffect, useState } from "react";
import api from "@/utils/api";

export default function ResultModal({ isOpen, onClose, benchmarking_id, nome }) {

  if (!isOpen) return null;

  const [loading, setLoading] = useState(true);
  const [resultados, setResultados] = useState(null);

  useEffect(() => {
    const fetchResultados = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/resultados/by_benchmark/${benchmarking_id}`);
        setResultados(res.data);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
        alert("Erro ao buscar dados!");
      } finally {
        setLoading(false);
      }
    };

    fetchResultados()
  }, [isOpen, benchmarking_id]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Resultado do Benchmark
        </h2>

        {loading ? (
          <p className="text-center">Carregando...</p>
        ) : resultados ? (
          <>
            {console.log(resultados)}
            <p>{nome.toUpperCase()}</p>
            <p><strong>Período:</strong> {resultados.periodo}</p>
            <div className="mt-4">
              <ul className="font-bold list-none">
                <li>Casos confirmados: {resultados.dados[0].estado}: ({resultados.dados?.[0]?.casos_confirmados}) X {resultados.dados[1].estado}: ({resultados.dados?.[1]?.casos_confirmados})</li>
                <li>Mortes: {resultados.dados[0].estado}: ({resultados.dados?.[0]?.mortes}) X {resultados.dados[1].estado}: ({resultados.dados?.[1]?.mortes})</li>
                <li>População: {resultados.dados[0].estado}: ({resultados.dados?.[0]?.populacao?.toLocaleString()}) X {resultados.dados[1].estado}: ({resultados.dados?.[1]?.populacao?.toLocaleString()})</li>
                <li></li>
              </ul>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500">Nenhum dado encontrado.</p>
        )}

        <div className="flex justify-center mt-6">
          <button
            onClick={onClose}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-2 rounded"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
