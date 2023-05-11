# andflow vue 组件应用DEMO
本项目是andflow组件在VUE中使用的例子。andflow VUE组件是在andflow_js的基础上封装支持VUE框架的组件，功能和andflow_js相同。

欢迎共同学习、交流心得。

关注微信公众号了解更多: andflow
andflow_js GIT: https://github.com/zone-7/andflow_js
andflow VUE 组件DEMO GIT： https://github.com/zone-7/andflow_vue_test

下面是andflow组件的使用指南。
## 组件安装
```
npm install andflow
```

## 组件使用
### (1). 在页面中引入组件
```
import andflow from 'andflow'
```
### (2). 定义页面组件
```
export default {
  name: 'App',
  components: {
    andflow
  },
  ....
}
```
### (3).定义标签
```html
<template>
    <andflow 
    id="andflow"  
    style="width:100%;height:600px;" 
    :tags="tags"
    :meta="meta" 
    :model="model" 
    ></andflow>
</template>

```
 
###注意：
* 标签必须要包含id属性，并且唯一。
* tags属性为流程控件类别列表对象。
* meta属性为流程控件列表对象。
* model属性值为流程模型对象。
 

### (4).操作流程设计器
可以使用组件的引用操作流程设计器。
```html
<andflow id="andflow"  style="width:100%;height:600px;" 
  ref="andflowDesigner" ...... ></andflow>
```
```javascript
var andflow = this.$refs.andflowDesigner.getAndflow(); 
```
获取到andflow之后就可以灵活操作组件，andflow的使用方法可以参考andflow_js的方法。 
https://github.com/zone-7/andflow_js


## 使用案例
参考DEMO ： 
https://github.com/zone-7/andflow_vue_test

