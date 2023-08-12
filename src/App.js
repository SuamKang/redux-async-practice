import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { sendCartData, fetchCartData } from "./store/cart-actions";

let isInitial = true;

function App() {
  const dispatch = useDispatch();

  const showCart = useSelector((state) => state.ui.isCartVisible);
  const notification = useSelector((state) => state.ui.notification);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    console.log("fetching");
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    console.log("sending");
    if (cart.changed) {
      dispatch(sendCartData(cart)); // 여기서 실행~!!
    }
  }, [cart, dispatch]);

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;

// Thunk 엑션 크리에이터 함수 생성하기

// 비동기를 처리해야하는 엑션 생성자 함수(리덕스 툴킷에 의해 리듀서로 정의내린)를 Thunk로 생성할 수 있다.
// thunk는 실제 엑션 객체를 디스패치 하기전에 가로채서 작업을 수행한다.
