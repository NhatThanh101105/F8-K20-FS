const config = Object.freeze({
  mucPhuPhi: 0.1,
  ghiChu: "Cấu hình hệ thống",
  phienBan: 1,
});

config.mucPhuPhi = 0.5;
console.log(config.mucPhuPhi);
console.log(Object.isFrozen(config));

class ShoppingList {
  #items = [];
  #discountPercent = 0;
  static #idCounter = 1;

  constructor(name) {
    this.name = name;

    Object.defineProperty(this, "id", {
      value: `ID-${ShoppingList.#idCounter++}`,
      writable: false,
      enumerable: false,
      configurable: false,
    });
  }

  addItem(name, price, quantity) {
    this.#items.push({ name, price, quantity });
  }

  get total() {
    const subtotal = this.#items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const withFee = subtotal + subtotal * config.mucPhuPhi;
    return withFee * (1 - this.#discountPercent / 100);
  }

  set discountPercent(value) {
    if (value < 0 || value > 100) {
      console.error("Discount phải từ 0 đến 100");
      return; 
    }
    this.#discountPercent = value;
  }
}

function logSummary() {
  console.log(`${this.name}: ${this.total}`);
}

const instance = new ShoppingList("Danh sách của An");
instance.addItem("Bàn phím", 500000, 2);
instance.addItem("Chuột", 200000, 1);

console.log(instance.total);

instance.discountPercent = 10;
console.log(instance.total);

instance.discountPercent = 150; 
console.log(instance.total); 

setTimeout(logSummary.bind(instance), 100);

console.log(Object.keys(instance));

instance.id = "hack123";
console.log(instance.id);

const objA = { a: 1, b: 2, c: 3 };
const objB = { b: 20, c: 30, d: 40 };

const merged = { ...objA, ...objB };
console.log(merged);
console.log(objA);