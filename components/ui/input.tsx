import { InputHTMLAttributes } from "react";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full p-2 rounded bg-zinc-700 text-white border border-zinc-600"
    />
  );
}