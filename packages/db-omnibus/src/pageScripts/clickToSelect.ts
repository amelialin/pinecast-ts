Array.from(document.querySelectorAll('.click-to-select')).forEach(
  (el: HTMLInputElement) => {
    el.addEventListener('click', e => {
      el.setSelectionRange(0, el.value.length);
    });
  },
);
