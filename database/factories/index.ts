import Factory from '@ioc:Adonis/Lucid/Factory'
import User from 'App/Models/User'
import Episode from 'App/Models/Episode'
import { DifficultyLevel } from 'App/Enums/DifficultyLevel'
import { UserRole } from 'App/Enums/UserRole'
import Series from 'App/Models/Series'

export const UserFactory = Factory.define(User, ({ faker }) => ({
  email: faker.internet.email(),
  username: faker.internet.userName(),
  password: 'secret',
}))
  .state('admin', (user) => (user.role = UserRole.Admin))
  .build()

export const EpisodeFactory = Factory.define(Episode, ({ faker }) => ({
  name: faker.name.jobTitle(),
  description: faker.name.jobDescriptor(),
  difficultyLevel: DifficultyLevel.Beginner,
})).build()

export const SeriesFactory = Factory.define(Series, ({ faker }) => ({
  name: faker.name.jobTitle(),
  description: faker.name.jobDescriptor(),
  difficultyLevel: DifficultyLevel.Beginner,
}))
  .relation('episodes', () => EpisodeFactory)
  .build()
