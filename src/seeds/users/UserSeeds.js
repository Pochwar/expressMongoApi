import faker from 'faker'
import UserRepository from 'repository/UserRepository'

export default class UserSeeds {
  static seed(i, nb) {
    return new Promise((resolve,reject) => {
      const userRepository = new UserRepository();

      const firstname = faker.name.firstName();
      const lastname = faker.name.lastName();

      const data = {
        name: firstname + ' ' + lastname,
        email: faker.internet.email(firstname, lastname),
        password: 'secret'
      }
      userRepository.storeUser(data)
        .then(user => resolve(`Created user ${i}/${nb} : ${user.name}`))
        .catch(err => reject(err))
    })
  }
}