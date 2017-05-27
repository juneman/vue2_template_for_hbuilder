<template>
  <div class="hello">
    <ul class="mui-table-view">
    		<li class="mui-table-view-cell" @click="changeword($event)">vue事件：{{msg}}</li>
		    <li class="mui-table-view-cell" @click="shake">震动</li>
		    <li class="mui-table-view-cell" @click="network">网络类型</li>
		</ul>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data: () => ({
    msg: 'index'
  }),
  mounted () {
  	mui.plusReady(() => {
  		mui.init({
				statusBarBackground: '#9defbcg'
			})
  		console.log('plusReady is ok')
  	})
  },
  methods: {
  	changeword (e) {
  		var ele = e.target
  		this.msg = 'change'
  	},
  	shake () {
  		var str = ""
	    switch (plus.os.name) {
	    	case "iOS":
	            if (plus.device.model.indexOf('iPhone') >= 0) {
	                plus.device.vibrate()
	                str += '设备振动中...'
	            } else {
	                str += '此设备不支持振动'
	            }
	    	break
	    	default:
	    		plus.device.vibrate()
	            str += '设备振动中...'
	    	break
	    }
  	},
  	network () {
  		var types = {}
	    types[plus.networkinfo.CONNECTION_UNKNOW] = '未知'
	    types[plus.networkinfo.CONNECTION_NONE] = '未连接网络'
	    types[plus.networkinfo.CONNECTION_ETHERNET] = '有线网络'
	    types[plus.networkinfo.CONNECTION_WIFI] = 'WiFi网络'
	    types[plus.networkinfo.CONNECTION_CELL2G] = '2G蜂窝网络'
	    types[plus.networkinfo.CONNECTION_CELL3G] = '3G蜂窝网络'
	    types[plus.networkinfo.CONNECTION_CELL4G] = '4G蜂窝网络'
	    alert(types[plus.networkinfo.getCurrentType()])
  	}
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
<style>
