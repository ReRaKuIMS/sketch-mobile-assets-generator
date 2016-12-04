var Exporter = (function() {
  var Exporter = function(document, baseDirectory) {
    this.document = document
    this.baseDirectory = baseDirectory
  }

  Exporter.prototype.export = function(layerGroups, configs) {
    var that = this

    layerGroups.forEach(function(layerGroup){
      layerGroup.formats.forEach(function(format){
        var targetConfig = configs.filter(function(config){
          return config.id === format
        })[0]
        if (targetConfig == null) { return }

        switch (targetConfig.type) {
        case "xcode_asset_catalog":
          that._exportAsAssetCatalog(layerGroup.baseName, layerGroup.layers, targetConfig, true)
          break
        case "android_res":
          that._exportAsAndroidRes(layerGroup.baseName, layerGroup.layers, targetConfig)
          break
        }
      })
    })
  }

  Exporter.prototype._exportAsAssetCatalog = function(baseName, layers, config, enableNamespace) {
    var that = this
    var root = this.baseDirectory + "/" + config.id + "/" + baseName

    var rootContents = {
      info: {
        version: 1,
        author: "xcode"
      },
      properties: {
        "provides-namespace" : enableNamespace
      }
    }
    this._writeObjectToJsonFile(rootContents, root, "Contents.json")

    layers.forEach(function(layer){
      var dir = root + "/" + layer.name() + ".imageset"

      var contents = {
        info: {
          version: 1,
          author: "xcode"
        },
        images: []
      }

      config.images.forEach(function(image){
        var request = MSExportRequest.exportRequestsFromExportableLayer(layer)[0]
        request.scale = image.scale
        var filename = layer.name() + "_" + image.idiom + "@" + image.scale + "x.png"
        that.document.saveArtboardOrSlice_toFile(request, dir + "/" + filename)

        contents.images.push({
          idiom: image.idiom,
          scale: image.scale + "x",
          filename: filename
        })
      })

      that._writeObjectToJsonFile(contents, dir, "Contents.json")
    })
  },

  Exporter.prototype._exportAsAndroidRes = function(baseName, layers, config) {
    var that = this
    var root = this.baseDirectory + "/" + config.id

    layers.forEach(function(layer){
      config.densities.forEach(function(density){
        var request = MSExportRequest.exportRequestsFromExportableLayer(layer)[0]
        request.scale = density.scale
        var filename = baseName + "_" + layer.name() + ".png"
        var file = root + "/" + density.folder + "/" + filename
        that.document.saveArtboardOrSlice_toFile(request, file)
      })
    })
  }

  Exporter.prototype._writeObjectToJsonFile = function(object, path, filename) {
    var json = JSON.stringify(object, undefined, 2)
    var string = NSString.stringWithFormat(@"%@", json)
    var file = path + "/" + filename

    var manager = NSFileManager.defaultManager()
    manager.createDirectoryAtPath_withIntermediateDirectories_attributes_error(path, true, null, null)

    string.writeToFile_atomically_encoding_error(file, true, NSUTF8StringEncoding, null)
  }

  return Exporter
})()
