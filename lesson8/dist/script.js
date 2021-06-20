/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app/components/basket-item.js":
/*!*******************************************!*\
  !*** ./src/app/components/basket-item.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst API_URL = \"http://localhost:3000\";\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Vue.component('basket-item',{\r\n    props: ['goodProp'],\r\n    template: `\r\n    <div class=\"basket-item\">\r\n        <img class=\"basket-item__img\" :src=\"goodProp.img\">\r\n        <h3>{{goodProp.product_name}}</h3>\r\n        <button class=\"basket-button\" @click=\"RemoveFromBasket\" v-bind:idAtt=goodProp.id_product>&#128937;</button>\r\n   </div>\r\n    `,\r\n    methods: {\r\n        async RemoveFromBasket() {\r\n            this.$root.$refs.basket.basket = []\r\n            this.$root.$refs.basket.basketSum = 0\r\n            this.$root.isVisibleCart = false\r\n            const response = await fetch(`${API_URL}/removeBasketItem`, {\r\n                method: 'POST',\r\n                mode: 'cors',\r\n                headers: {\r\n                    'Content-Type': 'application/json;charset=utf-8'\r\n                },\r\n                body: JSON.stringify(this.goodProp)\r\n\r\n            });\r\n            console.log(this.goodProp)\r\n            this.$root.$refs.basket.getCart()\r\n        },\r\n\r\n    }\r\n}));\r\n\n\n//# sourceURL=webpack://lesson-8/./src/app/components/basket-item.js?");

/***/ }),

/***/ "./src/app/components/basket.js":
/*!**************************************!*\
  !*** ./src/app/components/basket.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _basket_item_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./basket-item.js */ \"./src/app/components/basket-item.js\");\nconst API_URL = \"http://localhost:3000\";\r\n\r\n\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Vue.component('basket',{\r\n    //props: ['basket','isVisibleCart'],\r\n    data() {\r\n        return {\r\n            basketSum: 0,\r\n\r\n        }\r\n    },\r\n    template: `<div class=\"basket\">\r\n        <h3>Корзина</h3><button class=\"basket-button__clean\" @click=\"СleanBasket()\">Очистить корзину &#128937;</button>\r\n        <div class=\"basket-list\">\r\n         <basket-item v-for=\"goodEntity in basket\" :goodProp=\"goodEntity\" ></basket-item>\r\n        </div>\r\n        <p>Сумма вашего заказа: {{this.basketSum}} руб.</p>\r\n        \r\n    </div>\r\n    `,\r\n    methods: {\r\n        async СleanBasket() {\r\n            this.basket = []\r\n            this.basketSum = 0\r\n            this.$root.isVisibleCart = false\r\n            const response = await fetch(`${API_URL}/cleanCart`, {\r\n                method: 'POST',\r\n                mode: 'cors',\r\n                headers: {\r\n                    'Content-Type': 'application/json;charset=utf-8'\r\n                },\r\n            });\r\n        },\r\n        basketTotal() {\r\n            this.basketSum = 0\r\n            this.basket.forEach(n => {\r\n                this.basketSum += n.price\r\n            })\r\n        },\r\n\r\n        async getCart() {\r\n            const responce = await fetch(`${API_URL}/cartData`);\r\n            if (responce.ok) {\r\n                const cartItems = await responce.json();\r\n                this.basket = cartItems;\r\n                if (this.$root.$refs.basket.basket.length > 0) {\r\n                    this.$root.isVisibleCart = true\r\n                    this.basketTotal()\r\n                    console.log('Basket:', this.basketSum)\r\n                }\r\n            } else {\r\n                this.basketSum = 0;\r\n                this.$root.isVisibleCart = false\r\n                this.basketTotal()\r\n\r\n            }\r\n        },\r\n    }\r\n}));\r\n\n\n//# sourceURL=webpack://lesson-8/./src/app/components/basket.js?");

/***/ }),

