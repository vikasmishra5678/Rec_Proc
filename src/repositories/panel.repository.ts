import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongoDsDataSource} from '../datasources';
import {Panel, PanelRelations, PanelSlots, User} from '../models';
import {PanelSlotsRepository} from './panel-slots.repository';
import {UserRepository} from './user.repository';

export class PanelRepository extends DefaultCrudRepository<
  Panel,
  typeof Panel.prototype.id,
  PanelRelations
> {

  public readonly panelSlots: HasManyRepositoryFactory<PanelSlots, typeof Panel.prototype.id>;

  public readonly user: BelongsToAccessor<User, typeof Panel.prototype.id>;

  constructor(
    @inject('datasources.MongoDS') dataSource: MongoDsDataSource, @repository.getter('PanelSlotsRepository') protected panelSlotsRepositoryGetter: Getter<PanelSlotsRepository>, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Panel, dataSource);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
    this.panelSlots = this.createHasManyRepositoryFactoryFor('panelSlots', panelSlotsRepositoryGetter,);
    this.registerInclusionResolver('panelSlots', this.panelSlots.inclusionResolver);
  }
}
