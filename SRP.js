// VAT ORINAK
class Bank{
    constructor(name, balance){
        this.name = name;
        this.balance = balance;
    }

    getUserName(){
        return this.name;
    }

    deposit(amount){
        return this.balance += amount;
    }

    withdraw(amount){
        return this.balance -= amount;
    }

    getBalance(){
        return this.balance;
    }
}


// LAV ORINAK
class Bank{
    constructor(name, balance){
        this.name = name;
        this.balance = balance;
    }
}

class Deposit{
    deposit(user, amount){
        return user.balance += amount;
    }
}

class UserName{
    getUserName(user){
        return user.name;
    }
}

class Withdraw{
    withdraw(user, amount){
        return user.balance -= amount;
    }
}

class GetBalance{
    getBalance(user){
        return user.balance;
    }
}
