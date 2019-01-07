<template>
    <div class="app-container">
        <div class="wraper">
            <div class="left">
                <div class="header-pic"><img src="./img/resume.jpg" alt="头像"></div>
                <div class="base-data">
                    <div><span class="fa fa-calendar"></span><span>{{age}}岁</span></div>
                    <div><span class="fa fa-address-card "></span><span>汉族</span></div>
                    <div><span class="fa fa-map-pin"></span><span>{{address}}</span></div>
                    <div><span class="fa fa-calendar-check-o"></span><span>2 年工作经验</span></div>
                    <div><span class="fa fa-phone"></span><span v-text="phone"></span></div>
                    <div><span class="fa fa-envelope"></span><span v-text="email"></span></div>
                </div>
                <div class="skill">
                    <div class="title">
                        <span class="fa fa-wrench"></span>
                        <span>技能特长</span>
                    </div>
                    <div class="skill-list">
                        <div class="list" v-for="skill in skills" v-bind:key="skill.name">
                            <div class="name" v-text="skill.name"></div>
                            <div class="context">
                                <div class="progress"><div class="fill-bar" :style="{ width: `${skill.len}%`}"></div><div class="empty-bar" :style="{ width: `${100 - skill.len}%`}"></div></div>
                                <div class="skilled" v-text="skill.skilled"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="header" v-text="name"></div>
                <div class="overview" v-text="overview"></div>
                <div class="education">
                    <div class="title">
                        <span class="fa fa-graduation-cap"></span>
                        <span class="text">教育背景</span>
                    </div>
                    <div class="content">
                        <div class="grad-wrap" v-for="edu in educations" v-bind:key="edu.school">
                            <div class="lists">
                                <span class="custom" v-text="edu.date"></span>
                                <span class="custom" v-text="edu.school"></span>
                                <span class="custom" v-text="edu.subject"></span>
                                <span class="custom" v-text="edu.top"></span>
                            </div>
                            <div class="grad-subject">
                                <span>主要研究：</span>
                                <span v-text="edu.detail"></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="work">
                    <div class="title">
                        <span class="fa fa-keyboard-o"></span>
                        <span class="text">工作经历</span>
                    </div>
                    <div class="content">
                        <div class="lists" v-for="work in works" v-bind:key="work.company">
                            <span class="default" v-text="work.date"></span>
                            <span class="default" v-text="work.company"></span>
                            <span class="default" v-text="work.position"></span>
                        </div>
                    </div>
                    <div class="detail">
                        <div class="title">主要项目经历：</div>
                        <div class="detail-lists">
                            <div class="detail-list" v-for="detail in detailLists" v-bind:key="detail.title">
                                <span class="pot"></span>
                                <div class="text">
                                    <div class="detail-title">
                                        <span v-text="detail.title"></span>
                                        <span v-text="detail.manager"></span>
                                    </div>
                                    <div class="detail-content" v-text="detail.detail">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="comment-self">
                    <div class="title">
                        <span class="fa fa-pencil-square-o"></span>
                        <span class="text">自我评价</span>
                    </div>
                    <div class="comment-wrap">
                        <div class="comment" v-for="cmt in commetMyselfs" v-bind:key="cmt">
                            <p v-text="cmt"></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'resume',
        data () {
            return {
                name: '陈河兵',
                age: 28,
                address: '杭州',
                phone: '18810665837',
                email: '1025263994@qq.com',
                overview: '一个既懂点交互，又能理解产品需求，还会后端的web前端工程师~~',
                skills: [{
                    name: 'es6+ & node',
                    len: 90,
                    skilled: '熟练',
                }, {
                    name: 'css',
                    len: 90,
                    skilled: '熟练',
                }, {
                    name: 'vue & react',
                    len: 85,
                    skilled: '熟练',
                }, {
                    name: 'koa2',
                    len: 85,
                    skilled: '熟练',
                }, {
                    name: 'webpack',
                    len: 80,
                    skilled: '熟练',
                }, {
                    name: '算法',
                    len: 80,
                    skilled: '掌握',
                }, {
                    name: 'WebAssembly',
                    len: 50,
                    skilled: '了解',
                }],
                educations: [{
                    date: '2010.09 - 2014.06',
                    school: '南京邮电大学',
                    subject: '通信工程',
                    top: '前10%',
                    detail: '单片机、FPGA现场可编程，多次参加电子设计大赛',
                }, {
                    date: '2014.09 - 2017.03',
                    school: '北京邮电大学',
                    subject: '信息与通信工程',
                    top: '前30%',
                    detail: '图像处理、基于 HEVC 的编码算法优化',
                }],
                works: [{
                    date: '2016.11 - 2018.3',
                    company: '美团点评',
                    position: 'web前端开发',
                }, {
                    date: '2018.4 - 至今',
                    company: '网易云音乐',
                    position: 'web前端开发',
                }],
                detailLists: [{
                    title: '基于 koa2 的 node 框架 - monking 开发',
                    manager: '',
                    detail: '刚到云音乐，发现我们是没有 node 端框架的。虽然目前静态部署在前端应用已经很普遍，但是要给前端同学赋能，做更多的事情一个好用的 node 框架是必不可少的。monking 基于 MVC 的设计理念，添加了 aop 的支持，具体可以参考 github 个人主页「https://github.com/chenhebing」。在 monking 的基础上，开发了晨读系统及配套的 chrome 插件，支持每日晨读自动推送；文档系统，模仿语雀功能实现等系统。目前也有其他三个团队在使用 monking 开发内部系统。',
                }, {
                    title: 'js bridge',
                    manager: '',
                    detail: '对于 H5 来说，调用 native 页面或者 native 功能是必须的。我们之前是直接使用协议跳转的方式来实现的，但是要多次调用协议就需要放在事件队列里面跳转，并且通过这种跳转链接拦截的方式也不是主流，于是提出开发 js 桥的方案。我主要负责了框架的搭建和 js bridge 的设计，提供了一个管理 api 的文档系统，js bridge 的 npm 包依赖文档，所有的 api 方法和 native 的协议 mapping 关系在文档系统里面维护，这样可以保证文档和 npm 永远是一致的。',
                }],
                commetMyselfs: [
                    '善于解决问题，勇于承担责任，在大学期间担任了两年班长和担任了一届科学与技术协会电子部主席，参加了多个电子类比赛并获奖。',
                    '研究生期间学习图像处理，视频编解码，研究算法理论，后学习并喜欢上了 web 开发。',
                    '在美团点评任职，开阔了眼界，学到了很多先进的技术，形成了初步的价值观，尤其以客户为中心的核心理念；在网易云音乐，不仅技术得到了极大的提升，而且能够发现工作中存在的问题，并通过开发工具来改善和提高效率。',
                ],
            };
        },
    };
