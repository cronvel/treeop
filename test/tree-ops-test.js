/*
	Copyright (c) 2015 Cédric Ronvel 
	
	The MIT License (MIT)

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
*/

/* jshint unused:false */
/* global describe, it, before, after */



var expect = require( 'expect.js' ) ;
var treeOps = require( '../lib/tree-ops.js' ) ;



describe( "Basic tests" , function() {
	
	it( "+ and * mixing and order" , function() {
		
		var creature = {
			hp: 8,
			attack: 5,
			defense: 3,
			move: 1
		} ;
		
		var shield = {
			"+defense": 3,
		} ;
		
		var enchantedArmor = {
			"*defense": 2,
			"+defense": 1,
			"+magic": 1
		} ;
		
		expect( treeOps.stack( creature , shield , enchantedArmor ) ).to.eql( {
			hp: 8,
			attack: 5,
			defense: 3,
			move: 1,
			"+defense": 4,
			"*defense": 2,
			"+magic": 1
		} ) ;
		
		expect( treeOps.reduce( creature , shield , enchantedArmor ) ).to.eql( {
			hp: 8,
			attack: 5,
			defense: 10,
			move: 1,
			"+magic": 1
		} ) ;
		
	} ) ;
	
	it( "- and / converted to + and *" , function() {
		
		var creature = {
			hp: 8,
			attack: 5,
			defense: 3,
			move: 1
		} ;
		
		var cursedAmulet = {
			"-defense": 2,
		} ;
		
		var cursedRing = {
			"/defense": 1,
		} ;
		
		expect( treeOps.stack( cursedAmulet ) ).to.eql( {
			"+defense": -2,
		} ) ;
		/*
		expect( treeOps.reduce( creature , shield , enchantedArmor ) ).to.eql( {
			hp: 8,
			attack: 5,
			defense: 10,
			move: 1,
			"+magic": 1
		} ) ;
		*/
	} ) ;
} ) ;

