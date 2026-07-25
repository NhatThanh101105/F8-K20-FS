class BankAccount {
  #balance;
  static totalMoney = 0;

  constructor(ownerName, balance) {
    if (typeof balance !== "number" || balance < 0) {
      throw new Error("Số dư ban đầu không hợp lệ (phải là số >= 0)");
    }
    this.ownerName = ownerName;
    this.#balance = balance;
    BankAccount.totalMoney += balance;
  }

  get balance() {
    return this.#balance;
  }

  deposit(amount) {
    if (typeof amount !== "number" || amount <= 0) {
      throw new Error("Số tiền nạp không hợp lệ (phải là số > 0)");
    }
    this.#balance += amount;
    return this.#balance;
  }

  withdraw(amount) {
    if (typeof amount !== "number" || amount <= 0) {
      throw new Error("Số tiền rút không hợp lệ (phải là số > 0)");
    }
    if (amount > this.#balance) {
      throw new Error("Số dư không đủ để rút");
    }
    this.#balance -= amount;
    return this.#balance;
  }

  toString() {
    return `Chủ tài khoản: ${this.ownerName}\nSố dư: ${this.#balance}`;
  }
}

class SavingsAccount extends BankAccount {
  constructor(ownerName, balance, interestRate) {
    super(ownerName, balance);
    this.interestRate = interestRate;
  }

  addInterest() {
    const interest = this.balance * this.interestRate;
    this.deposit(interest);
    return this.balance;
  }

  withdraw(amount) {
    if (typeof amount !== "number" || amount <= 0) {
      throw new Error("Số tiền rút không hợp lệ (phải là số > 0)");
    }
    if (amount > this.balance * 0.5) {
      throw new Error("Không được rút quá 50% số dư hiện tại trong một lần");
    }
    return super.withdraw(amount);
  }
}

try { new BankAccount("An", -100); } catch (e) { console.log(e.message); }

const acc2 = new BankAccount("An", 500000);
try { acc2.deposit("100"); } catch (e) { console.log(e.message); }
console.log(acc2.balance);

const acc3 = new BankAccount("An", 500000);
try { acc3.withdraw(700000); } catch (e) { console.log(e.message); }

const acc4 = new SavingsAccount("Bình", 1000000, 0.05);
acc4.addInterest();
console.log(acc4.balance);

const acc5 = new SavingsAccount("Bình", 1000000, 0.05);
try { acc5.withdraw(600000); } catch (e) { console.log(e.message); }

const acc6 = new SavingsAccount("Bình", 1000000, 0.05);
acc6.withdraw(400000);
console.log(acc6.balance);

console.log(BankAccount.totalMoney);