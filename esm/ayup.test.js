import test from "ava";
import * as yup from "yup";
import ayup from "./";

test("Allows multiple yup schema", t => {
  const schema = yup.object().shape({
    colors: ayup([yup.string(), yup.array().of(yup.string())]),
  });

  schema.validateSync({ colors: "red" });
  schema.validateSync({
    colors: ["red", "blue"],
  });
  t.pass();
});

test("Properly fails with a schema outside ayup", t => {
  const schema = yup.object().shape({
    colors: ayup([yup.string(), yup.array().of(yup.string())]),
  });
  let caught = false;

  try {
    schema.validateSync({ colors: false });
  } catch (e) {
    caught = true;
    t.pass();
  }

  if (!caught) {
    t.fail("Did not raise an exception");
  }
});
