import {Entity, model, property, hasMany} from '@loopback/repository';
import {PanelAvailability} from './panel-availability.model';

@model({settings: {strict: false}})
export class Panel extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  P_ID?: number;

  @property({
    type: 'string',
    required: true,
  })
  panel_name: string;

  @property({
    type: 'string',
    required: true,
  })
  panel_category: string;

  @property({
    type: 'string',
    required: true,
  })
  exp_category: string;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  domain: string[];

  @hasMany(() => PanelAvailability, {keyTo: 'P_ID'})
  panelAvailabilities: PanelAvailability[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;
}

export interface PanelRelations {
  // describe navigational properties here
}
