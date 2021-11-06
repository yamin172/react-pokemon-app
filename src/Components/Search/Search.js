import axios from 'axios'
import React, { useState } from 'react';

const Search = () => {
    const [searchPokemon, setSearchPokemon] = useState('');
    const [selectedPokemon, setSelectedPokemon] = useState(false);
    const [pokemons, setPokemons] = useState({
        name: "",
        species: "",
        image: "",
        hp: "",
        attack: "",
        defense: "",
        type: "",
    });

    const pokemon = () => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${searchPokemon}`)
            .then((response) => {
                setPokemons({
                    name: searchPokemon,
                    species: response.data.species.name,
                    image: response.data.sprites.front_default,
                    attack: response.data.stats[1].base_stat,
                    defense: response.data.stats[2].base_stat,
                    type: response.data.types[0].type.name,
                });
            setSelectedPokemon(true)
        })
    }
    return (
        <>
            <div className="mt-10">
                <input onChange={(e) => setSearchPokemon(e.target.value)} type="search" name="search" placeholder="Search here" className="px-3 py-2 font-semibold placeholder-gray-500 text-black rounded border-none ring-2 ring-gray-300 outline-none focus:ring-gray-500 focus:ring-2 w-96" />
                <button onClick={pokemon} className="ml-2 bg-red-500 p-2 rounded text-white font-medium ring-2 ring-red-300 w-32 hover:bg-red-800 outline-none focus:ring-red-300 focus:ring-2 ">Search</button>
            </div>
            <div className="mt-10">
                {!selectedPokemon ?
                    (
                    <h1 className="text-4xl p-5 rounded-md bg-gray-100 w-2/5 text-center m-auto text-gray-600">Please select a Pokemon Name</h1>
                    )
                    :
                    (
                        <div className="max-w-sm m-auto p-5 justify-center shadow-xl rounded-md bg-gray-50 ">
                            <img className="w-96 m-0" src={pokemons.image} alt={pokemons.name} />
                            <h1 className="text-4xl m-0 capitalize">{pokemons.name}</h1>
                            <h3 className="capitalize text-black text-xl">Species: {pokemons.species}</h3>
                            <h3 className="capitalize text-black text-xl">Attack: {pokemons.attack}</h3>
                            <h3 className="capitalize text-black text-xl">Defense: {pokemons.defense}</h3>
                            <h3 className="capitalize text-black text-xl">Type: {pokemons.type}</h3>
                        </div>
                    )}
            </div>
        </>
    );
};

export default Search;