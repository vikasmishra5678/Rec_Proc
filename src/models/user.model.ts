import {Entity, hasOne, model, property} from '@loopback/repository';
import {Panel} from './panel.model';
import {UserCredentials} from './user-credentials.model';

@model({
  settings: {
    indexes: {
      uniqueEmail: {
        keys: {
          email: 1,
        },
        options: {
          unique: true,
        },
      },
    },
  },
})
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    defaultFn: 'uuidv4',
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    nullable: false,
    default: 'user',
  })
  role: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  phone: string;

  @hasOne(() => UserCredentials)
  userCredentials: UserCredentials;

  @hasOne(() => Panel)
  panel: Panel;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  panel?: Panel;
}


export type UserWithRelations = User & UserRelations
