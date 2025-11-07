#!/bin/sh

# Use PORT environment variable or default to 80
PORT=${PORT:-80}

# Generate nginx config with dynamic port
cat > /etc/nginx/conf.d/default.conf <<EOF
server {
    listen ${PORT};
    server_name _;
    root /usr/share/nginx/html;
    index index.html;
    
    location / {
        try_files \$uri \$uri/ /index.html;
    }
}
EOF

# Start nginx
exec nginx -g 'daemon off;'

