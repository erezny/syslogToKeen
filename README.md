# syslogToKeen

Listens on port 1513, parses all syslog messages, and sends batches of 30 to Keen.IO

## Tech

dgram - nodejs UDP server

glossy - js syslog parser
https://github.com/squeeks/glossy

keen-js - Keen.io Javascript client
https://github.com/keen/keen-js

## Remarks

Will drop 0-29 messages if node quits. 
