module.exports = {
    async afterCreate(event) {    // Connected to "Save" button in admin panel
        const { result } = event;
        console.log(result);
    try {
        await strapi
        .plugin("email-designer-5")
        .service("email")
        .sendTemplatedEmail(
          {
            // required
            // This can also be an array of email addresses
            to: result.Email,
            // bcc: result.createdBy.email,
            // optional array of files
            attachments: [],
          },
          {
            // required - Ref ID defined in the template designer (won't change on import)
            templateReferenceId: 1,
            // If provided here will override the template's subject.
            // Can include variables like `Thank you for your order {{= USER.firstName }}!`
            // subject: `Thank you for your order`,
          },
          {
            // this object must include all variables you're using in your email template
            NAME: result.Name,
            EMAIL: result.Email,
            LOCATION: result.Location,
            SERVICE: result.Type,
            AVAILABILITY: result.Availability,
            MESSAGE: result.Message,
          }
        );
      strapi.log.info("Book me auto-reply email sent");
    } catch (error) {
      strapi.log.error(error);
    }
  }
}