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
  removeProduct: ({ id }) => {
    set((state) => {
      const cart = { ...state.cart };

      if (!cart[id]) {
        return { cart };
      }

      const updatedQuantity = cart[id].quantity - 1;
      if (updatedQuantity <= 0) {
        delete cart[id];
      } else {
        cart[id].quantity = updatedQuantity;
      }

      return { cart };
    });
  },
  deleteProduct: () => {},
}));
