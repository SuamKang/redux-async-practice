import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { uiActions } from "./store/ui-slice";
import Notification from "./components/UI/Notification";

// 전역으로 관리되는 cart의 상태가 변경되면 http 요청을 할것이니 useEffect 훅을 사용해준다.
// 하지만 아래와 같이 관리를 하게되면 리덕스 스토어에서 관리되는 cart 데이터가 새로고침 시 초기화가 진행되고, 따라서 렌더링 될때 이는 초기화되어 장바구니 데이터(cart)가 비어있는 상태로 PUT 요청이 서버로 가게 된다. 따라서 이전 데이터들이 다 날라갈 수 있다. -> 어떻게 수정해야할까?

// 컴포넌트 함수 외부에 변수를 추가해 초기 랜더링시 체크해서 맞다면 false바꾸고 데이터를 보내지 않도록 수정하면 된다.
let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.isCartVisible);
  const notification = useSelector((state) => state.ui.notification);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    const sendCartData = async () => {
      // 요청 시작시, 로딩과 에러 상태에 따른 엑션 객체 전달
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "Sending...",
          message: "Sending Cart Data!",
        })
      );

      const response = await fetch(
        `https://react-http-45745-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "applycation/json",
          },
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error("Sending cart data failed");
      }

      const data = await response.json();

      // 응답 오면, 다시 알림!
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!!",
          message: "Sent Cart Data successfully!",
        })
      );
    };

    // 서버 요청 전 최초 렌더링인지 확인 -> 맞으면 데이터 안보냄
    if (isInitial) {
      isInitial = false;
      return;
    }

    // catch로 에러 알림
    sendCartData().catch((error) => {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!!",
          message: "Sent Cart Data Failed!",
        })
      );
    });
  }, [cart, dispatch]); // 장바구니 변경사항 뿐만아니라 디스패치 트리거도 변경이 있을경우에 해당 이펙트 함수를 다시 동작하게 한다.
  // 현재 요청 상태에 따라 다른 알림 상태를 받게 되었다.

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
