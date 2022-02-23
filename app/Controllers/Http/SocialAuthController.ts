import SocialAuth from 'App/Services/SocialAuth'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SocialAuthController {
  public redirect({ ally, params }: HttpContextContract) {
    return ally.use(params.provider).redirect()
  }

  public async callback({ ally, auth, session, params, response }: HttpContextContract) {
    const socialUser = await ally.use(params.provider).user()

    await new SocialAuth(socialUser, params.provider)
      .onFindOrCreate(async (user) => {
        await auth.login(user)
        response.redirect().toPath('/')
      })
      .onEmailExist(() => {
        session.flash({ error: `L'email ou le nom d'utilisateur est déjà utilisé` })
        response.redirect().toRoute('AuthController.showLoginForm')
      })
  }
}
