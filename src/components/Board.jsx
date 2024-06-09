import style from "../styles/Board.module.scss";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import DOMPurify from "dompurify";
import { useAxiosGet } from "../hooks/useAxiosGet";
import 좋아요 from "../images/logos/좋아요.png";
import 조회수 from "../images/logos/조회수.png";
import 댓글 from "../images/logos/댓글.png";

const Board = () => {
  const location = useLocation();
  const popularBoard = location.state?.popularBoard || [];

  const navigate = useNavigate();

  const { id } = useParams();

  const { data: board } = useAxiosGet(
    `http://localhost:8080/brands/${id.slice(2)}/posts/${
      id.slice(0, 2) === "알바" ? "employee" : "boss"
    }`
  );

  const createMarkup = (html) => {
    return { __html: DOMPurify.sanitize(html) };
  };

  const truncateContent = (content, length) => {
    return content.length > length
      ? content.substring(0, length) + "..."
      : content;
  };

  console.log(popularBoard);

  return (
    <div className={style.container}>
      <div className={style.header}>
        {id === "인기게시판" ? <span>인기 게시판</span> : <span>게시판</span>}

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
          {id === "인기게시판" ? (
            ""
          ) : (
            <button
              onClick={() => {
                navigate(`/write/${id}`);
              }}
            >
              글쓰기
            </button>
          )}
        </div>
      </div>
      <div className={style.body}>
        {board &&
          board.map((item1, index1) => {
            return (
              <div
                key={index1}
                className={style.postContainer}
                onClick={() => {
                  navigate(`/single/${item1.id}`);
                }}
              >
                <div className={style.left}>
                  <span className={style.title}>{item1.title}</span>
                  <span
                    className={style.content}
                    dangerouslySetInnerHTML={createMarkup(
                      truncateContent(item1.content, 40)
                    )}
                  />
                  <span className={style.etc}>
                    <img src={좋아요} alt="" /> {item1.likeCount}{" "}
                    <img src={조회수} alt="" /> {item1.viewCount}{" "}
                    <img src={댓글} alt="" /> {item1.comments.length}{" "}
                    {item1.createdAt.replace("T", " ")}
                  </span>
                </div>
                <div className={style.right}>
                  {item1.imageUrls &&
                    item1.imageUrls.map((item2, index2) => (
                      <img
                        key={index2}
                        src={`http://localhost:8080${item2}`}
                        alt=""
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
                  <span className={style.title}>{item1.title}</span>
                  <span
                    className={style.content}
                    dangerouslySetInnerHTML={createMarkup(
                      truncateContent(item1.content, 40)
                    )}
                  />
                  <span className={style.etc}>
                    <img src={좋아요} alt="" /> {item1.likeCount}{" "}
                    <img src={조회수} alt="" /> {item1.viewCount}{" "}
                    <img src={댓글} alt="" /> {item1.comments.length}{" "}
                    {item1.createdAt.replace("T", " ")}
                  </span>
                </div>
                <div className={style.right}>
                  {item1.imageUrls &&
                    item1.imageUrls.map((item2, index2) => (
                      <img
                        key={index2}
                        src={`http://localhost:8080${item2}`}
                        alt=""
                      />
                    ))}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Board;
