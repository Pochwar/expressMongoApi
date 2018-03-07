import UserRepository from "repository/UserRepository";
import HttpStatusService from "services/HttpStatusService";

export default class UserController {
  constructor() {
    this.userRepository = new UserRepository();
    this.httpStatusService = new HttpStatusService();
  }

  index(req, res) {
    this.userRepository.getUsers()
      .then(users => this.sendJsonResponse(res, this.httpStatusService.ok, users))
      .catch(err => this.sendJsonResponse(res, this.httpStatusService.internalServerError, err));
  }

  create(req, res) {
    return res.render('users/create');
  }

  store(req, res) {
    const data = {};

    data.name = req.body.name;
    data.email = req.body.email;
    data.password = req.body.password;

    this.userRepository.storeUser(data)
      .then(user => res.redirect(`/users/${user._id}`))
      .catch(err => this.sendJsonResponse(res, this.httpStatusService.internalServerError, err));
  }

  show(req, res) {
    this.userRepository.getUserById(req.params.id)
      .then(user => this.sendJsonResponse(res, this.httpStatusService.ok, user))
      .catch(err => this.sendJsonResponse(res, this.httpStatusService.internalServerError, err));
  }

  edit(req, res) {
    this.userRepository.getUserById(req.params.id)
      .then(user => {
        return res.render('users/edit', {user: user});
      })
      .catch(err => this.sendJsonResponse(res, this.httpStatusService.internalServerError, err));
  }

  update(req, res) {
    const data = {};

    data.id = req.body.id;
    data.name = req.body.name;
    data.email = req.body.email;

    this.userRepository.updateUser(data)
      .then(msg => this.sendJsonResponse(res, this.httpStatusService.ok, msg))
      .catch(err => this.sendJsonResponse(res, this.httpStatusService.internalServerError, err));
  }

  delete(req, res) {
    this.userRepository.getUserById(req.params.id)
      .then(user => {
        return res.render('users/delete', {user: user});
      })
      .catch(err => this.sendJsonResponse(res, this.httpStatusService.internalServerError, err));
  }

  destroy(req, res) {
    const id = req.params.id;
    this.userRepository.deleteUser(id)
      .then(msg => this.sendJsonResponse(res, this.httpStatusService.ok, msg))
      .catch(err => this.sendJsonResponse(res, this.httpStatusService.internalServerError, err));
  }

  checkUserFormData(req, res) {
    if (!req.body.name) {
      return res.send('field "name" is required')
    }
    if (!req.body.email) {
      return res.send('field "email" is required')
    }
    if (!req.body.password) {
      return res.send('field "password" is required')
    }
  }

  sendJsonResponse(res, code, content) {
    res.status(code);
    res.json(content);
  }
}