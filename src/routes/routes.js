import RootController from 'controller/RootController'
import UserController from 'controller/UserController'

import Validator from 'services/ValidatorService'

export default class Routes {
  constructor(app) {
    this._app = app
    this._initRoutes()
  }

  _initRoutes() {
    const rootController = new RootController()
    const userController = new UserController()

    const validator = new Validator()

    /*
     * Basic routes
     */
    this._app.get('/', rootController.index.bind(rootController))

    /*
     * Users routes
     */
    this._app.get('/users', userController.index.bind(userController))
    this._app.get('/users/create', userController.create.bind(userController))
    this._app.post('/users', validator.storeUser, userController.store.bind(userController))
    this._app.get('/users/:id', userController.show.bind(userController))
    this._app.get('/users/:id/edit', userController.edit.bind(userController))
    this._app.put('/users/:id', validator.updateUser, userController.update.bind(userController))
    this._app.get('/users/:id/delete', userController.delete.bind(userController))
    this._app.delete('/users/:id', userController.destroy.bind(userController))
  }
}