var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/dobby/map', function(req, res, next){
	var hi = [
		{value: "John",
		children: [
			{value: "Isaac"},
			{value: "Malcolm"}
		]}
	];
	var n = new node();
	var x = n.build_based_on_json(hi);
	console.log(x);
	nextNodes.push(x);
	//seek_needle();

	rec_print(x);

    res.send(x);
});

module.exports = router;

function rec_print(node){
	var end = "?";
	node = node[0].nodes[1];
	/*for (var i = 0; i < node.nodes.length; i++) {
		end += " -> " + node[i].value;
		if (node[i].nodes.length != -1) {
			end += rec_print(node[i]);
		};
	};*/
	console.log(end);
}

function getType(a){
    var val = typeof a == 'object' ? true : false;
    return val;
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


var watched = [];
var wayHome = [];
var nextNodes = [];
var needle = "Malcolm";

var seek_needle=function(){
  var ret = false;
  var currentNode = nextNodes[0];
  console.log(currentNode.value);
  watched.push(currentNode);
  
  var tmpNode=currentNode.has(needle);
  
  if(tmpNode!=null){
      wayHome.push(tmpNode);
      ret=true;
      console.log("EUREKA");
  }
  
  if(!ret){
    add_next_nodes(currentNode);
    nextNodes.shift();
    if(seek_needle()){
        ret=true;
    }
  }
  if(ret){
    if(wayHome[wayHome.length-1].has(watched[watched.length-1])){
        wayHome.push(watched[watched.length-1]);
        ret=true;
    }
      watched.pop();
      console.log("Poped");
  }
  return ret;
}
var add_next_nodes = function(x){
	for(var i=0;i<x.size();i++){
	    if(!contiene(watched,x.nodes[i]) && !contiene(nextNodes,x.nodes[i])){
	        nextNodes.push(x.nodes[i]);
	    }
	}
}

var contiene = function(arreglo,x){
	if(arreglo.indexOf(x)!=-1){
	    return true;
	}else{
	    return false;
	}
}
var show_directions = function(){
  var directions = "";
  for(var i=0;i<wayHome.length;i++){
    directions+=wayHome[i].value;
    directions+=" ";  
  }
  return directions;
}