/***/ "./src/app/components/find-bar.js":
/*!****************************************!*\
  !*** ./src/app/components/find-bar.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Vue.component('find-bar',{\r\n    props: ['value'],\r\n    template: `\r\n    <div>\r\n        <div class=\"findbar\">\r\n            <input type=\"text\" class=\"goods-search\" v-bind:value=\"value\" v-on:keydown.enter=\"FilterGoods\" v-on:input=\"$emit('input', $event.target.value)\"/>\r\n            <button class=\"clear-button\" type=\"button\" @click=\"ClearFilterGoods\" title=\"Очистить\">&#128937;</button>\r\n            <button class=\"search-button\" type=\"button\" @click=\"FilterGoods\"  title=\"Найти\">&#128270;</button>\r\n        </div>\r\n    </div>\r\n    `,\r\n    methods: {\r\n            ClearFilterGoods: function () {\r\n                this.$root.ClearFilterGoods();\r\n            },\r\n            FilterGoods: function () {\r\n                this.$root.FilterGoods();\r\n            }\r\n        }\r\n\r\n}));\r\n\r\n\n\n//# sourceURL=webpack://lesson-8/./src/app/components/find-bar.js?");

/***/ }),

/***/ "./src/app/components/good-item.js":
/*!*****************************************!*\
  !*** ./src/app/components/good-item.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst API_URL = \"http://localhost:3000\";\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Vue.component('goods-item',{\r\n    props: ['goodProp'],\r\n    data() {\r\n        return {\r\n            isbig : false,\r\n            img: ''\r\n        }\r\n\r\n    },\r\n\r\n    template: `\r\n    <div class=\"goods-item\" >\r\n        <showbig v-if=\"isbig\" :src=\"this.img\"></showbig>\r\n        <div class=\"goods-item__left\">\r\n            <img class=\"goods-item__img\" :src=\"goodProp.img\" @click=\"showBig\">\r\n            <button class=\"goods-list__button\" @click=\"addToCart\" v-bind:idAtt=goodProp.id_product>Добавить в корзину</button>\r\n        </div>\r\n               \r\n        <div class=\"flex-column\">\r\n            <h3>{{goodProp.product_name}}</h3>\r\n            <p>{{goodProp.info}}</p>\r\n            <p>{{goodProp.price}} руб.</p>\r\n        </div>\r\n    </div>`,\r\n    methods: {\r\n         async addToCart() {\r\n            const response = await fetch(`${API_URL}/addToCart`, {\r\n                method: 'POST',\r\n                mode: 'cors',\r\n                headers: { 'Content-Type': 'application/json;charset=utf-8' },\r\n                body: JSON.stringify(this.goodProp)\r\n            });\r\n\r\n\r\n             this.$root.$refs.basket.getCart()\r\n        },\r\n        showBig() {\r\n             this.isbig = true\r\n             this.img = event.target.attributes.src.value\r\n             console.log(event.target.attributes.src.value)\r\n        },\r\n        hideBig() {\r\n            this.isbig = false\r\n            console.log(\"hide\")\r\n            this.$root.getProducts()\r\n        }\r\n    }\r\n}));\r\n\n\n//# sourceURL=webpack://lesson-8/./src/app/components/good-item.js?");

/***/ }),

/***/ "./src/app/components/goods-list.js":
/*!******************************************!*\
  !*** ./src/app/components/goods-list.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _good_item_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./good-item.js */ \"./src/app/components/good-item.js\");\n\r\n\r\n// export default {\r\n//     components: {\r\n//         goodItem\r\n//     }\r\n// }\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Vue.component('goods-list',{\r\n    props: ['goods'],\r\n    components: {\r\n        'good-item': _good_item_js__WEBPACK_IMPORTED_MODULE_0__.default,\r\n    },\r\n    template: `\r\n    <div class=\"goods\" >\r\n        <h3>Список товаров</h3>\r\n        <div class=\"goods-list\">\r\n            <goods-item v-for=\"goodEntity in goods\" :goodProp=\"goodEntity\" v-bind:key=\"goodEntity.id_product\"></goods-item>\r\n        </div>\r\n    </div>\r\n    `\r\n}));\r\n\r\n\n\n//# sourceURL=webpack://lesson-8/./src/app/components/goods-list.js?");

/***/ }),

/***/ "./src/app/components/net-error.js":
/*!*****************************************!*\
  !*** ./src/app/components/net-error.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Vue.component('net-error',{\r\n    template: `\r\n    <div class=\"back\">\r\n        <div class=\"noFound\">\r\n            <h3>Ошибка соединения!!!</h3><br>\r\n            <p>Не могу получить данные с сервера!</p>\r\n        </div>\r\n    </div>\r\n`\r\n}));\n\n//# sourceURL=webpack://lesson-8/./src/app/components/net-error.js?");

/***/ }),

