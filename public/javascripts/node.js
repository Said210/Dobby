function getType(a){
    var x=typeof a;
    if(x=='object'){
        return true;
    }else{
        return false;
    }
}

//Class node
function node() {
    this.nodes = [];
    this.value = "a";
    this.add = function(x) {
        if(getType(x)){
           this.nodes=this.nodes.concat(x);
        }else{
            this.nodes.push(x);
        }
    },
    this.remove_first = function(){
        this.nodes.shift();
    };
    this.has = function(x){
        var a=null;
        if(getType(x)){
            for(var i=0;i<this.nodes.length;i++){
                if(this.nodes[i]==x){
                    a=this.nodes[i];
                }
            }
        }else{
            for(var i=0;i<this.nodes.length;i++){
                if(this.nodes[i].value==x){
                    a=this.nodes[i];
                }
            }
        }
        return a;
    }
    this.size = function(){
        return this.nodes.length;   
    };

    this.build_based_on_json = function( args ){
        var _nodes = [];
        for (var i = 0; i < args.length; i++) {
            _nodes[i] = new node();
            _nodes[i].value = args[i].value;
            if ( typeof args[i].children != "undefined" ) {
                _nodes[i].add(this.build_based_on_json(args[i].children));
            };
        }
        return _nodes;
    };

    this.jsonize = function( node ){
        console.log(node);
        var json = "{";
        json += "value: '" + node.value + "',";
        for (var i = 0; i < node.children.length; i++) {
            json += "children: [";
            json += this.jsonize(node.children[i]);
            json += "]";
        }
        json += "}";
        return json;
    }
};
  //end of node

  /*****************************************************
  
    var n1=new node();
    n1.value="n1";
    var n2=new node();
    n2.value="n2";
    var n3=new node();
    n3.value="n3";
    var n4=new node();
    n4.value="n4";

    var n5=new node();
    n5.value="n5";
    var n6=new node();
    n6.value="n6";
    var n7=new node();
    n7.value="n7";
    var n8=new node();
    n8.value="n8";

    var n9=new node();
    n9.value="n9";
    var n10=new node();
    n10.value="n10";
    var n11=new node();
    n11.value="n11";
    var n12=new node();
    n12.value="n12";

    var n13=new node();
    n13.value="n13";
    var n14=new node();
    n14.value="n14";
    var n15=new node();
    n15.value="n15";
    var n16=new node();
    n16.value="x";

    n1.add([n2,n5]);
    n2.add([n1,n3,n6]);
    n3.add([n2,n4,n7]);
    n4.add([n3,n7]);

    n5.add([n6,n1,n9]);
    n6.add([n5,n7,n2,n10]);
    n7.add([n6,n8,n3,n11]);
    n8.add([n7,n4,n12]);

    n9.add([n5,n13,n10]);
    n10.add([n9,n6,n14,n11]);
    n11.add([n10,n7,n15,n12]);
    n12.add([   n8,n16,n11]);

    n13.add([   n9,n14]);
    n14.add([n13,n10,n15]);
    n15.add([n14,n11,n16]);
    n16.add([   n12,n15]);

    */