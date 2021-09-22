import React, {Component} from 'react';
import {Container, Row, ButtonGroup, Button} from 'react-bootstrap';

const RestaurantQuery = (props) => {
    return(
        <Container>
            <Row>
                <ButtonGroup>
                    <Button as="input" type="text" className="form-control"
                    variant="outline-primary"
                    placeholder={props.placeholder}
                    value={props.value}
                    onChange={props.onChange}/>
                    <Button as="button" variant="secondary" onClick={props.onClick}>
                        Search
                    </Button>
                </ButtonGroup>
            </Row>
        </Container>
    );
};

export default RestaurantQuery;

// export default class RestaurantQuery extends Component
// {
//     constructor(props) {
//         super(props);
//         this.props = props;
        
//     }
//     render() {
//         return(
//             <Container>
//                 <Row>
//                     <ButtonGroup>
//                         <Button as="input" type="text" className="form-control"
//                         placeholder={this.props.placeholder}
//                         value={this.props.value}
//                         onChange={this.props.onChange}/>
//                         <Button as="button" variant="secondary" onClick={this.props.onClick}>
//                             Search
//                         </Button>
//                     </ButtonGroup>
//                 </Row>
//             </Container>
//         );
//     }
// }