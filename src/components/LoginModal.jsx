import style from "../styles/LoginModal.module.scss";
import { Modal } from "react-bootstrap";

const LoginModal = (props) => {
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton />
      <Modal.Body>
        <div className={style.container}>
          <span className={style.mainBanner}>내 알바야?!</span>
          <span>아르바이트생들을 위한 익명 커뮤니티 사이트</span>
          <form>
            <input type="email" placeholder="이메일" />
            <input type="password" placeholder="비밀번호" />
            <button>로그인</button>
            <span>회원가입</span>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
