"use strict"

/**
 * sale service
 */

const { createCoreService } = require("@strapi/strapi").factories

module.exports = createCoreService("api::sale.sale")
