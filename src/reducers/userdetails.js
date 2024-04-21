const detailReducer = (state = { data: null }, action) => {
    switch (action.type) {
      case "FETCHED":
        return { ...state, data: action?.data, };
      default:
        return state;
    }
  };
  
  export default detailReducer;
  