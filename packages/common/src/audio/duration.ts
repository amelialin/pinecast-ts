export default function getAudioDuration(asset: Blob) {
  const u = URL.createObjectURL(asset);
  const audio = new Audio(u);
  let handled = false;
  return new Promise<number>((resolve, reject) => {
    try {
      const handler = () => {
        if (handled) {
          return;
        }
        if (audio.duration === Infinity || isNaN(audio.duration)) {
          return;
        }
        handled = true;
        URL.revokeObjectURL(u);
        resolve(audio.duration);
      };
      audio.addEventListener('loadedmetadata', handler);
      audio.addEventListener('durationchanged', handler);
      setTimeout(() => {
        handler();
        if (!handled) {
          reject();
        }
      }, 3000);
    } catch (e) {
      reject();
    }
  });
}
