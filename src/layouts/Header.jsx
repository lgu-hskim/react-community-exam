import { Link } from "react-router-dom";
import { fetchCarts } from "../apis/cartApi";
import { useUserStore } from "../stores/userStore";
import { useEffect, useState } from "react";

function Header() {
  const [cartsTotal, setCartsTotal] = useState(0);

  const user = useUserStore((s) => s.user);

  useEffect(() => {
    async function getCarts() {
      if (!user) {
        setCartsTotal(0);
        return;
      }
      const { totalCount } = await fetchCarts(user.id);
      setCartsTotal(totalCount);
    }
    getCarts();
  }, [user]);

  return (
    <header className="navbar bg-base-100 shadow-lg">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          My Community
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">홈</Link>
          </li>
          <li>
            <Link to="/posts">게시판</Link>
          </li>
          <li>
            <Link to="/products">상품</Link>
          </li>
          <li>
            <Link to="/carts">장바구니 {cartsTotal}</Link>
          </li>
          {!user && (
            <>
              <li>
                <Link to="/login">로그인</Link>
              </li>
              <li>
                <Link to="/signup">회원가입</Link>
              </li>
            </>
          )}
          {user && (
            <li>
              <Link to="/profile">내 정보</Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Header;
