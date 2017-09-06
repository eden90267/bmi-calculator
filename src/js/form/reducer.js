import { SAVE_FORM } from './actionTypes';

export default (state = [], action) => {
  switch (action.type) {
    case SAVE_FORM:
      return [
        { ...action.log },
        ...state,
      ];
    default:
      return state;
  }
};
