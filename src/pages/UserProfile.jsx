import style from "../styles/UserProfile.module.scss";
import { Table } from "react-bootstrap";
import { useAxiosGet } from "../hooks/useAxiosGet";
import 프로필 from "../images/logos/프로필.png";

const UserProfile = () => {
  const { data: userInfo } = useAxiosGet("http://localhost:8080/profile", true);

  console.log(userInfo);

  return (
    <div className={style.container}>
      <div className={style.userInfoContainer}>
        <div className={style.left}>
          <img src={프로필} alt="" />
        </div>
        <div className={style.right}>
          <span>
            <span className={style.bold}>이름:</span> {userInfo.member.name}
          </span>
          <span>
            <span className={style.bold}>닉네임:</span>{" "}
            {userInfo.member.nickname}
          </span>
          <span>
            <span className={style.bold}>이메일:</span> {userInfo.member.email}
          </span>
          <div className={style.buttonContainer}>
            <button>닉네임 변경</button>
            <button>브랜드 인증하기</button>
          </div>
        </div>
      </div>
      <div className={style.boardContainer}>
        <div className={style.header}>
          <span>최근 작성한 게시물</span>
        </div>
        <div className={style.body}>
          <Table hover>
            <thead>
              <tr>
                <th>제목</th>
                <th>작성자</th>
                <th>좋아요</th>
                <th>조회수</th>
                <th>댓글</th>
              </tr>
            </thead>
            <tbody>
              {userInfo.posts.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.title}</td>
                    <td>{item.author.nickname}</td>
                    <td>{item.likeCount}</td>
                    <td>{item.viewCount}</td>
                    <td>{item.comments.length}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
