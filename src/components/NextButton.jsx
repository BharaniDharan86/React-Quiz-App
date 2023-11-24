/* eslint-disable react/prop-types */
function NextButton({ answer, dispatch, index, numOfQuestions }) {
  if (answer === null) return null;
  console.log(index, numOfQuestions);
  if (index + 1 >= numOfQuestions) {
    console.log(index + 1 >= numOfQuestions);
    return (
      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: "finished" });
        }}
      >
        Finish
      </button>
    );
  }
  return (
    <button className="btn btn-ui" onClick={() => dispatch({ type: "next" })}>
      Next
    </button>
  );
}

export default NextButton;
