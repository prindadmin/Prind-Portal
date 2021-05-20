
import { shallow } from 'enzyme';

import Component from './ItemIcon'

it('Item Icon - Should render', () => {
  const props = {
    size: "4x",
    type: "home",
    color: "blue"
  }
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});
