import { logDOM } from "@testing-library/react";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router";

import styles from "../css/Write.module.css";

function Write({ ip }) {
  console.log(ip);
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  month = month < 10 ? "0" + month.toString() : month.toString();
  let day = `0` + date.getDate();
  const today = `${year}-${month}-${day}`;

  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");

  const [edit, setEdit] = useState(false);

  const navigate = useNavigate();
  const { state } = useLocation();

  // 파일 첨부하기
  const fileRef = useRef();
  const [myImages, setMyImages] = useState([]);

  useEffect(() => {
    if (state.isEdit === true) {
      setEdit(true);
      ForUpdate(state.idx);
    } else {
      setEdit(false);
    }
  }, [state]);

  // 수정페이지 data 불러오기 //
  async function ForUpdate(idx) {
    console.log(idx, "번호");
    const param = new URLSearchParams();

    param.append("board_idx", idx);
    await axios.post("http://localhost:8000/data", param).then((res) => {
      console.log(res, "결과_수정데이터");

      setTitle(res.data[0].title);
      setComment(res.data[0].comment);
    });
  }
  // 수정하기 //
  async function UpdateData() {
    if (state) window.confirm("정말로 수정하시겠습니까?");
    {
      const idx = state.idx;
      await axios
        .post("http://localhost:8000/update", {
          title: title,
          comment: comment,
          update_date: today,
          board_idx: idx,
        })
        .then((res) => {
          console.log(res, "res");

          alert("수정 완료");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function ChangeTitle(e) {
    setTitle(e.target.value);
  }
  function ChangeComment(e) {
    setComment(e.target.value);
  }
  function ChangeFile(e) {
    const selectImage = e.target.files;
    const ImageList = [...myImages];

    for (let i = 0; i < ImageList.length; i++) {
      const imageUrl = URL.createObjectURL(selectImage[i]);
      ImageList.push(imageUrl);
    }
    setMyImages(ImageList);

    // if (!file) return;

    // const fileReader = new FileReader();
    // fileReader.readAsDataURL(file);
    // console.log(file);

    // fileReader.onLoad = (e) => {
    //   console.log(e.target.result, "url");
    //   setImageUrl(e.target.result);
    //   console.log(imageUrl);
    // };
    // 왜 안되는지 모르겠네.....
    // const imageUrl = URL.createObjectURL(file);
    // console.log(imageUrl, "??");
    // setImageUrl(imageUrl);
  }

  // 저장하기 //
  async function SaveData() {
    const formData = new FormData();
    // formData.append("files", imageUrl);
    if (window.confirm("정말로 작성하시겠습니까?")) {
      await axios
        .post("http://localhost:8000/write", {
          title: title,
          comment: comment,
          reg_rdate: today,
          ip_address: ip,
          data: formData,
        })
        .then((res) => {
          console.log(res, "res");

          alert("등록완료");
        })
        .catch((err) => {
          console.log(err);
        });
      setTitle("");
      setComment("");
      navigate("/");
    }
  }

  function MoveToList() {
    navigate("/");
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.page_name}>
        {edit === true ? "Update 페이지" : "Write 페이지"}
      </div>
      <div className={styles.board}>
        <div className={styles.input_list}>
          <div className={styles.title_input}>
            <label className={styles.label}>제목</label>
            <input
              id="title"
              className={styles.title}
              value={title}
              onChange={ChangeTitle}
            ></input>
          </div>
          <div className={styles.comment_input}>
            <label className={styles.label}>내용</label>
            <textarea
              id="comment"
              className={styles.comment}
              value={comment}
              onChange={ChangeComment}
            ></textarea>
          </div>
          <div className={styles.uploadFile}>
            <input
              type="file"
              ref={fileRef}
              onChange={ChangeFile}
              multiple="multiple"
            />
            {myImages.map((image) => (
              <img
                // src={}
                style={{
                  width: "200px",
                  height: "200px",
                }}
              />
            ))}
          </div>
        </div>
        <div className={styles.button}>
          {edit === true ? (
            <button className={styles.submit_btn} onClick={UpdateData}>
              수정하기
            </button>
          ) : (
            <button className={styles.submit_btn} onClick={SaveData}>
              저장하기
            </button>
          )}
          <button className={styles.list_btn} onClick={MoveToList}>
            목록으로
          </button>
        </div>
      </div>
    </div>
  );
}

export default Write;
