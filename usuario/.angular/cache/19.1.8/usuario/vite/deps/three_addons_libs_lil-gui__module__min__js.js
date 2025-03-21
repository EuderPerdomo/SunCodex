import "./chunk-TXDUYLVM.js";

// node_modules/three/examples/jsm/libs/lil-gui.module.min.js
var t = class _t {
  constructor(i2, e2, s2, n2, l2 = "div") {
    this.parent = i2, this.object = e2, this.property = s2, this._disabled = false, this._hidden = false, this.initialValue = this.getValue(), this.domElement = document.createElement("div"), this.domElement.classList.add("controller"), this.domElement.classList.add(n2), this.$name = document.createElement("div"), this.$name.classList.add("name"), _t.nextNameID = _t.nextNameID || 0, this.$name.id = "lil-gui-name-" + ++_t.nextNameID, this.$widget = document.createElement(l2), this.$widget.classList.add("widget"), this.$disable = this.$widget, this.domElement.appendChild(this.$name), this.domElement.appendChild(this.$widget), this.parent.children.push(this), this.parent.controllers.push(this), this.parent.$children.appendChild(this.domElement), this._listenCallback = this._listenCallback.bind(this), this.name(s2);
  }
  name(t2) {
    return this._name = t2, this.$name.innerHTML = t2, this;
  }
  onChange(t2) {
    return this._onChange = t2, this;
  }
  _callOnChange() {
    this.parent._callOnChange(this), void 0 !== this._onChange && this._onChange.call(this, this.getValue()), this._changed = true;
  }
  onFinishChange(t2) {
    return this._onFinishChange = t2, this;
  }
  _callOnFinishChange() {
    this._changed && (this.parent._callOnFinishChange(this), void 0 !== this._onFinishChange && this._onFinishChange.call(this, this.getValue())), this._changed = false;
  }
  reset() {
    return this.setValue(this.initialValue), this._callOnFinishChange(), this;
  }
  enable(t2 = true) {
    return this.disable(!t2);
  }
  disable(t2 = true) {
    return t2 === this._disabled || (this._disabled = t2, this.domElement.classList.toggle("disabled", t2), this.$disable.toggleAttribute("disabled", t2)), this;
  }
  show(t2 = true) {
    return this._hidden = !t2, this.domElement.style.display = this._hidden ? "none" : "", this;
  }
  hide() {
    return this.show(false);
  }
  options(t2) {
    const i2 = this.parent.add(this.object, this.property, t2);
    return i2.name(this._name), this.destroy(), i2;
  }
  min(t2) {
    return this;
  }
  max(t2) {
    return this;
  }
  step(t2) {
    return this;
  }
  decimals(t2) {
    return this;
  }
  listen(t2 = true) {
    return this._listening = t2, void 0 !== this._listenCallbackID && (cancelAnimationFrame(this._listenCallbackID), this._listenCallbackID = void 0), this._listening && this._listenCallback(), this;
  }
  _listenCallback() {
    this._listenCallbackID = requestAnimationFrame(this._listenCallback);
    const t2 = this.save();
    t2 !== this._listenPrevValue && this.updateDisplay(), this._listenPrevValue = t2;
  }
  getValue() {
    return this.object[this.property];
  }
  setValue(t2) {
    return this.object[this.property] = t2, this._callOnChange(), this.updateDisplay(), this;
  }
  updateDisplay() {
    return this;
  }
  load(t2) {
    return this.setValue(t2), this._callOnFinishChange(), this;
  }
  save() {
    return this.getValue();
  }
  destroy() {
    this.listen(false), this.parent.children.splice(this.parent.children.indexOf(this), 1), this.parent.controllers.splice(this.parent.controllers.indexOf(this), 1), this.parent.$children.removeChild(this.domElement);
  }
};
var i = class extends t {
  constructor(t2, i2, e2) {
    super(t2, i2, e2, "boolean", "label"), this.$input = document.createElement("input"), this.$input.setAttribute("type", "checkbox"), this.$input.setAttribute("aria-labelledby", this.$name.id), this.$widget.appendChild(this.$input), this.$input.addEventListener("change", () => {
      this.setValue(this.$input.checked), this._callOnFinishChange();
    }), this.$disable = this.$input, this.updateDisplay();
  }
  updateDisplay() {
    return this.$input.checked = this.getValue(), this;
  }
};
function e(t2) {
  let i2, e2;
  return (i2 = t2.match(/(#|0x)?([a-f0-9]{6})/i)) ? e2 = i2[2] : (i2 = t2.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/)) ? e2 = parseInt(i2[1]).toString(16).padStart(2, 0) + parseInt(i2[2]).toString(16).padStart(2, 0) + parseInt(i2[3]).toString(16).padStart(2, 0) : (i2 = t2.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i)) && (e2 = i2[1] + i2[1] + i2[2] + i2[2] + i2[3] + i2[3]), !!e2 && "#" + e2;
}
var s = {
  isPrimitive: true,
  match: (t2) => "string" == typeof t2,
  fromHexString: e,
  toHexString: e
};
var n = {
  isPrimitive: true,
  match: (t2) => "number" == typeof t2,
  fromHexString: (t2) => parseInt(t2.substring(1), 16),
  toHexString: (t2) => "#" + t2.toString(16).padStart(6, 0)
};
var l = {
  isPrimitive: false,
  match: Array.isArray,
  fromHexString(t2, i2, e2 = 1) {
    const s2 = n.fromHexString(t2);
    i2[0] = (s2 >> 16 & 255) / 255 * e2, i2[1] = (s2 >> 8 & 255) / 255 * e2, i2[2] = (255 & s2) / 255 * e2;
  },
  toHexString: ([t2, i2, e2], s2 = 1) => n.toHexString(t2 * (s2 = 255 / s2) << 16 ^ i2 * s2 << 8 ^ e2 * s2 << 0)
};
var r = {
  isPrimitive: false,
  match: (t2) => Object(t2) === t2,
  fromHexString(t2, i2, e2 = 1) {
    const s2 = n.fromHexString(t2);
    i2.r = (s2 >> 16 & 255) / 255 * e2, i2.g = (s2 >> 8 & 255) / 255 * e2, i2.b = (255 & s2) / 255 * e2;
  },
  toHexString: ({
    r: t2,
    g: i2,
    b: e2
  }, s2 = 1) => n.toHexString(t2 * (s2 = 255 / s2) << 16 ^ i2 * s2 << 8 ^ e2 * s2 << 0)
};
var o = [s, n, l, r];
var a = class extends t {
  constructor(t2, i2, s2, n2) {
    var l2;
    super(t2, i2, s2, "color"), this.$input = document.createElement("input"), this.$input.setAttribute("type", "color"), this.$input.setAttribute("tabindex", -1), this.$input.setAttribute("aria-labelledby", this.$name.id), this.$text = document.createElement("input"), this.$text.setAttribute("type", "text"), this.$text.setAttribute("spellcheck", "false"), this.$text.setAttribute("aria-labelledby", this.$name.id), this.$display = document.createElement("div"), this.$display.classList.add("display"), this.$display.appendChild(this.$input), this.$widget.appendChild(this.$display), this.$widget.appendChild(this.$text), this._format = (l2 = this.initialValue, o.find((t3) => t3.match(l2))), this._rgbScale = n2, this._initialValueHexString = this.save(), this._textFocused = false, this.$input.addEventListener("input", () => {
      this._setValueFromHexString(this.$input.value);
    }), this.$input.addEventListener("blur", () => {
      this._callOnFinishChange();
    }), this.$text.addEventListener("input", () => {
      const t3 = e(this.$text.value);
      t3 && this._setValueFromHexString(t3);
    }), this.$text.addEventListener("focus", () => {
      this._textFocused = true, this.$text.select();
    }), this.$text.addEventListener("blur", () => {
      this._textFocused = false, this.updateDisplay(), this._callOnFinishChange();
    }), this.$disable = this.$text, this.updateDisplay();
  }
  reset() {
    return this._setValueFromHexString(this._initialValueHexString), this;
  }
  _setValueFromHexString(t2) {
    if (this._format.isPrimitive) {
      const i2 = this._format.fromHexString(t2);
      this.setValue(i2);
    } else this._format.fromHexString(t2, this.getValue(), this._rgbScale), this._callOnChange(), this.updateDisplay();
  }
  save() {
    return this._format.toHexString(this.getValue(), this._rgbScale);
  }
  load(t2) {
    return this._setValueFromHexString(t2), this._callOnFinishChange(), this;
  }
  updateDisplay() {
    return this.$input.value = this._format.toHexString(this.getValue(), this._rgbScale), this._textFocused || (this.$text.value = this.$input.value.substring(1)), this.$display.style.backgroundColor = this.$input.value, this;
  }
};
var h = class extends t {
  constructor(t2, i2, e2) {
    super(t2, i2, e2, "function"), this.$button = document.createElement("button"), this.$button.appendChild(this.$name), this.$widget.appendChild(this.$button), this.$button.addEventListener("click", (t3) => {
      t3.preventDefault(), this.getValue().call(this.object);
    }), this.$button.addEventListener("touchstart", () => {
    }, {
      passive: true
    }), this.$disable = this.$button;
  }
};
var d = class extends t {
  constructor(t2, i2, e2, s2, n2, l2) {
    super(t2, i2, e2, "number"), this._initInput(), this.min(s2), this.max(n2);
    const r2 = void 0 !== l2;
    this.step(r2 ? l2 : this._getImplicitStep(), r2), this.updateDisplay();
  }
  decimals(t2) {
    return this._decimals = t2, this.updateDisplay(), this;
  }
  min(t2) {
    return this._min = t2, this._onUpdateMinMax(), this;
  }
  max(t2) {
    return this._max = t2, this._onUpdateMinMax(), this;
  }
  step(t2, i2 = true) {
    return this._step = t2, this._stepExplicit = i2, this;
  }
  updateDisplay() {
    const t2 = this.getValue();
    if (this._hasSlider) {
      let i2 = (t2 - this._min) / (this._max - this._min);
      i2 = Math.max(0, Math.min(i2, 1)), this.$fill.style.width = 100 * i2 + "%";
    }
    return this._inputFocused || (this.$input.value = void 0 === this._decimals ? t2 : t2.toFixed(this._decimals)), this;
  }
  _initInput() {
    this.$input = document.createElement("input"), this.$input.setAttribute("type", "number"), this.$input.setAttribute("step", "any"), this.$input.setAttribute("aria-labelledby", this.$name.id), this.$widget.appendChild(this.$input), this.$disable = this.$input;
    const t2 = (t3) => {
      const i3 = parseFloat(this.$input.value);
      isNaN(i3) || (this._snapClampSetValue(i3 + t3), this.$input.value = this.getValue());
    };
    let i2, e2, s2, n2, l2, r2 = false;
    const o2 = (t3) => {
      if (r2) {
        const s3 = t3.clientX - i2, n3 = t3.clientY - e2;
        Math.abs(n3) > 5 ? (t3.preventDefault(), this.$input.blur(), r2 = false, this._setDraggingStyle(true, "vertical")) : Math.abs(s3) > 5 && a2();
      }
      if (!r2) {
        const i3 = t3.clientY - s2;
        l2 -= i3 * this._step * this._arrowKeyMultiplier(t3), n2 + l2 > this._max ? l2 = this._max - n2 : n2 + l2 < this._min && (l2 = this._min - n2), this._snapClampSetValue(n2 + l2);
      }
      s2 = t3.clientY;
    }, a2 = () => {
      this._setDraggingStyle(false, "vertical"), this._callOnFinishChange(), window.removeEventListener("mousemove", o2), window.removeEventListener("mouseup", a2);
    };
    this.$input.addEventListener("input", () => {
      let t3 = parseFloat(this.$input.value);
      isNaN(t3) || (this._stepExplicit && (t3 = this._snap(t3)), this.setValue(this._clamp(t3)));
    }), this.$input.addEventListener("keydown", (i3) => {
      "Enter" === i3.code && this.$input.blur(), "ArrowUp" === i3.code && (i3.preventDefault(), t2(this._step * this._arrowKeyMultiplier(i3))), "ArrowDown" === i3.code && (i3.preventDefault(), t2(this._step * this._arrowKeyMultiplier(i3) * -1));
    }), this.$input.addEventListener("wheel", (i3) => {
      this._inputFocused && (i3.preventDefault(), t2(this._step * this._normalizeMouseWheel(i3)));
    }, {
      passive: false
    }), this.$input.addEventListener("mousedown", (t3) => {
      i2 = t3.clientX, e2 = s2 = t3.clientY, r2 = true, n2 = this.getValue(), l2 = 0, window.addEventListener("mousemove", o2), window.addEventListener("mouseup", a2);
    }), this.$input.addEventListener("focus", () => {
      this._inputFocused = true;
    }), this.$input.addEventListener("blur", () => {
      this._inputFocused = false, this.updateDisplay(), this._callOnFinishChange();
    });
  }
  _initSlider() {
    this._hasSlider = true, this.$slider = document.createElement("div"), this.$slider.classList.add("slider"), this.$fill = document.createElement("div"), this.$fill.classList.add("fill"), this.$slider.appendChild(this.$fill), this.$widget.insertBefore(this.$slider, this.$input), this.domElement.classList.add("hasSlider");
    const t2 = (t3) => {
      const i3 = this.$slider.getBoundingClientRect();
      let e3 = (s3 = t3, n3 = i3.left, l3 = i3.right, r3 = this._min, o3 = this._max, (s3 - n3) / (l3 - n3) * (o3 - r3) + r3);
      var s3, n3, l3, r3, o3;
      this._snapClampSetValue(e3);
    }, i2 = (i3) => {
      t2(i3.clientX);
    }, e2 = () => {
      this._callOnFinishChange(), this._setDraggingStyle(false), window.removeEventListener("mousemove", i2), window.removeEventListener("mouseup", e2);
    };
    let s2, n2, l2 = false;
    const r2 = (i3) => {
      i3.preventDefault(), this._setDraggingStyle(true), t2(i3.touches[0].clientX), l2 = false;
    }, o2 = (i3) => {
      if (l2) {
        const t3 = i3.touches[0].clientX - s2, e3 = i3.touches[0].clientY - n2;
        Math.abs(t3) > Math.abs(e3) ? r2(i3) : (window.removeEventListener("touchmove", o2), window.removeEventListener("touchend", a2));
      } else i3.preventDefault(), t2(i3.touches[0].clientX);
    }, a2 = () => {
      this._callOnFinishChange(), this._setDraggingStyle(false), window.removeEventListener("touchmove", o2), window.removeEventListener("touchend", a2);
    }, h2 = this._callOnFinishChange.bind(this);
    let d2;
    this.$slider.addEventListener("mousedown", (s3) => {
      this._setDraggingStyle(true), t2(s3.clientX), window.addEventListener("mousemove", i2), window.addEventListener("mouseup", e2);
    }), this.$slider.addEventListener("touchstart", (t3) => {
      t3.touches.length > 1 || (this._hasScrollBar ? (s2 = t3.touches[0].clientX, n2 = t3.touches[0].clientY, l2 = true) : r2(t3), window.addEventListener("touchmove", o2, {
        passive: false
      }), window.addEventListener("touchend", a2));
    }, {
      passive: false
    }), this.$slider.addEventListener("wheel", (t3) => {
      if (Math.abs(t3.deltaX) < Math.abs(t3.deltaY) && this._hasScrollBar) return;
      t3.preventDefault();
      const i3 = this._normalizeMouseWheel(t3) * this._step;
      this._snapClampSetValue(this.getValue() + i3), this.$input.value = this.getValue(), clearTimeout(d2), d2 = setTimeout(h2, 400);
    }, {
      passive: false
    });
  }
  _setDraggingStyle(t2, i2 = "horizontal") {
    this.$slider && this.$slider.classList.toggle("active", t2), document.body.classList.toggle("lil-gui-dragging", t2), document.body.classList.toggle("lil-gui-" + i2, t2);
  }
  _getImplicitStep() {
    return this._hasMin && this._hasMax ? (this._max - this._min) / 1e3 : 0.1;
  }
  _onUpdateMinMax() {
    !this._hasSlider && this._hasMin && this._hasMax && (this._stepExplicit || this.step(this._getImplicitStep(), false), this._initSlider(), this.updateDisplay());
  }
  _normalizeMouseWheel(t2) {
    let {
      deltaX: i2,
      deltaY: e2
    } = t2;
    Math.floor(t2.deltaY) !== t2.deltaY && t2.wheelDelta && (i2 = 0, e2 = -t2.wheelDelta / 120, e2 *= this._stepExplicit ? 1 : 10);
    return i2 + -e2;
  }
  _arrowKeyMultiplier(t2) {
    let i2 = this._stepExplicit ? 1 : 10;
    return t2.shiftKey ? i2 *= 10 : t2.altKey && (i2 /= 10), i2;
  }
  _snap(t2) {
    const i2 = Math.round(t2 / this._step) * this._step;
    return parseFloat(i2.toPrecision(15));
  }
  _clamp(t2) {
    return t2 < this._min && (t2 = this._min), t2 > this._max && (t2 = this._max), t2;
  }
  _snapClampSetValue(t2) {
    this.setValue(this._clamp(this._snap(t2)));
  }
  get _hasScrollBar() {
    const t2 = this.parent.root.$children;
    return t2.scrollHeight > t2.clientHeight;
  }
  get _hasMin() {
    return void 0 !== this._min;
  }
  get _hasMax() {
    return void 0 !== this._max;
  }
};
var c = class extends t {
  constructor(t2, i2, e2, s2) {
    super(t2, i2, e2, "option"), this.$select = document.createElement("select"), this.$select.setAttribute("aria-labelledby", this.$name.id), this.$display = document.createElement("div"), this.$display.classList.add("display"), this._values = Array.isArray(s2) ? s2 : Object.values(s2), this._names = Array.isArray(s2) ? s2 : Object.keys(s2), this._names.forEach((t3) => {
      const i3 = document.createElement("option");
      i3.innerHTML = t3, this.$select.appendChild(i3);
    }), this.$select.addEventListener("change", () => {
      this.setValue(this._values[this.$select.selectedIndex]), this._callOnFinishChange();
    }), this.$select.addEventListener("focus", () => {
      this.$display.classList.add("focus");
    }), this.$select.addEventListener("blur", () => {
      this.$display.classList.remove("focus");
    }), this.$widget.appendChild(this.$select), this.$widget.appendChild(this.$display), this.$disable = this.$select, this.updateDisplay();
  }
  updateDisplay() {
    const t2 = this.getValue(), i2 = this._values.indexOf(t2);
    return this.$select.selectedIndex = i2, this.$display.innerHTML = -1 === i2 ? t2 : this._names[i2], this;
  }
};
var u = class extends t {
  constructor(t2, i2, e2) {
    super(t2, i2, e2, "string"), this.$input = document.createElement("input"), this.$input.setAttribute("type", "text"), this.$input.setAttribute("aria-labelledby", this.$name.id), this.$input.addEventListener("input", () => {
      this.setValue(this.$input.value);
    }), this.$input.addEventListener("keydown", (t3) => {
      "Enter" === t3.code && this.$input.blur();
    }), this.$input.addEventListener("blur", () => {
      this._callOnFinishChange();
    }), this.$widget.appendChild(this.$input), this.$disable = this.$input, this.updateDisplay();
  }
  updateDisplay() {
    return this.$input.value = this.getValue(), this;
  }
};
var p = false;
var g = class _g {
  constructor({
    parent: t2,
    autoPlace: i2 = void 0 === t2,
    container: e2,
    width: s2,
    title: n2 = "Controls",
    injectStyles: l2 = true,
    touchStyles: r2 = true
  } = {}) {
    if (this.parent = t2, this.root = t2 ? t2.root : this, this.children = [], this.controllers = [], this.folders = [], this._closed = false, this._hidden = false, this.domElement = document.createElement("div"), this.domElement.classList.add("lil-gui"), this.$title = document.createElement("div"), this.$title.classList.add("title"), this.$title.setAttribute("role", "button"), this.$title.setAttribute("aria-expanded", true), this.$title.setAttribute("tabindex", 0), this.$title.addEventListener("click", () => this.openAnimated(this._closed)), this.$title.addEventListener("keydown", (t3) => {
      "Enter" !== t3.code && "Space" !== t3.code || (t3.preventDefault(), this.$title.click());
    }), this.$title.addEventListener("touchstart", () => {
    }, {
      passive: true
    }), this.$children = document.createElement("div"), this.$children.classList.add("children"), this.domElement.appendChild(this.$title), this.domElement.appendChild(this.$children), this.title(n2), r2 && this.domElement.classList.add("allow-touch-styles"), this.parent) return this.parent.children.push(this), this.parent.folders.push(this), void this.parent.$children.appendChild(this.domElement);
    this.domElement.classList.add("root"), !p && l2 && (!function(t3) {
      const i3 = document.createElement("style");
      i3.innerHTML = t3;
      const e3 = document.querySelector("head link[rel=stylesheet], head style");
      e3 ? document.head.insertBefore(i3, e3) : document.head.appendChild(i3);
    }('.lil-gui{--background-color:#1f1f1f;--text-color:#ebebeb;--title-background-color:#111;--title-text-color:#ebebeb;--widget-color:#424242;--hover-color:#4f4f4f;--focus-color:#595959;--number-color:#2cc9ff;--string-color:#a2db3c;--font-size:11px;--input-font-size:11px;--font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;--font-family-mono:Menlo,Monaco,Consolas,"Droid Sans Mono",monospace;--padding:4px;--spacing:4px;--widget-height:20px;--name-width:45%;--slider-knob-width:2px;--slider-input-width:27%;--color-input-width:27%;--slider-input-min-width:45px;--color-input-min-width:45px;--folder-indent:7px;--widget-padding:0 0 0 3px;--widget-border-radius:2px;--checkbox-size:calc(var(--widget-height)*0.75);--scrollbar-width:5px;background-color:var(--background-color);color:var(--text-color);font-family:var(--font-family);font-size:var(--font-size);font-style:normal;font-weight:400;line-height:1;text-align:left;touch-action:manipulation;user-select:none;-webkit-user-select:none}.lil-gui,.lil-gui *{box-sizing:border-box;margin:0;padding:0}.lil-gui.root{display:flex;flex-direction:column;width:var(--width,245px)}.lil-gui.root>.title{background:var(--title-background-color);color:var(--title-text-color)}.lil-gui.root>.children{overflow-x:hidden;overflow-y:auto}.lil-gui.root>.children::-webkit-scrollbar{background:var(--background-color);height:var(--scrollbar-width);width:var(--scrollbar-width)}.lil-gui.root>.children::-webkit-scrollbar-thumb{background:var(--focus-color);border-radius:var(--scrollbar-width)}.lil-gui.force-touch-styles{--widget-height:28px;--padding:6px;--spacing:6px;--font-size:13px;--input-font-size:16px;--folder-indent:10px;--scrollbar-width:7px;--slider-input-min-width:50px;--color-input-min-width:65px}.lil-gui.autoPlace{max-height:100%;position:fixed;right:15px;top:0;z-index:1001}.lil-gui .controller{align-items:center;display:flex;margin:var(--spacing) 0;padding:0 var(--padding)}.lil-gui .controller.disabled{opacity:.5}.lil-gui .controller.disabled,.lil-gui .controller.disabled *{pointer-events:none!important}.lil-gui .controller>.name{flex-shrink:0;line-height:var(--widget-height);min-width:var(--name-width);padding-right:var(--spacing);white-space:pre}.lil-gui .controller .widget{align-items:center;display:flex;min-height:var(--widget-height);position:relative;width:100%}.lil-gui .controller.string input{color:var(--string-color)}.lil-gui .controller.boolean .widget{cursor:pointer}.lil-gui .controller.color .display{border-radius:var(--widget-border-radius);height:var(--widget-height);position:relative;width:100%}.lil-gui .controller.color input[type=color]{cursor:pointer;height:100%;opacity:0;width:100%}.lil-gui .controller.color input[type=text]{flex-shrink:0;font-family:var(--font-family-mono);margin-left:var(--spacing);min-width:var(--color-input-min-width);width:var(--color-input-width)}.lil-gui .controller.option select{max-width:100%;opacity:0;position:absolute;width:100%}.lil-gui .controller.option .display{background:var(--widget-color);border-radius:var(--widget-border-radius);height:var(--widget-height);line-height:var(--widget-height);max-width:100%;overflow:hidden;padding-left:.55em;padding-right:1.75em;pointer-events:none;position:relative;word-break:break-all}.lil-gui .controller.option .display.active{background:var(--focus-color)}.lil-gui .controller.option .display:after{bottom:0;content:"↕";font-family:lil-gui;padding-right:.375em;position:absolute;right:0;top:0}.lil-gui .controller.option .widget,.lil-gui .controller.option select{cursor:pointer}.lil-gui .controller.number input{color:var(--number-color)}.lil-gui .controller.number.hasSlider input{flex-shrink:0;margin-left:var(--spacing);min-width:var(--slider-input-min-width);width:var(--slider-input-width)}.lil-gui .controller.number .slider{background-color:var(--widget-color);border-radius:var(--widget-border-radius);cursor:ew-resize;height:var(--widget-height);overflow:hidden;padding-right:var(--slider-knob-width);touch-action:pan-y;width:100%}.lil-gui .controller.number .slider.active{background-color:var(--focus-color)}.lil-gui .controller.number .slider.active .fill{opacity:.95}.lil-gui .controller.number .fill{border-right:var(--slider-knob-width) solid var(--number-color);box-sizing:content-box;height:100%}.lil-gui-dragging .lil-gui{--hover-color:var(--widget-color)}.lil-gui-dragging *{cursor:ew-resize!important}.lil-gui-dragging.lil-gui-vertical *{cursor:ns-resize!important}.lil-gui .title{--title-height:calc(var(--widget-height) + var(--spacing)*1.25);-webkit-tap-highlight-color:transparent;text-decoration-skip:objects;cursor:pointer;font-weight:600;height:var(--title-height);line-height:calc(var(--title-height) - 4px);outline:none;padding:0 var(--padding)}.lil-gui .title:before{content:"▾";display:inline-block;font-family:lil-gui;padding-right:2px}.lil-gui .title:active{background:var(--title-background-color);opacity:.75}.lil-gui.root>.title:focus{text-decoration:none!important}.lil-gui.closed>.title:before{content:"▸"}.lil-gui.closed>.children{opacity:0;transform:translateY(-7px)}.lil-gui.closed:not(.transition)>.children{display:none}.lil-gui.transition>.children{overflow:hidden;pointer-events:none;transition-duration:.3s;transition-property:height,opacity,transform;transition-timing-function:cubic-bezier(.2,.6,.35,1)}.lil-gui .children:empty:before{content:"Empty";display:block;font-style:italic;height:var(--widget-height);line-height:var(--widget-height);margin:var(--spacing) 0;opacity:.5;padding:0 var(--padding)}.lil-gui.root>.children>.lil-gui>.title{border-width:0;border-bottom:1px solid var(--widget-color);border-left:0 solid var(--widget-color);border-right:0 solid var(--widget-color);border-top:1px solid var(--widget-color);transition:border-color .3s}.lil-gui.root>.children>.lil-gui.closed>.title{border-bottom-color:transparent}.lil-gui+.controller{border-top:1px solid var(--widget-color);margin-top:0;padding-top:var(--spacing)}.lil-gui .lil-gui .lil-gui>.title{border:none}.lil-gui .lil-gui .lil-gui>.children{border:none;border-left:2px solid var(--widget-color);margin-left:var(--folder-indent)}.lil-gui .lil-gui .controller{border:none}.lil-gui input{-webkit-tap-highlight-color:transparent;background:var(--widget-color);border:0;border-radius:var(--widget-border-radius);color:var(--text-color);font-family:var(--font-family);font-size:var(--input-font-size);height:var(--widget-height);outline:none;width:100%}.lil-gui input:disabled{opacity:1}.lil-gui input[type=number],.lil-gui input[type=text]{padding:var(--widget-padding)}.lil-gui input[type=number]:focus,.lil-gui input[type=text]:focus{background:var(--focus-color)}.lil-gui input::-webkit-inner-spin-button,.lil-gui input::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}.lil-gui input[type=number]{-moz-appearance:textfield}.lil-gui input[type=checkbox]{appearance:none;-webkit-appearance:none;border-radius:var(--widget-border-radius);cursor:pointer;height:var(--checkbox-size);text-align:center;width:var(--checkbox-size)}.lil-gui input[type=checkbox]:checked:before{content:"✓";font-family:lil-gui;font-size:var(--checkbox-size);line-height:var(--checkbox-size)}.lil-gui button{-webkit-tap-highlight-color:transparent;background:var(--widget-color);border:1px solid var(--widget-color);border-radius:var(--widget-border-radius);color:var(--text-color);cursor:pointer;font-family:var(--font-family);font-size:var(--font-size);height:var(--widget-height);line-height:calc(var(--widget-height) - 4px);outline:none;text-align:center;text-transform:none;width:100%}.lil-gui button:active{background:var(--focus-color)}@font-face{font-family:lil-gui;src:url("data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAUsAAsAAAAACJwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAAH4AAADAImwmYE9TLzIAAAGIAAAAPwAAAGBKqH5SY21hcAAAAcgAAAD0AAACrukyyJBnbHlmAAACvAAAAF8AAACEIZpWH2hlYWQAAAMcAAAAJwAAADZfcj2zaGhlYQAAA0QAAAAYAAAAJAC5AHhobXR4AAADXAAAABAAAABMAZAAAGxvY2EAAANsAAAAFAAAACgCEgIybWF4cAAAA4AAAAAeAAAAIAEfABJuYW1lAAADoAAAASIAAAIK9SUU/XBvc3QAAATEAAAAZgAAAJCTcMc2eJxVjbEOgjAURU+hFRBK1dGRL+ALnAiToyMLEzFpnPz/eAshwSa97517c/MwwJmeB9kwPl+0cf5+uGPZXsqPu4nvZabcSZldZ6kfyWnomFY/eScKqZNWupKJO6kXN3K9uCVoL7iInPr1X5baXs3tjuMqCtzEuagm/AAlzQgPAAB4nGNgYRBlnMDAysDAYM/gBiT5oLQBAwuDJAMDEwMrMwNWEJDmmsJwgCFeXZghBcjlZMgFCzOiKOIFAB71Bb8AeJy1kjFuwkAQRZ+DwRAwBtNQRUGKQ8OdKCAWUhAgKLhIuAsVSpWz5Bbkj3dEgYiUIszqWdpZe+Z7/wB1oCYmIoboiwiLT2WjKl/jscrHfGg/pKdMkyklC5Zs2LEfHYpjcRoPzme9MWWmk3dWbK9ObkWkikOetJ554fWyoEsmdSlt+uR0pCJR34b6t/TVg1SY3sYvdf8vuiKrpyaDXDISiegp17p7579Gp3p++y7HPAiY9pmTibljrr85qSidtlg4+l25GLCaS8e6rRxNBmsnERunKbaOObRz7N72ju5vdAjYpBXHgJylOAVsMseDAPEP8LYoUHicY2BiAAEfhiAGJgZWBgZ7RnFRdnVJELCQlBSRlATJMoLV2DK4glSYs6ubq5vbKrJLSbGrgEmovDuDJVhe3VzcXFwNLCOILB/C4IuQ1xTn5FPilBTj5FPmBAB4WwoqAHicY2BkYGAA4sk1sR/j+W2+MnAzpDBgAyEMQUCSg4EJxAEAwUgFHgB4nGNgZGBgSGFggJMhDIwMqEAYAByHATJ4nGNgAIIUNEwmAABl3AGReJxjYAACIQYlBiMGJ3wQAEcQBEV4nGNgZGBgEGZgY2BiAAEQyQWEDAz/wXwGAAsPATIAAHicXdBNSsNAHAXwl35iA0UQXYnMShfS9GPZA7T7LgIu03SSpkwzYTIt1BN4Ak/gKTyAeCxfw39jZkjymzcvAwmAW/wgwHUEGDb36+jQQ3GXGot79L24jxCP4gHzF/EIr4jEIe7wxhOC3g2TMYy4Q7+Lu/SHuEd/ivt4wJd4wPxbPEKMX3GI5+DJFGaSn4qNzk8mcbKSR6xdXdhSzaOZJGtdapd4vVPbi6rP+cL7TGXOHtXKll4bY1Xl7EGnPtp7Xy2n00zyKLVHfkHBa4IcJ2oD3cgggWvt/V/FbDrUlEUJhTn/0azVWbNTNr0Ens8de1tceK9xZmfB1CPjOmPH4kitmvOubcNpmVTN3oFJyjzCvnmrwhJTzqzVj9jiSX911FjeAAB4nG3HMRKCMBBA0f0giiKi4DU8k0V2GWbIZDOh4PoWWvq6J5V8If9NVNQcaDhyouXMhY4rPTcG7jwYmXhKq8Wz+p762aNaeYXom2n3m2dLTVgsrCgFJ7OTmIkYbwIbC6vIB7WmFfAAAA==") format("woff")}@media (pointer:coarse){.lil-gui.allow-touch-styles{--widget-height:28px;--padding:6px;--spacing:6px;--font-size:13px;--input-font-size:16px;--folder-indent:10px;--scrollbar-width:7px;--slider-input-min-width:50px;--color-input-min-width:65px}}@media (hover:hover){.lil-gui .controller.color .display:hover:before{border:1px solid #fff9;border-radius:var(--widget-border-radius);bottom:0;content:" ";display:block;left:0;position:absolute;right:0;top:0}.lil-gui .controller.option .display.focus{background:var(--focus-color)}.lil-gui .controller.option .widget:hover .display{background:var(--hover-color)}.lil-gui .controller.number .slider:hover{background-color:var(--hover-color)}body:not(.lil-gui-dragging) .lil-gui .title:hover{background:var(--title-background-color);opacity:.85}.lil-gui .title:focus{text-decoration:underline var(--focus-color)}.lil-gui input:hover{background:var(--hover-color)}.lil-gui input:active{background:var(--focus-color)}.lil-gui input[type=checkbox]:focus{box-shadow:inset 0 0 0 1px var(--focus-color)}.lil-gui button:hover{background:var(--hover-color);border-color:var(--hover-color)}.lil-gui button:focus{border-color:var(--focus-color)}}'), p = true), e2 ? e2.appendChild(this.domElement) : i2 && (this.domElement.classList.add("autoPlace"), document.body.appendChild(this.domElement)), s2 && this.domElement.style.setProperty("--width", s2 + "px"), this.domElement.addEventListener("keydown", (t3) => t3.stopPropagation()), this.domElement.addEventListener("keyup", (t3) => t3.stopPropagation());
  }
  add(t2, e2, s2, n2, l2) {
    if (Object(s2) === s2) return new c(this, t2, e2, s2);
    const r2 = t2[e2];
    switch (typeof r2) {
      case "number":
        return new d(this, t2, e2, s2, n2, l2);
      case "boolean":
        return new i(this, t2, e2);
      case "string":
        return new u(this, t2, e2);
      case "function":
        return new h(this, t2, e2);
    }
    console.error("gui.add failed\n	property:", e2, "\n	object:", t2, "\n	value:", r2);
  }
  addColor(t2, i2, e2 = 1) {
    return new a(this, t2, i2, e2);
  }
  addFolder(t2) {
    return new _g({
      parent: this,
      title: t2
    });
  }
  load(t2, i2 = true) {
    return t2.controllers && this.controllers.forEach((i3) => {
      i3 instanceof h || i3._name in t2.controllers && i3.load(t2.controllers[i3._name]);
    }), i2 && t2.folders && this.folders.forEach((i3) => {
      i3._title in t2.folders && i3.load(t2.folders[i3._title]);
    }), this;
  }
  save(t2 = true) {
    const i2 = {
      controllers: {},
      folders: {}
    };
    return this.controllers.forEach((t3) => {
      if (!(t3 instanceof h)) {
        if (t3._name in i2.controllers) throw new Error(`Cannot save GUI with duplicate property "${t3._name}"`);
        i2.controllers[t3._name] = t3.save();
      }
    }), t2 && this.folders.forEach((t3) => {
      if (t3._title in i2.folders) throw new Error(`Cannot save GUI with duplicate folder "${t3._title}"`);
      i2.folders[t3._title] = t3.save();
    }), i2;
  }
  open(t2 = true) {
    return this._closed = !t2, this.$title.setAttribute("aria-expanded", !this._closed), this.domElement.classList.toggle("closed", this._closed), this;
  }
  close() {
    return this.open(false);
  }
  show(t2 = true) {
    return this._hidden = !t2, this.domElement.style.display = this._hidden ? "none" : "", this;
  }
  hide() {
    return this.show(false);
  }
  openAnimated(t2 = true) {
    return this._closed = !t2, this.$title.setAttribute("aria-expanded", !this._closed), requestAnimationFrame(() => {
      const i2 = this.$children.clientHeight;
      this.$children.style.height = i2 + "px", this.domElement.classList.add("transition");
      const e2 = (t3) => {
        t3.target === this.$children && (this.$children.style.height = "", this.domElement.classList.remove("transition"), this.$children.removeEventListener("transitionend", e2));
      };
      this.$children.addEventListener("transitionend", e2);
      const s2 = t2 ? this.$children.scrollHeight : 0;
      this.domElement.classList.toggle("closed", !t2), requestAnimationFrame(() => {
        this.$children.style.height = s2 + "px";
      });
    }), this;
  }
  title(t2) {
    return this._title = t2, this.$title.innerHTML = t2, this;
  }
  reset(t2 = true) {
    return (t2 ? this.controllersRecursive() : this.controllers).forEach((t3) => t3.reset()), this;
  }
  onChange(t2) {
    return this._onChange = t2, this;
  }
  _callOnChange(t2) {
    this.parent && this.parent._callOnChange(t2), void 0 !== this._onChange && this._onChange.call(this, {
      object: t2.object,
      property: t2.property,
      value: t2.getValue(),
      controller: t2
    });
  }
  onFinishChange(t2) {
    return this._onFinishChange = t2, this;
  }
  _callOnFinishChange(t2) {
    this.parent && this.parent._callOnFinishChange(t2), void 0 !== this._onFinishChange && this._onFinishChange.call(this, {
      object: t2.object,
      property: t2.property,
      value: t2.getValue(),
      controller: t2
    });
  }
  destroy() {
    this.parent && (this.parent.children.splice(this.parent.children.indexOf(this), 1), this.parent.folders.splice(this.parent.folders.indexOf(this), 1)), this.domElement.parentElement && this.domElement.parentElement.removeChild(this.domElement), Array.from(this.children).forEach((t2) => t2.destroy());
  }
  controllersRecursive() {
    let t2 = Array.from(this.controllers);
    return this.folders.forEach((i2) => {
      t2 = t2.concat(i2.controllersRecursive());
    }), t2;
  }
  foldersRecursive() {
    let t2 = Array.from(this.folders);
    return this.folders.forEach((i2) => {
      t2 = t2.concat(i2.foldersRecursive());
    }), t2;
  }
};
var lil_gui_module_min_default = g;
export {
  i as BooleanController,
  a as ColorController,
  t as Controller,
  h as FunctionController,
  g as GUI,
  d as NumberController,
  c as OptionController,
  u as StringController,
  lil_gui_module_min_default as default
};
/*! Bundled license information:

three/examples/jsm/libs/lil-gui.module.min.js:
  (**
   * lil-gui
   * https://lil-gui.georgealways.com
   * @version 0.17.0
   * @author George Michael Brower
   * @license MIT
   *)
*/
//# sourceMappingURL=three_addons_libs_lil-gui__module__min__js.js.map
