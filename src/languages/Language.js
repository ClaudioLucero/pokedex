export  function getLanguage(idiom){

    switch (idiom) {
        case 'es': return{
            idioma:'es',
            ingles:'Ingles',
            español:'Español',
            altura:'Altura',
            peso:'Peso',
            habilidades:'Habilidades',
            siguiente:'Siguiente',
            anterior:'Anterior'
            };

        case 'en': return{
            idioma:'en',
            ingles:'English',
            español:'Spanish',
            altura:'Height',
            peso:'Widht',
            habilidades:'Abilities',            
            siguiente:'Next',
            anterior:'Previous'
            };   
        default:
            break;
    }
}

