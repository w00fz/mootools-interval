/*
---
name: Interval
description: A setTimeout wrapper that can pause and resume, with multi functions support.
license: MIT-style license.
authors: Djamil Legato (@w00fz)
requires: [Core/Class.Extras, Core/Event]
provides: Interval
...
*/

(function(){
	
var Interval = this.Interval = new Class({
	
	Implements: [Events, Options],

	options: {
		delay: 500,
		repeat: false
	},
	
	initialize: function(functions, options){
		this.functions = Array(functions).flatten();
		this.setOptions(options);
		
		this.functions.push(this.complete.bind(this));
		
		this.from = 0;
		this.running = false;
		this.time = this.delay = this.options.delay;
	},
	
	run: function(args, bind){
		for (var i = 0, l = this.functions.length - 1; i < l; i++){
			this.functions[i].run(args, bind);
		}
	},
	
	start: function(args, delay, bind){
		this.cancel();
		this.instances = [];
		this.timeouts = [];
		this.delay = delay || this.delay;
		this.time = this.delay;
		this.from = Date.now();
		this.running = true;

		for (var i = 0, l = this.functions.length; i < l; i++){
			this.instances.push((i == l - 1) ? this.functions[i] : this.functions[i].pass(args, bind));
			this.timeouts.push(setTimeout(this.instances[i], this.delay));
		}
		
		this.fireEvent('start', this);
		
		return this;
	},
	
	cancel: function(){
		if (!this.timeouts) return this;
		
		this.clearTimeout();		
		this.from = Date.now();
		this.time = this.delay;
		this.running = false;
		
		this.fireEvent('cancel', this);
		
		return this;
	},
	
	pause: function(){
		if (!this.timeouts) return this;
		
		this.clearTimeout();
		this.from = Date.now() - this.from;
		this.time = this.time - this.from;
		this.running = false;
		
		this.fireEvent('pause', this.time);

		return this;
	},
	
	resume: function(){
		if (!this.timeouts) return this;
		
		this.from = Date.now();
		this.running = true;
		
		for (var i = 0, l = this.timeouts.length; i < l; i++){
			this.timeouts[i] = setTimeout(this.instances[i], this.time || this.delay);
		}
		
		this.fireEvent('resume', this.time);
		
		return this;
	},
	
	complete: function(){
		this.from = 0;
		this.time = this.delay;
				
		this.fireEvent('complete', this);
		
		if (this.options.repeat) this.start();
	},
	
	clearTimeout: function(){
		for (var i = 0, l = this.timeouts.length; i < l; i++){
			clearTimeout(this.timeouts[i]);
		}
	}.protect()
	
});
	
})();