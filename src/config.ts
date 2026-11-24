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