import Route from '@ioc:Adonis/Core/Route'

Route.on('/').render('pages/home')

Route.get('users/:id/verification', 'AuthController.validateUser')
Route.get('login', 'AuthController.showLoginForm')
Route.post('login', 'AuthController.login')
Route.delete('logout', 'AuthController.logout')
Route.get('register', 'AuthController.showRegisterForm')
Route.post('register', 'AuthController.register')

Route.get('oauth/:provider/redirect', 'SocialAuthController.redirect').where('provider', /github/)
Route.get('oauth/:provider/callback', 'SocialAuthController.callback').where('provider', /github/)
