"use client";

const AddToCart = () => {
  return (
    <div>
      <button
        onClick={() => {
          alert("Product has been added to cart successfully!");
        }}>
        Add to cart
      </button>
    </div>
  );
};

export default AddToCart;
