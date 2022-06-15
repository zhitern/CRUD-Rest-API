export  class Employee {
    constructor (public id: Number, public name: String, public salary: Number, public department: Department){

    }
    
}

enum Department {
    HR,
    PS,
}