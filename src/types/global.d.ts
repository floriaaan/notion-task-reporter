export type ExtendedGlobal = globalThis & {
  verbose: boolean;
  type: "ai" | "markdown" | string;
  help: boolean;

  notion: {
    token: string;
    sourceDatabaseId: string;
    outputDatabaseId: string;
  };
  openai: {
    token: string;
  };
};
