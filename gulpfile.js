import gulp from 'gulp';
import * as sass from 'sass'; // Using the correct import syntax
import imagemin from 'gulp-imagemin';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';
import obfuscate from 'gulp-obfuscate'; // Import obfuscate

// Function to optimize images
function optimizeImages() {
  return gulp.src('./source/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./build/images'))
    .on('data', (file) => console.log(`Imagem processada: ${file.relative}`)); // Log processed images
}

// Function to compress JavaScript
function comprimeJavaScript() {
  return gulp.src('./source/scripts/*.js')
    .pipe(uglify())
    .pipe(obfuscate())
    .pipe(gulp.dest('./build/scripts'));
}

// Function to compile Sass
function compilaSass() {
  return gulp.src('./source/styles/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./build/styles/'));
}

// Export tasks as named exports
export const sassTask = compilaSass;
export const javascript = comprimeJavaScript;
export const images = optimizeImages;

// Default task (assuming you want to watch for image changes)
export default async function() {
  await gulp.watch('./source/styles/*.scss', { ignoreInitial: false }, compilaSass);
  await gulp.watch('./source/scripts/*.js', { ignoreInitial: false }, comprimeJavaScript);
  await gulp.watch('/source/images/*', { ignoreInitial: false }, optimizeImages);
}