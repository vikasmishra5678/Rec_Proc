import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDsDataSource} from '../datasources';
import {PanelAvailability, PanelAvailabilityRelations} from '../models';

export class PanelAvailabilityRepository extends DefaultCrudRepository<
  PanelAvailability,
  typeof PanelAvailability.prototype.A_ID,
  PanelAvailabilityRelations
> {
  constructor(
    @inject('datasources.MongoDS') dataSource: MongoDsDataSource,
  ) {
    super(PanelAvailability, dataSource);
  }
}
