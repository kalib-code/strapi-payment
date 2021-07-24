"use strict";

/**
 * payment.js controller
 *
 * @description: A set of functions called "actions" of the `payment` plugin.
 */

module.exports = {
  /**
   * Default action.
   *
   * @return {Object}
   */

  async findOne(ctx) {
    const { id } = ctx.params;
    const { amount, store_name, description } = ctx.request.body;
    const findKeySecret = await strapi.plugins[
      "payment"
    ].services.payment.findSk(id);
    const payment = await strapi.plugins[
      "payment"
    ].services.payment.paymentIntent(
      findKeySecret,
      amount,
      store_name,
      description
    );

    ctx.send({ payment });
  },
  index: async (ctx) => {
    ctx.send({
      message: "ok",
    });
  },
};
