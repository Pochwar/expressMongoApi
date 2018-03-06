import Rules from '../rules/Rules'

export default class ValidatorService {
  storeUser(req, res, next) {
    Rules._nameFieldRules(req, res)
    Rules._emailFieldRules(req, res)
    Rules._passwordFieldRules(req, res)

    next()
  }

  updateUser(req, res, next) {
    Rules._nameFieldRules(req, res)
    Rules._emailFieldRules(req, res)

    next()
  }
}
