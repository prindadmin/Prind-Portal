
import Component from './DocumentUploadTile'
import { shallow } from 'enzyme';

var props;

beforeEach(() => {
  props = {
    details: {
      filename: "test-file.txt",
      projectName: "test project",
      dateTime: "2021-03-31T09:01:03"
    }
  }
});

it('Should render', () => {
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});
