/*
---
name: Function.Interval
description: A setTimeout wrapper that can pause and resume, with multi functions support.
license: MIT-style license.
authors: Djamil Legato (@w00fz)
requires: [Interval]
provides: Function.Interval
...
*/

Function.implement({
	delay: function(delay, bind, args){
		return new Interval(this, {delay: delay, repeat: false}).start(args, delay, bind);
	},

	periodical: function(periodical, bind, args){
		return new Interval(this, {delay: delay, repeat: true}).start(args, delay, bind);
	}
});
