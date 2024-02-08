import { createStore } from 'redux';

const initialState = {
  selectedCategoryId: '',
  selectedSortBy: '',
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SELECTED_CATEGORY_ID':
      return {
        ...state,
        selectedCategoryId: action.payload
      };
      case 'SET_SELECTED_SORT_BY':
        return {
          ...state,
          selectedSortBy: action.payload
        };
    default:
      return state;
  }
};

const store = createStore(rootReducer);

export default store;
