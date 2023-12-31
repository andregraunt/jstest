<!DOCTYPE html>
<html>

<head>
    <title>phpwin demo webApp</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
    <link href="assets/css/styles.css" rel="stylesheet" />
    <script src="assets/js/libraries.js"></script>
    <script src="assets/js/main.js?7"></script>
</head>

<body>

    <img src="assets/img/logo.png" alt="phpwin logo" />
    <h1>Web application demo</h1>
    <div rv-unless="isAvailable">
        This page works only inside phpwin as standalone web application
    </div>
    <div rv-if="isAvailable">
        <!-- Remote push notification -->
        <div class="container">
            <span class="caption">Remote push notification</span>
            <a class="command" rv-on-click="commands.notification">Send</a>
            <div rv-if="data.notification" class="desc">
                Received:
                <div>
                    <b>Title: </b>{data.notification.title}<br />
                    <b>Text: </b>{data.notification.text}<br />
                    <b>Additional data: </b>{data.notification.additional}<br />
                </div>
            </div>
        </div>

        <!-- Status bar -->
        <div class="container">
            <span class="caption">Status bar</span>
            <a class="command" rv-on-click="commands.statusbar.show">Show</a>
            <a class="command" rv-on-click="commands.statusbar.hide">Hide</a>
            <a class="command" rv-on-click="commands.statusbar.light">Light</a>
            <a class="command" rv-on-click="commands.statusbar.dark">Dark</a>
        </div>

        <!-- Torch -->
        <div class="container">
            <span class="caption">Torch</span>
            <a class="command" rv-on-click="commands.torch.on">On</a>
            <a class="command" rv-on-click="commands.torch.off">Off</a>
        </div>

        <!-- Keep Awake -->
        <div class="container">
            <span class="caption">Keep Awake</span>
            <a class="command" rv-on-click="commands.keepAwake.on">On</a>
            <a class="command" rv-on-click="commands.keepAwake.off">Off</a>
            <div class="desc">Keep device screen awake forever</div>
        </div>

        <!-- Alerts -->
        <div class="container">
            <span class="caption">Alerts</span>
            <a class="command" rv-on-click="commands.alerts.alert1">Alert 1</a>
            <a class="command" rv-on-click="commands.alerts.alert2">Alert 2</a>
            <a class="command" rv-on-click="commands.alerts.alert3">Alert 3</a>
            <a class="command" rv-on-click="commands.alerts.alert4">Alert 4</a>
            <div rv-if="data.alerts" class="desc">
                <div>
                    <b>Response: </b>{data.alerts}<br />
                </div>
            </div>
        </div>

        <!-- Busy -->
        <div class="container">
            <span class="caption">Busy</span>
            <a class="command" rv-on-click="commands.busy.withoutText">Start</a>
            <a class="command" rv-on-click="commands.busy.withText">Start with caption</a>
        </div>

        <!-- Vibration -->
        <div class="container">
            <span class="caption">Vibration</span>
            <a class="command" rv-on-click="commands.vibrate">Start</a>
        </div>

        <!-- Geolocation -->
        <div class="container">
            <span class="caption">Geolocation</span>
            <a class="command" rv-on-click="commands.geo">Request</a>
            <div rv-if="data.geo" class="desc">
                <div>
                    <b>Longitude: </b>{data.geo.lng}<br />
                    <b>Latitude: </b>{data.geo.lat}<br />
                </div>
            </div>
        </div>

        <!-- Battery -->
        <div class="container">
            <span class="caption">Battery</span>
            <a class="command" rv-on-click="commands.battery">Get status</a>
            <span class="desc" rv-if="data.battery"><b>Level: </b>{data.battery.level}</span>
            <span class="desc" rv-if="data.battery"><b>Charging: </b>{data.battery.charging}</span>
        </div>

        <!-- Set Brightness -->
        <div class="container">
            <span class="caption">Set Brightness</span>
            <a class="command" rv-on-click="commands.brightness.full">Full</a>
            <a class="command" rv-on-click="commands.brightness.half">Half</a>
        </div>
        
		<!-- Clear Cache -->
        <div class="container">
            <span class="caption">Clear Cache</span>
            <a class="command" rv-on-click="commands.clearCache">Clear</a>
        </div>
		
        <!-- Connection -->
        <div class="container">
            <span class="caption">Listen: Connection</span>
            <div rv-if="data.connection" class="desc">
                <div>
                    <b>Type: </b>{data.connection.type}<br />
                    <b>Connected: </b>{data.connection.connected}<br />
                </div>
            </div>
        </div>

		<!-- Volume -->
        <div class="container">
            <span class="caption">Listen: Volume</span>
            <div class="desc"><b>Value: </b>{data.volume}<br /></div>
        </div>

        <!-- Brightness -->
        <div class="container">
            <span class="caption">Listen: Brightness</span>
            <div class="desc"><b>Value: </b>{data.brightness}<br /></div>
        </div>

        <!-- Screenshot -->
        <div class="container">
            <span class="caption">Listen: Screenshot</span>
            <div class="desc">{data.screenshot}<br /></div>
        </div>
        
        <!-- Download -->
        <div class="container">
            <span class="caption">Download</span>
            <a class="command" rv-on-click="commands.download">Download (FTP)</a>
			<a class="command" rv-on-click="commands.stopDownload">Stop</a>
            <div class="desc" rv-if="data.download">
                <div>Task id: {data.download.taskId}</div>
                <div rv-if="data.download.error">Error: {data.download.error}</div>
                <div rv-if="data.download.progress">Progress: {data.download.progress}</div>
                <div rv-if="data.download.success">Success: {data.download.success}</div>
                <div rv-if="data.download.fail">Fail: {data.download.fail}</div>
            </div>
        </div>

        <!-- Exit -->
        <div class="container">
            <span class="caption">Exit App</span>
            <a class="command" rv-on-click="commands.exit">Exit</a>
        </div>
    </div>

    <div id="footer">© 2021 Firas Moussa | <a href="http://www.phpwin.org">www.phpwin.org</a></div>
</body>

</html>