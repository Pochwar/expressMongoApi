import UserModel from "../models/UserModel";

export default class UserRepository {
  constructor() {
    this.userModel = UserModel;
  }

  getUsers() {
    return new Promise((resolve, reject) => {
      this.userModel.find({})
        .then(kittens => resolve(kittens))
        .catch(err => reject(err));
    });
  }

  getUserById(id) {
    return new Promise((resolve, reject) => {
      this.userModel.findOne({_id: id})
        .then(user => resolve(user))
        .catch(err => reject(err))
    });
  }

  storeUser(data) {
    return new Promise((resolve, reject) => {
      this.userModel.create({
        name: data.name,
        email: data.email,
        password: data.password
      })
        .then(user => resolve(user))
        .catch(err => reject(err));
    });
  }

  deleteUser(id) {
    return new Promise((resolve, reject) => {
      /*
      Note : User's addresses are deleted with the pre remove hook on user's model
      the hooks only triggers when using remove() method on the instance and not on the model
       */
      this.userModel.findOne({_id: id})
        .then(user => {
          user.remove()
            .then(user => {
              const msg = `user ${user._id} successfully deleted`
              resolve(msg)
            })
            .catch(err => reject(err))
        })
        .catch(err => reject(err));
    });
  }

  updateUser(data) {
    return new Promise((resolve, reject) => {
      this.userModel.update(
        {_id: data.id},
        {
          name: data.name,
          email: data.email
        },
        (err, response) => {
          if(err) {
            reject(err)
          }
          else {
            resolve(response)
          }
        }
      )
    })
  }

  storeUserAddress(data) {
    return new Promise((resolve, reject) => {
      this.addressModel.create({
        street: data.street,
        postcode: data.postcode,
        city: data.city,
        country: data.country
      })
        .then(address => {
          this.userModel.update(
            {_id: data.userId},
            {$push: {address: address._id}}
          )
            .then(() => resolve(address))
            .catch(err => {
              reject(err)
            })
        })
        .catch(err => {
          console.log('test2')
          reject(err)
        })
    })
  }

  getUserAddresses(userId) {
    return new Promise((resolve, reject) => {
      this.userModel.findOne({_id: userId})
        .populate('address')
        .exec((err, user) => {
          if(err) {
            reject(err)
          } else {
            resolve(user.address)
          }
        })
    });
  }

  getUserAddressById(userId, addressId) {
    return new Promise((resolve, reject) => {
      this.userModel.findOne({_id: userId})
        .then(user => {
          if(user.address.indexOf(addressId) === -1){
            reject('address not referenced for this user')
          } else {
            this.addressModel.findOne({_id: addressId})
              .then(address => resolve(address))
          }
        })
        .catch(err => reject(err))
    })
  }

  deleteUserAddressById(userId, addressId) {
    return new Promise((resolve, reject) => {
      this.userModel.findOne({_id: userId})
        .then(user => {
          if(user.address.indexOf(addressId) === -1){
            reject('address not referenced for this user')
          } else {
            this.addressModel.remove({_id: addressId})
              .then(() => resolve(`Address ${addressId} has been deleted`))
          }
        })
        .catch(err => reject(err))
    })
  }
}
