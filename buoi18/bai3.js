const orders = [
  { id: 1, customer: "An",   product: "Áo thun",     category: "fashion",     amount: 300000, status: "completed" },
  { id: 2, customer: "Bình", product: "iPhone 15",    category: "electronics", amount: 25000000, status: "completed" },
  { id: 3, customer: "An",   product: "Quần jean",    category: "fashion",     amount: 450000, status: "canceled" },
  { id: 4, customer: "Chi",  product: "Tai nghe",     category: "electronics", amount: 1200000, status: "completed" },
  { id: 5, customer: "Bình", product: "Giày",         category: "fashion",     amount: 900000, status: "pending" },
  { id: 6, customer: "An",   product: "Sạc dự phòng", category: "electronics", amount: 350000, status: "completed" },
  { id: 7, customer: "Duy",  product: "Áo khoác",     category: "fashion",     amount: 600000, status: "completed" },
];

function getRevenueByCategory(orders) {
  return orders.reduce((acc, o) => {
    if (o.status !== "completed") return acc;
    acc[o.category] = (acc[o.category] || 0) + o.amount;
    return acc;
  }, {});
}

function getSpendingByCustomer(orders) {
  return orders.reduce((acc, o) => {
    if (o.status !== "completed") return acc;
    acc[o.customer] = (acc[o.customer] || 0) + o.amount;
    return acc;
  }, {});
}

function getOrderCountByStatus(orders) {
  return orders.reduce((acc, o) => {
    acc[o.status] = (acc[o.status] || 0) + 1;
    return acc;
  }, {});
}

function getTopCustomer(orders) {
  const result = orders.reduce(
    (acc, o) => {
      if (o.status !== "completed") return acc;
      acc.spendingMap[o.customer] = (acc.spendingMap[o.customer] || 0) + o.amount;
      const currentTotal = acc.spendingMap[o.customer];
      if (currentTotal > acc.top.total) {
        acc.top = { customer: o.customer, total: currentTotal };
      }
      return acc;
    },
    { spendingMap: {}, top: { customer: null, total: 0 } }
  );
  return result.top;
}

function getFullReport(orders) {
  const initialValue = {
    revenueByCategory: {},
    spendingByCustomer: {},
    statusCount: {},
    totalRevenue: 0,
  };
  return orders.reduce((acc, o) => {
    acc.statusCount[o.status] = (acc.statusCount[o.status] || 0) + 1;
    if (o.status === "completed") {
      acc.revenueByCategory[o.category] = (acc.revenueByCategory[o.category] || 0) + o.amount;
      acc.spendingByCustomer[o.customer] = (acc.spendingByCustomer[o.customer] || 0) + o.amount;
      acc.totalRevenue += o.amount;
    }
    return acc;
  }, initialValue);
}