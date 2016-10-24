module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "parserOptions": {
        "sourceType": "module"
    },
    "extends": "eslint:recommended",
    "rules": {
        "no-console": ["error", { "allow": ["warn", "error"] }],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "comma-dangle": [
            "warn",
            "always-multiline",
        ],
        "indent": [
            "error",
            4,
            {
                "SwitchCase": 1
            }
        ]
    },
    "globals": {
        "chrome": true,
    }
};
