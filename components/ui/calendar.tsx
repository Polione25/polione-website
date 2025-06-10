import { useState } from "react";

export function Calendar({ selected, onSelect }: { selected?: Date; onSelect: (date: Date) => void }) {
  const [date, setDate] = useState<Date | undefined>(selected);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);
    setDate(newDate);
    onSelect(newDate);
  };

  return (
    <input
      type="date"
      value={date?.toISOString().split("T")[0] || ""}
      onChange={handleChange}
      className="w-full p-2 rounded bg-zinc-700 text-white border border-zinc-600"
    />
  );
}