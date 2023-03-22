"use strict";

/* global core2d */

const { Animation, Color, Command, Frame, Rect, Scene, Sprite, Transition, Core2D } = core2d;
const { BaseTile, FontSprite, JumperSprite } = core2d.plugin;

// constants
const MAPS = [
	[
		// F0R0
		[
			[],
			[],
			["  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "14", "01"],
			["  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "17", "01"],
			["  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "14", "27", "15", "01"],
			["  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "17", "15", "15", "01"],
			["  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "14", "27", "15", "15", "15", "01"],
			["  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "17", "15", "15", "15", "15", "01"],
			["01", "10", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "14", "27", "15", "15", "15", "15", "18", "19"],
			["01", "11", "10", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "17", "15", "15", "15", "15", "15", "23", "13"],
			["01", "11", "11", "10", "  ", "  ", "  ", "  ", "  ", "  ", "14", "27", "15", "15", "15", "15", "15", "15", "23", "13"],
			["00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00"]
		],

		// F0R1
		[
			[],
			[],
			["01", "25"],
			["01", "26", "13"],
			["01", "26", "24", "25"],
			["01", "26", "11", "11", "13"],
			["01", "26", "11", "11", "24", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12"],
			["01", "26", "11", "11", "11", "23", "12", "12", "20", "12", "12", "20", "12", "12", "20", "12", "12", "20", "12", "12"],
			["21", "22", "11", "11", "11", "23", "12", "12", "12", "12", "12", "16", "01", "23", "12", "12", "12", "12", "12", "12"],
			["  ", "23", "26", "11", "11", "23", "12", "12", "12", "12", "12", "17", "01", "23", "12", "12", "12", "12", "12", "12"],
			["  ", "23", "26", "11", "11", "23", "12", "01", "34", "12", "12", "17", "01", "23", "12", "12", "12", "12", "12", "12"],
			["00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00"]
		],

		// F0R2
		[
			["  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "14", "01", "12", "12", "12", "12", "12"],
			["  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "14", "15", "01", "12", "12", "12", "12", "12"],
			["  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "14", "15", "15", "01", "12", "12", "12", "12", "12"],
			["  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "14", "15", "15", "15", "01", "12", "12", "12", "12", "12"],
			["  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "14", "15", "15", "15", "15", "01", "12", "12", "12", "12", "12"],
			["  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "14", "15", "15", "15", "15", "15", "01", "01", "01", "01", "01", "01"],
			["12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12"],
			["12", "12", "20", "12", "12", "20", "12", "12", "20", "12", "12", "20", "12", "12", "20", "12", "12", "20", "12", "12"],
			["12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12"],
			["12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12"],
			["12", "12", "01", "34", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "16", "01", "23", "12"],
			["00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00"]
		],

		// F0R3
		[
			["12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12"],
			["12", "12", "12", "12", "12", "12", "01", "34", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12"],
			["12", "12", "12", "12", "12", "01", "32", "22", "23", "12", "12", "12", "12", "12", "12", "12", "12", "12", "16", "01"],
			["12", "12", "12", "12", "12", "33", "22", "23", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "17", "01"],
			["12", "12", "12", "01", "34", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "17", "01"],
			["01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "23", "12", "16", "01", "01", "01", "01", "01"],
			["31", "31", "31", "31", "31", "31", "31", "31", "31", "31", "31", "29", "01", "23", "30", "31", "31", "31", "29", "01"],
			["12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "30", "29", "01", "23", "12", "12", "12", "17", "01"],
			["12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "30", "29", "01", "23", "12", "12", "17", "01"],
			["12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "30", "28", "12", "12", "12", "17", "01"],
			["12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "16", "01", "23", "17", "01"],
			["00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00"]
		],

		// F0R4
		[
			["12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12"],
			["12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12"],
			["01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01"],
			["01", "32", "31", "31", "31", "31", "31", "31", "31", "31", "31", "31", "31", "31", "31", "31", "31", "31", "31", "31"],
			["01", "26", "23", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12"],
			["01", "26", "23", "12", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01"],
			["01", "26", "23", "12", "01", "32", "31", "31", "31", "31", "31", "31", "31", "31", "31", "31", "31", "31", "31", "31"],
			["01", "26", "23", "12", "01", "26", "23", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12"],
			["01", "26", "23", "12", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01"],
			["01", "26", "23", "12", "33", "31", "31", "31", "31", "31", "31", "31", "31", "31", "31", "31", "31", "31", "31", "31"],
			["01", "26", "23", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12"],
			["00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00"]
		],

		// F0R5
		[
			["12", "12", "12", "12", "01", "26", "23", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12"],
			["12", "12", "12", "12", "01", "26", "23", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12"],
			["01", "34", "12", "12", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01"],
			["31", "22", "23", "01", "01", "32", "31", "31", "31", "31", "31", "31", "31", "31", "31", "31", "31", "31", "31", "31"],
			["12", "12", "12", "33", "01", "26", "23", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12"],
			["01", "34", "12", "12", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01"],
			["31", "22", "23", "01", "01", "32", "31", "31", "31", "31", "31", "31", "31", "31", "31", "31", "31", "31", "31", "31"],
			["12", "12", "01", "01", "01", "26", "23", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12"],
			["01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01"],
			["31", "31", "31", "31", "31", "31", "31", "31", "31", "31", "31", "31", "31", "31", "31", "31", "31", "31", "31", "31"],
			["12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12"],
			["00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00"]
		],

		// F0R6
		[
			["12", "12", "12", "12", "01", "11", "23", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "17", "01"],
			["12", "12", "20", "12", "01", "01", "34", "12", "12", "12", "12", "12", "12", "12", "12", "12", "20", "12", "17", "01"],
			["01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "12", "12", "12", "12", "12", "17", "01"],
			["31", "31", "31", "31", "31", "31", "31", "31", "31", "31", "31", "31", "28", "12", "16", "01", "01", "01", "01", "01"],
			["12", "12", "12", "12", "12", "12", "23", "12", "12", "12", "12", "12", "12", "16", "01", "01", "01", "01", "01", "01"],
			["01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "24", "12", "27", "01", "01", "01", "01", "01", "01", "01"],
			["31", "31", "31", "01", "01", "01", "01", "01", "01", "01", "01", "24", "30", "31", "31", "31", "31", "31", "29", "01"],
			["12", "12", "01", "01", "01", "01", "01", "01", "01", "01", "01", "26", "23", "12", "12", "12", "12", "12", "17", "01"],
			["01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "12", "17", "01"],
			["31", "31", "31", "31", "31", "31", "31", "31", "31", "31", "31", "31", "31", "31", "31", "31", "28", "12", "17", "01"],
			["12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "16", "01", "01"],
			["00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00"],
		]
	],

	[
		// F1R0
		[],

		// F1R1
		[],

		// F1R2
		[],

		// F1R3
		[
			["01", "25", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "14", "01"],
			["01", "26", "10", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "14", "15", "01"],
			["01", "26", "11", "10", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "14", "15", "15", "01"],
			["01", "26", "11", "11", "10", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "14", "15", "15", "18", "19"],
			["01", "26", "11", "11", "11", "23", "12", "12", "12", "12", "12", "12", "12", "12", "12", "17", "15", "15", "23", "13"],
			["01", "26", "11", "11", "11", "23", "12", "12", "12", "12", "12", "12", "12", "12", "12", "17", "15", "01", "01", "01"],
			["01", "26", "11", "11", "11", "23", "12", "12", "12", "12", "12", "12", "12", "12", "12", "17", "01", "01", "01", "01"],
			["01", "26", "11", "11", "11", "23", "12", "12", "12", "12", "12", "12", "12", "12", "16", "01", "01", "01", "01", "01"],
			["01", "26", "11", "11", "11", "23", "12", "12", "12", "12", "12", "12", "12", "16", "01", "01", "01", "01", "01", "01"],
			["01", "26", "11", "11", "11", "23", "12", "12", "12", "12", "12", "12", "16", "01", "01", "01", "01", "01", "01", "01"],
			["01", "26", "11", "11", "11", "23", "12", "12", "12", "12", "12", "16", "01", "01", "01", "01", "01", "01", "01", "01"],
			["01", "01", "01", "01", "01", "34", "12", "16", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01"]
		],

		// F1R4
		[
			["01", "25"],
			["01", "26", "23", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12"],
			["01", "26", "23", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12"],
			["21", "22", "23", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "16", "01"],
			["  ", "23", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "17", "01"],
			["01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "23", "12", "12", "17", "01"],
			["01", "32", "31", "31", "31", "31", "31", "31", "31", "31", "31", "31", "31", "31", "28", "12", "12", "12", "17", "01"],
			["01", "26", "23", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "17", "01"],
			["01", "26", "23", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "17", "01"],
			["01", "26", "23", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "17", "01"],
			["01", "26", "23", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "17", "01"],
			["01", "26", "23", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01"]
		],

		// F1R5
		[
			["  ", "  ", "  ", "01", "25"],
			["12", "12", "12", "01", "26", "13"],
			["12", "12", "12", "01", "26", "13"],
			["01", "01", "01", "01", "26", "13"],
			["32", "31", "31", "31", "22", "13"],
			["26", "35", "31", "31", "31", "36"],
			["26", "13"],
			["26", "13"],
			["26", "13"],
			["26", "13", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "14", "01", "01", "01"],
			["26", "13", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "30", "31", "31", "31"],
			["26", "13", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "31", "31", "31", "31"]
		],

		// F1R6
		[
			["01", "01", "01", "01", "26", "23", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12"],
			["01", "01", "01", "01", "26", "23", "20", "12", "12", "12", "20", "12", "12", "12", "20", "12", "12", "12", "20", "12"],
			["01", "01", "01", "01", "26", "23", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12"],
			["01", "01", "01", "01", "26", "23", "20", "12", "12", "12", "20", "12", "12", "12", "20", "12", "12", "12", "12", "12"],
			["01", "01", "01", "01", "26", "23", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12"],
			["01", "01", "01", "01", "26", "23", "20", "12", "12", "12", "20", "12", "12", "12", "12", "12", "12", "12", "12", "12"],
			["01", "01", "01", "01", "26", "23", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "27", "01", "01", "01"],
			["01", "01", "01", "01", "26", "23", "20", "12", "12", "12", "12", "12", "12", "12", "27", "01", "01", "01", "31", "31"],
			["01", "01", "01", "01", "26", "23", "12", "12", "12", "12", "12", "12", "27", "01", "01", "01", "31", "28", "12", "12"],
			["01", "01", "01", "01", "26", "23", "12", "12", "12", "12", "27", "01", "01", "01", "31", "28", "12", "12", "12", "12"],
			["01", "01", "01", "01", "26", "23", "12", "12", "27", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01"],
			["01", "01", "01", "01", "01", "34", "27", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01"],
		],
		
		// F1R7
		[
			["12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "17", "01"],
			["12", "12", "20", "12", "12", "12", "20", "12", "12", "12", "20", "12", "12", "12", "20", "12", "12", "12", "17", "01"],
			["12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "17", "01"],
			["12", "12", "20", "12", "12", "12", "20", "12", "12", "12", "20", "12", "12", "12", "20", "12", "12", "12", "17", "01"],
			["12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "17", "01"],
			["12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "17", "01"],
			["01", "01", "01", "01", "01", "01", "01", "01", "01", "34", "12", "16", "01", "01", "01", "01", "01", "01", "01", "01"],
			["31", "31", "31", "31", "31", "31", "31", "31", "31", "22", "23", "30", "31", "31", "31", "31", "31", "31", "29", "01"],
			["12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "17", "01"],
			["12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "17", "01"],
			["01", "34", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "17", "01"],
			["01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01", "01"],
		]		
	]
];

const MAP_SETS = [
	[
		// F0R0
		0,
		// F0R1
		1,
		// F0R2
		2,
		// F0R3
		3,
		// F0R4
		4
	],

	[
		// F1R0
		0,
		// F1R1
		0,
		// F1R2
		0,
		// F1R3
		1,
		// F1R4
		5,
		// F1R5
		6,
		// F1R6
		0,
		// F1R7
		7,
	]
];

const SETS = [
	// 0
	[],

	// 1
	[
		[],
		[],
		[],
		[],
		[],
		[],
		[],
		[],
		[],
		[],
		["  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "sk", "  ", "  ", "  ", "  ", "bx"]
	],

	// 2
	[
		[],
		[],
		[],
		["  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "ky"],
		[],
		[],
		[],
		[],
		[],
		[],
		["  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "sk", "  ", "sk", "  ", "sk"]
	],

	// 3
	[
		[],
		[],
		[],
		[],
		["  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "sk"]
	],

	// 4
	[
		[],
		[],
		[],
		["  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "dt"],
		["  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "sk", "  ", "db"],
		[],
		[],
		["  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "gh"]
	],

	// 5
	[
		[],
		[],
		[],
		["  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "gh"],
		[],
		[],
		[],
		[],
		[],
		["  ", "  ", "  ", "  ", "  ", "  ", "  ", "gh"]
	],

	// 6
	[
		[],
		[],
		[],
		[],
		[],
		[],
		[],
		["  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "p0"]
	],

	// 7
	[
		[],
		[],
		[],
		[],
		[],
		["  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "bx"],
		[],
		[],
		[],
		[],
		["  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "sk"]
	]
];

let game;

function currentRoom() {
	return game.floor + ";" + game.room;
}

class IntroScene extends Scene {
	init() {
		this.next = new TitleScene();
		this.transition = new Transition();
		this.color = Color.Black;
		this.controller = Core2D.getController();
		this.dog = null;
		this.princess = null;
		this.text = null;
		this.textTime = 180;
		this.tile = null;

		for (var i = 0; i < 20; ++i) {
			this.tile = new Tile("00");
			this.tile.setX(i * this.tile.width);
			this.tile.setBottom(this.bottom);
			this.add(this.tile);
		}

		Core2D.playTheme("theme1");
	}

	update() {
		if (this.controller.keyPush(Command.A)) {
			this.expire();
		}

		if (this.tick == 1) {
			this.text = new FontSprite("once upon a time...");
			this.text.setCenter(this.center);
			this.add(this.text);
		} else if (this.tick == this.textTime) {
			this.text.expire();
			this.text = new FontSprite("...there was a dog and his beloved princess.");
			this.text.setCenter(this.center);
			this.add(this.text);
		} else if (this.tick == 2 * this.textTime) {
			this.text.expire();
			this.princess = new Sprite();
			this.princess.setImage("princess0");
			this.princess.setBottom(this.tile.top - 1);
			this.princess.setLeft(this.centerX);
			this.add(this.princess);
			this.dog = new Sprite();
			this.dog.setImage("player0");
			this.dog.setBottom(this.tile.top - 1);
			this.dog.setRight(this.princess.left);
			this.add(this.dog);
		} else if (this.tick == 3 * this.textTime) {
			this.dog.expire();
			this.princess.expire();
			this.text.expire();
			this.text = new FontSprite("it was a truly beautiful friendship...");
			this.text.setCenter(this.center);
			this.add(this.text);
		} else if (this.tick == 4 * this.textTime) {
			this.text.expire();
			this.text = new FontSprite("...and they were very happy together.");
			this.text.setCenter(this.center);
			this.add(this.text);
		} else if (this.tick == 5 * this.textTime) {
			this.text.expire();
			this.princess = new Sprite();
			this.princess.setImage("princess1");
			this.princess.setBottom(this.tile.top - 1);
			this.princess.setLeft(this.centerX);
			this.add(this.princess);
			this.dog = new Sprite();
			this.dog.setImage("player2");
			this.dog.setBottom(this.tile.top - 1);
			this.dog.setRight(this.princess.left + 12);
			this.add(this.dog);
		} else if (this.tick == 6 * this.textTime) {
			this.dog.expire();
			this.princess.expire();
			this.text = new FontSprite("for many, many years they were very happy...");
			this.text.setCenter(this.center);
			this.add(this.text);
		} else if (this.tick == 7 * this.textTime) {
			this.text.expire();
			this.text = new FontSprite("...until the dog became old, sick and eventually passed away...");
			this.text.setCenter(this.center);
			this.add(this.text);
		} else if (this.tick == 8 * this.textTime) {
			this.text.expire();
			this.text = new FontSprite("...leaving behind a disconsolate princess.");
			this.text.setCenter(this.center);
			this.add(this.text);
		} else if (this.tick == 9 * this.textTime) {
			this.text.expire();
			this.princess = new Sprite();
			this.princess.setImage("princess2");
			this.princess.setBottom(this.tile.top - 1);
			this.princess.setLeft(this.centerX);
			this.add(this.princess);
			this.dog = new Sprite();
			this.dog.setImage("cross");
			this.dog.setBottom(this.tile.top - 1);
			this.dog.setRight(this.princess.left);
			this.add(this.dog);
		} else if (this.tick == 10 * this.textTime) {
			this.dog.expire();
			this.princess.expire();
			this.text = new FontSprite("it took a long time, until she managed to carry on...");
			this.text.setCenter(this.center);
			this.add(this.text);
		} else if (this.tick == 11 * this.textTime) {
			this.text.expire();
			this.text = new FontSprite("...and she's never forgot her beloved friend.");
			this.text.setCenter(this.center);
			this.add(this.text);
		} else if (this.tick == 12 * this.textTime) {
			this.text.expire();
			this.princess = new Sprite();
			this.princess.setImage("princess3");
			this.princess.setBottom(this.tile.top - 1);
			this.princess.setLeft(this.centerX);
			this.add(this.princess);
			this.dog = new Sprite();
			this.dog.setImage("cross");
			this.dog.setBottom(this.tile.top - 1);
			this.dog.setRight(this.princess.left);
			this.add(this.dog);
		} else if (this.tick == 13 * this.textTime) {
			this.dog.expire();
			this.princess.expire();
			this.text = new FontSprite("one night, many years later...");
			this.text.setCenter(this.center);
			this.add(this.text);
		} else if (this.tick == 14 * this.textTime) {
			this.text.expire();
			this.text = new FontSprite("...evil demons and ghosts are attempting to take over the princess' castle...");
			this.text.setCenter(this.center);
			this.add(this.text);
		} else if (this.tick == 15 * this.textTime) {
			this.text.expire();
			this.text = new FontSprite("...but they didn't expect one more spirit to roam the princess' castle.");
			this.text.setCenter(this.center);
			this.add(this.text);
		} else if (this.tick == 16 * this.textTime) {
			this.text.expire();
			this.dog = new Sprite();
			this.dog.setImage("cross");
			this.dog.setBottom(this.tile.top - 1);
			this.dog.setRight(this.centerX);
			this.add(this.dog);
		} else if (this.tick == 18 * this.textTime) {
			this.expire();
		}
	}
}

class TitleScene extends Scene {
	init() {
		this.next = new MenuScene();
		Core2D.fadeOut();
		this.controller = Core2D.getController();
		var titleFontSprite = new FontSprite("alpha demo");
		titleFontSprite.setCenter(this.center);
		this.add(titleFontSprite);
		var logoFontSprite = new FontSprite("maragato 2015");
		logoFontSprite.setCenter(this.center);
		logoFontSprite.y += 2 * logoFontSprite.height;
		this.add(logoFontSprite);
		var startFontSprite = new FontSprite("press button or push space");
		startFontSprite.setCenterX(this.centerX);
		startFontSprite.setBottom(this.bottom - 16);
		this.add(startFontSprite);
	}

	update() {
		if (this.controller.keyPush(Command.A)) {
			this.expire();
		}

		if (this.tick > 1800) {
			this.next = new IntroScene();
			this.expire();
		}
	}
}

class MenuScene extends Scene {
	init() {
		this.color = Color.Black;
		this.controller = Core2D.getController();
		this.menuIndex = 0;
		this.continueFontSprite = new FontSprite("continue");
		this.continueFontSprite.setCenterX(this.centerX);
		this.continueFontSprite.setBottom(this.bottom - 24);
		this.add(this.continueFontSprite);
		this.startFontSprite = new FontSprite("start game");
		this.startFontSprite.setLeft(this.continueFontSprite.left);
		this.startFontSprite.setTop(this.continueFontSprite.bottom + 1);
		this.add(this.startFontSprite);
		this.optionsFontSprite = new FontSprite("options");
		this.optionsFontSprite.setLeft(this.startFontSprite.left);
		this.optionsFontSprite.setTop(this.startFontSprite.bottom + 1);
		this.add(this.optionsFontSprite);
		this.hand = new Sprite();
		this.hand.setImage("hand");
		this.hand.setRight(this.continueFontSprite.left - 5);
		this.add(this.hand);
	}

	get next() {
		Core2D.playTheme("theme0");
		return new GameScene();
	}

	get transition() {
		return new Transition();
	}

	update() {
		if (this.controller.keyPush(Command.DOWN)) {
			if (++this.menuIndex > 2) {
				this.menuIndex = 0;
			}
		}

		if (this.controller.keyPush(Command.UP)) {
			if (--this.menuIndex < 0) {
				this.menuIndex = 2;
			}
		}

		if (this.controller.keyPush(Command.A)) {
			if (this.menuIndex == 0) {
				game = Core2D.load() || new Game();
				this.expire();
			} else if (this.menuIndex == 1) {
				game = new Game();
				this.expire();
			} else if (this.menuIndex == 2) {
				Core2D.play("jumpSound");
			}
		}

		if (this.menuIndex == 0) {
			this.hand.setTop(this.continueFontSprite.top);
		} else if (this.menuIndex == 1) {
			this.hand.setTop(this.startFontSprite.top);
		} else if (this.menuIndex == 2) {
			this.hand.setTop(this.optionsFontSprite.top);
		}
	}
}

class Game {
	constructor() {
		this.canJump = false;
		this.doors = {};
		this.floor = 0;
		this.isRight = true;
		this.keyCount = 0;
		this.keys = {};
		this.room = 0;
		this.speedX = 0;
		this.speedY = 0;
		this.x = 192;
		this.y = 320;
	}
}

class GameScene extends Scene {
	init() {
		this.color = Color.Black;

		this.build(MAPS[game.floor][game.room], (id) => {
			return new Tile(id); 
		});

		if (MAP_SETS[game.floor][game.room]) {
			this.build(SETS[MAP_SETS[game.floor][game.room]], elementFactory, 32, 32);
		}

		this.add(new Player());
		this.keysFontSprite;
		this.updateKeysFontSprite();
		let roomFontSprite = new FontSprite("floor " + game.floor + " - room " + game.room);
		roomFontSprite.setRight(this.right);
		roomFontSprite.setBottom(this.bottom);
		this.add(roomFontSprite);
		this.hasOpened = false;
	}

	get next() {
		if (game.lives < 0) {
			return new OverScene();
		}

		return new GameScene();
	}

	get transition() {
		return new Transition();
	}

	open() {
		if (this.hasOpened) {
			return;
		}

		this.hasOpened = true;
		var doors = this.getObjectsWithTag("door");
		game.doors[currentRoom()] = true;

		for (var i = 0; i < doors.length; ++i) {
			var door = doors[i];
			door.open();
		}
	}

	updateKeysFontSprite() {
		this.keysFontSprite && this.keysFontSprite.expire();
		this.keysFontSprite = new FontSprite("keys " + game.keyCount);
		this.keysFontSprite.setBottom(this.bottom);
		this.add(this.keysFontSprite);
	}
}

class OverScene extends Scene {
	init() {
		Core2D.fadeOut();
		this.controller = Core2D.getController();
		var text = new FontSprite("game over\n\nlevel - " + game.level);
		text.setCenter(this.center);
		this.add(text);
	}

	get next() {
		return new TitleScene();
	}

	get transition() {
		return new Transition();
	}

	update() {
		if (this.controller.keyPush(Command.A)) {
			this.expire();
		}
	}
}

class Box extends Sprite {
	constructor() {
		super();
		this.addTag("brick");
		this.addTag("pushable");
		this.setImage("box");
		this.setSolid();
		this.setAccelerationY(1);
		this.setMaxSpeedY(this.height / 3);
	}

	init() {
		this.setBoundary(this.scene.boundary);
	}

	onCollision(sprite) {
		var collision = this.getCollision(sprite);

		if (sprite.hasTag("player") && !collision.top) {
			if (collision.left) {
				this.x += 1;
			} else if (collision.right) {
				this.x -= 1;
			}
		} else if (sprite.hasTag("enemy")) {
			if (collision.bottom && this.speedY > 0) {
				Core2D.play("crushSound");
				this.setSpeedY(0);
				this.setBottom(sprite.top - 1);
				sprite.die();
			}
		} else if (sprite.hasTag("brick")) {
			if (collision.bottom && this.speedY > 0) {
				this.setSpeedY(0);
				this.setBottom(sprite.top - 1);
			} else if (collision.left) {
				this.setLeft(sprite.right + 1);
			} else if (collision.right) {
				this.setRight(sprite.left - 1);
			}
		}
	}
}

class Player extends JumperSprite {
	constructor(scene) {
		super(scene);
		this.addTag("player");

		this.animations = {
			left: new Animation([
				new Frame(Core2D.image("player0", true), 4),
				new Frame(Core2D.image("player1", true), 4),
				new Frame(Core2D.image("player0", true), 4),
				new Frame(Core2D.image("player1", true), 4),
				new Frame(Core2D.image("player0", true), 4),
				new Frame(Core2D.image("player1", true), 4),
				new Frame(Core2D.image("player0", true), 4),
				new Frame(Core2D.image("player1", true), 4),
				new Frame(Core2D.image("player2", true), 4),
				new Frame(Core2D.image("player1", true), 4),
			]),

			right: new Animation([
				new Frame(Core2D.image("player0"), 4),
				new Frame(Core2D.image("player1"), 4),
				new Frame(Core2D.image("player0"), 4),
				new Frame(Core2D.image("player1"), 4),
				new Frame(Core2D.image("player0"), 4),
				new Frame(Core2D.image("player1"), 4),
				new Frame(Core2D.image("player0"), 4),
				new Frame(Core2D.image("player1"), 4),
				new Frame(Core2D.image("player2"), 4),
				new Frame(Core2D.image("player1"), 4),
			]),

			walk: {
				left: new Animation([
					new Frame(Core2D.image("playerWalk", true), 4),
					new Frame(Core2D.image("player0", true), 4),
				]),

				right: new Animation([
					new Frame(Core2D.image("playerWalk"), 4),
					new Frame(Core2D.image("player0"), 4),
				])
			},
		};

		this.canJump = game.canJump;
		this.isRight = game.isRight;
		this.jumpSpeed = -12;
		this.step = 3;
		this.setAccelerationY(1);
		this.setSpeedX(game.speedX);
		this.setSpeedY(game.speedY);
		this.setX(game.x);
		this.setY(game.y);
		this.setAnimation(this.isRight ? this.animations.right : this.animations.left);
		this.setEssential();
		this.setMaxSpeedY(this.height / 3);
	}

	init() {
		var topMargin = this.height / 2;
		this.setBoundary(new Rect(0, -topMargin, this.scene.width, this.scene.height + topMargin));
	}

	changeRoom() {
		if (this.left > this.scene.right) {
			++game.room;
			this.setLeft(this.scene.left + 1);
		} else if (this.right < this.scene.left) {
			--game.room;
			this.setRight(this.scene.right - 1);
		} else if (this.top > this.scene.bottom) {
			--game.floor;
			this.setTop(this.scene.top + 1);
		} else if (this.bottom < this.scene.top) {
			++game.floor;
			this.setBottom(this.scene.bottom - this.height - 1);
		}

		game.canJump = this.canJump;
		game.isRight = this.isRight;
		game.speedX = this.speedX;
		game.speedY = this.speedY;
		game.x = this.x;
		game.y = this.y;
		Core2D.save(game);
	}

	die() {
		Core2D.play("deathSound");
		this.setSolid(false);

		if (this.isRight) {
			this.setImage(Core2D.image("player2"));
		} else {
			this.setImage(Core2D.image("player2", true));
		}

		this.setImage(Core2D.flip(this.image));
		this.setSpeedY(this.jumpSpeed);
		Core2D.setFrameTime(80);
	}

	useKey() {
		if (game.keyCount > 0) {
			--game.keyCount;
			this.scene.updateKeysFontSprite();
			return true;
		}

		return false;
	}

	onJump() {
		Core2D.play("jumpSound");

		if (this.isRight) {
			this.setImage(Core2D.image("playerWalk"));
		} else {
			this.setImage(Core2D.image("playerWalk", true));
		}
	}

	onLeft() {
		this.isRight = false;
		this.canJump && this.setAnimation(this.animations.walk.left);
	}

	onRight() {
		this.isRight = true;
		this.canJump && this.setAnimation(this.animations.walk.right);
	}

	onIdle() {
		if (this.isRight) {
			this.setAnimation(this.animations.right);
		} else {
			this.setAnimation(this.animations.left);
		}
	}

	offBoundary() {
		this.setVisible(false);
		this.expire();

		if (this.solid) {
			this.changeRoom();
		} else {
			this.expire();
			Core2D.setFrameTime();
		}
	}

	onLeftCollision(sprite) {
		this.onOtherCollision(sprite);
	}

	onRightCollision(sprite) {
		this.onOtherCollision(sprite);
	}

	onTopCollision(sprite) {
		this.onOtherCollision(sprite);
	}

	onBottomCollision(sprite) {
		if (sprite.hasTag("jumpable")) {
			this.onJumpableCollision(sprite);
		}
	}

	onCollision(sprite) {
		if (sprite.hasTag("key")) {
			this.onKeyCollision(sprite);
		} else {
			JumperSprite.prototype.onCollision.call(this, sprite);
		}
	}

	onOtherCollision(sprite) {
		if (sprite.hasTag("enemy")) {
			this.die();
		}
	}

	onJumpableCollision(sprite) {
		this.setBottom(sprite.top - 1);
		sprite.die();

		if (this.controller.keyDown(this.jumpCommand)) {
			this.jump();
		} else {
			this.setSpeedY(this.jumpSpeed * 2 / 3);
		}
	}

	onKeyCollision(sprite) {
		Core2D.play("keySound");
		sprite.expire();
		++game.keyCount;
		game.keys[currentRoom()] = true;
		this.scene.updateKeysFontSprite();
	}
}

class Tile extends BaseTile {
	constructor(code) {
		super(code);
		code.indexOf("0") == 0 && this.setSolid();
		this.addTag("brick");
	}
}

class Key extends Sprite {
	constructor() {
		super();

		if (game.keys[currentRoom()]) {
			this.expire();
			return;
		}

		this.addTag("key");
		this.setImage("key");
		this.setSolid();
	}
}

class Jumpable extends Sprite {
	constructor() {
		super();
		this.addTag("enemy");
		this.addTag("jumpable");
		this.setBoundary();
	}

	die() {
		Core2D.play("crushSound");
		this.setSolid(false);
		this.setAccelerationY(1);
		this.setSpeedY(-6);
		this.setImage(Core2D.flip(this.image));
	}

	onCollision(sprite) {
		var collision = this.getCollision(sprite);

		if (sprite.hasTag("jumpable")) {
			if (collision.left || collision.right) {
				this.bounceX();
				this.turn && this.turn();
			}
		} else if (sprite.hasTag("brick")) {
			if (collision.bottom && this.speedY > 0) {
				this.setSpeedY(0);
				this.setBottom(sprite.top - 1);
				// this.canJump = true;
			} else if (collision.left) {
				this.setLeft(sprite.right + 1);
				this.bounceX();
				this.turn && this.turn();
			} else if (collision.right) {
				this.setRight(sprite.left - 1);
				this.bounceX();
				this.turn && this.turn();
			}
		}
	}
}

class Skull extends Jumpable {
	constructor() {
		super();
		this.addTag("skull");

		this.animations = {
			left: new Animation([
				new Frame(Core2D.image("skull0"), 6),
				new Frame(Core2D.image("skull1"), 6)
			]),

			right: new Animation([
				new Frame(Core2D.image("skull0", true), 6),
				new Frame(Core2D.image("skull1", true), 6)
			])
		};

		this.setAnimation(this.animations.left);
		this.setSolid();
		this.setSpeedX(-1);
		this.setAccelerationY(1);
		this.setMaxSpeedY(this.height / 3);
	}

	turn() {
		if (this.speedX < 0) {
			this.setAnimation(this.animations.left);
		} else {
			this.setAnimation(this.animations.right);
		}
	}
}

class Ghost extends Jumpable {
	constructor() {
		super();
		this.addTag("ghost");

		this.animations = {
			left: new Animation([
				new Frame(Core2D.image("ghost0"), 4),
				new Frame(Core2D.image("ghost1"), 4),
				new Frame(Core2D.image("ghost2"), 4),
				new Frame(Core2D.image("ghost3"), 4),
				new Frame(Core2D.image("ghost4"), 4),
				new Frame(Core2D.image("ghost5"), 4),
				new Frame(Core2D.image("ghost6"), 4)
			]),

			right: new Animation([
				new Frame(Core2D.image("ghost0", true), 4),
				new Frame(Core2D.image("ghost1", true), 4),
				new Frame(Core2D.image("ghost2", true), 4),
				new Frame(Core2D.image("ghost3", true), 4),
				new Frame(Core2D.image("ghost4", true), 4),
				new Frame(Core2D.image("ghost5", true), 4),
				new Frame(Core2D.image("ghost6", true), 4)
			])
		};

		this.setAnimation(this.animations.left);
		this.setSolid();
		this.setSpeedX(-2);
		this.setSpeedY(1);
		this.setAccelerationY(-0.1);
	}

	update() {
		if (!this.solid) {
			return;
		}

		if (this.speedX < 2 && this.left < 64) {
			this.setSpeedX(this.speedX + 0.1);
		} else if (this.speedX > -2 && this.right > this.scene.width - 64) {
			this.setSpeedX(this.speedX - 0.1);
		}

		if (this.speedX < 0) {
			this.setAnimation(this.animations.left);
		} else if (this.speedX > 0) {
			this.setAnimation(this.animations.right);
		}

		if (this.speedY < -1) {
			this.setAccelerationY(0.1);
		} else if (this.speedY > 1) {
			this.setAccelerationY(-0.1);
		}
	}
}

class Door extends Sprite {
	constructor() {
		super();
		this.addTag("brick");
		this.addTag("door");
		this.addTag("pushable");
	}

	onCollision(sprite) {
		if (sprite.hasTag("player") && sprite.useKey()) {
			this.scene.open();
		}
	}

	open() {
		this.animate();
		this.setSolid(false);
	}
}

class DoorBottom extends Door {
	constructor() {
		super();
		this.setImage("doorBottom0");

		if (game.doors[currentRoom()]) {
			this.animate();
		} else {
			this.setSolid();
		}
	}

	animate() {
		this.setImage("doorBottom1");
	}
}

class DoorTop extends Door {
	constructor() {
		super();
		this.setImage("doorTop0");

		if (game.doors[currentRoom()]) {
			this.animate();
		} else {
			this.setSolid();
		}
	}

	animate() {
		this.setImage("doorTop1");
	}
}

class Princess extends Sprite {
	constructor(id = 0) {
		super();
		this.customize(id);
	}

	customize(id) {
		switch (id) {
		case 0:
			this.setImage("princess3");
			break;
		}
	}
}

var CLASSES = {
	"bx" : Box,
	"dt" : DoorTop,
	"db" : DoorBottom,
	"gh" : Ghost,
	"ky" : Key,
	"p0" : Princess,
	"sk" : Skull,
};

function elementFactory(code) {
	return new CLASSES[code]();
}

Core2D.setFrameTime(32);
Core2D.setName("Alpha");
Core2D.init(new IntroScene);
