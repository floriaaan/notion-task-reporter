export const helpOptions = {
  "--type": {
    alias: "",
    description: "how to generate the summary",
    usage: "--type=ai",
    default: "markdown",
    options: ["ai", "markdown"],
    expected: "string",
  },
  "--version": {
    alias: "-v",
    description: "show version",
    usage: "--version",
    default: "",
    options: [],
    expected: "",
  },
  "--help": {
    alias: "-h",
    description: "show help",
    usage: "--help",
    default: "",
    options: [],
    expected: "",
  },
  "--verbose": {
    alias: "-V",
    description: "show verbose output",
    usage: "--verbose",
    default: "",
    options: [],
    expected: "",
  },
};
