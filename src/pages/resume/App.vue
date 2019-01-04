<template>
    <div class="app-container">
        <div class="wraper">
            <div class="left">
                <div class="header-pic"><img src="../../assets/img/resume.jpg" alt=""></div>
                <div class="base-data">
                    <div><span class="fa fa-calendar"></span><span>{{age}}岁</span></div>
                    <div><span class="fa fa-address-card "></span><span>汉族</span></div>
                    <div><span class="fa fa-map-pin"></span><span>{{address}}</span></div>
                    <div><span class="fa fa-calendar-check-o"></span><span>1 年工作经验</span></div>
                    <div><span class="fa fa-phone"></span><span v-text="phone"></span></div>
                    <div><span class="fa fa-envelope"></span><span v-text="email"></span></div>
                </div>
                <div class="skill">
                    <div class="title">
                        <span class="fa fa-wrench"></span>
                        <span>技能特长</span>
                    </div>
                    <div class="skill-list">
                        <div class="list" v-for="skill in skills">
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
                        <div class="lists" v-for="edu in educations">
                            <span class="custom" v-text="edu.date"></span>
                            <span class="custom" v-text="edu.school"></span>
                            <span class="custom" v-text="edu.subject"></span>
                            <span class="custom" v-text="edu.top"></span>
                        </div>
                    </div>
                </div>
                <div class="work">
                    <div class="title">
                        <span class="fa fa-keyboard-o"></span>
                        <span class="text">工作经历</span>
                    </div>
                    <div class="content">
                        <div class="lists" v-for="work in works">
                            <span class="default" v-text="work.date"></span>
                            <span class="default" v-text="work.company"></span>
                            <span class="default" v-text="work.position"></span>
                        </div>
                    </div>
                    <div class="detail">
                        <div class="title">主要项目经历：</div>
                        <div class="detail-lists">
                            <div class="detail-list" v-for="detail in detailLists">
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
                        <div class="comment" v-for="cmt in commetMyselfs">
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
                age: 27,
                address: '北京',
                phone: '18810665837',
                email: '1025263994@qq.com',
                overview: '一个既懂点交互，又能理解产品需求，还会后端的web前端工程师~~',
                skills: [{
                    name: 'es6+ & node',
                    len: 85,
                    skilled: '熟练'
                }, {
                    name: 'css',
                    len: 85,
                    skilled: '熟练'
                }, {
                    name: 'vue & react',
                    len: 80,
                    skilled: '熟练'
                }, {
                    name: 'koa2',
                    len: 70,
                    skilled: '熟练'
                }, {
                    name: 'webpack',
                    len: 68,
                    skilled: '熟练'
                }, {
                    name: 'canvas',
                    len: 65,
                    skilled: '掌握'
                }, {
                    name: '微信小程序 & wepy',
                    len: 65,
                    skilled: '掌握'
                }, {
                    name: '算法',
                    len: 65,
                    skilled: '掌握'
                }],
                educations: [{
                    date: '2010.09 - 2014.06',
                    school: '南京邮电大学',
                    subject: '通信工程',
                    top: '前10%'
                }, {
                    date: '2014.09 - 2017.03',
                    school: '北京邮电大学',
                    subject: '信息与通信工程',
                    top: '前30%'
                }],
                works: [{
                    date: '2016.11 - 至今（包括实习）',
                    company: '美团点评',
                    position: 'web前端开发'
                }],
                detailLists: [{
                    title: '脚手架工具',
                    manager: '负责人',
                    detail: '此项目为一个命令行工具，孕育于公司发布系统迁移，需要频繁的修改配置文件的背景下，旨在通过工具，减少迁移的工作量。此项目仿vue-cli，将脚手架和模板文件分开，方便后续添加新的模板。'
                }, {
                    title: '流程系统',
                    manager: '成员',
                    detail: '此项目是组内的的技术项目，采用的是koa + react + mobx的技术方案，解决了一个需求从创建到交付的整个过程中流程不清晰的问题，使需求的进程一目了然，明确了各个阶段的deadline，降低了沟通成本。'
                }, {
                    title: '技术栈升级',
                    manager: '负责人',
                    detail: '团队使用的技术栈（node4.4 + koa1）很陈旧，升级为node8.9 + koa2 的面向未来编程的技术栈。优化了部分中间件的效率，接入了异常报警系统及node端埋点的日志系统。'
                }, {
                    title: '数据可视化、移动端业务需求等',
                    manager: '',
                    detail: ''
                }],
                commetMyselfs: [
                    '我善于解决问题，勇于承担责任，在大学期间担任了两年班长和担任了一届科学与技术协会电子部主席，参加了多个电子类比赛并获奖。',
                    '研究生期间研究算法，学习web开发，最终选择了发展如火如荼的web前端开发作为未来职业。',
                    '在美团点评工作的一年中，自己的技术水平得到了快速的提升，现在可以独立完成业务需求及技术项目；能够快速定位用户反馈的问题，并解决或者转接给相关问题负责人修复；会积极主动推动部门间优化、改进或拓展现有的系统方案。',
                    '除了技术，美团点评的价值观对我也有深刻的影响。尤其以客户为中心，让我明白了，做产品要站在用户的角度思考问题，要为用户提供一个完整流畅易懂的产品，最终对产品负责，而不仅仅是完成前端的需求。',
//                    '最近收到贵司的邮件，要组建一个斑马英语的团队，特别感兴趣，希望能加入其中，一起成长！'
                    '美团点评是一家不错的公司，但是未来在北京留不下来。决定未来定居在杭州，希望能够加入阿里的大家庭，一起成长。'
                ]
            };
        },
        mounted () {
            return;
        }
    };
</script>

<style lang="scss">
    @import "../../styles/main.scss";
    @import "../../styles/font-awesome.min.css";
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
                                flex-grow: 1;
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
</style>
