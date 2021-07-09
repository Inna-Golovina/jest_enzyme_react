import { shallow } from "enzyme";
import React from "react";
import Button from "./button";

//тестирование событий клика
//мок вываемых функций с помощью jest function;

describe('Button component', () => {
  it('should call onClick method', () => {
    const mockCallBack = jest.fn(); // внутри компонента мы тестируем, а действительно ли вызывается переданная функция
    // никакого стейта внутри компонента не изменяется и практически нет данных 
    //за которые можно зацепиться
    const component = shallow(<Button onClick={mockCallBack}/>) // нам необходимо замокать передаваемую в компонент функцию, она идет в виде пропса onClick
    expect(mockCallBack.mock.calls.length).toEqual(0)
    component.find('.btn').simulate('click') // мы симулируем нажатие
    expect(mockCallBack.mock.calls.length).toBe(1) //проверяем изменился ли счетчик вызова
  })
})