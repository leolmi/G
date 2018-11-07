(function(w) {
  'use strict';

  const _G_background = {
    id: 'G-back-element',
    default: 'cm',
    current: 'cm',
    items: {
      cm: {
        name: 'graph paper',
        fill: 'url(#G-CM-grid)'
      },
      grid: {
        name: 'light grid',
        fill: 'url(#G-grid)'
      },
      white: {
        name: 'white page',
        fill: 'url(#G-white-page)'
      }
    }
  };

  const _G_CONSTANTS = {
    NS: 'http://www.w3.org/2000/svg',
    XL: 'http://www.w3.org/1999/xlink',
    useId: 'use',
    inputId: 'G-import-file-input',
    dpmm: 4,
    actions: {
      point: 'point',
      line: 'line',
      connector: 'connector',
      rect: 'rect',
      circle: 'circle',
      polyline: 'polyline'
    },
    attribute: {
      selectable: 'selectable',
      draggable: 'draggable',
      dragging: 'dragging',
      selected: 'selected',
      locked: 'locked',
      exportable: 'exportable',
      selection: 'selection'
    },
    event: {
      init: 'G_init',
      state: 'G_state',
      selection: 'G_selection',
      measure: 'G_measure'
    },
    filters: {
      dragshadow: {
        html: '<feGaussianBlur in="SourceAlpha" stdDeviation="3"/><feOffset dx="2" dy="2" result="offsetblur"/><feComponentTransfer><feFuncA type="linear" slope="0.5"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>',
        attributes: {
          height: '130%'
        }
      }
    },
    elements: {
      rect: {
        type: 'rect',
        group: 'default',
        attributes: {
          x: '100',
          y: '100',
          rx: '6',
          ry: '6',
          height: '140px',
          width: '240px',
          fill: 'green',
          draggable: '',
          exportable: ''
        }
      },
      circle: {
        type: 'circle',
        group: 'default',
        attributes: {
          cx: '100',
          cy: '100',
          r: '60',
          fill: 'cornflowerblue',
          draggable: '',
          exportable: ''
        }
      },
      text: {
        type: 'text',
        group: 'default',
        attributes: {
          x: 200,
          y: 200,
          fill: '#111',
          transform: 'rotate(0)',
          draggable: '',
          exportable: ''
        },
        html: 'Write here your text...'
      }
    },
    defs: {
      drawingDot: {
        html: `<marker id="G-drawing-dot" viewBox="0 0 21 21" refX="10" refY="10" markerWidth="10" markerHeight="10">
            <circle cx="10" cy="10" r="5" stroke="#222" stroke-width="1" fill="none" />
            <line x1="10" y1="0" x2="10" y2="21" stroke="#222" stroke-width="1"></line>
            <line x1="0" y1="10" x2="21" y2="10" stroke="#222" stroke-width="1"></line>
          </marker>`
      },
      dot1: {
        html: '<marker id="G-marker-dot1" viewBox="0 0 11 11" refX="5" refY="5" markerWidth="5" markerHeight="5"><circle cx="5" cy="5" r="5" stroke="#222" stroke-width="1" fill="white" /></marker>'
      },
      dot2: {
        html: '<marker id="G-marker-dot2" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5"><rect width="10" height="10" stroke="#111" stroke-width="1" fill="white" /></marker>'
      },
      arrow: {
        html: '<marker id="G-marker-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" /></marker>'
      },
      cmSmallGrid: {
        html: '<pattern id="G-CM-small-grid" width="4" height="4" patternUnits="userSpaceOnUse"><path d="M 4 0 L 0 0 0 4" fill="none" stroke="tomato" stroke-width="0.3"/></pattern>'
      },
      cmMediumGrid: {
        html: '<pattern id="G-CM-medium-grid" width="20" height="20" patternUnits="userSpaceOnUse"><rect width="20" height="20" fill="url(#G-CM-small-grid)"/><path d="M 20 0 L 0 0 0 20" fill="none" stroke="tomato" stroke-width="0.6"/></pattern>'
      },
      cmGrid: {
        html: '<pattern id="G-CM-grid" width="40" height="40" patternUnits="userSpaceOnUse"><rect width="40" height="40" fill="url(#G-CM-medium-grid)"/><path d="M 40 0 L 0 0 0 40" fill="none" stroke="tomato" stroke-width="1"/></pattern>'
      },
      whitePage: {
        html: '<pattern id="G-white-page" width="20" height="20" patternUnits="userSpaceOnUse"><rect width="21" height="21" fill="whitesmoke" stroke="#111" stroke-width=".5" stroke-dasharray="1 20"/></pattern>'
      },
      grid: {
        html: '<pattern id="G-grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(10,10,10,.1)" stroke-width="1"/></pattern>',
        element: {
          type: 'rect',
          attributes: {
            id: _G_background.id,
            class: 'no-print',
            'pointer-events': 'none',
            width: '100%',
            height: '100%',
            fill: _G_background.items[_G_background.default].fill
          }
        }
      }
    },
    selectionRect: {
      offset: 6,
      html: '<rect rx="3" ry="3" x="{x}" y="{y}" height="{height}" width="{width}" fill="rgba(100,100,100,.1)" stroke-width=".5" stroke-dasharray="5" stroke="grey"></rect>'
    }
  };

  const _G_keys = {
    canc: 'Delete',
    escape: 'Escape',
    c: 'c',
    v: 'v',
    x: 'x'
  };

  const _G_elements = {
    line: {
      drawer: (offset) => `<line x1="${offset.x}" y1="${offset.y}" x2="${offset.x}" y2="${offset.y}" stroke="rgba(100,100,100,.5)" stroke-dasharray="4" stroke-width="1" marker-start="url(#G-drawing-dot)"></line>`,
      update: (e, coord) => G.u.setAttributes(e.firstChild, 'x2', coord.x, 'y2', coord.y),
      build: (e) => {
        const info = G.u.getElementValues(e.firstChild, 'x1','y1','x2','y2');
        return `<line draggable selectable exportable x1="${info.x1}" y1="${info.y1}" x2="${info.x2}" y2="${info.y2}" stroke="#222" stroke-width="2"></line>`;
      }
    },
    rect: {
      drawer: (offset) => `<polyline points="${offset.x},${offset.y}" stroke="rgba(100,100,100,.5)" stroke-width=".5" stroke-dasharray="4" fill="rgba(100,100,100,.1)" marker-start="url(#G-drawing-dot)"></polyline>`,
      update: (e, coord) => {
        const start = e.firstChild.points[0];
        const points = [[start.x, start.y], [coord.x, start.y], [coord.x, coord.y], [start.x, coord.y], [start.x, start.y]].map(c => c.join(',')).join(' ');
        G.u.setAttributes(e.firstChild, 'points', points);
      },
      build: (e) => {
        const info = e.firstChild.getBBox();
        return `<rect draggable selectable exportable x="${info.x}" y="${info.y}" width="${info.width}" height="${info.height}" stroke="#222" stroke-width="2" fill="rgba(200,200,200,.2)"></rect>`;
      }
    },
    circle: {
      drawer: (offset) => `<circle cx="${offset.x}" cy="${offset.y}" r="0" stroke="rgba(100,100,100,.5)" stroke-width="1" stroke-dasharray="4" fill="rgba(100,100,100,.1)"></circle>
                        <line x1="${offset.x}" y1="${offset.y}" x2="${offset.x}" y2="${offset.y}" stroke="rgba(100,100,100,.5)" stroke-dasharray="5" stroke-width="2" marker-start="url(#G-drawing-dot)"></line>`,
      update: (e, coord) => {
        const center = G.u.getElementValues(e.firstChild, 'cx','cy');
        const r = Math.sqrt(Math.pow((coord.x - center.cx), 2) + Math.pow((coord.y - center.cy), 2));
        G.u.setAttributes(e.firstChild, 'r', r);
        G.u.setAttributes(e.lastChild, 'x2', coord.x, 'y2', coord.y);
      },
      build: (e) => {
        const info = G.u.getElementValues(e.firstChild, 'cx','cy','r');
        return `<circle draggable selectable exportable cx="${info.cx}" cy="${info.cy}" r="${info.r}" stroke="#222" stroke-width="2" fill="rgba(200,200,200,.2)"></circle>`;
      }
    },
    polyline: {
      drawer: (offset) => `<polyline points="${offset.x},${offset.y}" stroke="rgba(100,100,100,.5)" stroke-width="1" stroke-dasharray="4" fill="rgba(100,100,100,.1)"></polyline>`,
      update: (e, coord) => {
        //TODO....
      },
      build: (e) => {
        //TODO....
      }
    },
    connector: {
      drawer: (offset) => `<line x1="${offset.x}" y1="${offset.y}" x2="${offset.x}" y2="${offset.y}" stroke="rgba(100,100,100,.5)" stroke-dasharray="4" stroke-width="1" marker-start="url(#G-drawing-dot)"></line>`,
      update: (e, coord) => G.u.setAttributes(e.firstChild, 'x2', coord.x, 'y2', coord.y),
      build: (e) => {
        const info = G.u.getElementValues(e.firstChild, 'x1','y1','x2','y2');
        return `<line draggable selectable exportable connector x1="${info.x1}" y1="${info.y1}" x2="${info.x2}" y2="${info.y2}" stroke="#222" stroke-width="2" marker-start="url(#G-marker-dot1)" marker-end="url(#G-marker-dot1)"></line>`;
      }
    }
  };

  const NAME = 'G';

  const _G_STYLES = `
  [G-style] {
      outline: none;
  }
  [G-style] .selected {
      filter:url(#dragshadow);
      opacity: .8;
  }
  [G-style] .dragging {
      /*filter:url(#dragshadow);*/
  }
  [G-style].drawing [draggable], [G-style].drawing [selectable] {
    pointer-events: none;
  }
  [G-style].drawing {
    cursor: crosshair;
  }
  [G-style] [locked], .g-ghost {
    pointer-events: none;
  }
  @media print {
    .no-print, no-print * {
        display: none !Important;
    }
  }
  `;

  const _G_u = {
    now: () => (new Date()).getTime(),
    getFileName: (name) => (name || 'file').replace(/[\\\/:\*\?"<>\|\s]/gi, '_'),
    isString: (o) => typeof(o) === 'string',
    isObject: (o) => typeof(o) === 'function' || typeof(o) === 'object',
    isElement: (o) => !!((o||{}).nodeType === 1),
    isEvent: (o) => {},
    isNullOrUndefined: (o) => typeof(o) === 'undefined' || o === null,
    find: (cll, iterator, found, notfound) => {
      if (!iterator || !cll) return;
      if (!G.u.isArray(cll)) cll = Array.from(cll);
      if (!cll) return;
      const ln = cll.length;
      found = found || ((e) => e);
      notfound = notfound || (() => null);
      for (let i = 0; i < ln; i++) {
        if (!!iterator(cll[i])) return found(cll[i]);
      }
      return notfound();
    },
    keys: (o) => Object.keys(o),
    filter: (cll, iterator) => {
      if (!iterator || !cll) return;
      cll = Array.from(cll);
      const ln = cll.length;
      const res = [];
      for (let i = 0; i < ln; i++) {
        if (!!iterator(cll[i])) res.push(cll[i]);
      }
      return res;
    },
    remove: (cll, o) => {
      const index = (cll || []).indexOf(o);
      if (index >= 0) cll.splice(index, 1);
    },
    addUnique: (cll, o) => {
      const index = (cll || []).indexOf(o);
      if (index < 0) cll.push(o);
    },
    extend: (t, s) => {
      for (let pn in s) {
        if (!_G_u.isNullOrUndefined(s[pn]))
          t[pn] = s[pn];
      }
    },
    defaults: (t, s) => {
      for (let pn in t) {
        if (!s.hasOwnProperty(pn)) delete t[pn];
      }
      for (let pn in s) {
        t[pn] = s[pn];
      }
    },
    guid: () => {
      const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    },
    eid: (id, cb) => {
      const e = document.getElementById(id);
      return (cb && e) ? cb(e) : e;
    },
    query: (q) => document.querySelectorAll(q),
    toggle: (e, cn, active) => {
      if (!e || !cn) return;
      if (active) {
        if (!e.classList.contains(cn)) e.classList.add(cn);
      } else {
        if (e.classList.contains(cn)) e.classList.remove(cn);
      }
    },
    has: (...args) => {
      const e = args.shift();
      if (!e) return false;
      return args.some((v) => e.hasAttribute(v));
    },
    toggleAttribute: (id, active, atrb) => {
      if (!id) return;
      atrb = atrb || 'disabled';
      const btn = G.u.isObject(id) ? id : G.u.eid(id);
      if (!btn) return;
      if (active) {
        if (!btn.hasAttribute(atrb)) btn.setAttribute(atrb, '');
      } else {
        if (btn.hasAttribute(atrb)) btn.removeAttribute(atrb);
      }
    },
    format: (str, o) => {
      for (let pn in o) {
        const rgx = new RegExp('\\{' + pn + '\\}', 'gmi');
        str = str.replace(rgx, o[pn]);
      }
      return str;
    },
    offset: (o, offset) => {
      o.x = o.x - offset;
      o.y = o.y - offset;
      o.width = o.width + 2 * offset;
      o.height = o.height + 2 * offset;
    },
    mergeTrans: (source, target) => {
      if (source && target && source.type === target.type) {
        switch (source.type) {
          case SVGTransform.SVG_TRANSFORM_TRANSLATE:
            target.setTranslate(target.matrix.e + source.matrix.e, target.matrix.f + source.matrix.f);
            break;
          case SVGTransform.SVG_TRANSFORM_ROTATE:
            target.setRotate(target.angle + source.angle, target.matrix.e + source.matrix.e, target.matrix.f + source.matrix.f);
            break;
          case SVGTransform.SVG_TRANSFORM_SCALE:
            target.setScale(target.matrix.e + source.matrix.e, target.matrix.f + source.matrix.f);
            break;
          default:
            return;
        }
      }
    },
    cloneTrans: (original, target) => {
      const t = G.svg.createSVGTransform();
      switch (original.type) {
        case SVGTransform.SVG_TRANSFORM_TRANSLATE:
          t.setTranslate(original.matrix.e, original.matrix.f);
          break;
        case SVGTransform.SVG_TRANSFORM_ROTATE:
          t.setRotate(original.angle, original.matrix.e, original.matrix.f);
          break;
        case SVGTransform.SVG_TRANSFORM_SCALE:
          t.setScale(original.matrix.e, original.matrix.f);
          break;
        default:
          return;
      }
      target.transform.baseVal.insertItemBefore(t, 0);
    },
    mergeTransform: (source, target) => {
      const tt = (target.transform || {}).baseVal;
      Array.from((source.transform || {}).baseVal || []).forEach((st) =>
        G.u.find(tt,
          (ttt) => ttt.type === st.type,
          (ttt) => G.u.mergeTrans(st, ttt),
          () => G.u.cloneTrans(st, target)));
    },
    setAttributes: (...args) => {
      const target = args.shift();
      if (!target) return;
      for (let i = 0; i < args.length; i += 2) {
        target.setAttribute(args[i], args[i + 1]);
      }
    },
    getBox: (ele) => {
      if (!ele || !G.u.isFunction(ele.getBoundingClientRect)) return;
      const box = ele.getBoundingClientRect();
      const root = G.svg.getBoundingClientRect();
      box.x -= root.x;
      box.y -= root.y;
      return box;
    },
    getIntersectionList: (area, iterator) => {
      if ((((area || {}).height || 0) * ((area || {}).width || 0)) <= 0) return [];
      return G.u.filter(G.svg.children, (ele) => {
        const rect = G.u.getBox(ele);
        return G.u.isOver(rect, area) && iterator(ele);
      });
    },
    isOver: (rect, area) => rect && area && rect.x <= (area.x + area.width) && (rect.x + rect.width) >= area.x && rect.y <= (area.y + area.height) && (rect.y + rect.height) >= area.y,
    getElementValues: (...args) => {
      const ele = args.shift();
      const atrb = {};
      args.forEach(a => atrb[a] = ele[a].baseVal.value);
      return atrb;
    }
  };
  ['Function','Date','Array','Number','Error', 'Event'].forEach(c => _G_u['is' + c] = (o) => Object.prototype.toString.call(o) === '[object ' + c + ']');


  const _G_converter = {
    // restituisce un oggetto con le info di distanza (pti)
    distance: (p1, p2) => {
      const info = {
        dx: p2.x - p1.x,
        dy: p2.y - p1.y
      };
      info.d = Math.sqrt(info.dx * info.dx + info.dy * info.dy);
      return info;
    },
    // aggiunge l'oggetto "_mm" a quello passato contenente
    // tutte le proprietà numeriche scalate ai millimetri
    addMM: (o) => {
      if (!_G_u.isObject(o)) return;
      o._mm = {};
      _G_u.keys(o).forEach(k => (_G_u.isNumber(o[k])) ? o._mm[k] = _G_converter.pointsToMM(info[k]) : _G_converter.addMM(info[k]));
    },
    // converte punti in mm
    pointsToMM: (pts) => pts * _G_CONSTANTS.dpmm,
    // converte mm in pti
    mmToPoints: (mm) => mm / _G_CONSTANTS.dpmm
  };

  const G = {
    u: _G_u,
    options: {
      drag: true,
      select: true,
      borders: true,
      grid: {
        snap: 5
      },
      background: _G_background
    },
    info: {},
    constants: _G_CONSTANTS,
    converter: _G_converter,
    initialized: false,
    offset: {},
    userOptions: {},
    svg: null,
    state: {
      zero: {x:0,y:0},
      position:{}
    },
    history: {},
    selection: [],
    current: null
  };

  function _G_changed(ename, data) {
    G.u.toggle(G.svg, 'drawing', ((G.state.action||'selection') !== 'selection'));
    ename = ename || 'state';
    const evt = new CustomEvent(G.constants.event[ename], {
      detail: {
        message: NAME + ' ' + ename + ' changed',
        time: new Date(),
        data: data
      },
      bubbles: true,
      cancelable: true
    });
    G.svg.dispatchEvent(evt);
  }

  function _G_styles() {
    const style = document.createElement('style');
    style.innerHTML = _G_STYLES;
    document.head.appendChild(style);
  }

  function _G_position(coord, type) {
    type = type || 'current';
    G.state.position[type] = coord;
    _G_changed('measure');
  }

  function _G_distance(p1, p2) {
    const info = G.converter.distance(p1, p2);
    info.p1 = p1;
    info.p2 = p2;
    G.converter.addMM(info);
    return info;
  }

  function _G_mouse(e) {
    const zoom = parseFloat(G.svg.style.zoom||1);
    let CTM = G.svg.getScreenCTM();
    if (e.touches) e = e.touches[0];
    const coord = {
      rx: (e.clientX - CTM.e * zoom) / (CTM.a * zoom),
      ry: (e.clientY - CTM.f * zoom) / (CTM.d * zoom)
    };
    const snap_mm = G.options.grid ? (G.options.grid || {}).snap || 5 : 1;
    const snap = snap_mm * G.constants.dpmm;
    const snap2 = Math.floor(snap / 2);
    const dx = (coord.rx % snap);
    coord.x = coord.rx - (dx <= snap2 ? dx : -(snap - dx));
    const dy = (coord.ry % snap);
    coord.y = coord.ry - (dy <= snap2 ? dy : -(snap - dy));
    return coord;
  }

  function _G_bringToFront(e) {
    if (G.u.isString(e)) e = G.u.eid(e);
    G.svg.removeChild(e);
    G.svg.appendChild(e);
    return e;
  }

  function _G_clearSelection(skip) {
    G.selection.splice(0);
    if (!skip) _G_changed('selection');
  }


  function _G_onSelection(iterator) {
    (G.selection||[]).forEach(iterator);
  }

  function _G_group() {
    if (G.selection.length<2) return;
    const group = document.createElementNS(G.constants.NS, 'g');
    group.setAttribute(G.constants.attribute.draggable, '');
    group.setAttribute(G.constants.attribute.exportable, '');
    G.selection.forEach(e => {
      const ele = e.lastChild;
      group.appendChild(ele);
      G.u.mergeTransform(e, ele);
      G.svg.removeChild(e);
    });
    G.selection.splice(0);
    G.svg.appendChild(group);
    _G_select(group, true);
  }

  function _G_ungroup() {
    _G_onSelection((ele) => {
      const group = (ele||{}).lastChild;
      if ((group || {}).tagName === 'g') {
        const container = ele.parentElement;
        // passa le trasformazioni al gruppo
        G.u.mergeTransform(ele, group);
        Array.from(group.children).forEach((c) => {
          container.appendChild(c);
          // passa le trasformazioni agli elementi del gruppo
          G.u.mergeTransform(group, c);
        });
        // rimuove la selezione
        container.removeChild(ele);
        _G_clearSelection();
      }
    });
  }

  function _G_root(e) {
    return ((e.parentElement || {}).tagName === 'g') ? _G_root(e.parentElement) : e;
  }

  function _G_isSelectionRect(e) {
    return (e||{}).tagName === 'g' && e.hasAttribute(G.constants.attribute.selection);
  }

  function _G_selectionRect(e) {
    if (_G_isSelectionRect(e)) return _G_bringToFront(e);
    const box = G.u.getBox(e);
    G.u.offset(box, G.constants.selectionRect.offset);
    const html = G.u.format(G.constants.selectionRect.html, box);
    const sel = document.createElementNS(G.constants.NS, 'g');
    G.u.setAttributes(sel, G.constants.attribute.draggable, '', G.constants.attribute.exportable, '', G.constants.attribute.selection, '');
    sel.innerHTML = html;
    sel.appendChild(e);
    G.svg.appendChild(sel);
    return sel;
  }

  function _G_useCurrent(ele) {
    ele = _G_root(ele);
    return (G.u.has(ele, G.constants.attribute.selectable, G.constants.attribute.draggable)) ? ele : null;
  }

  function _G_select(e, active) {
    if (!e || e.hasAttribute(G.constants.attribute.locked)) return;
    if (active) {
      const ele = _G_selectionRect(e);
      G.u.addUnique(G.selection, ele);
      G.u.toggle(ele, G.constants.attribute.selected, true)
    } else {
      G.u.remove(G.selection, e);
      G.u.mergeTransform(e, e.lastChild);
      G.svg.appendChild(e.lastChild);
      G.svg.removeChild(e);
    }
    _G_changed('selection');
  }

  function _G_resetActionElement(clear) {
    if (G.state.actionElement) {
      G.svg.removeChild(G.state.actionElement);
      G.state.actionElement = null;
    }
    if (clear && !G.state.lockAction) G.state.action = null;
    _G_changed();
  }

  function _G_emptySelection() {
    _G_resetActionElement();
    while (G.selection.length > 0) _G_select(G.selection[0], false);
    _G_changed('selection');
  }

  function _G_selection(ele, add) {
    if (_G_isSelectionRect(ele)) return;
    if (!add) _G_emptySelection();
    _G_select(ele, true);
  }

  function _G_getTransformation(e, type) {
    return G.u.find(Array.from((e.transform || {}).baseVal || []), (t) => t.type === type);
  }


  function _G_startAction(e) {
    _G_emptySelection();
    const offset = _G_mouse(e);
    _G_position(offset, 'start');
    G.state.action = G.state.action || 'selection';
    let ele, html;
    switch (G.state.action) {
      case 'selection':
        ele = document.createElementNS(G.constants.NS, 'polyline');
        G.u.setAttributes(ele, 'points', [offset.rx, offset.ry].join(','), 'fill', 'rgba(100,100,100,.1)');
        break;
      case 'line':
      case 'rect':
      case 'circle':
      case 'polyline':
        ele = document.createElementNS(G.constants.NS, 'g');
        ele.innerHTML = _G_elements[G.state.action].drawer(offset);
        break;
    }
    if (ele) {
      G.svg.appendChild(ele);
      G.state.actionElement = ele;
    }
    _G_changed();
  }

  function _G_startDrag(e) {
    if (!G.initialized) return;
    // se la selezione non è attivata passa oltre
    if (!G.options.select) return;
    // il click sul contenitore passa oltre
    if (G.svg === e.target) return _G_startAction(e);
    G.state.action = null;
    // solo gli oggetti selezionabili o trascinabili vengono considerati
    const ele = _G_useCurrent(e.target);
    if (!ele) return _G_emptySelection();
    _G_selection(ele, e.ctrlKey);
    if (!G.options.drag) return;
    const offset = _G_mouse(e);
    _G_position(offset);
    G.transform = null;
    let ci = -1;
    if (G.selection.length > 0 && !G.u.find(G.selection, els => !G.u.has(els, G.constants.attribute.draggable))) {
      G.selection.forEach(els =>
        G.u.find(Array.from((els.transform || {}).baseVal || []),
          (t) => t.type === SVGTransform.SVG_TRANSFORM_TRANSLATE, null,
          () => {
            const t = G.svg.createSVGTransform();
            t.setTranslate(0, 0);
            els.transform.baseVal.insertItemBefore(t, 0);
          }));
      G.transform = {};
      G.selection.forEach((els, i) => {
        if (els === ele) ci = i;
        const t = _G_getTransformation(els, SVGTransform.SVG_TRANSFORM_TRANSLATE);
        G.transform[i] = {
          t: t,
          dx: offset.x - t.matrix.e,
          dy: offset.y - t.matrix.f
        }
      });
    }
    _G_changed();
  }


  function _G_drag(e) {
    if (!G.initialized) return;
    const coord = _G_mouse(e);
    _G_position(coord);
    switch(G.state.action) {
      case 'selection':
        if (!G.state.actionElement) return;
        const start = G.state.actionElement.points[0];
        const points = [[start.x, start.y], [coord.rx, start.y], [coord.rx, coord.ry], [start.x, coord.ry]].map(c => c.join(',')).join(' ');
        G.u.setAttributes(G.state.actionElement, 'points', points);
        break;
      case 'line':
      case 'circle':
      case 'rect':
      case 'polyline':
        if (!G.state.actionElement) return;
        _G_elements[G.state.action].update(G.state.actionElement, coord);
        break;
      default:
        if (!G.options.drag) return;
        if (G.transform && G.selection.length>0 && !G.u.find(G.selection, e => !G.u.has(e, G.constants.attribute.draggable))) {
          G.state.dragging = true;
          e.preventDefault();
          G.selection.forEach((e, i) => {
            G.u.toggle(e, G.constants.attribute.dragging, true);
            const trans = {x: coord.x - G.transform[i].dx, y: coord.y - G.transform[i].dy};
            G.transform[i].t.setTranslate(trans.x, trans.y);
          });
          _G_changed();
        }
    }
    if (G.state.action) {
      G.state.drawing = true;
      _G_changed();
    }
  }

  function _G_getElementType(e) {
    const atrb = G.u.find(e.attributes, (a) => /g-element-.*?/g.test(a.name));
    return (atrb) ? atrb.name.substr(10) : null;
  }

  function _G_endDrag(e) {
    if (!G.initialized) return;
    G.state.position = {};
    switch(G.state.action) {
      case 'selection':
        if (!G.state.actionElement) return;
        const area = G.u.getBox(G.state.actionElement);
        const selection = G.u.getIntersectionList(area, (ele) => G.u.has(ele, G.constants.attribute.selectable, G.constants.attribute.draggable));
        selection.forEach(ele => _G_select(ele, true));
        _G_resetActionElement(true);
        break;
      case 'line':
      case 'circle':
      case 'rect':
      case 'polyline':
        if (!G.state.actionElement) return;
        const ele = document.createElementNS(G.constants.NS, 'g');
        ele.innerHTML = _G_elements[G.state.action].build(G.state.actionElement);
        G.u.setAttributes(ele.firstChild, 'g-element', '', 'g-element-' + G.state.action, '');
        G.svg.appendChild(ele.firstChild);
        _G_resetActionElement(true);
        break;
      default:
        G.selection.forEach((ele) => G.u.toggle(ele, G.constants.attribute.dragging, false));
        G.transform = null;
        G.state.dragging = false;
        _G_changed();
    }
  }

  function _G_addFilters() {
    if (!G.svg) return;
    for (let fn in G.constants.filters) {
      const filter = document.createElementNS(G.constants.NS, 'filter');
      filter.setAttribute('id', fn);
      const f = G.constants.filters[fn];
      for (let a in f.attributes||{}) {
        filter.setAttribute(a, f.attributes[a]);
      }
      filter.innerHTML = f.html;
      G.svg.appendChild(filter);
    }
  }

  function _G_create(e, top) {
    const ele = document.createElementNS(G.constants.NS, e.type);
    for (let a in e.attributes || {}) ele.setAttribute(a, e.attributes[a]);
    ele.innerHTML = e.html || '';
    if (top) {
      G.svg.firstChild ? G.svg.insertBefore(ele, G.svg.firstChild) : G.svg.appendChild(ele);
    } else {
      G.svg.appendChild(ele);
    }
  }

  function _G_add(name) {
    const e = G.constants.elements[name];
    if (!e) return console.warn('[G] Undefined element!', name);
    _G_create(e);
  }

  function _G_remove() {
    if (G.selection.length<=0) return;
    G.u.find(G.selection, (e) => !G.u.has(e, G.constants.attribute.locked), (e) => {
      G.svg.removeChild(e);
      G.u.remove(G.selection, e);
      _G_remove();
    });
    _G_changed('selection');
  }

  function _G_clear() {
    Array.from(G.svg.children).forEach((e) => {
      if (G.u.has(e, G.constants.attribute.exportable) || _G_isSelectionRect(e))
        G.svg.removeChild(e);
    });
    _G_clearSelection();
  }

  function _G_addDefs() {
    if (!G.svg) return;
    const defs = document.createElementNS(G.constants.NS, 'defs');
    let html = '';
    const elements = [];
    for (let d in G.constants.defs) {
      if (html) html += '\n';
      const e = G.constants.defs[d];
      html += e.html;
      if (e.element) elements.push(e.element);
    }
    defs.innerHTML = html;
    G.svg.appendChild(defs);
    elements.forEach(e => _G_create(e, true));
  }

  function _G_filters(filters) {
    if (!G.u.isObject(filters)) return console.warn('[G] filters accepts only object data!');
    for (let fn in filters) {
      G.constants.filters[fn] = filters[fn];
    }
  }

  function _G_info(info) {
    G.u.defaults(G.info, {
      title: 'diagram',
      description: '',
      author: '',
      create: G.u.now()
    });
    if (info) G.u.extend(G.info, info);
    if (G.proxy && !G.proxy.enabled) G.proxy.apply();

    G.constants.backgrounds = G.u.keys(_G_background.items).map(nm => ({name: _G_background.items[nm].name, code: nm}));
  }

  function _G_setBackground(code) {
    const fill = (_G_background.items[code]||{}).fill;
    if (fill) G.u.eid(_G_background.id, (e) => e.setAttribute('fill', fill));
    _G_background.current = code;
    _G_changed();
  }

  function _G_import(json) {
    try {
      let data = G.u.isString(json) ? JSON.parse(json) : json;
      if (G.u.isArray(data)) data = {elements:data};
      if (!G.u.isObject(data) || !G.u.isArray(data.elements)) return console.warn('[G] Unrecognized import data!');
      _G_info(data.info);
      data.elements.forEach((e) => _G_create(e));
    } catch(err) {
      console.error('[G] Error importing data!', err);
    }
  }

  function _G_export_element(e) {
    const ser = {
      type: e.nodeName,
      attributes: {},
      html: e.innerHTML
    };
    Array.from(e.attributes).forEach((a) => ser.attributes[a.name] = a.textContent);
    return ser;
  }

  function _G_export() {
    const json = {info:{}, elements:[]};
    G.u.extend(json.info, G.info);
    json.info.date = G.u.now();
    Array.from(G.svg.children).forEach((e) => {
      if (G.u.has(e, G.constants.attribute.exportable))
        json.elements.push(_G_export_element(e))
    });
    return JSON.stringify(json);
  }

  function _G_bind() {
    G.proxy = {
      binding: {},
      setValue: (e, pn) => {
        console.log('INPUT CHANGE property=%s', pn);
        G.info[pn] = e.target.value;
      },
      apply: () => {
        for(let pn in G.proxy.binding) {
          (G.proxy.binding[pn]||{}).value = G.info[pn];
        }
      },
      p: new Proxy(G.info, {
        set: function(obj, prop, newval) {
          G.proxy.enabled = true;
          (G.proxy.binding[prop]||{}).value = newval;
          obj[prop] = newval;
          return true;
        }
      })
    };
    Array.from(document.querySelectorAll('input,textarea')).forEach(e => {
      if (e.hasAttribute('G-bind')) {
        const pn = e.attributes['G-bind'].textContent;
        if (pn) {
          e.setAttribute('onchange', 'G.proxy.setValue(event, \'' + pn + '\')');
          e.value = G.info[pn];
          G.proxy.binding[pn] = e;
        }
      }
    });
  }

  function _G_initAction(a) {
    _G_emptySelection();
    G.state.action = a;
    _G_changed();
  }

  function _G_toggleLockAction() {
    G.state.lockAction = !G.state.lockAction;
    return (!G.state.lockAction) ? _G_resetActionElement(true) : _G_changed();
  }

  function _G_getLockets() {
    return G.u.query('[G-style] ['+G.constants.attribute.locked+']');
  }

  function _G_lock() {
    G.selection.forEach(e => G.u.toggleAttribute(e.lastChild, true, G.constants.attribute.locked));
    G.state.lockeds = _G_getLockets().length > 0;
    _G_emptySelection();
    _G_changed();
  }

  function _G_unlock(e) {
    const elements = e ? [e] : _G_getLockets();
    elements.forEach(ele => G.u.toggleAttribute(ele, false, G.constants.attribute.locked));
    G.state.lockeds = _G_getLockets().length > 0;
    _G_changed();
  }

  function _G_importFile() {
    let input = document.getElementById(G.constants.inputId);
    if (input) input.parentElement.removeChild(input);
    input = document.createElement('input');
    G.u.setAttributes(input, 'id', G.constants.inputId, 'type', 'file', 'style', 'visibility:hidden;position:absolute;', 'accept', 'application/json"', 'onchange', 'G.loadFile(event.target.files[0])');
    const body = document.getElementsByTagName('BODY')[0];
    body.appendChild(input);
    input.click();
  }

  function _G_loadFile(file) {
    const reader = new FileReader();
    reader.onload = () => G.import(reader.result);
    reader.onerror = (err) => console.error('[G] Import file error!',err);
    reader.readAsText(file);
  }

  function _G_exportFile(name) {
    if (!G.u.isFunction(w.saveAs)) return console.error('[G] saveAs function not found!');
    const json = G.export();
    name = name || G.info.title || 'diagram';
    name = G.u.getFileName(name);
    const file = new File([json], name + '.json', {type: 'text/plain;charset=utf-8'});
    w.saveAs(file);
  }

  function _G_key(e) {
    const key = e.key || e.keyIdentifier || e.keyCode;
    switch(key) {
      case _G_keys.canc: return _G_remove();
      case _G_keys.escape: return _G_emptySelection();
      case _G_keys.c: return (e.ctrlKey) ? _G_copy() : null;
      case _G_keys.v: return (e.ctrlKey) ? _G_paste() : null;
      case _G_keys.x: return (e.ctrlKey) ? _G_cut() : null;
    }
  }

  function _G_copy() {
    if (G.selection.length<=0) return;
    G.clipboard = G.selection.map(e => e.lastChild.outerHTML);
    _G_changed();
  }

  function _G_cut() {
    if (G.selection.length<=0) return;
    G.clipboard = G.selection.map(e => e.lastChild.outerHTML);
    _G_remove();
  }

  function _G_paste() {
    _G_emptySelection();
    G.clipboard.forEach((html) => {
      const ele = document.createElementNS(G.constants.NS, 'g');
      ele.innerHTML = html;
      const te = G.svg.appendChild(ele.firstChild);
      te.removeAttribute('id');
      _G_select(te, true)
    });
  }

  function _G_print() {
    if (G.u.isFunction((w||{}).print)) w.print();
  }

  function _G_zoom(uv) {
    let v = parseFloat(uv);
    if (v > 1000) v = 1000;
    if (v < 0) v = 100;
    G.svg.style.zoom = (v || 100) / 100;
  }

  function _G_options() {
    console.log('user options', G.userOptions);
    const bg = G.userOptions.background || _G_background.default;
    _G_CONSTANTS.defs.grid.element.attributes.fill = _G_background.items[bg].fill;
    _G_background.current = bg;
  }

  function _G_createSVG(e) {
    const svg = document.createElementNS(G.constants.NS, 'svg');
    G.u.setAttributes(svg, 'xmlns', G.constants.NS, 'xmlns:xlink', G.constants.XL, 'width', '100%', 'height', '100%', 'preserveAspectRatio', 'none', 'onload', 'G.init(event)');
    e.appendChild(svg);
  }

  function _G_init(e, o) {
    if (!G.u.isElement(e) && !G.u.isEvent(e) && G.u.isObject(e)) {
      G.userOptions = e;
      e = undefined;
    } else if (G.u.isObject(o)) {
      G.userOptions = o;
    }
    if (!e) e = (G.u.query('[g-container]')||[])[0];
    if (G.u.isString(e)) e = G.u.eid(e);
    if (G.u.isEvent(e)) {
      G.svg = e.target;
    } else if (G.u.isElement(e)) {
      return (e.tagName === 'svg') ? G.u.setAttributes(e, 'onload', 'G.init(event)') : _G_createSVG(e);
    } else {
      return console.error('[G] Cannot found svg canvas!');
    }

    G.u.toggleAttribute(G.svg, true, 'G-style');
    // KEYS
    G.svg.addEventListener('focus', () => G.svg.addEventListener('keyup', _G_key), G.svg);
    // MOUSE
    G.svg.addEventListener('mousedown', _G_startDrag);
    G.svg.addEventListener('mousemove', _G_drag);
    G.svg.addEventListener('mouseup', _G_endDrag);
    G.svg.addEventListener('mouseleave', _G_endDrag);
    // TOUCH
    G.svg.addEventListener('touchstart', _G_startDrag);
    G.svg.addEventListener('touchmove', _G_drag);
    G.svg.addEventListener('touchend', _G_endDrag);
    G.svg.addEventListener('touchleave', _G_endDrag);
    G.svg.addEventListener('touchcancel', _G_endDrag);

    _G_options();
    _G_info();
    _G_addFilters();
    _G_addDefs();
    _G_styles();
    _G_bind();
    G.initialized = true;
    _G_changed('init', G.svg);
    return G.svg;
  }



  G.init = _G_init;
  G.setBackground = _G_setBackground;
  G.add = _G_add;
  G.bringToFront = _G_bringToFront;
  G.filters = _G_filters;
  G.remove = _G_remove;
  G.group = _G_group;
  G.ungroup = _G_ungroup;
  G.clear = _G_clear;
  G.import = _G_import;
  G.importFile = _G_importFile;
  G.export = _G_export;
  G.exportFile = _G_exportFile;
  G.loadFile = _G_loadFile;
  G.initAction = _G_initAction;
  G.toggleLockAction = _G_toggleLockAction;
  G.print = _G_print;
  G.zoom = _G_zoom;
  G.copy = _G_copy;
  G.paste = _G_paste;
  G.cut = _G_cut;
  G.lock = _G_lock;
  G.unlock = _G_unlock;

  w.G = G;
})(this);