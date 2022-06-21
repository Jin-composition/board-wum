import React from "react";
import styles from "./Pagination.module.css";
import { useState } from "react";

function Pagination({
  prevPage,
  nextPage,
  onPageChange,
  currentPage,
  setCurrentPage,
  pageSize,
  lastPage,
}) {
  // const [currentPage, setCurrentPage] = useState(1);

  // 현재 페이지 css 적용이 안된 건 currentPage를 list나 comment에서
  // 넘겨주지 않고 pagination단에서 state로 가지고 있었기 때문에 페이지
  // 페이지 변화를 감지 못함 -- 추정

  return (
    <>
      <div className={styles.pagination}>
        <div className={styles.prev} onClick={prevPage}>
          {"<"}
        </div>
        {new Array(10).fill(1).map(
          (_, index) =>
            index + 1 <= lastPage && (
              <div
                className={
                  // index + 1 === currentPage ? "paging_active" : "paging"
                  styles.paging
                }
                key={index + 1}
                onClick={() => onPageChange(index + 1)}
                style={currentPage === index + 1 ? { color: "red" } : null}
              >
                {index + 1}
              </div>
            )
        )}
        <div className={styles.next} onClick={nextPage}>
          {">"}
        </div>
      </div>
    </>
  );
}

export default Pagination;
