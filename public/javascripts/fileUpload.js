FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginFileEncode,
  )

  FilePond.setOptions({
    stylePanelAspectRatio: 100 / 560,
     imageResizeTargetWidth: 40,
     imageResizeTargetHeight: 40
  })

  
  FilePond.parse(document.body);