//тестирование асинхронных запросов

import React from "react";
import Posts from "./posts";
import {
  NEWS,
  BASE_PATH,
  SEARCH_PATH,
  SEARCH_PARAM,
  PAGE_HITS,
  PAGE_PARAM,
} from "./constants";

const mockJsonPromise = Promise.resolve({hits: NEWS, page: 1, nbPages: 10}); // мы создаем мок для получаемых данных, мы передаем массив новостей, текущую страницу и общ кол-во страниц
const mockFetchPromise = Promise.resolve({json: () => mockJsonPromise}); //добавляем поле json, которому присваиваем тестовый ответ
global.fetch = jest.fn().mockImplementation(() => mockFetchPromise) // с помощью jest function переопределяем глобальный fetch, в дополнение с помощью mockImplementation - описываем имплементацию
// в данном поле мы можем полностью заменить реализацию метода или функции и контолировать ее работу

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

  it('should call fetch in componentDidMount', () => { // проверяем, что припервом монтировании компонента у нас происходит запрос на API
    expect(global.fetch).toHaveBeenCalledWith(
      `${BASE_PATH}${SEARCH_PATH}?${SEARCH_PARAM}${''}&${PAGE_HITS}${20}&${PAGE_PARAM}${0}`
      ); // мы проверяем с какими данными у нас происходит вызов метода fetch, мы сконструировали начальную строку запроса (это данные из начального стейта)
  })

  describe('updatePage method', () => {
    it('should update "page" value', () => { // проверяем, что при вызове метода и установки ему соответствующего аргумента, этот аргум устанавливается в соответсвующее знач. в стейте
      instance.updatePage(DEFAULT_PAGE); // для этого мы используем instance, у которого вызываем соответствующий метод
      expect(component.state().page).toBe(DEFAULT_PAGE); // сравниваем переданное и установленное значение
    });
    it('should call fetch with given argument', () => { // мы должны убедиться, что fetch вызывается с переданным аргументом
      instance.updatePage(DEFAULT_PAGE);
      expect(global.fetch).toHaveBeenCalledWith( // по аналогии с тестом 'should call fetch in componentDidMount' заменяем значение 0 на константу
        `${BASE_PATH}${SEARCH_PATH}?${SEARCH_PARAM}${''}&${PAGE_HITS}${20}&${PAGE_PARAM}${DEFAULT_PAGE}`
        );
    });
  })

  describe('handlePageChange method', () => { // тестируем метод handlePageChange
    it('should call "updatePage" with given argument', () => { // метод updatePage вызывает handlePageChange с переданным значением
      instance.updatePage = jest.fn(); // добавляем mock на updatePage
      instance.setState({ page: DEFAULT_PAGE })// устанавливаем определенное значение в стейте (по дефолту 10)
      instance.handlePageChange({
        target: { getAttribute: jest.fn().mockReturnValue('1') }, // в метод handlePageChange мы передаем замоканые данные события, это объект с полем таргет, внутри которого есть объект с методом getAttribute, данный метод замокан и возвращает нужный нам результат
      }) // сам мок нужен для коректной отработки строки target.getAttribute("data-name")
      expect(instance.updatePage).toHaveBeenCalledWith(1)// мы ожидаем, что метод updatePage будет вызван с переданнным ему значением
    })

    it('should call "updatePage" with increased value', () => { // метод updatePage вызывает handlePageChange с переданным значением prev
      instance.updatePage = jest.fn(); // добавляем mock на updatePage
      instance.setState({ page: DEFAULT_PAGE })// устанавливаем определенное значение в стейте (по дефолту 10)
      instance.handlePageChange({
        target: { getAttribute: jest.fn().mockReturnValue('prev') }, // в метод handlePageChange мы передаем замоканые данные события, это объект с полем таргет, внутри которого есть объект с методом getAttribute, данный метод замокан и возвращает нужный нам результат
      }) // сам мок нужен для коректной отработки строки target.getAttribute("data-name")
      expect(instance.updatePage).toHaveBeenCalledWith(DEFAULT_PAGE - 1)// мы ожидаем, что метод от значения в стейте будет отниматься 1
    })

    it('should call "updatePage" with increased value', () => { // метод updatePage вызывает handlePageChange с переданным значением next
      instance.updatePage = jest.fn(); // добавляем mock на updatePage
      instance.setState({ page: DEFAULT_PAGE })// устанавливаем определенное значение в стейте (по дефолту 10)
      instance.handlePageChange({
        target: { getAttribute: jest.fn().mockReturnValue('next') }, // в метод handlePageChange мы передаем замоканые данные события, это объект с полем таргет, внутри которого есть объект с методом getAttribute, данный метод замокан и возвращает нужный нам результат
      }) // сам мок нужен для коректной отработки строки target.getAttribute("data-name")
      expect(instance.updatePage).toHaveBeenCalledWith(DEFAULT_PAGE + 1)// мы ожидаем, что метод от значения в стейте будет прибавляться 1
    })

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

/*
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
*/


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
