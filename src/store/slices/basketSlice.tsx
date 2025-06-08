import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BasketItem {
    id: number;
    name: string;
    category: string;
    description: string;
    price: number;
    currency: string;
    left: number;
    tags: {[key: string]: string};
    images: string[];
    quantity: number;
}

const initialState = {
  items: []
} as {
  items: BasketItem[]
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    add(state, action: { type: string; payload: any }) {
      state.items.push({
        ...action.payload,
        quantity: 1
      })
    },
    remove(state, action: { type: string; payload: any }) {
      state.items = state.items.filter(item => item.id !== action.payload.id)
    },
    incrementQuantity(state, action: PayloadAction<{ id: number }>) {
      const { id } = action.payload;
      const item = state.items.find((i: any) => i.id === id);
      if (item) {
        if (item.quantity >= item.left) {
            return;
        }
        item.quantity += 1;
      }
    },
    decrementQuantity(state, action: PayloadAction<{ id: number }>) {
        const { id } = action.payload;
        const item = state.items.find((i: any) => i.id === id);
        if (item) {
            if (item.quantity < 2) {
                state.items = state.items.filter(item => item.id != id)
                return;
            }
            item.quantity -= 1;
        }
      },
  },
});

export const { add, remove, incrementQuantity, decrementQuantity} = basketSlice.actions;

export default basketSlice.reducer;
