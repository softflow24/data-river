import { injectable } from "tsyringe";

type Scope = "global" | "collection" | "environment" | "data" | "local";

@injectable()
export class VariableResolver {
  private scopes: Record<Scope, Record<string, unknown>>;

  constructor() {
    this.scopes = {
      global: {},
      collection: {},
      environment: {},
      data: {},
      local: {},
    };
  }

  setScope(scope: Scope, variables: Record<string, unknown>) {
    this.scopes[scope] = variables;
  }

  resolve(template: string): string {
    return template.replace(/{{(.*?)}}/g, (_, variableName) => {
      for (const scope of [
        "local",
        "data",
        "environment",
        "collection",
        "global",
      ] as Scope[]) {
        const value = this.scopes[scope][variableName];
        if (value !== undefined) {
          return String(value); // Convert to string
        }
      }
      return `{{${variableName}}}`; // Unresolved variable
    });
  }
}
