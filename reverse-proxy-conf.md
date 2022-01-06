server {
        listen *:443 ssl;
        server_name search.damned-i-am-lost.com;
        location / {
                proxy_pass http://localhost:3000/;
                proxy_http_version                 1.1;
                proxy_cache_bypass                 $http_upgrade;

                # Proxy headers
                proxy_set_header Upgrade           $http_upgrade;
                proxy_set_header Connection        "upgrade";
                proxy_set_header Host              $host;
                proxy_set_header X-Real-IP         $remote_addr;
                proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto $scheme;
                proxy_set_header X-Forwarded-Host  $host;
                proxy_set_header X-Forwarded-Port  $server_port;

                 # Proxy timeouts
                proxy_connect_timeout              60s;
                proxy_send_timeout                 60s;
                proxy_read_timeout                 60s;
        }
        ssl_certificate /etc/ssl/cert.pem;
        ssl_certificate_key /etc/ssl/key.pem;

}
server {
    if ($host = damned-i-am-lost.com) {
        return 301 https://$host$request_uri;
    }


  listen 80;
  server_name damned-i-am-lost.com;
    return 404;


}