export default function SelectState({ label = "Estado", value, onChange }) {

  const estados = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"]

  return (
    <div>
      <label className="block font-medium">{label}</label>
      <select
        value={value}
        onChange={onChange}
        className="w-full border border-blue-500 rounded px-4 py-2 mb-2">
        <option value="">Selecione um estado</option>
        {estados.map((estado) => (
          <option key={estado} value={estado}>{estado}</option>
        ))}
      </select>
    </div>
  )
}