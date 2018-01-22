# This file is particularly useful while developing Spectrum

{print} = require 'util'
{exec}  = require 'child_process'

run = (command, callback) ->
  proc = exec command
  proc.stdout.on 'data', (data) -> print data.toString()
  proc.stderr.on 'data', (data) -> print data.toString()
  proc.on 'exit', (status) -> callback?() if status is 0

watch = (callback) ->
  console.log "Watching for changes to Coffeescript files"
  run "coffee -wco ./js/ ./coffee", callback
  run "coffee -wco ./demos/js ./demos/coffee/", callback

bundle = (callback) -> 
  run 'coffee --join ./lib/spectrum.js --compile coffee/Spectrum.coffee', callback

task 'watch', "Recompile CoffeeScript source into JavaScript", ->
  watch()

task 'bundle', 'Bundles spectrum into single file', ->
  bundle()
