import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import { UserRole } from 'App/Enums/UserRole'
import { UserFactory } from 'Database/factories'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    await User.create({
      username: 'romain.lanz',
      email: 'romain.lanz@pm.me',
      password: 'secret',
      role: UserRole.Admin,
    })

    await UserFactory.createMany(100)
  }
}
