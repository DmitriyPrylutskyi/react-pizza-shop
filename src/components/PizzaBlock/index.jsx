import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '../Button';
import { availableTypes, availableSizes } from '../../const'

function PizzaBlock({ id, name, imageUrl, price, types, sizes, onClickAddPizza }) {
  const [activeType, setActiveType] = React.useState(types[0]);
  const [activeSize, setActiveSize] = React.useState(sizes[0]);
  const [factorType, setFactorType] = React.useState(1);
  const [factorSize, setFactorSize] = React.useState(1);
  const [actualPrice, setActivePrice] = React.useState(price);

  React.useEffect(() => {
    if (!types.includes(0)) changePriceType(1);
    if (!sizes.includes(26) && sizes.includes(30)) {changePriceSize(30)} else {
      if (!sizes.includes(26) && !sizes.includes(30)) changePriceSize(40)
    }
    setActivePrice(+(price * factorType * factorSize).toFixed(0));
  }, []);

  React.useEffect(() => {
    setActivePrice(+(price * factorType * factorSize).toFixed(0));
  }, [factorType, factorSize]);

  const onSelectType = (index) => {
    setActiveType(index);
    changePriceType(index);
  };

  function changePriceType(index) {
    setFactorType(index === 0 ?  1  : 1.05);
  }

  const onSelectSize = (size) => {
    setActiveSize(size);
    changePriceSize(size)
  };

  function changePriceSize(size) {
    switch (size) {
      case 26 :
        setFactorSize(1);
        break;
      case 30 :
        setFactorSize(1.1);
        break;
      case 40 :
        setFactorSize(1.2);
        break;
      default :
    }
  }

  const onAddPizza = () => {
    const obj = {
      id: (id + 1) * 100 + activeSize + activeType,
      name,
      imageUrl,
      actualPrice,
      size: activeSize,
      type: activeType,
    };
    onClickAddPizza(obj);
  };

  return (
    <div className="pizza-block">
      <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      <h4 className="pizza-block__title">{name}</h4>
      <div className="pizza-block__selector">
        <ul>
          {availableTypes.map((type, index) => (
            <li
              key={index}
              onClick={() => onSelectType(index)}
              className={classNames({
                active: activeType === index,
                disabled: !types.includes(index),
              })}>
              {type}
            </li>
          ))}
        </ul>
        <ul>
          {availableSizes.map((size, index) => (
            <li
              key={index}
              onClick={() => onSelectSize(size)}
              className={classNames({
                active: activeSize === size,
                disabled: !sizes.includes(size),
              })}>
              {size} см.
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">{actualPrice} ₽</div>
        <Button onClick={onAddPizza} className="button--add" outline>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
        </Button>
      </div>
    </div>
  );
}

PizzaBlock.propTypes = {
  name: PropTypes.string,
  imageUrl: PropTypes.string,
  price: PropTypes.number,
  types: PropTypes.arrayOf(PropTypes.number),
  sizes: PropTypes.arrayOf(PropTypes.number),
  onClickAddPizza: PropTypes.func,
  addedCount: PropTypes.number,
};

PizzaBlock.defaultProps = {
  name: '---',
  price: 0,
  types: [],
  sizes: [],
};

export default PizzaBlock;
