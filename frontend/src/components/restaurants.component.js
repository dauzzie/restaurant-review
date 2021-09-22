import React, {useEffect, useState} from 'react';
import RestaurantDataService from '../services/restaurant';
import {Container, Row, Col, Button, Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';

const Restaurant = props => 
{
  console.log(props);
  const initRestaurantState = {
    id: null,
    name: "",
    address: {},
    cuisine: "",
    reviews: []
  };

  const [restaurant, setRestaurant] = useState(initRestaurantState);

  const getRestaurant = id => 
  {
    RestaurantDataService.get(id)
    .then(res => {
      console.log(res.data, res.data.name);
      setRestaurant(res.data);
    })
    .catch(e => console.log(e));
  };

  useEffect(() => {
    getRestaurant(props.match.params.id);
  }, [props.match.params.id]);

  const deleteReview = (reviewId, idx) => 
  {
    RestaurantDataService.deleteReview(reviewId)
    .then(res => 
      {
        setRestaurant((prevState) => 
        {
          prevState.reviews.splice(idx, 1);
          return(
            {...prevState}
          );
        })
      })
      .catch(e => console.log(e));
  };

  return (
    <Container>
      {restaurant? (
        <Container>
          <h5>{restaurant.name}</h5>
          <p>
            <strong>Cuisine: </strong>{restaurant.cuisine}<br/>
            <strong>Address: </strong>{restaurant.address.building} {restaurant.address.street}, {restaurant.address.zipcode}
          </p>
          <Link to={"/restaurants/" + props.match.params.id + "/review"} className="btn btn-primary">
            Add Review
          </Link>
          <Row>
            {
            restaurant.reviews.length > 0? (
              restaurant.reviews.map((review, index) => {
                return (
                  <Col className="pb-1" lg={4} key={index}>
                    <Card>
                      <Card.Body>
                        <Card.Text>
                          {review.text}<br/>
                          <strong>User: </strong>{review.name}<br/>
                          <strong>Date: </strong>{review.date}
                        </Card.Text>
                        {
                        props.user && props.user.id === review.user.id &&
                        <Row>
                          <Button as="a" onClick={() => deleteReview(review._id, index)} 
                          variant="primary" classNamee="col-lg-5 mx-1 mb-1">
                            Delete
                          </Button>
                          <Link to={{pathname: "/restaurants/" + props.match.params.id + "/review",
                          state: { currentReview: review}
                        }} className="btn btn-primary col-lg-5 mx-1 mb-1">Edit</Link>
                        </Row>
                        }
                      </Card.Body>
                    </Card>
                  </Col>
                )
              })
            ) : (
              <Col sm={4}>
                <br/>
                <p>No reviews yet.</p>
              </Col>
            )
            }
          </Row>
        </Container>

      ) : (
        <Container>
          <p>No restaurants selected.</p>
        </Container>
      )}
    </Container>
  )

}

export default Restaurant;