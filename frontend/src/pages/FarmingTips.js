import { useTranslation } from "react-i18next";

function FarmingTips() {
  const { t } = useTranslation();

  return (
    <div className="card">
      <h2>{t("farmingTips.title")}</h2>

      <div className="libraryCard">
        <h3>{t("farmingTips.wateringTitle")}</h3>
        <p>{t("farmingTips.wateringText")}</p>
      </div>

      <div className="libraryCard">
        <h3>{t("farmingTips.soilTitle")}</h3>
        <p>{t("farmingTips.soilText")}</p>
      </div>

      <div className="libraryCard">
        <h3>{t("farmingTips.pestTitle")}</h3>
        <p>{t("farmingTips.pestText")}</p>
      </div>
    </div>
  );
}

export default FarmingTips;