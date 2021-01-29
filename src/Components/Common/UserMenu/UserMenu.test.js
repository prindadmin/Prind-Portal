import React from 'react';
import { shallow } from 'enzyme';

import Component from './UserMenu'

it('Should render', () => {

  const props = {
    user: {
      signatureRequests: [],
      projectInvitations: [],
    },
    getUserProjectInvitations: function() {},
    getUserSignatureRequests: function() {},
    signOut: function() {},
    history: {
      push: function() {},
    }
  };
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});

// TODO: Work out how to open the menu and click the options
/*
it('Should open user menu', () => {
  const props = {
    user: {
      signatureRequests: [],
      projectInvitations: [],
    },
    getUserProjectInvitations: function() {},
    getUserSignatureRequests: function() {},
    signOut: function() {},
    history: {
      push: function() {},
    }
  };
  const component = shallow(<Component {...props} />);

  const userButton = component.find('span[class="bp3-popover-wrapper"]')
  userButton.simulate('click');
  expect(component).toMatchSnapshot();
});


it('Should sign out', () => {
  const mockSignOut = jest.fn();
  const props = {
    user: {
      signatureRequests: [],
      projectInvitations: [],
    },
    getUserProjectInvitations: function() {},
    getUserSignatureRequests: function() {},
    signOut: mockSignOut,
    history: {
      push: function() {},
    }
  };
  const component = shallow(<Component {...props} />);

  const signOutButton = component.find('Blueprint3.MenuItem[text="Sign Out"]')
  signOutButton.simulate('click');

  expect(mockSignOut).toHaveBeenCalled();
});
*/
