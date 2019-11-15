import allSettled from "promise.allsettled";

const PROMISE_OK = "fulfilled";

const plugin = yup => [
  yup.mixed,
  "oneOfSchema",
  function(schemas) {
    // intentionally not a fat arrow for "this" scoping
    return this.test(
      "one-of-schema",
      'None of the items in "${path}" match an allowed schema',
      function(current) {
        const { sync, ...options } = this.options;
        if (sync) {
          return (
            schemas.map(s => s.isValidSync(current, options)).filter(v => !!v)
              .length > 0
          );
        } else {
          return new Promise((res, rej) => {
            allSettled(schemas.map(s => s.isValid(current, options)))
              .then(ps => {
                if (ps.filter(r => r.status === PROMISE_OK).length > 0) {
                  return res(true);
                } else {
                  return res(false);
                }
              })
              .catch(e => rej(e));
          });
        }
      }
    );
  },
];

export default plugin;
