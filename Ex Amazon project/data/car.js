export class Car{
  brand;
  model;
  speed = 0;

  constructor(brand, model){
    this.brand = brand;
    this.model = model;
  }

  displayInfo(){
    console.log(`${this.brand} ${this.model}, Speed: ${this.speed} km/h`);
  }

  go(){
    if(this.speed<=200){
    this.speed+=5;
    }
  }

  brake(){
    if(this.speed>=0){
      this.speed-=5;
    }  
  }
}

const car1 = new Car('Toyota', 'Corolla');
const car2 = new Car('Tesla', 'Model 3');

car1.displayInfo();
car2.displayInfo();
car1.go();
car1.go();
car2.go();
car1.displayInfo();
car2.displayInfo();
car1.brake();
car2.brake();
car1.displayInfo();
car2.displayInfo();