import './Header.css';

const Header = ({ words, changeLanguage }) => {

    function handleSelect(e) {
        changeLanguage(e.target.value);
    }
    return <>
        <div className="head">P O K E D E X {words.idioma}
            <select
                defaultValue={words.idiom}
                onChange={handleSelect}>
                <option selected={words.idioma === 'es' ? true : false} value="es">{words.español}</option>
                <option selected={words.idioma === 'en' ? true : false} value="en">{words.ingles}</option>
            </select>
        </div>
    </>
}


export default Header;