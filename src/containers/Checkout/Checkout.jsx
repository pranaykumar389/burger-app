import React, { Component } from 'react';
import { connect } from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
class Checkout extends Component {

    checkoutCancel = () => {
        this.props.history.goBack();
    };

    checkoutContinue = () => {
        this.props.history.replace('/checkout/contact-data');
    };

    render() {
        let summary = <Redirect to='/' />;
        if (this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to='/' /> : null;
            summary = (
                <React.Fragment>
                    {purchasedRedirect}
                    <CheckoutSummary 
                        ingredients={this.props.ings}
                        onCheckoutCancel={this.checkoutCancel}
                        onCheckoutContinue={this.checkoutContinue}
                    />
                    <Route 
                        path={this.props.match.path +'/contact-data'} 
                        component={ContactData}
                    />
                </React.Fragment>
            );
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
};


export default connect(mapStateToProps)(Checkout);