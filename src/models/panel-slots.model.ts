import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Panel} from './panel.model';

@model()
export class PanelSlots extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  date: string;

  @property({
    type: 'string',
    required: true,
  })
  time: string;

  @property({
    type: 'string',
    required: true,
  })
  duration: string;

  @property({
    type: 'string',
    required: true,
  })
  status: string;

  @belongsTo(() => Panel)
  panelId: string;

  constructor(data?: Partial<PanelSlots>) {
    super(data);
  }
}

export interface PanelSlotsRelations {
  panel?: Panel;
}

export type PanelSlotsWithRelations = PanelSlots & PanelSlotsRelations;
