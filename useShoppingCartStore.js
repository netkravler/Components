import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

export const useShoppingCartStore = create(
  persist(
    (set) => ({
      cartID: uuidv4(),
      cartItems: [],
      //** empty  cart */
      setEmptyCart: () => set(() => ({ cartItems: [] })),
      //** delete item in cart */
      setDeleteItem: (id) =>
        set((state) => ({
          cartItems: [
            ...state.cartItems.filter((item) => {
              return item.id !== id;
            }),
          ],
        })),

      //** increace items by id, add if it does not exsist */

      increaseCartQuantity: (id, price, quant) =>
        set((state) => {
          /** check if id allready exsist */
          if (state.cartItems.find((item) => item.id === id) == null) {
            //** return cart item if it does not exsist in the cartItems array */
            return { cartItems: [...state.cartItems, { id: id, price: price, amount: 1 * quant }] };
          } else {
            //** if item exsist by id increase the ammount */
            return {
              cartItems: state.cartItems.map((item) => {
                if (item.id === id) {
                  //** return the found item with new value */
                  return {
                    ...item,
                    amount: item.amount + quant || 1,
                  };
                } else {
                  //** else return the found item as is */
                  return { ...item };
                }
              }),
            };
          }
        }),
    }),
    { name: "zustandCart", getStorage: () => localStorage }
  )
);
