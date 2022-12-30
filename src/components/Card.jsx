import React from "react";

const Card = ({ pokemon, loading }) => {
  console.log(pokemon);
  return (
    <>
      {loading ? (
        <div>Loading</div>
      ) : (
        pokemon.map((poke, index) => {
          return (
            <div className="card" style={{ width: "18rem" }} key={index}>
              <img
                src={poke.sprites.other.dream_world.front_default}
                className="card-img-top"
                alt={poke.name}
              />
              <div className="card-body"></div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    <h6>Nama : {poke.name}</h6>
                </li>
                <li className="list-group-item">
                    <h6>Tinggi : {poke.height}</h6>
                </li>
                <li className="list-group-item">
                    <h6>Ability : </h6>
                    {poke.abilities.map((ability, index) => {
                        return <div key={index}>{ability.ability.name}</div>
                    })}
                </li>
                <li className="list-group-item">
                  <h6>Type :</h6>
                  {poke.types.map((type, index) => {
                    return <div key={index}>{type.type.name}</div>;
                  })}
                </li>
                <li className="list-group-item">
                    <h6>Stats :</h6>
                    {poke.stats.map((stat, index) => {
                        return (
                        <div key={index}>{stat.stat.name} : {
                            stat.base_stat
                        }</div>
                        )
                    })}
                </li>
              </ul>
            </div>
          );
        })
      )}
    </>
  );
};

export default Card;
