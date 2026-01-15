// VAT ORINAK
class PaymentType{
    pay(type, amount){
        if(type == "credit card"){
            console.log(`Paid ${amount} using credit card`);
        }

        if(type == "terminal"){
            console.log(`Paid ${amount} using terminal`);
        }

        if(type == "pay pal"){
            console.log(`Paid ${amount} using pay pal`);
        }
    }
}

// LAV ORINAK
class PaymentType{
    pay(amount){
        throw new Error("method not implemented");
    }
}

class CreditCard extends PaymentType{
    pay(amount){
        console.log(`Paid ${amount} using credit card`);
    }  
}

class Terminal extends PaymentType{
    pay(amount){
        console.log(`Paid ${amount} using terminal`);
    }
}

class PayPal extends PaymentType{
    pay(amount){
        console.log(`Paid ${amount} using pay pal`);
    }
}

