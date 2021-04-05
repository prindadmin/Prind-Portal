
import { shallow } from 'enzyme';
import Component from './ContentArea1x1Mobile'

var props;

beforeEach(() => {
  props = {
    children: [
      <div key="1" id="hello-content-area-mobile" />
    ]
  };
})

it('LoggedInLayout - ContentArea1x1Mobile - Should render', () => {
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});
