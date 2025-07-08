import { useState, useEffect } from "react";

function CartListPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cart);
  }, []);

  const formatPrice = (p) => {
    return p.toLocaleString("ko-KR");
  };

  const handleRemove = (id) => {
    const newCart = cartItems.filter((item) => item.id !== id);
    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  if (cartItems.length === 0) {
    return <div className="p-8 text-center">장바구니가 비어 있습니다.</div>;
  }

  return (
    <div className="container mx-auto p-4 lg:p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold mb-2">장바구니</h1>
        <p className="text-gray-500">
          총 {cartItems.length}개의 상품이 담겨 있습니다.
        </p>
      </div>
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6`}
      >
        {cartItems.map((product) => (
          <div
            key={product.id}
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
          >
            <figure className="h-48 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-lg">{product.name}</h2>
              <p className="text-gray-600 text-sm line-clamp-2">
                {product.description}
              </p>
              <div className="text-xl font-bold text-primary mt-2">
                {formatPrice(product.price)} 원
              </div>
              <div className="text-sm text-gray-500 mt-2">
                수량: {product.quantity}
              </div>
              <button
                onClick={() => handleRemove(product.id)}
                className="btn btn-error btn-sm mt-2"
              >
                제거
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CartListPage;
