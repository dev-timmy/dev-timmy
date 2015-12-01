﻿var parser = document.createElement("a");
parser.href = document.referrer;
var allow = parser.hostname == "" || parser.hostname == window.location.hostname;
if (!allow) {
	location.href = '/app/img/blank.html';
} else {
    var version = document.querySelector('script[data-main]').getAttribute('data-main').split('=')[1];
    require.config({
        //urlArgs: "v=" + document.querySelector('script[data-main]').getAttribute('data-main').split('=')[1],
        baseUrl: "/core/Scripts",
        paths: {
            login: "app/login.js?v=" + version,
            utils: "utils.js?v=" + version,
            translate: "translate.js?v=" + version,
            'jquery-original': ["https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min", "lib/jquery-1.11.2.min"],
            jquery: 'app/jquery-noConflict',
            aes: "lib/AES-3.1.2",
            "aes-handler": "lib/aes-handler.js?v=" + version,
            rsa: "lib/RSA-1.4",
            "rsa-handler": "lib/rsa-handler.js?v=" + version,
            text: "lib/text"
        }
    });

    require(['jquery', "/info/site?noext", 'translate', 'utils'], function ($, info, translate, utils) {
        $(document).ready(function () {
            lang = utils.GetCurrentUrlParam('lang') || info.defaultLang;
            utils.SetCookie('lang', lang, 365);
            var param = window.location.search;
            if (new RegExp("(mobile=)(.*)").test(param))
                param = param.replace(/(mobile=)[^\&]+/, '$1force');
            else
                param = param.length == 0 ? "?mobile=force" : param + "&mobile=force";
            $('#frameMain').attr('src', '/m/Main.aspx' + param);

            $('#btnMenu').click(function () {
                $("#menuBar").slideToggle(400);
            })

            /*** Main ***/
            var btnMain = $('#btnMain');
            if (btnMain.prop('tagName') == 'A') btnMain.attr('href', 'javascript:void(0)').removeAttr('target');
            btnMain.click(function () {
                $('#frameMain').attr('src', '/m/Main.aspx' + param);
                $("#menuBar").slideToggle(400);
            }).css({ 'cursor': 'pointer', 'visibility': 'visible' });

            /*** Register ***/
            var btnRegister = $('#btnRegister');
            if (btnRegister.prop('tagName') == 'A') btnRegister.attr('href', 'javascript:void(0)').removeAttr('target');
            btnRegister.click(function () {
                $('#frameMain').attr('src', '/Register.aspx' + param);
                $("#menuBar").slideToggle(400);
            }).css({ 'cursor': 'pointer', 'visibility': 'visible' });

            /*** Live Chat ***/
            var btnChat = $('#btnLivechat');
            if (btnChat.prop('tagName') == 'A') btnChat.attr('href', 'javascript:void(0)').removeAttr('target');
            btnChat.click(function () {
                //$('#frameMain').attr('src', '/app/livechat.html');
                utils.PopUpPingBox('/app/livechat.html');
                $("#menuBar").slideToggle(400);
            }).css({ 'cursor': 'pointer', 'visibility': 'visible' });

            /*** Download ***/
            var btnDownload = $('#btnDownload');
            if (btnDownload.prop('tagName') == 'A') btnDownload.attr('href', 'javascript:void(0)').removeAttr('target');
            btnDownload.click(function () {
                $('#frameMain').attr('src', '/app/Home0.aspx' + param);
                $("#menuBar").slideToggle(400);
            }).css({ 'cursor': 'pointer', 'visibility': 'visible' });

            /*** Sign In ***/
            var btnSignIn = $('.SITELOGIN[method=login]');
            var signInTag = btnSignIn.prop('tagName');
            if (signInTag == 'A') btnSignIn.attr('href', 'javascript:void(0)').removeAttr('target');
            btnSignIn.css({ 'cursor': 'pointer', 'visibility': 'visible' })
        })
    }, function (err) {
        alert("default0");
        var failedId = err.requireModules && err.requireModules[0];
        alert('Failed to load ' + failedId);
        location.reload();
    });
}