export class Car{
  brand;
  model;
  speed = 0;
  isTrunkOpen;

  constructor(carDetails){
    this.brand = carDetails.brand;
    this.model = carDetails.model;
    this.isTrunkOpen = false;
  }

  displayInfo(){
    console.log(`${this.brand} ${this.model}, Speed: ${this.speed} km/h, Trunk: ${this.isTrunkOpen?'Open':'Closed'}`);
  }

  go(){
    if(this.speed<=200 && !this.isTrunkOpen){
    this.speed+=5;
    }
  }

  brake(){
    if(this.speed>0){
      this.speed-=5;
    }  
  }

  openTrunk(){
    if(this.speed === 0){
      this.isTrunkOpen =true;
    }
  }

  closeTrunk(){
    this.isTrunkOpen = false;
  }
}

const car1 = new Car({brand:'Toyota', model:'Corolla'});
const car2 = new Car({brand:'Tesla', model:'Model 3'});

/*car1.go();
car2.go();
car1.displayInfo();
car2.displayInfo();

car1.brake();
car2.brake();
car1.openTrunk();
car2.openTrunk();
car1.displayInfo();
car2.displayInfo();*/

class RaceCar extends Car{
acceleration ;

constructor(carDetails){
  super(carDetails);
  this.acceleration = carDetails.acceleration;
}

go(){
  if(this.speed<=300){
  this.speed+=this.acceleration;
  }
}

openTrunk(){
  console.log('Race Cars do not have a Trunk');
}

closeTrunk(){
  console.log('Race Cars do not have a Trunk');
}
}

const raceCar = new RaceCar({brand:'McLaren', model:'F1', acceleration:20});
raceCar.displayInfo();
raceCar.go();
raceCar.go();
raceCar.go();
raceCar.displayInfo();
raceCar.openTrunk();
raceCar.closeTrunk();
raceCar.brake();
raceCar.displayInfo();
