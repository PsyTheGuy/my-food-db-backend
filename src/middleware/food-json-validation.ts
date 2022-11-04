import Ajv, { AnySchema } from 'ajv';
const ajv = new Ajv();

const foodCreateSchema: AnySchema = {
  $ref: '#/definitions/FoodEntryCreateOptions',
  definitions: {
    FoodEntryCreateOptions: {
      additionalProperties: false,
      properties: {
        details: { $ref: '#/definitions/FoodEntryDetails' },
        name: { type: 'string' },
      },
      required: ['name'],
      type: 'object',
    },
    FoodEntryDetails: {
      additionalProperties: false,
      properties: {
        amount: { type: 'number' },
        unit: { type: 'string' },
      },
      required: ['unit', 'amount'],
      type: 'object',
    },
  },
};

const foodUpdateSchema: AnySchema = {
  $ref: '#/definitions/FoodEntryUpdateOptions',
  definitions: {
    FoodEntryDetails: {
      additionalProperties: false,
      properties: {
        amount: { type: 'number' },
        unit: { type: 'string' },
      },
      required: ['unit', 'amount'],
      type: 'object',
    },
    FoodEntryUpdateOptions: {
      additionalProperties: false,
      properties: {
        details: { $ref: '#/definitions/FoodEntryDetails' },
        name: { type: 'string' },
      },
      type: 'object',
      minProperties: 1,
    },
  },
};

const isValidCreateFoodJSON = ajv.compile(foodCreateSchema);
const isValidUpdateFoodJSON = ajv.compile(foodUpdateSchema);

export { isValidCreateFoodJSON, isValidUpdateFoodJSON };
