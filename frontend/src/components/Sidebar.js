 import { Link } from "react-router-dom";

function Sidebar({
  language,
  setLanguage
}) {

  return (

    <div className="sidebar">

      <h1>
        🌾 Digital Krishi Officer
      </h1>

      <p className="tagline">
        Smart AI for Healthy Crops
      </p>

      <select
        className="languageSelect"
        value={language}
        onChange={(e)=>setLanguage(e.target.value)}
      >

        <option value="en">English</option>
        <option value="hi">Hindi</option>
        <option value="ta">Tamil</option>
        <option value="ml">Malayalam</option>
        <option value="te">Telugu</option>

      </select>

      <div className="menu">

        <Link className="menuItem" to="/">
          🏠 Home
        </Link>

        <Link className="menuItem" to="/detect">
          🍃 Detect Disease
        </Link>

        <Link className="menuItem" to="/library">
          📚 Disease Library
        </Link>

        <Link className="menuItem" to="/tips">
          🌱 Farming Tips
        </Link>

        <Link className="menuItem" to="/ask">
          🤖 Ask Officer
        </Link>

      </div>

    </div>

  );

}

export default Sidebar;