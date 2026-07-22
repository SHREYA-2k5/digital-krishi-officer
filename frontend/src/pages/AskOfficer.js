 import ReactMarkdown from "react-markdown";

function AskOfficer({
  question,
  setQuestion,
  handleAsk,
  answer
}) {
  return (

    <div className="card">

      <h2>
        👨‍🌾 Ask Krishi Officer
      </h2>

      <textarea
        rows="5"
        value={question}
        onChange={(e) =>
          setQuestion(e.target.value)
        }
        className="questionBox"
        placeholder={`Example:

• My tomato leaves are turning yellow

• Which fertilizer should I use for paddy?

• Banana leaves have black spots`}
      />

      <br />

      <button onClick={handleAsk}>
        Ask
      </button>

      {

        answer && (

          <div className="answerCard">

            <div className="answerHeader">

              🤖 Digital Krishi Officer

            </div>

            <ReactMarkdown>

              {answer}

            </ReactMarkdown>

          </div>

        )

      }

    </div>

  );
}

export default AskOfficer;