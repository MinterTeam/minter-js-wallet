import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import babel from 'rollup-plugin-babel';

//@TODO remove github:xg-wang/elliptic#8a6bb93d751559db43036a2670825af215d0aa43 deps
//@TODO when it will be fixed: https://github.com/rollup/rollup-plugin-commonjs/issues/278
//@TODO or when it will be merged: https://github.com/indutny/elliptic/pull/157

export default {
    input: 'src/index.js',
    plugins: [
        json(),
        resolve({
            browser: true,
        }),
        commonjs({
            namedExports: {
                'node_modules/ethereumjs-util/dist/index.js': [ 'stripHexPrefix', 'padToEven' ],
                //@TODO `browser` field is used instead of `module`, can be fixed after merge https://github.com/rollup/rollup-plugin-node-resolve/pull/182
                'node_modules/minterjs-util/dist/index.js': [ 'publicToString '],
            },
        }),
        // globals(),
        // builtins(),
        babel({
            babelrc: false,
            presets: [['@babel/preset-env', { modules: false }]],
        }),
    ],
    output: {
        file: 'dist/index.js',
        format: 'umd',
        name: 'minterJsTx',
    },
};
