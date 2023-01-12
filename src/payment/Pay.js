import React from "react";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
const Pay = () => {
    const initialOptions = {
        "client-id":
            "AQVdNJ2adELwM1B1LTHKG8rcc-MKrGUU9g4SLcy3SYuAyYukSyCU7BFEZz7ix0nIaFksX0AeZrWkR8-h",
        currency: "USD",
        intent: "capture",
    };
    return (
        <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                description: "Oki for looking good",
                                amount: {
                                    value: "0.1",
                                },
                            },
                        ],
                    });
                }}
                onApprove={async (data, actions) => {
                    const order = await actions.order.capture();
                    console.log(order);
                    alert("Thank you for your purchasing.");
                }}
                onCancel={() => {
                    alert("You canceled.");
                }}
                onError={() => {
                    alert("Paypal checkout on error.");
                }}
            />
        </PayPalScriptProvider>
    );
};

export default Pay;
