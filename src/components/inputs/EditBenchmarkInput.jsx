'use client'

import api from "@/utils/api"
import { useState } from "react"
import { LuCheck } from "react-icons/lu"

export default function EditBenchmarkInput({ id, onReload }) {

  const [edit, setEdit] = useState(false)
  const [newBench, setNewBench] = useState({
    nome: ""
  })

  const editBenchamrk = async (id) => {
    try {
      await api.put(`/benchmarkings/${id}`, newBench)
      alert("Nome de benchmark atualizado com sucesso")
      onReload()
    } catch (erro) {
      alert("Erro ao atualizar benchmark")
    }
  }

  return (
    <section>
      {
        !edit ? (
          <p className="rounded-md text-bold bg-blue-400 p-2"
            onClick={() => setEdit(true)}
          >
            Editar Nome
          </p>
        ) : (
          <section className="flex flex-row">
            <input value={newBench.nome}
              onChange={(e) => setNewBench({ ...newBench, nome: e.target.value })}
              className="rounded-md shadow-md p-2"
              type="text"
              placeholder="Digite o novo nome" />
            <button className="bg-blue-400 hover:bg-blue-500 text-white w-10 flex justify-center items-center rounded-md"
              onClick={() => editBenchamrk(id)}>
              <LuCheck />
            </button>
          </section>
        )
      }
    </section>
  )

}