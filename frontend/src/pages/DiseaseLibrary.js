import { useTranslation } from "react-i18next";

function DiseaseLibrary({ diseases }) {
  const { t } = useTranslation();

  return (
    <div className="card">
      <h2>{t("diseaseLibrary.title")}</h2>

      {diseases.map((disease, index) => (
        <div key={index} className="libraryCard">
          <h3>🌿 {disease.name}</h3>

          <p>
            <strong>{t("diseaseLibrary.symptoms")}</strong> {disease.symptoms}
          </p>

          <p>
            <strong>{t("diseaseLibrary.cause")}</strong> {disease.cause}
          </p>

          <p>
            <strong>{t("diseaseLibrary.treatment")}</strong> {disease.treatment}
          </p>
        </div>
      ))}
    </div>
  );
}

export default DiseaseLibrary;