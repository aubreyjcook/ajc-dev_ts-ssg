import { SsgError } from "./errors.js";

/** Package version shown by `--version` / `-V`. Keep in sync with package.json. */
export const VERSION = "0.1.0";

export const DEFAULTS = {
  content: "content",
  template: "template.html",
  output: "dist",
  baseUrl: "",
} as const;

export interface Config {
  /** Directory to walk for Markdown and static assets. */
  contentDir: string;
  /** Path to the default HTML template. */
  templatePath: string;
  /** Directory where generated HTML (and copied assets) are written. */
  outputDir: string;
  /**
   * Prefix for absolute site-root URLs in templates (`{{baseUrl}}`).
   * Useful when the site is hosted in a subdirectory, e.g. `/my-blog`.
   * Empty string means "site is at the domain root".
   */
  baseUrl: string;
  /** When true, print each file as it is processed. */
  verbose: boolean;
}

export type Action =
  | { type: "help" }
  | { type: "version" }
  | { type: "build"; config: Config };

  /**
 * Parse process arguments into an Action.
 *
 * @param argv - Typically `process.argv.slice(2)` (program name already removed).
 */
export function parseArgs(argv: string[]): Action {
  // No operands at all → show help (friendlier than failing).
  if (argv.length === 0) {
    return { type: "help" };
  }

  const first = argv[0];

  if (first === "help" || first === "--help" || first === "-h") {
    return { type: "help" };
  }

  if (first === "--version" || first === "-V") {
    return { type: "version" };
  }

  // Allow `ssg --version` without a subcommand, but for build we expect
  // either `build` as the first token or flags that imply build.
  let i = 0;
  if (first === "build") {
    i = 1;
  } else if (first.startsWith("-")) {
    // `ssg --content ./pages` is treated as an implicit build.
    i = 0;
  } else {
    throw new SsgError(
      `Unknown command "${first}". Try "build", "help", or "--version".`,
    );
  }
