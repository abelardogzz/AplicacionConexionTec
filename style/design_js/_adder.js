$(document).ready(function(){

  var js_files = [
    "design_js/Project.js",
    "design_js/e.js"
  ];

  // Source: http://www.frontendjunkie.com/2012/04/dynamically-loading-javascript-files-in.html
  function loadJsFilesSequentially(scriptsCollection, startIndex) {
    if (scriptsCollection[startIndex]) {
      var fileref = document.createElement('script');
      fileref.setAttribute("type","text/javascript");
      fileref.setAttribute("src", scriptsCollection[startIndex]);
      fileref.onload = function(){
        startIndex = startIndex + 1;
        loadJsFilesSequentially(scriptsCollection, startIndex)
      };

      document.getElementsByTagName("head")[0].appendChild(fileref)
    }
    else {
    }
  }

  loadJsFilesSequentially(js_files, 0);
  
});
