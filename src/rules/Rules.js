import validator from 'validator'

export default class Rules {
  static _nameFieldRules(req, res) {
    if(validator.isEmpty(req.body.name)) {
      res.send('field "name" is required')
    }
  }

  static _emailFieldRules(req, res) {
    if(validator.isEmpty(req.body.email)) {
      res.send('field "email" is required')
    }
    if(!validator.isEmail(req.body.email)) {
      res.send('field "email" has a bad format')
    }
  }

  static _passwordFieldRules(req, res) {
    if(validator.isEmpty(req.body.password)) {
      res.send('field "password" is required')
    }
  }
}