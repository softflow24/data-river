export class OpenAIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "OpenAIError";
  }
}

export class OpenAIResponseError extends OpenAIError {
  constructor(
    message: string,
    public responseData?: any,
  ) {
    super(message);
    this.name = "OpenAIResponseError";
  }
}

export class OpenAIIncompleteResponseError extends OpenAIResponseError {
  constructor(message: string, responseData?: any) {
    super(message, responseData);
    this.name = "OpenAIIncompleteResponseError";
  }
}

export class OpenAIRefusalError extends OpenAIResponseError {
  constructor(message: string, responseData?: any) {
    super(message, responseData);
    this.name = "OpenAIRefusalError";
  }
}

export class OpenAIParseError extends OpenAIError {
  constructor(
    message: string,
    public rawContent: string,
  ) {
    super(message);
    this.name = "OpenAIParseError";
  }
}
