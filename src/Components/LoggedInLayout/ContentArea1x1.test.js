
import { shallow } from 'enzyme';
import Component from './ContentArea1x1'

var props;

beforeEach(() => {
  props = {
    children: [
      <div key="1" id="hello-content-area" />
    ]
  };
})

it('LoggedInLayout - ContentArea1x1 - Should render', () => {
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});
