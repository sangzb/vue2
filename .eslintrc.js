module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "globals": {
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "vue": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "vue",
        "html"
    ],
    "rules": {
        "indent": [
            2,
            2,
            { "SwitchCase": 1 }
        ],
        "linebreak-style": [
            2,
            "unix"
        ],
        "quotes": [
            0,
            "single",
            "avoid-escape"
        ],
        "semi": [
            2,
            "always"
        ],
        "no-unused-vars": [
          0,
          { "vars": "local", "args": "after-used" }
        ],
        "no-console": [
          0
        ]
    }
};
