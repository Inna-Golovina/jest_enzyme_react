//тестирование снимков

import { shallow } from "enzyme";
import React from "react";
import Posts from "./posts";

describe('Posts component', () => {
  it('should render Post component', () => {
    const component = shallow(<Posts />);
    expect(component).toMatchSnapshot();
  })
})

