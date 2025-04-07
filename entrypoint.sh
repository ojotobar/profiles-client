#!/bin/sh

# Write the config.js file dynamically with environment variable
cat <<EOF > /usr/share/nginx/html/assets/config.js
window['env'] = {
  backendUrl: "${BACKEND_URL}",
  locationApiBaseUrl: "${LOCATION_URL}"
};
EOF

# Start NGINX
nginx -g 'daemon off;'