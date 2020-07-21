const initialState = {
  user: {
    authenticated: true,
  },
  accounts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
