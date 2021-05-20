
import { shallow } from 'enzyme';

import Component from './LoadingSpinnerCSS'

it('Loading Spinner - Should render at default size', () => {
  const props = {}
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});


it('Loading Spinner - Should render at smaller size', () => {
  const props = {
    size: 25
  }
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});
