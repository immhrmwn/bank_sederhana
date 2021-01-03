const { Customer, Account } = require('../models')
const checkBalance = require('../helpers/checkBalance')

class Controller {
  static enter(req, res){
    res.send('<a href="/customers">enter</a>')
  }
  static getCustomer(req, res){
    Customer.findAll({
      order: [['fullName', 'ASC']]
    })
    .then(data => {
      res.render('customer', {data})
    })
    .catch(err => {
      res.send(err)
    })
  }
  static register(req, res){
    res.render('register')
  }
  static registerPost(req, res){
    const newCustomer = {
      identityNumber: req.body.identityNumber,
      fullName: req.body.fullName,
      address: req.body.address,
      birthDate: req.body.birthDate || '2000-01-01',
      gender: req.body.gender
    }
    Customer.create(newCustomer)
    .then(data => {
      res.redirect('/customers')
    })
    .catch(err => {
      const errmsg = []
      err.errors.forEach(el => {
        errmsg.push(el.message)
      })
      res.send(errmsg)
    })
  }
  static editProfile(req, res){
    const id = +req.params.idCustomer
    Customer.findByPk(id)
    .then(data => {
      // console.log(data)
      res.render('editCustomer', {data})
    })
    .catch(err => {
      res.send(err)
    })
  }
  static editProfilePost(req, res){
    const updateCustomer = {
      identityNumber: req.body.identityNumber,
      fullName: req.body.fullName,
      address: req.body.address,
      birthDate: req.body.birthDate || '2000-01-01',
      gender: req.body.gender
    }
    const id = req.params.idCustomer
    Customer.update(updateCustomer, {
      where: {id: id}
    })
    .then(data => {
      res.redirect('/customers')
    })
    .catch(err => {
      const errmsg = []
      err.errors.forEach(el => {
        errmsg.push(el.message)
      })
      res.send(errmsg)
    })
  }
  static getAccount(req, res){
    const custID = +req.params.idCustomer
    let name = null
    Customer.findByPk(custID)
    .then(data => {
      name = data.fullName
      return Account.findAll({
        where: {
          customer_id: custID
        }
      })
    })
    .then(data => {
      res.render('accounts', {
        data,
        name,
        id: custID
      })
    })
    .catch(err => {
      res.send(err)
    })
  }
  static getAccountPost(req, res){
    const custID = +req.params.idCustomer
    const newAccount = {
      type: req.body.type,
      balance: +req.body.balance,
      customer_id: custID,
      accountNumber: null
    }
    Account.create(newAccount)
    .then(data => {
      res.redirect(`/customers/${custID}/accounts`)
    })
    .catch(err => {
      const errmsg = []
      err.errors.forEach(el => {
        errmsg.push(el.message)
      })
      res.send(errmsg)
    })
  }
  static transfer(req, res){
    const accountID = +req.params.idAccount
    let dataID;
    Account.findByPk(accountID)
    .then(data => {
      dataID = data
      return Account.findAll({
        include: 'Customer'
      })
    })
    .then(data => {
      // console.log(data[0].Customer.fullName)
      res.render('transfer', {
        data: dataID,
        data2: data
      })
    })
    .catch(err => {
      res.send(err)
    })
  }
  static transferPost(req, res){
    const idFrom = +req.params.idAccount
    let balance
    const idCus = +req.params.idCustomer
    const amount = +req.body.amount
    const idTf = +req.body.idTf
    Account.findByPk(idFrom)
    .then(data => {
      balance = data.balance
      checkBalance(balance, amount, res)
      return Account.decrement('balance', {
        by: amount,
        where: {id: idFrom}
      })
    })
    .then(data => {
      return Account.increment('balance', {
        by: amount,
        where: {id: idTf}
      })
    })
    .then(data => {
      res.redirect(`/customers/${idCus}/accounts`)
    })
    .catch(err => {
      const errmsg = []
      err.errors.forEach(el => {
        errmsg.push(el.message)
      })
      res.send(errmsg)
    })
  }
}

module.exports = Controller