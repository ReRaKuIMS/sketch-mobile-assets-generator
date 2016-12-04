var DocumentParser = {
  /*
   * returns: [
   *   {
   *     "baseName" : String,  // namespace of artboard
   *     "platforms": [String] // platform names
   *     "layers"   : [Layer]  // layer objects
   *   }
   * ]
   */
  parse: function(document) {
    var that = this
    var parsed = []

    document.pages().forEach(function(page) {
      page.artboards().forEach(function(artboard) {
        var config = that._parseArtboardName(artboard.name())
        if (config == null) { return }

        // remove "noexport" layers
        var layers = []
        artboard.layers().forEach(function(layer){
          var components = layer.name().split(":")
          if (components.shift() == "noexport") {
            log("non-exportable layer '" + layer.name() + "'")
          } else {
            layers.push(layer)
          }
        })
        config.layers = layers

        parsed.push(config)
      })
    })

    return parsed
  },

  _parseArtboardName: function(name) {
    var components = name.split(":")

    if (components.length < 3) {
      log("artboard '" + name + "' has no query.")
      return null
    }
    if (components.shift() != "export") {
      log("artboard '" + name + "' is not exportable.")
      return null
    }

    return {
      baseName: components.slice(-1)[0],
      platforms: components.slice(0, -1)
    }
  }
}
