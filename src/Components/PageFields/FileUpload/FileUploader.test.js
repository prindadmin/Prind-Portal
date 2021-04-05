
import { shallow, mount } from 'enzyme';
import Component from './FileUploader'

var props;

beforeEach(() => {
  props = {
    elementContent: {
      id: "1",
      title: "File Uploader Box",
      description: "This box allows files to be uploaded",
      editable: true,
      fileDetails: [
        {
          uploadName: "Test File One.txt",
          uploadedBy: "Testy McTesterson",
          ver: "1",
          uploadedDateTime: "2021-04-05T08:38:32",
          proofLink: "https://prind.tech",
          signatures: [
            {
              signerName: "Testy McTesterson",
              signatureDateTime: "2021-04-05T08:02:43",
              proofLink: "https://prind.tech",
            }
          ]
        },
        {
          uploadName: "Test File One.txt",
          uploadedBy: "Testy McTesterson",
          ver: "1",
          uploadedDateTime: "2021-04-05T08:38:32",
          proofLink: "https://prind.tech",
          signatures: [
            {
              signerName: "Testy McTesterson",
              signatureDateTime: "2021-04-05T08:02:43",
              proofLink: "https://prind.tech",
            }
          ]
        }
      ],
    },
    pageName: "design",
    projects: {
      chosenProject: {
        projectId: "123",
      },
    },
  };
})

it('FileUploader - Should render', () => {
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});

it('FileUploader - Should render with first element not having a proof link', () => {
  props.elementContent.fileDetails[0].proofLink = undefined
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});

/*
// Cannot currently run this test because it is not possible to find a blueprintjs element
it('FileUploader - Choose file to upload', () => {
  const mockStopPropagation = jest.fn()
  const inputEvent = {
    stopPropagation: mockStopPropagation,
    target: {
      value: "C:\\fakepath\\File_one.txt"
    }
  }
  const component = shallow(<Component {...props} />);
  const fileInputField = component.find('#file-input-field')
  fileInputField.simulate('inputChange', inputEvent)
});
*/

/*
// Cannot currently run this test because it is not possible to find elements within a blueprintjs element (i.e. tab)
it('FileUploader - Click file upload button', () => {
  const mockStopPropagation = jest.fn()
  const component = shallow(<Component {...props} />);
  component.setProps({ fileDetails: {
    value: "C:\\fakepath\\File_one.txt",
    name: "File_one.txt"
  }})
  const uploadButton = component.find('#upload-button')
  uploadButton.simulate('click', { stopPropagation: mockStopPropagation })
  expect(mockStopPropagation).toHaveBeenCalledTimes(1)
  expect(component).toMatchSnapshot();
});
*/
