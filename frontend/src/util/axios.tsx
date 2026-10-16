import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_STRAPI_API + "/api" // Base URL of strapi API for AJAX requests

// Adding the bearer token (aka authentication) needed for each AJAX request, you just set it and forget it.
axios.defaults.headers.common = {'Authorization': `Bearer ` + import.meta.env.VITE_BEARER}

export default axios