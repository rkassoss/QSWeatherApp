// module.exports = function(grunt) {
    
//     // Project configuration.
//     grunt.initConfig({
//         pkg: grunt.file.readJSON('package.json'),
//         concat: {   
//             dist: {
//                 src: [
//                     'js/libs/*.js', // All JS in the libs folder
//                     'js/global.js'  // This specific file
//                 ],
//                 dest: 'js/build/production.js',
//             }
//         },
//         uglify: {
//             options: {
//                 banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
//             },
//             build: {
//                 src: 'src/<%= pkg.name %>.js',
//                 dest: 'build/<%= pkg.name %>.min.js'
//             }
//         }
//     });

//     // Load the plugin that provides the "uglify" task.
//     grunt.loadNpmTasks('grunt-contrib-watch');
//     grunt.loadNpmTasks('grunt-contrib-uglify');

//     // Default task(s).
//     grunt.registerTask('default', ['uglify']);

// };