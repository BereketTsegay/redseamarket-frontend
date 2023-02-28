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

        let amount = localStorage.getItem('newAmount');
        return (
            
            <>
                <div className="form-group">
                    <h6>Payment Type</h6>
                    <label>Pay <span style={{color:'green', fontWeight:'bold', fontSize:'20px'}}>USD {Math.round(amount)}</span> for your featured Ad</label>
                    <div class="custom-control custom-radio mb-3">
                        <input type="radio" onChange={(e) => this.eventChange(e)} name="payment" value="account" class="custom-control-input" id="Account"/>
                        <label class="custom-control-label font-weight-normal" for="Account">Direct Payment <sapn style={{color:'#5c5e5f'}}>(Payment directly from your account)</sapn></label>
                        <div className="mb-4 row text-danger container"><b className="col-md-2">Warning: </b> <span className="col-md-10">The Ad is approve only after submitting the proper payment documents</span></div>
                    </div>
                    <div class="custom-control custom-radio mb-3">
                        <input type="radio" onChange={(e) => this.eventChange(e)} name="payment" value="stripe" class="custom-control-input" id="Stripe"/>
                        <label class="custom-control-label font-weight-normal" for="Stripe">Payment To Account <sapn style={{color:'#5c5e5f'}}>(Payment using Payment Gateway)</sapn></label>
                    </div>
                </div>
               
            </>
        )
    }
}
