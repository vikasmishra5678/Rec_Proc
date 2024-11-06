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
import {PanelRepository, PanelSlotsRepository} from '../repositories';

export class PanelPanelSlotsController {
  constructor(
    @repository(PanelRepository) protected panelRepository: PanelRepository,
    @repository(PanelSlotsRepository) protected panelSlotsRepository: PanelSlotsRepository,
  ) { }

  // Existing individual Panel's PanelSlots endpoints
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
  @authenticate('jwt')
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
  @authenticate('jwt')
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
  @authenticate('jwt')
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
  @authenticate('jwt')
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
  @authenticate('jwt')
  async deleteById(
    @param.path.string('panelId') panelId: string,
    @param.path.string('slotId') slotId: string,
  ): Promise<void> {
    await this.panelRepository.panelSlots(panelId).delete({id: slotId});
  }

  // New endpoints for all PanelSlots across all Panels
  @get('/panel-slots', {
    responses: {
      '200': {
        description: 'Array of all PanelSlots',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PanelSlots)},
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async findAll(
    @param.query.object('filter') filter?: Filter<PanelSlots>,
  ): Promise<PanelSlots[]> {
    return this.panelSlotsRepository.find(filter);
  }

  @post('/panel-slots', {
    responses: {
      '200': {
        description: 'PanelSlots model instance',
        content: {'application/json': {schema: getModelSchemaRef(PanelSlots)}},
      },
    },
  })
  @authenticate('jwt')
  async createAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PanelSlots, {
            title: 'NewPanelSlots',
            exclude: ['id'],
          }),
        },
      },
    }) panelSlots: Omit<PanelSlots, 'id'>,
  ): Promise<PanelSlots> {
    return this.panelSlotsRepository.create(panelSlots);
  }

  @patch('/panel-slots', {
    responses: {
      '200': {
        description: 'PanelSlots PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authenticate('jwt')
  async patchAll(
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
    return this.panelSlotsRepository.updateAll(panelSlots, where);
  }

  @del('/panel-slots', {
    responses: {
      '200': {
        description: 'PanelSlots DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authenticate('jwt')
  async deleteAll(
    @param.query.object('where', getWhereSchemaFor(PanelSlots)) where?: Where<PanelSlots>,
  ): Promise<Count> {
    return this.panelSlotsRepository.deleteAll(where);
  }

  // New endpoints for individual PanelSlot by slotId
  @get('/panel-slots/{slotId}', {
    responses: {
      '200': {
        description: 'PanelSlots model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(PanelSlots),
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async findById(
    @param.path.string('slotId') slotId: string,
  ): Promise<PanelSlots> {
    return this.panelSlotsRepository.findById(slotId);
  }

  @patch('/panel-slots/{slotId}', {
    responses: {
      '200': {
        description: 'PanelSlots PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authenticate('jwt')
  async patchById(
    @param.path.string('slotId') slotId: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PanelSlots, {partial: true}),
        },
      },
    })
    panelSlots: Partial<PanelSlots>,
  ): Promise<void> {
    await this.panelSlotsRepository.updateById(slotId, panelSlots);
  }
}
