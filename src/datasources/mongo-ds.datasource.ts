import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'MongoDS',
  connector: 'mongodb',
  url: 'mongodb+srv://vikas123:123@xplore.exttp.mongodb.net/test?retryWrites=true&w=majority&appName=XploRE',
  host: '',
  port: 0,
  user: '',
  password: '',
  database: '',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MongoDsDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'MongoDS';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.MongoDS', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
