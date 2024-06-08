import style from "../styles/Single.module.scss";
import { useState } from "react";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { useAxiosGet } from "../hooks/useAxiosGet";
import { useAxiosPost } from "../hooks/useAxiosPost";

const Single = () => {
  const [comment, setComment] = useState("");

  const { id } = useParams();

  const createMarkup = (html) => {
    return { __html: DOMPurify.sanitize(html) };
  };

  const { data: single } = useAxiosGet(`http://localhost:8080/posts/${id}`);

  const { error, handleSubmit: handleCommentSubmit } = useAxiosPost(
    `http://localhost:8080/posts/${id}/comment`,
    {
      content: comment,
    },
    "",
    "",
    true,
    "",
    false,
    () => {
      setComment("");
      window.location.reload();
    }
  );

  return (
    <div className={style.container}>
      <div className={style.header}>
        <div className={style.left}>
          <span className={style.title}>{single.title}</span>
          <span>{single.author && single.author.nickname}</span>
          <span>{single.createdAt && single.createdAt.replace("T", " ")}</span>
          <span>수정</span>
          <span>삭제</span>
        </div>
        <div className={style.right}>
          <span>좋아요: {single.likeCount}</span>
          <span>조회수: {single.viewCount}</span>
        </div>
      </div>
      <div className={style.body}>
        <span
          className={style.content}
          dangerouslySetInnerHTML={createMarkup(single.content)}
        />
        <div className={style.buttonContainer}>
          <button>좋아요</button>
          <button>목록으로</button>
        </div>
      </div>
      <div className={style.commentContainer}>
        {error && <p>{error}</p>}
        <div className={style.commentInputContainer}>
          <textarea
            placeholder="댓글"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
          <button onClick={handleCommentSubmit}>등록</button>
        </div>
        {single &&
          single.comments.map((item, index) => {
            return (
              <div key={index} className={style.comment}>
                <div className={style.left}>
                  <span className={style.author}>{item.author.nickname}</span>
                  <span className={style.date}>
                    {item.createdAt.replace("T", " ")}
                  </span>
                  <span className={style.reply}>답글</span>
                  <span className={style.content}>{item.content}</span>
                </div>
                <div className={style.right}>
                  <button>수정</button>
                  <button>삭제</button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Single;
