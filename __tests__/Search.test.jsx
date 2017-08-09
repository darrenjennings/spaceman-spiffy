import React from 'react';
import { shallow, mount } from 'enzyme';
import Search from '../src/Search';
import preload from '../data.json';

jest.useFakeTimers();

test('Search renders correctly', () => {
  const component = shallow(<Search />);
  expect(component).toMatchSnapshot();
});

test('Search should render date and search inputs', () => {
  const component = shallow(<Search />);
  expect(component.find('input').length).toEqual(2);
  expect(component.find('#search__input').length).toEqual(1);
});

test('Search should render correct amount of comics based on search term', () => {
  const searchWord = 'dad';
  const component = mount(<Search debounce={250} />);
  const input = component.find('#search__input');
  expect(input.length).toEqual(1);
  input.simulate('change', { target: { value: searchWord } });
  jest.runAllTimers(); // debounce fast forward
  const showCount = preload.images
    .filter(image => `${image['alt-text']}`.toUpperCase().indexOf(searchWord.toUpperCase()) >= 0)
    .slice(0, 10).length;
  expect(component.find('img').length).toEqual(showCount);
});