例如：
```html
<template>
<andflow id="andflow"  style="width:100%;height:600px;" 
  ref="andflowDesigner"
  :model="model" :meta="meta" :tags="tags"
   @action_click="action_click" 
   @action_dblclick="action_dblclick"
   @link_click="link_click"
   @link_dblclick="link_dblclick"
   @canvas_click="canvas_click"
   @canvas_dblclick="canvas_dblclick"
   @canvas_change="canvas_change"
   >
   </andflow>
</template>
<script>
import andflow from 'andflow'

export default {
  name: 'App',
  components: {
    andflow, HelloWorld
  },
  data() {

    var tags=['', '通用', '系统'];

    var metadata=[
        {

            "name": "begin",
            "tp":"action",
            "title": "开始",
            "des": "开始",
            "group": "通用",
            "tag": "通用",
            "css": "begin",
            "icon": "begin.png", 
            "params": [],
            "params_html": "",
            "params_script": ""
        },
        {
            "name": "end",
            "tp":"action",
            "title": "结束",
            "des": "结束",
            "group": "通用",
            "tag": "通用",
            "css": "end",
            "icon": "end.png", 
            "params": [],
            "params_html": "",
            "params_script": ""
        },
        {
            "name": "group",
            "tp":"group",
            "title": "分组",
            "des": "分组",
            "group": "通用",
            "tag": "通用",
            "css": "group",
            "icon": "group.png", 
            "params": [],
            "params_html": "",
            "params_script": ""
        },
        {
            "name": "tip",
            "tp":"tip",
            "title": "标签",
            "des": "标签",
            "group": "通用",
            "tag": "通用",
            "css": "tip",
            "icon": "tip.png", 
            "params": [],
            "params_html": "",
            "params_script": ""
        },
        {
            "name": "script",
            "tp":"action",
            "title": "执行脚本",
            "des": "",
            "group": "通用",
            "tag": "通用",
            "css": "",
            "icon": "script.png", 
            "params": [],
            "params_html": "",
            "params_script": ""
        },

        {
            "name": "cmd",
            "tp":"action",
            "title": "系统命令",
            "des": "",
            "group": "系统",
            "tag": "系统",
            "css": "",
            "icon": "cmd.png", 
            "params": [
                {
                    "name": "command",
                    "title": "命令",
                    "placeholder": "操作系统指令",
                    "element": "textarea",
                    "default": "",
                    "attrs": {
                        "rows": "4"
                    },
                    "options": null,
                    "option_mode": ""
                },
                {
                    "name": "timeout",
                    "title": "超时（毫秒）",
                    "placeholder": "超时毫秒",
                    "element": "input",
                    "default": "10000",
                    "attrs": {
                        "type": "number"
                    },
                    "options": null,
                    "option_mode": ""
                },
                {
                    "name": "cache",
                    "title": "执行结果参数名",
                    "placeholder": "执行结果存储到哪个参数变量",
                    "element": "",
                    "default": "",
                    "attrs": null,
                    "options": null,
                    "option_mode": ""
                }
            ],
            "params_html": "",
            "params_script": ""
        },
        {
            "name": "server",
            "tp":"action",
            "title": "服务器",
            "des": "",
            "group": "通用",
            "tag": "通用",
            "css": "",
            "icon": "server.png", 
            "params": [],
            "params_html": "",
            "params_script": ""
        },
        {
            "name": "fireware",
            "tp":"action",
            "title": "防火墙",
            "des": "",
            "group": "通用",
            "tag": "通用",
            "css": "",
            "icon": "fireware.png", 
            "params": [],
            "params_html": "",
            "params_script": ""
        },
        {
            "name": "mysql",
            "tp":"action",
            "title": "Mysql",
            "des": "",
            "group": "通用",
            "tag": "通用",
            "css": "",
            "icon": "mysql.png", 
            "params": [],
            "params_html": "",
            "params_script": ""
        },
        {
            "name": "redis",
            "tp":"action",
            "title": "Redis",
            "des": "",
            "group": "通用",
            "tag": "通用",
            "css": "",
            "icon": "redis.png", 
            "params": [],
            "params_html": "",
            "params_script": ""
        },
        {
            "name": "mongodb",
            "tp":"action",
            "title": "MongoDB",
            "des": "MongogDB 文件服务器",
            "group": "通用",
            "tag": "通用",
            "css": "",
            "icon": "mongodb.png", 
            "params": [],
            "params_html": "",
            "params_script": ""
        },
        {
            "name": "nginx",
            "tp":"action",
            "title": "Nginx",
            "des": "负载均衡",
            "group": "通用",
            "tag": "通用",
            "css": "",
            "icon": "nginx.png", 
            "params": [],
            "params_html": "",
            "params_script": ""
        },
        { 
            "name": "erd",
            "tp":"list",
            "title": "数据库实体",
            "des": "数据库实体",
            "group": "ER图",
            "tag": "ER图",
            "css": "list",
            "icon": "list.png", 
            "params": [],
            "params_html": "",
            "params_script": ""
        },
        {
            "name": "custom_action",
            "tp":"action",
            "title": "自定义类型",
            "des": "自定义类型",
            "group": "自定义",
            "tag": "自定义", 
            "icon": "person.png", 
            "render": function(meta,action,html){
                var el = '<div style="width:100px;height:100px;background-image:url(../img/shape/diamond.png);background-size: 100% 100%; background-repeat:no-repeat;">'+
                    
                    '<div style="font-size:12px;line-height:12px;position:absolute;text-align:center;height:100%;width:100%;top:calc(50% - 6px);">'+meta.title+'</div>'+
                    
                    '</div>';
                
                return el;
            }
        }, 
        {
            "name": "custom_group",
            "tp":"group",
            "title": "自定义分组",
            "des": "自定义分组",
            "group": "自定义",
            "tag": "自定义", 
            "icon": "person.png", 
            "render": function(meta,action,html){
                var el = '<div style="width:300px;height:300px;border:1px solid #999999;background:white;"></div>';
                return el;
            }
        },
    ] ;

    var flowModel= {
        "code": "",
        "name": "",
        "show_action_body": "true",
        "show_action_content": "true",
        "theme": "flow_theme_default",
        "link_type": "Flowchart",
        "params": [],
        "actions": [
          {
            "id": "f7a6ec0031784f5a80d8633a6418fd52",
            "left": "60px",
            "top": "20px",
            "name": "begin",
            "params": {},
            "title": "开始",
            "icon": "begin.png",
            "width": "84px",
            "height": "48px",
            "content": {
              "content_type": "msg",
              "content": "asdas"
            },
            "theme": null,
            "once": "false",
            "collect": "false",
            "script": "",
            "body_width": null,
            "body_height": null
          },
          {
            "id": "f558687ca5f34a6c89732eb50749a15a",
            "left": "550px",
            "top": "430px",
            "name": "end",
            "params": {},
            "title": "结束",
            "icon": "end.png",
            "width": "68px",
            "height": "41px",
            "body_width": null,
            "body_height": null
          },
          {
            "id": "793a2a11cf8b40e9afd8bd8f04405e64",
            "left": "80px",
            "top": "110px",
            "name": "script",
            "theme": "action_theme_icon",
            "params": {},
            "title": "执行脚本1",
            "icon": "script.png",
            "width": "50px",
            "height": "50px",
            "body_width": null,
            "body_height": null
          },
          {
            "id": "f2564ac9862b4bc281226f0b22e84dd8",
            "left": "40px",
            "top": "250px",
            "name": "script",
            "params": {},
            "title": "执行脚本2",
            "icon": "script.png",
            "width": "150px",
            "height": "100px",
            "body_width": null,
            "body_height": null
          },
          {
            "id": "1c53b069bfd34d4da0ac0d74d8e539d5",
            "left": "50px",
            "top": "420px",
            "name": "script",
            "theme": "action_theme_zone",
            "params": {},
            "title": "执行脚本3",
            "icon": "script.png",
            "width": "150px",
            "height": "100px",
            "content": {
              "content_type": "msg",
              "content": "执行JS脚本"
            },
            "body_width": null,
            "body_height": null
          },
          {
            "id": "0a0af8e69c64465f92b07d9067f99f7b",
            "left": "290px",
            "top": "440px",
            "name": "script",
            "params": {},
            "title": "执行脚本4",
            "icon": "script.png",
            "width": "150px",
            "height": "50px",
            "content": {
              "content_type": "msg",
              "content": "aaaaa"
            },
            "theme": "action_theme_box",
            "once": "false",
            "collect": "false",
            "script": "",
            "body_width": null,
            "body_height": null
          }
        ],
        "links": [
          {
            "source_id": "f7a6ec0031784f5a80d8633a6418fd52",
            "target_id": "793a2a11cf8b40e9afd8bd8f04405e64"
          },
          {
            "source_id": "0a0af8e69c64465f92b07d9067f99f7b",
            "target_id": "f558687ca5f34a6c89732eb50749a15a"
          },
          {
            "source_id": "793a2a11cf8b40e9afd8bd8f04405e64",
            "target_id": "f2564ac9862b4bc281226f0b22e84dd8"
          },
          {
            "source_id": "f2564ac9862b4bc281226f0b22e84dd8",
            "target_id": "1c53b069bfd34d4da0ac0d74d8e539d5"
          },
          {
            "source_id": "1c53b069bfd34d4da0ac0d74d8e539d5",
            "target_id": "0a0af8e69c64465f92b07d9067f99f7b"
          }
        ],
        "groups": [
          {
            "id": "group_0635db62978df4e850aad8049fa41dda",
            "name": "group",
            "left": "288px",
            "top": "42px",
            "actions": [],
            "members": [],
            "width": "200px",
            "height": "200px",
            "title": "组"
          }
        ],
        "lists": [
          {
            "id": "list_8957e867d11ae4911d87f291e23b7ef8",
            "name": "erd",
            "left": "725px",
            "top": "42px",
            "items": [
              {
                "id": "list_item_list_8957e867d11ae4911d87f291e23b7ef8_0",
                "title": "a"
              },
              {
                "id": "list_item_list_8957e867d11ae4911d87f291e23b7ef8_1",
                "title": "b"
              },
              {
                "id": "list_item_list_8957e867d11ae4911d87f291e23b7ef8_2",
                "title": "c"
              },
              {
                "id": "list_item_list_8957e867d11ae4911d87f291e23b7ef8_3",
                "title": "d"
              }
            ],
            "width": "150px",
            "height": "200px",
            "title": "列表"
          }
        ],
        "tips": [
          {
            "id": "tip_e243bea46c9b6d033fa08ce011d30da1",
            "name": "tip",
            "left": "540px",
            "top": "41px",
            "content": "TIP",
            "width": "150px",
            "height": "100px"
          }
        ]
      };

    return {  
      content:'', 
      tags,
      meta:metadata,
      model:flowModel,
    };
  },
  
  methods:{
    action_click:function(meta, action){
       console.info("click:"+action.id);
    },
    action_dblclick:function(meta, action){
       console.info('dblclick:'+action.id);
    },
    link_click:function(link){
       console.info('linkclick:'+link.source_id+'-->'+link.target_id);
    },
    link_dblclick:function(link){
       console.info('linkdblclick:'+link.source_id+'-->'+link.target_id);
    },
    canvas_click:function(e){
       console.info('canvasclick');
    },
    canvas_dblclick:function(e){
       console.info('canvasdblclick');
    },
    canvas_change:function(){
      console.info('event_canvas_changed');
    },
    getFlow:function(){
      var model = this.$refs.andflowDesigner.getFlow();
      var content = JSON.stringify(model, null, "  ");

      this.content = content;
    },
    setFlow:function(){
      try{
        var model = JSON.parse(this.content); 
        this.$refs.andflowDesigner.setFlow(model);
      
      }catch(e){
        console.error(e);
        alert("JSON格式错误")
      }
       
    },
    snap:function(){
       this.$refs.andflowDesigner.snap();
    },
    changeEditable:function(e){
       var editable = e.target.value;
      this.$refs.andflowDesigner.setEditable(editable=='true');

    },
    changeLinkType:function(e){
      var link_type = e.target.value;
      this.$refs.andflowDesigner.setLinkType(link_type);

    },
    changeTheme:function(e){
      var theme = e.target.value;
      this.$refs.andflowDesigner.setTheme(theme);
    },
    changeActionContentVisible:function(e){
      var showContent = e.target.value;
      this.$refs.andflowDesigner.setActionContentVisible(showContent=='true');
    },
    setColors:function(e){ 
        var action_color = document.getElementById("action_color").value;
        var group_color = document.getElementById("group_color").value;
        var list_color = document.getElementById("list_color").value;
        var tip_color = document.getElementById("tip_color").value;

        var action_id = 'f2564ac9862b4bc281226f0b22e84dd8';
        var group_id='group_0635db62978df4e850aad8049fa41dda';
        var list_id = 'list_8957e867d11ae4911d87f291e23b7ef8';
        var tip_id = 'tip_e243bea46c9b6d033fa08ce011d30da1';
        
        var andflow =  this.$refs.andflowDesigner.getAndflow();

        andflow.setActionBorderColor(action_id, action_color);
        andflow.setActionHeaderColor(action_id, action_color);
        andflow.setActionHeaderTextColor(action_id, 'black'); 
        andflow.setActionBodyColor(action_id, 'white');
        andflow.setActionBodyTextColor(action_id, 'black');

        andflow.setGroupBorderColor(group_id, group_color);
        andflow.setGroupHeaderColor(group_id, group_color);
        andflow.setGroupHeaderTextColor(group_id, 'black');
        andflow.setGroupBodyColor(group_id, 'yellow'); 
        andflow.setGroupBodyTextColor(group_id, 'black');



        andflow.setListBorderColor(list_id, list_color);
        andflow.setListHeaderColor(list_id, list_color);
        andflow.setListHeaderTextColor(list_id, 'black');
        andflow.setListItemColor(list_id, list_color);
        andflow.setListItemTextColor(list_id, 'black');
        

        andflow.setTipBorderColor(tip_id, tip_color); 
        andflow.setTipBodyColor(tip_id, tip_color);
        andflow.setTipBodyTextColor(tip_id, 'black');
 
    }
  }
}
</script>
```
