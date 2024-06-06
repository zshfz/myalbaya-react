import style from "../styles/Header.module.scss";
import styled from "styled-components";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/Context";
import ToggleButton from "../components/ToggleButton";
import LoginModal from "./LoginModal";

const Header = () => {
  const [show, setShow] = useState(false); //모달

  const { isToggled, setIsToggled } = useContext(Context);

  const navigate = useNavigate();

  //모달
  const handleClose = () => {
    setShow(false);
  };

  //모달
  const handleShow = () => {
    setShow(true);
  };

  return (
    <div className={style.container}>
      <div className={style.left}>
        <span className={style.mainBanner}>내 알바야?!</span>
        <span>
          <Span $backgroundColor={isToggled ? "skyblue" : "#FAEB78"}>
            아르바이트생들
          </Span>
          을 위한 익명 커뮤니티 사이트
        </span>
      </div>
      <div className={style.right}>
        <ToggleButton
          isToggled={isToggled}
          onToggle={() => {
            setIsToggled(!isToggled);
          }}
        />
        <Span $backgroundColor={isToggled ? "skyblue" : "#FAEB78"}>
          전체메뉴
        </Span>
        <span onClick={handleShow}>로그인</span>
        <LoginModal show={show} handleClose={handleClose} />
        <span
          onClick={() => {
            navigate("/registerintro");
          }}
        >
          회원가입
        </span>
      </div>
    </div>
  );
};

const Span = styled.span`
  background: ${(props) => props.$backgroundColor};
`;

export default Header;
