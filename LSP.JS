// VAT ORINAK
class Person{
    constructor(name){
        this.name = name;
    }

    eat(){
        console.log(`${this.name} can eat`);
    }

    old(age){
        if(age > 18){
            console.log("person is older");
        }

        return age;
    }
}

class Student extends Person{
    eat(){
        throw new Error("student can't eat");
    }

    old(age){
        if(age > 25){
            console.log("person is older");
        }

        return age * 2;
    }
}
// LAV ORINAK
class Person {
    constructor(name){
        this.name = name;
    }

    eat(){
        console.log(`${this.name} can eat`);
    }

    old(age){
        if(age > 18){
            console.log(`person is older`);
        }

        return age;
    }
}

class Student extends Person{
    eat(){
        console.log(`${this.name} can eat`);
    }

    old(age){
        if(age > 12){
            console.log("person is older");
        }
        
        return age ;
    }
}

function test(person){
    const result = person.old(15);
    console.log(result);
}

test(new Person("A", 15));   
test(new Student("B", 15));  
