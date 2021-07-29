export default class UserDM {
  _id = ''
  email = ''
  firstName = ''
  lastName = ''
  type = ''
  isActive = ''
  createdAt = ''

  readFromObj(obj) {
    this._id = obj._id
    this.email = obj.email
    this.firstName = obj.firstName
    this.lastName = obj.lastName
    this.type = obj.type
    this.isActive = obj.isActive
    this.createdAt = obj.createdAt
  }
}
