import "server-only";

type Level = "error" | "warn" | "info";

type Context = Record<string, unknown>;

// Structured JSON logging. Vercel's log viewer parses JSON lines, so `event`
// and context fields become filterable instead of being buried in free text.
//
// ponytail: no external service yet. When an error tracker is added, forward
// from `emit` — every call site already routes through here.
function emit(level: Level, event: string, context: Context = {}) {
  const payload = JSON.stringify({ level, event, ...serialize(context) });

  if (level === "error") console.error(payload);
  else if (level === "warn") console.warn(payload);
  else console.info(payload);
}

// Errors do not survive JSON.stringify (message/stack are non-enumerable).
function serialize(context: Context): Context {
  const out: Context = {};

  for (const [key, value] of Object.entries(context)) {
    out[key] = value instanceof Error ? { message: value.message, name: value.name } : value;
  }

  return out;
}

export const logger = {
  error: (event: string, context?: Context) => emit("error", event, context),
  warn: (event: string, context?: Context) => emit("warn", event, context),
  info: (event: string, context?: Context) => emit("info", event, context),
};
