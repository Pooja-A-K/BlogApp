import React from 'react';
import { Pagination as BootstrapPagination } from 'react-bootstrap';

const CustomPagination = ({ currentPage, totalPages, paginate }) => {
  const items = [];
  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <BootstrapPagination.Item key={number} active={number === currentPage} onClick={() => paginate(number)}>
        {number}
      </BootstrapPagination.Item>,
    );
  }

  return (
    <BootstrapPagination className="my-3">
      {items}
    </BootstrapPagination>
  );
};

export default CustomPagination;
