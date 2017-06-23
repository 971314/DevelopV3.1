export default function pbMessagePlugin() {
    return store => {
        let pbMessage = {
            phone: "",
            init() {
                try {
                    if (pbPage.getInitState()) {
                        pbPage.addModuleFunCallback(90007, 111, pbMessage.unreadCallback);
                        pbPage.addReloadFun(pbMessage.pageReload);

                    } else {
                        pbPage.initPage({
                            reload: pbMessage.pageReload,
                            callbacks: [{
                                module: 90007,
                                fun: 111,
                                callback: pbMessage.unreadCallback
                            }]
                        });
                        pbMessage.pageReload();
                    }
                    pbMessage.pageReload();
                } catch (e) {
                    console.log(e);
                }
            },
            pageReload() {
                try {
                    if (pbE.isPoboApp) {
                        pbMessage.phone = pbESYS.getAppCertifyInfo('PbKey_H5_Home_Auth_LoginName');
                        if (!pbMessage.phone)
                            return;
                    } else
                        return;

                    pbMessage.unreadCallback(pbEMSG.ytzGetUnReadMsgCount());
                    let hides = JSON.parse(pbESYS.readConfig("message/conf/message.json")).hides;
                    let types = JSON.parse(pbEMSG.ytzLoadHDMsgTypes(1)).Messages;
                    types = types.concat(JSON.parse(pbEMSG.ytzLoadHDMsgTypes(2)).Messages);
                    for (var i = 0; i < types.length; i++) {
                        if (hides.indexOf(types[i].typeid) == -1)
                            pbEMSG.ytzHandleMsgHistoryQuery(types[i].typeid - 0, "");
                    }
                } catch (e) {
                    console.log(e);
                }
            },
            unreadCallback() {
                try {
                    if (pbE.isPoboApp) {
                        store.commit("pbMessage", pbEMSG.ytzGetUnReadMsgCount());
                    }
                } catch (e) {
                    console.log(e);
                }
            }
        }
        pbMessage.init();
    }
}
