#!/bin/sh

echo "Generating runtime environment..."

# Make sure the directory exists
mkdir -p /usr/share/nginx/html/assets/env

# Write the runtime env JS file
cat <<EOF > /usr/share/nginx/html/assets/env/runtime-env.js
(function (window) {
  window.__env = {
    BACK_END_SERVER_URL: "${BACK_END_SERVER_URL}",
    LOCATIONV1_API_URL: "${LOCATIONV1_API_URL}"
  };
})(this);
EOF

echo "Starting Nginx..."
exec nginx -g 'daemon off;'