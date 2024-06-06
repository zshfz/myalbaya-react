import style from "../styles/LoginModal.module.scss";
import { useContext } from "react";
import { Modal } from "react-bootstrap";
import { useInput } from "../hooks/useInput";
import { useAxiosPost } from "../hooks/useAxiosPost";
import { Context } from "../context/Context";

const LoginModal = (props) => {
  const { setCurrentUser } = useContext(Context);

  const [email, handleEmailChange] = useInput("");
  const [password1, handlePassword1Change] = useInput("");

  const { error, handleSubmit } = useAxiosPost(
    "http://localhost:8080/login",
    {
      email: email,
      password1: password1,
    },
    "",
    "",
    "",
    setCurrentUser
  );

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton />
      <Modal.Body>
        <div className={style.container}>
          <span className={style.mainBanner}>내 알바야?!</span>
          <span>아르바이트생들을 위한 익명 커뮤니티 사이트</span>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={handleEmailChange}
            />
            <input
              type="password"
              placeholder="비밀번호"
              value={password1}
              onChange={handlePassword1Change}
            />
            <button type="submit">로그인</button>
            {error && <p>{error}</p>}
            <span>회원가입</span>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
