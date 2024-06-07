import style from "../styles/DropDownMenu.module.scss";
import styled from "styled-components";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/Context";

const DropDownMenu = () => {
  const { brandArray, isToggled, setShowDropDownMenu } = useContext(Context);

  const navigate = useNavigate();

  return (
    <Div
      $backgroundColor={isToggled ? "skyblue" : "#FAEB78"}
      className={style.container}
    >
      <div className={style.boards}>
        <span className={style.boardTitle}>게시판</span>
        <span>인기 게시판</span>
        <span>통합 게시판</span>
        <span>채용공고 게시판</span>
      </div>

      {brandArray.map((item1, index1) => {
        return (
          <div key={index1} className={style.brandContainer}>
            <span className={style.category}>{item1.category}</span>
            {item1.brand.map((item2, index2) => {
              return (
                <span
                  key={index2}
                  className={style.brand}
                  onClick={() => {
                    setShowDropDownMenu(false);
                    navigate(`/gallery/${isToggled ? "사장" : "알바"}${item2}`);
                  }}
                >
                  {item2}
                </span>
              );
            })}
          </div>
        );
      })}
    </Div>
  );
};

const Div = styled.div`
  background: ${(props) => props.$backgroundColor};
`;

export default DropDownMenu;
