export type ActionResponse<T extends { message: string } | { error: string }> =
  | {
      error: string;
      message?: never;
    }
  | {
      message: string;
      error?: never;
    };
