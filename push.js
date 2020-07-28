var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BFU8-v6_u8mItJZcenhKs8-oI_ERP41NvYdQN1DiEhIWVfAbW2FqUENNjxuki0VoN3ZipDYuJ7HWLnJeW5RuIto",
    "privateKey": "INje1aywgSkhl3MvJkjMvfvbXs8tO4bhKKz70zrz-Bs"
};


webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/fwpe-1T_aHY:APA91bFRC4EW3-t3xvs_a23_JUla949mF1c946YBMCUIps0b3qZO3rtBGEIScnX0eubUfml3jqJ4A3MKnU0PKfGRidkO7VUoFx3wyEPISm6C1fxgFYBkM3UlZhLQko23IuSoLglPQ7y7",
    "keys": {
        "p256dh": "BCK7e3sMRmipdru9PPBmUojva4aEymWgMB/N7NMfNaNIs7v1EtY8bFF3ottTfY/a3gVzMRlrFApzXA/+KBfraQI=",
        "auth": "Cb9YP4Wb1t9KfmPUXneqlg=="
    }
};
var payload = 'Selamat! WOWOOWOW';


var options = {
    gcmAPIKey: '225946820105',
    TTL: 60,
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);