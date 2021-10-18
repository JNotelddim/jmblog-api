# JM Blog API

This is the [NestJS](https://github.com/nestjs/nest) code for the API which
runs behind the JM Blog app.

### Current State

I'm totally aware that this codebase is not in a very perfect state, and that
I didn't follow perfect protocols for building a REST api. I was more interested
in getting something built than having it be perfect. I hope to come back and
clean it up eventually.. but for now, it works. And I've kept a detailed
git commit history, so when I need to come back I'll be able to reference the
context for my choices.

### Deployment

I've currently got this deployed with Heroku for the running jm blog.

If you'd like to get a local version of this API running, you'll have to
set up the appropriate db connection environment variables (see
src/database/database.providers.ts)

If you need a hand with that, please let me know. :)


