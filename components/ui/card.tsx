import { ReactNode } from "react";

export function Card({ children }: { children: ReactNode }) {
  return <div className="rounded-xl bg-zinc-800 p-4 shadow">{children}</div>;
}

export function CardContent({ children }: { children: ReactNode }) {
  return <div className="p-2">{children}</div>;
}