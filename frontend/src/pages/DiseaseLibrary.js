 function DiseaseLibrary({ diseases }) {
  return (
    <div className="card">

      <h2>
        📚 Disease Library
      </h2>

      {

        diseases.map((disease, index) => (

          <div
            key={index}
            className="libraryCard"
          >

            <h3>
              🌿 {disease.name}
            </h3>

            <p>

              <strong>Symptoms:</strong>

              {disease.symptoms}

            </p>

            <p>

              <strong>Cause:</strong>

              {disease.cause}

            </p>

            <p>

              <strong>Treatment:</strong>

              {disease.treatment}

            </p>

          </div>

        ))

      }

    </div>
  );
}

export default DiseaseLibrary;