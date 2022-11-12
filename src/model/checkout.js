module.exports = class Checkout {
    constructor(id,idUser, items, date, totalPrice ){
        this.id = id;
        this.idUser = idUser;
        this.items = items;
        this.date = date;
        this.totalPrice = totalPrice;
    }
}