import create from "zustand";

export const useCartStore = create((set) => ({
  cart: {},
  addProduct: ({ id, name }) => {
    set((state) => {
      const cart = { ...state.cart };

      if (!cart[id]) {
        cart[id] = {
          id,
          name,
          quantity: 0,
        };
      }

      cart[id].quantity += 1;

      return { cart };
    });
  },
  removeProduct: () => {},
  deleteProduct: () => {},
}));
