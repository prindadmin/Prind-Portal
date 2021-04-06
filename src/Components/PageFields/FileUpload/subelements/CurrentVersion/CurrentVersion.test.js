
import { shallow } from 'enzyme';
import Component from './CurrentVersion'

import PickSignerPopover from '../../../../Common/PickSignerPopover'
import DownloadBox from '../DownloadBox'

var props;
/*
// TODO: Mock the DownloadBox and trigger the return functions
// TODO: Mock the PickSignerPopover and trigger the return function
const mockOnDownloadSuccess = jest.fn()
const mockOnDownloadFailure = jest.fn()
const mockOnClosePopover = jest.fn()

beforeAll(() => {
  jest.mock('../DownloadBox', (props) => {
    return {
      onDownloadSuccess: mockOnDownloadSuccess,
      onDownloadFailure: mockOnDownloadFailure
    }
  });
})
*/
beforeEach(() => {
  props = {
    user: {
      details: {
        foundationsID: "1234"
      }
    },
    projects: {
      chosenProject: {
        projectId: "5678"
      }
    },
    details: {
      uploadName: "File123.txt",
      uploadedDateTime: "2021-04-06T07:06:23",
      uploadedBy: "Testy McTesterson",
      proofLink: "https://prind.tech",
    },
    pageName: "design",
    fieldID: "1",
    editable: true,
    selfSignFile: jest.fn()
  }
});

it('CurrentVersion - Should render', () => {
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});

it('CurrentVersion - Should render with no current version', () => {
  props.details = undefined
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});

it('CurrentVersion - Should click request signatures button', () => {
  const component = shallow(<Component {...props} />);
  const requestSignatureButton = component.find('#request-signatures-button')
  expect(component.state('signerPickerOpen')).toEqual(false)
  requestSignatureButton.simulate('click', { stopPropagation: jest.fn() })
  expect(component.state('signerPickerOpen')).toEqual(true)
  expect(component).toMatchSnapshot();
});

it('CurrentVersion - Should click self sign button', () => {
  const mockSelfSignFile = jest.fn()
  props.selfSignFile = mockSelfSignFile
  const component = shallow(<Component {...props} />);
  const button = component.find('#self-sign-button')
  button.simulate('click', { stopPropagation: jest.fn() })
  expect(mockSelfSignFile).toHaveBeenCalledWith("5678", "design", "1")
});

it('CurrentVersion - Should click proof link div and stop propagation', () => {
  const mockStopPropagation = jest.fn()
  const component = shallow(<Component {...props} />);
  const link = component.find('#proof-link-container')
  link.simulate('click', { stopPropagation: mockStopPropagation })
  expect(mockStopPropagation).toHaveBeenCalledTimes(1)
});

it('CurrentVersion - Should click download button and stop propagation', () => {
  const mockStopPropagation = jest.fn()
  const component = shallow(<Component {...props} />);
  const button = component.find('.download-box-cell')
  button.simulate('click', { stopPropagation: mockStopPropagation })
  expect(mockStopPropagation).toHaveBeenCalledTimes(1)
});
