export type ParsedStat = { target: number; decimals: number; suffix: string };

/**
 * Extrai um número contável do início de um valor de estatística, para
 * animar contagem crescente (ex.: "12" -> 12; "39,8 mil" -> 39.8 + "mil").
 * Retorna null quando o valor não começa com número (ex.: "Salvador, BA") —
 * esses casos não contam, só aparecem estáticos.
 */
export function parseStatValue(value: string): ParsedStat | null {
  const match = value.match(/^(\d+)(?:,(\d+))?\s*(.*)$/);
  if (!match) return null;

  const [, whole, decimal, rest] = match;
  const decimals = decimal ? decimal.length : 0;
  const target = Number(`${whole}.${decimal ?? "0"}`);

  return { target, decimals, suffix: rest ? ` ${rest}` : "" };
}

export function formatStatValue(current: number, parsed: ParsedStat): string {
  const formatted = current.toFixed(parsed.decimals).replace(".", ",");
  return `${formatted}${parsed.suffix}`;
}
