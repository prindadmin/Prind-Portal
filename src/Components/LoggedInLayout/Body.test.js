
import { shallow } from 'enzyme';
import Component from './Body'

var props;

beforeEach(() => {
  props = {
    children: [
      <div key="1" id="hello-body" />
    ]
  };
})

it('LoggedInLayout - Body - Should render', () => {
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});
