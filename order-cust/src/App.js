import React, {useState} from 'react';
import {Button, CardColumns, Col, Container, Navbar, NavbarBrand, Row} from "react-bootstrap";
import Item from "./Item";

const App = () => {
    const [numCoffee, updateCoffee] = useState(0);
    const [numTea, updateTea] = useState(0);
    const [numMonster, updateMonster] = useState(0);

    const orderHandler = () => {

        let toSend = {
            "Coffee": numCoffee,
            "Tea": numTea,
            "Monster Original": numMonster
        };

        console.log(JSON.stringify(toSend));

        fetch("http://127.0.0.1:6969/", {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(toSend)
        }).then((resp) => {
            console.log(resp)
            return resp.json();
        }).then((json) => {
            console.log(json);
        }).catch((err) => {
            console.log(err);
        })
    };

    let items = {
        coffee: {
            name: "Coffee",
            desc: "It is coffee",
            price: 69,
            val: numCoffee,
            update: updateCoffee
        },
        tea: {
            name: "Tea",
            desc: "Tea, the lifeblood of the British",
            price: 1,
            val: numTea,
            update: updateTea,
        },
        monster: {
            name: "Monster Original",
            desc: "Unleash the beast",
            price: 100,
            val: numMonster,
            update: updateMonster
        }
    };

    return (
        <div>
            <Navbar bg={"primary"} variant={"dark"} style={{marginBottom: '3rem'}}>
                <NavbarBrand>M'Lady Cafe</NavbarBrand>
                <Button style={{marginBottom: '1rem'}} onClick={e => orderHandler()}>Order!</Button>
            </Navbar>
            <Container>
                <Row>
                    <Col>
                        <CardColumns>
                            {Object.keys(items).map(i => {
                                let k = items[i];
                                return <Item key={k.name} item={k}/>
                            })}
                        </CardColumns>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};


export default App;
