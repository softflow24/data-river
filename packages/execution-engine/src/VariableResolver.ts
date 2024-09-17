export class VariableResolver {
  private scopes: Record<string, Record<string, any>>;

  constructor(scopes: Record<string, Record<string, any>> = {}) {
    this.scopes = {
      global: {},
      collection: {},
      environment: {},
      data: {},
      local: {},
      ...scopes,
    };
  }

  setScope(scope: keyof typeof this.scopes, variables: Record<string, any>) {
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
        if (this.scopes[scope][variableName] !== undefined) {
          return this.scopes[scope][variableName];
        }
      }
      return `{{${variableName}}}`; // Unresolved variable
    });
  }
}
