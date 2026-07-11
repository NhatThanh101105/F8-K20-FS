function getCustomerStatistics(customers, products, orders) {
  const productMap = new Map(products.map(p => [p.id, p]));

  const stats = customers.map(customer => {
    const customerOrders = orders.filter(order => order.customerId === customer.id);
    const aggregatedProducts = new Map();

    customerOrders.forEach(order => {
      order.items.forEach(item => {
        if (aggregatedProducts.has(item.productId)) {
          const current = aggregatedProducts.get(item.productId);
          current.quantity += item.quantity;
        } else {
          aggregatedProducts.set(item.productId, { quantity: item.quantity });
        }
      });
    });

    let totalSpent = 0;
    const productList = [];

    aggregatedProducts.forEach((value, productId) => {
      const originalProduct = productMap.get(productId);
      if (originalProduct) {
        const itemTotal = originalProduct.price * value.quantity;
        totalSpent += itemTotal;
        
        productList.push({
          name: originalProduct.name,
          quantity: value.quantity,
          totalSpent: itemTotal
        });
      }
    });

    productList.sort((a, b) => b.totalSpent - a.totalSpent);

    return {
      id: customer.id,
      name: customer.name,
      totalSpent: totalSpent,
      products: productList
    };
  });

  stats.sort((a, b) => b.totalSpent - a.totalSpent);

  return stats;
}