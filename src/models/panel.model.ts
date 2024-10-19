import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {PanelSlots} from './panel-slots.model';
import {User} from './user.model';

@model()
export class Panel extends Entity {

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  stages_category: string[];

  @property({
    type: 'string',
    required: true,
  })
  experience_category: string;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  domain: string[];

  @hasMany(() => PanelSlots)
  panelSlots: PanelSlots[];

  @belongsTo(() => User)
  userId: string;

  constructor(data?: Partial<Panel>) {
    super(data);
  }
}

export interface PanelRelations {
  panelSlots?: PanelSlots[];
  user?: User;
}

export type PanelWithRelations = Panel & PanelRelations;
