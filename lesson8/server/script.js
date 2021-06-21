const express = require("express");
const bodyParser = require('body-parser');
const fs = require("fs");
var cors = require('cors')

const app = express();

app.use(bodyParser.json({ extended: true }));
app.use(express.static("."));
app.use(cors())

app.listen(3000, () => {
  console.log("server is running at port 3000!!");
});

app.get('/cartData', (req, res) => {
    fs.readFile('cart.json', 'utf-8', (err,data) => {
        res.send(data)
      //console.log('/cartData');
    })
})

app.get("/catalogData", (req, res) => {
  fs.readFile("catalogData.json", "utf-8", (err, data) => {
    res.send(data);
    //console.log('/catalogData');
  });
});

app.post("/cleanCart", (req, res) => {
  fs.readFile("cart.json", "utf-8", (err, data) => {
    if (err) {
      res.send('{"result": 0}');
    } else {
      const cart = [];
      console.log('Очистил корзину')
      fs.writeFile("cart.json", JSON.stringify(cart), (err) => {
        if (err) {
          res.send('{"result": 0}');
        } else {
          res.send('{"result": 1}');
        }
      });
    }
  });
});

app.post("/removeBasketItem", (req, res) => {
    fs.readFile("cart.json", "utf-8", (err, data) => {
    if (err) {
      res.send('{"result": 0}');
    } else {
      const cart = JSON.parse(data);
      const item = req.body;
      //console.log('cart', cart)
      //console.log('item', item)
      cart.forEach(n => { if (n.id_product == item.id_product) {
           cart.splice(cart.indexOf(n),1);
       } })

      fs.writeFile("cart.json", JSON.stringify(cart), (err) => {
        if (err) {
          res.send('{"result": 0}');
        } else {
          res.send('{"result": 1}');
        }
      });
    }
  });
});


app.post("/addToCart", (req, res) => {
  fs.readFile("cart.json", "utf-8", (err, data) => {
    if (err) {
      res.send('{"result": 0}');
    } else {
      const cart = JSON.parse(data);
      const item = req.body;
      //console.log(req.body)
      cart.push(item);

      fs.writeFile("cart.json", JSON.stringify(cart), (err) => {
        if (err) {
          res.send('{"result": 0}');
        } else {
          res.send('{"result": 1}');
          console.log('Добавил');
        }
      });
    }
  });
});
