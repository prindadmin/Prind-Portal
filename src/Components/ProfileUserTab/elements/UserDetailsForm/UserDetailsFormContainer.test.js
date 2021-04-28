import { Suspense } from 'react';
import { Provider, connect } from 'react-redux'
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';

import ReactGA from 'react-ga';
import { HashRouter as Router } from "react-router-dom";
import * as States from '../../../../States'
import * as Strings from '../../../../Data/Strings'
import * as Endpoints from '../../../../Data/Endpoints'

import Component from './UserDetailsFormContainer'

const mockStore = configureStore([]);
var component;

beforeAll(() => {
  ReactGA.initialize('dummy', { testMode: true });
});

beforeEach(() => {
  const store = mockStore({
    auth: {
      isSignedIn: States.AUTH_UNKNOWN,
      isConfirmed: States.AUTH_UNKNOWN,
      hasSignedUp: States.AUTH_UNKNOWN,
      hasSentCode: States.AUTH_UNKNOWN,
      hasChangedPassword: States.AUTH_UNKNOWN,
      passwordResetRequired: States.AUTH_UNKNOWN
    },
    projects: {
      accessibleProjects: {
        projectCreator: [],
        projectRole: []
      },
      chosenProject: {
        projectName: Strings.NO_PROJECT_SELECTED,
        projectId: "",
        projectType: "",
      },
      memberList: [],
      downloadURL: "",
      fileDetails: {},
      fetching: false,
      error: null,
    },
    foundations: {
      fetching: false,
    },
    user: {
    fetching: false,
    details: {
      firstName: 'Ben',
      homePhoneNumber: '01252123456',
      lastName: 'Rahman',
      mobilePhoneNumber: '07939658285',
      foundationsID: 'did:fnds:15aad5242a0b0d878b8ba0416d9f4f6792dafe6e969c1f57ab305a3bc8e4e1da',
      emailAddress: 'ben.jeater@prind.tech'
    },
    history: {},
    projectInvitations: [],
    signatureRequests: [
      {
        requestedAt: '1613474390',
        requesterFirstName: 'Ben',
        fieldTitle: 'Brief Description',
        requesterLastName: 'Jeater',
        projectID: 'DemoProjectV1322021-02-16',
        pageName: 'occupation',
        fieldID: '1',
        projectName: 'Demo Project V1.3.2',
        requestedBy: {
          username: 'cb8c0582-fbca-4178-b23d-44bb4096262b',
          firstName: 'Ben',
          lastName: 'Jeater'
        },
        filename: 'Demo Project V1.3.2 - Brief Description.pdf'
      }
    ],
    userS3Token: {},
    currentRoute: '/inception',
    username: 'cb8c0582-fbca-4178-b23d-44bb4096262b',
    pool: {
      userPoolId: 'eu-west-1_VL7uVkjBo',
      clientId: 'fbss4knsc8gmgct526ci8kp3a',
      client: {
        endpoint: 'https://cognito-idp.eu-west-1.amazonaws.com/',
        fetchOptions: {}
      },
      advancedSecurityDataCollectionFlag: true,
      storage: {}
    },
    Session: null,
    client: {
      endpoint: 'https://cognito-idp.eu-west-1.amazonaws.com/',
      fetchOptions: {}
    },
    signInUserSession: {
      idToken: {
        jwtToken: 'eyJraWQiOiI5Z0xqeGltYkRUNVZKYWZoanl5MHBWSXozeGFCWDhJQXdpNjc1UEMwbVNNPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJjYjhjMDU4Mi1mYmNhLTQxNzgtYjIzZC00NGJiNDA5NjI2MmIiLCJhdWQiOiJmYnNzNGtuc2M4Z21nY3Q1MjZjaThrcDNhIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjE2OTk2NzYxLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0xLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMV9WTDd1VmtqQm8iLCJjb2duaXRvOnVzZXJuYW1lIjoiY2I4YzA1ODItZmJjYS00MTc4LWIyM2QtNDRiYjQwOTYyNjJiIiwiZXhwIjoxNjE3MDg3NjQ3LCJnaXZlbl9uYW1lIjoiQmVuIiwiaWF0IjoxNjE3MDg0MDQ3LCJmYW1pbHlfbmFtZSI6IkplYXRlciIsImVtYWlsIjoiYmVuLmplYXRlckBwcmluZC50ZWNoIn0.jfhf6ycTslTfCwKa_oSfOR_YFkGoWcU8xnZbEsF9N7A5GJ0R345HF2S5RClQdExjf7IUyJdgNZeSY8gUTCDgCiSz55FhGiW3a7XR9aupWPjXkeDyyWMuyOC4f_8cikTsHxdu36ji-I1MUXVxbcdNkXuckScT5K1RNMaxSHMB8yxnVwFlwr7X2RmdjhcbPEPcqUGvzkBg34ycnmgWqvhDEqUIaeO59lbYRjdPQiE8WG3knFia-BvJQK-wkkJWsO8dTsV_SUA3paExusyaOIRkmkKx0sLbsh72F5X-yz57Tlxsz0YT6suSsaMgKtsChkfoGDfcX0Xlf_-hyJrwVeXhmA',
        payload: {
          sub: 'cb8c0582-fbca-4178-b23d-44bb4096262b',
          aud: 'fbss4knsc8gmgct526ci8kp3a',
          email_verified: true,
          token_use: 'id',
          auth_time: 1616996761,
          iss: 'https://cognito-idp.eu-west-1.amazonaws.com/eu-west-1_VL7uVkjBo',
          'cognito:username': 'cb8c0582-fbca-4178-b23d-44bb4096262b',
          exp: 1617087647,
          given_name: 'Ben',
          iat: 1617084047,
          family_name: 'Jeater',
          email: 'ben.jeater@prind.tech'
        }
      },
      refreshToken: {
        token: 'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.CkI8ETJeGo2sxEENXoFSxjduhehCRx1TXAajp-aQNO_2Q2Idx5z7tmAcNnq21b6xQnzhw_GfXHTUMtHfC44lNyhadRrExyArYexv5UWReetjPZogXbQ4V4fx_hGvXTaf59TqJ2QtpuY8Mg7zA7KtGHBYdKkcO0xCQ2dFqbtYtBAHh9ft5Z3Lco1m47GbF5x_AQK50PtR_h56oYJzbLBb1YCgTMejjMApyWIrRu5ljYnFETsff_dMkzrW1uC4HQnweHqOwAd8dRQo5zui_vcd9xy4Va8wFnhcjPVl00wxt9IklFdkj40iZsvdDgQf94cf9aULuR-u9uuDFBbFY8cnzQ.QE5eDnAokCU8-GZn.MnAdpyOY_5d5Fw2fA4P1wQ6glw3GJ03nNJGQa9-cI5_TORH5ZS_VdeO2Asn9QVUKaL7_V5Er14eKMNWSBwmqgxiDiSROL-DGy4ydnDpdJ4UlVygDzelyTaaIhEocD_4wMa1xrRuARgQi1WySqQgvJENaMLJOXTwmMiwacVo_5tzW0WyQjCddH3xdI3HqE2YGIU3jqql8wozok-E5LGQUe_R9kvRMngXTJY7a7xObjYTekxCjAWr27O2RgGKCasMBr6u4aropxSrk7ozTuchEa1iX4rVLtkoCkGRgxRUZa5zU9B5Dw3IhW1lFIHPNe06Vvo1_JdiBYzvR2nk-u2sVvCXtb0_xauBc8hrnN-sjAFVw2dgp7bpCLnqDpPWsIN7KE-NeI4XIzY92SjKqGF2mXeBcHJ38VZtiaBQ2QKGeCHUYiA5HkyM79r1IhXErzlzgseF80Iv6VO4CV6fvTQsUjWaF34P7EYpWgLpKv1JDPv_1NaPHfyEZ56wat3H6DUk4GHWXBoFiNb1Hwm-h4Z-jMNC3nL9_27QyVWZ81hpRJ9R7vt_zqGToMq7OOLg90hnS3wdWeqX-_o2-10jscM2iJ8RM0ecbA-jmcRLuJJMt17fofREz4Axb0FBsPTqsSluu5S0RjsoGqudGVbeDpV4Q_01JPJ7m4JXnuVnWl_ELMS90aIe4auojYo3nCCR4KgLqZU55IFrPAif-acTBnTpljrdFSwZXYXOyN4huq1HyMQy25CEZow9IQz1Ww9IZ1cscXFWLbQ_Lv2QFSQOt5V5iqOCwqzv5nFSiu7lFPHIfKMmpvhFeiiQCmX0p6JgPkHuMwvTzWJ-yWWLPlQQ4OE4qA1ztTCvIjKeR-EShd6nQ12uzWkznZNhHAs3VyCERsQOPx5X8rFg8UXeiVQWCca0pS1tnVN0rN2eaFnOEDY13xjQPO9CfCTJXFOJ4WhS4IO547koDhj3TLK_Me1uUsP6dTq1twLTtrtdXEYT-LZqrBoBWBLp5utYBuRdbZkNf_rumUWpOEbjG_JOvDAnw4e0JSXbkA2jg_xOlmcNwM2CXICH9n60tXDl9-uhN0T0A1jAgZ6KQIP-2hfsdjnFy1LKr_h7U604Xao3G1qwouTn3xr_MNdZ4tfH47zkJ0N-yIX6ELJCzuzTJBWUSGmJYeHXj6hJrN47z0NM8WClTjJFrEFLg_llUpf7GbHyrkCzWPKt6uyPwqbgrRUuJTnfCgyPLYV6GHTSCOSnVfAmllQVK-QOd59KAP9FyFYBs56foV-g2yozdHlRYGZiyCoFkGZZq9FNrwIKSZx1OhsZO0GkldgL767YoLMR_-2spfPR6E2qacJIzX_iUXv7I8A.eVUCVGr6iXlkPtLQSLCE2Q'
      },
      accessToken: {
        jwtToken: 'eyJraWQiOiJLbUx0elNybStTWGdOVEJ2djNTM0xtSzErXC84UHd6bHQ4NGgzbDBrTU5RMD0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJjYjhjMDU4Mi1mYmNhLTQxNzgtYjIzZC00NGJiNDA5NjI2MmIiLCJkZXZpY2Vfa2V5IjoiZXUtd2VzdC0xXzM2Y2EwMWFlLWJjMDMtNDZlYy1iOTg3LWMyZDA1OTZmMjcyNiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2MTY5OTY3NjEsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX1ZMN3VWa2pCbyIsImV4cCI6MTYxNzA4NzY0NywiaWF0IjoxNjE3MDg0MDQ3LCJqdGkiOiI4MWNkYzg3NC1lMWQwLTQyNDgtODE1MS02MTZkNDFkNzIwYTUiLCJjbGllbnRfaWQiOiJmYnNzNGtuc2M4Z21nY3Q1MjZjaThrcDNhIiwidXNlcm5hbWUiOiJjYjhjMDU4Mi1mYmNhLTQxNzgtYjIzZC00NGJiNDA5NjI2MmIifQ.hIKkCUa4qWDvmliXmlG1T2Ys1OO3KxKOCHVkGAW4IrwF6EIWdNveXd8i6JYYOpP66HK3NVO5s8LX0QrjZJt4569MatjnIVLm82cftYHuTs59k6152UWMPg7U0nRzDcm1GL4-J-OGjcE_sn0NluXz8G7MolJFlImEf3TFjJzt47VdyqjcIEBZQupQx4d2gyh5WazZuVPfgZpcmY9fpu4pFnvuvEKVNR0blqOUZqTelZk6ryln_wYZkIVOTYgLJnOZxYLKpd-7USQfvizwh1fIQwfMNYmntgxDgCGkpgS7X_u33yCDnBI9BtjtL_yhyWiVoDZKsN8shEOWSlO9uKq-ew',
        payload: {
          sub: 'cb8c0582-fbca-4178-b23d-44bb4096262b',
          device_key: 'eu-west-1_36ca01ae-bc03-46ec-b987-c2d0596f2726',
          token_use: 'access',
          scope: 'aws.cognito.signin.user.admin',
          auth_time: 1616996761,
          iss: 'https://cognito-idp.eu-west-1.amazonaws.com/eu-west-1_VL7uVkjBo',
          exp: 1617087647,
          iat: 1617084047,
          jti: '81cdc874-e1d0-4248-8151-616d41d720a5',
          client_id: 'fbss4knsc8gmgct526ci8kp3a',
          username: 'cb8c0582-fbca-4178-b23d-44bb4096262b'
        }
      },
      clockDrift: 0
    },
    authenticationFlowType: 'USER_SRP_AUTH',
    storage: {},
    attributes: {
      sub: 'cb8c0582-fbca-4178-b23d-44bb4096262b',
      email_verified: true,
      given_name: 'Ben',
      family_name: 'Jeater',
      email: 'ben.jeater@prind.tech'
    },
    preferredMFA: 'NOMFA'
  },
    members: {
      currentMember: {
        accreditations: []
      }
    },
    pageContent: {
      inception: {
        fetching: false,
        fields: [],
        error: null,
      },
      feasibility: {
        fetching: false,
        fields: [],
        error: null,
      },
      design: {
        fetching: false,
        fields: [],
        error: null,
      },
      tender: {
        fetching: false,
        fields: [],
        error: null,
      },
      construction: {
        fetching: false,
        fields: [],
        error: null,
      },
      handover: {
        fetching: false,
        fields: [],
        error: null,
      },
      occupation: {
        fetching: false,
        fields: [],
        error: null,
      },
      refurbishment: {
        fetching: false,
        fields: [],
        error: null,
      },
    }
  });

  const props = {};

  // TODO: FUTURE: Change to mount once sub elements are fixed
  component = shallow(
    <Suspense fallback={<p>error</p>}>
      <Provider store={store}>
        <Router>
          <Component {...props} />
        </Router>
      </Provider>
    </Suspense>
  );
});


it('should render', () => {
  expect(component).toMatchSnapshot();
});
