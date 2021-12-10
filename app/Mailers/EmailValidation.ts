import mjml from 'mjml'
import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import View from '@ioc:Adonis/Core/View'
import User from 'App/Models/User'

export default class EmailValidation extends BaseMailer {
  constructor(private user: User, private url: string) {
    super()
  }

  /**
   * The prepare method is invoked automatically when you run
   * "EmailValidation.send".
   *
   * Use this method to prepare the email message. The method can
   * also be async.
   */
  public async prepare(message: MessageContract) {
    const html = mjml(
      await View.render('emails.emailValidation', { user: this.user, url: this.url })
    ).html

    message
      .subject('[Slywork.io] Validation de votre compte')
      .from('no-reply@slywork.io')
      .to(this.user.email)
      .html(html)
  }
}
