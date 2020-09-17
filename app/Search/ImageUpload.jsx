const React = require("react");

function ImageUpload(props) {
  // Add event listener to the file input element
  //document.getElementById("fileChooser").addEventListener("change", uploadFile);
  const [filename, setFilename] = React.useState("");

  // UPLOAD IMAGE using a post request
  // Called by the event listener that is waiting for a file to be chosen
  function uploadFile() {
    console.log("Entered Upload Fn!");

    // get the file chosen by the file dialog control
    const selectedFile = document.getElementById("fileChooser").files[0];
    console.log(selectedFile);
    // store it in a FormData object
    const formData = new FormData();
    // name of field, the file itself, and its name
    formData.append("newImage", selectedFile, selectedFile.name);

    // build a browser-style HTTP request data structure
    const xhr = new XMLHttpRequest();
    // it will be a POST request, the URL will this page's URL+"/upload"
    xhr.open("POST", "/upload", true);
    setFilename(null);
    // callback function executed when the HTTP response comes back
    xhr.onloadend = function(e) {
      // Get the server's response body
      console.log(xhr.responseText);
      // now that the image is on the server, we can display it!

      // let newImage = document.getElementById("serverImage");
      //newImage.src = "http://ecs162.org:3000/images/ochib/" + selectedFile.name;
      setFilename(selectedFile.name);
    };

    // actually send the request
    xhr.send(formData);
  }
  let textContent = "Choose File";
  if (filename == null) {
    textContent = "Uploading";
  } else if (filename != "") {
    textContent = "Repace File";
  }

  return (
    <div class="formInputSection">
      <label id="ImgLabel" for="fileChooser">
        Attach a photo(optional)
        <div class="displayFile">
          <div class="fileBtn">{textContent}</div>
          <span id="imgFileName">{filename}</span>
          <img id="serverImage" />
        </div>
      </label>
      <input
        type="file"
        id="fileChooser"
        onChange={uploadFile}
        accept="image/png, .jpeg, .jpg, image/gif"
      />
    </div>
  );
}

module.exports = ImageUpload;
