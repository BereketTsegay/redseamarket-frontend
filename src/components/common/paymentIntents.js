import Stripe from 'stripe';

const secret_key = 'sk_test_51HqJ58APs1IO5yfE3dtoHFXSEfscNwttjD3MFe4Qcu3ir2NhLbrr7HhMhUcYs1NhkVb91LZI9ecYsurUfcslXBDp00NYFzKvjF'
const stripe = new Stripe(secret_key);

export default async (req, res) => {
    
    if(req.method === 'POST'){

        try{
            const {amount} = req.body;

            const paymentIntent = await stripe.paymentIntents.create({
                amount,
                currency: 'usd',
            });

            res.status(200).send(paymentIntent.client_secret);
        }
        catch (error){
            res.status(500).json({statusCode: 500, message: error.message});
        }
    }
    else{
        // res.setHeader("Allow", "POST");
        // res.status(405).end("Method Not Allowed");
    }
}