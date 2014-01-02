{print} = require 'util'
{exec}  = require 'child_process'

appname     = "spectrum"
release     = "0.1"

src_path    = "./src"
lib_path    = "./lib/"
js_path     = "#{lib_path}"
bndl_path   = "#{lib_path}/#{appname}-#{release}.js"
min_path    = "#{lib_path}/#{appname}-#{release}.min.js"
nm_path     = "/usr/local/lib/node_modules"
bin_path    = "#{nm_path}"

run = (command, callback) ->
    proc = exec command
    proc.stdout.on 'data', (data) -> print data.toString()
    proc.stderr.on 'data', (data) -> print data.toString()
    proc.on 'exit', (status) -> callback?() if status is 0

# ----------------------------------
# Commands
# ----------------------------------

compile = (watch, callback) ->
    # creates /lib_path/js
    run "coffee -co #{js_path} #{src_path}", callback

watchJS = (callback) ->
    # recompiles /src_path to individual JavaScript files in /lib_path/js
    run "coffee -wco #{js_path} #{src_path}", callback

watchBundle = (callback) ->
    # recompiles and joins /src_path to /lib_path
    run "coffee -j #{bndl_path} -wco #{lib_path} #{src_path}", callback

bundle = (callback) ->
    # creates /lib_path/ProjectName-bundle.js
    run "coffee -j #{bndl_path} -co #{lib_path} #{src_path}", callback

minify = (callback) ->
    # creates /lib_path/ProjectName-bundle.min.js
    run "#{bin_path}/uglifyjs  -o #{min_path} #{bndl_path}", callback

test = (callback) ->
    # use ./test/mocha.opts for options
    run "#{bin_path}/mocha", callback

docs = (callback) ->
    run "#{bin_path}/docco #{src_path}/*.coffee"


# ----------------------------------
# Tasks
# ----------------------------------

task 'compile', 'Compile CoffeeScript source files', ->
    compile()

task 'bundle', "Creates /lib_path/appname-bundle.js & /lib_path/js/*.js", ->
    bundle(compile)

task 'build', "Creates /lib_path/appname-bundle.js & /lib_path/appname-bundle.min.js", ->
    bundle(minify)

task 'watch:js', "Recompile CoffeeScript source files when modified to individual .js files", ->
    watchJS()

task 'watch:bundle', "Recompile CoffeeScript source files when modified to appname-bundle.js", ->
    watchBundle()

task 'test', "Run tests", ->
    bundle(test)

task 'docs', 'Generate annotated source code with Docco', ->
  docs()
