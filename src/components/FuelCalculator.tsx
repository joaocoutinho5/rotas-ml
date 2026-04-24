import { useState, useMemo } from "react";
import Field from "./Field";
import MessageBlock from "./MessageBlock";
import { Fuel, Wallet, Route, DollarSign, Van } from "lucide-react";

export default function FuelCalculator() {
  const formatBRL = (n: number) =>
    n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const formatNum = (n: number, digits = 2) =>
    n.toLocaleString("pt-BR", {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    });

  const formatBRLPlain = (n: number) =>
    n.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const getDayMonth = () => {
    const d = new Date();
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    return `${day}/${month}`;
  };

  const [routeValue, setRouteValue] = useState("");
  const [distance, setDistance] = useState("");
  const [consumption, setConsumption] = useState("");
  const [price, setPrice] = useState("");
  const [copiedFull, setCopiedFull] = useState(false);
  const [copiedSimple, setCopiedSimple] = useState(false);

  const { liters, total, profit, hasResult } = useMemo(() => {
    const r = parseFloat(routeValue);
    const d = parseFloat(distance);
    const c = parseFloat(consumption);
    const p = parseFloat(price);

    if (!d || !c || !p || !r || c <= 0) {
      return { liters: 0, total: 0, profit: 0, hasResult: false };
    }

    const l = d / c;
    const t = l * p;

    return { liters: l, total: t, profit: r - t, hasResult: true };
  }, [routeValue, distance, consumption, price]);

  const dayMonth = getDayMonth();
  const r = parseFloat(routeValue) || 0;
  const d = parseFloat(distance) || 0;

  const fullMessage = hasResult
    ? `${dayMonth} - Valor da rota: R$${formatBRLPlain(r)} / Distancia: ${formatNum(
        d,
        1,
      )}km / Custo: R$${formatBRLPlain(total)} / Lucro: R$${formatBRLPlain(profit)}`
    : "Preencha os campos para gerar a mensagem";

  const simpleMessage = hasResult
    ? `${dayMonth}-${formatBRLPlain(r)}-${formatNum(
        d,
        1,
      )}km-${formatBRLPlain(total)}`
    : "Preencha os campos para gerar a mensagem";

  const copy = async (text: string, setter: (v: boolean) => void) => {
    if (!hasResult) return;

    try {
      await navigator.clipboard.writeText(text);
      setter(true);
      setTimeout(() => setter(false), 2000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="min-h-screen px-5 py-8 flex flex-col items-center">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <header className="text-center pt-2 pb-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-result shadow-glow mb-4 animate-pop-in">
            <Fuel
              className="w-8 h-8 text-[hsl(var(--primary-foreground))]"
              strokeWidth={2.5}
            />
          </div>

          <h1 className="text-3xl font-bold tracking-tight">
            Calculadora de Combustível
          </h1>

          <p className="text-[hsl(var(--muted-foreground))] mt-2 text-sm">
            Calcule o custo da sua rota em segundos
          </p>
        </header>

        {/* Inputs */}
        <section className="space-y-4 bg-[hsl(var(--card))]/60 backdrop-blur rounded-3xl p-5 shadow-soft border border-[hsl(var(--border))]/50">
          <Field
            id="routeValue"
            label="Valor da rota"
            unit="R$"
            placeholder="Ex: 80,00"
            value={routeValue}
            onChange={setRouteValue}
            icon={<Wallet className="w-5 h-5" strokeWidth={2.5} />}
          />

          <Field
            id="distance"
            label="Distância percorrida"
            unit="km"
            placeholder="Ex: 120"
            value={distance}
            onChange={setDistance}
            icon={<Route className="w-5 h-5" strokeWidth={2.5} />}
          />

          <Field
            id="consumption"
            label="Consumo do veículo"
            unit="km/L"
            placeholder="Ex: 12"
            value={consumption}
            onChange={setConsumption}
            icon={<Fuel className="w-5 h-5" strokeWidth={2.5} />}
          />

          <Field
            id="price"
            label="Preço do combustível"
            unit="R$/L"
            placeholder="Ex: 5,89"
            value={price}
            onChange={setPrice}
            icon={<DollarSign className="w-5 h-5" strokeWidth={2.5} />}
          />
        </section>

        {/* Result */}
        <section
          className={`rounded-3xl p-6 transition-smooth space-y-5 ${
            hasResult
              ? "gradient-result text-[hsl(var(--primary-foreground))] shadow-glow"
              : "bg-[hsl(var(--card))] border border-[hsl(var(--border))] shadow-soft"
          }`}
        >
          <div className="grid grid-cols-3 gap-3">
            <div>
              <p
                className={`text-xs uppercase tracking-wider font-medium ${
                  hasResult
                    ? "text-[hsl(var(--primary-foreground))]/80"
                    : "text-[hsl(var(--muted-foreground))]"
                }`}
              >
                Litros
              </p>
              <p className="text-xl font-bold mt-1 animate-fade-up">
                {hasResult ? `${formatNum(liters)} L` : "—"}
              </p>
            </div>

            <div>
              <p
                className={`text-xs uppercase tracking-wider font-medium ${
                  hasResult
                    ? "text-[hsl(var(--primary-foreground))]/80"
                    : "text-[hsl(var(--muted-foreground))]"
                }`}
              >
                Custo
              </p>
              <p className="text-xl font-bold mt-1 animate-fade-up">
                {hasResult ? formatBRL(total) : "—"}
              </p>
            </div>

            <div>
              <p
                className={`text-xs uppercase tracking-wider font-medium ${
                  hasResult
                    ? "text-[hsl(var(--primary-foreground))]/80"
                    : "text-[hsl(var(--muted-foreground))]"
                }`}
              >
                Lucro
              </p>
              <p className="text-xl font-bold mt-1 animate-fade-up">
                {hasResult ? formatBRL(profit) : "—"}
              </p>
            </div>
          </div>

          <MessageBlock
            label="Informação completa"
            message={fullMessage}
            onCopy={() => copy(fullMessage, setCopiedFull)}
            copied={copiedFull}
            hasResult={hasResult}
            variant={hasResult ? "onprimary" : "muted"}
          />

          <MessageBlock
            label="Informação simplificada"
            message={simpleMessage}
            onCopy={() => copy(simpleMessage, setCopiedSimple)}
            copied={copiedSimple}
            hasResult={hasResult}
            variant={hasResult ? "onprimary" : "muted"}
          />
        </section>

        <p className="text-center text-xs text-[hsl(var(--muted-foreground))] pt-2 pb-4 inline-flex items-center justify-center gap-1.5 w-full mt-4">
          Feito para entregadores
          <Van className="w-3.5 h-3.5 inline" strokeWidth={2.5} />
          por{" "}
          <a
            href="https://coutinhodev.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[hsl(var(--primary))] hover:underline transition-smooth"
          >
            Coutinho Dev
          </a>
        </p>
      </div>
    </main>
  );
}
