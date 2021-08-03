import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class NavLinks extends Component {
    constructor(props){
        super(props);

    }

    render() {

        let linkState = this.props.linkState;

        return (
            <div className="my-profile-tab-frame">
                <div className="row">
                    <div className="col-xl-6 col-lg-7 col-md-8 mx-auto">
                        <nav className="nav nav-pills nav-fill my-profile-tab-nav">
                            <a className="nav-link" href="my-profile.html">My Profile</a>
                            {linkState == 'myads' ? <Link className="nav-link active"to="/myads">My Ads</Link> : <Link className="nav-link"to="/myads">My Ads</Link>}
                            {linkState == 'myfavourite' ? <Link className="nav-link active" to="/myfavourite">My Favorites</Link> : <Link className="nav-link" to="/myfavourite">My Favorites</Link>}
                        </nav>
                    </div>
                </div>
            </div>
        )
    }
}
