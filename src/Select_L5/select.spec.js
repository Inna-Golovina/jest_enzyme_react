//тестирование пропсов

import React from "react";
import Select from "./select";
import { shallow } from "enzyme";

const props = {
  options: [
    { value: "text_1", label: "Test 1" },
    { value: "text_2", label: "Test 2" },
  ],
  value: 0,
  handleChange: () => {},
};

const setUp = (props) => shallow(<Select {...props} />);

describe('Select component', () => {
  describe('Has props', () => { // наличие пропсов
    const component = setUp(props);

    // тестируем наличие в разметке самого селекта и двух опций так, как в массиве у нас 2 элемента

    it('should render select element', () => { 
      const select = component.find('select');
      expect(select).toHaveLength(1);
    })

    it('should render 2 options', () => { 
      const options = component.find('option');
      expect(options).toHaveLength(2);
    })

  })

  describe('Has no props', () => { //отсутсвие пропсов
    // у нас должен рендериться не селект, а плейсхолдер
    it('should render placeholder', () => { 
      const component = shallow(<Select />);
      const placeholder = component.find('.placeholder');
      expect(placeholder).toHaveLength(1);
    })
    
  })

  describe('defaultProps', () => { //отсутсвие пропсов
    // у нас должен рендериться не селект, а плейсхолдер
    it('should use default handleChange', () => {
      const result = Select.defaultProps.handleChange(); //в переменную мы присваиваем результат вызова метода, который идет на прямую из компонента селект
      expect(result).toBe('Test'); // так как по умолчанию наша функция ничего не возвращает
    })
  })
})