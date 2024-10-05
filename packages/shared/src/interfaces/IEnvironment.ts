export interface IEnvironment {
  variables: Record<string, unknown>;
  errors: Record<string, Error[]>;
}
