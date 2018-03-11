import UserSeeds from './users/UserSeeds'
import MongooseHandler from "services/MongooseHandler"

const mongoose = new MongooseHandler();

mongoose.connect()
  .then(msg => {
    console.log(msg)

    seedUsers(process.argv[2])
      .then(res => {
        console.log(res)
        mongoose.disconnect()
      })

  })
  .catch(error => console.log(error));



function seedUsers(nb) {
  return new Promise((resolve, reject) =>  {
    const nbUsers = nb || 10;
    for (let i = 1; i <= nbUsers; i++) {
      UserSeeds.seed(i, nbUsers)
        .then(msg => {
          console.log(msg)
          if (i == nbUsers) {
            resolve(`${nbUsers} users successfully created`)
          }
        })
    }
  })
}