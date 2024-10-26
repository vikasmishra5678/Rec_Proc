import {Entity, hasOne, model, property} from '@loopback/repository';
import {CandidateStatus} from './candidate-status.model';

@model()
export class Candidate extends Entity {
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
  name: string;

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

  @property({
    type: 'string',
    required: true,
  })
  totalExperience: string;

  @property({
    type: 'string',
    required: true,
  })
  relevantExperience: string;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  domain: string[];

  @property({
    type: 'string',
    required: true,
  })
  location: string;


  @property({
    type: 'string',
    default: 'waiting',
  })
  candidate_status: string;

  @property({
    type: 'Date',
    default: () => new Date(),
  })
  modified_at: Date;

  @hasOne(() => CandidateStatus)
  candidateStatus: CandidateStatus;

  constructor(data?: Partial<Candidate>) {
    super(data);
  }
}

export interface CandidateRelations {
  candidateStatus?: CandidateStatus;
}

export type CandidateWithRelations = Candidate & CandidateRelations;
