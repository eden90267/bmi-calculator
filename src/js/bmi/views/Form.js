import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert';

import BMIUtil from '../../utils/BMIUtil';
import { saveBMI } from '../actions';

class Form extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      height: 0,
      weight: 0,
      isResult: false,
    };
  }

  onInputChange = (e) => {
    switch (e.target.getAttribute('name')) {
      case 'height':
        this.setState({ height: e.target.value });
        break;
      case 'weight':
        this.setState({ weight: e.target.value });
        break;
      default:
        throw new Error(`Unsupported input element name: ${e.target.getAttribute('name')}`);
    }
  };

  watch = () => {
    if (this.state.isResult) return;
    if (!this.state.height || this.state.height === 0
      ||
      !this.state.weight || this.state.weight === 0) {
      swal('Confirm', 'height and weight fields is required!', 'warning');
      return;
    }
    this.props.onSaveBMI(this.state.height, this.state.weight);
    this.setState({
      isResult: true,
    });
  };

  refresh = () => {
    this.setState({
      height: 0,
      weight: 0,
      isResult: false,
    });
  };

  render() {
    let bmi;
    let resultClass = 'result';
    if (this.state.isResult) {
      resultClass += ' result-default';
      if (this.state.height && this.state.weight) {
        bmi = BMIUtil.computeBMI(this.state.height, this.state.weight);
        resultClass += ` result-${BMIUtil.getEngEvaluation(bmi)}`;
      }
    }
    return (
      <div className="container Form">
        <div className="row">
          <div className="col-xs-12 col-sm-2 col-sm-offset-2 text-center">
            <img src={require('BMICLogo.png')} className="bmi-logo"/>
          </div>
          <div className="col-xs-12 col-sm-4">
            <ul className="list-unstyled form-list">
              <li><label htmlFor="height">身高 cm</label></li>
              <li><input id="height" name="height" type="number" placeholder="請輸入身高" value={this.state.height} onChange={this.onInputChange} readOnly={this.state.isResult}/></li>
              <li><label htmlFor="weight">體重 kg</label></li>
              <li><input id="weight" name="weight" type="number" placeholder="請輸入體重" value={this.state.weight} onChange={this.onInputChange} readOnly={this.state.isResult}/></li>
            </ul>
          </div>
          <div className="col-xs-12 col-sm-4 text-center">
            <div id="result" className={resultClass}>{/** if actived result, add "result-default result-ideal" class */}
              <a href="#" className="img-circle" onClick={this.watch}>
                <span>{this.state.isResult ? bmi : '看結果'}</span>
              </a>
              <img src={require('icons_loop.png')} onClick={this.refresh}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Form.propTypes = {
  onSaveBMI: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onSaveBMI: (height, weight) => {
    dispatch(saveBMI(height, weight));
  },
});

export default connect(null, mapDispatchToProps)(Form);
