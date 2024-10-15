import {Entity, model, property, belongsTo} from '@loopback/repository';
import {CandidateStatus} from './candidate-status.model';

@model({settings: {strict: false}})
export class Candidate extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  C_ID?: number;

  @property({
    type: 'string',
    required: true,
  })
  candidate_name: string;

  @property({
    type: 'string',
    required: true,
  })
  c_email: string;

  @property({
    type: 'number',
    required: true,
  })
  c_phone: number;

  @property({
    type: 'number',
    required: true,
  })
  c_experience: number;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  c_domain: string[];

  @property({
    type: 'string',
    required: true,
  })
  c_location: string;

  @belongsTo(() => CandidateStatus, {name: 'CandidateStatus'})
  CS_ID: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

}

export interface CandidateRelations {
  // describe navigational properties here
}
