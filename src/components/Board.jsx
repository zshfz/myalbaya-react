import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import DOMPurify from "dompurify";
import ReactModal from "react-modal";
import { useAxiosGet } from "../hooks/useAxiosGet";
import style from "../styles/Board.module.scss";
import 좋아요 from "../images/logos/좋아요.png";
import 조회수 from "../images/logos/조회수.png";
import 댓글 from "../images/logos/댓글.png";

const Board = () => {
  const location = useLocation();
  const popularBoard = location.state?.popularBoard || [];
  const navigate = useNavigate();
  const { id } = useParams();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState("");

  const getUrl = (id) => {
    if (id === "통합게시판") {
      return "http://localhost:8080/posts";
    } else if (id === "브랜드인증목록") {
      return "http://localhost:8080/allow";
    } else {
      return `http://localhost:8080/brands/${id.slice(2)}/posts/${
        id.slice(0, 2) === "알바" ? "employee" : "boss"
      }`;
    }
  };

  const { data: board } = useAxiosGet(getUrl(id));

  const [sortedBoard, setSortedBoard] = useState([]);

  useEffect(() => {
    if (board) {
      const sorted = [...board].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setSortedBoard(sorted);
    }
  }, [board]);

  const createMarkup = (html) => {
    return { __html: DOMPurify.sanitize(html) };
  };

  const truncateContent = (content, length) => {
    return content.length > length
      ? content.substring(0, length) + "..."
      : content;
  };

  const openModal = (src) => {
    setModalImageSrc(src);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalImageSrc("");
  };

  console.log(sortedBoard);

  return (
    <div className={style.container}>
      <div className={style.header}>
        {id === "인기게시판" && <span>인기 게시판</span>}
        {id === "통합게시판" && <span>통합 게시판</span>}
        {id === "브랜드인증목록" && <span>브랜드 인증 목록</span>}
        {id === "채용공고게시판" && <span>채용공고 게시판</span>}
        {id !== "인기게시판" &&
          id !== "통합게시판" &&
          id !== "브랜드인증목록" &&
          id !== "채용공고게시판" && <span>게시판</span>}

        <div className={style.inputContainer}>
          <input type="text" placeholder="검색" />
          <select>
            <option>제목</option>
            <option>작성자</option>
            <option>내용</option>
          </select>
        </div>
        <div className={style.buttonContainer}>
          <select>
            <option>최신순</option>
            <option>좋아요</option>
            <option>조회수</option>
          </select>
          {id === "인기게시판" || id === "브랜드인증목록" ? (
            ""
          ) : (
            <button
              onClick={() => {
                if (id === "통합게시판") {
                  navigate("/write/통합게시판");
                } else if (id === "채용공고게시판") {
                  navigate("/hirewrite");
                } else {
                  navigate(`/write/${id}`);
                }
              }}
            >
              글쓰기
            </button>
          )}
        </div>
      </div>
      <div className={style.body}>
        {sortedBoard &&
          sortedBoard.map((item1, index1) => {
            return (
              <div
                key={index1}
                className={style.postContainer}
                onClick={() => {
                  id === "브랜드인증목록"
                    ? navigate(`/single/브랜드인증상세${item1.id}`, {
                        state: { board: sortedBoard },
                      })
                    : navigate(`/single/${item1.id}`);
                }}
              >
                <div className={style.left}>
                  <span className={style.title}>
                    {item1.title}{" "}
                    <span className={style.author}>
                      {item1.author?.nickname}
                    </span>
                  </span>

                  <span
                    className={style.content}
                    dangerouslySetInnerHTML={createMarkup(
                      truncateContent(item1.content, 40)
                    )}
                  />
                  {id === "브랜드인증목록" ? (
                    ""
                  ) : (
                    <span className={style.etc}>
                      <img src={좋아요} alt="" /> {item1.likeCount}{" "}
                      <img src={조회수} alt="" /> {item1.viewCount}{" "}
                      <img src={댓글} alt="" />{" "}
                      {item1.comments ? item1.comments.length : 0}{" "}
                      {item1.createdAt ? item1.createdAt.replace("T", " ") : ""}
                    </span>
                  )}
                </div>
                <div className={style.right}>
                  {item1.imageUrls &&
                    item1.imageUrls.map((item2, index2) => (
                      <img
                        key={index2}
                        src={`http://localhost:8080${item2}`}
                        alt=""
                        onClick={(e) => {
                          e.stopPropagation();
                          openModal(`http://localhost:8080${item2}`);
                        }}
                      />
                    ))}
                </div>
              </div>
            );
          })}
        {popularBoard &&
          popularBoard.map((item1, index1) => {
            return (
              <div
                key={index1}
                className={style.postContainer}
                onClick={() => {
                  navigate(`/single/${item1.id}`);
                }}
              >
                <div className={style.left}>
                  <span className={style.title}>
                    {item1.title}{" "}
                    <span className={style.author}>
                      {item1.author?.nickname}
                    </span>
                  </span>
                  <span
                    className={style.content}
                    dangerouslySetInnerHTML={createMarkup(
                      truncateContent(item1.content, 40)
                    )}
                  />
                  <span className={style.etc}>
                    <img src={좋아요} alt="" /> {item1.likeCount}{" "}
                    <img src={조회수} alt="" /> {item1.viewCount}{" "}
                    <img src={댓글} alt="" />{" "}
                    {item1.comments ? item1.comments.length : 0}{" "}
                    {item1.createdAt ? item1.createdAt.replace("T", " ") : ""}
                  </span>
                </div>
                <div className={style.right}>
                  {item1.imageUrls &&
                    item1.imageUrls.map((item2, index2) => (
                      <img
                        key={index2}
                        src={`http://localhost:8080${item2}`}
                        alt=""
                        onClick={(e) => {
                          e.stopPropagation();
                          openModal(`http://localhost:8080${item2}`);
                        }}
                      />
                    ))}
                </div>
              </div>
            );
          })}
      </div>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className={style.modal}
        overlayClassName={style.overlay}
      >
        <button onClick={closeModal}>닫기</button>
        <img src={modalImageSrc} alt="Large view" />
      </ReactModal>
    </div>
  );
};

export default Board;
