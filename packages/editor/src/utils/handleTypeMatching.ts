export const checkTypeMatch = (
  incomingPropertyType: string | string[] | undefined,
  handleTypes: string | string[],
): boolean => {
  if (!incomingPropertyType) return false;

  if (
    typeof incomingPropertyType === "string" &&
    typeof handleTypes === "string"
  ) {
    return incomingPropertyType === handleTypes;
  }

  if (typeof incomingPropertyType === "string" && Array.isArray(handleTypes)) {
    return handleTypes.includes(incomingPropertyType);
  }

  if (Array.isArray(incomingPropertyType) && typeof handleTypes === "string") {
    return incomingPropertyType.includes(handleTypes);
  }

  if (Array.isArray(incomingPropertyType) && Array.isArray(handleTypes)) {
    const incomingPropertyTypeSet = new Set(incomingPropertyType);
    return handleTypes.some((type) => incomingPropertyTypeSet.has(type));
  }

  return false;
};
