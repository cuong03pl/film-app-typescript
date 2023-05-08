import React from "react";
import ReactPaginate from "react-paginate";

interface PaginateProps {
  pageCount: number,
  handlePageClick: (event: Record<string, any>) => void  
}
function Paginate({ pageCount, handlePageClick }: PaginateProps) {
  return (
    <div className="my-5 ">
      <ReactPaginate
        breakLabel="..."
        nextLabel=" >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="< "
        renderOnZeroPageCount={null}
        initialPage={0}
        containerClassName={"flex justify-center items-center"}
        breakLinkClassName={"text-textPrimary"}
        pageLinkClassName={
          "text-textPrimary block h-full w-full flex justify-center items-center"
        }
        previousLinkClassName={
          "text-textPrimary block h-full w-full flex justify-center items-center"
        }
        nextLinkClassName={
          "text-textPrimary block h-full w-full flex justify-center items-center"
        }
        previousClassName={
          "text-textPrimary w-[40px] h-[40px] border-[1px] border-[white] mx-[10px] rounded-[8px]"
        }
        nextClassName={
          "text-textPrimary w-[40px] h-[40px] border-[1px] border-[white] mx-[10px] rounded-[8px]"
        }
        pageClassName={
          "border-solid rounded-[8px] w-[40px] h-[40px] border-[1px] border-[white] mx-[10px]"
        }
        activeClassName={"bg-[#428bca] border-[#428bca]"}
      />
    </div>
  );
}

export default Paginate;
