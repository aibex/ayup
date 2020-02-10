// takes our release rules from the czrc file
const fs = require("fs");
const path = require("path");

const cz = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "./.czrc")).toString()
);

const releaseRules = Object.keys(cz["emoji-cz"].types).map(type => {
  return {
    type,
    release: cz["emoji-cz"].types[type].release || false,
  };
});

module.exports = {
  ci: false,
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "conventionalcommits",
        parserOpts: {
          headerPattern: /^[^a-zA-Z0-9]*(\w*)(?:\((.*)\))?!?: (.*)$/u,
        },
        releaseRules,
      },
    ],
    "@semantic-release/github",
    "@semantic-release/npm",
    "@semantic-release/release-notes-generator",
  ],
};
