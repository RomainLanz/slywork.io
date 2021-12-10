import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RegisterValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    username: schema.string({ trim: true }, [rules.unique({ table: 'users', column: 'username' })]),
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.unique({ table: 'users', column: 'email' }),
    ]),
    password: schema.string({}, [rules.confirmed(), rules.minLength(6)]),
  })

  public messages = {
    'username.required': `Le nom d'utilisateur est requis`,
    'username.unique': `Ce nom d'utilisateur est déjà utilisé`,
    'email.required': `L'email est requis`,
    'email.email': `L'email n'est pas valide`,
    'email.unique': `Cet email est déjà utilisé`,
    'password.required': `Le mot de passe est requis`,
    // TODO: Check why it does not work
    'password.confirmed': `Les mots de passe ne correspondent pas`,
    'password.minLength': `Le mot de passe doit contenir au moins 6 caractères`,
  }
}
