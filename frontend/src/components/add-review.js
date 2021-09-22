import React, {useState} from 'react';
import RestaurantDataService from "../services/restaurant";
import {Container, Form, Button} from 'react-bootstrap';

const AddReview = props => {
  console.log(props);
  let initialReviewState = "";
  let editing = false;

  if(props.location.state && props.location.state.currentReview)
  {
    editing = true;
    initialReviewState = props.location.state.currentReview.text;
  }

  const [review, setReview] = useState(initialReviewState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    setReview(event.target.value);
  };

  const saveReview = () => {
    var data = {
      text: review,
      name: props.user.name,
      user_id: props.user.id,
      restaurant_id: props.match.params.id
    };

    if(editing)
    {
      data.review_id = props.location.state.currentReview._id;
      RestaurantDataService.updateReview(data)
      .then(res => {
        setSubmitted(true);
        console.log(res.data);
      })
      .catch(e => {
        console.log(e);
      });
    } else {
      RestaurantDataService.createReview(data)
      .then(res => {
        setSubmitted(true);
        console.log(res.data);
      })
      .catch(e => console.log(e));
    }
  };

  return (
    <div>
      {props.user ? (
        <Form>
          {
            submitted ? (
              <Container>
                <h4>You submitted successfully!</h4>
                <Button href={"/restaurants/" + props.match.params.id} variant="success">
                  Back to Restaurant
                </Button>
              </Container>
            ) : (
            <Container>
                <Form.Group>
                  <Form.Label htmlFor="description">{editing? "Edit" : "Create"} Review</Form.Label>
                  <Form.Control type="text" as="input" id="text" required 
                  value={review} onChange={handleInputChange} name="text"/>
              </Form.Group>
              <Button variant="success" onClick={saveReview}> Submit </Button>
            </Container>            
            )}
        </Form>
      ) : (
        <Container>
          Please log in.
        </Container>
      )}
    </div>

  );
}

export default AddReview;