import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  CandidateStatus,
  Candidate,
} from '../models';
import {CandidateStatusRepository} from '../repositories';

export class CandidateStatusCandidateController {
  constructor(
    @repository(CandidateStatusRepository)
    public candidateStatusRepository: CandidateStatusRepository,
  ) { }

  @get('/candidate-statuses/{id}/candidate', {
    responses: {
      '200': {
        description: 'Candidate belonging to CandidateStatus',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Candidate),
          },
        },
      },
    },
  })
  async getCandidate(
    @param.path.string('id') id: typeof CandidateStatus.prototype.id,
  ): Promise<Candidate> {
    return this.candidateStatusRepository.candidate(id);
  }
}
