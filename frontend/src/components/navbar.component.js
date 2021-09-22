import React, {Component} from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component
{
    render() 
    {
        console.log(this.props);
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <div className="container-fluid">
                <Link to="/" className="navbar-brand">Restaurant Reviews</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" 
                data-bs-target="#navbarNav" aria-controls="navbarNav" 
                aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/restaurants" className="nav-link">Restaurants</Link>
                        </li>
                        <li className="navbar-item">
                            {
                                this.props.user?
                                (
                                <a onClick={this.props.logout} className="nav-link" style={{cursor:'pointer'}}>
                                    {this.props.user.name} Logout
                                    </a>)
                                :
                                (<Link to="/login" className="nav-link">Login</Link>)
                            }
                        </li>
                    </ul>
                </div>
                </div>
            </nav>
        );
    }
}