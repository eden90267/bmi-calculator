import moment from 'moment';

import { SAVE_BMI } from './actionTypes';
import BMIUtil from '../utils/BMIUtil';

export const saveBMI = (height, weight) => {
  const bmi = BMIUtil.computeBMI(height, weight);
  const evaluation = BMIUtil.getEvaluation(bmi);
  const date = moment().format('MM-DD-YYYY');
  return {
    type: SAVE_BMI,
    log: {
      evaluation,
      bmi,
      weight,
      height,
      date,
    },
  };
};
