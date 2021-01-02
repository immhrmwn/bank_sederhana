const { Customer, Account } = require('../models')
class Controller {
  static enter(req, res){
    res.send('<a href="/customers">enter</a>')
  }
  static getCustomer(req, res){
    res.send('customers')
  }
  static register(req, res){}
  static registerPost(req, res){}
  static editProfile(req, res){}
  static editProfilePost(req, res){}
  static getAccount(req, res){}
  static getAccountPost(req, res){}
  static transfer(req, res){}
  static transferPost(req, res){}
}

module.exports = Controller