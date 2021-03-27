import { Provider, connect } from 'react-redux'
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';

import ReactGA from 'react-ga';
import { HashRouter as Router } from "react-router-dom";

import Component from './UserAccreditationTileContainer'

const mockStore = configureStore([]);
var component;

beforeAll(() => {
  ReactGA.initialize('dummy', { testMode: true });
});

beforeEach(() => {
  const store = mockStore({});
  const props = {
    accreditation: {
      issuedDate: "2019-10-01T12:59:12.142216",
      revocationDate: "2019-11-01T12:59:12.142216",
      revocationReason: "expired",
      accreditationID: "constructionBasics",
      accreditationName: "Construction Basics 101",
      subject: "did:fnds:31a24b270fe86d9c595e715854028c319cc75957718861eb66996929eb5c8025",
      issuer: "did:fctr:d85be1f5baa83fa83850d8b58731a7f7c8ba65c33dec107c2e16e0dd65c7bcc7",
      status: "revoked"
    },
    proof: {
      keyName: "keys-1",
      signature: "ON5TADbu2Miv/Yqe6Iqi6Jhxym263dvfFsGyfPKSOP32pDKKZU+/sd+orD1AYYamsPBUS1p2BtiTo6uNTfOzNrDwZU/r5Y0J2R9+oRffvdp/ca7OcMl9ItFnpeVbL3K2ivVCNjbCTjsveJl3x6lEmpXXoK3f12YpZ0kTs6LDPQopoLY/HlEiV/u1OmUGmWEDqCQNCFBWBYpJ8JAMFi7p/SeQaqqHxdFfRWhBLLxk35ioNpXdLGwElJZk0EqDqbCiAat3d34sNNHnQtS5PUXAiTyU8uHu+XRl544GhhXZyJV2xJzVOBSudFCA4fpYcMGrAQMREeno679k9VsPobIlYxRJjInbQTXg8EUZFJGKXNRZGilOJ0UwNxRPWPiRM7rPjbWZyFU+e0kfFFNyV5lGFeV6jNLcWgkZK+223mY1LdaBmfI6/s/ew3bUwBttgjNidzs9XvMSV7hFQoP1rdFeeRKwXOqoQJiAkEYu5EFA2PtE7shK0Tw/gfk1vO6Qv5x1HQDivTl0TTAwl+eosHiDW88ih2WyKpVwRNgSb2w0ebPK2JA9P5nz6+Q7lf/N9nN6ge8vFq8mstIQuQxjlfXT3LlQN62kzFs7jplRB62jh17p9Lu8YpL5PeaGpRFYoP06rdOCf+/zI2eIC5IjJFJi375BB8W0sp2Bz7pFFV6LQDM=",
      signingAlgorithm: "rs256",
      didVersion: 1.0,
      did: "did:fctr:d85be1f5baa83fa83850d8b58731a7f7c8ba65c33dec107c2e16e0dd65c7bcc7",
      entryHash: "ef0db7acc4ddfef09b0e0d992f980c81e3cecfce6ad426ea57e5850e88746cc9"
    },
    accreditationDid: "did:fnds:3b408d0b28ea370a80a536a77e9512015c0b561e19dde357df4679538582f11b"
  };

  component = mount(
    <Provider store={store}>
      <Router>
        <Component {...props} />
      </Router>
    </Provider>
  );
});


it('should render', () => {
  expect(component).toMatchSnapshot();
});
