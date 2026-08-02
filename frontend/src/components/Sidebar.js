import { Link } from "react-router-dom";
import i18n from "../i18n";
import { useTranslation } from "react-i18next";

function Sidebar({ language, setLanguage }) {
  const { t } = useTranslation();

  return (
    <div className="sidebar">
      <h1>🌾 {t("sidebar.title")}</h1>

      <p className="tagline">{t("sidebar.tagline")}</p>

      <select
        className="languageSelect"
        value={language}
        onChange={(e) => {
          const lang = e.target.value;
          setLanguage(lang);
          i18n.changeLanguage(lang);
        }}
      >
        <option value="en">English</option>
        <option value="hi">Hindi</option>
        <option value="ta">Tamil</option>
        <option value="ml">Malayalam</option>
        <option value="te">Telugu</option>
      </select>

      <div className="menu">
        <Link className="menuItem" to="/">
          🏠 {t("sidebar.home")}
        </Link>

        <Link className="menuItem" to="/detect">
          🍃 {t("sidebar.detect")}
        </Link>

        <Link className="menuItem" to="/library">
          📚 {t("sidebar.library")}
        </Link>

        <Link className="menuItem" to="/timeline">
          🕒 {t("sidebar.timeline")}
        </Link>

        <Link className="menuItem" to="/tips">
          🌱 {t("sidebar.tips")}
        </Link>

        <Link className="menuItem" to="/ask">
          🤖 {t("sidebar.ask")}
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;