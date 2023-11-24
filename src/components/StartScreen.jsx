/* eslint-disable react/prop-types */
function StartScreen({ numOfQuestions, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to the React Quiz</h2>
      <h3>{numOfQuestions} questions to test your react knowledge...</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        lets start
      </button>
    </div>
  );
}

export default StartScreen;
