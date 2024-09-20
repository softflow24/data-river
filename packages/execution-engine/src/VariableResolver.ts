export class VariableResolver {
  private scopes: Record<string, Record<string, unknown>>;

  constructor(scopes: Record<string, Record<string, unknown>> = {}) {
    this.scopes = {
      global: {},
      collection: {},
      environment: {},
      data: {},
      local: {},
      ...scopes,
    };
  }

  setScope(
    scope: keyof typeof this.scopes,
    variables: Record<string, unknown>,
  ) {
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
      ]) {
        const value = this.scopes[scope][variableName];
        if (value !== undefined) {
          return String(value); // Convert to string
        }
      }
      return `{{${variableName}}}`; // Unresolved variable
    });
  }
}
