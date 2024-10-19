import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Candidate} from './candidate.model';

@model()
export class CandidateStatus extends Entity {
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
  candidate_status: string;

  @property({
    type: 'string',
    required: true,
  })
  current_stage: string;

  @property({
    type: 'string',
    required: true,
  })
  l1_panel: string;

  @property({
    type: 'string',
    required: true,
  })
  l1_date: string;

  @property({
    type: 'string',
    required: true,
  })
  l1_status: string;

  @property({
    type: 'string',
    required: true,
  })
  l2_panel: string;

  @property({
    type: 'string',
    required: true,
  })
  l2_date: string;

  @property({
    type: 'string',
    required: true,
  })
  l2_status: string;

  @belongsTo(() => Candidate)
  candidateId: string;

  constructor(data?: Partial<CandidateStatus>) {
    super(data);
  }
}

export interface CandidateStatusRelations {
  candidate?: Candidate;
}

export type CandidateStatusWithRelations = CandidateStatus & CandidateStatusRelations;
