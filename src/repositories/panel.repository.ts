import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDsDataSource} from '../datasources';
import {Panel, PanelRelations, PanelAvailability} from '../models';
import {PanelAvailabilityRepository} from './panel-availability.repository';

export class PanelRepository extends DefaultCrudRepository<
  Panel,
  typeof Panel.prototype.P_ID,
  PanelRelations
> {

  public readonly panelAvailabilities: HasManyRepositoryFactory<PanelAvailability, typeof Panel.prototype.P_ID>;

  constructor(
    @inject('datasources.MongoDS') dataSource: MongoDsDataSource, @repository.getter('PanelAvailabilityRepository') protected panelAvailabilityRepositoryGetter: Getter<PanelAvailabilityRepository>,
  ) {
    super(Panel, dataSource);
    this.panelAvailabilities = this.createHasManyRepositoryFactoryFor('panelAvailabilities', panelAvailabilityRepositoryGetter,);
    this.registerInclusionResolver('panelAvailabilities', this.panelAvailabilities.inclusionResolver);
  }
}
