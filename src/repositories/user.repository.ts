import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasOneRepositoryFactory, repository} from '@loopback/repository';
import {MongoDsDataSource} from '../datasources';
import {Panel, User, UserCredentials, UserRelations} from '../models';
import {PanelRepository} from './panel.repository';
import {UserCredentialsRepository} from './user-credentials.repository';

export type Credentials = {
  email: string;
  password: string;
  phone?: string;
  role?: string;
};

export type UpdateUserDetails = {
  name?: string;
  email?: string;
  phone?: string;
  role?: string;
}

export type ChangePasswordDetails = {
  newPassword: string;
}

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
