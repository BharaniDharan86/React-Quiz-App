import Options from "./Options";

/* eslint-disable react/prop-types */
function Questions({ question, dispatch, answer }) {
  return (
    <div>
      <h4>{question.question}</h4>
      <div className="options">
        {question.options.map((option, i) => {
          return (
            <Options
              question={question}
              index={i}
              option={option}
              key={option}
              dispatch={dispatch}
              answer={answer}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Questions;
