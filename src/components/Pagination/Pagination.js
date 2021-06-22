import './Pagination.css';

const Pagination = ({ next, prev, words }) => {
    return <div className="paginator">
            <div className="content-buttons">
                {prev && <div className="button-prev" onClick={prev}>{words.anterior}</div>}
                {next && <div className="button-next" onClick={next}>{words.siguiente}</div>}
            </div>
    </div>
}


export default Pagination;