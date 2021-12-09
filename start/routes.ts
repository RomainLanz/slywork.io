import Route from '@ioc:Adonis/Core/Route'

Route.on('/').render('pages/home')

Route.get('login', 'AuthController.showLoginForm')
Route.post('login', 'AuthController.login')
Route.delete('logout', 'AuthController.logout')
Route.get('register', 'AuthController.showRegisterForm')
Route.post('register', 'AuthController.register')
