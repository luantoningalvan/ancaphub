export default function loadImage(name){
  const src = require(`../assets/images/${name}`)
  const the_image = new Image()
  the_image.src = src
  return the_image.src
}