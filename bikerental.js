class BikeRentalService {
  constructor(name, location) {
    //Should have these 3 properties:
    //name - string
    //location - string
    //availableBikes - empty array
    //At the initialization of the BikeRentalService class, the constructor accepts the name and location.
    //Hint: You can add more properties to help you finish the task.

    this.name = name;
    this.location = location;
    this.availableBikes = [];
  }

  addBikes(bikes) {
    //This method adds bikes to the bike rental service. The method takes 1 argument: bikes (array of strings).
    //Every element into this array is information about the bike in the format:
    //"{brand} {quantity} {price}"
    //They are separated by a dash.
    //Example: ["Mountain Bike-5-150", "City Bike-10-100", "Electric Bike-3-200"...]
    //If the brand of the current bike is already present in availableBikes array, add the new quantity to the old one and update the old price per bike only if the current one is higher.
    //Otherwise, add the bike, with properties: {brand, quantity, price} to the availableBikes array.
    //In all cases, you must finally return a string in the following format:
    //`Successfully added {brand1}, {brand2}, …{brandN}`
    //Note: When returning the string, keep in mind that the different brands of bikes must be:
    //Unique - for instance:
    //"Successfully added Mountain Bike, City Bike, Electric Bike" - is a correctly 	returned string
    //"Successfully added Mountain Bike, City Bike, Mountain Bike" - is not a 	correctly returned string
    //Separated by comma and space (, )

    let brands = {};
    let addedBrands = [];

    for (let bike of bikes) {
      let [brand, quantity, price] = bike.split("-");

      if (brands[brand]) {
        brands[brand].quantity += parseInt(quantity);
        brands[brand].price = Math.max(brands[brand].price, parseInt(price));
      } else {
        brands[brand] = {
          brand: brand,
          quantity: parseInt(quantity),
          price: parseInt(price),
        };
      }
    }

    for (let brand in brands) {
      this.availableBikes.push(brands[brand]);
      addedBrands.push(brand);
    }

    return `Successfully added ${addedBrands.join(", ")}`;
  }

  rentBikes(selectedBikes) {
    // With this method, users can rent bikes from the rental service. The method takes 1 argument: selectedBikes (array of strings).
    //Every element in this array is information about the rented bikes in the format:
    //"{brand} {quantity}"
    //They are separated by a dash.
    //Example: ["Mountain Bike-5", "City Bike-10", "Electric Bike-3"...]
    //For each element of the array selectedBikes, check:
    //Note: It is crucial to return one of the strings ("Some of the bikes are unavailable..." or "Enjoy your ride! You must pay the following amount $${totalPrice.toFixed(2)}.") after the function goes through every element of the selectedBikes array and updates the bike quantities that match the criteria.
    //If the brand of the current bike is not present in the availableBikes array, or if the brand is present but the quantity selected by the customer exceeds the available quantity recorded in the availableBikes array, the following message should be returned:
    //"Some of the bikes are unavailable or low on quantity in the bike rental service."

    //Otherwise, if the above conditions are not met, you have to calculate the price for the given bike by multiplying the price per bike for the given brand by the quantity desired by the user. Then reduce the quantity recorded in the availableBikes array.
    //Note: Add a variable that will calculate the total price obtained from the individual prices of each bike in the array and return this string in the following format:

    //`Enjoy your ride! You must pay the following amount $${totalPrice.toFixed(2)}.`
    //Note: The totalPrice must be rounded to the second decimal point and before the price must have a dollar sign ($).

    let totalPrice = 0;
    let unavailableBikes = [];

    for (let bike of selectedBikes) {
      let [brand, quantity] = bike.split("-");
      let foundBike = this.availableBikes.find((b) => b.brand === brand);

      if (!foundBike || foundBike.quantity < quantity) {
        unavailableBikes.push(brand);
      } else {
        totalPrice += foundBike.price * quantity;
        foundBike.quantity -= quantity;
      }
    }

    if (unavailableBikes.length > 0) {
      return `Some of the bikes are unavailable or low on quantity in the bike rental service.`;
    } else {
      return `Enjoy your ride! You must pay the following amount $${totalPrice.toFixed(
        2
      )}.`;
    }
  }

  returnBikes(returnedBikes) {
    //This method allows users to return bikes to the rental service. The method takes 1 argument: returnedBikes (array of strings).
    //Every element in this array is information about the returned bikes in the format: "{brand} {quantity}"
    //They are separated by a dash.
    //Example: ["Mountain Bike-5", "City Bike-10", "Electric Bike-3"...]
    //For each element of the array returnedBikes, check:
    //Note: It is crucial to return one of the strings ("Some of the returned bikes are not from our selection" or "Thank you for returning!")
    //after the function goes through every element of the returnedBikes array and updates the bike quantities that match the criteria.
    //If the brand of the current bike is not present in availableBikes array, the following message should be returned:
    //"Some of the returned bikes are not from our selection."
    //Otherwise, increase the quantity recorded in the array availableBikes with the quantity obtained as a parameter, and return:
    //"Thank you for returning!"

    let invalidBikes = [];

    for (let bike of returnedBikes) {
      let [brand, quantity] = bike.split("-");
      let foundBike = this.availableBikes.find((b) => b.brand === brand);

      if (!foundBike) {
        invalidBikes.push(brand);
      } else {
        foundBike.quantity += parseInt(quantity);
      }
    }

    if (invalidBikes.length > 0) {
      return `Some of the returned bikes are not from our selection.`;
    } else {
      return `Thank you for returning!`;
    }
  }

  revision() {
    //This method returns all available bikes in the store in the following format:
    //The first line shows the following message:
    //"Available bikes:"
    //On the new line, display information about each bike sorted in ascending order of price and must have a dollar sign ($):
    //`{brand} quantity:{quantity} price:${price}`
    //The last line shows the following message:
    //`The name of the bike rental service is {name}, and the location is {location}.`

    let sortedBikes = this.availableBikes.sort((a, b) => a.price - b.price);
    let result = `Available bikes:\n`;

    for (let bike of sortedBikes) {
      result += `${bike.brand} quantity:${bike.quantity} price:$${bike.price}\n`;
    }

    result += `The name of the bike rental service is ${this.name}, and the location is ${this.location}.`;

    return result;
  }
}
const rentalService = new BikeRentalService("MyBikes", "CityCenter");

