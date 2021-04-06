
import { shallow } from 'enzyme';
import Component from './DownloadBox'

var props;

beforeEach(() => {
  props = {
    projectId: "TestProject123",
    pageName: "design",
    fieldID: "1",
    fileVersionDetails: {
      ver: "0"
    },
    onDownloadSuccess: jest.fn(),
    onDownloadFailure: jest.fn(),
    downloadFile: jest.fn(),
    resetDownloadURL: jest.fn()
  }
});

it('DownloadBox - Should render', () => {
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});

it('DownloadBox - Should click download button and resolve', () => {
  const mockDownloadFile = jest.fn((projectId, pageName, fieldId, fileVersion, resolve, reject) => {
    resolve("https://return-url.prind.tech")
  })
  const mockOnDownloadSuccess = jest.fn()
  const mockOnDownloadFailure = jest.fn()
  props.downloadFile = mockDownloadFile
  props.onDownloadSuccess = mockOnDownloadSuccess
  props.onDownloadFailure = mockOnDownloadFailure
  global.open = jest.fn()

  const component = shallow(<Component {...props} />);
  const button = component.find('#download-box')
  button.simulate('click')
  expect(mockDownloadFile).toHaveBeenCalledTimes(1);
  expect(mockDownloadFile).toHaveBeenCalledWith("TestProject123", "design", "1", "0", expect.any(Function), expect.any(Function));
  expect(mockOnDownloadSuccess).toHaveBeenCalledTimes(1)
  expect(global.open).toHaveBeenCalledWith("https://return-url.prind.tech", "_blank")
  expect(component).toMatchSnapshot();
});

it('DownloadBox - Should click download button and reject', () => {
  const mockDownloadFile = jest.fn((projectId, pageName, fieldId, fileVersion, resolve, reject) => {
    reject()
  })
  const mockOnDownloadSuccess = jest.fn()
  const mockOnDownloadFailure = jest.fn()
  props.downloadFile = mockDownloadFile
  props.onDownloadSuccess = mockOnDownloadSuccess
  props.onDownloadFailure = mockOnDownloadFailure
  global.open = jest.fn()

  const component = shallow(<Component {...props} />);
  const button = component.find('#download-box')
  button.simulate('click')
  expect(mockDownloadFile).toHaveBeenCalledTimes(1);
  expect(mockDownloadFile).toHaveBeenCalledWith("TestProject123", "design", "1", "0", expect.any(Function), expect.any(Function));
  expect(mockOnDownloadFailure).toHaveBeenCalledTimes(1)
});

it('DownloadBox - Should render then unmount', () => {
  window.addEventListener = jest.fn()
  window.removeEventListener = jest.fn()
  const component = shallow(<Component {...props} />);
  expect(window.addEventListener).toHaveBeenCalledWith('resize', expect.any(Function))
  expect(window.removeEventListener).not.toHaveBeenCalled()
  component.instance().componentWillUnmount()
  expect(window.removeEventListener).toHaveBeenCalledWith('resize', expect.any(Function))
  expect(component).toMatchSnapshot();
});
