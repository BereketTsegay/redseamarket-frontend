const STRIPE_PUBLISHABLE = process.env.NODE_ENV === 'production'
  ? 'pk_live_MY_PUBLISHABLE_KEY'
  : 'pk_test_51HqJ58APs1IO5yfEfBSAuoe8rzKF7WM0FGXRU9mz8COOALGdACLE3zTodNT2OJnXlrgJl7nyFrxSdXILI8izGRsn00lMnBCHSK';

export default STRIPE_PUBLISHABLE;