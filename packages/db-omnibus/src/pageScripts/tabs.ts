import {nullThrows} from '@pinecast/common/helpers';

Array.from(document.querySelectorAll('.tabs.dynamic')).forEach(buildTabs);

interface CodeMirrorElement extends HTMLElement {
  CodeMirror: {
    refresh(): void;
  };
}

function hide(elem: HTMLElement) {
  elem.style.visibility = 'hidden';
  elem.style.position = 'absolute';
  elem.style.bottom = '1000%';
}
function show(elem: HTMLElement) {
  elem.style.visibility = 'visible';
  elem.style.position = 'relative';
  elem.style.bottom = 'initial';
  Array.from(elem.querySelectorAll('.CodeMirror')).forEach(
    (cm: CodeMirrorElement | HTMLElement) => {
      if (!('CodeMirror' in cm)) {
        return;
      }
      cm.CodeMirror.refresh();
    },
  );
}

function buildTabs(tabBar: HTMLElement) {
  const allTabs = Array.from(tabBar.querySelectorAll('li a[data-tab]'));

  function select(a: HTMLElement, initial?: boolean) {
    allTabs.forEach(tab => {
      if (tab === a) {
        return;
      }
      const parentNode = tab.parentNode! as HTMLElement;
      parentNode.className = parentNode.className.replace(/\s?selected/g, '');
      hide(document.querySelector(
        tab.getAttribute('data-tab')!,
      ) as HTMLElement);
    });
    (a.parentNode as HTMLElement).className += ' selected';
    const tabName = a.getAttribute('data-tab')!;
    const tab = document.querySelector(tabName) as HTMLElement;
    show(tab);
    if (tabBar.getAttribute('data-no-history') !== null || initial) {
      return;
    }
    const hash = window.location.hash.substr(1).split(',');
    const hashPos = parseInt(tabBar.getAttribute('data-hash-pos') || '0', 10);
    hash[hashPos] = tabName.substr(5);
    window.history.replaceState(
      null,
      undefined,
      '#' + hash.slice(0, hashPos + 1).join(','),
    );
  }

  tabBar.addEventListener('click', e => {
    let target = nullThrows(e.target) as HTMLElement;
    if (target === tabBar) {
      return;
    }

    while (!target.getAttribute('data-tab')) {
      if (!target.parentNode) {
        return;
      }
      target = target.parentNode as HTMLElement;
      if (target === tabBar) {
        return;
      }
    }
    e.preventDefault();
    if (target.nodeName !== 'A') {
      return;
    }

    select(target);
  });

  const hashPos = Number(tabBar.getAttribute('data-hash-pos')) || 0;

  let selected: HTMLElement | null = null;
  if (window.location.hash) {
    const hash = window.location.hash.substr(1).split(',')[hashPos];
    selected =
      tabBar.querySelector(`a[data-tab=".tab-${hash}"]`) ||
      tabBar.querySelector(`a[data-tab=".${hash}"]`);
  }
  if (!selected) {
    selected = tabBar.querySelector('li a[data-tab]') as HTMLElement;
  }
  select(selected, true);

  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.substr(1).split(',')[hashPos];
    const selected =
      tabBar.querySelector(`a[data-tab=".tab-${hash}"]`) ||
      tabBar.querySelector(`a[data-tab=".${hash}"]`);
    if (!selected) {
      return;
    }
    select(selected as HTMLElement, false);
  });
}
