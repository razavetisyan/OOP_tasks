
class BankAccount{

    #balance;
    #transactions = [];

    constructor(accountNumber, type, balance){
        if(new.target === BankAccount){
            throw new TypeError("can't instanciated from BankAccount");
        }

        this.accountNumber = accountNumber;
        this.#balance = balance;
        if(typeof type !== "string" && (type !== "individual" || type !== "joint")){

            throw new ValidationError("must be string ");
        }else{
            this.type = type;
        }
    }
    get balance(){
        
         return this.#balance;
    }
    
    set balance(amount){
        if(amount < 0){
            throw new ValidationError("can't be no positive");
        }
        this.#balance = amount;
    }

   get transactions(){
        return this.#transactions;

    }
    setTransaction(transaction) {
        this.#transactions.push(transaction)
    }
    set transactions(name){
        if(name == ""){
            throw new ValidationError("must write name of person");
        }
      
        this.#transactions.push(name);
    }

    deposit(amount){
        throw new Error("abstract method");
    }

    withdraw(amount){
        throw new Error("abstract method");
    }

    get_balance(){
        throw new Error("abstract method");
    }

    transferFunds(targetAccount, amount, actor){
        throw new Error("abstract method");
    }

    getTransactionSummary(limit = 10){
        let res = [];
       
        for(let i = 0; i < this.transactions.length; ++i){

              if(this.transactions.length > limit){
                this.transactions.length = this.transactions.length - limit;
                res.push(this.transactions[i]);
              }

                res.push(this.transactions[i]);
        }
     
        return res;
    }

    getAllTransactions(){
        return this.transactions;
    }
}

class IndividualAccount extends BankAccount{ 
  
        constructor(accountNumber, type, balance){
            super(accountNumber, type, balance);
        }

        deposit(amount){
            let date = Date.now().toString();
            if(amount <= 0 ){
                throw new InsufficientFundsError("must be > 0");
            }
             this.balance += amount;

             this.setTransaction(new Transaction(this.accountNumber, amount, "deposit", date));
        }

        withdraw(amount){
            let date = Date.now().toString();
            if(amount > this.balance){
                throw new InsufficientFundsError("can't be withdraw amount");
            }
            this.balance -= amount;
            this.setTransaction(new Transaction(this.accountNumber, amount, "withdraw", date))
        }

        get_balance(){
            return this.balance;
        }

        transferFunds(targetAccount, amount, actor){
            let date = Date.now().toString();
            this.balance -= amount;
            targetAccount.balance += amount;
            this.setTransaction(new Transaction(this.accountNumber, amount, "transfer", date));
        }
}

class JointAccount extends BankAccount{
    
    constructor(accountNumber, type, balance, ...owners) {
        super(accountNumber, type, balance);

        this.owners = [...owners];
    }
    

    deposit(amount){
        let date = Date.now().toString();
        if(amount < 0){
            throw new InsufficientFundsError("must be > 0");
        }
        this.balance += amount;
        this.setTransaction(new Transaction(this.accountNumber, amount, "deposit", date));
    }

    withdraw(amount){
        let date = Date.now().toString();
        if(amount > this.balance){
            throw new InsufficientFundsError("can't be no positive");
        }
        this.balance -= amount;
        this.setTransaction(new Transaction(this.accountNumber, amount, "withdraw", date))
    }

    get_balance(){
        return this.balance;
    }

    transferFunds(targetAccount, amount, actor){

        let date = Date.now().toString();
        for(const person of this.owners){
            if(person == actor) {
                this.balance -= amount;
                targetAccount.balance += amount;
                this.setTransaction(new Transaction(this.accountNumber, amount, "transfer", date));
                return;
            }
        }
        throw new AuthorizationError("can't find person")
    }   
}

class Customer{
    constructor(name, contactInfo){
        Object.defineProperty(this, "name", nameDescriptor);
        Object.defineProperty(this, "contactInfo", contactInfoDescriptor);
        
        this.name = name;
        this.contactInfo = contactInfo;
        this.accounts = [];
    }

    addAccount(account){
        this.accounts.push(account);
    }

    viewAccounts(){
        return this.accounts;
    }

    viewTransactionHistory(accountNumber){
        return this.accounts[accountNumber];
    }
}

class Transaction{
    constructor(accountNumber, amount, transactionType, fromAccount, toAccount){
        Object.defineProperty(this, "accountNumber", accountNumberDescriptor);
        Object.defineProperty(this,"amount",transactionAmountDescriptor);
        this.accountNumber = accountNumber;
        this.amount = amount;
        
       if(typeof transactionType !== "string" && (transactionType !== "deposit" || transactionType !== "withdraw" || transactionType !== "transfer")){
            throw new InvalidTransactionError("invalid transaction");
        }else{
            this.transactionType = transactionType;
        }

        this.timestamp = new Date().toString();

        if(fromAccount){
            this.fromAccount = fromAccount;
        }

        if(toAccount){
            this.toAccount = toAccount;
        }
        

    }
}

const accountNumberDescriptor = {

    get(){
        return this._accountNumber;
    },

    set(accountNumber){
        if(accountNumber.length !== 10 && typeof accountNumber !== "string"){
            throw new ValidationError("length must be 10");
        }

        this._accountNumber = accountNumber;
    }
}

const balanceDescriptor = {
    get(){
        return this._balance;
    },

    set(balance){
        if(balance < 0){
            throw new InsufficientFundsError("must be positive");
        }
        
        this._balance = balance;
    }
}

const transactionAmountDescriptor = {
    get(){
        return this._transactionAmount;
    },

    set(transactionAmount){
        if(transactionAmount < 0){
            throw new InsufficientFundsError("must be positive");
        }

        this._transactionAmount = transactionAmount;
    }
}

const nameDescriptor = {
    get(){
        return this._name;
    },

    set(name){
        if(name == ""){
            throw new ValidationError("must be write name");
        }

        this._name = name;
    }
}

const contactInfoDescriptor = {
    get(){
        return this._contactInfo;
    },

    set(contactInfo){

        if(typeof contactInfo !== "string"){
            throw new ValidationError("must be string");
        }
        const regEx = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;

       if(!regEx.test(contactInfo)){
        throw new ValidationError("invalid format");
       }

       this._contactInfo = contactInfo;
    }
}


class InvalidTransactionError extends Error{
    constructor(m){
        super(m);
        this.name = "InvalidTransactionError"
    }
}


class AuthorizationError extends Error{
    constructor(m){
        super(m);
        this.name = "AuthorizationError"
    }
}


class InsufficientFundsError extends Error{
    constructor(m){
        super(m);
        this.name = " InsufficientFundsError ";
    }
}


class ValidationError extends Error{
    constructor(m){
        super(m);
        this.name = "ValidationError";
    }
}

