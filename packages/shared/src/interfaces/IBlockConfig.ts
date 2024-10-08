export interface IBlockConfig {
  id: string;
  type: string;
  inputConfigs?: Record<string, { type: string; required: boolean }>;
  outputConfigs?: Record<string, { type: string }>;
  config?: Record<string, unknown>;
  inputs?: Record<string, unknown>;
  retry?: number;
  timeout?: number;
  onError?: (error: Error, blockConfig: IBlockConfig) => void;
}
