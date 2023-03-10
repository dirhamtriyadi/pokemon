import "./App.css";
import Card from "./components/Card";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [url, setUrl] = useState(`${process.env.REACT_APP_BASEURL}`);
  const [data, setData] = useState([]);
  const [pokemon, setPokemon] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });

    return () => {
      console.log("cleanup");
    };
  }, []);

  useEffect(() => {
    if (data.results) {
      data.results.forEach((pokemon) => {
        fetchData(pokemon);
      });
    }
  }, [data]);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setPokemon([]);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });

    return () => {
      console.log("cleanup");
    };
  }, [url]);

  const fetchData = async (pokemon) => {
    const response = await fetch(pokemon.url);
    const data = await response.json();
    setPokemon((prevPokemon) => [...prevPokemon, data]);
  };

  const cari = async (e) => {
    e.preventDefault();
    if (search) {
      const hasil = await axios.get(
        `${process.env.REACT_APP_BASEURL}${search}`
      );
      setSearchResult(hasil);
    } else {
      setSearchResult(null);
    }
  };

  if (loading) return <h1>Loading...</h1>;
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;

  console.log(data);

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          {/* search */}
          <div className="input-group mt-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Pokemon Name"
              aria-label="Enter Pokemon Name"
              aria-describedby="button-addon2"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              id="button-addon2"
              onClick={cari}
            >
              Cari
            </button>
          </div>

          <div className="row">
            {searchResult ? (
              <div className="card mt-3" style={{ width: "18rem" }}>
                <img
                  src={
                    searchResult.data.sprites.other.dream_world.front_default
                  }
                  className="card-img-top"
                  alt={searchResult.data.name}
                />
                <div className="card-body"></div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <h6>Nama : {searchResult.data.name}</h6>
                  </li>
                  <li className="list-group-item">
                    <h6>Tinggi : {searchResult.data.height}</h6>
                  </li>
                  <li className="list-group-item">
                    <h6>Ability : </h6>
                    {searchResult.data.abilities.map((ability, index) => {
                      return <div key={index}>{ability.ability.name}</div>;
                    })}
                  </li>
                  <li className="list-group-item">
                    <h6>Type :</h6>
                    {searchResult.data.types.map((type, index) => {
                      return <div key={index}>{type.type.name}</div>;
                    })}
                  </li>
                  <li className="list-group-item">
                    <h6>Stats :</h6>
                    {searchResult.data.stats.map((stat, index) => {
                      return (
                        <div key={index}>
                          {stat.stat.name} : {stat.base_stat}
                        </div>
                      );
                    })}
                  </li>
                </ul>
              </div>
            ) : (
              <>
                {/* button */}
                <div className="btn btn-group mt-3">
                  <button
                    onClick={() => {
                      setUrl(data.previous);
                    }}
                    className="btn btn-outline-primary"
                  >
                    Prev
                  </button>

                  <button
                    onClick={() => {
                      setUrl(data.next);
                    }}
                    className="btn btn-outline-primary"
                  >
                    Next
                  </button>
                </div>

                <Card pokemon={pokemon} loading={loading} />

                {/* button */}
                <div className="btn btn-group">
                  <button
                    onClick={() => {
                      setUrl(data.previous);
                    }}
                    className="btn btn-outline-primary"
                  >
                    Prev
                  </button>

                  <button
                    onClick={() => {
                      setUrl(data.next);
                    }}
                    className="btn btn-outline-primary"
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
