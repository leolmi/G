(function(w) {
  const BODY = document.getElementsByTagName('BODY')[0];
  const ELEMENTS = document.getElementById('elements');

  function _refreshButtons() {
    G.u.toggleAttribute('g-copy', G.selection.length <= 0);
    G.u.toggleAttribute('g-paste', !G.clipboard);
    G.u.toggleAttribute('g-group', G.selection.length <= 1);
    G.u.toggleAttribute('g-ungroup', G.selection.length <= 0);
    G.u.toggleAttribute('g-remove', G.selection.length <= 0);
    G.u.toggleAttribute('g-lock-action', G.state.lockAction, 'active');
    G.u.toggleAttribute('g-a-line', G.state.action==='line', 'active');
    G.u.toggleAttribute('g-a-circle', G.state.action==='circle', 'active');
    G.u.toggleAttribute('g-a-rect', G.state.action==='rect', 'active');
    G.u.toggleAttribute('g-lock', G.selection.length <= 0);
    G.u.toggleAttribute('g-unlock', !G.state.lockeds);
    G.u.toggleAttribute('g-bg-cm', G.options.background.current==='cm', 'active');
    G.u.toggleAttribute('g-bg-white', G.options.background.current==='white', 'active');
    G.u.toggleAttribute('g-bg-grid', G.options.background.current==='grid', 'active');
  }

  function _refreshMeasure() {
    console.log('POSITION', G.state.position);
  }

  function _init() {
    G.init({background: 'grid'});
    ELEMENTS.innerHTML = Object.keys(G.constants.elements).map(en => '<button class="element-button" onclick="G.add(\'' + en + '\')">ADD ' + en.toUpperCase() + '</button>').join('\n')
    _refreshButtons();
  }

  document.addEventListener(G.constants.event.measure, _refreshMeasure, false);
  document.addEventListener(G.constants.event.selection, _refreshButtons, false);
  document.addEventListener(G.constants.event.state, _refreshButtons, false);
  document.addEventListener(G.constants.event.init, _refreshButtons, false);

  _init();

})(this);