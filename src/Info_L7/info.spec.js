//тестирования методов жизненного цикла

import { shallow } from "enzyme";
import React from "react";
import Info from "./info";

const setUp = () => shallow(<Info />); // у этой функции упрощенная реализация так, как пропсы нам не понадобятся

const componentDidMountSpy = jest.spyOn(Info.prototype, 'componentDidMount'); // на каждый из методов ЖЦ мы вешаем шпиона или м-д spyOn (обертка слежения)
const componentDidUpdateSpy = jest.spyOn(Info.prototype, 'componentDidUpdate');
const componentWillUnmountSpy = jest.spyOn(Info.prototype, 'componentWillUnmount');

describe('Info component', () => {
  let component;

  // мы сначала должны создать наблюдателей, а только затем добавить функции, за котгорыми мы будем следить в компоненте

  beforeEach(() => {
    jest.spyOn(window, 'addEventListener'); // вешаем такие же отслеживания на методы addEventListener и removeEventListener
    jest.spyOn(window, 'removeEventListener');
    component = setUp(); // создаем компонент используя функцию setUp
  })

  afterEach(() => { // при текущей реализации он необязательный, срабатывае после каждого теста, в нашей логике он сбрасывает замоканые реал-ции в начальное состояние
    window.addEventListener.mockRestore();
    window.removeEventListener.mockRestore();
  })

  it('should render Info component', () => { //
    expect(component).toMatchSnapshot();
  })

  describe('Lifecycle methods', () => {
    it('should call componentDidMount once', () => {
      expect(componentDidMountSpy).toHaveBeenCalledTimes(1); // мы проверяем чтобы componentDidMount вызывался только 1 раз
    })

    it('should not call componentWillUnmount when component just mounted', () => {
      expect(componentDidMountSpy).toHaveBeenCalledTimes(1); // мы проверяем чтобы componentDidMount вызывался только 1 раз
      expect(componentWillUnmountSpy).toHaveBeenCalledTimes(0); // и не произошла размонтировка
    })

    it('should call componentDidUpdate', () => {
      component.setProps(); // мы проверяем действительно ли произошло изменение при получении новых пропсов
      expect(componentDidUpdateSpy).toHaveBeenCalledTimes(1); // вызвался ли данный метод
    })

    it('should call componentWillUnmount', () => { // мы проверяем что при розмонтировании компонента вызвался метод componentWillUnmount
      component.unmount(); // мы проверяем количество вызовов
      expect(componentWillUnmountSpy).toHaveBeenCalledTimes(1);
    })
  })

  describe('Components handlers', () => { // мы тестируем методы компонента, чтобы увеличить покрытие тестами
    it('should call addEventListener when component mounted', () => { // мы проверяем что этот обработчик вызывается один раз при монтировании
      expect(window.addEventListener).toHaveBeenCalledTimes(1);
    })

    it('should call handleChangeTitle in componentDidUpdate', () => { // мы проверяем действительно ли происходит обновление заголовка документа при обновлениии компонента
      const instance = setUp().instance(); // нам понадобится инстанс, в нем нам нужно замокать метод handleChangeTitle
      instance.handleChangeTitle = jest.fn(); // делаем это с помощью jest функции
      instance.componentDidUpdate(); // вызываем метод componentDidUpdate 
      expect(instance.handleChangeTitle).toHaveBeenCalled(); // проверяем, что handleChangeTitle действительно был вызван
    })

    it('should call removeEventListener when component unmounted', () => { // мы проверяем розмонтировании компонента обработчик снимается
      component.unmount();
      expect(window.removeEventListener).toHaveBeenCalledTimes(1);
    })

    it('should call call handleWidth during window resize', () => { // мы проверяем, что при изменение размеров окна у нас будет вызываться нужный метод и обновлять значение
      expect(component.state().width).toBe(0); // до запуска метода мы проверяем действительно ли начальное значение в стейте равно 0
      global.dispatchEvent(new Event('resize')) // симмулириуем изменение размеров
      expect(component.state().width).toBe(window.innerWidth) // мы проверяем изменилось ли соответсвенное значение в стейте
    })
  })
})