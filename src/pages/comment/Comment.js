import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Pagination from "../pagination/Pagination";
import {
  Comment,
  CommentTitle,
  CommentLength,
  CommentName,
  CommentWrite,
  CommentInput,
  CommentSubmit,
  ReCommentWrite,
  ReCommentInput,
  SubmitButtons,
  ReCommentSubmit,
  ReCommentCancel,
  ListWrapper,
  ListWrap,
  CommentList,
  CommentContext,
  CommentDate,
  ReCommentButton,
  CommentButtonWrapper,
  UpdateButton,
  DeleteButton,
  ReCommentList,
  ReCommentWrap,
  ReCommentContext,
  RecommentUpdateInput,
  ReCommentDate,
} from "./Comment.styles";

function CommentPage({ id, ip }) {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  month = month < 10 ? "0" + month.toString() : month.toString();
  let day = date.getDate();
  day = day < 10 ? "0" + month.toString() : day.toString();
  let hours = ("0" + date.getHours()).slice(-2);
  let minutes = ("0" + date.getMinutes()).slice(-2);

  const today = `${year}-${month}-${day} ${hours}.${minutes}`;
  const [comment, setComment] = useState("");
  const [recomment, setReComment] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [recommentList, setReCommentList] = useState([]);
  const [comment_idx, setComment_idx] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  function ChangeComment(e) {
    setComment(e.target.value);
  }
  function ChangeReComment(e) {
    setReComment(e.target.value);
    console.log(recomment);
  }

  // 페이지네이션
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const itemsCounts = commentList.length;
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

  // 댓글 작성하기

  async function SubmitComment(idx) {
    console.log(idx);

    isOpen === false
      ? await axios
          .post("http://localhost:8000/comment", {
            context: comment,
            reg_rdate: today,
            board_idx: id,
            ip_address: ip,
          })
          .then((res) => {
            console.log(res, "res");
            CommentListing(id);
          })
          .catch((err) => {
            console.log(err);
          })
      : await axios
          .post("http://localhost:8000/recomment", {
            context: recomment,
            reg_rdate: today,
            board_idx: id,
            bundle_id: idx,
            ip_address: ip,
          })
          .then((res) => {
            console.log(res, "res");
            CommentListing(id);
            setIsOpen(false);
          })
          .catch((err) => {
            console.log(err);
          });
  }
  function CancelComment() {
    setIsOpen(false);
    setIsEdit(false);
    setComment("");
    setReComment("");
  }

  // 댓글 불러오기

  useEffect(() => {
    CommentListing(id);
  }, []);

  async function CommentListing(id) {
    // console.log(id, "id");
    const param = new URLSearchParams();

    param.append("board_idx", id);
    await axios
      .post("/comment/list", param)
      .then((res) => {
        // console.log(res.data, "res_list");
        setCommentList(res.data.filter((el) => el.class === 0));
        setReCommentList(res.data.filter((el) => el.class !== 0));
      })
      .catch((err) => {
        console.log(err);
      });
    setComment("");
    setReComment("");
  }

  // 수정 댓글 불러오기
  async function CommentUpdate(idx) {
    console.log(idx);
    setIsEdit(true);
    OpenReply(idx);
    console.log(idx);

    const param = new URLSearchParams();

    param.append("comment_index", idx);
    await axios
      .post("http://localhost:8000/comment/data", param)
      .then((res) => {
        console.log(res, "결과_댓글");
        setComment(res.data[0].context);
      });
  }

  function OpenReply(idx) {
    setComment_idx(idx);
    setIsOpen(true);
  }

  // 댓글 수정하기

  async function UpdateComment(idx) {
    await axios
      .post("http://localhost:8000/update/comment", {
        context: comment,
        update_date: today,
        comment_index: idx,
      })
      .then((res) => {
        console.log(res, "res_update");
        alert("수정 완료");
      })
      .catch((err) => {
        console.log(err);
      });
    setIsOpen(false);
    setIsEdit(false);
    CommentListing(id);
  }

  // 댓글 삭제하기
  async function CommentDelete(idx) {
    console.log(idx);
    await axios
      .post("http://localhost:8000/delete/comment", {
        comment_index: idx,
        deleted: "deleted",
      })
      .then((res) => {
        console.log(res);
        alert("삭제 완료");
      })
      .catch((err) => {
        console.log(err);
      });
    CommentListing(id);
  }

  // 수정 대댓글 불러오기
  async function UpdateRecomment(idx) {
    console.log(idx);
    setIsEdit(true);
    OpenReply(idx);
  }

  // 대댓글 수정하기
  async function RecommentUpdate(idx) {
    console.log(idx);

    await axios
      .post("http://localhost:8000/update/recomment", {
        context: recomment,
        update_date: today,
        comment_index: idx,
      })
      .then((res) => {
        console.log(res);
        alert("수정 완료");
      })
      .catch((err) => {
        console.log(err);
      });
    setIsOpen(false);
    setIsEdit(false);
    CommentListing(id);
  }

  //대댓글 삭제하기
  async function RecommentDelete(idx) {
    console.log(idx);
    await axios
      .post("http://localhost:8000/delete/recomment", {
        comment_index: idx,
        deleted: "deleted",
      })
      .then((res) => {
        console.log(res);
        alert("삭제 완료");
      })
      .catch((err) => {
        console.log(err);
      });
    CommentListing(id);
  }

  return (
    <Comment>
      {ip && (
        <>
          <CommentTitle>
            <CommentLength>
              <CommentName>댓글</CommentName>
              <div>
                {commentList.filter((el) => el.deleted === null).length}
              </div>
            </CommentLength>
          </CommentTitle>
          <CommentName>댓글 작성하기</CommentName>
          <CommentWrite>
            <CommentInput
              value={isOpen === true ? "" : comment}
              onChange={isOpen === true ? null : ChangeComment}
            ></CommentInput>
            <CommentSubmit onClick={SubmitComment}>작성하기</CommentSubmit>
          </CommentWrite>
          {commentList.slice(offset, offset + pageSize).map((el, index) => (
            <ListWrapper>
              <ListWrap>
                <CommentList>
                  <CommentContext
                    key={el.comment_index}
                    value={comment}
                    style={{
                      color: el.deleted === "deleted" ? "gray" : "black",
                    }}
                  >
                    {el.deleted === null ? el.context : "삭제된 댓글입니다"}
                  </CommentContext>
                  <CommentDate>
                    {el.reg_rdate.slice(0, 10) +
                      "." +
                      el.reg_rdate.slice(11, 16)}
                  </CommentDate>

                  <ReCommentButton
                    onClick={() => OpenReply(el.comment_index, index)}
                  >
                    댓글 달기
                  </ReCommentButton>
                </CommentList>
                {el.deleted !== "deleted" && el.ip_address === ip && (
                  <CommentButtonWrapper>
                    <UpdateButton
                      disabled={el.distinguish === 0 ? null : "disabled"}
                      onClick={() => CommentUpdate(el.comment_index)}
                    >
                      수정
                    </UpdateButton>

                    <DeleteButton
                      onClick={() => CommentDelete(el.comment_index)}
                    >
                      삭제
                    </DeleteButton>
                  </CommentButtonWrapper>
                )}
              </ListWrap>
              <div>
                {recommentList.map((recomment, index) => (
                  <>
                    {el.comment_index === recomment.bundle_id ? (
                      <ReCommentList key={recomment.bundle_id}>
                        {isOpen === true &&
                        comment_idx === recomment.comment_index ? (
                          <>
                            <ReCommentWrite>
                              <RecommentUpdateInput
                                onChange={ChangeReComment}
                                defaultValue={recomment.context}
                              ></RecommentUpdateInput>

                              <SubmitButtons>
                                <ReCommentSubmit
                                  onClick={() =>
                                    RecommentUpdate(recomment.comment_index)
                                  }
                                >
                                  수정하기
                                </ReCommentSubmit>
                                <ReCommentCancel
                                  onClick={() =>
                                    CancelComment(recomment.comment_index)
                                  }
                                >
                                  취소하기
                                </ReCommentCancel>
                              </SubmitButtons>
                            </ReCommentWrite>
                          </>
                        ) : (
                          <>
                            <ReCommentWrap>
                              <ReCommentContext
                                style={{
                                  color:
                                    recomment.deleted === "deleted"
                                      ? "gray"
                                      : "black",
                                }}
                              >
                                {recomment.deleted === null
                                  ? "⌙ " + recomment.context
                                  : "삭제된 댓글입니다"}
                              </ReCommentContext>
                              <ReCommentDate>
                                {recomment.reg_rdate.slice(0, 10) +
                                  "." +
                                  recomment.reg_rdate.slice(11, 16)}
                              </ReCommentDate>
                            </ReCommentWrap>
                            <CommentButtonWrapper>
                              <UpdateButton
                                disabled={
                                  recomment.distinguish === 0
                                    ? null
                                    : "disabled"
                                }
                                onClick={() =>
                                  UpdateRecomment(recomment.comment_index)
                                }
                              >
                                수정
                              </UpdateButton>

                              <DeleteButton
                                onClick={() =>
                                  RecommentDelete(recomment.comment_index)
                                }
                              >
                                삭제
                              </DeleteButton>
                            </CommentButtonWrapper>
                          </>
                        )}
                      </ReCommentList>
                    ) : null}
                  </>
                ))}
              </div>
              {isOpen === true && comment_idx === el.comment_index && (
                <ReCommentWrite>
                  <ReCommentInput
                    onChange={isEdit === true ? ChangeComment : ChangeReComment}
                    value={isEdit === true ? comment : recomment}
                  ></ReCommentInput>
                  {isEdit === true ? (
                    <SubmitButtons>
                      <ReCommentSubmit
                        onClick={() => UpdateComment(el.comment_index)}
                      >
                        수정하기
                      </ReCommentSubmit>
                      <ReCommentCancel
                        onClick={() => CancelComment(el.comment_index)}
                      >
                        취소하기
                      </ReCommentCancel>
                    </SubmitButtons>
                  ) : (
                    <SubmitButtons>
                      <ReCommentSubmit
                        onClick={() => SubmitComment(el.comment_index)}
                      >
                        저장하기
                      </ReCommentSubmit>
                      <ReCommentCancel
                        onClick={() => CancelComment(el.comment_index)}
                      >
                        취소하기
                      </ReCommentCancel>
                    </SubmitButtons>
                  )}
                </ReCommentWrite>
              )}
            </ListWrapper>
          ))}
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
        </>
      )}
    </Comment>
  );
}
export default CommentPage;
