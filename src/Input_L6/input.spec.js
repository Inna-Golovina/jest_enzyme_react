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