/***/ "./src/app/components/no-found.js":
/*!****************************************!*\
  !*** ./src/app/components/no-found.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Vue.component('no-found',{\r\n    template: `\r\n    <div class=\"back\">\r\n        <div class=\"noFound\">\r\n            <h3>Нет ничего похожего</h3>\r\n            <button type=\"button\" class=\"cart-button\" @click=\"ClearFilterGoods()\" title=\"Очистить\">Закрыть</button>\r\n        </div>\r\n    </div>`,\r\n    methods: {\r\n        ClearFilterGoods: function () {\r\n            this.$root.ClearFilterGoods();\r\n        }\r\n    }\r\n}));\n\n//# sourceURL=webpack://lesson-8/./src/app/components/no-found.js?");

/***/ }),

/***/ "./src/app/components/showbig.js":
/*!***************************************!*\
  !*** ./src/app/components/showbig.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Vue.component('showbig',{\r\n    props: ['src'],\r\n    template: `\r\n    <div class=\"showbig\" @click=\"this.$parent.hideBig\">\r\n        <div class=\"showbig_block\">\r\n        <img :src=\"src\" >\r\n        </div>                \r\n    </div>`,\r\n}));\r\n\n\n//# sourceURL=webpack://lesson-8/./src/app/components/showbig.js?");

/***/ }),

/***/ "./src/app/script.js":
/*!***************************!*\
  !*** ./src/app/script.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_basket_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/basket.js */ \"./src/app/components/basket.js\");\n/* harmony import */ var _components_goods_list_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/goods-list.js */ \"./src/app/components/goods-list.js\");\n/* harmony import */ var _components_find_bar_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/find-bar.js */ \"./src/app/components/find-bar.js\");\n/* harmony import */ var _components_net_error_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/net-error.js */ \"./src/app/components/net-error.js\");\n/* harmony import */ var _components_no_found_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/no-found.js */ \"./src/app/components/no-found.js\");\n/* harmony import */ var _components_showbig_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/showbig.js */ \"./src/app/components/showbig.js\");\nconst API_URL = \"http://localhost:3000\";\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nconst app = new Vue({\r\n    el: '#app',\r\n    data: {\r\n        goods: [],\r\n        filteredGoods: [],\r\n        searchLine: '',\r\n        isVisibleCart: false,\r\n        isVisibleGoods: true,\r\n        noFound: false,\r\n        netError: false,\r\n    },\r\n\r\n    methods: {\r\n        async getProducts() {\r\n            try {\r\n                const responce = await fetch(`${API_URL}/catalogData`);\r\n                if (responce.ok) {\r\n                    const catalogItems = await responce.json();\r\n                    this.goods = catalogItems;\r\n                    this.filteredGoods = catalogItems;\r\n\r\n                } else {\r\n                    this.netError = true\r\n                    console.log(\"CONNECT ERROR !\")\r\n                }\r\n            }\r\n            catch (e) {\r\n                this.netError=true\r\n                console.log('Ошибка соединения с сервером!!')\r\n                console.log(e)\r\n            }\r\n\r\n        },\r\n        FilterGoods() {\r\n\r\n            if (this.searchLine !== '') {\r\n                this.filteredGoods = []\r\n                this.goods.forEach( good => {\r\n\r\n                    if (this.searchLine.toLowerCase() === good.product_name.toLowerCase()) {\r\n                        this.filteredGoods.push(good)\r\n                        this.noFound = false;\r\n\r\n                    } else if (this.filteredGoods.length < 1){\r\n                        console.log('not found')\r\n                        this.noFound = true;\r\n                        this.isVisibleGoods = true\r\n\r\n                    }\r\n\r\n                })\r\n\r\n            }},\r\n\r\n        ClearFilterGoods() {\r\n            this.searchLine = ''\r\n            this.isVisibleGoods = true\r\n            this.filteredGoods = this.goods\r\n            this.noFound = false\r\n\r\n        },\r\n\r\n\r\n    },\r\n\r\n    async mounted() {\r\n        await this.getProducts()\r\n        await this.$refs.basket.getCart()\r\n    }\r\n});\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://lesson-8/./src/app/script.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app/script.js");
/******/ 	
/******/ })()
;