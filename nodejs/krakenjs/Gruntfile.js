'use strict';

module.exports = function(grunt) {


  	grunt.initConfig({
      clean: {
    		ngclean:{
    			src:['.build']
    		}
      },
  		shell: {
  			ngbuild: {
  				command: 'cd ng2 && ng build --prod  && cd ..'
  			}
  		}
      // copy : {
      //     ngcopy : {
      //       cwd: 'ng2/dist',
      //       src: ['**'],
      //       dest: '.build/',
      //       expand: true
      //     }
      // }
  	});

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // grunt.registerTask('build', ['clean:ngclean', 'shell:ngbuild', 'copy:ngcopy']);
    grunt.registerTask('build', ['clean:ngclean', 'shell:ngbuild']);

};
