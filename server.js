const express = require('express');
var cors = require('cors');
const stripe = require('stripe')('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');

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.post("/checkout", async (req, res) => {

    console.log(req.body);
    const items = req.body.items;
    let lineItems = [];
    items.forEach((item)=> {
        lineItems.push(
            {
                price: item.id,
                quantity: item.quantity
            }
        )
    });

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        shipping_address_collection: {allowed_countries: ['MX']},
        shipping_options: [
          {
            shipping_rate_data: {
              type: 'fixed_amount',
              fixed_amount: {amount: 15000, currency: 'mxn'},
              display_name: 'shipping',
              delivery_estimate: {
                minimum: {unit: 'business_day', value: 2},
                maximum: {unit: 'business_day', value: 7},
              },
            },
          },
        ],
        line_items: lineItems,
        mode: 'payment',
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel"
    });

    res.send(JSON.stringify({
        url: session.url
    }));
      
});

app.listen(4000, () => console.log("Listening on port 4000!"));