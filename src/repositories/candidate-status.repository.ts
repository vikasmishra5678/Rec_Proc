import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDsDataSource} from '../datasources';
import {CandidateStatus, CandidateStatusRelations, Candidate} from '../models';
import {CandidateRepository} from './candidate.repository';

export class CandidateStatusRepository extends DefaultCrudRepository<
  CandidateStatus,
  typeof CandidateStatus.prototype.id,
  CandidateStatusRelations
> {

  public readonly candidate: BelongsToAccessor<Candidate, typeof CandidateStatus.prototype.id>;

  constructor(
    @inject('datasources.MongoDS') dataSource: MongoDsDataSource, @repository.getter('CandidateRepository') protected candidateRepositoryGetter: Getter<CandidateRepository>,
  ) {
    super(CandidateStatus, dataSource);
    this.candidate = this.createBelongsToAccessorFor('candidate', candidateRepositoryGetter,);
    this.registerInclusionResolver('candidate', this.candidate.inclusionResolver);
  }
}
