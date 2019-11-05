import test from "ava";
import * as yup from "yup";
import oneOfSchema from "../one-of-schema";
import augment from "./";

test("augment runs as expected", t => {
  const tmpl = augment(oneOfSchema(yup));

  const schema = yup.object().shape({
    colors: tmpl.oneOfSchema([yup.string(), yup.array().of(yup.string())]),
  });

  schema.validateSync({ colors: "red" });
  schema.validateSync({
    colors: ["red", "blue"],
  });
  t.pass();
});
