//тестирование событий и обработчиков событий

import { shallow } from "enzyme";
import React from "react";
import Posts from "./posts";

const setUp = () => shallow(<Posts />);

describe("Posts component", () => {
  const DEFAULT_PAGE = 10;
  let component;
  let instance;

  beforeEach(() => {
    component = setUp();
    instance = component.instance(); //результат работы shallow, который по сути возвращает наш компонент
  })

  it('should render Posts component', () => {
    expect(component).toMatchSnapshot();
  })
  describe('Posts handlers', () => { // кейс для тестирования всех хендлеров внутри компонента
    it('should handle search input value', () => {
      expect(component.state().searchQuery).toBe('') // проверяем, чтобы строка в стейте была пустая
      instance.handleInputChange({ target: { value: 'test' } }) //этот м-д принимает объект события, вытягивает из него value и присваевает в state значение searchQuery, внутри мы обращаемся к этому методу, который мы берем у instanceю
      expect(component.state().searchQuery).toBe('test') // Внутрь м-да мы передаем объект события со значением 'test', мы ожидаем, что будет вызван setState и значение searchQuery с пустой строки обновится на 'test'
    });

    it('should handle change hits per page', () => {
      expect(component.state().hitsPerPage).toBe(20)  // проверяем начальное значение стейта
      instance.handleHitsChange({ target: { value: String(DEFAULT_PAGE) } }) //вызываем м-д, в кторый передаем дефолтное значение страницы, мы обернули его в стринг так, как с селекта возвращается строка
      expect(component.state().hitsPerPage).toBe(DEFAULT_PAGE)
    });

    it('should handle change page if Enter clicked', () => { // мы передаем ключ клавиши
      instance.setState( { page: DEFAULT_PAGE } ) //покрываем нажатие на ентер, подтверждение запроса
      instance.getSearch({ key: 'Enter' }) //если клавиша нажата, то значение должно быть сброшено в 0
      expect(component.state().page).toBe(0)
    });
    it("should not change page if 'a' button is clicked", () => { // мы нажимаем не ентер, а любую другую клавишу
      instance.setState( { page: DEFAULT_PAGE } ) //покрываем нажатие на ентер, подтверждение запроса
      instance.getSearch({ key: 'a' }) //если клавиша нажата, то изменение стейта не происходит
      expect(component.state().page).toBe(DEFAULT_PAGE)
    });
  });
});






// урок 3
//тестирование снимков

/* import { shallow } from "enzyme";
import React from "react";
import Posts from "./posts";

describe('Posts component', () => {
  it('should render Post component', () => {
    const component = shallow(<Posts />);
    expect(component).toMatchSnapshot();
  })
})
 */
