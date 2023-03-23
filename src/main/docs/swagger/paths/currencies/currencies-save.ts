export const currenciesSavePath = {
  post: {
    tags: ["Currencies"],
    summary: "Adicionar novas moedas que deverão ser aceitas",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#schemas/currenciesSaveBody",
          },
        },
      },
    },
    responses: {
      200: {
        description: "Sucesso",
        content: {
          "application/json": {
            schema: {
              $ref: "#/schemas/currenciesSaveResponse",
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
