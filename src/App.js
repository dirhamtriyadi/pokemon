import "./App.css";
import Card from "./components/Card";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASEURL}`)
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

  const fetchData = async (pokemon) => {
    const response = await fetch(pokemon.url);
    const data = await response.json();
    setPokemon((prevPokemon) => [...prevPokemon, data]);
  };

  if (loading) return <h1>Loading...</h1>;
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;

  return (
    <div className="App">
      <header className="App-header">
        <div className="row">
            <Card pokemon={pokemon} loading={loading} />
        </div>
      </header>
    </div>
  );
}

export default App;
