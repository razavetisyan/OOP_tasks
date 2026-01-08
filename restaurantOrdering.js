
class Menu{
    #dishes;

    constructor(){
        if(new.target === Menu){
            throw new TypeError("can't instancieted from Menu");
        }

        this.#dishes = {};
    }

    get dishes(){
        return this.#dishes;
    }

    set dishes(dishes){
        if(dishes == undefined){
            throw new DishNotFoundError("must be input dish");
        }

        return this.#dishes = dishes;
    }

    addDish(dish){
        throw new Error("abstract method");
    }

    removeDish(dishName){
        throw new Error("abstract method");
    }

    viewMenu(){
        throw new Error("abstract method");
    }

    beCoocked(){
        throw new Error("abstract method");
    }

    increasePrice(dishName, percent){
        if(!(dishName in this.#dishes)){
            throw new DishNotFoundError("dish not found");
        }
        
        this.#dishes[dishName] = Math.floor(this.#dishes[dishName]* (1 + percent / 100));
    }

    decreasePrice(dishName, percent){
        if(!(dishName in this.#dishes)){
            throw new DishNotFoundError("dish not found");
        }

        this.#dishes[dishName] = Math.floor(this.#dishes[dishName]* (1 - percent / 100)); 
    }

    applyDemandPricing(popularDishNames){
        for(const dish of popularDishNames){
            if(dish in this.#dishes){
                this.increasePrice(dish, 20);
            }
        }
    }

}

class AppetizersMenu extends Menu{
    constructor(){
        super();
        this.price = 13000;
        this.time = "15 minutes";
    }

    addDish(dish, price){
        if(price > 10000){
            throw new InvalidOrderError("price cant't be bigger than 10.000");
        }
        this.dishes[dish] = price;
    }

    removeDish(dishName){
        delete this.dishes[dishName];
    }

    viewMenu(){
        for(const [dish, price] of Object.entries(this.dishes)){
            console.log(`${dish} : ${price} $`);
        }
    }

    beCoocked(){
        console.log("your appetizers will be coocked from 13 minutes");
    }
}

class EntreesMenu extends Menu{
    constructor(){
        super();
        this.price = 15000;
        this.time = "20 minutes";
    }

    addDish(dish, price){
        if(price > 5000){
            throw new InvalidOrderError("price can't be bigger 5000");
        }
        this.dishes[dish] = price;
    }

    removeDish(dishName){
        delete this.dishes[dishName];
    }

    viewMenu(){
        for(const [dish, price] of Object.entries(this.dishes)){
            console.log(`${dish} : ${price} $`);
        }
    }

    beCoocked(){
        console.log("your entrees will be coocked from 15 minutes");
    }
}

class DessertsMenu extends Menu{
   constructor(){
    super();
    this.price = 25000;
    this.time = "25 minutes";
   }

    addDish(dish, price){
        if(price > 15000){
            throw new InvalidOrderError("price can't be bigger 15.000");
        }
        this.dishes[dish] = price;
    }

    removeDish(dishName){
        delete this.dishes[dishName];
    }

    viewMenu(){
        for(const [dish, price] of Object.entries(this.dishes)){
            console.log(`${dish} : ${price} $`);
        }
    }

    beCoocked(){
        console.log("your desert will be coocked from 10 minutes");
    }
}

class Customer{
    constructor(name, contactInfo){
        this.name = name;
        this.contactInfo = contactInfo;
        this.orderHistory = [];
    }

    placeOrder(order){
        this.orderHistory.push(order);
    }

    viewOrderHistory(){
        return this.orderHistory;
    }
}

class Order{
    #totalPrice;
    constructor(customer, totalPrice){
        this.customer = customer;
        this.#totalPrice = totalPrice;
        this.dishes = [];

        Object.defineProperty(this, "dishName", nameDescriptor);
        Object.defineProperty(this, "price", priceDescriptor);
        
    }
    get totalPrice(){
        return this.#totalPrice;
    }

    set totalPrice(totalPrice){
        return this.#totalPrice = totalPrice;
    }

    addDish(dishName, menus){
      for(const menu of menus){
        if(dishName in menu.dishes){
            this.dishes.push(dishName);
            return;
        }
      }
        throw new DishNotFoundError("can't find this dish in menu");
    }

    getTotal(menus){
        let total = 0;

        for(const dish of this.dishes){
            for(const menu of menus){
                if(menu.dishes[dish] !== undefined){
                    total += menu.dishes[dish];
                    break;
               }
            }
        }
        this.#totalPrice = total;
        return total;
    }

    viewSummary(menus){
        return {
            customer : this.customer.name,
            dishes : [...this.dishes],
            total : this.getTotal(menus)
        }
    }
}

const nameDescriptor = {
    get(){
        return this._dishName;
    },

    set(dishName){
        if((dishName == "") || !(this.dishes.includes(dishName))){
            throw new DishNotFoundError("name must be in dishes and must be string")
        }
        this._dishName = dishName;
    }
}

const priceDescriptor = {
    get(){
        return this._price;
    },

    set(price){
        if(price < 0){
            throw new InvalidOrderError("price must be positive");
        }
        this._price = price;
    }
}

class Dish{
    constructor(name, price){
        this.name = name;
        this.price = price;
    }
}

class Appetizer extends Dish{
    constructor(name, price){
        super(name, price);
        this.type = "Appetizer";
    }
}

class Entree extends Dish{
    constructor(name, price){
        super(name, price);
        this.type = "Entree";
    }
}

class Dessert extends Dish{
    constructor(name, price){
        super(name, price);
        this.type = "Dessert";
    }
}

class DishNotFoundError extends Error{
    constructor(m){
        super(m);
        this.name = "DishNotFoundError";
    }
}

class InvalidOrderError extends Error{
    constructor(m){
        super(m);
        this.name = "InvalidOrderError";
    }
}

