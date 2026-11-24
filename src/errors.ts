export class SsgError extends Error {
  constructor(message: string) {
    // `super(message)` calls Error's constructor so `.message` and the
    // stack trace are set the same way as a normal Error.
    super(message);
    this.name = "SsgError";
  }
}

export function formatUnknownError(err: unknown): string {
  if (err instanceof Error) {
    return err.message;
  }
  return String(err);
}
