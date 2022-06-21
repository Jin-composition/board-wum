import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../css/List.module.css";
import axios from "axios";
import { useNavigate } from "react-router";
import Pagination from "./pagination/Pagination";
import { useState } from "react";

function List({ ip }) {
  // const dataResponse = useQuery("getData", getData);
  console.log(ip, "ip");
  const [posts, setPosts] = useState([]);
  const itemsCounts = posts.length;
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  // 리스트 불러오기 //
  useEffect(() => {
    LoadList();
  }, [search]);

  async function LoadList() {
    await axios.get("list").then((res) => {
      setPosts(res.data);
    });
  }
  console.log(posts);

  // search

  function ChangeSearch(e) {
    setSearch(e.target.value);
  }
  function OnSearch() {
    if (search === null || search === "") {
      alert("검색어 입력해주세요");
    } else {
      const filterData = posts.filter((post) => post.title.includes(search));
      setPosts(filterData);
      console.log(filterData, "search-after");
    }
  }

  // 삭제하기 //
  function DeleteColumn(idx) {
    console.log(idx);
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      axios
        .post("http://localhost:8000/delete", {
          board_idx: idx,
          deleted: "deleted",
        })
        .then((res) => {
          console.log(res);
          if (res === "error") {
            alert("에러");
          } else {
            alert("삭제 완료");
          }
        })
        .catch((err) => {
          console.log(err);
        });
      LoadList();
    }
  }
  function UpdateColumn(idx) {
    navigate(`/update`, { state: { isEdit: true, idx: idx } });
  }
  // 페이지네이션
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const lastPage = Math.ceil(itemsCounts / pageSize);
  const offset = (currentPage - 1) * pageSize;

  function onPageChange(num) {
    setCurrentPage(num);
    console.log(num);
  }
  function prevPage(e) {
    if (currentPage === 1) return;
    setCurrentPage((prev) => prev - 1);
    console.log(currentPage, "prev");
  }
  function nextPage(e) {
    if (currentPage >= lastPage) return;
    setCurrentPage((prev) => prev + 1);
    console.log(currentPage, "next");
  }
  return (
    <div className={styles.wrapper}>
      {ip ? (
        <>
          <div className={styles.page_name}>List 페이지</div>
          <div className={styles.searchWrapper}>
            <input
              type="text"
              className={styles.search}
              value={search}
              onChange={ChangeSearch}
            />
            <button className={styles.searchBtn} onClick={OnSearch}>
              검색
            </button>
          </div>
          <div className={styles.board}>
            <div className={styles.board_row}>
              <div className={styles.number_h}>번호</div>
              <div className={styles.title_h}>제목</div>
              <div className={styles.date_h}>작성일</div>
              <div className={styles.btns_h}></div>
            </div>
            {posts.slice(offset, offset + pageSize).map((el, index) => (
              <div key={el.board_idx}>
                <div className={styles.board_column}>
                  <div className={styles.number}>{el.rowNum}</div>
                  <div className={styles.title}>
                    <Link
                      to={`/detail/${el.board_idx}`}
                      style={{
                        textDecoration: "inherit",
                        color: "inherit",
                      }}
                    >
                      {el.title}
                    </Link>
                  </div>
                  <div className={styles.date}>{el.reg_rdate.slice(0, 10)}</div>

                  <div className={styles.btns}>
                    {el.ip_address === ip && (
                      <>
                        <button
                          className={styles.updateBtn}
                          onClick={() => UpdateColumn(el.board_idx)}
                        >
                          수정
                        </button>
                        <button
                          className={styles.deleteBtn}
                          onClick={() => DeleteColumn(el.board_idx)}
                        >
                          삭제
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Pagination
            itemsCount={itemsCounts}
            onPageChange={onPageChange}
            pageSize={pageSize}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            prevPage={prevPage}
            nextPage={nextPage}
            lastPage={lastPage}
          />
          <div className={styles.button}>
            <Link to={"/write"} state={{ isEdit: false, idx: 0 }}>
              <button
                className={styles.write_btn}
                style={{ textDecoration: "none" }}
              >
                글 작성하기
              </button>
            </Link>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default List;
