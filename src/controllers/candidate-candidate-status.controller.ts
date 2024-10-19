import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Candidate,
  CandidateStatus,
} from '../models';
import {CandidateRepository} from '../repositories';

export class CandidateCandidateStatusController {
  constructor(
    @repository(CandidateRepository) protected candidateRepository: CandidateRepository,
  ) { }

  @get('/candidates/{id}/candidate-status', {
    responses: {
      '200': {
        description: 'Candidate has one CandidateStatus',
        content: {
          'application/json': {
            schema: getModelSchemaRef(CandidateStatus),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<CandidateStatus>,
  ): Promise<CandidateStatus> {
    return this.candidateRepository.candidateStatus(id).get(filter);
  }

  @post('/candidates/{id}/candidate-status', {
    responses: {
      '200': {
        description: 'Candidate model instance',
        content: {'application/json': {schema: getModelSchemaRef(CandidateStatus)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Candidate.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CandidateStatus, {
            title: 'NewCandidateStatusInCandidate',
            exclude: ['id'],
            optional: ['candidateId']
          }),
        },
      },
    }) candidateStatus: Omit<CandidateStatus, 'id'>,
  ): Promise<CandidateStatus> {
    return this.candidateRepository.candidateStatus(id).create(candidateStatus);
  }

  @patch('/candidates/{id}/candidate-status', {
    responses: {
      '200': {
        description: 'Candidate.CandidateStatus PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CandidateStatus, {partial: true}),
        },
      },
    })
    candidateStatus: Partial<CandidateStatus>,
    @param.query.object('where', getWhereSchemaFor(CandidateStatus)) where?: Where<CandidateStatus>,
  ): Promise<Count> {
    return this.candidateRepository.candidateStatus(id).patch(candidateStatus, where);
  }

  @del('/candidates/{id}/candidate-status', {
    responses: {
      '200': {
        description: 'Candidate.CandidateStatus DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(CandidateStatus)) where?: Where<CandidateStatus>,
  ): Promise<Count> {
    return this.candidateRepository.candidateStatus(id).delete(where);
  }
}
