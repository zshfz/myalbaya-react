import style from "../styles/Single.module.scss";
import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { Context } from "../context/Context";
import { useAxiosGet } from "../hooks/useAxiosGet";
import { useAxiosPost } from "../hooks/useAxiosPost";
import { useAxiosDelete } from "../hooks/useAxiosDelete";
import { useAxiosPut } from "../hooks/useAxiosPut";
import 좋아요 from "../images/logos/좋아요.png";
import 목록 from "../images/logos/목록.png";
import 조회수 from "../images/logos/조회수.png";
import 수정 from "../images/logos/수정.png";
import 삭제 from "../images/logos/삭제.png";
import 댓글 from "../images/logos/댓글.png";

const Single = () => {
  const [comment, setComment] = useState("");
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [updateComment, setUpdateComment] = useState("");
  const [commentIdToUpdate, setCommentIdToUpdate] = useState("");
  const [error, setError] = useState("");

  const { currentUser, isToggled } = useContext(Context);

  const navigate = useNavigate();

  const { id } = useParams();

  const createMarkup = (html) => {
    return { __html: DOMPurify.sanitize(html) };
  };

  const { data: single } = useAxiosGet(`http://localhost:8080/posts/${id}`);

  const { error: postError, handleSubmit: handleCommentSubmit } = useAxiosPost(
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

  const { handleSubmit: handleLike } = useAxiosPost(
    `http://localhost:8080/posts/${id}/like`,
    "",
    "",
    "",
    true,
    "",
    false,
    () => {
      window.location.reload();
    }
  );

  const { error: putError, handleSubmit: handleCommentUpdate } = useAxiosPut(
    `http://localhost:8080/posts/${id}/comment/${commentIdToUpdate}`,
    { content: updateComment },
    "",
    "",
    true,
    false,
    () => {
      setShowCommentInput(false);
      setCommentIdToUpdate(null);
      setUpdateComment("");
      window.location.reload();
    }
  );

  const { error: deleteError1, handleDelete: handleSingleDelete } =
    useAxiosDelete(
      `http://localhost:8080/posts/${id}`,
      "게시글이 삭제되었습니다.",
      () =>
        navigate(`/gallery/${isToggled ? "사장" : "알바"}${single.brand.name}`),
      true
    );

  const handleCommentDelete = async (commentId) => {
    try {
      await axios.delete(
        `http://localhost:8080/posts/${id}/comment/${commentId}`,
        {
          withCredentials: true,
        }
      );
      window.location.reload();
    } catch (error) {
      setError(error.response ? error.response.data : error.message);
      console.log(error);
    }
  };

  const handleCommentUpdateWithId = (commentId) => {
    setCommentIdToUpdate(commentId);
    handleCommentUpdate();
  };

  return (
    <div className={style.container}>
      <div className={style.header}>
        <div className={style.left}>
          <span className={style.title}>{single.title}</span>
          <span
            onClick={() => {
              navigate(`/userprofile/${single.author.id}`);
            }}
          >
            {single.author && single.author.nickname}
          </span>
          <span>{single.createdAt && single.createdAt.replace("T", " ")}</span>
          <img
            src={수정}
            alt=""
            onClick={() => navigate(`/write/${id}`, { state: { single } })}
          />
          <img src={삭제} alt="" onClick={handleSingleDelete} />
          {deleteError1 && (
            <p className={style.errorMessage}>{JSON.stringify(deleteError1)}</p>
          )}
        </div>
        <div className={style.right}>
          <img src={좋아요} alt="" /> {single.likeCount}
          <img src={조회수} alt="" /> {single.viewCount}
          <img src={댓글} alt="" /> {single.comments && single.comments.length}
        </div>
      </div>
      <div className={style.body}>
        {single.imageUrls &&
          single.imageUrls.map((item1, index) => (
            <img
              key={index}
              className={style.contentImage}
              src={`http://localhost:8080${item1}`}
              alt=""
            />
          ))}
        <span
          className={style.content}
          dangerouslySetInnerHTML={createMarkup(single.content)}
        />
        <div className={style.imageContainer}>
          {currentUser.nickname === single?.author?.nickname ? (
            ""
          ) : (
            <img src={좋아요} alt="" onClick={handleLike} />
          )}
          <img
            src={목록}
            alt=""
            onClick={() => {
              navigate(
                `/gallery/${isToggled ? "사장" : "알바"}${single.brand.name}`
              );
            }}
          />
        </div>
      </div>
      <div className={style.commentContainer}>
        {postError && <p>{JSON.stringify(postError)}</p>}
        {error && <p>{JSON.stringify(error)}</p>}
        {putError && <p>{JSON.stringify(putError)}</p>}

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
                  {showCommentInput && commentIdToUpdate === item.id ? (
                    <div className={style.commentChangeInputContainer}>
                      <textarea
                        placeholder="댓글 수정"
                        value={updateComment}
                        onChange={(e) => {
                          setUpdateComment(e.target.value);
                        }}
                      />
                      <button
                        onClick={() => {
                          handleCommentUpdateWithId(item.id);
                        }}
                      >
                        수정
                      </button>
                      <button
                        onClick={() => {
                          setShowCommentInput(false);
                          setCommentIdToUpdate(null);
                        }}
                      >
                        취소
                      </button>
                    </div>
                  ) : (
                    <span className={style.content}>{item.content}</span>
                  )}
                </div>
                <div className={style.right}>
                  <button
                    onClick={() => {
                      setShowCommentInput(true);
                      setCommentIdToUpdate(item.id);
                    }}
                  >
                    수정
                  </button>
                  <button onClick={() => handleCommentDelete(item.id)}>
                    삭제
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Single;
