'use strict';

/**
 * contact-me service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::contact-me.contact-me');
