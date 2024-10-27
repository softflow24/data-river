export interface ISharedBlock {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: {
    block: string;
    label: string;
    color: string;
    icon: string;
    inputConfigs?: Record<
      string,
      { type: string | string[]; required: boolean }
    >;
    outputConfigs?: Record<
      string,
      { type: string | string[]; required: boolean }
    >;
    inputs?: Record<string, any>;
    outputs?: Record<string, any>;
    config?: Record<string, any>;
  };
}
