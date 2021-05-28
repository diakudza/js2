class Hamburger {
    constructor(size, stuffing) {
        this.size = size;
        this.stuffing = stuffing;
        this.toppingArray = [];
        this.stuffingArray = [];
        this.calories = 0;
        this.price = 0;
    }

    addTopping (topping) {
        this.toppingArray.push(topping);
        this.calculateCalories()
        this.calculatePrice()
    }

    addStuffing (stuffing) {
        this.stuffingArray.push(stuffing);
        this.calculateCalories()
        this.calculatePrice()
    }
    removeTopping (topping) {
        // Убрать добавку
    }

    getToppings (topping) {
        let list = ''
        this.toppingArray.forEach(topping => { list += `<div>${topping.toppings}</div>` })
        return list
    }

    getSize() {
        if (this.size === 'big'){
            this.calories += 40;
            this.price += 100;
        } else {
            this.calories += 20;
            this.price += 50;
        }
        return this.size
    }

    getStuffing() {
        let list = ''
        this.stuffingArray.forEach(stuffing => { list += `<div>${stuffing.stuffing}</div>` })
        return list
    }

    calculatePrice() {
        let toppingPrice = 0;
        this.toppingArray.forEach(topping => {  toppingPrice += +topping.price })
        this.stuffingArray.forEach(stuffing => {  toppingPrice += +stuffing.price })
        this.price += toppingPrice
    return toppingPrice
    }

    calculateCalories() {

        this.toppingArray.forEach(topping => {
            this.calories += +topping.price
        })
        this.stuffingArray.forEach(stuffing => {
            this.calories += +stuffing.price
        })

        return this.calories
    }
}

class Stuffing {
    constructor(stuffing, price, callories) {
        this.price = price;
        this.callories = callories;
        this.stuffing = stuffing;

    }

}

class Toppings {
    constructor(toppings, price, callories) {
        this.price = price;
        this.callories = callories;
        this.toppings = toppings;
    }
}

const init = () => {

    const newHamburger = new Hamburger('big','123')
    const stuffingCheese = new Stuffing('chees','10','20')
    const stuffingSalad = new Stuffing('salad','20','5')
    const stuffingPotatoes = new Stuffing('potatoes','15','10')
    const toppingsSeasoning = new Toppings('seasoning','15','0')
    const toppingsMayonnaise = new Toppings('mayonnaise','20','5')

    const btnCal = document.querySelector('#btnCal')
    btnCal.addEventListener('click', () => { newHamburger.calculatePrice() });
    newHamburger.getSize();
    newHamburger.addStuffing(stuffingCheese)
    newHamburger.addStuffing(stuffingSalad)
    newHamburger.addTopping(toppingsMayonnaise)
    //console.log(newHamburger.calculatePrice())

    console.log(newHamburger)
    console.log(newHamburger.getStuffing())
    console.log(newHamburger.getToppings())

}



window.onload = init