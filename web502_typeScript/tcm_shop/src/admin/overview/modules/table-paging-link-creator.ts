import {
  PagingLinkCreator
} from '../../../class/paging-link-creator';

const pagingLinkContainer: HTMLElement = document.querySelector('#js-table-paging-link-list');
const tablePagingLinkCreator: PagingLinkCreator = new PagingLinkCreator(
  ['btn-white', 'btn-square', 'ms-1', 'me-1', 'mt-2'],
  ['btn-white', 'btn-square', 'fw-bold', 'ms-1', 'me-1', 'mt-2'],
  '<i class="fa-solid fa-step-backward"></i>',
  '<i class="fa-solid fa-step-forward"></i>',
  pagingLinkContainer,
  'd-none',
  'disabled',
  5
);

export default tablePagingLinkCreator;