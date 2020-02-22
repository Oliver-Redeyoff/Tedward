import React from "react"
import {Card, Button, Container, Row, Col} from "react-bootstrap"

const Item = (props) => {
    let item = props.item;
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
                <Container>
                    <Row>
                        <Col><Button onClick={e => props.item.update(props.item.val-1<0 ? 0 : props.item.val-1)}>-</Button></Col>
                        <Col>{props.item.val}</Col>
                        <Col><Button onClick={e => props.item.update(props.item.val+1)}>+</Button></Col>
                    </Row>
                </Container>
            </Card.Body>
        </Card>
    );
};

export default Item;