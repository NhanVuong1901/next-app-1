import AddToCart from "./AddToCart";

const ProductCart = () => {
  return (
    <main>
      <h1 className="p-5 m-5 bg-sky-400 text-white text-xl hover:bg-sky-600">Product Cart</h1>
      <AddToCart/>
    </main>
  );
};

export default ProductCart;
