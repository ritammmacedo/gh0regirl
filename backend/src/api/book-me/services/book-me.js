'use strict';

/**
 * book-me service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::book-me.book-me');
