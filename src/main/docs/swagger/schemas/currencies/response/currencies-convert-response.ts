export const currenciesConvertResponse = {
  type: "object",
  properties: {
    currencies: {
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
    },
    totalOfPages: {
      type: "number",
    },
  },
};
