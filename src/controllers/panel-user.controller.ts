import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Panel,
  User,
} from '../models';
import {PanelRepository} from '../repositories';

export class PanelUserController {
  constructor(
    @repository(PanelRepository)
    public panelRepository: PanelRepository,
  ) { }

  @get('/panels/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Panel',
        content: {
          'application/json': {
            schema: getModelSchemaRef(User),
          },
        },
      },
    },
  })
  async getUser(
    @param.path.string('id') id: typeof Panel.prototype.id,
  ): Promise<User> {
    return this.panelRepository.user(id);
  }
}