


var WebSet = function(){};
WebSet.prototype = {
    app : null,
    linkApp: function(app){
        this.app = app;
    },

    bindRouter : function(){

    },

    getRouter: function(){
        throw new Error("Must bu reload");
    },

    extend: function(attrs){
        if( "object" !== typeof attrs ){
            throw new TypeError("sddssss");
        }
    
        var  self = this;
        attrs.map(function(attr, value){
            self[attr] = value;
        });
        return this;
    },

    run : function(){
        this.bindRouter( this.getRouter() );
    }
};

var FrontWebModel =  function(app){
    this.linkApp(app);
};
FrontWebModel.prototype = (new WebSet()).extend({
    getRouter : function(){
        return [
            "sss" : 
        ];
    }

    

});


var AdminWebModel =  function(app){
    this.linkApp(apache);
};
AdminWebModel.prototype = (new WebSet()).extend({
    
    getRouter : function(){

    },

    auth : function(){}

});

var 

var admin = new AdminWebModel(app);
admin.run();
