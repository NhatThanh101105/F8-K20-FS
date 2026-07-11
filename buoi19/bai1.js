function Order(orderId, customerName, items, status = "pending") {
  this.orderId = orderId;
  this.customerName = customerName;
  this.items = items;
  this.status = status;

  this.getTotalAmount = function() {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  this.getItemCount = function() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  };

  this.updateStatus = function(newStatus) {
    this.status = newStatus;
    return `Đơn hàng ${this.orderId} đã chuyển sang: ${this.status}`;
  };

  this.addItem = function(item) {
    this.items.push(item);
    return this.getTotalAmount();
  };

  this.getSummary = function() {
    return {
      orderId: this.orderId,
      customerName: this.customerName,
      totalAmount: this.getTotalAmount(),
      itemCount: this.getItemCount(),
      status: this.status
    };
  };
}