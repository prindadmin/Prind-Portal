import React from 'react';
import { shallow } from 'enzyme';

import Component from './UploadHistory'

var props;

beforeEach(() => {
  props = {
    projectId: "123",
    pageName: "design",
    fieldID: "1",
    details: [
      {
        uploadName: "Test File One.txt",
        uploadedBy: "Testy McTesterson",
        ver: "1",
        uploadedDateTime: "2021-04-05T08:38:32",
        proofLink: "https://prind.tech"
      }
    ]
  }
})


it('UploadHistory - Should render', () => {
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});


it('UploadHistory - Should render without history', () => {
  props.details = []
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});


it('UploadHistory - Should render without proof link', () => {
  props.details[0].proofLink = undefined
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});


it('UploadHistory - Click download button', () => {
  const component = shallow(<Component {...props} />);
  const downloadButton = component.find('#download-box-container')
  downloadButton.simulate('click')
  expect(component).toMatchSnapshot();
});


it('UploadHistory - Click proof link', () => {
  const mockStopPropagation = jest.fn()
  const component = shallow(<Component {...props} />);
  const proofLink = component.find('#proof-link')
  proofLink.simulate('click', { stopPropagation: mockStopPropagation })
  expect(mockStopPropagation).toHaveBeenCalledTimes(1)
});


it('UploadHistory - Should render with no proof link', () => {
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});
