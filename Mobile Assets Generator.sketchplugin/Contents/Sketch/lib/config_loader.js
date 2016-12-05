var ConfigLoader = {
  load: function(types) {
    var that = this
    return Array.prototype.concat.apply(
      [],
      types.map(function(type){
        return that._CONFIG.filter(function(config){
          return config.type === type
        })
      })
    )
  },

  _CONFIG: [
    {
      "id": "iphone",
      "type": "xcode_asset_catalog",
      "images": [
        {
          "idiom": "iphone",
          "scale": 2
        },
        {
          "idiom": "iphone",
          "scale": 3
        }
      ]
    },
    {
      "id": "ipad",
      "type": "xcode_asset_catalog",
      "images": [
        {
          "idiom": "ipad",
          "scale": 2
        }
      ]
    },
    {
      "id": "ios",
      "type": "xcode_asset_catalog",
      "images": [
        {
          "idiom": "universal",
          "scale": 2
        },
        {
          "idiom": "universal",
          "scale": 3
        }
      ]
    },
    {
      "id": "android",
      "type": "android_res",
      "densities": [
        {
          "folder": "drawable-mdpi",
          "scale": 1
        },
        {
          "folder": "drawable-hdpi",
          "scale": 1.5
        },
        {
          "folder": "drawable-xhdpi",
          "scale": 2
        },
        {
          "folder": "drawable-xxhdpi",
          "scale": 3
        },
        {
          "folder": "drawable-xxxhdpi",
          "scale": 4
        },
      ]
    },
    {
      "id": "android-mipmap",
      "type": "android_res",
      "densities": [
        {
          "folder": "mipmap-mdpi",
          "scale": 1
        },
        {
          "folder": "mipmap-hdpi",
          "scale": 1.5
        },
        {
          "folder": "mipmap-xhdpi",
          "scale": 2
        },
        {
          "folder": "mipmap-xxhdpi",
          "scale": 3
        },
        {
          "folder": "mipmap-xxxhdpi",
          "scale": 4
        },
      ]
    }
  ]
}
