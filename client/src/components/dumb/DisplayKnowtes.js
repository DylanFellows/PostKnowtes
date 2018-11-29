import React from 'react';

const DisplayKnowtes = (props) => {
    return(
        <div className="singleKnowteDiv">
            <div className="singleKnowte">
                <div className="knowteHeaderDiv">
                    <label className="subject">
                        {props.subject}
                    </label>
                </div>
                <div className="detailDiv">
                    <label className="username">Posted By: {props.user} on</label><label className="smallFont">{props.createdAt.substring(0,10)}</label>
                </div>
                <div className="titleDiv">
                    <h2 className="title">
                        {props.title}
                    </h2>
                </div>
                <br></br>
                <div className="panel bodyDiv">
                    <h6 className="knowteBody">
                        {props.body}
                    </h6>
                </div>
                <div className="seeMore">
                    <button type='button' className="btn btn-outline-light btn-sm">See More</button>
                    <button type="button" className="btn btn-outline-light btn-sm">Comment
                    </button>
                </div>
                <hr></hr>
            </div>
        </div>
    )
}

export default DisplayKnowtes;