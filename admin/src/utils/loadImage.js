// Recebe o caminho a partir da base + nome + extensão e retorna a url completa da imagem
export default function loadImage(name) {
  const src = require(`../assets/images/${name}`);
  const the_image = new Image();
  the_image.src = src;
  return the_image.src;
}
