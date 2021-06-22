import React, { useState, useEffect } from "react";
import ModalDetail from '../ModalDetail/ModalDetail';
import UseModalDetail from '../ModalDetail/useModalDetail';
import { getDetailPoke } from '../../APICalls/APICalls';
import './Pokemon.css';


const Pokemon = ({ data, words }) => {

  const { isShowing, toggle } = UseModalDetail(false);
  const [descriptionES, setDescriptionES] = useState('');
  const [descriptionEN, setDescriptionEN] = useState('');
  const [abilityES, setAbilityES] = useState('');
  const [abilityES2, setAbilityES2] = useState('');
  const [abilityEN, setAbilityEN] = useState('');
  const [abilityEN2, setAbilityEN2] = useState('');

  useEffect(() => {
    
    const fetchData = async api => {
      let urls = getUrl(data);
      await getDetailPoke(urls).then(pokes => {
        if (pokes) {
          getDescription(pokes[0]);
          getAbilities(pokes[1], 1);
          if (pokes.length === 3) getAbilities(pokes[2], 2);

        }
      })
    };

    fetchData(data);
  }, [data]);

  function getUrl(data) {
    let urls = [];
    urls[0] = { url: data.species.url };
    data.abilities.forEach(u => {
      urls.push({ url: u.ability.url });
    });
    return urls;
  }

  function getDescription(data) {
    data.data.flavor_text_entries.forEach(r => {
      if (r.language.name === 'es') {
        setDescriptionES(r.flavor_text);
      }
      if (r.language.name === 'en') {
        setDescriptionEN(r.flavor_text);
      }
    });

  }

  function getAbilities(data, type) {

    data.data.names.forEach(r => {

      if (r.language.name === 'es') {
        if (type === 1)
          setAbilityES(r.name);
        else
          setAbilityES2(r.name);
      }
      if (r.language.name === 'en') {
        if (type === 1)
          setAbilityEN(r.name);
        else
          setAbilityEN2(r.name);
      }

    });

  }

  return <>
    <div className="poke" onClick={toggle} >
      <img src={data.sprites.other.dream_world.front_default} alt={data.name} />
      <div className="name-poke">{data.name}</div>
    </div>
    <ModalDetail
      isShowing={isShowing}
      hide={toggle}
      data={data}
      description={words.idioma === 'es' ? descriptionES : descriptionEN}
      words={words}
      abilities={words.idioma === 'es' ? abilityES + ', ' + abilityES2 : abilityEN + ', ' + abilityEN2}
    />
  </>
}

export default Pokemon;