
import { shallow } from 'enzyme';
import Component from './FileDetailPopover'

var props;

beforeEach(() => {
  props = {
    chosenFileDetails: {
      uploadName: "File123.txt",
      uploadDateTime: "2021-04-06T07:06:23",
      uploadedBy: "Testy McTesterson",
      proofLink: "https://prind.tech",
      signatures: [
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
    },
    projects: {
      chosenProject: {
        projectId: "5678"
      }
    },
    pageName: "design",
    fieldID: "1",
    onClosePopover: jest.fn(),
  }
});

it('FileDetailPopover - render', async () => {
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
});

it('FileDetailPopover - click file-details-popover-container', async () => {
  const mockStopPropagation = jest.fn()
  const component = shallow(<Component {...props} />);
  const container = component.find('.file-details-popover-container')
  container.simulate('click', { stopPropagation: mockStopPropagation })
  expect(mockStopPropagation).toHaveBeenCalledTimes(1);
});

it('FileDetailPopover - click popup-greyer', async () => {
  const mockStopPropagation = jest.fn()
  const mockClosePopover = jest.fn()
  props.onClosePopover = mockClosePopover
  const component = shallow(<Component {...props} />);
  const container = component.find('#popup-greyer')
  container.simulate('click', { stopPropagation: mockStopPropagation })
  expect(mockStopPropagation).toHaveBeenCalledTimes(1);
  expect(mockClosePopover).toHaveBeenCalledTimes(1);
});

it('CurrentVersion - Should click proof link div and stop propagation', () => {
  const mockStopPropagation = jest.fn()
  const component = shallow(<Component {...props} />);
  const link = component.find('#proof-link-container')
  link.simulate('click', { stopPropagation: mockStopPropagation })
  expect(mockStopPropagation).toHaveBeenCalledTimes(1)
});
