import React from "react"
import {Card, Button} from "react-bootstrap"

const Item = (props) => {
    let item = props.item;
    const orderHandler =(e) => {
        e.preventDefault();
        console.log("Order Coffee");
    };

    const formatPrice = (price) => {
        let dec = Number(price)/100;
        return ("£"+String(dec))
    };

    return (
        <Card style={{maxWidth: '18rem', padding: '1rem'}}>
            <Card.Title>{item.name}</Card.Title>
            <Card.Subtitle>{formatPrice(item.price)}</Card.Subtitle>
            <Card.Body>
                <Card.Text>
                    {item.desc}
                </Card.Text>
                <Button onClick={e => orderHandler(e)}>Order</Button>
            </Card.Body>
        </Card>
    );
};

export default Item;