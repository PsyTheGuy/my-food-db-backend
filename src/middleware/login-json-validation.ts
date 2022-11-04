import Ajv, { JSONSchemaType } from 'ajv';
import { LoginData } from '../interfaces';
const ajv = new Ajv();

const loginJSONSchema: JSONSchemaType<LoginData> = {
  type: 'object',
  properties: {
    username: { type: 'string' },
    password: { type: 'string' },
  },
  required: ['username', 'password'],
  additionalProperties: false,
};

const isValidLoginJSON = ajv.compile(loginJSONSchema);

export { isValidLoginJSON };
