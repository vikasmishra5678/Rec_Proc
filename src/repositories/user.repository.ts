import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongoDsDataSource} from '../datasources';
import {User, UserRelations, UserCredentials, Panel} from '../models';
import {UserCredentialsRepository} from './user-credentials.repository';
import {PanelRepository} from './panel.repository';

export type Credentials = {
  email: string;
  password: string;
  role?: string
};

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly userCredentials: HasOneRepositoryFactory<UserCredentials, typeof User.prototype.id>;

  public readonly panel: HasOneRepositoryFactory<Panel, typeof User.prototype.id>;

  constructor(
    @inject('datasources.MongoDS') dataSource: MongoDsDataSource, @repository.getter('UserCredentialsRepository') protected userCredentialsRepositoryGetter: Getter<UserCredentialsRepository>, @repository.getter('PanelRepository') protected panelRepositoryGetter: Getter<PanelRepository>,
  ) {
    super(User, dataSource);
    this.panel = this.createHasOneRepositoryFactoryFor('panel', panelRepositoryGetter);
    this.registerInclusionResolver('panel', this.panel.inclusionResolver);
    this.userCredentials = this.createHasOneRepositoryFactoryFor('userCredentials', userCredentialsRepositoryGetter);
    this.registerInclusionResolver('userCredentials', this.userCredentials.inclusionResolver);
  }

  async findCredentials(
    userId: typeof User.prototype.id,
  ): Promise<UserCredentials | undefined> {
    try {
      return await this.userCredentials(userId).get();
    } catch (err) {
      if (err.code === 'ENTITY_NOT_FOUND') {
        return undefined;
      }
      throw err;
    }
  }
}
