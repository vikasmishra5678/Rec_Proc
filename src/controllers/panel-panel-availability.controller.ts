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
  Panel,
  PanelAvailability,
} from '../models';
import {PanelRepository} from '../repositories';

export class PanelPanelAvailabilityController {
  constructor(
    @repository(PanelRepository) protected panelRepository: PanelRepository,
  ) { }

  @get('/panels/{id}/panel-availabilities', {
    responses: {
      '200': {
        description: 'Array of Panel has many PanelAvailability',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PanelAvailability)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<PanelAvailability>,
  ): Promise<PanelAvailability[]> {
    return this.panelRepository.panelAvailabilities(id).find(filter);
  }

  @post('/panels/{id}/panel-availabilities', {
    responses: {
      '200': {
        description: 'Panel model instance',
        content: {'application/json': {schema: getModelSchemaRef(PanelAvailability)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Panel.prototype.P_ID,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PanelAvailability, {
            title: 'NewPanelAvailabilityInPanel',
            exclude: ['A_ID'],
            optional: ['P_ID']
          }),
        },
      },
    }) panelAvailability: Omit<PanelAvailability, 'A_ID'>,
  ): Promise<PanelAvailability> {
    return this.panelRepository.panelAvailabilities(id).create(panelAvailability);
  }

  @patch('/panels/{id}/panel-availabilities', {
    responses: {
      '200': {
        description: 'Panel.PanelAvailability PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PanelAvailability, {partial: true}),
        },
      },
    })
    panelAvailability: Partial<PanelAvailability>,
    @param.query.object('where', getWhereSchemaFor(PanelAvailability)) where?: Where<PanelAvailability>,
  ): Promise<Count> {
    return this.panelRepository.panelAvailabilities(id).patch(panelAvailability, where);
  }

  @del('/panels/{id}/panel-availabilities', {
    responses: {
      '200': {
        description: 'Panel.PanelAvailability DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(PanelAvailability)) where?: Where<PanelAvailability>,
  ): Promise<Count> {
    return this.panelRepository.panelAvailabilities(id).delete(where);
  }
}
