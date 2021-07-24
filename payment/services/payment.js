'use strict';
const fetch = require("node-fetch");
const btoa = require("btoa");

/**
 * payment.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

module.exports = {

    findSk:  async ( id) => {
        const result = await strapi
        .query("payment", "payment")
        .model.query((qb) => {
          qb.where("store_id", id);
        })
        .fetch();
      const fields = result.toJSON();
      const sk = fields.secret_key;
    
        return sk ;
          },

  paymentIntent:  async ( sk , amount , store_name , description) => {
    const url = "https://api.paymongo.com/v1/payment_intents";
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(sk)}`,
      },
      body: JSON.stringify({
        data: {
          attributes: {
            amount: parseInt(amount),
            payment_method_allowed: ["card"],
            payment_method_options: { card: { request_three_d_secure: "any" } },
            currency: "PHP",
  
            description: store_name,
            statement_descriptor: description,
          },
        },
      }),
    };
    const response = await  fetch(url, options);
    const result = await response.json();

    return result ;
      },
};
