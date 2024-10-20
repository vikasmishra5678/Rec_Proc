import {
  RequestBodyObject,
  SchemaObject,
} from '@loopback/rest';

export const UserProfileSchema = {
  type: 'object',
  required: ['id'],
  properties: {
    id: {type: 'string'},
    name: {type: 'string'},
    role: {type: 'string'},
    phone: {type: 'string'},
    email: {type: 'string'},

  },
};

const CredentialsSchema: SchemaObject = {
  type: 'object',
  required: ['name', 'role', 'phone', 'email', 'password'],
  properties: {
    name: {
      type: 'string',
    },
    role: {
      type: 'string',
    },
    phone: {
      type: 'string',
    },
    email: {
      type: 'string',
      format: 'email',
    },
    password: {
      type: 'string',
      minLength: 8,
    },
  },
};

const CredentialsSchemaAdmin: SchemaObject = {
  type: 'object',
  required: ['name', 'phone', 'email', 'password'],
  properties: {
    name: {
      type: 'string',
    },
    phone: {
      type: 'string',
    },
    email: {
      type: 'string',
      format: 'email',
    },
    password: {
      type: 'string',
      minLength: 8,
    },

  },
};

const UpdateUserDetailsSchema: SchemaObject = {
  type: 'object',
  required: ['name', 'role', 'phone', 'email'],
  properties: {
    name: {
      type: 'string',
    },
    role: {
      type: 'string',
    },
    phone: {
      type: 'string',
    },
    email: {
      type: 'string',
      format: 'email',
    },
  },
};

const CredentialsSchemaLogin: SchemaObject = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: {
      type: 'string',
      format: 'email',
    },
    password: {
      type: 'string',
      minLength: 8,
    }
  },
};

export const CredentialsRequestBody: RequestBodyObject = {
  description: 'The input of Sign-Up function',
  required: true,
  content: {
    'application/json': {schema: CredentialsSchema},
  },
};

export const UpdateUserDetailsRequest: RequestBodyObject = {
  description: 'The input of Updating User Data',
  required: true,
  content: {
    'application/json': {schema: UpdateUserDetailsSchema},
  },
};

export const CredentialsRequestBodyAdmin: RequestBodyObject = {
  description: 'The input of Sign-Up as Admin function',
  required: true,
  content: {
    'application/json': {schema: CredentialsSchemaAdmin},
  },
};

export const CredentialsRequestBodyLogin: RequestBodyObject = {
  description: 'The input of login function',
  required: true,
  content: {
    'application/json': {schema: CredentialsSchemaLogin},
  },
};
