import test from "ava";
import * as yup from "yup";
import oneOfSchema from "./";

yup.addMethod(...oneOfSchema(yup));

test("Plugin runs as expected", t => {
  const schema = yup.object().shape({
    colors: yup
      .mixed()
      .oneOfSchema([yup.string(), yup.array().of(yup.string())]),
  });

  schema.validateSync({ colors: "red" });
  schema.validateSync({
    colors: ["red", "blue"],
  });
  t.pass();
});

test("Plugin runs with promises", async t => {
  const schema = yup.object().shape({
    colors: yup
      .mixed()
      .oneOfSchema([yup.string(), yup.array().of(yup.string())]),
  });

  await schema.validate({ colors: "red" });
  t.pass();
});
