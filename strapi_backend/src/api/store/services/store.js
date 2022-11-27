"use strict"

/**
 * store service
 */

const { createCoreService } = require("@strapi/strapi").factories

module.exports = createCoreService("api::store.store")
