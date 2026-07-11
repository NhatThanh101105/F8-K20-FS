const baseProto = {
  introduce() {
    return `Tôi là ${this.name}, ${this.age} tuổi`;
  },
};

const levelTwoProto = Object.create(baseProto);
levelTwoProto.getInfo = function () {
  return `${this.name} làm ở phòng ${this.department}, lương ${this.salary}`;
};

const item1 = Object.create(levelTwoProto);
Object.assign(item1, { name: "Nguyễn Văn A", age: 28, department: "IT", salary: 15000000 });

const item2 = Object.create(levelTwoProto);
Object.assign(item2, { name: "Trần Thị B", age: 25, department: "HR", salary: 12000000 });

const item3 = Object.create(levelTwoProto);
Object.assign(item3, { name: "Lê Văn C", age: 30, department: "Sales", salary: 13500000 });

const item4 = Object.create(levelTwoProto);
Object.assign(item4, { name: "Phạm Thị D", age: 27, department: "IT", salary: 16000000 });

const item5 = Object.create(levelTwoProto);
Object.assign(item5, { name: "Hoàng Văn E", age: 35, department: "Sales", salary: 18000000 });

function checkOwnProperty(obj, prop) {
  return Object.hasOwn(obj, prop);
}

console.log(checkOwnProperty(item1, "name"));
console.log(checkOwnProperty(item1, "introduce"));

console.log(Object.getPrototypeOf(item1) === levelTwoProto);
console.log(Object.getPrototypeOf(levelTwoProto) === baseProto);

const newProto = {
  getInfo() {
    return `${this.name} là một nhân sự đặc biệt, không thuộc phòng ban nào cả`;
  },
};
Object.setPrototypeOf(item4, newProto);
console.log(item4.getInfo());

console.log(Object.getOwnPropertyNames(item1));

console.log(Object.getOwnPropertyDescriptor(item1, "salary"));

Object.seal(item2);
item2.bonus = 1000000;
console.log(item2.bonus);
item2.salary = 20000000;
console.log(item2.salary);
console.log(Object.isSealed(item2));

const items = [item1, item2, item3, item4, item5];
const grouped = Object.groupBy(items, (item) => item.department);
console.log(grouped);

const lookup = Object.fromEntries([
  ["A001", "Nguyễn Văn A"],
  ["A002", "Trần Thị B"],
]);
console.log(lookup);
console.log(lookup["A002"]);