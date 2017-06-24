new Vue({
	el: '#app',
	data: {
	  city: '',
    networkType: ''
	},
  plusReady () {
    // 获取定位信息
    this.$geolocation.getCurrentPosition().then((position) => {
      this.city = position.address.city;
      console.log(JSON.stringify(position));
    }).catch((error) => {
      console.log(error);
    });
    // 获取网络信息
    this.networkType = this.$networkinfo.getCurrentNetworkType();
    console.log(this.networkType);
	},
	mounted () {
    console.log(JSON.stringify(this.os));
	}
})