export const currenciesConvertResponse = {
  type: "array",
  items: {
    type: "object",
    properties: {
      currency: {
        type: "string",
      },
      value: {
        type: "number",
      },
    },
  },
};
