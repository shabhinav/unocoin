const initialState = {
  id: "",
  createUser: false,
};

const reducer = (state = initialState, action) => {
  if (action.type === "ID") {
    return {
      id: action.id,
    };
  }

  return state;
};

export default reducer;
