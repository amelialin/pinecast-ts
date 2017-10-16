export default function(url): Promise<string> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('get', url, true);
    xhr.withCredentials = true;
    xhr.send();

    xhr.addEventListener('load', () => {
      if (xhr.status !== 200) {
        reject(`Status code ${xhr.status}`);
        return;
      }
      resolve(xhr.responseText);
    });
    xhr.addEventListener('error', () => {
      reject();
    });
  });
}
