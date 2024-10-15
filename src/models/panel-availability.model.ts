import {Entity, model, property, hasMany} from '@loopback/repository';
import {Panel} from './panel.model';

@model()
export class PanelAvailability extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  A_ID?: number;

  @property({
    type: 'date',
    required: true,
  })
  A_Date: string;

  @property({
    type: 'number',
    required: true,
  })
  A_StartTime: number;

  @property({
    type: 'number',
  })
  P_ID?: number;
}

export interface PanelAvailabilityRelations {
  // describe navigational properties here
}

