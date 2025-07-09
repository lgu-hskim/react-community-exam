import { useState, useEffect } from "react";
import { fetchProducts } from "../../apis/productApi";
import Pagination from "../../components/Pagination";
import { Link } from "react-router-dom";
import { useCartStore } from "../../stores/cartStore";
import { useUserStore } from "../../stores/userStore";
import { insertCarts } from "../../apis/cartApi";

function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [productTotalCount, setProductTotalCount] = useState(0);
  const itemsPerPage = 5;

  // Handle responsive layout
  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { products: fetchedProducts, totalCount } = await fetchProducts(
          currentPage,
          itemsPerPage
        );
        setProductTotalCount(totalCount);
        setTotalPages(Math.ceil(totalCount / itemsPerPage));
        setProducts(fetchedProducts);
      } catch (e) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const formatPrice = (p) => {
    return p.toLocaleString("ko-KR");
  };

  // 컴포넌트 최상위에서 user를 가져옴
  const user = useUserStore((s) => s.user);

  const handleAddCart = (product) => {
    const userId = user.id;
    const productId = product.id;

    const insertResult = insertCarts(userId, productId);
    if (insertResult) {
      alert(`장바구니에 ${product.title} 상품이 담겼습니다!`);
    }
  };

  // const handleAddCard = (product) => {
  //   // localStorage에서 cart 가져오기
  //   // const cart = useCartStore((s) => s.cart);
  //   const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  //   // 이미 담긴 상품인지 확인
  //   const existing = cart.find((item) => item.id === product.id);

  //   if (existing) {
  //     // 이미 있으면 수량 증가
  //     existing.quantity += 1;
  //   } else {
  //     // 없으면 새로 추가
  //     // useCartStore.getState().addCart({ ...product, quantity: 1 });
  //     cart.push({ ...product, quantity: 1 });
  //   }

  //   // localStorage에 저장
  //   localStorage.setItem("cart", JSON.stringify(cart));

  //   // 장바구니 전체 수량 계산
  //   const totalQuantity = cart.reduce(
  //     (sum, item) => sum + (item.quantity || 1),
  //     0
  //   );

  //   // 사용자 피드백 (수량 포함)
  //   alert(`장바구니에 담겼습니다! (총 수량: ${totalQuantity})`);
  // };

  if (isLoading) {
    return <div className="p-8 text-center">로딩 중...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">에러: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4 lg:p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold mb-2">상품 목록</h1>
        <p className="text-gray-500">
          총 {productTotalCount}개의 상품이 있습니다.
        </p>
      </div>

      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6`}
      >
        {products.map((product) => (
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
              <div className="card-actions justify-end mt-4">
                <button
                  onClick={() => handleAddCart(product)}
                  className="btn btn-primary btn-sm"
                >
                  장바구니
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-8">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
        <Link to="/write" className="btn btn-primary">
          글쓰기
        </Link>
      </div>
    </div>
  );
}

export default ProductListPage;
