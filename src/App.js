import React, { useState, useEffect } from "react";
import './App.css';
import Pokemon from './components/Pokemon/Pokemon';
import Pagination from './components/Pagination/Pagination';
import Loading from './components/Loading/Loading';
import Header from './components/Header/Header';
import { getLanguage } from './languages/Language';
import { getPokedex, getDetailPoke } from './APICalls/APICalls';


function App() {
  const [pokemon, setPokemon] = useState([]);
  const [actualPag, setactualPag] = useState(['https://pokeapi.co/api/v2/pokemon?limit=5']);
  const [nextPag, setNextPag] = useState();
  const [prevPag, setPrevPag] = useState();
  const [loading, setLoading] = useState(false);
  const [word, setWords] = useState({ ...getLanguage('es') });


  useEffect(() => {

    const fetchData = async api => {

      setLoading(true);
      let res = await getPokedex({ api: actualPag });
      if (res) {
        await getDetailPoke(res.data.results).then(pokes => {
          if (pokes) {
            setLoading(false);
            setNextPag(res.data.next);
            setPrevPag(res.data.previous);
            setPokemon([...pokes]);
          }
        })
      }
    };

    fetchData(actualPag);
  }, [actualPag]);

  function changeIdiom(i) {
    setWords({ ...getLanguage(i) });
  }

  function nextPagefunction() {
    setactualPag(nextPag);
  }

  function prevPagefunction() {
    setactualPag(prevPag);
  }
  if (loading) return <Loading />;

  let lispokemon = pokemon.map(p => (
    <Pokemon data={p.data} words={word} />));

  return (
    <div className="app">
      <Header words={word} changeLanguage={changeIdiom} />
      <div className="app-gruop-pokes">
        {lispokemon}
      </div>
      <Pagination next={nextPag ? nextPagefunction : null}
        prev={prevPag ? prevPagefunction : null}
        words={word}
      />

    </div>

  );
}

export default App;
