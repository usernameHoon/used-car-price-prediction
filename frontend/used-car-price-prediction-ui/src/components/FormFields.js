export function FormInput({ label, name, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 capitalize">{label}</label>
      <input
        className="mt-1 block w-full border rounded p-2"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export function FormSelect({ label, name, value, options = [], onChange, disabled = false }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 capitalize">{label}</label>
      <select
        className="mt-1 block w-full border rounded p-2"
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      >
        <option value="">{disabled ? "선택 불가" : "선택"}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}