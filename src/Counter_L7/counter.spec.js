import { shallow } from "enzyme";
import React from "react";
import Counter from "./counter";

//тестирование событий клика

const setUp = () => shallow(<Counter />);

describe('Count component', () => {
  let component;
  let instance;
  beforeEach(() => {
    component = setUp();
    instance = component.instance();
  });

  it('should render Counter component', () => { //проверяем рендеринг
    expect(component).toMatchSnapshot();
  });
  //мы будем проверять снимок и симулировать нажатие

  describe('Count handlers', () => {
    it('should changecount value to plus one', () => { 
      const btn = component.find('.plusOneBtn') //ищем нашу кнопку по классу
      btn.simulate('click'); // симулируем нажатие на нее с помощью метода simulete
      // expect(component).toMatchSnapshot(); //большие компоненты им тестировать не удобно
      expect(component.state().count).toBe(1); // обращаемся к state компонента и проверяем дейстиветельно ли значение счетчика изменилось на + 1
    })

     it('should reset count value to 10', () => { // 1 вариант - обнуление счетчика до заданого значения
      const btn = component.find('.resetBtn') //ищем нашу кнопку по классу
      btn.simulate('click'); // симулируем нажатие на нее с помощью метода simulete
      expect(component.state().count).toBe(10); // обращаемся к state компонента и проверяем дейстиветельно ли значение изменилось
    })

    it('should reset count value to custom value', () => { // 2 вариант - взять инстанс и вызвать напрямую его метод handleReset, в этом случае мы даже можем передать аргумент
      instance.handleReset(20);
      expect(component.state().count).toBe(20); // обращаемся к state компонента и проверяем дейстиветельно ли значение изменилось
    })
  });
})
