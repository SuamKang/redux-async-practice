import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

// 'GET' 요청
export const fetchCartData = () => {
  return async (dispatch) => {
    // 비동기 요청
    const fetchRequest = async () => {
      const response = await fetch(
        `https://react-http-45745-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json`
      );

      if (!response.ok) {
        throw new Error("Could not fetch cart data!");
      }

      const data = await response.json();

      return data; // 결과적으로 서버로부터 받아온 응답인 장바구니 데이터를 반환한다.
    };

    try {
      const responseCartData = await fetchRequest();
      // 서버에서 가져온 데이터는 파싱되어 다시 객체로 받아져야 사용할 수 있는데 이는 이미 cartSlice 리듀서에있는 replaceCart메소드를 사용하면 action으로 받는 payload 즉, 데이터를 객체로 전환해서 받을 수 있고, 그럼 스토어에 있는 cart로 교체할 수 있다. -> 서버의 데이터로 불러옴과 동시에 전역 스토어에 그 데이터도 업데이트 되어 저장됨.
      dispatch(
        cartActions.replaceCart({
          items: responseCartData.items || [],
          totalQuantity: responseCartData.totalQuantity,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!!",
          message: "Fetching Cart Data Failed!",
        })
      );
    }
  };
};

// 'PUT' 요청
export const sendCartData = (cartData) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending Cart Data!",
      })
    );

    // 비동기 요청
    const sendPutRequset = async () => {
      const response = await fetch(
        `https://react-http-45745-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "applycation/json",
          },
          body: JSON.stringify({
            items: cartData.items,
            totalQuantity: cartData.totalQuantity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Sending cart data failed");
      }
    };

    try {
      // 외부 async함수안에서 기다리는 비동기 요청 함수임으로 await을 걸어주었다.
      await sendPutRequset();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!!",
          message: "Sent Cart Data successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!!",
          message: "Sent Cart Data Failed!",
        })
      );
    }
  };
};
