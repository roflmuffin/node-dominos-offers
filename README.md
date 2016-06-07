# Node Dominos Offers

Command line utility to retrieve your local Dominos coupon codes (AU).

## Install

```bash
npm install -g dominos-offers
```

## Usage
    dominos-offers -s store-number

    Options:

    -h, --help           output usage information
    -V, --version        output the version number
    -s --store [number]  store number to retrieve codes for
    -j --json            outputs JSON data of coupon codes
    -r --readable        outputs human readable list of coupon codes

## Output

#### JSON
```json
[
    {
        "ServiceMethod": "Pickup",
        "VoucherCode": "789505",
        "IsRestricted": false,
        "ExpiryDate": "8-06-2016",
        "Description": "Traditional Pizzas from $7.95 Pick-Up"
    },
    {
        "ServiceMethod": "Pickup",
        "VoucherCode": "268925",
        "IsRestricted": false,
        "ExpiryDate": "13-06-2016",
        "Description": "Value Range Pizzas from $5.00 Pick-Up"
    },
]
```

#### Readable
```
789505 | Traditional Pizzas from $7.95 Pick-Up | Expires on 8th June | Pickup
268925 | Value Range Pizzas from $5.00 Pick-Up | Expires on 13th June | Pickup
305630 | 3 Traditional Pizzas + Garlic Bread, 1.25L Coke from $30.95 Delivered | Expires on 13th June | Delivery
768154 | Traditional Pizzas from $7.95 Pick-Up | Expires on 13th June | Pickup
104034 | 3 Traditional Pizzas from $21.95 Pick-Up | Expires on 13th June | Pickup
```
