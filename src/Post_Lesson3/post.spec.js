//Тестирование отрисовки

import { shallow } from "enzyme";
import React from "react";
import Post from "./post";

const setUp = (props) => shallow(<Post {...props}/>);

describe('should render Post component', () => {
  let component;
    beforeEach(() => { //мы делаем присвоение каждый раз перед запуском каждого теста
      component = setUp();
    })

  it('should contain .post wrapper', () => {
    //const component = setUp(); const component = shallow(<Post />);

    const wrapper = component.find('.post'); //ищем обертку с классом post и добавл. ее в константу wrapper
    expect(wrapper.length).toBe(1); // проверка, что данный элемент в нашем компоненте встречается только 1 раз
    //console.log(component.debug());
  });
  
  it('should contain link', () => {
    //const component = setUp(); const component = shallow(<Post />);

    const wrapper = component.find('a'); //ищем тег a и добавл. ее в константу wrapper
    expect(wrapper.length).toBe(1); // проверка, что данный элемент в нашем компоненте встречается только 1 раз
  });

  it('should render created date', () => {
    const created_at = '07-07-2021'; //создаем константу даты
    component = setUp({ created_at }) //передаем эти данные в функцию в виде пропсов
    const date = component.find('.date'); //ищем элемент с помощью класса (проверяем не длину элементов, а их контент) a и добавл. ее в константу wrapper
    expect(date.text()).toBe(new Date(created_at).toLocaleDateString()); // проверка, что данный элемент есть в нашем компоненте и совпадает с сегодняшней
  });
})

