import {authenticate} from '@loopback/authentication';
import {
  repository,
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  param,
} from '@loopback/rest';
import {
  Candidate,
  CandidateStatus,
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
  @authenticate('jwt')
  async getCandidate(
    @param.path.string('id') id: typeof CandidateStatus.prototype.id,
  ): Promise<Candidate> {
    return this.candidateStatusRepository.candidate(id);
  }
}
