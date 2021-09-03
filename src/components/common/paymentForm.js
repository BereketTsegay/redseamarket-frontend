import React, { Component } from 'react'
import {CardElement, ElementsConsumer} from '@stripe/react-stripe-js';
import Stripe from 'stripe';

export class PaymentForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            name: '',
            email: '',
            phone: '',
        }
    }

    handleSubmit = async (event) => {
        // Block native form submission.
        // event.preventDefault();
    
        const {stripe, elements} = this.props;
    
        if (!stripe || !elements) {
          // Stripe.js has not loaded yet. Make sure to disable
          // form submission until Stripe.js has loaded.
          return;
        }
        console.log(elements);
        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.

        const cardElement = elements.getElement(CardElement);
    
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
            // billing_details: {
            //     name: this.state.name,
            //     email: this.state.email,
            //     phone: this.state.phone,
            // }
        });
    
        if (error) {

          console.log('[error]', error);

        }
        else {

            console.log('[PaymentMethod]', paymentMethod);

            const secret_key = 'sk_test_51HqJ58APs1IO5yfE3dtoHFXSEfscNwttjD3MFe4Qcu3ir2NhLbrr7HhMhUcYs1NhkVb91LZI9ecYsurUfcslXBDp00NYFzKvjF'
            const strips = new Stripe(secret_key);

            const {amount} = 100 * 100;

            const paymentIntent = await strips.paymentIntents.create({
                amount: amount,
                currency: 'usd',
            });
        }
    };

    handleChange = (e) => {
        
        this.setState({
            [e.target.name]: e.target.value,
        });
    }
    
    
    render() {
        const {stripe} = this.props;

        let {name, email, phone} = this.state;

        return (
            <form onSubmit={this.handleSubmit}>

                <h4>Payment details</h4>
                <hr />
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" name='name' value={name} onChange={(e) => this.handleChange(e)} className="form-control" placeholder="Name" />
                    {/* {error.length > 0 ? <p className="help-block help-block-error"  style={ErrorStyle}>{error}</p> : '' } */}
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name='email' value={email} onChange={(e) => this.handleChange(e)} className="form-control" placeholder="Email" />
                    {/* {error.length > 0 ? <p className="help-block help-block-error"  style={ErrorStyle}>{error}</p> : '' } */}
                </div>
                <div className="form-group">
                    <label>Phone</label>
                    <input type="number" name='phone' value={phone} onChange={(e) => this.handleChange(e)} className="form-control" placeholder="Phone" />
                    {/* {error.length > 0 ? <p className="help-block help-block-error"  style={ErrorStyle}>{error}</p> : '' } */}
                </div>
                <CardElement

                onChange={this.handleSubmit}
                options={{
                    style: {
                    base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                        color: '#aab7c4',
                        },
                    },
                    invalid: {
                        color: '#9e2146',
                    },
                    },
                    hidePostalCode: true,
                }}
                />
            </form>
        );
    }
    
}



const InjectedCheckoutForm = () => {
    return (
      <ElementsConsumer>
        {({elements, stripe}) => (
            <PaymentForm elements={elements} stripe={stripe} />
        )}
      </ElementsConsumer>
    );
  };

  export default InjectedCheckoutForm;
