import React from "react";
import _ from "lodash";
import {
  Pagination as PaginationWrapper,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import "./../assets/scss/custom.scss";

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  return (
    <PaginationWrapper>
      {pages.map((page) => (
        <PaginationItem key={page} className={page === currentPage && "active"}>
          <PaginationLink onClick={() => onPageChange(page)}>
            {page}
          </PaginationLink>
        </PaginationItem>
      ))}
    </PaginationWrapper>
  );
};

export default Pagination;
