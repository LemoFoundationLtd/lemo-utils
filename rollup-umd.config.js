import replace from 'rollup-plugin-replace'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import {eslint} from 'rollup-plugin-eslint'
import formatter from 'eslint-friendly-formatter'
import babel from 'rollup-plugin-babel'
import {uglify} from 'rollup-plugin-uglify'
import builtins from 'rollup-plugin-node-builtins'
import globals from 'rollup-plugin-node-globals'
import visualizer from 'rollup-plugin-visualizer'
import pkg from './package.json'

function umdConfig(name) {
    return {
        input: 'lib/index.js',
        output: {
            name: 'LemoUtils',
            exports: 'named',
            file: `dist/${name}`,
            format: 'umd',
        },
        plugins: [
            replace({
                'process.browser': 'true',
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
                'process.env.SDK_VERSION': JSON.stringify(pkg.version),
            }),
            // use resolve so Rollup can find external libraries
            // set browser to true so we could load the 'browser' field of libraries' package.json
            // set preferBuiltins to false cause we had rollup-plugin-node-builtins already
            resolve({browser: true, preferBuiltins: true}),
            // use commonjs so Rollup can convert external libraries to an ES module
            commonjs(),
            babel({
                exclude: 'node_modules/**',
            }),
            json(),
            globals({process: false, dirname: false, filename: false}),
            builtins(),
            visualizer({
                filename: 'file_size_visualizer.html',
            }),
        ],
    }
}

const umdVersion = umdConfig('lemo-utils.js')
// eslint should before babel
umdVersion.plugins.unshift(eslint({formatter}))

const umdMinVersion = umdConfig('lemo-utils.min.js')
umdMinVersion.plugins.push(uglify())

export default [
    umdVersion,
    umdMinVersion,
]
