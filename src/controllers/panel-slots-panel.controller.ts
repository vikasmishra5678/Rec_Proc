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
  Panel,
  PanelSlots,
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
  @authenticate('jwt')
  async getPanel(
    @param.path.string('id') id: typeof PanelSlots.prototype.id,
  ): Promise<Panel> {
    return this.panelSlotsRepository.panel(id);
  }
}
