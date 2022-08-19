var events_c12a15a8_c380_4b28_8144_256cba95f760 = 
{
	"commonEvent": {
		"加点事件": [
			{
				"type": "comment",
				"text": "通过传参，flag:arg1 表示当前应该的加点数值"
			},
			{
				"type": "if",
				"condition": "((flag:cs[flag:arg1].gj!=flag:xzgj )&&(!flag:debug))",
				"true": [
					{
						"type": "tip",
						"text": "这个城市不是你的"
					},
					{
						"type": "break",
						"n": 1
					}
				]
			},
			{
				"type": "choices",
				"choices": [
					{
						"text": "清空生产队列（原生产进度将废除）",
						"action": [
							{
								"type": "function",
								"function": "function(){\nflags.cs[flags.arg1].sc=[]\n}"
							}
						]
					},
					{
						"text": "生产单位",
						"action": [
							{
								"type": "choices",
								"choices": [
									{
										"text": "步兵",
										"action": [
											{
												"type": "setValue",
												"name": "flag:A",
												"value": "1"
											},
											{
												"type": "choices",
												"choices": [
													{
														"text": "步兵师  攻击:15 HP:10 消耗工业:32 移动需10回合",
														"condition": "flags.gj[flags.xzgj].yffy[1][1]<=0",
														"action": [
															{
																"type": "setValue",
																"name": "flag:B",
																"value": "1"
															}
														]
													},
													{
														"text": "机械化师  攻击:25 HP:20 消耗工业:48 移动需10回合",
														"condition": "flags.gj[flags.xzgj].yffy[1][2]<=0",
														"action": [
															{
																"type": "setValue",
																"name": "flag:B",
																"value": "2"
															}
														]
													},
													{
														"text": "信息化步兵师  攻击:50 HP:40 消耗工业:64 移动需5回合",
														"condition": "flags.gj[flags.xzgj].yffy[1][3]<=0",
														"action": [
															{
																"type": "setValue",
																"name": "flag:B",
																"value": "3"
															}
														]
													},
													{
														"text": "特种部队  攻击:90 HP:80 消耗工业:108 移动需4回合",
														"condition": "flags.gj[flags.xzgj].yffy[1][4]<=0",
														"action": [
															{
																"type": "setValue",
																"name": "flag:B",
																"value": "4"
															}
														]
													},
													{
														"text": "高科技部队  攻击:150 HP:120 消耗工业:180 移动需4回合",
														"condition": "flags.gj[flags.xzgj].yffy[1][5]<=0",
														"action": [
															{
																"type": "setValue",
																"name": "flag:B",
																"value": "5"
															}
														]
													}
												]
											}
										]
									},
									{
										"text": "火炮",
										"action": [
											{
												"type": "setValue",
												"name": "flag:A",
												"value": "2"
											},
											{
												"type": "choices",
												"choices": [
													{
														"text": "83式152毫米加农炮  攻击:60 HP:5 消耗工业:60 移动需4回合",
														"condition": "flags.gj[flags.xzgj].yffy[2][1]<=0",
														"action": [
															{
																"type": "setValue",
																"name": "flag:B",
																"value": "1"
															}
														]
													},
													{
														"text": "89式自行火炮  攻击:100 HP:10 消耗工业:100 移动需4回合",
														"condition": "flags.gj[flags.xzgj].yffy[2][2]<=0",
														"action": [
															{
																"type": "setValue",
																"name": "flag:B",
																"value": "2"
															}
														]
													},
													{
														"text": "PLZ-45自行火炮  攻击:220 HP:20 消耗工业:150 移动需4回合",
														"condition": "flags.gj[flags.xzgj].yffy[2][3]<=0",
														"action": [
															{
																"type": "setValue",
																"name": "flag:B",
																"value": "3"
															}
														]
													},
													{
														"text": "WS-3d自行火箭炮  攻击:320 HP:20 消耗工业:200 移动需4回合",
														"condition": "flags.gj[flags.xzgj].yffy[2][4]<=0",
														"action": [
															{
																"type": "setValue",
																"name": "flag:B",
																"value": "4"
															}
														]
													},
													{
														"text": "C-1激光炮  攻击:400 HP:30 消耗工业:240 移动需4回合",
														"condition": "flags.gj[flags.xzgj].yffy[2][5]<=0",
														"action": [
															{
																"type": "setValue",
																"name": "flag:B",
																"value": "5"
															}
														]
													}
												]
											}
										]
									},
									{
										"text": "坦克",
										"action": [
											{
												"type": "setValue",
												"name": "flag:A",
												"value": "3"
											},
											{
												"type": "choices",
												"choices": [
													{
														"text": "80式坦克  攻击:40 HP:120 消耗工业:120 移动需2回合",
														"condition": "flags.gj[flags.xzgj].yffy[3][1]<=0",
														"action": [
															{
																"type": "setValue",
																"name": "flag:B",
																"value": "1"
															}
														]
													},
													{
														"text": "96式坦克  攻击:80 HP:220 消耗工业:180 移动需2回合",
														"condition": "flags.gj[flags.xzgj].yffy[3][2]<=0",
														"action": [
															{
																"type": "setValue",
																"name": "flag:B",
																"value": "2"
															}
														]
													},
													{
														"text": "99式坦克  攻击:135 HP:450 消耗工业:240 移动需2回合",
														"condition": "flags.gj[flags.xzgj].yffy[3][3]<=0",
														"action": [
															{
																"type": "setValue",
																"name": "flag:B",
																"value": "3"
															}
														]
													},
													{
														"text": "11式坦克  攻击:200 HP:810 消耗工业:320 移动需2回合",
														"condition": "flags.gj[flags.xzgj].yffy[3][4]<=0",
														"action": [
															{
																"type": "setValue",
																"name": "flag:B",
																"value": "4"
															}
														]
													},
													{
														"text": "24式坦克  攻击:250 HP:1260 消耗工业:420 移动需2回合",
														"condition": "flags.gj[flags.xzgj].yffy[3][5]<=0",
														"action": [
															{
																"type": "setValue",
																"name": "flag:B",
																"value": "5"
															}
														]
													}
												]
											}
										]
									},
									{
										"text": "导弹",
										"need": "flags.gj[flags.xzgj].yffy[4][1]<=0",
										"action": [
											{
												"type": "setValue",
												"name": "flag:A",
												"value": "4"
											},
											{
												"type": "choices",
												"choices": [
													{
														"text": "东风-13导弹  攻击:400 消耗工业:80",
														"condition": "flags.gj[flags.xzgj].yffy[4][1]<=0",
														"action": [
															{
																"type": "setValue",
																"name": "flag:B",
																"value": "1"
															}
														]
													},
													{
														"text": "东风-22导弹  攻击:900 消耗工业:150",
														"condition": "flags.gj[flags.xzgj].yffy[4][2]<=0",
														"action": [
															{
																"type": "setValue",
																"name": "flag:B",
																"value": "2"
															}
														]
													},
													{
														"text": "东风-35式导弹  攻击:3000 消耗工业:220",
														"condition": "flags.gj[flags.xzgj].yffy[4][3]<=0",
														"action": [
															{
																"type": "setValue",
																"name": "flag:B",
																"value": "3"
															}
														]
													}
												]
											}
										]
									},
									{
										"text": "核武器 攻击:20000 消耗工业:1500",
										"need": "flags.gj[flags.xzgj].yffy[5][1]<=0",
										"action": [
											{
												"type": "setValue",
												"name": "flag:A",
												"value": "5"
											},
											{
												"type": "setValue",
												"name": "flag:B",
												"value": "1"
											}
										]
									},
									{
										"text": "工厂(生产+1,需100人) 消耗工业:100",
										"action": [
											{
												"type": "setValue",
												"name": "flag:A",
												"value": "8"
											},
											{
												"type": "setValue",
												"name": "flag:B",
												"value": "1"
											}
										]
									},
									{
										"text": "科研所(研发+1,需50人) 消耗工业:100",
										"action": [
											{
												"type": "setValue",
												"name": "flag:A",
												"value": "9"
											},
											{
												"type": "setValue",
												"name": "flag:B",
												"value": "1"
											}
										]
									},
									{
										"text": "不生产",
										"action": [
											{
												"type": "break",
												"n": 1
											}
										]
									}
								]
							},
							{
								"type": "input",
								"text": "输入要生产的数量"
							},
							{
								"type": "function",
								"function": "function(){\nfor (var i = 1; i <= flags.input; i++) flags.cs[flags.arg1].sc.push({ lx: flags.A, xh: flags.B, ys: flags.A > 5 ? 100 : flags.mil[flags.A][flags.B].xh })\n}"
							}
						]
					},
					{
						"text": "在所有当前无生产城市一键生产",
						"action": [
							{
								"type": "choices",
								"choices": [
									{
										"text": "步兵",
										"action": [
											{
												"type": "setValue",
												"name": "flag:A",
												"value": "1"
											},
											{
												"type": "choices",
												"choices": [
													{
														"text": "步兵师  攻击:15 HP:10 消耗工业:32 移动需10回合",
														"condition": "flags.gj[flags.xzgj].yffy[1][1]<=0",
														"action": [
															{
																"type": "setValue",
																"name": "flag:B",
																"value": "1"
															}
														]
													},
													{
														"text": "机械化师  攻击:25 HP:20 消耗工业:48 移动需10回合",
														"condition": "flags.gj[flags.xzgj].yffy[1][2]<=0",
														"action": [
															{
																"type": "setValue",
																"name": "flag:B",
																"value": "2"
															}
														]
													},
													{
														"text": "信息化步兵师  攻击:50 HP:40 消耗工业:64 移动需5回合",
														"condition": "flags.gj[flags.xzgj].yffy[1][3]<=0",
														"action": [
															{
																"type": "setValue",
																"name": "flag:B",
																"value": "3"
															}
														]
													},
													{
														"text": "特种部队  攻击:90 HP:80 消耗工业:108 移动需4回合",
														"condition": "flags.gj[flags.xzgj].yffy[1][4]<=0",
														"action": [
															{
																"type": "setValue",
																"name": "flag:B",
																"value": "4"
															}
														]
													},
													{
														"text": "高科技部队  攻击:150 HP:120 消耗工业:180 移动需4回合",
														"condition": "flags.gj[flags.xzgj].yffy[1][5]<=0",
														"action": [
															{
																"type": "setValue",
																"name": "flag:B",
																"value": "5"
															}
														]
													}
												]
											}
										]
									},
									{
										"text": "火炮",
										"action": [
											{
												"type": "setValue",
												"name": "flag:A",
												"value": "2"
											},
											{
												"type": "choices",
												"choices": [
													{
														"text": "83式152毫米加农炮  攻击:60 HP:5 消耗工业:60 移动需4回合",
														"condition": "flags.gj[flags.xzgj].yffy[2][1]<=0",
														"action": [
															{
																"type": "setValue",
																"name": "flag:B",
																"value": "1"
															}
														]
													},
													{
														"text": "89式自行火炮  攻击:100 HP:10 消耗工业:100 移动需4回合",
														"condition": "flags.gj[flags.xzgj].yffy[2][2]<=0",
														"action": [
															{
																"type": "setValue",
																"name": "flag:B",
																"value": "2"
															}
														]
													},
													{
														"text": "PLZ-45自行火炮  攻击:220 HP:20 消耗工业:150 移动需4回合",
														"condition": "flags.gj[flags.xzgj].yffy[2][3]<=0",
														"action": [
															{
																"type": "setValue",
																"name": "flag:B",
																"value": "3"
															}
														]
													},
													{
														"text": "WS-3d自行火箭炮  攻击:320 HP:20 消耗工业:200 移动需4回合",
														"condition": "flags.gj[flags.xzgj].yffy[2][4]<=0",
														"action": [
															{
																"type": "setValue",
																"name": "flag:B",
																"value": "4"
															}
														]
													},
													{
														"text": "C-1激光炮  攻击:400 HP:30 消耗工业:240 移动需4回合",
														"condition": "flags.gj[flags.xzgj].yffy[2][5]<=0",
														"action": [
															{
																"type": "setValue",
																"name": "flag:B",
																"value": "5"
															}
														]
													}
												]
											}
										]
									},
									{
										"text": "坦克",
										"action": [
											{
												"type": "setValue",
												"name": "flag:A",
												"value": "3"
											},
											{
												"type": "choices",
												"choices": [
													{
														"text": "80式坦克  攻击:40 HP:120 消耗工业:120 移动需2回合",
														"condition": "flags.gj[flags.xzgj].yffy[3][1]<=0",
														"action": [
															{
																"type": "setValue",
																"name": "flag:B",
																"value": "1"
															}
														]
													},
													{
														"text": "96式坦克  攻击:80 HP:220 消耗工业:180 移动需2回合",
														"condition": "flags.gj[flags.xzgj].yffy[3][2]<=0",
														"action": [
															{
																"type": "setValue",
																"name": "flag:B",
																"value": "2"
															}
														]
													},
													{
														"text": "99式坦克  攻击:135 HP:450 消耗工业:240 移动需2回合",
														"condition": "flags.gj[flags.xzgj].yffy[3][3]<=0",
														"action": [
															{
																"type": "setValue",
																"name": "flag:B",
																"value": "3"
															}
														]
													},
													{
														"text": "11式坦克  攻击:200 HP:810 消耗工业:320 移动需2回合",
														"condition": "flags.gj[flags.xzgj].yffy[3][4]<=0",
														"action": [
															{
																"type": "setValue",
																"name": "flag:B",
																"value": "4"
															}
														]
													},
													{
														"text": "24式坦克  攻击:250 HP:1260 消耗工业:420 移动需2回合",
														"condition": "flags.gj[flags.xzgj].yffy[3][5]<=0",
														"action": [
															{
																"type": "setValue",
																"name": "flag:B",
																"value": "5"
															}
														]
													}
												]
											}
										]
									},
									{
										"text": "导弹",
										"need": "flags.gj[flags.xzgj].yffy[4][1]<=0",
										"action": [
											{
												"type": "setValue",
												"name": "flag:A",
												"value": "4"
											},
											{
												"type": "choices",
												"choices": [
													{
														"text": "东风-13导弹  攻击:400 消耗工业:80",
														"condition": "flags.gj[flags.xzgj].yffy[4][1]<=0",
														"action": [
															{
																"type": "setValue",
																"name": "flag:B",
																"value": "1"
															}
														]
													},
													{
														"text": "东风-22导弹  攻击:900 消耗工业:150",
														"condition": "flags.gj[flags.xzgj].yffy[4][2]<=0",
														"action": [
															{
																"type": "setValue",
																"name": "flag:B",
																"value": "2"
															}
														]
													},
													{
														"text": "东风-35式导弹  攻击:3000 消耗工业:220",
														"condition": "flags.gj[flags.xzgj].yffy[4][3]<=0",
														"action": [
															{
																"type": "setValue",
																"name": "flag:B",
																"value": "3"
															}
														]
													}
												]
											}
										]
									},
									{
										"text": "核武器 攻击:20000 消耗工业:1500",
										"need": "flags.gj[flags.xzgj].yffy[5][1]<=0",
										"action": [
											{
												"type": "setValue",
												"name": "flag:A",
												"value": "5"
											},
											{
												"type": "setValue",
												"name": "flag:B",
												"value": "1"
											}
										]
									},
									{
										"text": "工厂(人口>=85) 消耗工业:100",
										"action": [
											{
												"type": "setValue",
												"name": "flag:A",
												"value": "8"
											},
											{
												"type": "setValue",
												"name": "flag:B",
												"value": "1"
											}
										]
									},
									{
										"text": "科研所(人口>=35) 消耗工业:100",
										"action": [
											{
												"type": "setValue",
												"name": "flag:A",
												"value": "9"
											},
											{
												"type": "setValue",
												"name": "flag:B",
												"value": "1"
											}
										]
									},
									{
										"text": "不生产",
										"action": [
											{
												"type": "break",
												"n": 1
											}
										]
									}
								]
							},
							{
								"type": "input",
								"text": "输入要生产的数量"
							},
							{
								"type": "function",
								"function": "function(){\nfor (var j = 1; j < flags.cs.length; j++)\n\tif (flags.cs[j].gj == flags.xzgj && flags.cs[j].rk >= (flags.A == 8 ? 85 : flags.A == 9 ? 35 : 0) && flags.cs[j].sc.length == 0)\n\t\tfor (var i = 1; i <= flags.input; i++) flags.cs[j].sc.push({ lx: flags.A, xh: flags.B, ys: flags.A > 5 ? 100 : flags.mil[flags.A][flags.B].xh })\n}"
							}
						]
					},
					{
						"text": "当前城市军队按生产时间排序",
						"action": [
							{
								"type": "function",
								"function": "function(){\nflags.cs[flags.arg1].v.sort();\n}"
							}
						]
					},
					{
						"text": "当前城市军队按军队剩余血量排序",
						"action": [
							{
								"type": "function",
								"function": "function(){\nflags.cs[flags.arg1].v.sort(function (a, b) { return flags.dw[a].hp - flags.dw[b].hp; });\n}"
							}
						]
					},
					{
						"text": "进攻相邻的敌国城市(不可撤销)",
						"action": [
							{
								"type": "function",
								"function": "function(){\nflags.city = []\nfor (var i = 1; i < flags.cs.length; i++)\n\tif (flags.zz[flags.xzgj][flags.cs[i].gj] && flags.lt[i][flags.arg1]) flags.city.push(i);\n}"
							},
							{
								"type": "if",
								"condition": "(flags.city.length==0)",
								"true": [
									{
										"type": "tip",
										"text": "无合法的进攻目的地"
									},
									{
										"type": "break",
										"n": 1
									}
								]
							},
							{
								"type": "if",
								"condition": "(flags.cs[flags.arg1].v.length==0)",
								"true": [
									{
										"type": "tip",
										"text": "无军队可攻击"
									},
									{
										"type": "break",
										"n": 1
									}
								]
							},
							{
								"type": "tip",
								"text": "选择你想要进攻的目标城市"
							},
							{
								"type": "function",
								"function": "function(){\ncore.selectCity(flags.city)\n}"
							},
							{
								"type": "if",
								"condition": "(flag:ret>0)",
								"true": [
									{
										"type": "insert",
										"name": "选择军队"
									},
									{
										"type": "function",
										"function": "function(){\nfor (var i = flags.l; i <= flags.r; i++) flags.dw[flags.cs[flags.arg1].v[i]].mb = flags.ret, flags.dw[flags.cs[flags.arg1].v[i]].mbsj = 10;\nflags.cs[flags.arg1].v.splice(flags.l, flags.r - flags.l + 1);\n}"
									}
								]
							}
						]
					},
					{
						"text": "移动你的军队到其他城市(不可撤销)",
						"action": [
							{
								"type": "function",
								"function": "function(){\nflags.city = []\nfor (var i = 1; i < flags.cs.length; i++)\n\tif (flags.cs[i].gj == flags.xzgj && i != flags.arg1) flags.city.push(i);\n}"
							},
							{
								"type": "if",
								"condition": "(flags.city.length==0)",
								"true": [
									{
										"type": "tip",
										"text": "无合法的移动目的地"
									},
									{
										"type": "break",
										"n": 1
									}
								]
							},
							{
								"type": "if",
								"condition": "(flags.cs[flags.arg1].v.length==0)",
								"true": [
									{
										"type": "tip",
										"text": "无军队可移动"
									},
									{
										"type": "break",
										"n": 1
									}
								]
							},
							{
								"type": "tip",
								"text": "选择你想要移动的目标城市"
							},
							{
								"type": "function",
								"function": "function(){\ncore.selectCity(flags.city)\n}"
							},
							{
								"type": "if",
								"condition": "(flag:ret>0)",
								"true": [
									{
										"type": "insert",
										"name": "选择军队"
									},
									{
										"type": "function",
										"function": "function(){\nfor (var i = flags.l; i <= flags.r; i++) flags.dw[flags.cs[flags.arg1].v[i]].mb = flags.ret, flags.dw[flags.cs[flags.arg1].v[i]].mbsj = 10;\nflags.cs[flags.arg1].v.splice(flags.l, flags.r - flags.l + 1);\n}"
									}
								]
							}
						]
					},
					{
						"text": "移动你在其他城市的军队到此城市",
						"action": [
							{
								"type": "function",
								"function": "function(){\nfor (var i = 1; i < flags.cs.length; i++)\n\tif (flags.cs[i].gj == flags.xzgj && i != flags.arg1) {\n\t\tfor (var j = 0; j < flags.cs[i].v.length; j++) flags.dw[flags.cs[i].v[j]].mb = flags.arg1, flags.dw[flags.cs[i].v[j]].mbsj = 10;\n\t\tflags.cs[i].v = [];\n\t}\n}"
							}
						]
					},
					{
						"text": "什么都不做",
						"action": []
					},
					{
						"text": "令当前项目立即生产完毕！",
						"color": [
							255,
							0,
							0
						],
						"condition": "flags.debug",
						"action": [
							{
								"type": "function",
								"function": "function(){\nif (flags.cs[flags.arg1].sc.length > 0) {\n\tif (flags.cs[flags.arg1].sc[0].lx == 8) flags.cs[flags.arg1].ic += 1, flags.cs[flags.arg1].rk -= 100;\n\telse if (flags.cs[flags.arg1].sc[0].lx == 9) flags.cs[flags.arg1].kj += 1, flags.cs[flags.arg1].rk -= 50;\n\telse {\n\t\tvar zl = flags.cs[flags.arg1].sc[0].lx,\n\t\t\txh = flags.cs[flags.arg1].sc[0].xh;\n\t\tflags.dw.push({ zl: zl, xh: xh, hp: flags.mil[zl][xh].hp, mb: 0, mbsj: 0, gj: flags.cs[flags.arg1].gj });\n\t\tif (zl >= 4) flags.gj[flags.cs[flags.arg1].gj].dd.push(flags.dw.length - 1);\n\t\telse flags.cs[flags.arg1].v.push(flags.dw.length - 1);\n\t}\n\tflags.cs[flags.arg1].sc.splice(0, 1);\n}\n}"
							}
						]
					}
				]
			}
		],
		"回收钥匙商店": [
			{
				"type": "function",
				"function": "function(){\nflags.city = []\nfor (var i = 1; i < flags.cs.length; i++)\n\tif (flags.zz[flags.xzgj][flags.cs[i].gj]) flags.city.push(i);\n}"
			},
			{
				"type": "if",
				"condition": "(flags.city.length==0)",
				"true": [
					{
						"type": "tip",
						"text": "无合法的导弹目的地"
					},
					{
						"type": "break",
						"n": 2
					}
				]
			},
			{
				"type": "if",
				"condition": "(flags.gj[flags.xzgj].dd.length==0)",
				"true": [
					{
						"type": "tip",
						"text": "无导弹可发射"
					},
					{
						"type": "break",
						"n": 2
					}
				]
			},
			{
				"type": "tip",
				"text": "选择你想要发射导弹的目标城市（4回合）"
			},
			{
				"type": "function",
				"function": "function(){\ncore.selectCity(flags.city)\n}"
			},
			{
				"type": "if",
				"condition": "(flag:ret>0)",
				"true": [
					{
						"type": "setValue",
						"name": "flag:arg1",
						"value": "0"
					},
					{
						"type": "insert",
						"name": "选择军队"
					},
					{
						"type": "function",
						"function": "function(){\nfor (var i = flags.l; i <= flags.r; i++) flags.dw[flags.gj[flags.xzgj].dd[i]].mb = flags.ret, flags.dw[flags.gj[flags.xzgj].dd[i]].mbsj = 20;\nflags.gj[flags.xzgj].dd.splice(flags.l, flags.r - flags.l + 1);\n}"
					}
				]
			}
		],
		"整数输入": [
			{
				"type": "while",
				"condition": "true",
				"data": [
					{
						"type": "previewUI",
						"action": [
							{
								"type": "drawBackground",
								"background": "winskin.png",
								"x": 16,
								"y": 16,
								"width": 384,
								"height": 384
							},
							{
								"type": "drawIcon",
								"id": "X10181",
								"x": 32,
								"y": 288
							},
							{
								"type": "drawIcon",
								"id": "X10185",
								"x": 64,
								"y": 288
							},
							{
								"type": "drawIcon",
								"id": "X10186",
								"x": 96,
								"y": 288
							},
							{
								"type": "drawIcon",
								"id": "X10187",
								"x": 128,
								"y": 288
							},
							{
								"type": "drawIcon",
								"id": "X10188",
								"x": 160,
								"y": 288
							},
							{
								"type": "drawIcon",
								"id": "X10189",
								"x": 192,
								"y": 288
							},
							{
								"type": "drawIcon",
								"id": "X10193",
								"x": 224,
								"y": 288
							},
							{
								"type": "drawIcon",
								"id": "X10194",
								"x": 256,
								"y": 288
							},
							{
								"type": "drawIcon",
								"id": "X10195",
								"x": 288,
								"y": 288
							},
							{
								"type": "drawIcon",
								"id": "X10196",
								"x": 320,
								"y": 288
							},
							{
								"type": "drawIcon",
								"id": "X10197",
								"x": 352,
								"y": 288
							},
							{
								"type": "drawIcon",
								"id": "X10286",
								"x": 32,
								"y": 352
							},
							{
								"type": "drawIcon",
								"id": "X10169",
								"x": 96,
								"y": 352
							},
							{
								"type": "drawIcon",
								"id": "X10232",
								"x": 128,
								"y": 352
							},
							{
								"type": "drawIcon",
								"id": "X10185",
								"x": 320,
								"y": 352
							},
							{
								"type": "drawIcon",
								"id": "X10242",
								"x": 352,
								"y": 352
							},
							{
								"type": "fillBoldText",
								"x": 48,
								"y": 256,
								"style": [
									255,
									255,
									255,
									1
								],
								"font": "bold 32px Consolas",
								"text": "${flag:input}"
							},
							{
								"type": "fillBoldText",
								"x": 32,
								"y": 48,
								"style": [
									255,
									255,
									255,
									1
								],
								"font": "16px Consolas",
								"text": "${temp:text}"
							}
						]
					},
					{
						"type": "wait",
						"forceChild": true,
						"data": [
							{
								"case": "keyboard",
								"keycode": "48,49,50,51,52,53,54,55,56,57",
								"action": [
									{
										"type": "playSound",
										"name": "光标移动"
									},
									{
										"type": "if",
										"condition": "(flag:input<0)",
										"true": [
											{
												"type": "setValue",
												"name": "flag:input",
												"value": "10*flag:input-(flag:keycode-48)",
												"norefresh": true
											}
										],
										"false": [
											{
												"type": "setValue",
												"name": "flag:input",
												"value": "10*flag:input+(flag:keycode-48)",
												"norefresh": true
											}
										]
									},
									{
										"type": "setValue",
										"name": "flag:input",
										"value": "core.clamp(flag:input,Number.MIN_SAFE_INTEGER,\nNumber.MAX_SAFE_INTEGER)",
										"norefresh": true
									}
								]
							},
							{
								"case": "keyboard",
								"keycode": "189",
								"action": [
									{
										"type": "playSound",
										"name": "跳跃"
									},
									{
										"type": "setValue",
										"name": "flag:input",
										"value": "-flag:input",
										"norefresh": true
									}
								]
							},
							{
								"case": "keyboard",
								"keycode": "8",
								"action": [
									{
										"type": "playSound",
										"name": "取消"
									},
									{
										"type": "setValue",
										"name": "flag:input",
										"operator": "//=",
										"value": "10",
										"norefresh": true
									}
								]
							},
							{
								"case": "keyboard",
								"keycode": "27",
								"action": [
									{
										"type": "playSound",
										"name": "读档"
									},
									{
										"type": "setValue",
										"name": "flag:input",
										"value": "0",
										"norefresh": true
									}
								]
							},
							{
								"case": "keyboard",
								"keycode": "13",
								"action": [
									{
										"type": "break",
										"n": 1
									}
								]
							},
							{
								"case": "mouse",
								"px": [
									32,
									63
								],
								"py": [
									288,
									320
								],
								"action": [
									{
										"type": "playSound",
										"name": "跳跃"
									},
									{
										"type": "setValue",
										"name": "flag:input",
										"value": "-flag:input",
										"norefresh": true
									}
								]
							},
							{
								"case": "mouse",
								"px": [
									64,
									384
								],
								"py": [
									288,
									320
								],
								"action": [
									{
										"type": "playSound",
										"name": "光标移动"
									},
									{
										"type": "if",
										"condition": "(flag:input<0)",
										"true": [
											{
												"type": "setValue",
												"name": "flag:input",
												"value": "10*flag:input-(flag:x-2)",
												"norefresh": true
											}
										],
										"false": [
											{
												"type": "setValue",
												"name": "flag:input",
												"value": "10*flag:input+(flag:x-2)",
												"norefresh": true
											}
										]
									},
									{
										"type": "setValue",
										"name": "flag:input",
										"value": "core.clamp(flag:input,Number.MIN_SAFE_INTEGER,\nNumber.MAX_SAFE_INTEGER)",
										"norefresh": true
									}
								]
							},
							{
								"case": "mouse",
								"px": [
									32,
									64
								],
								"py": [
									352,
									384
								],
								"action": [
									{
										"type": "playSound",
										"name": "取消"
									},
									{
										"type": "setValue",
										"name": "flag:input",
										"operator": "//=",
										"value": "10",
										"norefresh": true
									}
								]
							},
							{
								"case": "mouse",
								"px": [
									96,
									160
								],
								"py": [
									352,
									384
								],
								"action": [
									{
										"type": "playSound",
										"name": "读档"
									},
									{
										"type": "setValue",
										"name": "flag:input",
										"value": "0",
										"norefresh": true
									}
								]
							},
							{
								"case": "mouse",
								"px": [
									320,
									384
								],
								"py": [
									352,
									384
								],
								"action": [
									{
										"type": "break",
										"n": 1
									}
								]
							}
						]
					}
				]
			},
			{
				"type": "clearMap",
				"x": 8,
				"y": 8,
				"width": 400,
				"height": 400
			},
			{
				"type": "function",
				"function": "function(){\ncore.status.route.splice(flags['@temp@length']);core.status.route.push('input:'+core.getFlag('input',0))\n}"
			}
		],
		"自绘状态栏": [
			{
				"type": "comment",
				"text": "自绘状态栏的横屏模式，画在地图上，z值设为66以覆盖显伤，被动画、色调、天气等覆盖。\n本事件将被插件core.compile()函数编译后执行，因此允许使用的指令种类有限制。\n请查阅该插件以了解详情。"
			},
			{
				"type": "clearMap",
				"x": "flag:__canvas_left__",
				"y": 0,
				"width": "Math.floor(core.__WIDTH__/5)*core.__UNIT__",
				"height": "core.__PX_HEIGHT__"
			},
			{
				"type": "previewUI",
				"action": [
					{
						"type": "setValue",
						"name": "flag:__canvas_left__",
						"value": "core.__PX_WIDTH__-Math.floor(core.__WIDTH__/5)*core.__UNIT__"
					},
					{
						"type": "if",
						"condition": "(core.bigmap.width>core.__WIDTH__)",
						"true": [
							{
								"type": "comment",
								"text": "横向大地图的状态栏将添加半透明背景，同时判定勇士是否在画面靠右1/3部分。\n如果是，则状态栏画在左侧，否则画在右侧"
							},
							{
								"type": "if",
								"condition": "((status:x-core.bigmap.offsetX/core.__UNIT__)>core.__WIDTH__*2/3)",
								"true": [
									{
										"type": "setValue",
										"name": "flag:__canvas_left__",
										"value": "0"
									}
								]
							},
							{
								"type": "setAttribute",
								"alpha": 0.75
							},
							{
								"type": "drawBackground",
								"background": "winskin.png",
								"x": "flag:__canvas_left__",
								"y": 0,
								"width": "Math.floor(core.__WIDTH__/5)*core.__UNIT__",
								"height": "core.__PX_HEIGHT__"
							},
							{
								"type": "setAttribute",
								"alpha": 1
							}
						]
					},
					{
						"type": "drawIcon",
						"id": "upFloor",
						"x": "flag:__canvas_left__+6",
						"y": 6,
						"width": "core.__UNIT__*7/8",
						"height": "core.__UNIT__*7/8"
					},
					{
						"type": "drawIcon",
						"id": "hp",
						"x": "flag:__canvas_left__+6",
						"y": "6+core.__UNIT__",
						"width": "core.__UNIT__*7/8",
						"height": "core.__UNIT__*7/8"
					},
					{
						"type": "drawIcon",
						"id": "sword0",
						"x": "flag:__canvas_left__+6",
						"y": "6+core.__UNIT__*2",
						"width": "core.__UNIT__*7/8",
						"height": "core.__UNIT__*7/8"
					},
					{
						"type": "drawIcon",
						"id": "shield0",
						"x": "flag:__canvas_left__+6",
						"y": "6+core.__UNIT__*3",
						"width": "core.__UNIT__*7/8",
						"height": "core.__UNIT__*7/8"
					},
					{
						"type": "drawIcon",
						"id": "coin",
						"x": "flag:__canvas_left__+6",
						"y": "6+core.__UNIT__*4",
						"width": "core.__UNIT__*7/8",
						"height": "core.__UNIT__*7/8"
					},
					{
						"type": "drawIcon",
						"id": "sword0",
						"x": "flag:__canvas_left__+6",
						"y": "6+core.__UNIT__*5",
						"width": "core.__UNIT__*7/8",
						"height": "core.__UNIT__*7/8"
					},
					{
						"type": "drawIcon",
						"id": "shield0",
						"x": "flag:__canvas_left__+6",
						"y": "6+core.__UNIT__*6",
						"width": "core.__UNIT__*7/8",
						"height": "core.__UNIT__*7/8"
					},
					{
						"type": "fillBoldText",
						"x": "flag:__canvas_left__+6+core.__UNIT__",
						"y": "core.__UNIT__",
						"style": [
							255,
							255,
							255,
							1
						],
						"font": "bold 20px Verdana",
						"text": "${(core.status.thisMap||{}).name||''}"
					},
					{
						"type": "setAttribute",
						"font": "italic bold 20px Verdana",
						"baseline": "ideographic",
						"z": 66
					},
					{
						"type": "fillBoldText",
						"x": "flag:__canvas_left__+6+core.__UNIT__",
						"y": "core.__UNIT__+core.__UNIT__",
						"text": "${core.formatBigNumber(core.getRealStatus('hp'))}"
					},
					{
						"type": "fillBoldText",
						"x": "flag:__canvas_left__+6+core.__UNIT__",
						"y": "core.__UNIT__*3",
						"text": "${core.formatBigNumber(core.getRealStatus('atk'))}"
					},
					{
						"type": "fillBoldText",
						"x": "flag:__canvas_left__+6+core.__UNIT__",
						"y": "core.__UNIT__*4",
						"text": "${core.formatBigNumber(core.getRealStatus('def'))}"
					},
					{
						"type": "fillBoldText",
						"x": "flag:__canvas_left__+6+core.__UNIT__",
						"y": "core.__UNIT__*5",
						"text": "${core.formatBigNumber(core.getRealStatus('money'))}"
					},
					{
						"type": "fillBoldText",
						"x": "flag:__canvas_left__+6+core.__UNIT__",
						"y": "core.__UNIT__*6",
						"text": "${core.formatBigNumber(core.getRealStatus('mdef'))}"
					},
					{
						"type": "fillBoldText",
						"x": "flag:__canvas_left__+6+core.__UNIT__",
						"y": "core.__UNIT__*7",
						"text": "${core.formatBigNumber(core.getRealStatus('exp'))}"
					},
					{
						"type": "fillBoldText",
						"x": "flag:__canvas_left__+6",
						"y": "core.__UNIT__*8",
						"style": [
							255,
							204,
							170,
							1
						],
						"text": "攻击表示你城"
					},
					{
						"type": "fillBoldText",
						"x": "flag:__canvas_left__+6",
						"y": "core.__UNIT__*9",
						"style": [
							255,
							204,
							170,
							1
						],
						"text": "市的工业总和"
					},
					{
						"type": "fillBoldText",
						"x": "flag:__canvas_left__+6",
						"y": "core.__UNIT__*10",
						"style": [
							170,
							170,
							221,
							1
						],
						"text": "防御表示你城"
					},
					{
						"type": "fillBoldText",
						"x": "flag:__canvas_left__+6",
						"y": "core.__UNIT__*11",
						"style": [
							170,
							170,
							221,
							1
						],
						"text": "市的科研总和"
					},
					{
						"type": "fillBoldText",
						"x": "flag:__canvas_left__+6",
						"y": "core.__UNIT__*12",
						"style": [
							255,
							136,
							136
						],
						"text": "金钱表示回合数"
					},
					{
						"type": "fillBoldText",
						"x": "flag:__canvas_left__+6",
						"y": "core.__UNIT__*13",
						"style": [
							255,
							204,
							170,
							1
						],
						"text": "护盾表示所有城"
					},
					{
						"type": "fillBoldText",
						"x": "flag:__canvas_left__+6",
						"y": "core.__UNIT__*14",
						"style": [
							255,
							204,
							170,
							1
						],
						"text": "市的工业总和"
					},
					{
						"type": "fillBoldText",
						"x": "flag:__canvas_left__+6",
						"y": "core.__UNIT__*15",
						"style": [
							170,
							170,
							221,
							1
						],
						"text": "经验表示所有城"
					},
					{
						"type": "fillBoldText",
						"x": "flag:__canvas_left__+6",
						"y": "core.__UNIT__*16",
						"style": [
							170,
							170,
							221,
							1
						],
						"text": "市的科研总和"
					}
				]
			}
		],
		"宣战": [
			{
				"type": "tip",
				"text": "选择一个城市，和其所属的国家宣战（宣战后无法和解）选择空白处取消"
			},
			{
				"type": "function",
				"function": "function(){\nvar city = [];\nfor (var i = 1; i < flags.cs.length; i++)\n\tif (flags.cs[i].gj != flags.xzgj && !flags.zz[flags.cs[i].gj][flags.xzgj]) city.push(i);\ncore.selectCity(city);\n}"
			},
			{
				"type": "function",
				"function": "function(){\nvar war = flags.ret;\nif (war) core.insertAction({ type: 'confirm', text: \"确实要和【${flags.gj[flags.cs[flags.ret].gj].nm}】宣战吗？\", yes: [{ type: 'function', function: 'function(){flags.zz[flags.xzgj][flags.cs[flags.ret].gj]=1;flags.zz[flags.cs[flags.ret].gj][flags.xzgj]=1;}' }, \"    ${flags.gj[flags.xzgj].nm}    和    ${flags.gj[flags.cs[flags.ret].gj].nm}    宣战！\"], no: [] })\n}"
			}
		],
		"选择军队": [
			{
				"type": "changeFloor",
				"floorId": "__",
				"time": 0
			},
			{
				"type": "function",
				"function": "function(){\nvar t;\nif (!flags.arg1) t = flags.gj[flags.xzgj].dd;\nelse t = flags.cs[flags.arg1].v;\ncore.createCanvas('test1', 0, 0, 1000, 800, 85);\ncore.fillRect('test1', 0, 0, 1000, 800, [0, 0, 0, 1]);\ncore.createCanvas('test2', 0, 0, 1000, 800, 90);\nconsole.log(t)\nvar x = 0,\n\ty = 32,\n\tz = 0;\nfor (var i = 0; i < t.length; i++) {\n\tvar tt = flags.dw[t[i]];\n\tvar hp = tt.hp,\n\t\tratio = hp / flags.mil[tt.zl][tt.xh].hp,\n\t\tnm = flags.mil[tt.zl][tt.xh].nm;\n\tif (tt.zl > 3) hp = flags.mil[tt.zl][tt.xh].zdl;\n\tif (i == 45 && t.length > 95) {\n\t\tcore.fillText('test2', \"(军队过多，只展示前后45个)\", x, y - 5, [255, 255, 255, 1], \"20px Arial\");\n\t\ty += 32;\n\t}\n\tif (i >= 45 && i + 45 < t.length && t.length > 95) continue;\n\tcore.fillText('test2', (i + 1) + '.' + nm + ' ' + hp, x, y - 5, [255, 255, 255, 1], \"20px Arial\", 160);\n\tcore.fillRect('test1', x, y - 32, 160 * ratio, 32, [510 * (1 - ratio), 510 * ratio, 0, 1]);\n\tx += 160;\n\tif (x >= 800) x = 0, y += 32;\n}\nflags.len = t.length;\n}"
			},
			{
				"type": "input2",
				"text": "输入选择的军队区间范围（两个整数用单个空格隔开，左闭右闭，输入一个0选全部，输入单个整数则取编号为该整数的军队，输入空白则取消）"
			},
			{
				"type": "function",
				"function": "function(){\nif (flags.input == \"\") flags.l = 1, flags.r = 0;\nelse if (flags.input == \"0\") flags.l = 0, flags.r = flags.len - 1;\nelse {\n\tvar t = flags.input.split(' ');\n\tif (t.length == 1) {\n\t\tflags.l = parseInt(t[0]) - 1, flags.r = flags.l;\n\t} else {\n\t\tflags.l = parseInt(t[0]) - 1, flags.r = parseInt(t[1]) - 1;\n\t}\n}\nif (flags.l < 0 || flags.l >= flags.len || flags.r < 0 || flags.r >= flags.len) core.drawTip('区间不合法'), flags.l = 1, flags.r = 0;\n}"
			},
			{
				"type": "function",
				"function": "function(){\ncore.deleteCanvas('test1'); core.deleteCanvas('test2');\n}"
			},
			{
				"type": "changeFloor",
				"floorId": "_",
				"time": 0
			}
		],
		"下一回合": [
			{
				"type": "setValue",
				"name": "status:money",
				"operator": "+=",
				"value": "1"
			},
			{
				"type": "function",
				"function": "function(){\nif (core.status.hero.money >= 30) {\n\tvar _ = [],\n\t\t__ = [0];\n\tfor (var i = 0; i < flags.gj.length; i++) _.push([]);\n\tfor (var i = 0; i < flags.gj.length; i++)\n\t\tfor (var j = 0; j < flags.gj.length; j++) _[i].push(0);\n\tfor (var i = 1; i < flags.cs.length; i++) {\n\t\tfor (var j = 1; j < flags.cs.length; j++)\n\t\t\tif (flags.lt[i][j] && flags.cs[i].gj != flags.cs[j].gj) _[flags.cs[i].gj][flags.cs[j].gj] = 1;\n\t}\n\tfor (var i = 1; i < flags.gj.length; i++) {\n\t\tvar t = [];\n\t\tfor (var j = 1; j < flags.gj.length; j++)\n\t\t\tif (_[i][j] && !flags.zz[i][j]) t.push(j);\n\t\tfor (var j = 1; j < flags.gj.length; j++)\n\t\t\tif (_[i][j] && flags.zz[i][j]) t = [];\n\t\tif (i == flags.xzgj) t = [];\n\t\tif (t.length) __.push(t[core.rand(t.length)]);\n\t\telse __.push(0);\n\t}\n\tvar s = \"\",\n\t\tcnt = 0;\n\t_ = [];\n\tfor (var i = 1; i < flags.gj.length; ++i)\n\t\tif (__[i]) {\n\t\t\ts += flags.gj[i].nm + \"和\" + flags.gj[__[i]].nm + \"宣战\" + String.fromCharCode(10);\n\t\t\tcnt += 1;\n\t\t\tif (cnt >= 20) _.push(s), cnt = 0, s = \"\";\n\t\t\tflags.zz[i][__[i]] = flags.zz[__[i]][i] = 1;\n\t\t}\n\tif (s) _.push(s);\n\tcore.insertAction(_);\n}\n}"
			},
			{
				"type": "comment",
				"text": "处理死亡国家"
			},
			{
				"type": "function",
				"function": "function(){\nflags.city = [0];\nfor (var i = 1; i < flags.gj.length; i++) flags.city.push(0);\nfor (var i = 1; i < flags.cs.length; i++) flags.city[flags.cs[i].gj] += 1;\nfor (var i = 1; i < flags.cs.length; i++)\n\tif (flags.cs[i].hp > 0 && flags.cs[i].hp < flags.cs[i].HP) flags.cs[i].hp += Math.max(10, Math.floor((flags.cs[i].HP - flags.cs[i].hp) / 100));\nfor (var i = 1; i < flags.gj.length; i++)\n\tif (flags.city[i] == 0 && !flags.gj[i].sile) {\n\t\tflags.gj[i].sile = 1;\n\t\tcore.insertAction(\"         \" + flags.gj[i].nm + \"  战败!\");\n\t}\nfor (var i = 1; i < flags.dw.length; i++)\n\tif (flags.gj[flags.dw[i].gj].sile) flags.dw[i].hp = -1;\n}"
			},
			{
				"type": "if",
				"condition": "(flags.city[flags.xzgj]>=flags.cs.length-1)",
				"true": [
					{
						"type": "function",
						"function": "function(){\ncore.status.hero.hp = 1000 - core.status.hero.money;\ncore.win(\"恭喜 \" + flags.gj[flags.xzgj].nm + \" 胜利！\", true);\n}"
					}
				]
			},
			{
				"type": "if",
				"condition": "flags.gj[flags.xzgj].sile",
				"true": [
					{
						"type": "function",
						"function": "function(){\ncore.status.hero.hp = 0;\nfor (var i = 1; i < flags.gj.length; i++)\n\tif (!flags.gj[i].sile) core.status.hero.hp -= 1;\ncore.win(\"你死了！\", true);\n}"
					}
				]
			},
			{
				"type": "comment",
				"text": "处理转移"
			},
			{
				"type": "function",
				"function": "function(){\nfor (var i = 1; i < flags.cs.length; i++) flags.cs[i].lin = [];\nfor (var i = 1; i < flags.dw.length; i++)\n\tif (flags.dw[i].hp > 0 && flags.dw[i].mbsj <= 0 && flags.dw[i].mb > 0 && flags.cs[flags.dw[i].mb].gj != flags.dw[i].gj) {\n\t\tflags.cs[flags.dw[i].mb].lin.push(i);\n\t}\nfor (var i = 1; i < flags.cs.length; i++) flags.cs[i].lin.sort(function (a, b) { return flags.dw[a].mbsj - flags.dw[b].mbsj; });\nvar _ = \"\";\nfor (var i = 1; i < flags.cs.length; i++)\n\tif (flags.cs[i].lin.length > 0 && flags.cs[i].v.length == 0 && flags.cs[i].hp <= 0 && flags.dw[flags.cs[i].lin[0]].mbsj <= 0) {\n\t\tflags.cs[i].hp = 1;\n\t\tflags.cs[i].gj = flags.dw[flags.cs[i].lin[0]].gj;\n\t\t_ += (\"     \" + flags.gj[flags.cs[i].gj].nm + \"  占领了  \" + flags.cs[i].nm + \"  ！\") + String.fromCharCode(10);\n\t\tflags.cs[i].sc = [];\n\t}\nif (_) core.insertAction(_);\nfor (var i = 1; i < flags.dw.length; i++)\n\tif (flags.dw[i].hp > 0) {\n\t\tif (flags.dw[i].mbsj > 0) flags.dw[i].mbsj -= flags.mil[flags.dw[i].zl][flags.dw[i].xh].sd;\n\t\telse if (flags.dw[i].mb) flags.dw[i].mbsj -= 10;\n\t\tif (flags.dw[i].mbsj < 0) {\n\t\t\tif (flags.zz[flags.dw[i].gj][flags.cs[flags.dw[i].mb].gj]) continue;\n\t\t\tif (flags.dw[i].zl >= 4) flags.dw[i].mb = flags.dw[i].mbsj = 0, flags.gj[flags.dw[i].gj].dd.push(i);\n\t\t\telse if (flags.cs[flags.dw[i].mb].gj == flags.dw[i].gj) flags.cs[flags.dw[i].mb].v.push(i), flags.dw[i].mb = flags.dw[i].mbsj = 0;\n\t\t\telse {\n\t\t\t\tfor (var k = 1; k < flags.cs.length; k++)\n\t\t\t\t\tif (flags.cs[k].gj == flags.dw[i].gj) flags.dw[i].mb = k, flags.dw[i].mbsj = 10;\n\t\t\t}\n\t\t}\n\t}\n}"
			},
			{
				"type": "comment",
				"text": "处理科研"
			},
			{
				"type": "function",
				"function": "function(){\nfor (var i = 1; i < flags.gj.length; i++) {\n\tvar kynl = 0,\n\t\tyffx = flags.gj[i].yffx;\n\tvar f1 = flags.gj[i].yffy[1][5] < 0,\n\t\tf2 = flags.gj[i].yffy[2][5] < 0,\n\t\tf3 = flags.gj[i].yffy[3][5] < 0,\n\t\tf4 = flags.gj[i].yffy[4][3] < 0,\n\t\tf5 = flags.gj[i].yffy[5][1] < 0;\n\tif (yffx == 0) yffx = 3;\n\tif (yffx == 5 && f5) yffx = 1;\n\tif (yffx == 1 && f1) yffx = 2;\n\tif (yffx == 2 && f2) yffx = 3;\n\tif (yffx == 3 && f3) yffx = 4;\n\tif (yffx == 4 && f4) yffx = 1;\n\tif (yffx == 1 && f1) yffx = 2;\n\tif (yffx == 2 && f2) yffx = 3;\n\tif (yffx == 3 && f3) yffx = 4;\n\tif (yffx == 4 && f4) yffx = 5;\n\tif (yffx == 5 && f5) yffx = 0;\n\tflags.gj[i].yffx = yffx;\n\tif (yffx) {\n\t\tvar now = 1;\n\t\twhile (flags.gj[i].yffy[yffx][now] <= 0) now = now + 1;\n\t}\n\tfor (var j = 1; j < flags.cs.length; j++)\n\t\tif (flags.cs[j].gj == i) kynl += flags.cs[j].kj;\n\tflags.gj[i].yffy[yffx][now] -= kynl;\n\tif (flags.gj[i].yffy[yffx][now] <= 0 && i == flags.xzgj) core.insertAction('  ' + flags.mil[yffx][now].nm + ' 研发完成 ！');\n}\n}"
			},
			{
				"type": "comment",
				"text": "处理生产/人口增长 "
			},
			{
				"type": "function",
				"function": "function(){\nvar str = \"\";\nfor (var i = 1; i < flags.cs.length; i++) {\n\tflags.cs[i].rk += flags.cs[i].rkzz;\n\tif (flags.cs[i].sc.length > 0) {\n\t\tflags.cs[i].sc[0].ys -= flags.cs[i].ic;\n\t\tif (flags.cs[i].sc[0].ys <= 0 && flags.cs[i].rk >= [10, 10, 10, 10, 10, 10, 10, 10, 100, 50][flags.cs[i].sc[0].lx]) {\n\t\t\tif (flags.cs[i].sc[0].lx == 8) {\n\t\t\t\tflags.cs[i].ic += 1;\n\t\t\t\tflags.cs[i].rk -= 100;\n\t\t\t\tif (flags.cs[i].gj == flags.xzgj) str += \"   工厂   于    \" + flags.cs[i].nm + \" 制造厂  生产完成 ！\" + String.fromCharCode(10);\n\t\t\t} else if (flags.cs[i].sc[0].lx == 9) {\n\t\t\t\tflags.cs[i].kj += 1;\n\t\t\t\tflags.cs[i].rk -= 50;\n\t\t\t\tif (flags.cs[i].gj == flags.xzgj) str += \"  科研所  于    \" + flags.cs[i].nm + \" 制造厂  生产完成 ！\" + String.fromCharCode(10);\n\t\t\t} else if (flags.cs[i].sc[0].lx >= 4) {\n\t\t\t\tflags.cs[i].rk -= 10;\n\t\t\t\tflags.dw.push({\n\t\t\t\t\tzl: flags.cs[i].sc[0].lx,\n\t\t\t\t\txh: flags.cs[i].sc[0].xh,\n\t\t\t\t\tmb: 0,\n\t\t\t\t\tmbsj: 0,\n\t\t\t\t\thp: flags.mil[flags.cs[i].sc[0].lx][flags.cs[i].sc[0].xh].hp,\n\t\t\t\t\tgj: flags.cs[i].gj\n\t\t\t\t});\n\t\t\t\tflags.gj[flags.cs[i].gj].dd.push(flags.dw.length - 1);\n\t\t\t\tif (flags.cs[i].gj == flags.xzgj) str += \"   \" + flags.mil[flags.cs[i].sc[0].lx][flags.cs[i].sc[0].xh].nm + \"   于    \" + flags.cs[i].nm + \" 制造厂  生产完成 ！\" + String.fromCharCode(10);\n\t\t\t} else {\n\t\t\t\tflags.cs[i].rk -= 10;\n\t\t\t\tflags.dw.push({\n\t\t\t\t\tzl: flags.cs[i].sc[0].lx,\n\t\t\t\t\txh: flags.cs[i].sc[0].xh,\n\t\t\t\t\tmb: 0,\n\t\t\t\t\tmbsj: 0,\n\t\t\t\t\thp: flags.mil[flags.cs[i].sc[0].lx][flags.cs[i].sc[0].xh].hp,\n\t\t\t\t\tgj: flags.cs[i].gj\n\t\t\t\t});\n\t\t\t\tflags.cs[i].v.push(flags.dw.length - 1);\n\t\t\t\tif (flags.cs[i].gj == flags.xzgj) str += \"   \" + flags.mil[flags.cs[i].sc[0].lx][flags.cs[i].sc[0].xh].nm + \"   于    \" + flags.cs[i].nm + \" 制造厂  生产完成 ！\" + String.fromCharCode(10);\n\t\t\t}\n\t\t\tvar ys = flags.cs[i].sc[0].ys;\n\t\t\tflags.cs[i].sc.splice(0, 1);\n\t\t\tif (flags.cs[i].sc.length > 0) flags.cs[i].sc[0].ys += ys;\n\t\t}\n\t}\n}\nif (str) core.insertAction(str);\nfor (var i = 1; i < flags.cs.length; i++) flags.cs[i].lin = [];\nfor (var i = 1; i < flags.dw.length; i++)\n\tif (flags.dw[i].hp > 0 && flags.dw[i].mbsj <= 0 && flags.dw[i].mb > 0 && flags.cs[flags.dw[i].mb].gj != flags.dw[i].gj) {\n\t\tflags.cs[flags.dw[i].mb].lin.push(i);\n\t}\nfor (var i = 1; i < flags.cs.length; i++) flags.cs[i].lin.sort(function (a, b) { return flags.dw[a].mbsj - flags.dw[b].mbsj; });\n}"
			},
			{
				"type": "comment",
				"text": "战争！"
			},
			{
				"type": "for",
				"name": "temp:A",
				"from": "1",
				"to": "flags.cs.length-1",
				"step": "1",
				"data": [
					{
						"type": "setValue",
						"name": "flag:_",
						"value": "temp:A",
						"norefresh": true
					},
					{
						"type": "if",
						"condition": "(flags.cs[flags._].lin.length==0)",
						"true": [
							{
								"type": "function",
								"function": "function(){\nif (flags.cs[flags._].hp < 0) flags.cs[flags._].hp = 1;\nif (flags.cs[flags._].hp < 10) flags.cs[flags._].hp += 10;\nelse if (flags.cs[flags._].hp < flags.cs[flags._].HP) flags.cs[flags._].hp += Math.max(500, Math.floor((flags.cs[flags._].HP - flags.cs[flags._].hp) / 30));\n}"
							},
							{
								"type": "continue",
								"n": 1
							}
						]
					},
					{
						"type": "function",
						"function": "function(){\nflags.show = flags.cs[flags._].gj == flags.xzgj;\nfor (var i = 0; i < flags.cs[flags._].lin.length; i++)\n\tif (flags.dw[flags.cs[flags._].lin[i]].gj == flags.xzgj) flags.show = true;\n}"
					},
					{
						"type": "if",
						"condition": "flags.show",
						"true": [
							{
								"type": "changeFloor",
								"floorId": "__"
							},
							{
								"type": "function",
								"function": "function(){\nvar t = flags.cs[flags._].lin;\ncore.createCanvas('test1', 0, 0, 1000, 800, 85);\ncore.fillRect('test1', 0, 0, 1000, 800, [0, 0, 0, 1]);\ncore.createCanvas('test2', 0, 0, 1000, 800, 90);\nvar x = 0,\n\ty = 32,\n\tz = 0;\ncore.fillText('test2', \"    \" + flags.gj[flags.dw[t[0]].gj].nm + \"：\" + (t.length > 40 ? \"(只展示前40个)\" : \"\"), x, y - 5, [255, 255, 255, 1], \"20px Arial\");\ny += 32;\nfor (var i = 0; i < t.length && i < 40; i++) {\n\tvar tt = flags.dw[t[i]];\n\tvar hp = tt.hp,\n\t\tratio = hp / flags.mil[tt.zl][tt.xh].hp,\n\t\tnm = flags.mil[tt.zl][tt.xh].nm;\n\tif (tt.zl > 3) hp = '[' + flags.mil[tt.zl][tt.xh].zdl + ']';\n\tcore.fillText('test2', (i + 1) + '.' + nm + ' ' + hp, x, y - 5, [flags.dw[t[0]].gj == flags.dw[t[i]].gj ? 255 : 0, flags.dw[t[0]].gj == flags.dw[t[i]].gj ? 255 : 0, 255, 1], \"20px Arial\", 160);\n\tcore.fillRect('test1', x, y - 32, 160 * ratio, 32, [510 * (1 - ratio), 510 * ratio, 0, 1]);\n\tx += 160;\n\tif (x >= 800) x = 0, y += 32;\n}\ny = 32 * 11;\nt = flags.cs[flags._].v;\nx = 0;\ncore.fillText('test2', \"    \" + flags.gj[flags.cs[flags._].gj].nm + \"：\" + (t.length > 40 ? \"(只展示前40个)\" : \"\"), x, y - 5, [255, 255, 255, 1], \"20px Arial\");\ny += 32;\nfor (var i = 0; i < t.length && i < 40; i++) {\n\tvar tt = flags.dw[t[i]];\n\tvar hp = tt.hp,\n\t\tratio = hp / flags.mil[tt.zl][tt.xh].hp,\n\t\tnm = flags.mil[tt.zl][tt.xh].nm;\n\tif (tt.zl > 3) hp = '[' + flags.mil[tt.zl][tt.xh].zdl + ']';\n\tcore.fillText('test2', (i + 1) + '.' + nm + ' ' + hp, x, y - 5, [255, 255, 255, 1], \"20px Arial\", 160);\n\tcore.fillRect('test1', x, y - 32, 160 * ratio, 32, [510 * (1 - ratio), 510 * ratio, 0, 1]);\n\tx += 160;\n\tif (x >= 800) x = 0, y += 32;\n}\n}"
							}
						]
					},
					{
						"type": "function",
						"function": "function(){\nvar t = flags.cs[flags._].lin,\n\tu = flags.cs[flags._].v;\nvar __ = [];\nfor (var i = 0; i < t.length; i++) {\n\tvar zdl = flags.mil[flags.dw[t[i]].zl][flags.dw[t[i]].xh].zdl;\n\tif (flags.dw[t[i]].zl < 4) continue;\n\tif (flags.dw[t[i]].zl == 5) __.push(\"${flags.cs[flags._].nm} 受到了来自 \" + flags.gj[flags.dw[t[i]].gj].nm + \"  的核打击！ \");\n\tif (flags.cs[flags._].hp >= zdl / 10) flags.cs[flags._].hp -= zdl;\n\telse {\n\t\tconsole.log('ATTACK');\n\t\tflags.cs[flags._].hp = 0;\n\t\tvar count = flags.dw[t[i]].zl == 5 ? 50 : [0, 1, 3, 10][flags.dw[t[i]].xh];\n\t\tvar damage = flags.dw[t[i]].zl == 5 ? 400 : 300;\n\t\tfor (var j = 0, k = 0; j < u.length && k < count; j++) {\n\t\t\tif (flags.dw[u[j]].hp > 0) flags.dw[u[j]].hp -= damage, k += 1;\n\t\t}\n\t}\n\tflags.dw[t[i]].hp = 0;\n}\nfor (var i = 0; i < t.length; i++) {\n\tif (flags.dw[t[i]].zl > 3) continue;\n\tvar zdl = flags.mil[flags.dw[t[i]].zl][flags.dw[t[i]].xh].zdl;\n\tif (u.length == 0 || flags.cs[flags._].hp > 0 && core.rand(5) < 3) { flags.cs[flags._].hp -= zdl; continue; }\n\tvar v = [];\n\tfor (var j = 0; j < u.length; j++)\n\t\tif (flags.dw[u[j]].hp > 0) v.push(u[j]);\n\tif (v.length == 0) { flags.cs[flags._].hp -= zdl; continue; }\n\tvar w = v[core.rand(v.length)];\n\tzdl = Math.round(zdl * (0.9 + 0.2 * core.rand()));\n\tflags.dw[w].hp -= zdl;\n}\nfor (var i = 0; i < u.length; i++) {\n\tvar zdl = flags.mil[flags.dw[u[i]].zl][flags.dw[u[i]].xh].zdl;\n\tvar v = [];\n\tfor (var j = 0; j < t.length; j++)\n\t\tif (flags.dw[t[j]].hp > 0) v.push(t[j]);\n\tif (v.length == 0) continue;\n\tvar w = v[core.rand(v.length)];\n\tzdl = Math.round(zdl * (0.9 + 0.2 * core.rand()));\n\tflags.dw[w].hp -= zdl;\n}\nif (flags.show) {\n\t//lin\n\tvar v = [],\n\t\tw = 25;\n\tfor (var i = 0; i < t.length; i++) {\n\t\tvar s = \"\";\n\t\tif (flags.dw[t[i]].hp <= 0 && flags.dw[t[i]].zl < 4) {\n\t\t\tif (flags.cs[flags._].gj == flags.xzgj) s = \"  对方损失  \" + flags.mil[flags.dw[t[i]].zl][flags.dw[t[i]].xh].nm + \"  ！\" + String.fromCharCode(10);\n\t\t\telse if (flags.dw[t[i]].gj == flags.xzgj) s = \"  我方损失  \" + flags.mil[flags.dw[t[i]].zl][flags.dw[t[i]].xh].nm + \"  ！\" + String.fromCharCode(10);\n\t\t}\n\t\tif (s) {\n\t\t\tif (w >= 25) v.push(s), w = 1;\n\t\t\telse v[v.length - 1] += s, w += 1;\n\t\t}\n\n\t}\n\tfor (var i = 0; i < v.length; i++) __.push(v[i]);\n\tv = [], w = 25;\n\tfor (var i = 0; i < u.length; i++) {\n\t\tvar s = \"\";\n\t\tif (flags.dw[u[i]].hp <= 0 && flags.dw[u[i]].zl < 4) {\n\t\t\tif (flags.cs[flags._].gj == flags.xzgj) s = \"  我方损失  \" + flags.mil[flags.dw[u[i]].zl][flags.dw[u[i]].xh].nm + \"  ！\" + String.fromCharCode(10);\n\t\t\telse s = \"  对方损失  \" + flags.mil[flags.dw[u[i]].zl][flags.dw[u[i]].xh].nm + \"  ！\" + String.fromCharCode(10);\n\t\t}\n\t\tif (s) {\n\t\t\tif (w >= 25) v.push(s), w = 1;\n\t\t\telse v[v.length - 1] += s, w += 1;\n\t\t}\n\n\t}\n\tfor (var i = 0; i < v.length; i++) __.push(v[i]);\n\tconsole.log(__);\n\tcore.insertAction(__);\n\tcore.fillText('test2', \"      \" + (flags.cs[flags._].gj == flags.xzgj ? \"我\" : \"对\") + \"方城市【\" + flags.cs[flags._].nm + \" (\" + flags._ + \")\" + \"】防御值剩余： \" + flags.cs[flags._].hp, 0, 320 - 5, [255, 255, 255, 1], \"20px Arial\");\n}\nvar v = [],\n\tw = [];\nfor (var i = 0; i < t.length; i++)\n\tif (flags.dw[t[i]].hp > 0) v.push(t[i]);\nfor (var i = 0; i < u.length; i++)\n\tif (flags.dw[u[i]].hp > 0) w.push(u[i]);\nflags.cs[flags._].lin = v, flags.cs[flags._].v = w;\n}"
					},
					{
						"type": "if",
						"condition": "flags.show",
						"true": [
							{
								"type": "sleep",
								"time": 1000
							}
						]
					}
				]
			},
			{
				"type": "function",
				"function": "function(){\ncore.deleteAllCanvas();\n}"
			},
			{
				"type": "changeFloor",
				"floorId": "_"
			},
			{
				"type": "comment",
				"text": "AI"
			},
			{
				"type": "function",
				"function": "function(){\nfor (var i = 1; i < flags.gj.length; i++)\n\tif (i != flags.xzgj && !flags.gj[i].sile) {\n\t\tvar city = [],\n\t\t\tcnt = 0;\n\t\tfor (var j = 1; j < flags.cs.length; j++)\n\t\t\tif (flags.cs[j].gj == i) {\n\t\t\t\tvar kyzz = 0;\n\t\t\t\tcnt = cnt + 1;\n\t\t\t\tfor (var k = 1; k < flags.cs.length; k++)\n\t\t\t\t\tif (flags.lt[k][j] && flags.zz[flags.cs[j].gj][flags.cs[k].gj] && (kyzz == 0 || flags.cs[k].hp < flags.cs[kyzz].hp)) kyzz = k;\n\t\t\t\tif (kyzz > 0 || flags.cs[j].lin.length > 0) city.push(j);\n\t\t\t}\n\t\tif (city.length == 0) {\n\t\t\tfor (var j = 1; j < flags.cs.length; j++)\n\t\t\t\tif (flags.cs[j].gj == i) city.push(j);\n\t\t}\n\t\tflags.gj[i].yffx = core.rand(4) + 1;\n\t\tif (flags.gj[i].yffx <= 2 && flags.gj[i].yffy[5][1] > 0) flags.gj[i].yffx = 5;\n\t\tfor (var j = 1; j < flags.cs.length; j++)\n\t\t\tif (flags.cs[j].gj == i) {\n\t\t\t\tvar kyzz = 0;\n\t\t\t\tfor (var k = 1; k < flags.cs.length; k++)\n\t\t\t\t\tif (flags.lt[k][j] && flags.zz[flags.cs[j].gj][flags.cs[k].gj] && (kyzz == 0 || flags.cs[k].hp < flags.cs[kyzz].hp)) kyzz = k;\n\t\t\t\tif (kyzz && flags.gj[i].dd.length > 0 && core.rand(5) < 2 && (flags.cs[kyzz].hp > 4000 || flags.cs[kyzz].v.length > 5)) {\n\t\t\t\t\tflags.dw[flags.gj[i].dd[0]].mb = kyzz;\n\t\t\t\t\tflags.dw[flags.gj[i].dd[0]].mbsj = 20;\n\t\t\t\t\tflags.gj[i].dd.splice(0, 1);\n\t\t\t\t}\n\t\t\t\tif (!kyzz && !flags.cs[j].lin.length) {\n\t\t\t\t\tvar l = Math.floor((flags.cs[j].v.length - 1) / 2);\n\t\t\t\t\tif (l > 0 && cnt > 2) {\n\t\t\t\t\t\tfor (var k = 0; k < l; k++) {\n\t\t\t\t\t\t\tflags.dw[flags.cs[j].v[k]].mb = city[core.rand(city.length)];\n\t\t\t\t\t\t\tflags.dw[flags.cs[j].v[k]].mbsj = 10;\n\t\t\t\t\t\t}\n\t\t\t\t\t\tflags.cs[j].v.splice(0, l);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tif (kyzz && !flags.cs[j].lin.length) {\n\t\t\t\t\tvar l = Math.floor((flags.cs[j].v.length - 1) / 1.7);\n\t\t\t\t\tif (l > 0) {\n\t\t\t\t\t\tfor (var k = 0; k < l; k++) {\n\t\t\t\t\t\t\tflags.dw[flags.cs[j].v[k]].mb = kyzz;\n\t\t\t\t\t\t\tflags.dw[flags.cs[j].v[k]].mbsj = 10;\n\t\t\t\t\t\t}\n\t\t\t\t\t\tflags.cs[j].v.splice(0, l);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tif (flags.cs[j].sc.length > 0) continue;\n\t\t\t\tvar sj = core.rand(100);\n\t\t\t\tvar _ = Math.pow(2, flags.cs[j].rk / 100);\n\t\t\t\tif (sj <= _ && flags.cs[j].rk + (100 / flags.cs[j].ic + 2) * flags.cs[j].rkzz >= 100) flags.cs[j].sc.push({ lx: 8, xh: 1, ys: 100 });\n\t\t\t\telse if (sj <= _ + _ && flags.cs[j].rk + (100 / flags.cs[j].ic + 2) * flags.cs[j].rkzz >= 50) flags.cs[j].sc.push({ lx: 9, xh: 1, ys: 100 });\n\t\t\t\tif (flags.cs[j].sc.length > 0) continue;\n\t\t\t\tsj = core.rand(100);\n\t\t\t\tif (sj <= 4 && flags.cs[j].ic >= 8 && flags.gj[i].yffy[5][1] <= 0) flags.cs[j].sc.push({ lx: 5, xh: 1, ys: 1500 });\n\t\t\t\telse {\n\t\t\t\t\tvar lx = sj <= 57 ? 3 : sj <= 73 ? 2 : sj <= 94 ? 1 : 4;\n\t\t\t\t\tvar xh = 0;\n\t\t\t\t\twhile (flags.gj[i].yffy[lx][xh + 1] <= 0 && xh < 5) xh += 1;\n\t\t\t\t\tif (lx == 4 && xh > 3) xh = 3;\n\t\t\t\t\tif (xh > 0) flags.cs[j].sc.push({ lx: lx, xh: xh, ys: flags.mil[lx][xh].xh });\n\t\t\t\t}\n\t\t\t}\n\t}\n}"
			}
		],
		"tutorial": [
			"\t[操作方法&军队等级]快捷商店处打开国家的选项（科研，发射导弹，宣战等）\n点击你的城市，打开城市的选项（生产，军队等）\n步兵，坦克，火炮有五级，导弹有三级，核武器只有一级",
			"\t[生产规则]你每回合的科研能力为所有城市的科研能力之和，科研选项中的数字代表解锁下一级需要的科研，这个数字每回合减少你所有城市的科研能力之和，到<=0时就解锁了下一级。\n城市有人口，每个城市在每回合人口都会增长。\n生产以城市为单位。可以生产工厂增加该城市的生产能力，生产研究所增加科研能力。\n每个城市生产某个东西的进度每回合前进该城市的生产能力。\n进度完成后，如果人数达到（工厂:100,科研所:50,其他:10）则完成生产，该城市人口扣去相应值，否则不会完成生产。",
			"\t[战斗规则&相邻判定]如果一个城市中有该城市所属国家的敌国的军队，那么这座城市就会发生冲突。\n每个城市有HP，当敌方军队进攻时，如果没有我方军队就一定会攻击城市使城市HP减少，有我方军队存在时如果城市HP>0有60%攻击城市40%攻击我方军队，城市HP<=0时必定攻击我方军队。\n军队的HP不会增长，当军队HP<=0时死亡(消失)。每个军队若正参战，每回合只会发出一次等于军队攻击力0.9~1.1倍的攻击。军队和城市没有防御力和护盾。\n城市的HP如果该回合未发生冲突则回复HP，如果该回合发生冲突且城市HP>0则回复少量HP，如果该回合发生冲突且城市HP<=0则不回HP。\n如果一座城市HP已经<=0且该城市所属的国家在该城市没有军队且该城市中有所属的国家的敌国的军队，那么这些军队中最早抵达此城市的军队所属的国家会占领这个城市。\n如果两个城市在同一个红框内或者两个城市所属的红框有公共边/间隔一条走廊则相邻"
		]
	}
}