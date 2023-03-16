import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class NavLinks extends Component {
    

    render() {

        let linkState = this.props.linkState;

        return (
            <div className="my-profile-tab-frame">
                <div className="row">
                    <div className="col-xl-6 col-lg-7 col-md-8 mx-auto">
                        <nav className="nav nav-pills nav-fill my-profile-tab-nav">
                            {linkState === 'myprofile' ? <Link className="nav-link active" to="/myprofile">My Profile</Link> : <Link className="nav-link" to="/myprofile">My Profile</Link> }
                            {linkState === 'myads' ? <Link className="nav-link active"to="/myads">My Ads</Link> : <Link className="nav-link"to="/myads">My Ads</Link>}
                            {linkState === 'myfavourite' ? <Link className="nav-link active" to="/myfavourite">My Favourites</Link> : <Link className="nav-link" to="/myfavourite">My Favourites</Link>}
                            {linkState === 'mytransactions' ? <Link className="nav-link active" to="/mytransactions">My Transactions</Link> : <Link className="nav-link" to="/mytransactions">My Transactions</Link>}
                        </nav>
                    </div>
                </div>
            </div>
        )
    }
}
