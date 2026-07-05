
function createSlug(text) {
  return text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

function generateOrderId(productName, quantity) {
  const prefix = productName.substring(0, 3).toUpperCase();
  return `ORD-${prefix}-${quantity}-${productName.length}`;
}

function formatPrice(price, currency = "VND") {
  if (currency === "USD") {
    return price.toLocaleString("en-US", { style: "currency", currency: "USD" });
  }
  return `${price.toLocaleString("vi-VN")} ₫`;
}

function buildProductUrl(baseUrl, product) {
  return `${baseUrl}/${product.category}/${createSlug(product.name)}?id=${product.id}`;
}


console.log(createSlug("MacBook Pro 2024"));       
console.log(createSlug("Bàn Phím Cơ RGB"));        
console.log(createSlug("iPhone 15 Pro Max!!!"));   
console.log(createSlug("Hello   World"));        

console.log(generateOrderId("MacBook Pro", 2));    
console.log(generateOrderId("iPhone 15", 5));      
console.log(generateOrderId("Bàn phím cơ", 1));    

console.log(formatPrice(2000000, "VND"));          
console.log(formatPrice(1500, "USD"));             
console.log(formatPrice(300000));                  

const baseUrl = "https://shop.vn";
console.log(buildProductUrl(baseUrl, { name: "MacBook Pro 2024", id: 101, category: "laptop" }));
console.log(buildProductUrl(baseUrl, { name: "iPhone 15", id: 55, category: "phone" }));

module.exports = { createSlug, generateOrderId, formatPrice, buildProductUrl };