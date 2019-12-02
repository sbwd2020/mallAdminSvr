exports.ids=[2],exports.modules={84:function(t,e,o){"use strict";var l=o(5),r=o.n(l),n={async post(t,data){console.log("axios node_env:","production");let e="http://mall.admin.jianpiane.com";console.log("axios domain:",e),t=e+t,console.log("axios url: ",t);let o=await r.a.post(t,data);return console.log("axios status: ",o.status),o.data}};e.a={getUserIdByMobile:async data=>await n.post("/api/user/data/getUserIdByMobile",{mobile:data.mobile}),getListByUserIds:async data=>await n.post("/api/user/data/getListByUserIds",{user_ids:data.user_ids}),getOrderList:async data=>await n.post("/api/mall/order/list",data),cancelOrder:async data=>await n.post("/api/mall/order/cancel",data),updateOrder:async data=>await n.post("/api/mall/order/update",data),paymentCreate:async data=>await n.post("/api/mall/payment/create",data),paymentComplete:async data=>await n.post("/api/mall/payment/complete",data),getPaymentList:async data=>await n.post("/api/mall/payment/list",data),getGoodsList:async data=>(data.business_id=0,await n.post("/api/mall/goods/list",data)),goodsDataCreate:async data=>(data.business_id=0,await n.post("/api/mall/goods/create",data)),goodsDataUpdate:async data=>(data.business_id=0,await n.post("/api/mall/goods/update",data)),categoryDataUpdate:async data=>(data.business_id=0,await n.post("/api/mall/goods/categoryUpdate",data)),getGoodsCategoryList:async data=>(data.business_id=0,await n.post("/api/mall/goods/categorys",data)),statisticsTodayData:async(data={})=>await n.post("/api/mall/statistics/today",data)}},85:function(t,e,o){"use strict";var l=o(83),r=o.n(l);e.a={formValidata:t=>new Promise((e,o)=>{t.validate(t=>{e(!!t)})}),unLimitTreeLevel(t,e=0){var o=[],l=function(t,e,r){for(var i=0;i<t.length;i++){var n=t[i];if(n.pid==e){n.level=r,n.html="";for(let t=0;t<r;t++)n.html+=" -- ";o.push(n),l(t,n.id,r+1)}}};return l(t,e,0),o},getTimestamp(t){let e=new Date(t);return parseInt(e.getTime()/1e3)},dateFormat(t,e){e=e||"YYYY-MM-DD HH:mm";let o=null;return o=t?new Date(1e3*t):new Date,r()(o).format(e)},dateDisplay(t){let e=parseInt(Date.now()/1e3)-t;if(e<60)return e+"秒前";if(e>=60&&e<3600)return parseInt(e/60).toString()+"分钟前";if(e>=3600&&e<86400)return parseInt(e/3600).toString()+"小时前";if(e>=86400&&e<2592e3)return parseInt(e/3600/24).toString()+"天前";{let e="YYYY-MM-DD HH:mm",o=new Date(1e3*t);return r()(o).format(e)}},monthPlus(t,e=1,o=!0){let l=[31,28,31,30,31,30,31,31,30,31,30,31],r=parseInt(this.dateFormat(t,"YYYY")),n=parseInt(this.dateFormat(t,"MM")),c=parseInt(this.dateFormat(t,"DD"));l[1]=r%4==0&&r/100!=0||r%100==0&&r%400==0?29:28;let d=0;d+=l[n-1]-c;for(let i=0;i<e;i++){(n+=1)>12&&(n=1,r+=1),l[1]=r%4==0&&r/100!=0||r%100==0&&r%400==0?29:28;let t=l[n-1];i==e-1&&(t=t-c<0?t:c),console.log("for days:",t),d+=t}return o?(t=t||parseInt(Date.now()/1e3))+24*d*3600:d}}},89:function(t,e,o){"use strict";o.r(e);var l=o(84),r={head:()=>({title:"商品管理"}),data:()=>({listData:{list:[],page:1,limit:10,count:0,search:""},categorys:[],dialogGoodsUpdateVisible:!1,goodsInfoUpdateBtn:{disabled:!1},formGoodsData:{id:0,title:"",category_id:"",description:"",sku_id:"",stock:0,sales:0,price:0,price_cost:0,price_market:0,is_recommend:0,is_new:0,type_sub:0,package_level:0,package_profit:0,sort:0,thumb:"",cover:"",pics:[],status:0},fileListThumb:[],fileListCover:[],rulesFormGoodsUpdate:{title:[{required:!0,message:"请输入活商品名称",trigger:"blur"}],category_id:[{required:!0,message:"请选择商品分类",trigger:"change"}],sku_id:[{required:!0,message:"请输入商品货号",trigger:"blur"}]},packageLevels:[{id:0,title:"不是套餐"},{id:1,title:"A级"},{id:2,title:"B级"}],uploadSingleAction:"http://api.jianpiane.com/upload/single"}),methods:{...o(85).a,async getListData(){let data={};data.page=this.listData.page,data.limit=this.listData.limit,data.search=this.listData.search;try{let t=await l.a.getGoodsList(data);if(console.log("/getListData dataRet:",t),0!==t.code)throw new Error(t.message);this.listData.count=t.data.count,t.data.rows.forEach(t=>{this.listData.list.push(t)})}catch(t){this.$message.error(t.message||"获取用户数据失败")}},async getListRefresh(){this.listData.list=[],this.listData.count=0,this.getListData()},getLsitSearch(){this.listData.list=[],this.listData.count=0,this.listData.page=1,this.getListData()},async getCategorys(){let t=await l.a.getGoodsCategoryList({limit:0,status:1});this.categorys=t.data.rows},pageChange(t){this.listData.list=[],this.listData.page=t,this.getListData()},goodsUpdateBtnClick(t){console.log("/goodsUpdateBtnClick item:",t),Object.keys(this.formGoodsData).forEach(e=>{t.hasOwnProperty(e)&&(e.indexOf("price")>-1||"package_profit"==e?this.formGoodsData[e]=parseFloat((t[e]/100).toFixed(2)):this.formGoodsData[e]=t[e])}),this.fileListThumb=t.thumb?[{name:"",url:t.thumb}]:[],this.fileListCover=t.cover?[{name:"",url:t.cover}]:[],console.log("/goodsUpdateBtnClick formGoodsData:",this.formGoodsData),this.dialogGoodsUpdateVisible=!0},goodsAddBtnClick(){this.formGoodsData={id:0,title:"",category_id:"",description:"",sku_id:"",stock:0,sales:0,price:0,price_cost:0,price_market:0,is_recommend:0,is_new:0,type_sub:0,package_level:0,package_profit:0,sort:0,thumb:"",cover:"",pics:[],status:0},this.dialogGoodsUpdateVisible=!0},async goodsDeleteBtnClick(t){try{let t=await this.$confirm("此操作将永久删除该商品, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"});if(console.log("/goodsDeleteBtnClick confirm",t),"confirm"!==t)return}catch(t){return void console.error("/goodsDeleteBtnClick err:",t.message||t)}let data=Object.assign({},t);data.status=-1;try{let t=await l.a.goodsDataUpdate(data);if(0!==t.code)throw new Error(t.message);this.$message.success("更新商品数据成功"),this.getListRefresh()}catch(t){this.$message.error(t.message)}},async goodsInfoUpdate(){let t=await this.$refs.formGoodsUpdate.validate();if(console.log("/goodsInfoUpdate valid:",t),!0!==t)return;let data=Object.assign({},this.formGoodsData);data.price=parseInt(100*data.price),data.price_cost=parseInt(100*data.price_cost),data.price_market=parseInt(100*data.price_cost),data.package_profit=parseInt(100*data.package_profit),data.thumb=this.fileListThumb.length?this.fileListThumb[0].url:"",data.cover=this.fileListCover.length?this.fileListCover[0].url:"",console.log("/goodsInfoUpdate data:",data),this.goodsInfoUpdateBtn.disabled=!0;try{let t;if(0!==(t=data.id?await l.a.goodsDataUpdate(data):await l.a.goodsDataCreate(data)).code)throw new Error(t.message);this.$message.success("更新商品数据成功"),this.getListRefresh()}catch(t){this.$message.error(t.message)}this.goodsInfoUpdateBtn.disabled=!1,this.dialogGoodsUpdateVisible=!1},handlePreviewThumb(t,e){console.log("/handlePreview file:",t),console.log("/handlePreview fileList:",e)},handleRemoveThumb(t){console.log("/handleRemove file:",t)},handSuccessThumb(t,e,o){console.log("/handSuccessThumb res:",t),console.log("/handSuccessThumb file:",e),console.log("/handSuccessThumb list:",o),this.fileListThumb=[{name:e.name,url:t.data.url}]},handlePreviewCover(t,e){console.log("/handlePreviewCover file:",t),console.log("/handlePreviewCover fileList:",e)},handleRemoveCover(t){console.log("/handleRemoveCover file:",t)},handSuccessCover(t,e,o){console.log("/handSuccessCover res:",t),console.log("/handSuccessCover file:",e),console.log("/handSuccessCover list:",o),this.fileListCover=[{name:e.name,url:t.data.url}]}},created(){this.getListData(),this.getCategorys()}},n=o(2),component=Object(n.a)(r,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("el-table",{attrs:{data:t.listData.list}},[o("el-table-column",{attrs:{prop:"id"}},[o("template",{slot:"header"},[o("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.goodsAddBtnClick}},[t._v("添加")])],1)],2),t._v(" "),o("el-table-column",{attrs:{label:"sku",prop:"sku_id"}}),t._v(" "),o("el-table-column",{attrs:{label:"图片"},scopedSlots:t._u([{key:"default",fn:function(t){return[o("img",{staticStyle:{height:"40px"},attrs:{src:t.row.thumb||t.row.cover}})]}}])}),t._v(" "),o("el-table-column",{attrs:{label:"商品名称",prop:"title"}}),t._v(" "),o("el-table-column",{attrs:{label:"分类"},scopedSlots:t._u([{key:"default",fn:function(e){return t._l(t.categorys,(function(l){return l.id==e.row.category_id?o("span",[t._v(t._s(l.title))]):t._e()}))}}])}),t._v(" "),o("el-table-column",{attrs:{label:"库存",prop:"stock"}}),t._v(" "),o("el-table-column",{attrs:{label:"销量",prop:"sales"}}),t._v(" "),o("el-table-column",{attrs:{label:"售卖价格"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("span",{staticClass:"text-red-500"},[t._v("￥"+t._s((e.row.price/100).toFixed(2)))])]}}])}),t._v(" "),o("el-table-column",{attrs:{label:"成本"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("span",{staticClass:"text-red-500"},[t._v("￥"+t._s((e.row.price_cost/100).toFixed(2)))])]}}])}),t._v(" "),o("el-table-column",{attrs:{label:"市场价格"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("span",{},[t._v("￥"+t._s((e.row.price_market/100).toFixed(2)))])]}}])}),t._v(" "),o("el-table-column",{attrs:{label:"推荐"},scopedSlots:t._u([{key:"default",fn:function(e){return[1==e.row.is_recommend?o("span",[o("i",{staticClass:"el-icon-check"})]):t._e()]}}])}),t._v(" "),o("el-table-column",{attrs:{label:"新品"},scopedSlots:t._u([{key:"default",fn:function(e){return[1==e.row.is_new?o("span",[o("i",{staticClass:"el-icon-check"})]):t._e()]}}])}),t._v(" "),o("el-table-column",{attrs:{label:"套餐"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.package_level>0?o("span",t._l(t.packageLevels,(function(l){return l.id==e.row.package_level?o("span",{key:l.id},[t._v(t._s(l.title))]):t._e()})),0):t._e()]}}])}),t._v(" "),o("el-table-column",{attrs:{label:"排序",prop:"sort"}}),t._v(" "),o("el-table-column",{attrs:{label:"状态",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[0==e.row.status?o("span",{staticClass:"text-gray-500"},[t._v("未上架")]):t._e(),t._v(" "),1==e.row.status?o("span",{staticClass:"text-green-500"},[t._v("已上架")]):t._e()]}}])}),t._v(" "),o("el-table-column",{attrs:{align:"right",width:"240"},scopedSlots:t._u([{key:"header",fn:function(e){return[o("el-input",{staticClass:"inline-block",attrs:{size:"mini",placeholder:"输入关键字搜索"},on:{change:t.getLsitSearch},model:{value:t.listData.search,callback:function(e){t.$set(t.listData,"search",e)},expression:"listData.search"}})]}},{key:"default",fn:function(e){return[o("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:function(o){return t.goodsUpdateBtnClick(e.row)}}},[t._v("查看 / 编辑")]),t._v(" "),o("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(o){return t.goodsDeleteBtnClick(e.row)}}},[t._v("删除")])]}}])})],1),t._ssrNode(" "),o("el-pagination",{staticClass:"mt-4",attrs:{"current-page":t.listData.page,"page-size":t.listData.limit,layout:"prev, pager, next, total, jumper",total:t.listData.count},on:{"current-change":t.pageChange,"prev-click":t.pageChange,"next-click":t.pageChange}}),t._ssrNode(" "),o("el-dialog",{attrs:{title:"商品添加 / 编辑",visible:t.dialogGoodsUpdateVisible},on:{"update:visible":function(e){t.dialogGoodsUpdateVisible=e}}},[o("el-form",{ref:"formGoodsUpdate",attrs:{model:t.formGoodsData,"label-width":"100px",rules:t.rulesFormGoodsUpdate}},[o("el-form-item",{attrs:{label:"商品名称",prop:"title"}},[o("el-input",{model:{value:t.formGoodsData.title,callback:function(e){t.$set(t.formGoodsData,"title",e)},expression:"formGoodsData.title"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"商品分类",prop:"category_id"}},[o("el-select",{attrs:{placeholder:"请选择"},model:{value:t.formGoodsData.category_id,callback:function(e){t.$set(t.formGoodsData,"category_id",e)},expression:"formGoodsData.category_id"}},t._l(t.categorys,(function(t){return o("el-option",{key:t.id,attrs:{label:t.title,value:t.id}})})),1)],1),t._v(" "),o("el-form-item",{attrs:{label:"上架状态"}},[o("el-radio",{attrs:{label:1},model:{value:t.formGoodsData.status,callback:function(e){t.$set(t.formGoodsData,"status",e)},expression:"formGoodsData.status"}},[t._v("已上架")]),t._v(" "),o("el-radio",{attrs:{label:0},model:{value:t.formGoodsData.status,callback:function(e){t.$set(t.formGoodsData,"status",e)},expression:"formGoodsData.status"}},[t._v("未上架")])],1),t._v(" "),o("el-form-item",{attrs:{label:"商品描述"}},[o("el-input",{attrs:{type:"textarea",rows:2,placeholder:"请输入内容"},model:{value:t.formGoodsData.description,callback:function(e){t.$set(t.formGoodsData,"description",e)},expression:"formGoodsData.description"}})],1),t._v(" "),o("div",{staticClass:"flex flex-wrap"},[o("el-form-item",{staticClass:"flex-1",attrs:{label:"货号",prop:"sku_id"}},[o("el-input",{model:{value:t.formGoodsData.sku_id,callback:function(e){t.$set(t.formGoodsData,"sku_id",e)},expression:"formGoodsData.sku_id"}})],1),t._v(" "),o("el-form-item",{staticClass:"flex-1",attrs:{label:"库存"}},[o("el-input-number",{attrs:{min:-1,label:"-1代表无限库存"},model:{value:t.formGoodsData.stock,callback:function(e){t.$set(t.formGoodsData,"stock",e)},expression:"formGoodsData.stock"}})],1),t._v(" "),o("el-form-item",{staticClass:"flex-1",attrs:{label:"销售量"}},[o("el-input-number",{attrs:{min:0,label:""},model:{value:t.formGoodsData.sales,callback:function(e){t.$set(t.formGoodsData,"sales",e)},expression:"formGoodsData.sales"}})],1)],1),t._v(" "),o("div",{staticClass:"flex flex-wrap"},[o("el-form-item",{staticClass:"flex-1",attrs:{label:"售卖价格"}},[o("el-input-number",{attrs:{precision:2},model:{value:t.formGoodsData.price,callback:function(e){t.$set(t.formGoodsData,"price",e)},expression:"formGoodsData.price"}})],1),t._v(" "),o("el-form-item",{staticClass:"flex-1",attrs:{label:"成本价格"}},[o("el-input-number",{attrs:{precision:2},model:{value:t.formGoodsData.price_cost,callback:function(e){t.$set(t.formGoodsData,"price_cost",e)},expression:"formGoodsData.price_cost"}})],1),t._v(" "),o("el-form-item",{staticClass:"flex-1",attrs:{label:"市场价格"}},[o("el-input-number",{attrs:{precision:2},model:{value:t.formGoodsData.price_market,callback:function(e){t.$set(t.formGoodsData,"price_market",e)},expression:"formGoodsData.price_market"}})],1)],1),t._v(" "),o("el-form-item",{attrs:{label:"是否推荐"}},[o("el-radio",{attrs:{label:1},model:{value:t.formGoodsData.is_recommend,callback:function(e){t.$set(t.formGoodsData,"is_recommend",e)},expression:"formGoodsData.is_recommend"}},[t._v("是")]),t._v(" "),o("el-radio",{attrs:{label:0},model:{value:t.formGoodsData.is_recommend,callback:function(e){t.$set(t.formGoodsData,"is_recommend",e)},expression:"formGoodsData.is_recommend"}},[t._v("否")])],1),t._v(" "),o("el-form-item",{attrs:{label:"是否新品"}},[o("el-radio",{attrs:{label:1},model:{value:t.formGoodsData.is_new,callback:function(e){t.$set(t.formGoodsData,"is_new",e)},expression:"formGoodsData.is_new"}},[t._v("是")]),t._v(" "),o("el-radio",{attrs:{label:0},model:{value:t.formGoodsData.is_new,callback:function(e){t.$set(t.formGoodsData,"is_new",e)},expression:"formGoodsData.is_new"}},[t._v("否")])],1),t._v(" "),o("el-form-item",{attrs:{label:"男用or女用"}},[o("el-radio",{attrs:{label:0},model:{value:t.formGoodsData.type_sub,callback:function(e){t.$set(t.formGoodsData,"type_sub",e)},expression:"formGoodsData.type_sub"}},[t._v("无")]),t._v(" "),o("el-radio",{attrs:{label:1},model:{value:t.formGoodsData.type_sub,callback:function(e){t.$set(t.formGoodsData,"type_sub",e)},expression:"formGoodsData.type_sub"}},[t._v("男用")]),t._v(" "),o("el-radio",{attrs:{label:2},model:{value:t.formGoodsData.type_sub,callback:function(e){t.$set(t.formGoodsData,"type_sub",e)},expression:"formGoodsData.type_sub"}},[t._v("女用")])],1),t._v(" "),o("div",{staticClass:"flex flex-wrap"},[o("el-form-item",{staticClass:"flex-1",attrs:{label:"套餐等级"}},[o("el-select",{attrs:{placeholder:"请选择"},model:{value:t.formGoodsData.package_level,callback:function(e){t.$set(t.formGoodsData,"package_level",e)},expression:"formGoodsData.package_level"}},t._l(t.packageLevels,(function(t){return o("el-option",{key:t.id,attrs:{label:t.title,value:t.id}})})),1)],1),t._v(" "),o("el-form-item",{staticClass:"flex-1",attrs:{label:"赠送分红限额"}},[o("el-input-number",{attrs:{min:0,label:"",precision:2},model:{value:t.formGoodsData.package_profit,callback:function(e){t.$set(t.formGoodsData,"package_profit",e)},expression:"formGoodsData.package_profit"}})],1),t._v(" "),o("el-form-item",{staticClass:"flex-1",attrs:{label:"排序"}},[o("el-input-number",{attrs:{min:0,label:""},model:{value:t.formGoodsData.sort,callback:function(e){t.$set(t.formGoodsData,"sort",e)},expression:"formGoodsData.sort"}})],1),t._v(" "),o("div",{staticClass:"flex flex-wrap"},[o("el-form-item",{attrs:{label:"封面缩略图"}},[o("el-upload",{staticClass:"upload-demo",attrs:{action:t.uploadSingleAction,"on-preview":t.handlePreviewThumb,"on-remove":t.handleRemoveThumb,"on-success":t.handSuccessThumb,"file-list":t.fileListThumb,"list-type":"picture",multiple:!1,name:"photo"}},[o("el-button",{attrs:{size:"small",type:"primary"}},[t._v("点击上传")]),t._v(" "),o("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[t._v("只能上传jpg/png/gif文件，且不超过500kb")])],1)],1),t._v(" "),o("el-form-item",{attrs:{label:"封面大图"}},[o("el-upload",{staticClass:"upload-demo",attrs:{action:t.uploadSingleAction,"on-preview":t.handlePreviewCover,"on-remove":t.handleRemoveCover,"on-success":t.handSuccessCover,"file-list":t.fileListCover,"list-type":"picture",multiple:!1,name:"photo"}},[o("el-button",{attrs:{size:"small",type:"primary"}},[t._v("点击上传")]),t._v(" "),o("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[t._v("只能上传jpg/png/gif文件，且不超过500kb")])],1)],1)],1)],1)],1),t._v(" "),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(e){t.dialogGoodsUpdateVisible=!1}}},[t._v("取 消")]),t._v(" "),o("el-button",{attrs:{type:"primary",disabled:t.goodsInfoUpdateBtn.disabled},on:{click:t.goodsInfoUpdate}},[t._v("确 定")])],1)],1)],2)}),[],!1,null,null,"337f541b");e.default=component.exports}};