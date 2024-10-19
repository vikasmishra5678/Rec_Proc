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
  User,
  Panel,
} from '../models';
import {UserRepository} from '../repositories';

export class UserPanelController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/panel', {
    responses: {
      '200': {
        description: 'User has one Panel',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Panel),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Panel>,
  ): Promise<Panel> {
    return this.userRepository.panel(id).get(filter);
  }

  @post('/users/{id}/panel', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Panel)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Panel, {
            title: 'NewPanelInUser',
            exclude: ['id'],
            optional: ['userId']
          }),
        },
      },
    }) panel: Omit<Panel, 'id'>,
  ): Promise<Panel> {
    return this.userRepository.panel(id).create(panel);
  }

  @patch('/users/{id}/panel', {
    responses: {
      '200': {
        description: 'User.Panel PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Panel, {partial: true}),
        },
      },
    })
    panel: Partial<Panel>,
    @param.query.object('where', getWhereSchemaFor(Panel)) where?: Where<Panel>,
  ): Promise<Count> {
    return this.userRepository.panel(id).patch(panel, where);
  }

  @del('/users/{id}/panel', {
    responses: {
      '200': {
        description: 'User.Panel DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Panel)) where?: Where<Panel>,
  ): Promise<Count> {
    return this.userRepository.panel(id).delete(where);
  }
}
