import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongoDsDataSource} from '../datasources';
import {Candidate, CandidateRelations, CandidateStatus} from '../models';
import {CandidateStatusRepository} from './candidate-status.repository';

export class CandidateRepository extends DefaultCrudRepository<
  Candidate,
  typeof Candidate.prototype.id,
  CandidateRelations
> {

  public readonly candidateStatus: HasOneRepositoryFactory<CandidateStatus, typeof Candidate.prototype.id>;

  constructor(
    @inject('datasources.MongoDS') dataSource: MongoDsDataSource, @repository.getter('CandidateStatusRepository') protected candidateStatusRepositoryGetter: Getter<CandidateStatusRepository>,
  ) {
    super(Candidate, dataSource);
    this.candidateStatus = this.createHasOneRepositoryFactoryFor('candidateStatus', candidateStatusRepositoryGetter);
    this.registerInclusionResolver('candidateStatus', this.candidateStatus.inclusionResolver);
  }
}
