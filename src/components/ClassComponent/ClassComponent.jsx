import React from 'react';
import style from './ClassComponent.module.css';
import PropTypes from 'prop-types';

export class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: 'Результат',
      number: 5,
      userNumber: '',
      randomNumber: Math.floor(
        Math.random() * this.props.max - this.props.min) +
        this.props.min,
      count: 0,
    };
  }
  handleSubmit = e => {
    e.preventDefault();
    e.target.elements.user_number.value = '';
    this.setState(state => ({
      count: state.count + 1,
    }));
    this.setState(state => {
      if (!state.userNumber) {
        return {
          result: 'Введите больше число',
        };
      }
      if (state.userNumber > state.randomNumber) {
        return {
          result: `${state.userNumber} больше загаданного`,
        };
      }
      if (state.userNumber < state.randomNumber) {
        return {
          result: `${state.userNumber} меньше загаданного`,
        };
      }
      e.target.elements.submit.hidden = true;
      e.target.elements.reset.hidden = false;
      e.target.elements.user_number.disabled = true;
      return {
        result: `Вы угадалии, загаданное число ${state.userNumber},
        попыток ${state.count}`,
      };
    });
  };
  handleReset = e => {
    e.preventDefault();
    e.target.elements.user_number.value = '';
    this.setState(state => ({
      count: 0,
    }));
    this.setState(state => {
      e.target.elements.submit.hidden = false;
      e.target.elements.reset.hidden = true;
      e.target.elements.user_number.disabled = false;
      return {
        result: `Результат`,
      };
    });
  };
  handleChange = (e) => {
    this.setState((state, props) => ({
      userNumber: e.target.value
    }));
  };
  render() {
    return (
      <div className={style.game}>
        <p className={style.result}>{this.state.result}</p>
        <form className={style.form}
          onSubmit={this.handleSubmit}
          onReset={this.handleReset}>
          <label className={style.label} htmlFor='user_number'
            id='user_number_label'>
            Угадай число
          </label>
          <input className={style.input} type='number' id='user_number'
            onChange={this.handleChange} value={this.state.userNumber} />
          <button type='submit'
            className={style.btn} id='submit'>Угадать</button>
          <button type='reset' id='reset'
            className={style.btn} hidden>Сыграть еще раз</button>
        </form>
      </div >
    );
  }
}

ClassComponent.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
};
