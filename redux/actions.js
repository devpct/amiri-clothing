export const setCategoryId = (id) => ({
    type: 'SET_SELECTED_CATEGORY_ID',
    payload: id
});

export const setSortBy = (name) => ({
    type: 'SET_SELECTED_SORT_BY',
    payload: name
});

export const setShoppingCarts = (bet) => ({
    type: 'SET_SHOPPING_CARTS',
    payload: bet
});

export const setCartsQty = (qty) => ({
    type: 'SET_CARTS_QTY',
    payload: qty
});

export const setDarkMode = (bet) => ({
    type: 'SET_DARK_MODE',
    payload: bet
});