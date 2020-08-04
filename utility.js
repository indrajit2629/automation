var dateFormat = require('dateformat');
var createDirectory = require('node-fs');
var fs = require("fs");
const path = require('path');
const fsExtra = require('fs-extra');
const dirTree = require("directory-tree");
const test_dir = path.join(__dirname,'.');
var ncp = require('ncp').ncp;

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
    this.saveToTempFolder = function (name, web) {
        var temp_path = test_dir + '\\temp\\screenshots'
        var fileBase64 = web.takeScreenshot();
        if(!fs.existsSync(temp_path)) fs.mkdirSync(temp_path, { recursive: true });
        fs.writeFileSync(temp_path + '/' + name + ".png" , fileBase64, 'base64');
    };
    this.move_reports = function () {        
        // var source = '';
        const source = test_dir + '\\reports';
        var destination = test_dir + '\\all_reports';
        if(!fs.existsSync(destination)) fs.mkdirSync(destination);
        // const tree = dirTree(current_dir_path, {extensions:/\.(html|json|png|jpeg|jpg)$/}, (item, PATH, stats) => {
        //     console.log(item.path);
        // });
        // var file = tree.children[0];
        // source = test_dir + '/reports/' + file.name;
        // var destination = test_dir + '/all_reports/' + file.name;
        // // self.createRecurseDir(destination);
        // // Sync:
        // try {
        //     fsExtra.copySync(source, destination);
        //     console.log('Copied reports!');
        //     fsExtra.copySync(temp_path, destination);
        //     console.log('Copied screenshots!', temp_path);
        //     // return;

        // } catch (err) {
        //     console.log(err)
        // }
        ncp(source, destination, function (err) {
            if (err) {
                return console.error(err);
            }
        console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$- Moving done!')
        });
        var dirContent = fs.readdirSync(source);
        var folder = dirContent[dirContent.length -1];
        var temp_path = test_dir + '\\temp';
        // if(!fs.existsSync(destination + '\\screenshots')) fs.mkdirSync(destination + '\\screenshots');
        ncp(temp_path, destination + '\\' + folder, function (err) {
            if (err) {
                return console.error(err);
            }
            console.log('Screenshot copied!');
        });

    };
    this.clear_dir = function(){
        if(fs.existsSync(test_dir + '\\temp')) fsExtra.removeSync(test_dir + '\\temp');
        if(fs.existsSync(test_dir + '\\reports')) fsExtra.removeSync(test_dir + '\\reports');
        console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$- cleaning done!')
    }
}