import { configureStore } from "@reduxjs/toolkit";

import uiSlice from "./ui-slice";
import cartSlice from "./cart-slice";
// 전역으로 관리되어야할 상태 생각해보자
// 우선 shop에 있는 항목들을 관리할 항목 상태 배열이 다른 컴포넌트에 영향을 끼칠까?? 그렇다.
// 그럼 장바구니 관리용 slice를 만들어야한다.
// 그리고 장바구니 버튼이벤트로 헨들링되어야하는 부분도 인터페이스 로직용 slice도 필요할것같다.

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export default store;
