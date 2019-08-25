import replace from 'rollup-plugin-replace'
import babel from 'rollup-plugin-babel'
import pkg from './package.json'

export default [
    {
        input: 'lib/index.js',
        external: ['bignumber.js', 'safe-buffer', 'elliptic', 'keccak', 'base-x'],
        output: [
            // set exports to named cause we need export multiple properties in index.js
            {file: pkg.main, format: 'cjs', exports: 'named'}, // CommonJS (for Node) build
            {file: pkg.module, format: 'esm'}, // ES module (for Rollup and webpack) build
        ],
        plugins: [
            replace({
                'process.env.SDK_VERSION': JSON.stringify(pkg.version),
            }),
            babel({
                exclude: 'node_modules/**',
            }),
        ],
    },
]
