/* eslint-disable react/prop-types */

function FinishedScreen({ points, maxPossiblePoints, dispatch }) {
  const percentage = (points / maxPossiblePoints) * 100;
  console.log(percentage);
  return (
    <div>
      <p className="result">
        You scored <strong>{points}</strong> out of {maxPossiblePoints}(
        {Math.ceil(percentage)}%)
      </p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart the quiz
      </button>
    </div>
  );
}

export default FinishedScreen;
