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
  })
  current_stage: string;

  @property({
    type: 'string',
  })
  l1_status: string;

  @property({
    type: 'string',
  })
  l1_panel: string;

  @property({
    type: 'string',
  })
  l1_date: string;

  @property({
    type: 'string',
  })
  l1_time: string;

  @property({
    type: 'string',
  })
  l1_feedback: string;

  @property({
    type: 'string',
  })
  l2_status: string;

  @property({
    type: 'string',
  })
  l2_panel: string;

  @property({
    type: 'string',
  })
  l2_date: string;

  @property({
    type: 'string',
  })
  l2_time: string;

  @property({
    type: 'string',
  })
  l2_feedback: string;

  @property({
    type: 'Date',
    default: () => new Date(),
  })
  modified_at: Date;

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
