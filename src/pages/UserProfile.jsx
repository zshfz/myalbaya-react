import style from "../styles/UserProfile.module.scss";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Table } from "react-bootstrap";
import { Context } from "../context/Context";
import { useAxiosGet } from "../hooks/useAxiosGet";
import { useInput } from "../hooks/useInput";
import 프로필 from "../images/logos/프로필.png";

const UserProfile = () => {
  const [showNicknameChangeInput, setShowNicknameChangeInput] = useState(false);

  const { currentUser, setCurrentUser } = useContext(Context);

  const navigate = useNavigate();

  const { id } = useParams();

  const [nickname, handleNicknameChange, setNickname] = useInput("");

  const { data: userInfo, setData: setUserInfo } = useAxiosGet(
    id === "내프로필"
      ? "http://localhost:8080/profile"
      : `http://localhost:8080/members/${id}/profile`,
    true
  );

  //닉네임 변경 (커스텀 훅 쓰니까 자꾸 이상하게 나와서 안씀)
  const handleSubmit = async () => {
    try {
      await axios.post(
        "http://localhost:8080/profile/updateNickname",
        { newNickname: nickname },
        {
          withCredentials: true,
        }
      );
      const updatedUserInfo = {
        ...userInfo,
        member: { ...userInfo.member, nickname: nickname },
      };
      setUserInfo(updatedUserInfo);
      setCurrentUser({ ...currentUser, nickname: nickname });
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ ...currentUser, nickname: nickname })
      );
      setNickname("");
      setShowNicknameChangeInput(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.userInfoContainer}>
        <div className={style.left}>
          <img src={프로필} alt="" />
        </div>
        <div className={style.right}>
          <span>
            <span className={style.bold}>이름:</span>{" "}
            {userInfo && userInfo.member.name}
          </span>
          <span>
            <span className={style.bold}>닉네임:</span>{" "}
            {showNicknameChangeInput ? (
              <>
                <input
                  type="text"
                  placeholder="닉네임 변경"
                  value={nickname}
                  onChange={handleNicknameChange}
                />
                <button onClick={handleSubmit}>변경</button>
                <button
                  onClick={() => {
                    setShowNicknameChangeInput(false);
                  }}
                >
                  취소
                </button>
              </>
            ) : (
              <> {userInfo && userInfo.member.nickname}</>
            )}
          </span>
          <span>
            <span className={style.bold}>이메일:</span>{" "}
            {userInfo && userInfo.member.email}
          </span>
          <div className={style.buttonContainer}>
            {currentUser.employmentType === "MASTER" ? (
              <button
                onClick={() => {
                  navigate("/board/브랜드인증목록");
                }}
              >
                브랜드 인증 목록
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    setShowNicknameChangeInput(true);
                  }}
                >
                  닉네임 변경
                </button>
                <button
                  onClick={() => {
                    navigate("/brandauthwrite");
                  }}
                >
                  브랜드 인증하기
                </button>
              </>
            )}
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
              {userInfo.posts &&
                userInfo.posts.map((item, index) => {
                  return (
                    <tr
                      key={index}
                      onClick={() => {
                        navigate(`/single/${item.id}`);
                      }}
                    >
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
