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
        let div= document.querySelector('#leftDiv')
        let span = document.createElement('span')
        span.innerHTML = list
        div.appendChild(span)
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
    renderImage(){
        let img = document.querySelectorAll('.burgerImg');
        this.stuffingArray.forEach(stuffing => { 
            switch (stuffing.dest) {
              case 'topBurger':
                img[0].src='img/'+stuffing.img;
                break;
              case 'saladBurger':
                img[1].src='img/'+stuffing.img;
                break;
                case 'meatBurger':
                img[2].src='img/'+stuffing.img;
                break;  
            }

            
        })
    }
}

class Stuffing {
    constructor(stuffing, price, callories, img='',dest='' ) {
        this.price = price;
        this.callories = callories;
        this.stuffing = stuffing;
        this.img = img;
        this.dest = dest;
        this.creatBtn();     
    }
    creatBtn() {
            let div = document.getElementById('leftDiv')
            let btn = document.createElement('button')
            btn.dataset.name = this.stuffing
            btn.innerText = this.stuffing
            div.appendChild(btn)
        }
}

class Toppings {
    constructor(toppings, price, callories, img='',dest='' ) {
        this.price = price;
        this.callories = callories;
        this.toppings = toppings;
        this.img = img;
        this.dest = dest
        this.creatBtn();
    }
    creatBtn() {
            let div = document.getElementById('leftDiv')
            let btn = document.createElement('button')
            btn.dataset.name = this.toppings
            btn.innerText = this.toppings
            btn.addEventListener('click', () => { Hamburger.addTopping('toppings'+this.toppings) });//проблема - ругается, что у гамбургера нет такой функции
            div.appendChild(btn)
        }
}

const init = () => {

    const newHamburger = new Hamburger('big','123')

    const stuffingCheese = new Stuffing('Chees','10','20','20.png')
    const stuffingSalad = new Stuffing('Salad','20','5','20.png','saladBurger')
    const stuffingPotatoes = new Stuffing('Potatoes','15','10','20.png')
    const toppingsSeasoning = new Toppings('Seasoning','15','0','11.png','topBurger')
    const toppingsMayonnaise = new Toppings('Mayonnaise','20','5','33.png','meatBurger')

    // const btnCal = document.querySelector('#btnCal')
    // btnCal.addEventListener('click', () => { newHamburger.calculatePrice() });

    newHamburger.getSize();
    newHamburger.addStuffing(stuffingCheese)
    newHamburger.addStuffing(stuffingSalad)
    newHamburger.addTopping(toppingsSeasoning)
    

    console.log(newHamburger)
    console.log(newHamburger.getStuffing())
    //console.log(newHamburger.getToppings())
    newHamburger.renderImage()

}



window.onload = init