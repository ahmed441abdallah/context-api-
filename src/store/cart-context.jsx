import { createContext, useReducer, useState } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products";
export const CartContext = createContext({
    // default value of the context (INITIAL STATE)
    items: [],
    addToCart: () => { },
    updateCartItemQuantity: () => { }
});
// write all the logic for the cart here
function cartReducer(state, action) {
    if (action.type === 'ADD') {
        const updatedItems = [...state.items];
        const existingCartItemIndex = updatedItems.findIndex(
            (cartItem) => cartItem.id === action.payload
        );
        const existingCartItem = updatedItems[existingCartItemIndex];

        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity + 1,
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            const product = DUMMY_PRODUCTS.find((product) => product.id === action.payload);
            updatedItems.push({
                id: action.payload,
                name: product.title,
                price: product.price,
                quantity: 1,
            });
        }

        return {
            items: updatedItems,
        };

    }
    if (action.type === 'UPDATE') {
        const updatedItems = [...state.items];
        const updatedItemIndex = updatedItems.findIndex(
            (item) => item.id === action.payload.productId
        );

        const updatedItem = {
            ...updatedItems[updatedItemIndex],
        };

        updatedItem.quantity += action.payload.amount;

        if (updatedItem.quantity <= 0) {
            updatedItems.splice(updatedItemIndex, 1);
        } else {
            updatedItems[updatedItemIndex] = updatedItem;
        }

        return {
            items: updatedItems,
        };
    }
    return state
}
export function CartContextProvider({ children }) {
    // cartState is the state of the cart = {items: []}
    const [cartState, dispatch] = useReducer(cartReducer, { items: [] });

    function handleAddItemToCart(id) {
        dispatch({ type: 'ADD', payload: id });
    }

    function handleUpdateCartItemQuantity(productId, amount) {
        dispatch({ type: 'UPDATE', payload: { productId, amount } });
    }
    const CtxValue = {
        items: cartState.items,
        addToCart: handleAddItemToCart,
        updateCartItemQuantity: handleUpdateCartItemQuantity,
    }
    return (
        <CartContext.Provider value={CtxValue}>
            {children}
        </CartContext.Provider>
    );
}