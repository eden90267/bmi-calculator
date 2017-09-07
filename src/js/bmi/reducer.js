import { SAVE_BMI } from './actionTypes';
import StorageUtil from '../utils/StorageUtil';

export default (state = [], action) => {
  switch (action.type) {
    case SAVE_BMI: {
      const newState = [
        { ...action.log },
        ...state,
      ];
      StorageUtil.saveLogs(newState);
      return newState;
    }
    default:
      return state;
  }
};
