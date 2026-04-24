interface FieldProps {
  id: string;
  label: string;
  unit: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  icon: React.ReactNode;
}

export default function Field({
  id,
  label,
  unit,
  placeholder,
  value,
  onChange,
  icon,
}: FieldProps) {
  return (
    <div className="flex flex-col gap-2.5">
      <label
        htmlFor={id}
        className="text-sm font-medium text-[hsl(var(--muted-foreground))] pl-1"
      >
        {label}
      </label>
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[hsl(var(--primary))] transition-smooth group-focus-within:scale-110">
          {icon}
        </div>
        <input
          id={id}
          type="text"
          autoComplete="off"
          inputMode="decimal"
          pattern="[0-9]*[.,]?[0-9]*"
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            const v = e.target.value.replace(",", ".");
            if (v === "" || /^\d*\.?\d*$/.test(v)) onChange(v);
          }}
          className="w-full h-16 pl-14 pr-16 text-xl font-semibold bg-[hsl(var(--card))] rounded-2xl border-2 border-[hsl(var(--border))] outline-none transition-smooth focus:border-[hsl(var(--primary))] focus:shadow-soft placeholder:text-[hsl(var(--muted-foreground))]/50 placeholder:font-normal"
        />
        <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sm font-medium text-[hsl(var(--muted-foreground))]">
          {unit}
        </span>
      </div>
    </div>
  );
}
