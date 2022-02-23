import User from 'App/Models/User'
import type { AllyUserContract, GithubToken, SocialProviders } from '@ioc:Adonis/Addons/Ally'

export default class SocialAuth {
  private findOrCreateHandler: any
  private emailExistHandler: any

  constructor(
    private socialUser: AllyUserContract<GithubToken>,
    private provider: keyof SocialProviders
  ) {}

  public onFindOrCreate(cb: any) {
    this.findOrCreateHandler = cb
    return this
  }

  public onEmailExist(cb: any) {
    this.emailExistHandler = cb
    return this
  }

  public async exec(): Promise<void> {
    let user = await this.findUser()

    if (!user && (await this.verifyEmailOrUsernameUniqueness())) {
      await this.emailExistHandler()
      return
    }

    if (!user) {
      user = await this.createUser()
    }

    await this.findOrCreateHandler(user)
  }

  private findUser() {
    return User.query()
      .where('oauthProviderId', this.socialUser.id)
      .where('oauthProviderName', this.provider)
      .first()
  }

  private async verifyEmailOrUsernameUniqueness() {
    return (
      (await User.query()
        .where('email', this.socialUser.email!)
        .orWhere('username', this.socialUser.nickName)
        .first()) !== null
    )
  }

  private createUser() {
    return User.create({
      username: this.socialUser.nickName,
      email: this.socialUser.email!,
      oauthProviderId: this.socialUser.id,
      oauthProviderName: this.provider,
    })
  }

  /**
   * Implementation of `then` for the promise API
   */
  public then(resolve: any, reject?: any): any {
    return this.exec().then(resolve, reject)
  }

  /**
   * Implementation of `catch` for the promise API
   */
  public catch(reject: any): any {
    return this.exec().catch(reject)
  }

  /**
   * Implementation of `finally` for the promise API
   */
  public finally(fullfilled: any) {
    return this.exec().finally(fullfilled)
  }

  /**
   * Required when Promises are extended
   */
  public get [Symbol.toStringTag]() {
    return this.constructor.name
  }
}
