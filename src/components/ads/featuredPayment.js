import React, { Component } from 'react'


export default class featuredPayment extends Component {

    constructor(props){
        super(props);
        this.state = {
            payment: '',
            stripePromise: '',
        }
    }

    eventChange = (e) => {

        this.setState({
            payment: e.target.value,
        }, () => {
            
            this.props.paymentMethod(this.state.payment);
        });
    }
    
    render() {

        let currency = localStorage.getItem('currency');

        let amount = sessionStorage.getItem('newAmount');
        return (
            
            <>
                <div className="form-group">
                    <h6>Payment Type</h6>
                    <label>Pay <span style={{color:'green', fontWeight:'bold', fontSize:'20px'}}>{currency} {amount}</span> for your featured Ad</label>
                    <div class="custom-control custom-radio mb-3">
                        <input type="radio" onChange={(e) => this.eventChange(e)} name="payment" value="account" class="custom-control-input" id="Account"/>
                        <label class="custom-control-label font-weight-normal" for="Account">Direct Payment</label>
                    </div>
                    <div class="custom-control custom-radio mb-3">
                        <input type="radio" onChange={(e) => this.eventChange(e)} name="payment" value="stripe" class="custom-control-input" id="Stripe"/>
                        <label class="custom-control-label font-weight-normal" for="Stripe">Payment To Account</label>
                    </div>
                </div>
               
            </>
        )
    }
}
