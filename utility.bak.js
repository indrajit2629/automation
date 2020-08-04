var dateFormat = require('dateformat');
var createDirectory = require('node-fs');
var fs = require("fs");

module.exports = function (rootFolder) {
    var self = this;
    var now = new Date();
    var path = [] 
    var rootDir = rootFolder || ".";
    path = [rootDir]
    path.push(dateFormat(now, "yyyy-mm-dd")) ;
    path.push(dateFormat(now, "H-M-TT")) ;
     
    this.currentDate = dateFormat(now, "yyyy-mm-dd") ;
    this.currentTime = dateFormat(now, "H-M-TT");

    this.makePath = function () { 
        return path.join("/");
    }

    this.setDirectory = function (currentFolder) {
        currentFolder ? path.push(currentFolder) : false;
        
        fs.mkdir(this.makePath(path), '0755', true);
        return this.makePath(path);
        // console.log(this.makePath(currentFolder));
    }

    this.resetRoot = function (currentFolder) {
        // console.log("Current Folder", currentFolder);
        currentFolder ? path.push(currentFolder) : false;
        
        path = path.slice(1, 4);
        console.log(path);
    }

    this.saveFile = function (name, web) {
        var fileBase64 = web.takeScreenshot();
        fs.writeFileSync(self.setDirectory() + "/" + name + ".png" , fileBase64, 'base64');
    }   
    fs.mkdir(this.makePath(), '0755', true);
    this.write_metadata = function (title, description, image_name) {
        if(!fs.existsSync('./temp')) fs.mkdirSync('./temp');
        var metadata_file = './temp/metadata.json';
        if (!fs.existsSync(metadata_file)) fs.writeFileSync(metadata_file, '[]');
        let rawdata = fs.readFileSync(metadata_file);
        let mdata = JSON.parse(rawdata);
        mdata = mdata || [];

        mdata.push({
            title: title,
            description: description,
            image_name: "screenshot/" + image_name + '.png'
        });

        let str_data = JSON.stringify(mdata, '', 4);
        
        fs.writeFileSync(metadata_file, str_data);
    };
    
}


// console.log(fs.mkdir);
// function mkdir_p(path, mode, callback, position) {
//     mode = mode || 0777;
//     position = position || 0;
//     parts = require('path').normalize(path).split('/');

//     if (position >= parts.length) {
//         if (callback) {
//             return callback();
//         } else {
//             return true;
//         }
//     }

//     var directory = parts.slice(0, position + 1).join('/');
//     fs.stat(directory, function(err) {
//         if (err === null) {
//             mkdir_p(path, mode, callback, position + 1);
//         } else {
//             fs.mkdir(directory, mode, function (err) {
//                 if (err) {
//                     if (callback) {
//                         return callback(err);
//                     } else {
//                         throw err;
//                     }
//                 } else {
//                     mkdir_p(path, mode, callback, position + 1);
//                 }
//             })
//         }
//     })
// }





// var path = "./" + dir.join("/")
// console.log("Time", "===", path,);
// fs.mkdir(path, 0755, true);``