export const baseComps = [{
        id: 1,
        name: 'CButton',
        label: '按钮',
        left: 10,
        top: 10,
        index: 1,
        width: 100,
        height: 30,
        items: "按钮",
        isdrag:true,
        hidden:false,
        event:{'click':undefined}

    },
    {
        id: 2,
        name: 'CText',
        label: '文字',
        left: 10,
        top: 10,
        index: 1,
        width: 100,
        height: 30,
        items: "默认文字",
        isdrag:true,
        hidden:false,
        event:{'change':undefined}
    },
    {
        id: 3,
        name: 'CSteps',
        label: '步骤条',
        left: 10,
        top: 10,
        index: 1,
        width: 300,
        height: 50,
        items: [{
            title: 'Finished',
            description: 'You can hover on the dot.'
        }, {
            title: 'In Progress',
            description: 'You can hover on the dot.'
        }, {
            title: 'Waiting',
            description: 'You can hover on the dot.'
        }],
        isdrag:true,
        hidden:false
    },
    {
        id: 4,
        name: 'CBreadcrumb',
        label: '面包屑',
        left: 10,
        top: 10,
        index: 1,
        width: 300,
        height: 50,
        items:[
            {
              title: 'Home',
            },
            {
              title: <a href="">Application Center</a>,
            },
            {
              title: <a href="">Application List</a>,
            },
            {
              title: 'An Application',
            },
          ],
        isdrag:true,
        hidden:false
    }
]