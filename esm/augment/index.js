const augment = (...plugins) => {
  const res = {};
  for (const plugin of plugins) {
    const [type, key, fn] = plugin;
    res[key] = (...args) => fn.call(type(), ...args);
  }
  return res;
};

export default augment;
