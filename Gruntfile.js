module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			dist: {
				files: {
					'src/assets/css/main.css' : 'src/sass/main.scss'
				}
			}
		},
		cssmin: {
		  target: {
		    files: {
		      'src/assets/css/main.min.css': ['src/assets/css/main.css']
		    }
		  }
		},
		copy: {
		  main: {
		    src:  ['src/assets/css/main.min.css', 'src/assets/js/main.min.js', 'src/assets/img/**/*', 'src/modules/**/*', 'src/*.html'],
		    dest: 'build/',
		  },
		},
		concat: {
		    options: {
		      separator: ';',
		    },
		    dist: {
		      src: ['src/assets/js/modules/**/*.js', 'src/assets/js/vendor/**/*.js'],
		      dest: 'src/assets/js/main.js',
		    },
		 },
		uglify: {
			my_target: {
		    	files: {
		    		'src/assets/js/main.min.js': ['src/assets/js/main.js']
		      	}
			}
		},
		watch: {
			css: {
				files: 'src/sass/**/*.scss',
				tasks: ['sass']
			},
			html: {
				files: ['**/*.html', '**/*.php']
			},
			concat: {
				files: ['src/assets/js/modules/**/*.js', 'src/assets/js/vendor/**/*.js'],
				tasks: ['concat']
			 },
			 options: {
			    livereload: true,
    		}
		}
	});


	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default',['watch']);
	grunt.registerTask('build',['cssmin','concat', 'uglify', 'copy']);
}