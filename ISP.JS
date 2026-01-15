// VAT ORINAK
class Teacher{
    teach(){
        console.log("teaching");
    }

    study(){
        console.log("studing");
    }
}

class Student extends Teacher{};

// LAV ORINAK
class CanStudy{
    study(){
        console.log("studing");
    }
}

class CanTeach{
    teach(){
        console.log("teaching");
    }
}

class Student extends CanStudy{};
class Teacher extends CanTeach{};