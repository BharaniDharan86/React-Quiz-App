/* eslint-disable no-case-declarations */
import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import MainApp from "./components/MainApp";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Questions from "./components/Questions";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishedScreen from "./components/FinishedScreen";
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };

    case "dataFailed":
      return { ...state, status: "error" };

    case "start":
      return { ...state, status: "active" };

    case "answer":
      const currentQuestion = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === currentQuestion.correctOption
            ? state.points + currentQuestion.points
            : state.points,
      };
    case "next":
      return { ...state, index: state.index + 1, answer: null };

    case "finished":
      return { ...state, status: "finished" };

    case "restart":
      return {
        ...state,
        answer: null,
        points: 0,
        index: 0,
        status: "ready",
      };

    default:
      throw new Error("Unknown Actions");
  }
}

function App() {
  const initialState = {
    questions: [],
    status: "loading",
    index: 0,
    answer: null,
    points: 0,
  };

  const [{ status, questions, index, answer, points }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const numOfQuestions = questions.length;
  const maxPoints = questions.reduce((prev, curr) => prev + curr.points, 0);

  async function getQuestions() {
    try {
      const response = await fetch("http://localhost:8000/questions");
      const data = await response.json();
      dispatch({ type: "dataReceived", payload: data });
    } catch (error) {
      dispatch({ type: "dataFailed" });
    }
  }

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <div className="app">
      <Header />
      <MainApp>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numOfQuestions={numOfQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numOfQuestions={numOfQuestions}
              points={points}
              maxPoints={maxPoints}
            />
            <Questions
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <NextButton
              answer={answer}
              dispatch={dispatch}
              index={index}
              numOfQuestions={numOfQuestions}
            />
          </>
        )}

        {status === "finished" && (
          <FinishedScreen
            points={points}
            maxPossiblePoints={maxPoints}
            dispatch={dispatch}
          />
        )}
      </MainApp>
    </div>
  );
}

export default App;
