/*
	This file demonstrates all the available functions of phpwin object
*/

var data = {
        notification: null,
        geo: null,
        battery: null,
        connection: null,
        alerts: null,
		volume:null,
		brightness:null,
		download:null,
		screenshot:"Take a screenshot to test"
    },
    commands = {
        notification: function() {
            $.ajax({
                url: "https://app.phpwin.org/notify.php",
                method: "post",
                data: {
                    title: "Title",
                    text: "Hello World!",
                    ids: [phpwin.notificationId], // We are using current device's notification id for demo purpose. You can add multiple IDs
                    data: {
                        example: "This is extra data shipped with the notification"
                    }
                },
                complete: function(xhr, status) {
                    try {
                        var resp = JSON.parse(xhr.responseText)
                        if (status === "success" && resp.success === true) {
                            alert("success")
                            return
                        }
                    } catch (err) {

                    }
                    alert("failed")
                }
            })
        },
        statusbar: {
            hidden: true,
            isDark: true,
            show: function() {
                commands.statusbar.hidden = false
                commands.statusbar.apply()
            },
            hide: function() {
                commands.statusbar.hidden = true
                commands.statusbar.apply()
            },
            light: function() {
                commands.statusbar.isDark = false
                commands.statusbar.apply()
            },
            dark: function() {
                commands.statusbar.isDark = true
                commands.statusbar.apply()
            },
            apply: function() {
                phpwin.statusbar({ hidden: commands.statusbar.hidden, dark: commands.statusbar.isDark, animated: true })
            }
        },
        torch: {
            on: function() {
                phpwin.torch(true)
            },
            off: function() {
                phpwin.torch(false)
            }
        },
        keepAwake: {
            on: function() {
                phpwin.keepAwake(true)
            },
            off: function() {
                phpwin.keepAwake(false)
            }
        },
        alerts: {
            alert1: function() {
                phpwin.alert("Alert title")
            },
            alert2: function() {
                phpwin.alert("Alert title", "With subtitle")
            },
            alert3: function() {
                phpwin.alert("Alert title with custom buttons", "With subtitle", ["No", "Yes"], function(idx) {
                    data.alerts = "Pressed on button index " + idx
                })
            },
            alert4: function() {
                phpwin.prompt("Prompt title with custom buttons", "With subtitle", ["No", "Yes"], function(idx, val) {
                        data.alerts = "Pressed on button index " + idx + ", input '" + val + "'"
                    }, false, "default input") // <- false means plain text, "" is default input
            }
        },
        busy: {
            withoutText: function() {
                phpwin.busy(true)
                setTimeout(function() {
                    phpwin.busy(false)
                }, 2000)
            },
            withText: function() {
                phpwin.busy("Loading...")
                setTimeout(function() {
                    phpwin.busy(false)
                }, 2000)
            }
        },
        vibrate: function() {
            phpwin.vibrate()
        },
        geo: function() {
            phpwin.geo(function(resp) {
                if (resp.success) {
                    data.geo = {
                        lng: resp.lng,
                        lat: resp.lat
                    }
                } else {
                    alert("Failed to get location")
                }
            })
        },
        battery: function() {
            phpwin.battery(function(resp) {
                data.battery = {
                    level: resp.level,
                    charging: resp.charging
                }
            })
        },
        brightness:{
            full:function(){
                phpwin.brightness(1)
            },
            half:function(){
                phpwin.brightness(0.5);
            }
        },
		clearCache: function(){
			phpwin.clearCache(false, function(){ // false: reset disk and memory. true: disc, memory, cookies, localStorage, sessionStorage, indexedDBDatabases, webSQLDatabases, fetchCache...
				phpwin.alert("Done")
			})
		},
        download: function() {
            if (data.downloading) return;
            data.downloading = true // in this demo, only 1 download is allowed, but you can add as much as you want, parallel downloads are supported
                // please go to docs for more details
            phpwin.download({
                type: "ftp", // ftp, ftps or sftp(SSH)
                host: "test.rebex.net",
                port: 21,
                user: "demo",
                pass: "password",
                src: ["readme.txt", "pub"], // array of files or directories to download
                dst: "/ftp_downloaded", // destination, leave blank to download directly to root. app will create unexisting directories.
                retry: 2, // the number of retries on failed download
                overwrite: true, // overwrite each file if already exists. If false, app will skip download if exists
				updateOnly: false, // if overwrite is true, overwrite only if modification timestamp is different from server.
                init: function(taskId) { // this will be called when app initialize the downloader, use taskId if you want to stop download by using phpwin.stopDownload(taskId)
                    data.download = {taskId:taskId} // save taskId so we can stop it later (by calling stopDownload)
                },
                progress: function(index, total, file) { // will be called on each file download, giving you current file index, total files & current file path
                    if(!data.downloading)return;
                    data.download.progress = index + " / " + total;
                },
                fail: function(reason) { // called when connection/login fail. reason is string (ex "Login incorrect")
                    data.download.error = reason
					data.downloading = false;
                },
                finish: function(success, fail) { // called after process is done. It will give you arrays of successful/failed downloads. if fail is called, finish will not.
                    data.download.success = success.length + " files"
                    data.download.fail = fail.length + " files"
					data.downloading = false;
                }
            })
        },
        stopDownload: function() {
            if (!data.downloading) return
            phpwin.stopDownload(data.download.taskId)
            data.downloading = false;
            data.download = null;
        },
        exit: function() {
            phpwin.exit()
        }
    }
$(function() {
    rivets.bind(document.body, { data: data, commands: commands, isAvailable: window.phpwin !== undefined })
    if (window.phpwin !== undefined) {
        // listeners
        phpwin.listen("connection", function(o) {
            data.connection = {
                type: o.type,
                connected: o.connected
            }
        })
		phpwin.listen("volume", function(val) {
            data.volume = val
        })
        phpwin.listen("brightness", function(val) {
            data.brightness = val
        })
        phpwin.listen("screenshot", function() {
            data.screenshot = "Screenshot is taken"
        })
        phpwin.listen("notification", function(o) {
            data.notification = {
                title: o.title,
                text: o.text,
                additional: (typeof(o.data) === "object" ? JSON.stringify(o.data) : o.data)
            }
        })
    }

})