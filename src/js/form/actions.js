import moment from 'moment';

import { SAVE_FORM } from './actionTypes';
import BMIUtil from '../utils/BMIUtil';

export const saveForm = (height, weight) => {
  const bmi = Number(weight / ((height / 100) ** 2)).toFixed(2);
  const evaluation = BMIUtil.getEvaluation(bmi);
  const date = moment().format('MM-DD-YYYY');
  return {
    type: SAVE_FORM,
    log: {
      evaluation,
      bmi,
      weight,
      height,
      date,
    },
  };
};
