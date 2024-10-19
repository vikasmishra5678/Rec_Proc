import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  PanelSlots,
  Panel,
} from '../models';
import {PanelSlotsRepository} from '../repositories';

export class PanelSlotsPanelController {
  constructor(
    @repository(PanelSlotsRepository)
    public panelSlotsRepository: PanelSlotsRepository,
  ) { }

  @get('/panel-slots/{id}/panel', {
    responses: {
      '200': {
        description: 'Panel belonging to PanelSlots',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Panel),
          },
        },
      },
    },
  })
  async getPanel(
    @param.path.string('id') id: typeof PanelSlots.prototype.id,
  ): Promise<Panel> {
    return this.panelSlotsRepository.panel(id);
  }
}
