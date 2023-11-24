/* eslint-disable react/prop-types */
function Options({ option, dispatch, answer, index, question }) {
  const answered = answer !== null;
  return (
    <button
      className={`btn btn-option ${index === answer ? "answer" : ""} ${
        answered ? (index === question.correctOption ? "correct" : "wrong") : ""
      }`}
      onClick={() => {
        dispatch({ type: "answer", payload: index });
      }}
      disabled={answered}
    >
      {option}
    </button>
  );
}

export default Options;
