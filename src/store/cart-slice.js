import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0, // 장바구니 총 항목 수
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart(state, action) {
      const newItem = action.payload;
      // 기존 항목 배열에 존재했는지 파악 => 추후 없을때 받은 newItem을 추가해 주기위한 사전작업
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          price: newItem.price,
          totalPrice: newItem.price,
          quantity: 1, // 새로 만들어주기에
        });
      } else {
        existingItem.quantity++; // 수량 1증가
        existingItem.totalPrice = existingItem.totalPrice + newItem.price; // 추가된 항목가격만큼 총가격 증가
      }
      state.totalQuantity++; // 전체 수량은 존재여부관계없이 추가되면 늘어나야함
    },
    deleteCart(state, action) {
      const id = action.payload;
      // 만약 장바구니 담긴 항목이 한개였을때 수량이 줄건지 아예 제거해야하는지 조건 분기 필요함 -> 따라서 존재하는 항목과 action 항목이 일치한것의 경우를 찾고 조건에따라 수량 or 상태 조절
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--; // 수량 1빼주고
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price; // 총가격도 수정필요
      }
      state.totalQuantity--; // 전체수량 감소
    },
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
