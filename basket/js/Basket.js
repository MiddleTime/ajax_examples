function Container(id) {
    this.id = id;
    this.htmlCode = '';
}

Container.prototype.render = function () {
    return this.htmlCode;
};

function Basket() {
    Container.call(this, 'basket'); // this.id = 'basket';

    this.countGoods = 0;
    this.amount = 0;

    this.basketItems = [];
    this.getBasketItems();
}

Basket.prototype = Object.create(Container.prototype);
Basket.prototype.constructor = Basket;

Basket.prototype.render = function (root) {
    var basketDiv = $('<div />', {
        id: this.id,
        text: 'Корзина'
    });

    var basketItemsDiv = $('<div />', {
        id: this.id + '_items'
    });

    basketItemsDiv.appendTo(basketDiv);
    basketDiv.appendTo(root);
};

Basket.prototype.add = function (product, quantity, price) {
    var basketItem = {
        "id_pruduct": product,
        "price": price
    };

    this.countGoods += +quantity;
    this.amount += +price * +quantity;

    this.basketItems.push(basketItem); // добавляем объект товара в наш массив товаров
    this.refresh();
};

Basket.prototype.refresh = function () {
    var $basketDataDiv = $('#basket_data');

    $basketDataDiv.empty();
    $basketDataDiv.append('<p>Всего товаров: ' + this.countGoods + '</p>');
    $basketDataDiv.append('<p>Сумма: ' + this.amount + '</p>');
};

Basket.prototype.getBasketItems = function () {
    var appendId = '#' + this.id + '_items';
    $.get({
        url: './basket.json',
        dataType: 'json',
        success: function (data) {
            var basketData = $('<div />', {
                id: 'basket_data'
            });

            this.countGoods = data.basket.length;
            this.amount = data.amount;

            basketData.append('<p>Всего товаров: ' + this.countGoods + '</p>');
            basketData.append('<p>Сумма: ' + this.amount + '</p>');

            basketData.appendTo(appendId);

            for (var index in data.basket) {
                // Добавим немного секьюрности
                if (data.basket.hasOwnProperty(index)) this.basketItems.push(data.basket[index]);
            }
        },
        context: this
    });
};