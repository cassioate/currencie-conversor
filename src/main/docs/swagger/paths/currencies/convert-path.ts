export const currenciesConvertPath = {
  get: {
    tags: ["Currencies"],
    summary:
      "Buscar o valor do item em todas as moedas que são aceitas atualmente",
    parameters: [
      {
        in: "path",
        name: "currency",
        description: "Moeda escolhida",
        required: true,
        schema: {
          type: "string",
        },
      },
      {
        in: "path",
        name: "value",
        description: "Valor do item na moeda escolhida",
        required: true,
        schema: {
          type: "string",
        },
      },
      {
        in: "query",
        name: "page",
        description: "Pagina desejada",
        required: false,
        schema: {
          type: "string",
        },
      },
      {
        in: "query",
        name: "size",
        description: "Quantidade de items por pagina",
        required: false,
        schema: {
          type: "string",
        },
      },
    ],
    responses: {
      200: {
        description: "Sucesso",
        content: {
          "application/json": {
            schema: {
              $ref: "#/schemas/currenciesConvertResponse",
            },
          },
        },
      },
      400: {
        $ref: "#/components/badRequest",
      },
      500: {
        $ref: "#/components/internalServer",
      },
    },
  },
};
