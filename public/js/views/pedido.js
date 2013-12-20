Lacet.Views.Pedidos = Backbone.View.extend({
	events:{

	},
	initialize:function(){
		this.template = _.template($("#pedidosTemplate").html());
	},
	render:function(){
		var data = this.model.toJSON();		
		var html = this.template(data);
		this.$el.html(html);
	}
});