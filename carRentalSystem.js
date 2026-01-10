
class Rental{
    constructor(rentalId, customer, car, rentalDuration){
        if(new.target === Rental){
            throw new TypeError("can't instancied from Rental");
        }

        this.rentalId = rentalId;
        this.customer = customer;
        this.car = car;
        this.rentalDuration = rentalDuration;
    }

    rentCar(){
        throw new Error("abstarct method");
    }

    returnCar(){
        throw new Error("abstract method");
    }

    calculateRentalPrice(){
        throw new Error("abstract method");         
    }

    seasonFactor(percent){
       return 1 + percent / 100;
    }

    demandFactor(percent){
        return 1 + percent / 100;
    }
    
}

class Car{
    constructor(make, model, rentalPricePerDay){
        if(make == ""){
            throw new ValidationError("invalid make input");
        }else{
            this.make = make;
        }

        if(model == ""){
            throw new ValidationError("invalid model input");
        }else{
            this.name = this.name;
        }

        if(rentalPricePerDay <= 0){
            throw new ValidationError("day can't be 0 or non postive");
        }else{
            this.rentalPricePerDay = rentalPricePerDay;
        }

        this.availability = true;
    }

    markRented(){
        return this.availability = false;
    }

    markAvailable(){
        return this.availability = true;
    }
}

class EconomyCar extends Car{
    constructor(mark, model, rentalPricePerDay){
        super(mark, model, rentalPricePerDay);
    }
}

class LuxuryCar extends Car{
    constructor(mark, model, rentalPricePerDay, insurance, premiumService){
        super(mark, model, rentalPricePerDay);
        this.insurance = insurance;
        this.premiumService = premiumService;
    }
}

class Customer{
    constructor(name, contactInfo){
        if(name == ""){
            throw new ValidationError("invalid customer name");
        }else{
            this.name = name;
        }
        
        if(contactInfo == "" ){
            throw new ValidationError("invalid contact info");
        }else{
            this.contactInfo = contactInfo;
        }
        this.rentalHistory = [];
    }

    addRental(rental){
        return this.rentalHistory.push(rental);
    }

    searchCars(cars, filters = {}){
        return cars.filter(car => {
            if(!car.availability) return false;

            if(filters.make && car.make !== filters.make) return false;
            if(filters.model && car.model !== filters.model) return false;
            if(filters.price && car.rentalPricePerDay < filters.price) return false;

            return true;
        });
    }

    viewRentalHistory(){
        this.rentalHistory.forEach(rental => console.log(`${rental.rentalId}, ${rental.car.make}, ${rental.car.model}`))
    }
}

class RentCar extends Rental{
   
    rentCar(){
        if(!this.car.availability){
            throw new CarNotAvailableError("car is rented");
        }

        this.car.markRented();
        this.customer.addRental(this);
    }

    returnCar(){
        return this.car.markAvailable();
    }

     calculateRentalPrice(seasonPercent = 0, demandPercent = 0){
        let total = this.car.rentalPricePerDay * this.rentalDuration;

        if(this.car instanceof LuxuryCar){
            total += (this.car.insurance + this.car.premiumService) * this.rentalDuration;
        }

        total *= this.seasonFactor(seasonPercent);
        total *= this.demandFactor(demandPercent);

        return Math.floor(total);
     }  
}


class CarNotAvailableError extends Error{
    constructor(m){
        super(m);
        this.name = "CarNotAvailableError";
    }
}

class InvalidRentalDurationError extends Error{
    constructor(m){
        super(m);
        this.name = "InvalidRentalDurationError";
    }
}

class ValidationError extends Error{
    constructor(m){
        super(m);
        this.name = "ValidationError";
    }
}

