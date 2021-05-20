
import Component from './page-tile'
import { shallow } from 'enzyme';

const mockHistoryPush = jest.fn()

var props

beforeEach(() => {
  props = {
    pageName: "Design",
    selected: false,
    linkTo: "/design",
    history: {
      push: mockHistoryPush
    }
  }
});

it('Should render not selected', () => {
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});

it('Should render selected', () => {
  props.selected = true
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});

it('Should render and push history to new page', () => {
  const component = shallow(<Component {...props} />);
  component.simulate('click')
  expect(mockHistoryPush).toHaveBeenCalledWith(props.linkTo)
});
