import React from 'react';
import { shallow } from 'enzyme';

import SignatureHistory from './SignatureHistory'

it('SignatureHistory - Should render Signature History', () => {
  const props = {
    details: [
      {
        signerName: "Signer One",
        signatureDateTime: "2021-01-11T11:11:11",
        proofLink: "https://testnet.explorer.factom.pro/entries/93ae94fce1d960dc818c049f9a23f8305cdea54dd6954153c57be62179db1fcf",
      },
      {
        signerName: "Signer Two",
        signatureDateTime: "2021-02-22T22:22:22",
        proofLink: "https://testnet.explorer.factom.pro/entries/93ae94fce1d960dc818c049f9a23f8305cdea54dd6954153c57be62179db1fcf",
      }
    ]
  }
  const component = shallow(<SignatureHistory {...props} />);
  expect(component).toMatchSnapshot();
});

it('SignatureHistory - Should render Signature History without signatures', () => {
  const props = {
    details: []
  }
  const component = shallow(<SignatureHistory {...props} />);
  expect(component).toMatchSnapshot();
});
