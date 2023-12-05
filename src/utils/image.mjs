export function containsImage(text) {
  const regex = /(http:\/\/|https:\/\/).*\.(?:png|jpg|jpeg|gif|bmp|svg|webp)/i;
  return text.match(regex);
  //return match ? match[0] : null;
}

export function extractImage(text) {
  const regex = /(http:\/\/|https:\/\/).*\.(?:png|jpg|jpeg|gif|bmp|svg|webp)/i;
  const match = text.match(regex);
  return match ? match[0] : null;
}
