const timeSet = (setState, state, milsec) => {
  setTimeout(() => {
    setState(state);
  }, milsec);
};

export default timeSet;
