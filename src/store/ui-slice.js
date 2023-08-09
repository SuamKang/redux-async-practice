import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCartVisible: false, // 장바구니 토글상태
  notification: null, // http 요청시 알림 컴포넌트 상태 -> { status , title, message } 와 같은 프로퍼티가 담긴 객체 형태로
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggle(state) {
      state.isCartVisible = !state.isCartVisible;
    },
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
