const express = require('express')
const cors = require('cors');
const app = express();
const port = 3000;


// Where the items are
let items = [
    {id: "1", product: "aileron", price: "150", quantity: "2"},
    {id: "2", product: "rudder", price: "200", quantity: "1"},
    {id: "3", product: "wing", price: "4000", quantity: "2"},
    {id: "4", product: "fuel tank", price: "450", quantity: "2"},
]

app.use(cors());
app.use(express.json());


// --------------------------------------------------------------------------

// gets the cart items
app.get('/cart-items', (req, res) => {
    res.status(200).json(items);
});



// gets item by id
app.get('/cart-items/:id', (req, res) => {

    // Reading id from the URL
    const id = req.params.id;

    // Searching items for the id
    for (let item of items) {
        if (item.id === id) {
            res.status(200).json(item);
            return;
        }
    }

    // Sending 404 when item not found
    res.status(404).send('ID not found');
});


// adds an item to cart
app.post('/cart-items', (req, res) => {
    const item = req.body;
    const time = new Date().getTime();

    const newItem = {
        id: time,
        product: item.product,
        price: item.price,
        quantity: item.quantity
    };

    items.push(newItem);

    res.status(201).json(newItem);
});


// edits item
app.put('/cart-items/:id', (req, res) => {
    // Reading id from the URL
    const id = req.params.id;
    const newItem = req.body;

    // Remove item from the items array
    for (let i = 0; i < items.length; i++) {
        let item = items[i]
        if (item.id === id) {
            items[i] = newItem;
        }
    }

    res.status(200).json(newItem);
});



// deletes item
app.delete('/cart-items/:id', (req, res) => {
    // Reading id from the URL
    const id = req.params.id;

    // Remove item from the items array
    items = items.filter(i => {
        if (i.id !== id) {
            return true;
        }
        return false;
    });

    res.sendStatus(204);
});



app.listen(port, () => console.log(`Shopping Cart app listening on port ${port}!`));