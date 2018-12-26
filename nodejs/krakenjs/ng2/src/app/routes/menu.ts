export interface IMenu {
    header: { text: string, link: string };
    items: Array<{
        text: string,
        icon: string,
        link: string
    }>;
}

export const Menus: IMenu[] = [{
    header: {
        text: '快捷导航',
        link: '/home'
    },
    items: [{
        text: '首页',
        icon: 'icon-home',
        link: '/home'
    }, {
        text: 'flowchart.js',
        icon: 'icon-bulb',
        link: '/home'
    }, {
        text: 'go.js',
        icon: 'icon-bulb',
        link: '/gojs'
    }, {
        text: 'joint.js',
        icon: 'icon-bulb',
        link: '/jointjs'
    }, {
        text: 'jsPlumb',
        icon: 'icon-bulb',
        link: '/home'
    }]
}];

