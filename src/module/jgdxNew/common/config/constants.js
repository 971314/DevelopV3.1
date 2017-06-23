//项目
let path;
if (process.env.NODE_ENV == 'dev') {
    path = "consult/";
}
if (process.env.NODE_ENV == 'production') {
    path = "https://test.yunyesoft.com/consult/";
}
export const projectPath = path;
//图片服务器前缀
export const PrefixImg = "https://test.yunyesoft.com/fsimg/";
//微信菜单栏配置
export const WxMenuConf = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx638babfb858e32f8&redirect_uri=http%3a%2f%2fservice.yunyesoft.com%2fjifen%2findex.html%3fpath%3d${path}%26params%3d${params}%26merchantNum%3d${merchantNum}&response_type=code&scope=snsapi_base&state=mineauth#wechat_redirect";

export const codes = {
    hyhd: {
        name: "会议活动",
        code: "005001"
    },
    schd: {
        name: "市场活动",
        code: "005002"
    },
    hyhg: {
        name: "会议回顾",
        code: "PBHYHG"
    },
};
export const typeIds = {
    dt: {
        name: "多头",
        title: "dt",
        typeId: 2
    },
    kt: {
        name: "空头",
        title: "kt",
        typeId: 3
    },
    j: {
        name: "净",
        title: "j",
        typeId: 4
    }
};
export const parts = {
    pbcjxw: { name: "首页-财经新闻", part: "PBCJXW" },
    pbsyrdjd: { name: "首页-热点解读", part: "PBSYRDJD" },
    pbscgg: { name: "首页-市场公告", part: "PBSCGG" },
    pbxgxw: { name: "新闻组件-相关新闻", part: "PBXGXW" },
    pbpzyb: { name: "新闻组件-品种研报", part: "PBPZYB" },
    pbgjscgg: { name: "新闻组件-市场公告", part: "PBGJSCGG" },
    pbqhjc: { name: "期货学院-期货基础", part: "PBQHJC" },
    pbqqjc: { name: "期货学院-期货期权基础", part: "PBQQJC" },
    pbjbmfx: { name: "期货学院-投资分析-基本面分析", part: "PBJBMFX" },
    pbjsmfx: { name: "期货学院-投资分析-技术面分析", part: "PBJSMFX" },
    pbjdtzll: { name: "期货学院-投资理论-经典投资理论", part: "PBJDTZLL" },
    pbcggw2: { name: "期货学院-投资理论-草根感悟", part: "PBCGGW2" },
    pbpxxxgg: { name: "培训信息-培训信息广告区", part: "PBPXXXGG" },
    pbhyhd: { name: "培训信息-会议活动", part: "PBHYHD" },
    pbschd: { name: "培训信息-市场活动", part: "PBSCHD" },
    pbhyhg: { name: "培训信息-会议回顾", part: "PBHYHG" },
    pbmrzp: { name: "建投优选-每日早评", part: "PBMRZP" },
    pbyfbg: { name: "建投优选-研发报告", part: "PBYFBG" },
    pbcjyw: { name: "建投优选-财经新闻", part: "PBCJYW" },
    pbzxrdjd: { name: "建投优选-热点解读", part: "PBZXRDJD" },
    pbrczp: { name: "走进中信建投-人才招聘", part: "PBRCZP" },
    pbgjjyrl: { name: "交易日历", part: "PBGJJYRL" }
};
// 分享地址
export const slImg = "newsBase/shortImg";
