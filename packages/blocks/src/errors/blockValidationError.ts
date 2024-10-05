export class BlockValidationError extends Error {
  constructor(
    message: string,
    public missingFields: string[],
    public invalidFields: string[],
    public validationType: "input" | "output",
  ) {
    super(message);
    this.name = "BlockValidationError";
    this.missingFields = missingFields;
    this.invalidFields = invalidFields;
    this.validationType = validationType;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      missingFields: this.missingFields,
      invalidFields: this.invalidFields,
      validationType: this.validationType,
    };
  }
}

export const createBlockValidationErrorFromObject = (json: {
  message: string;
  missingFields: string[];
  invalidFields: string[];
  validationType: "input" | "output";
}): BlockValidationError => {
  return new BlockValidationError(
    json.message,
    json.missingFields,
    json.invalidFields,
    json.validationType,
  );
};

export default BlockValidationError;
