import * as yup from "yup";

const ayup = tries => {
  return yup.mixed().when(".", current => {
    for (const t of tries) {
      try {
        t.validateSync(current, {
          strict: true,
        });
        return t;
      } catch (e) {} // discard
    }

    return yup
      .mixed()
      .test(
        "ayup-failure",
        "No alternatives for ayup were successful",
        v => false
      );
  });
};

export default ayup;
