import React, {Component, useState, useEffect, useReducer} from "react";
import RestaurantDataService from "../../services/restaurant";
import RestaurantQuery from "./restaurant-query";
import RestaurantCard from "./restaurant-card";
import { Link } from "react-router-dom";
import {Container, Row, Col, Form, Button, ButtonGroup} from 'react-bootstrap';

const RestaurantList = props => {
  console.log(props.user);
  const [userRequest, setUserRequest] = useState(
    {
    restaurants: [],
    searchName:"",
    searchZip:"",
    searchCuisines: "",
    cuisines: ["All Cuisines"]
  });

  useEffect(() => {
    retrieveRestaurants();
    retrieveCuisines();
  }, []);

  const onChangeSearchName = e => {
    console.log('onsearchname');
    setUserRequest({...userRequest, searchName: e.target.value});
  };

  const onChangeSearchZip = e => {
    setUserRequest({...userRequest, searchZip: e.target.value});
  };

  const onChangeSearchCuisine = e => {
    setUserRequest({...userRequest, searchCuisine: e.target.value});
  };

  const retrieveRestaurants = async() => {
    await RestaurantDataService.getAll()
    .then(res => {
      console.log(res.data.restaurants_list);
      setUserRequest({...userRequest, restaurants: res.data.restaurants_list});
    })
    .catch(e => console.error('Error retrieve restaurants, Error: ' + e));
  };

  const retrieveCuisines = async() => {
    await RestaurantDataService.getCuisines()
    .then(res => {
      setUserRequest({...userRequest, cuisines: ["All Cuisines"].concat(res.data)});
    })
    .catch(e => console.error('Error retrieve restaurants, Error: ' + e));
  };

  const refreshList = () => {
    retrieveRestaurants();
  };

  const find = (query, by) => 
  {
    RestaurantDataService.find(query, by)
    .then(res => {
      console.log(res.data)
      setUserRequest({...userRequest, restaurants : res.data.restaurants_list});
    })
    .catch(e => console.error('Error on find() request, Error: ' + e));
  };

  const findByName = () => {
    console.log('findbyname', userRequest.searchName);
    find(userRequest.searchName, "name")
  };

  const findByZip = () => {
    find(userRequest.searchZip, "zipcode")
  };

  const findByCuisine = () => {
    if(userRequest.searchCuisines == "All Cuisines") refreshList();
    else find(userRequest.searchCuisines, "cuisine");
  }

  return (
    <Container>
      <Row className="pb-1">
        <Col>
          <RestaurantQuery placeholder="Search by name" value={userRequest.searchName} 
          onChange={onChangeSearchName} onClick={findByName}/>
        </Col>
        <Col>
          <RestaurantQuery placeholder="Search by zipcode" value={userRequest.searchZip} 
          onChange={onChangeSearchZip} onClick={findByZip}/>
        </Col>
        <Col>
          <Form.Select aria-label="Cuisine selection" onChange={onChangeSearchCuisine}>
            {
              userRequest.cuisines.map((cuisine, index) => {
                return(
                  <option value={cuisine} key={index}>{cuisine.substr(0,20)}</option>
                );
              })
            }
          </Form.Select>
        </Col>
        <Button as="button" onClick={findByCuisine} variant="outline-secondary">
          Search
        </Button>
      </Row>
      <Row>
        {
        userRequest.restaurants.map((restaurant, index) => {
          const address = `${restaurant.address.building} ${restaurant.address.street}, ${restaurant.address.zipcode}`;
          return (
              <RestaurantCard restaurant={restaurant} key={index} address={address} user={props.user}/>
          );
        })
        }
      </Row>
    </Container>
  );

  
}

export default RestaurantList;

// export default class RestaurantList extends Component{
  
//   // const [restaurants, setRestaurants] = useState([]);
//   // const [searchName, setSearchName ] = useState("");
//   // const [searchZip, setSearchZip ] = useState("");
//   // const [searchCuisine, setSearchCuisine ] = useState("");
//   // const [cuisines, setCuisines] = useState(["All Cuisines"]);
//   //only for function components

//   constructor() 
//   {
//     this.state = {
//       restaurants: [],
//       searchName: "",
//       searchZip: "",
//       searchCuisine: "",
//       cuisines: ["All Cuisines"]
//     }

//     this.onChangeSearchName = this.onChangeSearchName.bind(this);
//     this.findByName = this.findByName.bind(this);
//     this.onChangeSearchCuisine = this.onChangeSearchCuisine.bind(this);
//     this.findByCuisine = this.findByCuisine.bind(this);
//     this.onChangeSearchZip = this.onChangeSearchZip.bind(this);
//     this.findByZip = this.findByZip.bind(this);
//   }

//   // useEffect(() => {
//   //   retrieveRestaurants();
//   //   retrieveCuisines();
//   // }, []);

//   //#region Hooks
//   componentDidMount()
//   {
//     this.retrieveRestaurants();
//     this.retrieveCuisines();
//   }

//   componentDidUpdate()
//   {
//     this.retrieveRestaurants();
//     this.retrieveCuisines();
//   }

//   //#endregion

//   //#region Set State
//   onChangeSearchName = e => {
//     this.setState({searchName: e.target.value});
//   };

//   onChangeSearchZip = e => {
//     this.setState({searchZip: e.target.value});
//   };

//   onChangeSearchCuisine = e => {
//     this.setState({searchName: e.target.value});
    
//   };

//   retrieveRestaurants = () => {
//     RestaurantDataService.getAll()
//       .then(response => {
//         console.log(response.data);
//         this.setState({restaurants: response.data.restaurants});
        
//       })
//       .catch(e => {
//         console.log(e);
//       });
//   };

//   retrieveCuisines = () => {
//     RestaurantDataService.getCuisines()
//       .then(response => {
//         console.log(response.data);
//         this.setState({cuisines: ["All Cuisines"].concat(response.data)});
//       })
//       .catch(e => {
//         console.log(e);
//       });
//   };

//   refreshList = () => {
//     this.retrieveRestaurants();
//   };

//   //#endregion 

//   //#region Data Service
//   find = (query, by) => {
//     RestaurantDataService.find(query, by)
//       .then(response => {
//         console.log(response.data);
//         this.setState({restaurants: response.data.restaurants});
//       })
//       .catch(e => {
//         console.log(e);
//       });
//   };


//   findByName = () => {
//     this.find(this.state.searchName, "name")
//   };

//   findByZip = () => {
//     this.find(this.state.searchZip, "zipcode")
//   };

//   findByCuisine = () => {
//     if (this.state.searchCuisine == "All Cuisines") {
//       this.refreshList();
//     } else {
//       this.find(this.state.searchCuisine, "cuisine")
//     }
//   };

//   //#endregion

//   render() {
//     return (
//       <Container>
//         <Restaurn
//       </Container>
  
//     );
//   }
// }

// export default RestaurantList;