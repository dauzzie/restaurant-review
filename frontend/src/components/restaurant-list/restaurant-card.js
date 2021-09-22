import React, {Component} from 'react';
import {Container, Row, Col, Card, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

const RestaurantCard = props => 
{
    console.log(props);
    return(
        <Container>
            <Col className="pb-1" lg={4}>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            <h5>{props.restaurant.name}</h5>
                        </Card.Title>
                        <Card.Text>
                            <strong>Cuisine: </strong>
                            {props.restaurant.cuisine}
                            <br/>
                            <strong>Adress: </strong>
                            {props.address}

                            <Row>
                                <Link
                                to={"/restaurants/" + props.restaurant._id}
                                className="btn btn-primary col-lg-5 mx-1 mb-1">
                                    View Reviews
                                </Link>
                                <Button as="a" target="_blank" 
                                href={"https://www.google.com/maps/place/" + props.restaurant.name}
                                className="col-lg-5 mx-1 mb-1">
                                    View Map
                                </Button>
                            </Row>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </Container>
    );
}

export default RestaurantCard;
