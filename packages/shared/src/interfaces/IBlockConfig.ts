export interface IBlockConfig {
  id: string;
  type: string;
  inputs?: Record<string, any>;
  outputs?: Record<string, any>;
  retry?: number;
  timeout?: number;
  // eslint-disable-next-line no-unused-vars
  onError?: (error: Error, blockConfig: IBlockConfig) => void;
}
