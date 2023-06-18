export const mercadoSchema = {
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      type: "string",
      maxLength: 100, // <- the primary key must have set maxLength
    },
    name: {
      type: "string",
    },
    quantity: {
      type: "string",
    },
    price: {
      type: "number",
    },
    _deleted: {
      type: "boolean",
    },
    createdAt: {
      type: "date-time",
    },
    updatedAt: {
      type: "date-time",
    },
  },
  required: [
    "id",
    "name",
    "quantity",
    "price",
    "_deleted",
    "createdAt",
    "updatedAt",
  ],
};
