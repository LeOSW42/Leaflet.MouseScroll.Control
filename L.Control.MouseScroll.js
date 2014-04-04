L.Control.MouseScroll = L.Control.Zoom.extend({
  options: {
    position: "topleft",
    mouseScrollText: "Scroll Zoom",
    mouseScrollTitle: "Scroll Zoom"
  },

  onAdd: function (map) {
    var zoomName = "leaflet-control-scrollzoom"
      , container = L.DomUtil.create("div", zoomName + " leaflet-bar")
      , options = this.options

    this._map = map

    this._mouseScrollButton = this._createButton(options.mouseScrollText, options.mouseScrollTitle,
     zoomName, container, this._mouseScroll, this)

    this._updateDisabled()
    map.on('focus', this._updateDisabled, this)

    return container
  },

  _mouseScroll: function () {
    if(this._map.scrollWheelZoom.enabled()) {
     this._map.scrollWheelZoom.disable();
   }
   else {
     this._map.scrollWheelZoom.enable();
   }
  },

  _updateDisabled: function () {
    var map = this._map
      , className = "leaflet-disabled"

    L.DomUtil.removeClass(this._mouseScrollButton, className)

    if (!map.scrollWheelZoom.enabled()) {
      L.DomUtil.addClass(this._mouseScrollButton, className)
    }
  }
})