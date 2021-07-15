import { shallow } from "enzyme";
import React from "react";
import Pagination from "./pagination";

const setUp = (props) => shallow(<Pagination {...props} lastPage={20}/>)

describe('Pagination component', () => {
  it('should render Pagination without props', () => { // проверяем отсутствие пропсов
    const component = shallow(<Pagination />);
    expect(component).toMatchSnapshot(); // при их отсутствии компонент должен отрендерить дефолтное состояние
  })

  it('should render Pagination with props', () => { // проверяем передачу пропсов
    const component = setUp();
    expect(component).toMatchSnapshot(); // при передаче пропсов компонент отрисовать базовою разметку
  })

  it('should render Pagination for last pages', () => { // мы проверяем срабатывают ли все кнопки, вперед/назад, многоточие и цифры
    const component = setUp({page: 15});
    expect(component).toMatchSnapshot(); // при передаче пропсов компонент отрисовать базовою разметку
  })
  it('should render Pagination without 3dots in the middle', () => { // рендеринг пагинации без многоточия, когда мы находимся на последних страницах, рендерится вариант кнопок назад-вперед, между котрыми идут только цифры
    const component = setUp({page: 16});
    expect(component).toMatchSnapshot(); // при передаче пропсов компонент отрисовать базовою разметку
  })

  it('should render Pagination with 3dots and 3 buttons in the end', () => { // // последние страницы, когда в нас нет блока с цифрами, а после кнопки назад идет многоточие
    const component = setUp({page: 19});
    expect(component).toMatchSnapshot(); // при передаче пропсов компонент отрисовать базовою разметку
  })

  describe('default props', () => { // проверка метода onClick в дефолтных пропсах
    it('should use default onClick', () => {
      const result = Pagination.defaultProps.onClick();
      expect(result).toBe(undefined);
    })

  })
})