import React from 'react';
import {CardColumns, Col, Container, Navbar, NavbarBrand, Row} from "react-bootstrap";
import Item from "./Item";

const App = () => {

    let items = {
        coffee: {
            name: "Coffee",
            desc: "It is coffee",
            price: 69,
        },
        tea: {
            name: "Tea",
            desc: "Tea, the lifeblood of the British",
            price: 1
        },
        monster: {
            name: "Monster Original",
            desc: "Unleash the beast",
            price: 100
        }
    };

    return (
        <div>
             <Header />
            <Container>
                <Row>
                    <Col>
                        <CardColumns>
                            {Object.keys(items).map(i => {let k = items[i]; return <Item key={k.name} item={k}/>})}
                        </CardColumns>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

const Header = () => {
    return(
        <Navbar bg={"primary"} variant={"dark"} style={{marginBottom: '3rem'}}>
            <NavbarBrand>M'Lady Cafe</NavbarBrand>
        </Navbar>
    )
};

export default App;
