export default {
    downloadFile: function(contents, filename, mimetype) { // eslint-disable-line
        let link = document.createElement("a");
        let blob = new Blob([contents], {type: mimetype});
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
    }
}
