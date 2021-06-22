import React from 'react';
import ReactDOM from 'react-dom';
import './ModalDetail.css'

const ModalDetail = ({ isShowing, hide, data, description, words, abilities }) => isShowing ? ReactDOM.createPortal(
    
    <>
        <div className="modal-overlay" />
        <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
            <div className="modal">
                <div className="modal-header">
                    <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-title">{data.name}</div>
                <div className="modal-content">
                    <div className="row1">
                        <img src={data.sprites.other["official-artwork"].front_default} alt={data.name} />
                    </div>
                    <div className="row2">
                        <div className="features">
                            <div className="modal-list-images">
                                <img src={data.sprites.front_default} alt={data.name} />
                                <img src={data.sprites.back_default} alt={data.name} />
                            </div>
                            <div className="data">
                                <p>{words.altura}: {data.height}</p>
                                <p>{words.peso}: {data.weight}</p>
                                <p>{words.habilidades}: {abilities}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="description">
                    {description}
                </div>
            </div>
        </div>
    </>, document.body
) : null;

export default ModalDetail;