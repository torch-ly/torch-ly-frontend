export function onAllLoaded(images) {
  let promises = []
  console.log(images)
  for (let img of images) {
    promises.push(img.decode());
  }
  return Promise.all(promises);
}
