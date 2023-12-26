async function logcars() {
    const response = await fetch("https://my.api.mockaroo.com/cars.json?key=51df27a0");
    const cars = await response.json();
    console.log(cars);
  }
logcars();