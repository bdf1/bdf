var data_a1e2fb4a_e986_4524_b0da_9b7ba7c0874d = 
{
	"main": {
		"floorIds": [
			"_",
			"__"
		],
		"floorPartitions": [],
		"images": [
			"bear.png",
			"bg.jpg",
			"dragon.png",
			"hero.png",
			"winskin.png"
		],
		"tilesets": [
			"magictower.png"
		],
		"animates": [
			"hand",
			"sword",
			"zone"
		],
		"bgms": [
			"bgm.mp3"
		],
		"sounds": [
			"attack.mp3",
			"bomb.mp3",
			"cancel.mp3",
			"centerFly.mp3",
			"confirm.mp3",
			"cursor.mp3",
			"door.mp3",
			"equip.mp3",
			"error.mp3",
			"floor.mp3",
			"gem.mp3",
			"icePickaxe.mp3",
			"item.mp3",
			"jump.mp3",
			"load.mp3",
			"open_ui.mp3",
			"pickaxe.mp3",
			"recovery.mp3",
			"save.mp3",
			"shop.mp3",
			"zone.mp3"
		],
		"fonts": [],
		"nameMap": {
			"确定": "confirm.mp3",
			"取消": "cancel.mp3",
			"操作失败": "error.mp3",
			"光标移动": "cursor.mp3",
			"打开界面": "open_ui.mp3",
			"读档": "load.mp3",
			"存档": "save.mp3",
			"获得道具": "item.mp3",
			"回血": "recovery.mp3",
			"炸弹": "bomb.mp3",
			"飞行器": "centerFly.mp3",
			"开关门": "door.mp3",
			"上下楼": "floor.mp3",
			"跳跃": "jump.mp3",
			"破墙镐": "pickaxe.mp3",
			"破冰镐": "icePickaxe.mp3",
			"宝石": "gem.mp3",
			"阻激夹域": "zone.mp3",
			"穿脱装备": "equip.mp3",
			"背景音乐": "bgm.mp3",
			"攻击": "attack.mp3",
			"背景图": "bg.jpg",
			"商店": "shop.mp3",
			"领域": "zone"
		},
		"levelChoose": [
			{
				"title": "简单",
				"name": "Easy",
				"hard": 1,
				"color": [
					64,
					255,
					85,
					1
				],
				"action": [
					{
						"type": "comment",
						"text": "在这里写该难度需执行的事件"
					}
				]
			},
			{
				"title": "普通",
				"name": "Normal",
				"hard": 2,
				"color": [
					255,
					221,
					32,
					1
				],
				"action": []
			},
			{
				"title": "困难",
				"name": "Hard",
				"hard": 3,
				"color": [
					255,
					68,
					64,
					1
				],
				"action": []
			}
		],
		"equipName": [
			"武器",
			"盾牌"
		],
		"startBgm": null,
		"styles": {
			"startBackground": "project/images/bg.jpg",
			"startVerticalBackground": "project/images/vertical.jpg",
			"startLogoStyle": "display:none",
			"startButtonsStyle": "background-color: #32369F; opacity: 0.85; color: #FFFFFF; border: #FFFFFF 1px solid; caret-color: #66CCFF;",
			"statusLeftBackground": "url(project/materials/ground.png) repeat",
			"statusTopBackground": "url(project/materials/ground.png) repeat",
			"toolsBackground": "url(project/materials/ground.png) repeat",
			"floorChangingStyle": "background-color: black; color: white",
			"statusBarColor": [
				255,
				255,
				255,
				1
			],
			"borderColor": [
				0,
				0,
				0,
				1
			],
			"selectColor": [
				102,
				204,
				255,
				1
			],
			"font": "Consolas"
		},
		"splitImages": [
			{
				"name": "dragon.png",
				"width": 384,
				"height": 96,
				"prefix": "dragon_"
			}
		]
	},
	"firstData": {
		"title": "战争世界Ⅱ",
		"name": "warworld",
		"version": "",
		"floorId": "_",
		"hero": {
			"image": "hero.png",
			"animate": true,
			"name": "小秋橙",
			"lv": 1,
			"hpmax": 9999,
			"hp": 1000,
			"manamax": -1,
			"mana": 0,
			"atk": 100,
			"def": 100,
			"mdef": 0,
			"money": 0,
			"exp": 0,
			"equipment": [],
			"items": {
				"constants": {},
				"tools": {},
				"equips": {}
			},
			"loc": {
				"direction": "up",
				"x": 19,
				"y": 18
			},
			"flags": {},
			"followers": [],
			"steps": 0
		},
		"startCanvas": [
			{
				"type": "comment",
				"text": "在这里可以用事件来自定义绘制标题界面的背景图等"
			},
			{
				"type": "comment",
				"text": "也可以直接切换到其他楼层（比如某个开始剧情楼层）进行操作。"
			},
			{
				"type": "previewUI",
				"action": [
					{
						"type": "showImage",
						"code": 1,
						"image": "bg.jpg",
						"sloc": [
							0,
							0,
							null
						],
						"loc": [
							0,
							0,
							"core.__PX_WIDTH__",
							"core.__PX_HEIGHT__"
						],
						"opacity": 1,
						"time": 0
					},
					{
						"type": "setAttribute",
						"align": "center"
					},
					{
						"type": "fillBoldText",
						"x": "core.__PX_WIDTH__ / 2",
						"y": 80,
						"style": [
							255,
							255,
							255,
							1
						],
						"strokeStyle": [
							0,
							0,
							0,
							1
						],
						"font": "bold 40px Verdana",
						"text": "${core.firstData.title}"
					}
				]
			},
			{
				"type": "setValue",
				"name": "flag:selection",
				"value": "0"
			},
			{
				"type": "comment",
				"text": "在右下方自绘一个对话框进行显示选择项"
			},
			{
				"type": "previewUI",
				"action": [
					{
						"type": "fillRect",
						"x": 230,
						"y": 250,
						"width": 150,
						"height": 142,
						"radius": 10,
						"style": [
							50,
							54,
							159,
							0.85
						]
					},
					{
						"type": "strokeRect",
						"x": 230,
						"y": 250,
						"width": 150,
						"height": 142,
						"radius": 10,
						"style": [
							255,
							255,
							255,
							1
						],
						"lineWidth": 2
					},
					{
						"type": "fillBoldText",
						"x": 305,
						"y": 290,
						"style": [
							255,
							255,
							255,
							1
						],
						"font": "bold 25px Verdana",
						"text": "开始游戏"
					},
					{
						"type": "fillBoldText",
						"x": 305,
						"y": 330,
						"font": "bold 25px Verdana",
						"text": "读取存档"
					},
					{
						"type": "fillBoldText",
						"x": 305,
						"y": 370,
						"font": "bold 25px Verdana",
						"text": "回放录像"
					}
				]
			},
			{
				"type": "while",
				"condition": "true",
				"data": [
					{
						"type": "drawSelector",
						"image": "winskin.png",
						"code": 1,
						"x": 245,
						"y": "265 + 40*flag:selection",
						"width": 120,
						"height": "core.__UNIT__"
					},
					{
						"type": "wait",
						"data": [
							{
								"case": "keyboard",
								"keycode": "13,32",
								"break": true,
								"action": [
									{
										"type": "switch",
										"condition": "flag:selection",
										"caseList": [
											{
												"case": "0",
												"action": [
													{
														"type": "comment",
														"text": "在“开始游戏”确定"
													},
													{
														"type": "break",
														"n": 1
													}
												]
											},
											{
												"case": "1",
												"action": [
													{
														"type": "comment",
														"text": "在“读取存档”确定"
													},
													{
														"type": "callLoad"
													}
												]
											},
											{
												"case": "2",
												"action": [
													{
														"type": "comment",
														"text": "在“回放录像”确定"
													},
													{
														"type": "if",
														"condition": "(!core.isReplaying())",
														"true": [
															{
																"type": "function",
																"function": "function(){\ncore.chooseReplayFile()\n}"
															}
														]
													}
												]
											}
										]
									}
								]
							},
							{
								"case": "keyboard",
								"keycode": "38",
								"break": true,
								"action": [
									{
										"type": "comment",
										"text": "光标上键"
									},
									{
										"type": "setValue",
										"name": "flag:selection",
										"value": "(flag:selection + 2) % 3"
									}
								]
							},
							{
								"case": "keyboard",
								"keycode": "40",
								"break": true,
								"action": [
									{
										"type": "comment",
										"text": "光标下键"
									},
									{
										"type": "setValue",
										"name": "flag:selection",
										"value": "(flag:selection + 1) % 3"
									}
								]
							},
							{
								"case": "mouse",
								"px": [
									245,
									365
								],
								"py": [
									261,
									300
								],
								"break": true,
								"action": [
									{
										"type": "comment",
										"text": "点击“开始游戏”"
									},
									{
										"type": "break",
										"n": 1
									}
								]
							},
							{
								"case": "mouse",
								"px": [
									245,
									365
								],
								"py": [
									301,
									340
								],
								"break": true,
								"action": [
									{
										"type": "comment",
										"text": "点击“读取存档”"
									},
									{
										"type": "callLoad"
									}
								]
							},
							{
								"case": "mouse",
								"px": [
									245,
									365
								],
								"py": [
									341,
									380
								],
								"break": true,
								"action": [
									{
										"type": "comment",
										"text": "点击“播放录像”"
									},
									{
										"type": "if",
										"condition": "(!core.isReplaying())",
										"true": [
											{
												"type": "function",
												"function": "function(){\ncore.chooseReplayFile()\n}"
											}
										]
									}
								]
							}
						]
					}
				]
			},
			{
				"type": "setValue",
				"name": "flag:selection",
				"value": "null"
			},
			{
				"type": "drawSelector",
				"code": 1
			},
			{
				"type": "clearMap"
			},
			{
				"type": "function",
				"function": "function(){\ncore.control.checkBgm()\n}"
			},
			{
				"type": "if",
				"condition": "(main.levelChoose.length > 0)",
				"true": [
					{
						"type": "comment",
						"text": "难度选择：作为样例，这里只提供了一个显示选择项。"
					},
					{
						"type": "function",
						"function": "function(){\nvar choices = [];\nmain.levelChoose.forEach(function (one) {\n\tchoices.push({\n\t\t\"text\": one.title || '',\n\t\t\"action\": [\n\t\t\t{ \"type\": \"function\", \"function\": \"function() { core.status.hard = '\" + (one.name || '') + \"'; }\" }\n\t\t]\n\t});\n})\ncore.insertAction({ \"type\": \"choices\", \"choices\": choices });\n}"
					},
					{
						"type": "comment",
						"text": "你也可以仿照上面的样例进行自己创建等待用户操作来处理不同的难度分歧。\n如需自己处理，请设置 core.status.hard \n（例如，自定义js脚本：core.status.hard = 'Easy' ）"
					}
				]
			},
			{
				"type": "hideImage",
				"code": 1,
				"time": 0
			},
			{
				"type": "comment",
				"text": "接下来会执行startText中的事件"
			},
			{
				"type": "comment",
				"text": "状态栏默认处于隐藏状态；可以使用“显示状态栏”事件进行显示。"
			}
		],
		"startText": [
			{
				"type": "setHeroOpacity",
				"opacity": 0,
				"time": 0
			},
			{
				"type": "hideStatusBar"
			},
			{
				"type": "comment",
				"text": "初始剧情"
			},
			{
				"type": "setText",
				"title": [
					102,
					204,
					255,
					1
				],
				"background": "winskin.png",
				"time": 40,
				"animateTime": 250
			},
			{
				"type": "function",
				"function": "function(){\ncore.status.hero.flags.useEnemyInfoDisplay = true;\ncore.status.hero.items.constants = { book: 1, fly: 1 }\nvar gjm = [\"\"]\nvar gjm_ = [\"01495\", \"305836qwe\", \"alex\", \"bdf\", \"BerylliuMM\", \"box\", \"castor_v_pollux\", \"cyf\", \"CZERNY_Op.740\", \"DCleanMeow\", \"Fab777\", \"freudia\", \"Kyuuri\", \"lilie500\", \"LOL解说：雷霆\", \"NekoChocolate\", \"qweasz687\", \"Skylink\", \"Solomonhume\", \"StarInShadow\", \"Takanashi_Hinata\", \"x2c2y4\", \"Yao Fu\", \"艾之葵\", \"白露久远\", \"北海小羊\", \"冰语の梦雪\", \"怠惰\", \"非寒\", \"风曦流光\", \"好丽友派新掌门\", \"见见\", \"霖\", \"鹿间裕贵\", \"魔塔忠实爱好者\", \"茉莉花茶\", \"欧耶\", \"胖伯\", \"千夜\", \"前往饿啊是\", \"乾隆汽车\", \"若愚\", \"上财mary随便拆拆\", \"食猫兽杨子默\", \"水塔製作員\", \"太难了\", \"婉约诗人\", \"我能听见风的声音\", \"筱米库\", \"戌亥とこ\", \"杨超越天下无敌\", \"银河爱丽丝\", \"再顶lz\", \"终末之扉\"]\nfor (var i = gjm_.length; i > 0; i--) {\n\tvar t = core.rand(i);\n\tgjm.push(gjm_[t]);\n\tgjm_.splice(t, 1);\n}\ncore.status.hero.flags.gjm = gjm;\nvar cs = [{}],\n\tgj = [{}];\nfor (var i in gjm)\n\tif (gjm[i]) {\n\t\tcs.push({ nm: gjm[i] + \" 1\", gj: i, ic: 10, rk: 60, hp: 30000, kj: 10, rkzz: 2, HP: 30000, sc: [], v: [], lin: [] });\n\t\tcs.push({ nm: gjm[i] + \" 2\", gj: i, ic: 6, rk: 45, hp: 20000, kj: 6, rkzz: 1, HP: 20000, sc: [], v: [], lin: [] });\n\t\tcs.push({ nm: gjm[i] + \" 3\", gj: i, ic: 4, rk: 30, hp: 10000, kj: 4, rkzz: 1, HP: 10000, sc: [], v: [], lin: [] });\n\t\tcs.push({ nm: gjm[i] + \" 4\", gj: i, ic: 2, rk: 15, hp: 5000, kj: 2, rkzz: 1, HP: 5000, sc: [], v: [], lin: [] });\n\t\tgj.push({\n\t\t\tnm: gjm[i],\n\t\t\tsile: false,\n\t\t\tdd: [],\n\t\t\tyffx: 0,\n\t\t\tyffy: [\n\t\t\t\t[],\n\t\t\t\t[0, 0, 0, 4000, 1e4, 2e4],\n\t\t\t\t[0, 0, 2000, 8000, 2e4, 4.8e4],\n\t\t\t\t[0, 0, 1e4, 4e4, 7e4, 11e4],\n\t\t\t\t[0, 3000, 1e4, 6e4],\n\t\t\t\t[0, 2e4]\n\t\t\t]\n\t\t});\n\t}\nvar mil = [\n\t[],\n\t[{}, { nm: \"步兵师\", zdl: 15, hp: 10, sd: 1, xh: 32 }, { nm: \"机械化师\", zdl: 25, hp: 20, sd: 1, xh: 48 }, { nm: \"信息化步兵师\", zdl: 50, hp: 40, sd: 2, xh: 64 }, { nm: \"特种部队\", zdl: 90, hp: 80, sd: 3, xh: 108 }, { nm: \"高科技部队\", zdl: 150, hp: 120, sd: 3, xh: 180 }],\n\t[{}, { nm: \"83式152毫米加农炮\", zdl: 60, hp: 5, sd: 3, xh: 60 }, { nm: \"89式自行火炮\", zdl: 100, hp: 10, sd: 3, xh: 100 }, { nm: \"PLZ-45自行火炮\", zdl: 220, hp: 20, sd: 3, xh: 150 }, { nm: \"WS-3d自行火箭炮\", zdl: 320, hp: 20, sd: 3, xh: 200 }, { nm: \"C-1激光炮\", zdl: 400, hp: 30, sd: 3, xh: 240 }],\n\t[{}, { nm: \"80式坦克\", zdl: 40, hp: 120, sd: 6, xh: 120 }, { nm: \"96式坦克\", zdl: 80, hp: 220, sd: 6, xh: 180 }, { nm: \"99式坦克\", zdl: 135, hp: 450, sd: 6, xh: 240 }, { nm: \"11式坦克\", zdl: 200, hp: 810, sd: 6, xh: 320 }, { nm: \"24式坦克\", zdl: 250, hp: 1260, sd: 6, xh: 420 }],\n\t[{}, { nm: \"东风-13导弹\", zdl: 400, hp: 1, sd: 5, xh: 80 }, { nm: \"东风-22导弹\", zdl: 900, hp: 1, sd: 5, xh: 150 }, { nm: \"东风-35式导弹\", zdl: 3000, hp: 1, sd: 5, xh: 220 }],\n\t[{}, { nm: \"核弹\", zdl: 20000, hp: 1, sd: 5, xh: 1500 }]\n]\ncore.status.hero.flags.cs = cs;\ncore.status.hero.flags.gj = gj;\ncore.status.hero.flags.dw = [{}];\ncore.status.hero.flags.mil = mil;\ncore.status.hero.flags.tu = [\n\t[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],\n\t[1, 2, 5, 6, 9, 10, 0, 13, 14, 17, 18, 21, 22, 0, 25, 26, 29, 30, 33, 34],\n\t[3, 4, 7, 8, 11, 12, 0, 15, 16, 19, 20, 23, 24, 0, 27, 28, 31, 32, 35, 36],\n\t[37, 38, 41, 42, 45, 46, 0, 49, 50, 53, 54, 57, 58, 0, 61, 62, 65, 66, 69, 70],\n\t[39, 40, 43, 44, 47, 48, 0, 51, 52, 55, 56, 59, 60, 0, 63, 64, 67, 68, 71, 72],\n\t[73, 74, 77, 78, 81, 82, 0, 85, 86, 89, 90, 93, 94, 0, 97, 98, 101, 102, 105, 106],\n\t[75, 76, 79, 80, 83, 84, 0, 87, 88, 91, 92, 95, 96, 0, 99, 100, 103, 104, 107, 108],\n\t[109, 110, 113, 114, 117, 118, 0, 121, 122, 125, 126, 129, 130, 0, 133, 134, 137, 138, 141, 142],\n\t[111, 112, 115, 116, 119, 120, 0, 123, 124, 127, 128, 131, 132, 0, 135, 136, 139, 140, 143, 144],\n\t[145, 146, 149, 150, 153, 154, 0, 157, 158, 161, 162, 165, 166, 0, 169, 170, 173, 174, 177, 178],\n\t[147, 148, 151, 152, 155, 156, 0, 159, 160, 163, 164, 167, 168, 0, 171, 172, 175, 176, 179, 180],\n\t[181, 182, 185, 186, 189, 190, 0, 193, 194, 197, 198, 201, 202, 0, 205, 206, 209, 210, 213, 214],\n\t[183, 184, 187, 188, 191, 192, 0, 195, 196, 199, 200, 203, 204, 0, 207, 208, 211, 212, 215, 216]\n];\nvar lt = [];\nfor (var i = cs.length; i >= 0; i--) lt.push([]);\nfor (var i = cs.length; i >= 0; i--)\n\tfor (var j = cs.length; j >= 0; j--) lt[i].push(0);\nfor (var i = 1; i <= 54; i++) {\n\tfor (var j = i * 4 - 3; j <= i * 4; j++)\n\t\tfor (var k = i * 4 - 3; k <= i * 4; k++) lt[k][j] = lt[j][k] = 1;\n\tif (i % 9)\n\t\tfor (var j = i * 4 - 3; j <= i * 4; j++)\n\t\t\tfor (var k = i * 4 + 1; k <= i * 4 + 4; k++) lt[k][j] = lt[j][k] = 1;\n\tif (i <= 45)\n\t\tfor (var j = i * 4 - 3; j <= i * 4; j++)\n\t\t\tfor (var k = i * 4 + 33; k <= i * 4 + 36; k++) lt[k][j] = lt[j][k] = 1;\n}\ncore.status.hero.flags.lt = lt;\ncore.status.hero.flags.color = [\"\"];\nvar zz = [];\nfor (var i = gjm.length; i >= 0; i--) zz.push([]);\nfor (var i = gjm.length; i >= 0; i--)\n\tfor (var j = gjm.length; j >= 0; j--) zz[i].push(0);\ncore.status.hero.flags.zz = zz;\nfor (var i = 1; i <= gjm.length; i++) core.status.hero.flags.color.push('#' + (\"000000\" + core.rand(16777216).toString(16)).substr(-6));\n}"
			},
			{
				"type": "showStatusBar"
			}
		],
		"shops": [
			{
				"id": "shop1",
				"text": "\t[科研,moneyShop]选择研发项目 (当前研发项目：[${[\"无\",\"步兵\",\"火炮\",\"坦克\",\"导弹\",\"核武器\"][flags.gj[flags.xzgj].yffx]}])",
				"textInList": "科研",
				"mustEnable": false,
				"disablePreview": false,
				"choices": [
					{
						"text": "步兵 [${flags.gj[flags.xzgj].yffy[1][2]>0 ? flags.gj[flags.xzgj].yffy[1][2] : flags.gj[flags.xzgj].yffy[1][3]>0 ? flags.gj[flags.xzgj].yffy[1][3] : flags.gj[flags.xzgj].yffy[1][4]>0 ? flags.gj[flags.xzgj].yffy[1][4] : flags.gj[flags.xzgj].yffy[1][5]>0 ? flags.gj[flags.xzgj].yffy[1][5] : 0}]",
						"need": "flags.gj[flags.xzgj].yffy[1][5]>0",
						"action": [
							{
								"type": "function",
								"function": "function(){\nflags.gj[flags.xzgj].yffx=1;\n}"
							}
						]
					},
					{
						"text": "火炮 [${flags.gj[flags.xzgj].yffy[2][2]>0 ? flags.gj[flags.xzgj].yffy[2][2] : flags.gj[flags.xzgj].yffy[2][3]>0 ? flags.gj[flags.xzgj].yffy[2][3] : flags.gj[flags.xzgj].yffy[2][4]>0 ? flags.gj[flags.xzgj].yffy[2][4] : flags.gj[flags.xzgj].yffy[2][5]>0 ? flags.gj[flags.xzgj].yffy[2][5] : 0}]",
						"need": "flags.gj[flags.xzgj].yffy[2][5]>0",
						"action": [
							{
								"type": "function",
								"function": "function(){\nflags.gj[flags.xzgj].yffx=2;\n}"
							}
						]
					},
					{
						"text": "坦克 [${flags.gj[flags.xzgj].yffy[3][2]>0 ? flags.gj[flags.xzgj].yffy[3][2] : flags.gj[flags.xzgj].yffy[3][3]>0 ? flags.gj[flags.xzgj].yffy[3][3] : flags.gj[flags.xzgj].yffy[3][4]>0 ? flags.gj[flags.xzgj].yffy[3][4] : flags.gj[flags.xzgj].yffy[3][5]>0 ? flags.gj[flags.xzgj].yffy[3][5] : 0}]",
						"need": "flags.gj[flags.xzgj].yffy[3][5]>0",
						"action": [
							{
								"type": "function",
								"function": "function(){\nflags.gj[flags.xzgj].yffx=3;\n}"
							}
						]
					},
					{
						"text": "导弹 [${flags.gj[flags.xzgj].yffy[4][1]>0 ? flags.gj[flags.xzgj].yffy[4][1] : flags.gj[flags.xzgj].yffy[4][2]>0 ? flags.gj[flags.xzgj].yffy[4][2] : flags.gj[flags.xzgj].yffy[4][3]>0 ? flags.gj[flags.xzgj].yffy[4][3] : 0}]",
						"need": "flags.gj[flags.xzgj].yffy[4][3]>0",
						"action": [
							{
								"type": "function",
								"function": "function(){\nflags.gj[flags.xzgj].yffx=4;\n}"
							}
						]
					},
					{
						"text": "核武器 [${flags.gj[flags.xzgj].yffy[5][1]>0 ? flags.gj[flags.xzgj].yffy[5][1]: 0}]",
						"need": "flags.gj[flags.xzgj].yffy[5][1]>0",
						"action": [
							{
								"type": "function",
								"function": "function(){\nflags.gj[flags.xzgj].yffx=5;\n}"
							}
						]
					},
					{
						"text": "令当前项目立即研究完毕！",
						"need": "flags.debug",
						"color": [
							255,
							0,
							0
						],
						"condition": "flags.debug",
						"action": [
							{
								"type": "function",
								"function": "function(){\nvar t = 0;\nwhile (t <= 5 && flags.gj[flags.xzgj].yffy[flags.gj[flags.xzgj].yffx][t] <= 0) t += 1;\nif (t <= 5) flags.gj[flags.xzgj].yffy[flags.gj[flags.xzgj].yffx][t] = 0;\n}"
							}
						]
					}
				]
			},
			{
				"id": "missile",
				"textInList": "发射导弹",
				"mustEnable": false,
				"commonEvent": "回收钥匙商店"
			},
			{
				"id": "war",
				"textInList": "宣战",
				"mustEnable": false,
				"commonEvent": "宣战"
			},
			{
				"id": "next",
				"textInList": "下一回合",
				"mustEnable": false,
				"commonEvent": "下一回合"
			},
			{
				"id": "tutor",
				"textInList": "教程",
				"mustEnable": false,
				"commonEvent": "tutorial"
			}
		],
		"levelUp": [
			{
				"need": "0",
				"title": "",
				"action": [
					{
						"type": "comment",
						"text": "此处是初始等级，只需填写称号"
					}
				]
			}
		]
	},
	"values": {
		"lavaDamage": 0,
		"poisonDamage": 0,
		"weakValue": 0,
		"redGem": 0,
		"blueGem": 0,
		"greenGem": 0,
		"redPotion": 0,
		"bluePotion": 0,
		"yellowPotion": 0,
		"greenPotion": 0,
		"breakArmor": 0,
		"counterAttack": 0,
		"purify": 0,
		"hatred": 0,
		"animateSpeed": 300,
		"moveSpeed": 200,
		"statusCanvasRowsOnMobile": 5,
		"floorChangeTime": 100
	},
	"flags": {
		"statusBarItems": [
			"enableFloor",
			"enableHP",
			"enableAtk",
			"enableDef",
			"enableMDef",
			"enableMoney",
			"enableExp",
			"enableKeys"
		],
		"extendToolbar": false,
		"flyNearStair": false,
		"flyRecordPosition": false,
		"itemFirstText": false,
		"equipboxButton": false,
		"enableAddPoint": false,
		"enableNegativeDamage": false,
		"betweenAttackMax": false,
		"useLoop": false,
		"startUsingCanvas": false,
		"statusCanvas": true,
		"enableEnemyPoint": true,
		"enableGentleClick": true,
		"ignoreChangeFloor": true,
		"canGoDeadZone": false,
		"enableMoveDirectly": true,
		"enableRouteFolding": true,
		"disableShopOnDamage": false,
		"blurFg": false
	}
}