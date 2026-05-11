class Order {
    userId = "";
    username = "";
    itemsOrdered = [];
    price = "";
    //api_url = "https://64be2b012320b36433c8261b.mockapi.io";
    api_url = "https://684a2a23165d05c5d357d7c3.mockapi.io";

    constructor(userId, username, itemsOrdered, price) {
        this.userId = userId;
        this.username = username;
        this.itemsOrdered = itemsOrdered;
        this.price = price;
    }

    createOrder() {
        let data = {
            userId: this.userId,
            username: this.username,
            itemsOrdered: this.itemsOrdered,
            price: this.price
        };
        data = JSON.stringify(data);

        fetch(this.api_url + "/Orders", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        })
        .then(response => response.json())
        .then(data => {});
    }
}