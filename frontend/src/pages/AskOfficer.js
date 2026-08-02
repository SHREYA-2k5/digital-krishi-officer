import ReactMarkdown from "react-markdown";
import { useTranslation } from "react-i18next";

function AskOfficer({ question, setQuestion, handleAsk, answer }) {
  const { t } = useTranslation();

  return (
    <div className="card">
      <h2>{t("askOfficer.title")}</h2>

      <textarea
        rows="5"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="questionBox"
        placeholder={t("askOfficer.placeholder")}
      />

      <br />

      <button onClick={handleAsk}>{t("askOfficer.button")}</button>

      {answer && (
        <div className="answerCard">
          <div className="answerHeader">{t("askOfficer.assistantTitle")}</div>
          <ReactMarkdown>{answer}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}

export default AskOfficer;