console.log(
  rentalService.addBikes([
    "Mountain Bike-5-150",
    "City Bike-10-100",
    "Electric Bike-3-200",
    "Electric Bike-8-400",
  ])
);
//const rentalService = new BikeRentalService("MyBikes", "CityCenter");

console.log(rentalService.addBikes(["Mountain Bike-5-150", "City Bike-10-100", "Electric Bike-3-200", "Electric Bike-8-400"]));
console.log(rentalService.rentBikes(["Mountain Bike-2", "City Bike-5"]));

//const rentalService = new BikeRentalService("MyBikes", "CityCenter");

console.log(rentalService.addBikes(["Mountain Bike-5-150", "City Bike-10-100", "Electric Bike-3-200", "Electric Bike-8-400"]));
console.log(rentalService.rentBikes(["Mountain Bike-2", "City Bike-5", "Stunt Bike-5"]));
console.log(rentalService.returnBikes(["Mountain Bike-1", "City Bike-3", "Race Bike-5"]));
console.log(rentalService.revision());

//const rentalService = new BikeRentalService("MyBikes", "CityCenter");

console.log(rentalService.addBikes(["Mountain Bike-5-150", "City Bike-10-100", "Electric Bike-3-200", "Electric Bike-8-400"]));
console.log(rentalService.rentBikes(["Mountain Bike-5", "City Bike-5"]));
console.log(rentalService.returnBikes(["Mountain Bike-1", "City Bike-3"]));
console.log(rentalService.revision());



