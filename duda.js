
(function(w) {
  // STORAGE
  const storage = {
    prefix: 'DUDA',
    set(k, v) {
      localStorage.setItem(storage.prefix + '@' + k, v);
    },
    get(k) {
      return localStorage.getItem(storage.prefix + '@' + k);
    },
    remove(k) {
      localStorage.removeItem(storage.prefix + '@' + k);
    }
  };


  // DUDA
  w.duda = {
    storage: storage,
    body() {
      return document.getElementsByTagName('BODY')[0];
    },
    // cerca l'elemento per id
    i(id) {
      return document.getElementById(id);
    },
    // cerca l'input per id e aggiorna il valore se passato
    // poi restituisce il valore che contiene
    input(id, v) {
      const ele = document.getElementById(id);
      if (ele && v !== undefined) ele.value = v;
      return ele.value;
    },
    // aggiunge/toglie la classe all'elemento
    toggle(e, cn, active) {
      if (active) {
        if (!e.classList.contains(cn)) e.classList.add(cn);
      } else {
        if (e.classList.contains(cn)) e.classList.remove(cn);
      }
    },
    // crea l'elemento con l'html passato
    create(html, tag) {
      const ele = document.createElement(tag || 'div');
      ele.innerHTML = html;
      return ele;
    }
  };
})(this);