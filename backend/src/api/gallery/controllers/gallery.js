'use strict';

/**
 * gallery controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::gallery.gallery', ({ strapi }) => ({
    async findOne(ctx) {
        const {data} = await super.findOne(ctx);
        if (data.Medias) {
            const medias = []
            
            data.Medias.forEach(media => {
                    const mediaStruct = { 
                        original:"http://localhost:8080" + media.formats.medium.url,
                        thumbnail:"http://localhost:8080" + media.formats.thumbnail.url,
                        originalHeight: media.formats.medium.height,
                        originalWidth: media.formats.medium.width
                     };
                    medias.push(mediaStruct)
                });
                data.Medias = medias;
            }
        return data
    }
}));


