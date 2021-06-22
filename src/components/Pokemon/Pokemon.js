import React, { useState, useEffect } from "react";
import ModalDetail from '../ModalDetail/ModalDetail';
import UseModalDetail from '../ModalDetail/useModalDetail';
import { getDetailPoke } from '../../APICalls/APICalls';
import './Pokemon.css';


const Pokemon = ({ data, words }) => {

  const { isShowing, toggle } = UseModalDetail(false);
  const [descriptionES, setDescriptionES] = useState('');//descripciones de cada pokeon
  const [descriptionEN, setDescriptionEN] = useState('');
  const [abilityES, setAbilityES] = useState('');//para guardar traduccion de habilidades de cada pokemon,puede tener mas de una habilidad
  const [abilityES2, setAbilityES2] = useState('');
  const [abilityEN, setAbilityEN] = useState('');
  const [abilityEN2, setAbilityEN2] = useState('');

  useEffect(() => {
    
    const fetchData = async api => {
      let urls = getUrl(data);//creo array de urls para consutar caracteristicas de una habilidad
      await getDetailPoke(urls).then(pokes => {//s
        if (pokes) {
          getDescription(pokes[0]);
          getAbilities(pokes[1], 1);
          if (pokes.length === 3) getAbilities(pokes[2], 2);//control cantidad de habilidades

        }
      })
    };

    fetchData(data);
  }, [data]);

  function getUrl(data) {
    let urls = [];
    urls[0] = { url: data.species.url };//url para obtengener descripcion del pokemon
    data.abilities.forEach(u => {
      urls.push({ url: u.ability.url });//urls para obtener caracteristicas de la habilidad,cada pokemon puede tener mas de una habilidad
    });
    return urls;
  }

  function getDescription(data) {//guardo descripciones obtenidas,en el lenguage ingles,español
    data.data.flavor_text_entries.forEach(r => {
      if (r.language.name === 'es') {
        setDescriptionES(r.flavor_text);
      }
      if (r.language.name === 'en') {
        setDescriptionEN(r.flavor_text);
      }
    });

  }

  function getAbilities(data, type) {//guardo habilidades en ambos idiomas,type control si es un okemn con una o dos habilidades

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