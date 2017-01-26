# Redis-info-json

A very simple script with Docker container to parse the output of `redis-cli` to readable json which can then be continued to be processed by another script.

At [Magnet.me](https://magnet.me) we use it to monitor our redis cluster and feed the JSON data into other monitoring systems.

You can run it like `redis-cli info | docker run -i --rm magnetme/redis-info-json`

If you prefer your JSON to be pretty printed, set the environment variable PRETTY_PRINT to `true`.
