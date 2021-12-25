import React from 'react';
import './Card.css';

const Card = (props) =>{
    const { card_data } = props;
    const { data,links } = card_data;
    const { title,date_created } = data[0];
    const { href } = links[0];
    return(
        <div className = "card-section">
            <img src = {href} width = "100px" data-testid="image-src" />
            <div className = "card-details">
                <h4 data-testid="title-text">{title}</h4>
                <span data-testid="card-date">{new Date(date_created).toLocaleString()}</span>
            </div>
        </div>
    )
}
export default Card