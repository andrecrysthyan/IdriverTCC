 Template.upload.events({
    'change .fileInput':function(event,template){
      FS.Utility.eachFile(event,function(file){
        var fileObj = new FS.File(file);
        Uploads.insert(fileObj,function(err){
          console.log(err);
        })
      })
    }
  });