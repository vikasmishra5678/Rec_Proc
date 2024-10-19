import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDsDataSource} from '../datasources';
import {PanelSlots, PanelSlotsRelations, Panel} from '../models';
import {PanelRepository} from './panel.repository';

export class PanelSlotsRepository extends DefaultCrudRepository<
  PanelSlots,
  typeof PanelSlots.prototype.id,
  PanelSlotsRelations
> {

  public readonly panel: BelongsToAccessor<Panel, typeof PanelSlots.prototype.id>;

  constructor(
    @inject('datasources.MongoDS') dataSource: MongoDsDataSource, @repository.getter('PanelRepository') protected panelRepositoryGetter: Getter<PanelRepository>,
  ) {
    super(PanelSlots, dataSource);
    this.panel = this.createBelongsToAccessorFor('panel', panelRepositoryGetter,);
    this.registerInclusionResolver('panel', this.panel.inclusionResolver);
  }
}
