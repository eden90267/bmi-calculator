import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import BMIUtil from '../../utils/BMIUtil';

class Log extends Component {
  render() {
    return (
      <div className="container Log">
        <div className="row">
          <div className="col-xs-12 col-sm-12">
            <h2 className="h3 text-center">BMI 紀錄</h2>
          </div>
          <div className="col-xs-12 col-sm-8 col-xs-offset-0 col-sm-offset-2">
            <div className="row">
              <ul className="list-unstyled">
                {
                  this.props.logs.map((item) => {
                      const engEvaluation = BMIUtil.getEngEvaluation(item.bmi);
                      return (
                        <li>
                          <ul className={['list-inline', 'log-item-list', `log-item-list-${engEvaluation}`]}>
                            <li>{item.evaluation}</li>
                            <li>BMI</li>
                            <li>{item.bmi}</li>
                            <li>weight</li>
                            <li>{`${item.weight}kg`}</li>
                            <li>height</li>
                            <li>{`${item.weight}cm`}</li>
                            <li>{item.date}</li>
                          </ul>
                        </li>
                      );
                    },
                  )
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Log.propTypes = {
  logs: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  logs: state.logs,
});

export default connect(mapStateToProps)(Log);
