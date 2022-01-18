import React from 'react';
import '../StyleSheets/web.css'



function PopUp(props) {
    if (!props.show) {
        return null;
    }
    return (
        <div className='modal' onClick={props.onClose}>
            <div className='modal-content' onClick={e => e.stopPropagation()}>
                <button className="close" onClick={props.onClose}>
                    &times;
                </button>
                <div className="header">{props.title} </div>
                <div className="content">{props.children}</div>
                <div className="ModalButtonWrap">
                    <button className="submitButton" onClick={props.onClose} >
                        ok
                    </button>
                </div>
            </div>
        </div>
    );
}
export default PopUp;


