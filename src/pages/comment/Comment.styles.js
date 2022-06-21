import styled from "styled-components";

export const Comment = styled.div`
  width: 1000px;
  margin: auto 0;
`;
export const CommentTitle = styled.div`
  display: flex;
`;
export const CommentLength = styled.div`
  display: flex;
  flex-direction: row;
`;
export const CommentName = styled.div`
  margin-right: 5px;
`;
export const CommentWrite = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;
export const CommentInput = styled.textarea`
  width: 800px;
  height: 50px;
  box-sizing: border-box;
  resize: none;
  padding: 10px;
`;
export const CommentSubmit = styled.button`
  width: 90px;
  height: 50px;
  cursor: pointer;
`;
export const ReCommentWrite = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;
export const ReCommentInput = styled.textarea`
  width: 800px;
  height: 50px;
  box-sizing: border-box;
  resize: none;
  padding: 10px;
`;
export const SubmitButtons = styled.div``;
export const ReCommentSubmit = styled.button`
  width: 90px;
  height: 50px;
  margin-right: 10px;
  cursor: pointer;
`;
export const ReCommentCancel = styled.button`
  width: 90px;
  height: 50px;
  cursor: pointer;
`;
export const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;
export const ListWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #edededed;
`;
export const CommentList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 40px;
  margin-bottom: 15px;
  margin-left: 5px;
  /* width: 100%; */
  /* height: 100%; */
`;
export const CommentContext = styled.div``;
export const CommentDate = styled.div`
  font-size: 10px;
  color: gray;
  margin-left: 20px;
`;
export const ReCommentButton = styled.button`
  width: 50px;
  height: 20px;
  font-size: 10px;
  border: none;
  cursor: pointer;
  margin-left: 20px;
`;
export const CommentButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
export const UpdateButton = styled.button`
  margin-right: 5px;
  cursor: pointer;
  :disabled {
    cursor: default;
  }
`;
export const DeleteButton = styled.button`
  cursor: pointer;
  :disabled {
    cursor: default;
  }
`;

export const ReCommentList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-top: 10px;
  margin-bottom: 15px;
`;
export const ReCommentWrap = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 30px;
  align-items: center;
`;
export const ReCommentContext = styled.div``;
export const RecommentUpdateInput = styled.textarea`
  width: 800px;
  height: 50px;
  box-sizing: border-box;
  resize: none;
  padding: 10px;
  margin-right: 10px;
`;
export const ReCommentDate = styled.div`
  font-size: 10px;
  color: gray;
  margin-left: 20px;
`;
