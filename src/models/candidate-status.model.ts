import {Entity, model, property, belongsTo} from '@loopback/repository';

@model()
export class CandidateStatus extends Entity {

  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  CS_ID?: number;

  @property({
    type: 'string',
    required: true,
  })
  C_Status: string;

  @property({
    type: 'string',
  })
  C_Stage?: string;

  @property({
    type: 'string',
  })
  C_L1_Status?: string;

  @property({
    type: 'date',
  })
  C_L1_Date?: string;

  @property({
    type: 'string',
  })
  C_L1_Panel?: string;

  @property({
    type: 'string',
  })
  C_L2_Status?: string;

  @property({
    type: 'date',
  })
  C_L2_Date?: string;

  @property({
    type: 'string',
  })
  C_L2_Panel?: string;

  @property({
    type: 'string',
  })
  C_L3_Status?: string;

  @property({
    type: 'date',
  })
  C_L3_Date?: string;

  @property({
    type: 'string',
  })
  C_L3_Panel?: string;

  @property({
    type: 'string',
  })
  C_HR_Status?: string;

  @property({
    type: 'date',
  })
  C_HR_Date?: string;

  @property({
    type: 'string',
  })
  C_HR_Panel?: string;

}

export interface CandidateStatusRelations {
  // describe navigational properties here
}

