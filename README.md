Interval
========

Interval is a Class that wraps the native `setTimeout` and enhances it providing functionalities such as `pause`, `resume`, `cancel`.

Build
-----

Build via [Packager](http://github.com/kamicane/packager), requires [MooTools Core](http://github.com/mootools/mootools-core) to be registered to Packager already

	./packager register /path/to/interval
	./packager build Interval/* > interval.js

To build this plugin without external dependencies use

	./packager build Interval/* +use-only Interval > interval.js

Demo
----

A visual [demo](http://stuff.djamil.it/interval) is setup at my website.

How To Use
----------

### Syntax

	var timer = new Interval(functions[, options]);
	
### Arguments
	
1. `functions` - (*mixed*) Can be a *single* function or an *array* of functions.
2. `options` - (*object*, optional) An object with options for the Class. See below.

### Options

* __delay__		- (*number*: defaults to 500) The delay to wait before running the function(s).
* __repeat__	- (*boolean*: defaults to false) Wheter the interval has to loop or not.

### Events

* __start__		- (*function*) The function to execute when the interval begins.
* __cancel__	- (*function*) The function to execute when you manually stop the interval.
* __pause__		- (*function*) The function to execute when the interval is paused.
* __resume__	- (*function*) The function to execute when the interval is resumed.
* __complete__	- (*function*) The function to execute after the interval has processed.

### Methods

* __timer.run(args, bind)__				- Instantly runs the function(s). The interval won't be stopped. None of the events will be fired.
* __timer.start(args, delay, bind)__	- Starts or, if already running, Restarts a timeout based on the options or the delay passed, after which the function(s) gets called.
* __timer.pause()__						- Pauses the previously started timeout. 
* __timer.resume()__					- Resumes the previously started timeout. Resume will continue from when it has been paused.
* __timer.cancel()__					- Cancels the previously started timeout, even if paused. The function(s) will never get called.


### Examples

	var fn = function(msg){ 
		console.log(msg || 'Hello World!');
	};
	
	var fns = [
		function(){ console.log('1st'); },
		function(){ console.log('2nd'); },
		function(){ console.log('3rd'); },
		function(){ console.log('4th'); }
	];
	
	var timer = new Interval(fn, {delay: 1000, repeat: true});
	
	var timer2 = new Interval(fns);

	timer.run();

	timer.start();

	timer.pause();

	timer.resume();

	timer.cancel();

	timer.start('I am a custom msg.');

	timer.start('I am a custom msg in 2s.', 2000);
