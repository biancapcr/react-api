// importazione
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [actresses, setActresses] = useState([]);
  const [actors, setActors] = useState([]);
  const [cast, setCast] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredCast, setFilteredCast] = useState([]);

  // fetch delle attrici
  function fetchActresses() {
    axios
      .get("https://lanciweb.github.io/demo/api/actresses/")
      .then((res) => setActresses(res.data));
  }

  // fetch degli attori
  function fetchActors() {
    axios
      .get("https://lanciweb.github.io/demo/api/actors/")
      .then((res) => setActors(res.data));
  }

  // partenza entrambe le fetch al mount
  useEffect(() => {
    fetchActresses();
    fetchActors();
  }, []);

  // unione
  useEffect(() => {
    const merged = [...actors, ...actresses];
    setCast(merged);
    setFilteredCast(merged);
  }, [actors, actresses]);

  // applicazionee del filtro per nome
  useEffect(() => {
    const q = search.toLowerCase();
    const temp = cast.filter((item) =>
      item.name.toLowerCase().includes(q)
    );
    setFilteredCast(temp);
  }, [search, cast]);

  // filtraggio
  const filteredActresses = actresses.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );
  const filteredActors = actors.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="wrapper">
      <h1 className="title">Lista Attori</h1>

      {/* bonus 3 */}
      <div className="searchbar">
        <input
          type="text"
          className="search-input"
          placeholder="Cerca per nome…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* attrici */}
      <h2 className="section-title">Attrici</h2>
      <div className="grid">
        {filteredActresses.map((actress) => (
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

      {/* bonus 1 */}
      <h2 className="section-title">Attori</h2>
      <div className="grid">
        {filteredActors.map((actor) => (
          <div className="grid-item" key={actor.id}>
            <div className="card">
              <img
                src={actor.image}
                className="card-image card-img"
                alt={actor.name}
              />
              <div className="card-body">
                <h5 className="card-title">{actor.name}</h5>
                <p className="card-text">{actor.biography}</p>
              </div>
              <ul className="details">
                <li className="details-row bg-1">{actor.birth_year}</li>
                <li className="details-row bg-2">{actor.nationality}</li>
                <li className="details-row bg-3">{actor.awards}</li>
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* bonus 2 */}
      <h2 className="section-title">Tutti</h2>
      <div className="grid">
        {filteredCast.map((person, i) => (
          <div className="grid-item" key={(person.id ?? i) + "-all"}>
            <div className="card">
              <img
                src={person.image}
                className="card-image card-img"
                alt={person.name}
              />
              <div className="card-body">
                <h5 className="card-title">{person.name}</h5>
                <p className="card-text">{person.biography}</p>
              </div>
              <ul className="details">
                <li className="details-row bg-1">{person.birth_year}</li>
                <li className="details-row bg-2">{person.nationality}</li>
                <li className="details-row bg-3">{person.awards}</li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;