module.exports = class Checkout {
    constructor(idUser, items, date, totalPrice ){
        this.idUser = idUser;
        this.date = date;
        this.totalPrice = totalPrice;
    }
}