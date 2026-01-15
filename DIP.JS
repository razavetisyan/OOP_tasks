// VAT ORINAK
class Payment{
    pay(){
        throw new Error("method must be implemented");
    }
}

class CreditCard extends Payment{
    pay(amount){
        console.log(`Paid ${amount} using credit card`);
    }
}

class Person{
    constructor(){
        this.user = new CreditCard();
    }

    paying(amount){
        return this.user.pay(amount);
    }
}

// LAV ORINAK
class Payment {
    pay() {
        throw new Error("method must be implemented");
    }
}

class CreditCard extends Payment {
    pay(amount) {
        console.log(`Paid ${amount} using credit card`);
    }
}

class Person {
    constructor(user){
        this.user = user;
    }

    paying(amount){
        return this.user.pay(amount);
    }
}
