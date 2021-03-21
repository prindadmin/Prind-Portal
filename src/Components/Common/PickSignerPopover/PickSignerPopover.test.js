import React from 'react';
import { shallow } from 'enzyme';
import Component from './PickSignerPopover'

it('Should render', () => {
  const props = {
    teamMembers: {
      confirmed: [
        {
          username: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
          foundationsID: null,
          emailAddress: "test@prind.tech",
          firstName: "Test",
          lastName: "Testerson",
          roleID: "client",
          roleName: "Client"
        },
        {
          username: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
          foundationsID: "did:fnds:15aad5242a0b0d878b8ba0416d9f4f6792dafe6e969c1f57ab305a3bc8e4e1da",
          emailAddress: "testy@prind.tech",
          firstName: "Testy",
          lastName: "McTest",
          roleID: "creator",
          roleName: "Creator"
        }
      ],
      invited: [
        {
          username: "cccccccc-cccc-cccc-cccc-cccccccccccc",
          foundationsID: null,
          emailAddress: "princy@prind.tech",
          firstName: null,
          lastName: null,
          roleID: "principaldesigner",
          roleName: "Principal Designer"
        }
      ]
    },
    fileDetails: {
      uploadedDateTime: "2021-02-16T09:15:05",
      hash: "8366ebbb75a18bf6e9ce891d9539510fe756467c06ba4fc2223e2c2024bb5da7",
      proofLink: "https://testnet.explorer.factom.pro/entries/8b31f276323359e78589e34734d112c521702a8b455ef0057b0d8f0f50848ed2",
      uploadedBy: "Ben Jeater",
      ver: "0",
      signatures: [
        {
          sigingDidVersion: "13",
          signature:"S+9K+4CXHvkX0GF1DHknQajTGLcw6FiLXdU21GrHPopwFZ507x/GXC2YIw3em7Ms+oDBomPneXVMFpV0hFsp6p1UJQh+0qWRhW/aJ6wwht9L9SBnrjfFpNZSe7VP3vT2qW9ZHBqv8wDewcWO8Q8PM3ZMJCbKbepcFuU0WUmTtO4dSCwaSvbMNlbWuSkyo13N2+R1b2EkQoD30mt7qE6DaEFzGXX6ham5m1qKE6YG90yB5z19ENF8H2tBRErCpoXrU/oxuQitsZ19Uzu4wHY9t6zE3m1U0ydtiVz6UOa/Zx6kfMmKtXPDm3Sy0kXp8o3TltPXPMZ0JJmct09okfTSEg==",
          signedBy:"did:fnds:15aad5242a0b0d878b8ba0416d9f4f6792dafe6e969c1f57ab305a3bc8e4e1da",
          signerName:"Ben Jeater",
          signatureDateTime:"2021-02-16T09:29:28",
          proofLink:"https://testnet.explorer.factom.pro/entries/85fc44c46902b0ca1c7003026edc83a464da12696430f6025f44f39cde6a47d1"
        }
      ],
      s3VersionId: "S.k5.0BvyZrAVFqw7w_LEdAoCiGFZmcI",
      uploadName: "Demo Project V1.3.2 - Brief Description.pdf",
    },
    projectID: "123",
    pageName: "occupation",
    fieldID: "1",
    onClosePopover: function() {},
  };
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});

it('Search bar should filter list', () => {
  const props = {
    teamMembers: {
      confirmed: [
        {
          username: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
          foundationsID: null,
          emailAddress: "test@prind.tech",
          firstName: "Test",
          lastName: "Testerson",
          roleID: "client",
          roleName: "Client"
        },
        {
          username: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
          foundationsID: "did:fnds:15aad5242a0b0d878b8ba0416d9f4f6792dafe6e969c1f57ab305a3bc8e4e1da",
          emailAddress: "testy@prind.tech",
          firstName: "Testy",
          lastName: "McTest",
          roleID: "creator",
          roleName: "Creator"
        }
      ],
      invited: [
        {
          username: "cccccccc-cccc-cccc-cccc-cccccccccccc",
          foundationsID: null,
          emailAddress: "princy@prind.tech",
          firstName: null,
          lastName: null,
          roleID: "principaldesigner",
          roleName: "Principal Designer"
        }
      ]
    },
    fileDetails: {
      uploadedDateTime: "2021-02-16T09:15:05",
      hash: "8366ebbb75a18bf6e9ce891d9539510fe756467c06ba4fc2223e2c2024bb5da7",
      proofLink: "https://testnet.explorer.factom.pro/entries/8b31f276323359e78589e34734d112c521702a8b455ef0057b0d8f0f50848ed2",
      uploadedBy: "Ben Jeater",
      ver: "0",
      signatures: [
        {
          sigingDidVersion: "13",
          signature:"S+9K+4CXHvkX0GF1DHknQajTGLcw6FiLXdU21GrHPopwFZ507x/GXC2YIw3em7Ms+oDBomPneXVMFpV0hFsp6p1UJQh+0qWRhW/aJ6wwht9L9SBnrjfFpNZSe7VP3vT2qW9ZHBqv8wDewcWO8Q8PM3ZMJCbKbepcFuU0WUmTtO4dSCwaSvbMNlbWuSkyo13N2+R1b2EkQoD30mt7qE6DaEFzGXX6ham5m1qKE6YG90yB5z19ENF8H2tBRErCpoXrU/oxuQitsZ19Uzu4wHY9t6zE3m1U0ydtiVz6UOa/Zx6kfMmKtXPDm3Sy0kXp8o3TltPXPMZ0JJmct09okfTSEg==",
          signedBy:"did:fnds:15aad5242a0b0d878b8ba0416d9f4f6792dafe6e969c1f57ab305a3bc8e4e1da",
          signerName:"Ben Jeater",
          signatureDateTime:"2021-02-16T09:29:28",
          proofLink:"https://testnet.explorer.factom.pro/entries/85fc44c46902b0ca1c7003026edc83a464da12696430f6025f44f39cde6a47d1"
        }
      ],
      s3VersionId: "S.k5.0BvyZrAVFqw7w_LEdAoCiGFZmcI",
      uploadName: "Demo Project V1.3.2 - Brief Description.pdf",
    },
    projectID: "123",
    pageName: "occupation",
    fieldID: "1",
    onClosePopover: function() {},
  };
  const component = shallow(<Component {...props} />);
  const searchBar = component.find('#search-field')
  searchBar.simulate("change", { target: { value: "Testy" }})
  expect(component).toMatchSnapshot();
});
