module.exports = {
    resolve:{
        fallback: { "util": require.resolve('util/')},
        fallback: { "path": require.resolve("path-browserify") },
    },
};