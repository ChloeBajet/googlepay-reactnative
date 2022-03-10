import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {GooglePay} from 'react-native-google-pay';

export default function App() {
  async function Pay() {
    const allowedCardNetworks = ['VISA', 'MASTERCARD', 'AMEX', 'DISCOVER'];
    const allowedCardAuthMethods = ['PAN_ONLY', 'CRYPTOGRAM_3DS'];
    const transaction = {
        totalPrice: '0',
        totalPriceStatus: 'FINAL',
        currencyCode: 'USD',
    }
    const requestData = {
      cardPaymentMethod: {
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          gateway: 'firstdata',
          gatewayMerchantId: '6848414594114431000',
        },
        allowedCardNetworks,
        allowedCardAuthMethods,
       
      },
      transaction,
      merchantName: '',
    };
    // Set the environment before the payment request
    GooglePay.setEnvironment(GooglePay.ENVIRONMENT_TEST);
    // Check if Google Pay is available
    GooglePay.isReadyToPay(allowedCardNetworks, allowedCardAuthMethods).then(
      ready => {
        if (ready) {
          // Request payment token
          GooglePay.requestPayment(requestData)
            .then((token) => {
              // Send a token to your payment gateway
              console.log(JSON.stringify(token))
              alert(JSON.stringify(token))
            })
            .catch(error => console.log(error.code, error.message));
        }
      },
    );
  }

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
     <TouchableOpacity onPress={Pay}>
      <Text>Pay with google-pay</Text>
      </TouchableOpacity>
    </View>
  );
}