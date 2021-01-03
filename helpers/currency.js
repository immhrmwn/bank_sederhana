function currency(balance) {
  // return `Rp. ${balance.toLocaleString(['ban', 'id']).replace(',','.')},00`
  return balance.toLocaleString('en-ID', {style: 'currency', currency: 'IDR'})
}

module.exports = currency