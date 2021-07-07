//тестирование пропсов

import { shallow } from "enzyme";
import React from "react";
import Title from "./title";

describe('Title component', () => {
  it('should render Title component with props', () => {
    const component = shallow(<Title title='Test title' />); // мы передаем пропс title
    expect(component).toMatchSnapshot();
  })

  it('should render Title component without props', () => {
    const component = shallow(<Title />); //мы не передаем пропс title, получим дефолтное значение
    expect(component).toMatchSnapshot();
  })
})