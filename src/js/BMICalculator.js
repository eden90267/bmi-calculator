import React from 'react';

import { view as Form } from './bmi/';
import { view as Log } from './log/';

const BMICalculator = () =>
  <div>
    <div className="header">
      <Form/>
    </div>
    <div className="content">
      <Log/>
    </div>
    <div className="container-fluid footer text-center">
      <img src={require('BMICLogo.png')}/>
    </div>
  </div>;

export default BMICalculator;
