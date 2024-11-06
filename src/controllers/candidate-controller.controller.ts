import {authenticate} from '@loopback/authentication';
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
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Candidate} from '../models';
import {CandidateRepository} from '../repositories';

export class CandidateControllerController {
  constructor(
    @repository(CandidateRepository)
    public candidateRepository: CandidateRepository,
  ) { }

  @post('/candidates')
  @response(200, {
    description: 'Candidate model instance',
    content: {'application/json': {schema: getModelSchemaRef(Candidate)}},
  })
  @authenticate('jwt')
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Candidate, {
            title: 'NewCandidate',
            exclude: ['id'],
          }),
        },
      },
    })
    candidate: Omit<Candidate, 'id'>,
  ): Promise<Candidate> {
    return this.candidateRepository.create(candidate);
  }

  // Bulk Upload Endpoint
  @post('/candidates/bulk-upload')
  @response(200, {
    description: 'Bulk upload of Candidates',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            total: {type: 'number'},
            successCount: {type: 'number'},
            failCount: {type: 'number'},
            failedRecords: {
              type: 'array',
              items: {type: 'object'},
            },
          },
        }
      }
    },
  })
  @authenticate('jwt')
  async bulkUpload(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: getModelSchemaRef(Candidate, {exclude: ['id']}),
          },
        },
      },
    })
    candidates: Omit<Candidate, 'id'>[],
  ): Promise<object> {
    let successCount = 0;
    let failCount = 0;
    const failedRecords = [];

    for (const candidate of candidates) {
      try {
        await this.candidateRepository.create(candidate);
        successCount++;
      } catch (error) {
        failCount++;
        failedRecords.push({candidate, reason: error.message});
      }
    }

    return {
      total: candidates.length,
      successCount,
      failCount,
      failedRecords,
    };
  }

  @get('/candidates/count')
  @response(200, {
    description: 'Candidate model count',
    content: {'application/json': {schema: CountSchema}},
  })
  @authenticate('jwt')
  async count(
    @param.where(Candidate) where?: Where<Candidate>,
  ): Promise<Count> {
    return this.candidateRepository.count(where);
  }

  @get('/candidates')
  @response(200, {
    description: 'Array of Candidate model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Candidate),
        },
      },
    },
  })
  @authenticate('jwt')
  async find(
    @param.query.object('filter') filter?: Filter<Candidate>,
  ): Promise<Candidate[]> {
    return this.candidateRepository.find(filter);
  }

  @patch('/candidates')
  @response(200, {
    description: 'Candidate PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  @authenticate('jwt')
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Candidate, {partial: true}),
        },
      },
    })
    candidate: Candidate,
    @param.where(Candidate) where?: Where<Candidate>,
  ): Promise<Count> {
    candidate.modified_at = new Date();
    return this.candidateRepository.updateAll(candidate, where);
  }

  @get('/candidates/{id}')
  @response(200, {
    description: 'Candidate model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Candidate),
      },
    },
  })
  @authenticate('jwt')
  async findById(
    @param.path.string('id') id: string,
  ): Promise<Candidate> {
    return this.candidateRepository.findById(id);
  }

  @patch('/candidates/{id}')
  @response(204, {
    description: 'Candidate PATCH success',
  })
  @authenticate('jwt')
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Candidate, {partial: true}),
        },
      },
    })
    candidate: Candidate,
  ): Promise<void> {
    candidate.modified_at = new Date();
    await this.candidateRepository.updateById(id, candidate);
  }

  @put('/candidates/{id}')
  @response(204, {
    description: 'Candidate PUT success',
  })
  @authenticate('jwt')
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() candidate: Candidate,
  ): Promise<void> {
    await this.candidateRepository.replaceById(id, candidate);
  }

  @del('/candidates/{id}')
  @response(204, {
    description: 'Candidate DELETE success',
  })
  @authenticate('jwt')
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.candidateRepository.deleteById(id);
  }
}
