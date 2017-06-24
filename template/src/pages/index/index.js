mui.init();

var currentWebview;	

new Vue({
	el: '#app',
	data: {
	  title: '首页',
		activeTab: 'home',
		styles: {
			top: '45px',
			bottom: '51px'
		},
		tabs: [
			{name: 'home', label: '首页', title: '首页'},
			{name: 'message', label: '消息', title: '消息'},
			{name: 'person', label: '我的', title: '个人中心'}
		]
	},
	filters: {
		srcHelper: function(value, activeTab) {
			value = (value === activeTab) ? value + '-active' : value;
			return `../../assets/img/${value}.png`;
		}
	},
  plusReady () {
		currentWebview = plus.webview.getLaunchWebview();
		this.creatView(this.activeTab);
	},
	methods: {
		creatView (targetTab) {
			let targetUrl = `_www/pages/${targetTab}/${targetTab}.html`;
			let targetWebview = plus.webview.getWebviewById(targetTab);
			if(!targetWebview) {
				targetWebview = plus.webview.create(targetUrl, targetTab, this.styles);
				currentWebview.append(targetWebview);
			}
			targetWebview.show("fade-in", 300);
		},
		changeView (targetTab, title) {
			if(targetTab == this.activeTab) return;
			this.creatView(targetTab);
			plus.webview.hide(this.activeTab);
			this.title = title;
			this.activeTab = targetTab;
		}
	}
})