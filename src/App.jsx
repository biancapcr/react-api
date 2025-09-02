// importazione
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  // array dall'API
  const [actresses, setActresses] = useState([]);

  // fetch delle attrici
  function fetchActresses() {
    axios
      .get("https://lanciweb.github.io/demo/api/actresses/")
      .then((res) => setActresses(res.data));
  }

  useEffect(fetchActresses, []);


return (
  <div className="wrapper">
    <h1 className="title">Lista Attrici</h1>

    <div className="grid">
      {actresses.map((actress) => (
        <div className="grid-item" key={actress.id}>
          <div className="card">
            <img
              src={actress.image}
              className="card-image card-img"
              alt={actress.name}
            />
            <div className="card-body">
              <h5 className="card-title">{actress.name}</h5>
              <p className="card-text">{actress.biography}</p>
            </div>
            <ul className="details">
              <li className="details-row bg-1">{actress.birth_year}</li>
              <li className="details-row bg-2">{actress.nationality}</li>
              <li className="details-row bg-3">{actress.awards}</li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}

export default App;
