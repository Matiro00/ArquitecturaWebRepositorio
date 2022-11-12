module.exports = class User {
    constructor(id, name, email, password, isActive){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.isActive = isActive;
    }

}