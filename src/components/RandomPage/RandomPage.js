import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';
import './RandomPage.scss';
import { Translate } from 'react-localize-redux/es/Translate';
import translations from '../../translations/randomPage.json';
import InputPH from '../primitives/InputPH/InputPH';

class RandomPage extends PureComponent {
  static propTypes = {
    addTranslation: PropTypes.func.isRequired,
  };

  static onChangeInput(e) {
    if (e.target.value.length >= 15) {
      e.target.value = e.target.value.slice(0, 15);
    }
  }

  static onKeyDownInput(e) {
    if (e.keyCode === 190 || e.keyCode === 188 || e.keyCode === 109) {
      e.preventDefault();
    }
  }

  static addOnWheel(element, handler) {
    if (element.addEventListener) {
      if ('onwheel' in document) {
        // IE9+, FF17+
        element.addEventListener('wheel', handler);
      } else if ('onmousewheel' in document) {
        // устаревший вариант события
        element.addEventListener('mousewheel', handler);
      } else {
        // 3.5 <= Firefox < 17, более старое событие DOMMouseScroll пропустим
        element.addEventListener('MozMousePixelScroll', handler);
      }
    } else { // IE8-
      element.attachEvent('onmousewheel', handler);
    }
  }

  static scrollIncrement(e) {
    let delta; // Направление колёсика мыши
    let prev = e.target.value; // Значение input'а

    // Opera и IE работают со свойством wheelDelta
    if (e.wheelDelta) { // В Opera и IE
      delta = e.wheelDelta / 120;
      // В Опере значение wheelDelta такое же, но с противоположным знаком
      if (window.opera) delta = -delta; // Дополнительно для Opera
    } else if (e.detail) { // Для Gecko
      delta = -e.detail / 3;
    }
    // Запрещаем обработку события браузером по умолчанию
    if (e.preventDefault) e.preventDefault();
    e.returnValue = false;

    // Проверяем значение
    if (/^[\d-]+$/.test(prev)) {
      prev = Number(prev);
      // Проверяем направление скролла
      if (delta === 1) e.target.value = prev + 1;
      if (delta === -1) e.target.value = prev - 1;
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      randomNumber: 0,
    };
    this.minInput = React.createRef();
    this.maxInput = React.createRef();
    props.addTranslation(translations);
    RandomPage.onKeyDownInput = ::RandomPage.onKeyDownInput;
    RandomPage.onChangeInput = ::RandomPage.onChangeInput;
  }

  componentDidMount() {
    const min = this.minInput.current;
    const max = this.maxInput.current;
    RandomPage.addOnWheel(min, RandomPage.scrollIncrement);
    RandomPage.addOnWheel(max, RandomPage.scrollIncrement);
  }

  randomInteger() {
    const rangeMin = this.minInput.current;
    const rangeMax = this.maxInput.current;
    if (!!rangeMin.value && !!rangeMax.value) {
      const min = Number(rangeMin.value.match(/^[\d-]*$/)[0]);
      const max = Number(rangeMax.value.match(/^[\d-]*$/)[0]);
      let rand = min + Math.random() * (max + 1 - min);
      rand = Math.floor(rand);
      this.setState({ randomNumber: rand });
    }
  }

  render() {
    const { randomNumber } = this.state;
    return (
      <div className="container h-100">
        <div className="row justify-content-center h-100">
          <div className="col-auto d-flex flex-column align-items-center justify-content-around h-100">
            <h1 className="display-4 text-center">
              <Translate id="randomPage.header" />
            </h1>
            <h1 className="display-1">{randomNumber}</h1>
            <button type="button" onClick={::this.randomInteger}>
              <Translate id="randomPage.buttonStart" />
            </button>
            <div className="row justify-content-center">
              <div className="col-auto">
                <InputPH
                  placeholder={<Translate id="randomPage.minInputText" />}
                  inputParams={{
                    ref: this.minInput,
                    type: 'number',
                    min: '1',
                    defaultValue: '1',
                    autoComplete: 'off',
                  }}
                  inputEvents={{
                    onKeyDown: RandomPage.onKeyDownInput,
                    onChange: RandomPage.onChangeInput,
                  }}
                />
              </div>
              <div className="w-100 d-block d-sm-none" />
              <div className="col-auto">
                <InputPH
                  placeholder={<Translate id="randomPage.maxInputText" />}
                  inputParams={{
                    ref: this.maxInput,
                    type: 'number',
                    min: '1',
                    defaultValue: '100',
                    autoComplete: 'off',
                  }}
                  inputEvents={{
                    onKeyDown: RandomPage.onKeyDownInput,
                    onChange: RandomPage.onChangeInput,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withLocalize(RandomPage);
