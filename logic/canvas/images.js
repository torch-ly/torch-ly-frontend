export function onAllLoaded(images) {
  let promises = []
  for (let img of images) {
    promises.push(img.decode());
  }
  return Promise.all(promises);
}
