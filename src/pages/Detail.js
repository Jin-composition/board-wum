import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { getData } from "../api/Write.api";
import { Link } from "react-router-dom";
import CommentPage from "./comment/Comment";
import styled from "styled-components";

// styled //

const Wrapper = styled.div`
  width: 1000px;
  margin: 0 auto;
`;

const PageName = styled.div`
  font-size: 30px;
  text-align: center;
`;
const Board = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;
const BoardRow = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid black;
  /* width: 1000px; */
  margin-top: 10px;
`;
export const Number = styled.div`
  width: 10%;
  text-align: center;
`;
export const Title = styled.div`
  width: 20%;
  text-align: center;
`;

export const Text = styled.div`
  width: 40%;
  text-align: center;
`;
export const Date = styled.div`
  width: 20%;
  text-align: center;
`;
export const BoardColumn = styled.div`
  display: flex;
  flex-direction: row;
  width: 1000px;
`;
export const Button = styled.div`
  margin-top: 30px;
  // margin-right: 20px;
  width: 1000px;
`;
export const ListButton = styled.button`
  display: block;
  float: right;
  cursor: pointer;
`;

function Detail({ ip }) {
  console.log(ip);
  const { id } = useParams();
  const response = useQuery("getData", getData);
  const detail = response.data?.filter((el) => el.board_idx == id);

  return (
    <Wrapper>
      <PageName> {id}상세페이지</PageName>
      <Board>
        <BoardRow>
          <Number>번호</Number>

          <Title> 제목</Title>
          <Text> 내용</Text>
          <Date>작성일</Date>
        </BoardRow>
        {detail && (
          <BoardColumn>
            <Number>{detail[0].rowNum}</Number>

            <Title>{detail[0].title} </Title>
            <Text>{detail[0].comment}</Text>
            <Date>{detail[0].reg_rdate.slice(0, 10)}</Date>
          </BoardColumn>
        )}
        <Button>
          <Link to={"/"}>
            <ListButton>목록으로</ListButton>
          </Link>
        </Button>
        <CommentPage id={id} ip={ip} />
      </Board>
    </Wrapper>
  );
}

export default Detail;
