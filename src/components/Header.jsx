import style from "../styles/Header.module.scss";
import styled from "styled-components";
import { useContext } from "react";
import { Context } from "../context/Context";
import ToggleButton from "../components/ToggleButton";

const Header = () => {
  const { isToggled, setIsToggled } = useContext(Context);

  return (
    <div className={style.container}>
      <div className={style.left}>
        <span className={style.mainBanner}>내 알바야?!</span>
        <span>
          <Span backgroundColor={isToggled ? "skyblue" : "#FAEB78"}>
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
        <Span backgroundColor={isToggled ? "skyblue" : "#FAEB78"}>
          전체메뉴
        </Span>
        <span>로그인</span>
        <span>회원가입</span>
      </div>
    </div>
  );
};

const Span = styled.span`
  background: ${(props) => props.backgroundColor};
`;

export default Header;
