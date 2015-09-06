# This file is particularly useful while developing Spectrum

{print} = require 'util'
{exec}  = require 'child_process'

spectrum_js = "./js/"
spectrum_coffee = "./coffee/"

demo_js = "./demos/js/"
demo_coffee = "./demos/coffee/"

run = (command, callback) ->
  proc = exec command
  proc.stdout.on 'data', (data) -> print data.toString()
  proc.stderr.on 'data', (data) -> print data.toString()
  proc.on 'exit', (status) -> callback?() if status is 0

watch = (callback) ->
  console.log "Watching for changes to Coffeescript files"
  run "coffee -wco #{spectrum_js} #{spectrum_coffee}", callback
  run "coffee -wco #{demo_js} #{demo_coffee}", callback

task 'watch', "Recompile CoffeeScript source into JavaScript", ->
  watch()
