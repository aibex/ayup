# ayup

a(ny)yup. Useful Yup helpers and functions. Synchronous and Async.

[![CircleCI](https://circleci.com/gh/aibexhq/ayup/tree/master.svg?style=shield)](https://circleci.com/gh/aibexhq/ayup/tree/master)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=aibexhq/ayup)](https://dependabot.com)

**Add via Yarn**
`yarn add @aibex/ayup`

**or via npm**
`npm install @aibex/ayup`

`ayup` is designed to be a simple way to do hard things in yup. Yup's lightweight, asynchronous, and generally a better choice for simple validation. _But_ some edges are _rough_. And if you're here, you're probably rubbing against one of those right now.

For every method, both synchronous and asynchronous support is available. By default, every plugin is ready to be added to yup via `yup.addMethod`. However, if polluting the global yup object isn't your thing, there's an `augment` method that favors yup's "template schema" approach. Examples are provided for both routes.

## augment

Create a template object, containing non-global versions of one or more ayup plugins. Augment walks through the list of supplied plugins, associates them with the plugin's yup `type`, and returns an object literal containing your schema-ready yup objects.

```js
import * as yup from "yup";
import { augment, oneOfSchema } from "@aibex/ayup";

const myTemplateSchemas = augment(oneOfSchema(yup), anotherSchema(yup));

const mySchema = yup.object().shape({
  myKey: myTemplateSchemas.oneOfSchema([
    /*schemas*/
  ]),
});
```

## oneOfSchema

Passes validation if at least one schema in the array is valid.

```js
import * as yup from "yup";
import { oneOfSchema } from "@aibex/ayup";

// globally add to yup
yup.addMethod(...oneOfSchema(yup));
yup.addMethod.apply(yup, oneOfSchema(yup)); // non-spread operator

const mySchema = yup.object().shape({
  myKey: yup.mixed().oneOfSchema([
    /*schemas*/
  ]),
});
```

```js
import * as yup from "yup";
import { augment, oneOfSchema } from "@aibex/ayup";

const schemas = augment(oneOfSchema(yup));

const mySchema = yup.object().shape({
  myKey: schemas.oneOfSchema([
    /*schemas*/
  ]),
});
```

# Tests

Test are written using `ava`. You can run the test suite using `npm run test`.

# Releasing

`npm run release` is your friend. Once we're consistent and stable in github, we'll set up automated channels for releasing.
