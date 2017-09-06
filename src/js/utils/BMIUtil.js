const evaluations = ['過輕', '理想', '過重', '輕度肥胖', '中度肥胖', '重度肥胖'];

const engEvaluations = ['tolight', 'ideal', 'toheavy', 'lightheavy', 'mediumheavy', 'weightheavy'];

const getEvaluationIdx = (bmi) => {
  if (bmi < 18.5) {
    return 0;
  } else if (bmi >= 18.5 && bmi < 24) {
    return 1;
  } else if (bmi >= 24 && bmi < 27) {
    return 2;
  } else if (bmi >= 27 && bmi < 30) {
    return 3;
  } else if (bmi >= 30 && bmi < 35) {
    return 4;
  }
  return 5;
};

const getEvaluation = bmi => evaluations[getEvaluationIdx(bmi)];

const getEngEvaluation = bmi => engEvaluations[getEvaluationIdx(bmi)];


export default {
  getEvaluation, getEngEvaluation,
};
