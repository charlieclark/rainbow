# Rainbow
A stripped down and optimized version of [anomal/RainbowVis-JS](https://github.com/anomal/RainbowVis-JS), more suited for canvas animations etc.

# Features
  * removing logs
  * removing some operations
  * removing hardcoded color values
  * optimizing 
  * adding node export
  * get color as RGB or HEX

# How to use
Visual results are identical to [anomal/RainbowVis-JS](https://github.com/anomal/RainbowVis-JS), however usage is slightly different. 

initialize a rainbow with an array of hex values 
`var rainbow = new Rainbow(['#ff0000', '#00ff00', '#0000ff'])`

get a color from the spectrum as a hex value
`var color = rainbow.colorAt(0.5); //00ff00`
or as an RGB array
`var color = rainbow.colorAt(0.5); //[0,255,0]`

And that's it!

# Todo
  * Example
  * Minified version
  * bower


