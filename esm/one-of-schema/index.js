const PROMISE_OK = "fulfilled";

const plugin = yup => [
  yup.mixed,
  "oneOfSchema",
  function(schemas) {
    // intentionally not a fat arrow for "this" scoping
    return this.test(
      "one-of-schema",
      "None of the items in ${path} match an allowed schema",
      function(current) {
        const { sync, ...options } = this.options;
        if (sync) {
          return (
            schemas.map(s => s.isValidSync(current, options)).filter(v => !!v)
              .length > 0
          );
        } else {
          return Promise.allSettled(
            schemas.map(s => s.isValid(current, options))
          ).then(results => {
            if (results.filter(r => r.status === PROMISE_OK).length > 0) {
              return Promise.resolve();
            } else {
              return Promise.reject();
            }
          });
        }
      }
    );
  },
];

export default plugin;
