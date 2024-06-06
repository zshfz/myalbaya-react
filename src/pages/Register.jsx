import style from "../styles/Register.module.scss";
import { useParams } from "react-router-dom";
import { useInput } from "../hooks/useInput";
import { useAxiosPost } from "../hooks/useAxiosPost";

const Register = () => {
  const { id } = useParams();

  const [name, handleNameChange] = useInput("");
  const [nickname, handleNicknameChange] = useInput("");
  const [email, handleEmailChange] = useInput("");
  const [password1, handlePassword1Change] = useInput("");
  const [password2, handlePassword2Change] = useInput("");

  const { error: errorEmployee, handleSubmit: handleEmployeeSubmit } =
    useAxiosPost(
      "http://localhost:8080/members/new/employee",
      {
        name: name,
        nickname: nickname,
        email: email,
        password1: password1,
        password2: password2,
      },
      "회원가입이 완료되었습니다. 홈 화면으로 이동합니다."
    );

  const { error: errorBoss, handleSubmit: handleBossSubmit } = useAxiosPost(
    "http://localhost:8080/members/new/boss",
    {
      name: name,
      nickname: nickname,
      email: email,
      password1: password1,
      password2: password2,
    },
    "회원가입이 완료되었습니다. 홈 화면으로 이동합니다."
  );

  return (
    <div className={style.container}>
      <span>{id} 회원가입</span>
      <form
        onSubmit={
          id === "아르바이트생" ? handleEmployeeSubmit : handleBossSubmit
        }
      >
        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={handleNameChange}
        />
        <input
          type="text"
          placeholder="닉네임"
          value={nickname}
          onChange={handleNicknameChange}
        />
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
        <input
          type="password"
          placeholder="비밀번호 재입력"
          value={password2}
          onChange={handlePassword2Change}
        />
        <button
          className={
            id === "아르바이트생" ? style.employeeButton : style.bossButton
          }
          type="submit"
        >
          회원가입
        </button>
        {errorEmployee && <p>{errorEmployee}</p>}
        {errorBoss && <p>{errorBoss}</p>}
      </form>
    </div>
  );
};

export default Register;
