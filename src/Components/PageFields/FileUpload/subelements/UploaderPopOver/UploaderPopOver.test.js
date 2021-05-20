
import { shallow } from 'enzyme';
import Component from './UploaderPopOver'
import * as States from '../../../../../States'

const mockConfigUpdate = jest.fn();
const mockS3PutObject = jest.fn();



var props;

beforeAll(() => {

  jest.mock("aws-sdk", () => {
    return {
      config: {
        update: mockConfigUpdate
      },
      S3: jest.fn(() => ({
        putObject: mockS3PutObject
      }))
    };
  });

})

beforeEach(() => {
  props = {
    fileDetails: {
      files: [
        {
          name: "hello.csv",
          type: 'text.csv',
          size: 100,
          value: "C:\\fakepath\\hello.csv"
        }
      ]
    },
    projectID: "123",
    pageName: "design",
    fieldID: 1,
    fieldType: "file",
    onCancelPopup: jest.fn(),
    user: {
      projectS3Token: {
        AccessKeyId: "TokenAccessKeyId",
        SecretAccessKey: "TokenSecretAccessKey",
        SessionToken: "TokenSessionToken"
      }
    },
    uploadFile: jest.fn(),
    requestS3ProjectFileUploadToken: jest.fn()
  };
});


it('UploaderPopOver - Should render', () => {
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});


it('UploaderPopOver - Should render with missing upload token', () => {
  props.user.projectS3Token = undefined
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});


it('UploaderPopOver - Should render with missing upload token and then close', () => {
  props.user.projectS3Token = undefined
  const mockOnCancelPopup = jest.fn()
  props.onCancelPopup = mockOnCancelPopup
  const component = shallow(<Component {...props} />);
  const closeButton = component.find('#close-button')
  closeButton.simulate('click')
  expect(mockOnCancelPopup).toHaveBeenCalled()
});