</script>

<style lang="less">
    @import "./styles/font-awesome.min.css";
    @import "./styles/main.less";
    .app-container {
        width: 100%;
        height: 1140px;
        /*background-color: #1ebf92;*/
        display: flex;
        justify-content: center;
        .wraper {
            width: 820px;
            min-width: 820px;
            /*margin-top: 75px;*/
            display: flex;
            .left {
                width: 270px;
                background-color: #0b70bd;
                .header-pic {
                    margin-top: 60px;
                    text-align: center;
                    img {
                        border: 4px solid #e5e5e5;
                        width: 120px;
                        height: 150px;
                    }
                }
                .base-data {
                    color: white;
                    font-family: Microsoft YaHei;
                    font-size: 16px;
                    margin: 30px 0 0 30px;
                    overflow: hidden;
                    div {
                        display: flex;
                        align-items: center;
                        margin-bottom: 10px;
                        .fa {
                            margin-right: 10px;
                            font-size: 14px;
                            display: block;
                            width: 20px;
                            text-align: center;
                        }
                    }
                }
                .skill {
                    margin-top: 30px;
                    margin-left: 30px;
                    .title {
                        color: white;
                        font-size: 18px;
                        display: flex;
                        align-items: center;
                        .fa {
                            font-size: 24px;
                            margin-right: 10px;
                        }
                    }
                    .skill-list {
                        margin-top: 30px;
                        .list {
                            margin-bottom: 15px;
                            color: white;
                            .name {
                                font-size: 18px;
                                line-height: 30px;
                            }
                            .context {
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                .progress {
                                    height: 10px;
                                    width: 150px;
                                    display: flex;
                                    overflow: hidden;
                                    border-radius: 2px;
                                    .fill-bar {
                                        background-color: #329cec;
                                    }
                                    .empty-bar {
                                        background-color: white;
                                    }
                                }
                                .skilled {
                                    margin-right: 30px;
                                    font-size: 16px;
                                }
                            }
                        }
                    }
                }
            }
            .right {
                flex: 1;
                color: #333333;
                background-color: white;
                padding-left: 30px;
                padding-right: 30px;
                font-family: Microsoft YaHei;
                .header {
                    margin-top: 30px;
                    font-size: 30px;
                }
                .overview {
                    margin-top: 10px;
                    color: #878686;
                    font-size: 14px;
                }
                .grad-wrap {
                    margin-bottom: 10px;
                    .grad-subject {
                        color: #878686;
                        font-size: 14px;
                        padding-left: 20px;
                    }
                }
                .education, .work, .comment-self {
                    margin-top: 30px;
                    .title {
                        display: flex;
                        align-items: flex-end;
                        .fa {
                            margin-right: 10px;
                            display: block;
                            width: 30px;
                            height: 30px;
                            overflow: hidden;
                            border-radius: 15px;
                            color: white;
                            background-color: #0b70bd;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }
                        .text {
                            color: #0b70bd;
                            flex: 1;
                            font-size: 18px;
                            line-height: 30px;
                            border-bottom: 1px solid #0b70bd;
                        }
                    }
                    .content {
                        margin-top: 20px;
                        .lists {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            margin-bottom: 10px;
                            span:first-child {
                                text-align: left;
                                margin-left: 10px;
                            }
                            span:last-child {
                                text-align: right;
                                margin-right: 10px;
                            }
                            .custom {
                                flex-grow: 1;
                                text-align: center;
                                &:nth-child(1) {
                                    width: 30%;
                                }
                                &:nth-child(2) {
                                    width: 25%;
                                }
                                &:nth-child(3) {
                                    width: 30%;
                                }
                                &:nth-child(4) {
                                    width: 15%;
                                }
                            }
                            .default {
                                flex: 1;
                                text-align: center;
                            }
                        }
                    }
                    .detail {
                        margin-left: 10px;
                        margin-top: 15px;
                        font-size: 14px;
                        line-height: 22px;
                        .title {
                            color: #333;
                            font-size: 16px;
                        }
                        .detail-list {
                            display: flex;
                            max-height: 100%;
                            margin-top: 6px;
                            .pot {
                                display: block;
                                width: 4px;
                                height: 4px;
                                background-color: #878686;
                                border-radius: 2px;
                                margin-right: 10px;
                                margin-top: 10px;
                            }
                            .text {
                                flex: 1;
                                .detail-title {
                                    color: #666;
                                    margin-bottom: 4px;
                                    span:first-child {
                                        margin-right: 10px;
                                        font-weight: bold;
                                    }
                                }
                                .detail-content {
                                    color: #878686;
                                }
                            }
                        }
                    }
                    .comment-wrap {
                        margin: 20px 0 0 10px;
                        .comment {
                            color: #6f6f6f;
                            font-size: 14px;
                            line-height: 22px;
                            margin-bottom: 8px;
                            p {
                                text-indent: 28px;
                                text-align: justify;
                            }
                        }
                    }
                }
            }
        }
    }
    body {
        margin: 0;
    }
</style>
