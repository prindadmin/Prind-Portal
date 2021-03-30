import React from 'react';
import { shallow } from 'enzyme';

import Component from './UserDetailsPopOver'
import * as Strings from '../../Data/Strings'

var props = {
  members: {
    currentMember: {
      accreditations: [
        {
          issuedDate: "2019-10-01T12:59:12.142216",
          revocationDate: "2019-11-01T12:59:12.142216",
          revocationReason: "expired",
          accreditationID: "constructionBasics",
          accreditationName: "Construction Basics 101",
          subject: "did:fnds:31a24b270fe86d9c595e715854028c319cc75957718861eb66996929eb5c8025",
          issuer: "did:fctr:d85be1f5baa83fa83850d8b58731a7f7c8ba65c33dec107c2e16e0dd65c7bcc7",
          status: "revoked"
        }
      ]
    }
  },
  memberDetails: {
    username: "aaaa-aaaa-aaaaaaaa-aaaa-aaaa"
  },
  tempGetUserAccreditations: jest.fn(),
  onCancelPopup: jest.fn()
}


it('should render and resolve request for accreditations', () => {
  const mockTempGetUserAccreditations = jest.fn((details, resolve, reject) => { resolve() })
  const mockOnCancelPopup = jest.fn()
  props.tempGetUserAccreditations = mockTempGetUserAccreditations
  props.onCancelPopup = mockOnCancelPopup

  const component = shallow(<Component {...props} />);
  expect(mockTempGetUserAccreditations).toHaveBeenCalledWith("aaaa-aaaa-aaaaaaaa-aaaa-aaaa", expect.any(Function), expect.any(Function))
  expect(component).toMatchSnapshot();
});


it('should render and reject request for accreditations', () => {
  const mockTempGetUserAccreditations = jest.fn((details, resolve, reject) => { reject() })
  const mockOnCancelPopup = jest.fn()
  props.tempGetUserAccreditations = mockTempGetUserAccreditations
  props.onCancelPopup = mockOnCancelPopup

  const component = shallow(<Component {...props} />);
  expect(mockTempGetUserAccreditations).toHaveBeenCalledWith("aaaa-aaaa-aaaaaaaa-aaaa-aaaa", expect.any(Function), expect.any(Function))
});


it('should render with no accreditations', () => {
  const mockTempGetUserAccreditations = jest.fn((details, resolve, reject) => { resolve() })
  const mockOnCancelPopup = jest.fn()
  props.tempGetUserAccreditations = mockTempGetUserAccreditations
  props.onCancelPopup = mockOnCancelPopup
  props.members.currentMember.accreditations = []

  const component = shallow(<Component {...props} />);
  expect(mockTempGetUserAccreditations).toHaveBeenCalledWith("aaaa-aaaa-aaaaaaaa-aaaa-aaaa", expect.any(Function), expect.any(Function))
  expect(component).toMatchSnapshot();
});


it('should click the popup greyer', () => {
  const mockTempGetUserAccreditations = jest.fn((details, resolve, reject) => { resolve() })
  const mockOnCancelPopup = jest.fn()
  const mockStopPropagation = jest.fn()
  props.tempGetUserAccreditations = mockTempGetUserAccreditations
  props.onCancelPopup = mockOnCancelPopup

  const component = shallow(<Component {...props} />);
  const greyer = component.find('#popup-greyer')
  greyer.simulate(
    'click', {
      stopPropagation: mockStopPropagation,
      preventDefault: jest.fn(),
    }
  )
  expect(mockStopPropagation).toHaveBeenCalledTimes(1)
  expect(mockOnCancelPopup).toHaveBeenCalledTimes(1)
});


it('should click the popup box', () => {
  const mockTempGetUserAccreditations = jest.fn((details, resolve, reject) => { resolve() })
  const mockOnCancelPopup = jest.fn()
  const mockStopPropagation = jest.fn()
  props.tempGetUserAccreditations = mockTempGetUserAccreditations
  props.onCancelPopup = mockOnCancelPopup

  const component = shallow(<Component {...props} />);
  const box = component.find('#popup-box')
  box.simulate(
    'click', {
      stopPropagation: mockStopPropagation,
      preventDefault: jest.fn(),
    }
  )
  expect(mockStopPropagation).toHaveBeenCalledTimes(1)
  expect(mockOnCancelPopup).not.toHaveBeenCalled()
});


it('should click the close button', () => {
  const mockTempGetUserAccreditations = jest.fn((details, resolve, reject) => { resolve() })
  const mockOnCancelPopup = jest.fn()
  const mockStopPropagation = jest.fn()
  const mockPreventDefault = jest.fn()
  props.tempGetUserAccreditations = mockTempGetUserAccreditations
  props.onCancelPopup = mockOnCancelPopup

  const component = shallow(<Component {...props} />);
  const button = component.find('#close-button')
  button.simulate(
    'click', {
      stopPropagation: mockStopPropagation,
      preventDefault: mockPreventDefault,
    }
  )
  expect(mockStopPropagation).toHaveBeenCalledTimes(1)
  expect(mockPreventDefault).toHaveBeenCalledTimes(1)
  expect(mockOnCancelPopup).toHaveBeenCalledTimes(1)
});
