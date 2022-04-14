Provider Template JS
====================

This is a template project for building a project provider in JavaScript. It uses TypeScript and Koa as the foundation.

It's preconfigured with logging (via Winston), Authentication, and Persistence (via redis).


Authentication Credentials
--------------------------

Authentication credentials are stored in redis as a hash with a prefix of `credentials:`.

Key: `credentials:${public_credential}`
Type: _hash_
Properties:
* `private` -- The private credential
* `enabled` -- Determines if the credential is enabled or not.

The public credential is available on the koa context as `credential`
