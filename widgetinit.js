process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
// var _ = require('lodash');
// var visitors = require('./visitors/visitors.js');
var common = require('./src/common');
// var fs = require('fs');
// var Path = require('path');
var utility = require('./utility.js');
util = new utility();
//api related
// var common_api = require('./api/common_api');
// var api_widget = require('./api/widget');
// var tz = 'America/Chicago';
// const url = require('./api/url');
// const date = {
//     'start': '2020-07-06 00:00:00',
//     'end': '2020-07-12 00:00:00'
// }
// const ve_id = 'c0fcb3173449416fa97853f8e2261e6c';

// web.transaction('Opening browser and web-page');
// web.init();
// var email = 'nova_kelly@seaportvillage.co.us';
// var password = '938nw7z6';
// var email = 'ethan_smith@newmarkmerrill.com';
// var password = 'e7w5g37s';

// var email = '${username}';
// var password = '${password}';
// var dashboard = web.execute(function (s) {
//     return s;
// }, "${dashboard}");
//api code
// let loginRes = common_api.login('ethan_smith@newmarkmerrill.com', 'e7w5g37s');
// log.info('login  res');
// log.info(loginRes);
// url.token = loginRes.jwt
// url.headers.Authorization = 'Bearer ' + url.token;

// let wvRes = api_widget.get_widget_data(url.wifiVisitorsUrl, date.start, date.end, tz, ve_id);

// log.info('storeRes ', wvRes);
// log.info('Logging out');
// let loRes = common_api.logout();
// log.info(loRes);
//-------------
// web.open('localhost:8088');
// web.open('https://cms-dev.myg8way.com');
// web.open('http://35.246.214.239/');
// common.login(email, password);
// common.loading();
module.exports = {
    eachWidgets: function (widgetsToVerify) {
        var self = this;
        // var widget_name = widgetsToVerify[0];
        // widgetsToVerify = widgetsToVerify.slice(0,1);
        // widgetsToVerify = ['Store Ranking']
        for (let widget of widgetsToVerify) {
            var iconElm = '//*[@id="' + widget.widgetID + '"]//div[contains(@class,"toolbar__right")]'; //all icons Xpath in widget to verify
            web.scrollToElement('//*[@id="' + widget.widgetID + '"]', false); //scroll to visible area
            util.saveToTempFolder(widget.name, web); //default widget view
            // util.saveToTempFolder(widget.name, web);
            util.write_metadata('Default view','Default widget view',widget.name);
            widget.icons.forEach(function (icon, index) {
                var j = index + 1;
                web.click(iconElm + '//i[contains(@class, "' + icon.class + '")]'); //finding exact match for icon class in widget
                j === 1 ? web.pause(700) : web.pause(100);
                if (web.isExist('//*[@id="widgetLoader"]', 200)) {
                    web.waitForNotExist('//*[@id="widgetLoader"]')
                }
                self.openDialog(icon, widget);
            })
        }
    },
    openDialog: function (dialog, widget) {
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', widget, dialog);

        var widgetId = widgetId;
        if (dialog.icons && dialog.icons.length === 0 && dialog.class === 'mdi-dots-vertical') { //more option to download csv
            util.saveToTempFolder(widget.name + '_CSV', web);
            // util.saveToTempFolder(widget.name + '_CSV', web);
            // util.write_metadata('CSV download','CSV file download',widget.name + '_CSV');
            web.click('//md-menu-item[contains(@class, "' + widget.widgetID + '")]//a[@class="csv-down"]');
        } else {
            util.saveToTempFolder(widget.name + '_' + dialog.name, web); //default dialog view
            // util.saveToTempFolder(widget.name + '_' + dialog.name, web);
            // util.write_metadata('Dialog view',widget.name + ' ' + dialog.name + ' view',widget.name + '_' + dialog.name);
            var j = 1;
            if (dialog.icons) { //list of icons inside dialog header for click functionality from widget metadata
                for (var icon of dialog.icons) {
                    var currentIcon = '';
                    if (icon.class) {
                        currentIcon = '//md-dialog//md-toolbar//*[contains(@class, "' + icon.class + '")]'; //for icon
                    } else if (icon.attr) {
                        currentIcon = '//md-dialog//md-toolbar//*[@' + icon.attr + ']'; //for md-switch
                    }
                    if (web.isExist(currentIcon)) {
                        web.click(currentIcon);
                        web.pause(3000);
                        if (web.isExist('//*[@id="widgetLoader"]', 500)) {
                            web.waitForNotExist('//*[@id="widgetLoader"]')
                        }
                        var isFullscreen = icon.name === 'expand' ? '_fullScreen_' : '_normal_';
                        util.saveToTempFolder(widget.name + '_' + dialog.name + isFullscreen + icon.name, web);
                        // util.saveToTempFolder(widget.name + '_' + dialog.name + '_fullScreen_' + icon.name, web);
                        util.write_metadata('Full screen view', widget.name + '_' + dialog.name + ' Full screen view', widget.name + '_' + dialog.name + '_fullScreen_' + icon.name);
                        // var tempVar = 'Visitors';
                        // var dbData = 'visitors';
                        // tempVar === dbData
                    }
                    if (icon['date_range']) {
                        common.dateRange(dialog, widget);
                    }
                    if (icon['data_verify']) {
                        common.verfiyTableData(widget);
                    }
                    j++;
                }
            }
            web.click('//md-dialog//button[@ng-click="cancel()" and contains(@class, "md-raised")]');
        }
    }
}
// visitors.widgetname('widget-name-here');
