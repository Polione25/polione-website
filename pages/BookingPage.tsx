import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Logo from "@/assets/logo.png";

const services = [
  { name: "Außenreinigung (Handwäsche)", price: "35.–" },
  { name: "Außen Premium (mit Versiegelung)", price: "90.–" },
  { name: "Innenreinigung (inkl. Polsterpflege)", price: "ab 70.–" },
  { name: "Komplettaufbereitung (innen + außen)", price: "ab 180.–" },
  { name: "Lackpolitur (Kratzer entfernen)", price: "ab 140.–" },
  { name: "Ozonbehandlung (Geruchsentfernung)", price: "ab 55.–" },
  { name: "Tierhaarentfernung (Zusatzleistung)", price: "ab 20.–" }
];

export default function BookingPage() {
  const [selectedService, setSelectedService] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsTransitioning(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async () => {
    if (!selectedService || !date || !name || !email || !phone) {
      alert("Bitte füllen Sie alle Felder aus.");
      return;
    }

    setIsTransitioning(true);
    try {
      const response = await fetch("https://polione-backend.onrender.com/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service: selectedService,
          date,
          name,
          email,
          phone,
        }),
      });

      if (!response.ok) throw new Error("Fehler bei der Buchung");
      setTimeout(() => {
        setIsTransitioning(false);
        alert("Termin erfolgreich angefragt!");
      }, 1200);
    } catch (err) {
      setIsTransitioning(false);
      alert("Etwas ist schiefgelaufen. Bitte versuche es später erneut.");
    }
  };

  return (
    <div className="relative bg-zinc-900 min-h-screen text-white">
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className="fixed top-1/2 left-0 -translate-y-1/2 z-50"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <Image src={Logo} alt="Logo" width={200} height={200} />
          </motion.div>
        )}
      </AnimatePresence>

      {!isTransitioning && (
        <div className="max-w-2xl mx-auto p-4 space-y-6">
          <h1 className="text-2xl font-bold text-center">Termin buchen</h1>
          <Card className="bg-zinc-800">
            <CardContent className="space-y-4 pt-4">
              <Select onValueChange={setSelectedService}>
                <SelectTrigger>
                  <SelectValue placeholder="Dienstleistung wählen" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service, idx) => (
                    <SelectItem key={idx} value={service.name}>
                      {service.name} – {service.price} CHF
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Calendar mode="single" selected={date} onSelect={setDate} />

              <Input
                placeholder="Ihr Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                placeholder="E-Mail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="Telefonnummer"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              <Button onClick={handleSubmit}>Termin anfragen</Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}