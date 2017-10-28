export default `
<script>
(function() {
  if (!window.frameElement) {
    return;
  }
  document.body.addEventListener('click', function(e) {
    let target = e.target;
    while (target && target !== document.body && target !== document) {
      if (target.hasAttribute('data-link')) {
        e.preventDefault();
        e.stopPropagation();
        handle(target.getAttribute('href'));
      }
      target = target.parentNode;
    }
  });

  function handle(href) {
    window.frameElement.__handler(href);
  }
}())
</script>
`;
