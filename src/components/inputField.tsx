

type InputFieldProps = {
  label: string;
  type?: string;
  id?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  inputMode?: 'search' | 'numeric' | 'text' | 'email' | 'tel' | 'url' | 'none' | 'decimal';
  pattern?: string;
};

function InputField({ label, type = "text", id, value, onChange, min, inputMode, pattern }: InputFieldProps) {
  return (
    <div className="mb-3">
      <label className="form-label" htmlFor={id}>{label}</label>
      <input
        type={type}
        className="form-control"
        id={id}
        value={value}
        onChange={onChange}
        min={min}
        inputMode={inputMode}
        pattern={pattern}
      />
    </div>
  );
}

export default InputField;