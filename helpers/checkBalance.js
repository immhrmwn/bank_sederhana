function checkBalance(balance, amount, res) {
  if(balance < amount){
    console.log('gagal!')
    // return new Error('Insufficient balance')
    return res.send('Insufficient balance')
  }
}

module.exports = checkBalance