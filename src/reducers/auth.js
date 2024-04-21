const authReducer = (state = { data: null }, action) => {
    switch (action.type) {
      case "LOGIN":
        sessionStorage.setItem("Profile", JSON.stringify({ ...action?.data }));
        return { ...state, data: action?.data,lastlogin:Date.now() };
  
      case "SIGNUP":
        localStorage.setItem("Profile", JSON.stringify({ ...action?.data }));
        return { ...state, data: action?.data };
      case "LOGOUT":
        sessionStorage.clear();
        state=undefined;
        return { ...state, data: null };
      default:
        return state;
    }
  };
  
  export default authReducer;
  