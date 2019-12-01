exports.ids=[4],exports.modules={84:function(t,e,o){"use strict";var l=o(5),n=o.n(l),r={async post(t,data){console.log("axios node_env:","production");let e="http://mall.admin.jianpiane.com";console.log("axios domain:",e),t=e+t,console.log("axios url: ",t);let o=await n.a.post(t,data);return console.log("axios status: ",o.status),o.data}};e.a={getOrderList:async data=>await r.post("/api/mall/order/list",data),cancelOrder:async data=>await r.post("/api/mall/order/cancel",data),paymentCreate:async data=>await r.post("/api/mall/payment/create",data),paymentComplete:async data=>await r.post("/api/mall/payment/complete",data),getPaymentList:async data=>await r.post("/api/mall/payment/list",data),getGoodsList:async data=>(data.business_id=0,await r.post("/api/mall/goods/list",data)),goodsDataCreate:async data=>(data.business_id=0,await r.post("/api/mall/goods/create",data)),goodsDataUpdate:async data=>(data.business_id=0,await r.post("/api/mall/goods/update",data)),categoryDataUpdate:async data=>(data.business_id=0,await r.post("/api/mall/goods/categoryUpdate",data)),getGoodsCategoryList:async data=>(data.business_id=0,await r.post("/api/mall/goods/categorys",data)),statisticsTodayData:async(data={})=>await r.post("/api/mall/statistics/today",data)}},85:function(t,e,o){"use strict";var l=o(83),n=o.n(l);e.a={formValidata:t=>new Promise((e,o)=>{t.validate(t=>{e(!!t)})}),unLimitTreeLevel(t,e=0){var o=[],l=function(t,e,n){for(var i=0;i<t.length;i++){var r=t[i];if(r.pid==e){r.level=n,r.html="";for(let t=0;t<n;t++)r.html+=" -- ";o.push(r),l(t,r.id,n+1)}}};return l(t,e,0),o},getTimestamp(t){let e=new Date(t);return parseInt(e.getTime()/1e3)},dateFormat(t,e){e=e||"YYYY-MM-DD HH:mm";let o=null;return o=t?new Date(1e3*t):new Date,n()(o).format(e)},dateDisplay(t){let e=parseInt(Date.now()/1e3)-t;if(e<60)return e+"秒前";if(e>=60&&e<3600)return parseInt(e/60).toString()+"分钟前";if(e>=3600&&e<86400)return parseInt(e/3600).toString()+"小时前";if(e>=86400&&e<2592e3)return parseInt(e/3600/24).toString()+"天前";{let e="YYYY-MM-DD HH:mm",o=new Date(1e3*t);return n()(o).format(e)}},monthPlus(t,e=1,o=!0){let l=[31,28,31,30,31,30,31,31,30,31,30,31],n=parseInt(this.dateFormat(t,"YYYY")),r=parseInt(this.dateFormat(t,"MM")),c=parseInt(this.dateFormat(t,"DD"));l[1]=n%4==0&&n/100!=0||n%100==0&&n%400==0?29:28;let d=0;d+=l[r-1]-c;for(let i=0;i<e;i++){(r+=1)>12&&(r=1,n+=1),l[1]=n%4==0&&n/100!=0||n%100==0&&n%400==0?29:28;let t=l[r-1];i==e-1&&(t=t-c<0?t:c),console.log("for days:",t),d+=t}return o?(t=t||parseInt(Date.now()/1e3))+24*d*3600:d}}},87:function(t,e,o){"use strict";o.r(e);var l=o(85),n=o(84),r={head:()=>({title:"订单管理"}),data:()=>({list:[],page:1,limit:5,count:0}),methods:{...l.a,async getList(){let data={};data.page=this.page,data.limit=this.limit;let t=await n.a.getOrderList(data);console.log("/getList ret",t),this.list=t.data.rows,this.count=t.data.count},pageChange(t){console.log("/pageChange:",t),this.page=t,this.getList()},orderCancel(t){let e={};e.id=t.id,e.user_id=t.user_id,e.cancel_reason="后台取消",this.$confirm("是否将该订单设置为取消状态, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(async()=>{let o=await n.a.cancelOrder(e);console.log("/orderCancel cancelRet:",o),0==o.code?(t.status=-1,this.$message({type:"success",message:"取消成功!"})):this.$message({type:"info",message:e.message})}).catch(()=>{})},orderComplete(t){this.$confirm("是否确认该订单已支付, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(async()=>{let e=await this.orderCompleteSubmit(t);console.log("/orderComplete orderCompleteRet:",e),0==e.code?(t.status=1,this.$message({type:"success",message:"确认成功!"})):this.$message({type:"info",message:e.message})}).catch(()=>{})},async orderCompleteSubmit(t){let e={user_id:t.user_id,order_ids:[t.id],total:t.total,amount:t.total,score:0,pay_type:0,pay_method:0,balance:0,coupon:0,user_coupon_id:0,remark:"后台生成"},o=await n.a.paymentCreate(e);if(console.log("/orderCompleteSubmit paymentCreateRet:",o),o.code)return o;let l=o.data.out_trade_no,r={user_id:t.user_id,out_trade_no:l,remark:"后台确认"},c=await n.a.paymentComplete(r);return console.log("/orderCompleteSubmit paymentCompleteRet:",c),o}},created(){this.getList()}},c=o(2),component=Object(c.a)(r,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"mt-4"},[o("el-table",{staticStyle:{width:"100%"},attrs:{data:t.list,border:""}},[o("el-table-column",{attrs:{label:"订单号",prop:"order_no"}}),t._v(" "),o("el-table-column",{attrs:{label:"创建时间"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t.dateFormat(e.row.create_time)))]}}])}),t._v(" "),o("el-table-column",{attrs:{label:"订单金额"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("span",{staticClass:"text-red-600"},[t._v("￥"+t._s((e.row.total/100).toFixed(2)))])]}}])}),t._v(" "),o("el-table-column",{attrs:{label:"数量",width:"50"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.items.length))]}}])}),t._v(" "),o("el-table-column",{attrs:{type:"expand"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("el-table",{staticStyle:{width:"100%"},attrs:{data:e.row.items,border:""}},[o("el-table-column",{attrs:{label:"商品图片"},scopedSlots:t._u([{key:"default",fn:function(t){return[o("img",{attrs:{src:t.row.cover,width:"30",height:"30"}})]}}],null,!0)}),t._v(" "),o("el-table-column",{attrs:{label:"商品名称",prop:"name"}}),t._v(" "),o("el-table-column",{attrs:{label:"成本"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("span",{},[t._v("￥"+t._s((e.row.price_cost/100).toFixed(2)))])]}}],null,!0)}),t._v(" "),o("el-table-column",{attrs:{label:"单价"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("span",{staticClass:"text-red-600"},[t._v("￥"+t._s((e.row.price/100).toFixed(2)))])]}}],null,!0)}),t._v(" "),o("el-table-column",{attrs:{label:"购买数量",prop:"num"}}),t._v(" "),o("el-table-column",{attrs:{label:"价格"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("span",{staticClass:"text-red-600"},[t._v("￥"+t._s((e.row.total/100).toFixed(2)))])]}}],null,!0)})],1)]}}])}),t._v(" "),o("el-table-column",{attrs:{label:"状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[0==e.row.status?o("span",{staticClass:"text-red-600"},[t._v("未付款")]):t._e(),t._v(" "),1==e.row.status?o("span",{staticClass:"text-orange-600"},[t._v("待发货")]):t._e(),t._v(" "),2==e.row.status?o("span",{staticClass:"text-blue-600"},[t._v("待收货")]):t._e(),t._v(" "),3==e.row.status?o("span",[t._v("已完成")]):t._e(),t._v(" "),-1==e.row.status?o("span",[t._v("已取消")]):t._e()]}}])}),t._v(" "),o("el-table-column",{attrs:{fixed:"right",label:"操作",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[0==e.row.status?o("el-button",{attrs:{type:"warning",plain:"",size:"small"},on:{click:function(o){return t.orderCancel(e.row)}}},[t._v("取消订单")]):t._e(),t._v(" "),0==e.row.status?o("el-button",{staticClass:"text-red-600",attrs:{type:"danger",plain:"",size:"small"},on:{click:function(o){return t.orderComplete(e.row)}}},[t._v("确认付款")]):t._e(),t._v(" "),1==e.row.status?o("el-button",{attrs:{type:"primary",plain:"",size:"small"}},[t._v("发货")]):t._e()]}}])})],1),t._ssrNode(" "),o("el-pagination",{staticClass:"mt-4",attrs:{"current-page":t.page,"page-size":t.limit,layout:"prev, pager, next, total, jumper",total:t.count},on:{"current-change":t.pageChange,"prev-click":t.pageChange,"next-click":t.pageChange}})],2)}),[],!1,null,null,"00ffedc6");e.default=component.exports}};