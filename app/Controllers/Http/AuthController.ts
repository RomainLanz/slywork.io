import Env from '@ioc:Adonis/Core/Env'
import Route from '@ioc:Adonis/Core/Route'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import EmailValidation from 'App/Mailers/EmailValidation'
import User from 'App/Models/User'
import RegisterValidator from 'App/Validators/RegisterValidator'
import { UserStatus } from 'App/Enums/UserStatus'

export default class AuthController {
  public showLoginForm({ view }: HttpContextContract) {
    return view.render('auth/login')
  }

  public async login({ auth, request, response }: HttpContextContract) {
    const { email, password } = request.only(['email', 'password'])

    await auth.attempt(email, password)

    return response.redirect('/')
  }

  public showRegisterForm({ view }: HttpContextContract) {
    return view.render('auth/register')
  }

  public async register({ auth, request, response }: HttpContextContract) {
    const payload = await request.validate(RegisterValidator)

    const user = await User.create(payload)
    await auth.login(user)

    const url = Route.makeSignedUrl(
      'AuthController.validateUser',
      {
        id: user.id,
      },
      { expiresIn: '1h' }
    )

    new EmailValidation(user, `${Env.get('APP_URL')}${url}`).sendLater()

    return response.redirect('/')
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.logout()

    return response.redirect('/')
  }

  public async validateUser({ auth, params, request, response, session }: HttpContextContract) {
    if (!request.hasValidSignature()) {
      session.flash('error', `Ce lien n'est pas valide`)
      return response.redirect().toPath('/')
    }

    const id = params.id
    const user = await User.findOrFail(id)
    user.status = UserStatus.Active
    await user.save()
    await auth.login(user)

    return response.redirect('/')
  }
}
