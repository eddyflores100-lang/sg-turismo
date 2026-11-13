/**
 * SG-Turismo AI Agent Widget
 * Ultra-robust: re-injects every 200ms if removed by React hydration
 * Appends to documentElement (html) to avoid body-level React management
 */
(function () {
  'use strict';

  var WORKER_URL = 'https://sg-turismo-agent.eddyflores100.workers.dev';
  var WHATSAPP = 'https://wa.me/593980108426?text=Hola%20SG-Turismo%2C%20quiero%20información';
  var STORAGE_KEY = 'sgturismo_agent_history';

  var css = `
#sgt-agent-wrap{position:fixed;bottom:20px;right:20px;z-index:2147483647!important;pointer-events:none}
#sgt-agent-btn{pointer-events:auto;width:60px;height:60px;border-radius:50%;
  background:linear-gradient(135deg,#FF2D2D,#FF8A1E);border:none;cursor:pointer;display:flex;align-items:center;
  justify-content:center;box-shadow:0 8px 24px rgba(255,45,45,.4);transition:transform .3s,box-shadow .3s;
  position:relative}
#sgt-agent-btn:hover{transform:scale(1.08);box-shadow:0 12px 32px rgba(255,45,45,.55)}
#sgt-agent-btn svg{width:28px;height:28px;color:#fff}
#sgt-agent-btn .live-dot{position:absolute;top:6px;right:6px;width:10px;height:10px;border-radius:50%;
  background:#22c55e;border:2px solid #fff;animation:sgt-pulse 2s infinite}
@keyframes sgt-pulse{0%,100%{opacity:1}50%{opacity:.4}}
#sgt-agent-panel{position:fixed;bottom:90px;right:20px;z-index:2147483647!important;width:360px;max-width:calc(100vw - 40px);
  height:520px;max-height:calc(100vh - 120px);background:#fff;border-radius:16px;
  box-shadow:0 16px 48px rgba(0,0,0,.18);display:none;flex-direction:column;overflow:hidden;
  font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;pointer-events:auto}
#sgt-agent-panel.open{display:flex;animation:sgt-slide-up .3s ease}
@keyframes sgt-slide-up{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
#sgt-agent-panel .sgt-agent-header{background:linear-gradient(135deg,#FF2D2D,#FF8A1E);color:#fff;padding:14px 16px;
  display:flex;align-items:center;gap:10px}
#sgt-agent-panel .sgt-agent-header .icon{width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,.2);
  display:flex;align-items:center;justify-content:center}
#sgt-agent-panel .sgt-agent-header .icon svg{width:20px;height:20px}
#sgt-agent-panel .sgt-agent-header .info{flex:1}
#sgt-agent-panel .sgt-agent-header .info .title{font-size:14px;font-weight:700}
#sgt-agent-panel .sgt-agent-header .info .status{font-size:11px;opacity:.9;display:flex;align-items:center;gap:4px}
#sgt-agent-panel .sgt-agent-header .info .status .dot{width:6px;height:6px;border-radius:50%;background:#22c55e}
#sgt-agent-panel .sgt-agent-header .close{background:none;border:none;color:#fff;cursor:pointer;padding:4px;opacity:.8}
#sgt-agent-panel .sgt-agent-header .close:hover{opacity:1}
#sgt-agent-panel .sgt-agent-header .close svg{width:18px;height:18px}
#sgt-agent-panel .sgt-agent-msgs{flex:1;overflow-y:auto;padding:14px;background:#FAF8F4;display:flex;flex-direction:column;gap:10px}
#sgt-agent-panel .sgt-msg{max-width:80%;padding:10px 14px;border-radius:14px;font-size:13px;line-height:1.5;white-space:pre-wrap}
#sgt-agent-panel .sgt-msg.agent{background:#fff;color:#1a1a1a;border-bottom-left-radius:4px;align-self:flex-start;
  box-shadow:0 1px 3px rgba(0,0,0,.08)}
#sgt-agent-panel .sgt-msg.user{background:linear-gradient(135deg,#FF2D2D,#FF8A1E);color:#fff;border-bottom-right-radius:4px;
  align-self:flex-end}
#sgt-agent-panel .sgt-msg .chips{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}
#sgt-agent-panel .sgt-msg .chip{background:#FFF0E8;color:#FF2D2D;border:1px solid #FFD9C8;border-radius:12px;
  padding:4px 10px;font-size:11px;cursor:pointer;transition:all .2s}
#sgt-agent-panel .sgt-msg .chip:hover{background:#FF2D2D;color:#fff}
#sgt-agent-panel .sgt-typing{display:flex;gap:4px;padding:10px 14px;align-self:flex-start;background:#fff;border-radius:14px;
  border-bottom-left-radius:4px;box-shadow:0 1px 3px rgba(0,0,0,.08)}
#sgt-agent-panel .sgt-typing span{width:6px;height:6px;border-radius:50%;background:#999;animation:sgt-bounce 1.4s infinite}
#sgt-agent-panel .sgt-typing span:nth-child(2){animation-delay:.2s}
#sgt-agent-panel .sgt-typing span:nth-child(3){animation-delay:.4s}
@keyframes sgt-bounce{0%,60%,100%{transform:translateY(0);opacity:.4}30%{transform:translateY(-6px);opacity:1}}
#sgt-agent-panel .sgt-agent-input{padding:12px;border-top:1px solid #eee;display:flex;gap:8px;background:#fff}
#sgt-agent-panel .sgt-agent-input input{flex:1;border:1px solid #e0e0e0;border-radius:12px;padding:10px 14px;font-size:13px;
  outline:none;transition:border-color .2s}
#sgt-agent-panel .sgt-agent-input input:focus{border-color:#FF2D2D}
#sgt-agent-panel .sgt-agent-input button{background:linear-gradient(135deg,#FF2D2D,#FF8A1E);color:#fff;border:none;
  border-radius:12px;padding:10px 14px;cursor:pointer;display:flex;align-items:center;justify-content:center}
#sgt-agent-panel .sgt-agent-input button:hover{opacity:.9}
#sgt-agent-panel .sgt-agent-input button svg{width:16px;height:16px}
#sgt-agent-panel .sgt-agent-input button:disabled{opacity:.5;cursor:not-allowed}
#sgt-agent-panel .sgt-wa-btn{background:#25D366!important}
@media(max-width:480px){#sgt-agent-panel{bottom:80px;right:10px;left:10px;width:auto;height:70vh}
  #sgt-agent-btn{width:52px;height:52px}
  #sgt-agent-panel .sgt-agent-input input{font-size:16px}}
/* Bus animation */
#sgt-agent-btn .bus-body{animation:sgt-bus-bounce .6s ease-in-out infinite}
#sgt-agent-btn .bus-wheels{animation:sgt-wheels-spin .4s linear infinite;transform-origin:center}
#sgt-agent-btn .bus-road{animation:sgt-road-move .5s linear infinite}
@keyframes sgt-bus-bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-2px)}}
@keyframes sgt-wheels-spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
@keyframes sgt-road-move{0%{transform:translateX(0)}100%{transform:translateX(-8px)}}
`;

  var BUS_SVG = '<svg viewBox="0 0 32 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
    '<g class="bus-body">' +
      '<rect x="3" y="4" width="22" height="12" rx="2" fill="rgba(255,255,255,0.15)"/>' +
      '<line x1="9" y1="4" x2="9" y2="10"/>' +
      '<line x1="15" y1="4" x2="15" y2="10"/>' +
      '<line x1="3" y1="10" x2="25" y2="10"/>' +
      '<rect x="5" y="5" width="3" height="3" rx="0.5" fill="rgba(255,255,255,0.3)" stroke="none"/>' +
      '<rect x="11" y="5" width="3" height="3" rx="0.5" fill="rgba(255,255,255,0.3)" stroke="none"/>' +
      '<rect x="17" y="5" width="3" height="3" rx="0.5" fill="rgba(255,255,255,0.3)" stroke="none"/>' +
      '<line x1="25" y1="8" x2="28" y2="8"/>' +
    '</g>' +
    '<g class="bus-wheels">' +
      '<circle cx="9" cy="18" r="2.5" fill="rgba(255,255,255,0.2)"/>' +
      '<line x1="9" y1="15.5" x2="9" y2="20.5" stroke-width="1"/>' +
      '<line x1="6.5" y1="18" x2="11.5" y2="18" stroke-width="1"/>' +
      '<circle cx="19" cy="18" r="2.5" fill="rgba(255,255,255,0.2)"/>' +
      '<line x1="19" y1="15.5" x2="19" y2="20.5" stroke-width="1"/>' +
      '<line x1="16.5" y1="18" x2="21.5" y2="18" stroke-width="1"/>' +
    '</g>' +
    '<g class="bus-road" stroke-dasharray="3 3">' +
      '<line x1="1" y1="22" x2="31" y2="22" stroke-width="1" opacity="0.5"/>' +
    '</g>' +
  '</svg>';
  var CLOSE_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>';
  var SEND_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>';
  var WA_SVG = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.6 6.32A7.85 7.85 0 0 0 12.05 4 7.94 7.94 0 0 0 4.1 11.9a7.84 7.84 0 0 0 1.06 3.95L4 20l4.25-1.11a7.86 7.86 0 0 0 3.79.96h.01a7.94 7.94 0 0 0 7.94-7.9 7.86 7.86 0 0 0-2.39-5.63Zm-5.55 12.18h-.01a6.5 6.5 0 0 1-3.32-.91l-.24-.14-2.49.65.66-2.43-.16-.25a6.46 6.46 0 0 1-1-3.46 6.5 6.5 0 0 1 6.5-6.49 6.43 6.43 0 0 1 4.59 1.91 6.45 6.45 0 0 1 1.9 4.59 6.5 6.5 0 0 1-6.49 6.49Z"/></svg>';

  // Inject styles once
  if (!document.getElementById('sgt-agent-styles')) {
    var style = document.createElement('style');
    style.id = 'sgt-agent-styles';
    style.textContent = css;
    (document.head || document.documentElement).appendChild(style);
  }

  var history = [];
  var isOpen = false;
  var greeted = false;

  // Build the widget HTML
  function buildWidget() {
    var wrap = document.createElement('div');
    wrap.id = 'sgt-agent-wrap';

    var btn = document.createElement('button');
    btn.id = 'sgt-agent-btn';
    btn.setAttribute('aria-label', 'Abrir asistente SG-Turismo');
    btn.innerHTML = BUS_SVG + '<span class="live-dot"></span>';

    var panel = document.createElement('div');
    panel.id = 'sgt-agent-panel';
    panel.innerHTML =
      '<div class="sgt-agent-header">' +
        '<div class="icon">' + BUS_SVG + '</div>' +
        '<div class="info">' +
          '<div class="title">SG-Turismo Asistente</div>' +
          '<div class="status"><span class="dot"></span> En vivo · Rutas, destinos, buses</div>' +
        '</div>' +
        '<button class="close" aria-label="Cerrar">' + CLOSE_SVG + '</button>' +
      '</div>' +
      '<div class="sgt-agent-msgs" id="sgtMsgs"></div>' +
      '<div class="sgt-agent-input">' +
        '<input type="text" id="sgtInput" placeholder="Escribe tu mensaje..." autocomplete="off">' +
        '<button id="sgtSend" aria-label="Enviar">' + SEND_SVG + '</button>' +
        '<button id="sgtWa" class="sgt-wa-btn" aria-label="WhatsApp">' + WA_SVG + '</button>' +
      '</div>';

    wrap.appendChild(btn);
    wrap.appendChild(panel);
    return wrap;
  }

  function attachListeners(wrap) {
    var btn = wrap.querySelector('#sgt-agent-btn');
    var panel = wrap.querySelector('#sgt-agent-panel');
    var closeBtn = wrap.querySelector('.close');
    var sendBtn = wrap.querySelector('#sgtSend');
    var waBtn = wrap.querySelector('#sgtWa');
    var inputEl = wrap.querySelector('#sgtInput');
    var msgsEl = wrap.querySelector('#sgtMsgs');

    btn.onclick = function(e) {
      e.stopPropagation();
      togglePanel(panel, inputEl, msgsEl);
    };
    if (closeBtn) closeBtn.onclick = function(e) {
      e.stopPropagation();
      togglePanel(panel, inputEl, msgsEl);
    };
    if (sendBtn) sendBtn.onclick = function(e) { e.stopPropagation(); sendMessage(panel, inputEl, sendBtn, msgsEl); };
    if (waBtn) waBtn.onclick = function(e) { e.stopPropagation(); window.open(WHATSAPP, '_blank'); };
    if (inputEl) {
      inputEl.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          sendMessage(panel, inputEl, sendBtn, msgsEl);
        }
      });
      inputEl.addEventListener('click', function(e) { e.stopPropagation(); });
    }
  }

  function togglePanel(panel, inputEl, msgsEl) {
    isOpen = !isOpen;
    panel.classList.toggle('open', isOpen);
    if (isOpen) {
      if (!greeted) {
        greeted = true;
        addMsg(msgsEl, 'agent', '¡Hola! Soy el asistente de SG-Turismo 🚌\n\nPuedo ayudarte con rutas, distancias, destinos y buses en Ecuador.\n\n¿A dónde quieres viajar?',
          ['Quito → Baños', 'Quito → Cuenca', 'Destinos populares', 'Ver flota']);
      }
      if (inputEl) setTimeout(function() { inputEl.focus(); }, 100);
    }
  }

  function addMsg(msgsEl, role, text, chips) {
    if (!msgsEl) return;
    var div = document.createElement('div');
    div.className = 'sgt-msg ' + role;
    var html = escapeHtml(text);
    if (chips && chips.length) {
      html += '<div class="chips">' + chips.map(function (c) {
        return '<span class="chip">' + escapeHtml(c) + '</span>';
      }).join('') + '</div>';
    }
    div.innerHTML = html;
    if (chips && chips.length) {
      div.querySelectorAll('.chip').forEach(function (chip, i) {
        chip.onclick = function() {
          var inputEl = document.getElementById('sgtInput');
          if (inputEl) {
            inputEl.value = chips[i];
            var sendBtn = document.getElementById('sgtSend');
            var panel = document.getElementById('sgt-agent-panel');
            sendMessage(panel, inputEl, sendBtn, msgsEl);
          }
        };
      });
    }
    msgsEl.appendChild(div);
    msgsEl.scrollTop = msgsEl.scrollHeight;
    if (role === 'user' || role === 'agent') {
      history.push({ role: role, text: text, chips: chips });
      try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(-20))); } catch (e) {}
    }
  }

  function showTyping(msgsEl) {
    if (!msgsEl) return;
    var existing = document.getElementById('sgtTyping');
    if (existing) existing.remove();
    var div = document.createElement('div');
    div.className = 'sgt-typing';
    div.id = 'sgtTyping';
    div.innerHTML = '<span></span><span></span><span></span>';
    msgsEl.appendChild(div);
    msgsEl.scrollTop = msgsEl.scrollHeight;
  }

  function hideTyping() {
    var t = document.getElementById('sgtTyping');
    if (t) t.remove();
  }

  function sendMessage(panel, inputEl, sendBtn, msgsEl) {
    if (!inputEl) return;
    var text = inputEl.value.trim();
    if (!text) return;
    addMsg(msgsEl, 'user', text);
    inputEl.value = '';
    if (sendBtn) sendBtn.disabled = true;
    showTyping(msgsEl);
    fetch(WORKER_URL + '/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, history: history.slice(-10) })
    })
    .then(function (r) { return r.json(); })
    .then(function (data) {
      hideTyping();
      addMsg(msgsEl, 'agent', data.response || 'Disculpa, no pude procesar tu solicitud.', data.chips);
      if (sendBtn) sendBtn.disabled = false;
      if (inputEl) inputEl.focus();
    })
    .catch(function () {
      hideTyping();
      addMsg(msgsEl, 'agent', 'En este momento no puedo responder. Escríbenos por WhatsApp para atención inmediata.',
        ['Abrir WhatsApp']);
      var chip = msgsEl.querySelector('.sgt-msg:last-child .chip');
      if (chip) chip.onclick = function () { window.open(WHATSAPP, '_blank'); };
      if (sendBtn) sendBtn.disabled = false;
    });
  }

  function escapeHtml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // AGGRESSIVE RE-INJECTION: check every 200ms and re-inject if removed
  function ensureWidget() {
    var existing = document.getElementById('sgt-agent-wrap');
    if (!existing) {
      var wrap = buildWidget();
      // Append to documentElement (html) to be above React's body management
      (document.body || document.documentElement).appendChild(wrap);
      attachListeners(wrap);
    }
  }

  // Start immediately and keep checking
  ensureWidget();
  setInterval(ensureWidget, 200);

  // Also check on various events
  document.addEventListener('DOMContentLoaded', ensureWidget);
  window.addEventListener('load', ensureWidget);
  document.addEventListener('readystatechange', ensureWidget);
})();
