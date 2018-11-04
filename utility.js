// const u = {
//   // cerca l'elemento per id
//   i(id) { return document.getElementById(id); },
//   // restituisce il totale dei minuti
//   m(h, m) { return (h||0)*60+(m||0); },
//   // restituisce la stringa che rappresenta l'ora
//   min(m) {
//     const mn = ((m || '0') + '');
//     return mn.length < 2 ? '0' + mn : mn;
//   },
//   isDate(date) {
//     return Object.prototype.toString.call(date) === '[object Date]'
//   },
//   // costruisce un oggetto con le info dell'orario
//   E(h, m, type) {
//     if (u.isDate(h)) {
//       m = h.getMinutes();
//       h = h.getHours();
//     }
//     const hr = (parseInt(h)||0);
//     const mn = (parseInt(m)||0);
//     const valid = !!(hr || mn);
//     return {
//       k: (type||'').toLowerCase(),
//       h: hr,
//       m: mn,
//       t: u.m(hr,mn),
//       v: valid ? (hr+':'+u.min(mn)) : '' };
//   },
//   // cerca l'input per id e aggiorna il valore se passato
//   // poi restituisce il valore che contiene
//   input(id, v) {
//     const ele = document.getElementById(id);
//     if (ele && v !== undefined) ele.value = v;
//     return ele.value;
//   },
//   // restituisce un oggetto con le info sull'ora scritta nella stringa/numero
//   time(str) {
//     if (typeof(str) === 'string') {
//       let m, values = [];
//       const rgx = /(\d+)+/gm;
//       while ((m = rgx.exec(str)) !== null) {
//         if (m.index === rgx.lastIndex) rgx.lastIndex++;
//         values.push(parseInt(m[1]));
//       }
//       return u.E(values[0], values[1]);
//     } else if (typeof(str) === 'number' && str > 0) {
//       const h = Math.floor(str / 60);
//       const m = str - (h * 60);
//       return u.E(h, m);
//     } else {
//       return {v:null}
//     }
//   },
//   // restiruisce i minuti totali a partire dal contenuto
//   // stringa di un input
//   im(id) {
//     const v = u.input(id);
//     return u.time(v);
//   },
//   toggleClass(e, cn, active) {
//     if (active) {
//       if (!e.classList.contains(cn)) e.classList.add(cn);
//     } else {
//       if (e.classList.contains(cn)) e.classList.remove(cn);
//     }
//   },
//   set(id, an, av) {
//     const e = u.i(id);
//     if (e) e.setAttribute(an, av);
//   },
//   format(str, o) {
//     for(let pn in o) {
//       const rgx = new RegExp('\\{'+pn+'\\}', 'gmi');
//       str = str.replace(rgx, o[pn]);
//     }
//     return str;
//   }
// };