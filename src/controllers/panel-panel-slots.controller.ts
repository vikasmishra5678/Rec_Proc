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
  PanelSlots,
} from '../models';
import {PanelRepository} from '../repositories';

export class PanelPanelSlotsController {
  constructor(
    @repository(PanelRepository) protected panelRepository: PanelRepository,
  ) { }

  @get('/panels/{id}/panel-slots', {
    responses: {
      '200': {
        description: 'Array of Panel has many PanelSlots',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PanelSlots)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<PanelSlots>,
  ): Promise<PanelSlots[]> {
    return this.panelRepository.panelSlots(id).find(filter);
  }

  @post('/panels/{id}/panel-slots', {
    responses: {
      '200': {
        description: 'Panel model instance',
        content: {'application/json': {schema: getModelSchemaRef(PanelSlots)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Panel.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PanelSlots, {
            title: 'NewPanelSlotsInPanel',
            exclude: ['id'],
            optional: ['panelId']
          }),
        },
      },
    }) panelSlots: Omit<PanelSlots, 'id'>,
  ): Promise<PanelSlots> {
    return this.panelRepository.panelSlots(id).create(panelSlots);
  }

  @patch('/panels/{id}/panel-slots', {
    responses: {
      '200': {
        description: 'Panel.PanelSlots PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PanelSlots, {partial: true}),
        },
      },
    })
    panelSlots: Partial<PanelSlots>,
    @param.query.object('where', getWhereSchemaFor(PanelSlots)) where?: Where<PanelSlots>,
  ): Promise<Count> {
    return this.panelRepository.panelSlots(id).patch(panelSlots, where);
  }

  @del('/panels/{id}/panel-slots', {
    responses: {
      '200': {
        description: 'Panel.PanelSlots DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(PanelSlots)) where?: Where<PanelSlots>,
  ): Promise<Count> {
    return this.panelRepository.panelSlots(id).delete(where);
  }

  @del('/panels/{panelId}/panel-slots/{slotId}', {
    responses: {
      '200': {
        description: 'PanelSlots DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async deleteById(
    @param.path.string('panelId') panelId: string,
    @param.path.string('slotId') slotId: string,
  ): Promise<void> {
    await this.panelRepository.panelSlots(panelId).delete({id: slotId});
  }

}
