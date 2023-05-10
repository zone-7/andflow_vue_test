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
  
  <div class="toolbar">
    <button type="button" @click="getFlow">获取流程内容</button>
    <button type="button" @click="setFlow">设置流程内容</button>
    
    <button type="button" @click="snap">截图</button>
    <div>
      <label>是否可编辑</label>
      <select id="editable_select" @change="changeEditable">
          <option value="true"  selected >是</option>
          <option value="false"  >否</option>
      </select>
    </div>

    <div>
        <label>连线样式</label>
        <select id="link_type_select" @change="changeLinkType">
            <option value="Flowchart" selected>流程</option>
            <option value="Straight" >直线</option>
            <option value="Bezier">曲线</option>
            <option value="StateMachine">状态</option>
        </select>
    </div>
    <div>
        <label>风格</label>
        <select id="theme_select" @change="changeTheme">
            <option value="flow_theme_default"  selected >默认样式</option>
            <option value="flow_theme_zone"  >右置标题</option>
            <option value="flow_theme_icon" >大图标</option>
            <option value="flow_theme_box" >方框</option>
        </select>
    </div>
    <div>
        <label>是否显示内容</label>
        <select id="showcontent_select" @change="changeActionContentVisible">
            <option value="true"  selected >是</option>
            <option value="false"  >否</option>
        </select>
    </div>
  </div>
  <div class="toolbar">
    <div>action颜色: <input id="action_color" value="green" /></div>
    <div>group颜色:<input id="group_color" value="#92b5f0" /></div>
    <div>list颜色:<input id="list_color" value="#7ce37c" /></div>
    <div>tip颜色:<input id="tip_color" value="#83ef83" /></div>
    <button type="button" @click="setColors">设置颜色</button>
  </div>

  <textarea type="textarea" style="width:100%;height:300px" v-model="content">
  </textarea>


  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

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

<style>
   /* @import '../node_modules/andflow/dist/andflow.css'; */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.toolbar{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  height: 40px;
}
</style>

