import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { SeriesFactory } from 'Database/factories'

export default class SeriesSeeder extends BaseSeeder {
  public async run() {
    await SeriesFactory.with('episodes', 10).createMany(3)
  }
}
