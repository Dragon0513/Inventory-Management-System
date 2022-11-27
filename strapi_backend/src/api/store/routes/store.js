"use strict"

/**
 * store router
 */

const { createCoreRouter } = require("@strapi/strapi").factories

module.exports = createCoreRouter("api::store.store")
