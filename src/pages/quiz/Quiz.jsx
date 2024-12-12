/* eslint-disable no-unused-vars */
import useAuthStore from "../../stores/use-auth-store";
import "./Quiz.css";
import UserInfo from "../world/UserInfo";
import CollectorGame from "./CollectorGame";

const Quiz = () => {
  return (
    <>
      <UserInfo />
      <div className="quiz-container">
        <CollectorGame />
      </div>
    </>
  );
};

export default Quiz;
