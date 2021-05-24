const goods = [
  { title: "Кофе", info:"Кофе растворимый Nescafe Classic гранулированный, пакет, 150г",price: 200, img:"it0.webp"},
  { title: "Кофе", info:"Кофе в капсулах Nescafe Dolce Gusto Americano, 48 капс.", price: 900, img:"it1.webp"},
  { title: "Конфеты", info:"Набор конфет Raffaello Весенняя серия, 150г белый", price: 200, img:"it2.webp"},
  { title: "Приправа", info:"Knorr Приправа универсальная Деликат, 200г", price: 45, img:"it3.webp"},
  { title: "Конфитюр", info:"Конфитюр Zuegg экстра Ежевика, банка 320г", price: 145, img:"it4.webp"},
  { title: "Масло", info:"Filippo Berio масло оливковое Extra Virgin, стеклянная бутылка 1 л.", price: 569, img:"it5.webp"},
  { title: "Кетчуп", info:"Кетчуп Heinz BBQ для курицы с карри 350г", price: 60,img: "it6.webp"},
  { title: "Чипсы", info:"Чипсы Dr. Korner кукурузно-рисовые С оливковым маслом и розмарином 50г", price: 28, img:"dr-corner.jpg"},
  { title: "Чипсы", info:"Чипсы Lays Из печи, лисички в сметане, 85 г.", price: 55}//img: "lays.jpg"
]

const renderGoodsItem = (title, info, price, img='no_image.jpg') => { // задание 2, добавить аргумент по умолчанию. Если картинка пуста, то вставляем заглушку
  return `<div class="goods-item"><div class="goods-item-subtext"><h3>${title}</h3><p>${info}</p><p>${price} руб.</p></div><img src="img/${img}"/></div>`
}

const renderGoodsList = list => {
  let goodsList = list.map(item => renderGoodsItem(item.title, item.info , item.price,  item.img))
  document.querySelector('.goods-list').innerHTML = goodsList.join('') // задание 3. Запятные ставились, так-как метод map возвращает массив. 

}

const init = () => {
  renderGoodsList(goods)
}

window.onload = init
