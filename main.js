export async function getData() {
  let respose = await fetch(`https://dummyjson.com/products`);
  let data = await respose.json();
  data = data.products;
  return data;
}
