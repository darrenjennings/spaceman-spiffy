import React from "react";
import { shallow } from "enzyme";
import Search from "../src/Search";
import preload from "../data.json";

test("Search renders correctly", () => {
  const component = shallow(<Search />);
  expect(component).toMatchSnapshot();
});

test("Search should render correct amount of comics", () => {
  const component = shallow(<Search />);
  expect(component.find("input").length).toEqual(1);
});

test("Search should render correct amount of comics based on search term", () => {
  const searchWord = "dad";
  const component = shallow(<Search />);
  component.find("input").simulate("change", { target: { value: searchWord } });
  const showCount = preload.images
    .filter(
      image =>
        `${image["alt-text"]} ${image.image_txt}`
          .toUpperCase()
          .indexOf(searchWord.toUpperCase()) >= 0
    )
    .slice(0, 4).length;
  expect(component.find("img").length).toEqual(showCount);
});
