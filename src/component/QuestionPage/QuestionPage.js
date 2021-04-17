import "./QuestionPage.css";
import { useState, useEffect } from "react";
import { getQuestion } from "../api";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateScore } from "../../features/scoreSlice";
import { updateQuestion } from "../../features/questionSlice";

export default function QuestionPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [questions, setQuestions] = useState([{}]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    async function getData() {
      const { questions } = await getQuestion();
      setQuestions(questions);
    }
    getData();
  }, []);

  dispatch(updateQuestion(questions.length));

  questions[currentQuestion]?.option?.sort(() => Math.random() - 0.5);

  //   CHECK ANSWER
  function checkAnswer(event) {
    const answerText = event.target.outerText;
    if (answerText === questions[currentQuestion]?.answer.toUpperCase()) {
      dispatch(updateScore(score + 1));
      setCurrentQuestion(currentQuestion + 1);
      setScore(score + 1);
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      history.push("/result");
    }
  }

  //   CHECK TIMER
  // useEffect(() => {
  //   const interval = setTimeout(countdown, 1000);

  //   return () => clearTimeout(interval);
  // }, [time]);

  return (
    <div className="container">
      <div className="question-page">
        <h1>
          Câu hỏi {currentQuestion + 1} / {questions.length}
        </h1>
        <h2>{questions[currentQuestion]?.question}</h2>

        <ul className="list-button">
          <li>
            <button className="btn-answer" onClick={(event) => checkAnswer(event)}>
              {questions[currentQuestion]?.option?.[0]}
            </button>
          </li>
          <li>
            <button className="btn-answer" onClick={(event) => checkAnswer(event)}>
              {questions[currentQuestion]?.option?.[1]}
            </button>
          </li>
          <li>
            <button className="btn-answer" onClick={(event) => checkAnswer(event)}>
              {questions[currentQuestion]?.option?.[2]}
            </button>
          </li>
          <li>
            <button className="btn-answer" onClick={(event) => checkAnswer(event)}>
              {questions[currentQuestion]?.option?.[3]}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
