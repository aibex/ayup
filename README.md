# ayup

a(ny)yup. Try yup schemas until one works. **synchronous only**

**Add via Yarn**
`yarn add @aibex/ayup`

**or via npm**
`npm install @aibex/ayup`

(and optionally `yup`, as it's a peer dependency)

```js
import yup from "yup";
import ayup from "@aibex/ayup";

const schema = yup.object().shape({
  colors: ayup([yup.string(), yup.array().of(yup.string())]),
});

schema.validateSync({ colors: "red" }); // pass
schema.validateSync({ colors: ["red", "blue"] }); // pass
schema.validateSync({ colors: false }); // fail
```

# ayup()

_provide a list of schemas that will be checked synchronously until one passes yup. Rejects/throws if none pass_

`ayup(list)`

| param | type            | description                                                      |
| :---- | :-------------- | :--------------------------------------------------------------- |
| list  | `array<Schema>` | a list of all schema objects that are allowed for this yup value |

# Tests

Test are written using `ava`. You can run the test suite using `yarn test`.

# Releasing

While we use yarn for everything internally, `release-it` works more consistently with `npm run-script release`. This is because of how npm/yarn manage their logins.
