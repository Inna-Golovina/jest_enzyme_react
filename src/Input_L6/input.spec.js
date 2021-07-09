//тестирование событий и обработчиков событий
// в инпуте никакой внутренней логики нет, будет достаточно провести снепшот-тестирование

import { shallow } from "enzyme";
import React from "react";
import Input from "./input";

describe('Input component', () => {
  it('should use default onChange', () => {
    const component = shallow(<Input />);
    expect(component).toMatchSnapshot();
  })

  it('should call onChange method', () => {
    const mockCallBack = jest.fn(); // внутри компонента мы тестируем, а действительно ли вызывается переданная функция
    // никакого стейта внутри компонента не изменяется и практически нет данных 
    //за которые можно зацепиться
    const component = shallow(<Input onChange={mockCallBack}/>) // нам необходимо замокать передаваемую в компонент функцию, она идет в виде пропса onClick
    expect(mockCallBack.mock.calls.length).toEqual(0)
    component.find('.input').simulate('change') // мы симулируем нажатие
    expect(mockCallBack.mock.calls.length).toBe(1) //проверяем изменился ли счетчик вызова
  })

  describe('defaultProps', () => {
    it('should use default onChange', () => { //для метода onChange
      const result = Input.defaultProps.onChange();
      expect(result).toBe(undefined)
    })

    it('should use default onKeyPress', () => { //для метода onKeyPress
      const result = Input.defaultProps.onKeyPress();
      expect(result).toBe(undefined)
    })
  })
})