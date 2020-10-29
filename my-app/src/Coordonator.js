import React from "react";
import Image from 'react-bootstrap/Image'
import {Table,Form,Row,Col,Container} from 'react-bootstrap'
import translate from "./I18N/translate";
import {Redirect
} from "react-router-dom";

class Coordonator extends React.Component{

    render() {

        return(<Container>
            <Row>
                <Col xs={6} md={4}>
                    <Image src="https://i1.rgstatic.net/ii/profile.image/272219939012620-1441913699979_Q512/Dorian_Gorgan.jpg" rounded />
                </Col>
            </Row>
            <Form>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridLastName">
                        <Form.Label>{translate("lname")}:</Form.Label>
                        <Form.Control readOnly  type="text" placeholder="Gorgan" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridFirstName">
                        <Form.Label>{translate("fname")}:</Form.Label>
                        <Form.Control readOnly  type="text" placeholder="Dorin" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPosition">
                        <Form.Label>{translate("position")}:</Form.Label>
                        <Form.Control readOnly  readtype="text" placeholder="profesor doctor inginer" />
                    </Form.Group>
                </Form.Row>
            </Form>
            <Table striped bordered hover variant="dark">
                <thead>
                <tr>
                    <th>#</th>
                    <th>{translate("domain")}</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>Grafica</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Inteligenta Artificiala</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Procesare de imagini</td>
                </tr>
                </tbody>
            </Table>
        </Container>)
    }

}

export default Coordonator;