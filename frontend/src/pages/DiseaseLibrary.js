import { useTranslation } from "react-i18next";

function DiseaseLibrary({ diseases }) {
  const { t } = useTranslation();

  return (
    <div className="card">
      <h2>{t("diseaseLibrary.title")}</h2>

      {diseases.map((disease, index) => (
        <div key={index} className="libraryCard">
          <h3>🌿 {t(disease.nameKey)}</h3>

          <p>
            <strong>{t("diseaseLibrary.symptoms")}</strong> {t(disease.symptomsKey)}
          </p>

          <p>
            <strong>{t("diseaseLibrary.cause")}</strong> {t(disease.causeKey)}
          </p>

          <p>
            <strong>{t("diseaseLibrary.treatment")}</strong> {t(disease.treatmentKey)}
          </p>
        </div>
      ))}
    </div>
  );
}

export default DiseaseLibrary;