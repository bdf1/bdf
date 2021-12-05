var plugins_bb40132b_638b_4a9f_b028_d3fe47acc8d1 = 
{
    "init": function () {
	core.control._replayAction_trigger = function (action) {
		if (action.indexOf("trigger:") != 0) return false;

		var pos = action.substring(8).split(":");
		var x = parseInt(pos[0]),
			y = parseInt(pos[1]);
		core.trigger(x, y);
		core.status.route.push('trigger:' + x + ":" + y);
		core.replay();
		return true;
	}
	core.control._updateDamage_damage = function (floorId, onMap) {
		core.status.damage.data = [];
		if (!core.flags.displayEnemyDamage && !core.flags.displayExtraDamage) return;

		core.extractBlocks(floorId);
		if (!flags.cs) return;
		for (var y = 0; y < flags.tu.length; y++) {
			for (var x = 0; x < flags.tu.length; x++) {
				var cityId = flags.tu[y][x];
				if (cityId === 0) return;
				var city = flags.cs[cityId];
				var damageString = city.hp,
					ratio = city.hp / city.HP;
				var sx = 32 * x, sy = 32 * (y+1);
				if (ratio < 1) {
					core.status.damage.data.push({
						text: damageString, px: sx + 1, py: sy + 32 - 1, color: ratio >= 3 / 4 ? "#1f1" : ratio >= 2 / 4 ? "#fff" : ratio >= 1 / 4 ? "#ff0" : ratio > 0 ? "#f93" : "#f22"
					});
				}
				// if (city.sc[0]) {
				// 	core.status.damage.data.push({ text: city.sc[0].ys, px: 32 * x + 1, py: 32 * (y + 1) - 17, color: '#FFFFFF' });
				// }
				// if (city.gj == flags.xzgj) {
				// 	core.status.damage.data.push({ text: city.rk, px: 32 * x + 1, py: 32 * (y + 1) - 25, color: '#FFFFFF' });
				// 	core.status.damage.data.push({ text: city.v.length + "/" + city.lin.length, px: 32 * x + 1, py: 32 * (y + 1) - 9, color: '#FFFFFF' });
				// }
			}
		}
	}
	this.selectCity = function (city) {
		if (city.length == 0) {
			core.drawTip('无合法的城市！');
			flags.ret = 0;
			return;
		}
		core.createCanvas('black', 0, 0, 1000, 800, 85);
		for (var i = 2; i <= 13; i++)
			for (var j = 0; j < 20; j++)
				if (flags.tu[i][j] && !city.includes(flags.tu[i][j])) core.fillRect('black', j * 32, i * 32, 32, 32, '#000');
		flags._city = city;
		core.insertAction({
			"type": "while",
			"condition": "true",
			"data": [{
					"type": "wait",
					"forceChild": true,
					"data": [{
						"case": "mouse",
						"px": [0, 640],
						"py": [0, 640],
						"action": [

						]
					}, ]
				},
				{
					"type": "if",
					"condition": "((flags.y==0)||((flags.y>12)||(!flags.tu[flags.y][flags.x])))",
					"true": [
						{ "type": "setValue", "name": "flag:ret", "value": "0" },
						{ "type": "function", "function": "function(){core.deleteCanvas('black')}" },
						{ "type": "break", "n": 1 },
					]
				},
				{
					"type": "if",
					"condition": "flags._city.includes(flags.tu[flags.y][flags.x])",
					"true": [
						{ "type": "setValue", "name": "flag:ret", "value": "flags.tu[flags.y][flags.x]" },
						{ "type": "function", "function": "function(){core.deleteCanvas('black')}" },
						{ "type": "break", "n": 1 },
					]
				},
				{ "type": "tip", "text": "你选择的城市不合法" },
			],
		});


	}
	core.registerReplayAction("trigger", core.control._replayAction_trigger);
	//如果检测到怪物，这个子程序给绘制初始化
	this.startEnemyInfoDisplay = function (enemy_x, enemy_y) {
		//我们要提前获得特殊属性以判断窗口高度
		var mon_id = flags.tu[enemy_y-1][enemy_x];
		var width = 200;
		//bigEnemy变量的作用是检测48像素高的怪物并进行特定绘制
		if (core.getBlockCls(enemy_x, enemy_y) == 'enemy48')
			var bigEnemy = 16;
		else
			var bigEnemy = 0;
		//extra_line检测过长的怪物属性
		var extra_line = 3;
		//高度控制。这里只给了正常情况。如果需要绘制境界等其他属性，把下面一行
		//加//注释掉，然后删除下面的/*和*/启用注释的内容，填写"......"，每个属性20像素。
		var height = 168 + extra_line * 20;
		//var height = 168 + Math.ceil(special.length / 2 + extra_line) * 20 + 20 * "......";  //你需要绘制的行数
		//下面是计算窗口绘制起始点，本程序考虑了大地图和怪物在地图边缘的情况。
		var cell_x = (enemy_x + 0.5) * 32 - core.bigmap.offsetX;
		var cell_y = (enemy_y + 0.5) * 32 - core.bigmap.offsetY;
		if (cell_x > 32 * (core.__WIDTH__ - 6) - width) cell_x -= width;
		if (cell_y > 32 * core.__HEIGHT__ - height) cell_y -= height + bigEnemy;
		//获得怪物属性
		var info = core.getEnemys();
		//在下面设置你的字体和字体大小
		var font = "Arial"; //这里"......"填写你的字体。如果不修改的话，默认Arial字体。
		var fontSize = 15;
		//绘制窗口
		core.plugin.addBasics(width, height, cell_x, cell_y, info, fontSize, mon_id, font, bigEnemy);
		core.plugin.addEnemyInfo(info, -2, cell_x, cell_y + bigEnemy, mon_id, fontSize, width, font);
	}

	//这个子程序用来绘制怪物的基本信息
	this.addBasics = function (width, height, cell_x, cell_y, info, fontSize, mon_id, font, bigEnemy) {
		//绘制窗口外观
		core.fillRoundRect("enemyInfo", cell_x, cell_y, width, height + bigEnemy, 5, [0, 0, 0, 0.7]);
		core.strokeRoundRect("enemyInfo", cell_x, cell_y, width, height + bigEnemy, 5, [255, 255, 255, 1], 2);
		//绘制抬头、怪物图标和怪物名称
		//core.fillText("enemyInfo", flags.gjm[flags.cs[mon_id].gj], cell_x + width / 2 - 4 * fontSize / 2, cell_y + 22,
		//[255, 255, 255, 1], "Bold " + fontSize + "px " + font);
		core.fillRect('enemyInfo', cell_x + width / 2 - 16, cell_y + 30, 32, 32, flags.color[flags.cs[mon_id].gj]);
		var _gj = flags.gj[flags.cs[mon_id].gj].nm + " [" + flags.cs[mon_id].gj + "]";
		var _cs = flags.cs[mon_id].nm + " [" + mon_id + "]";
		core.fillText("enemyInfo", _cs, cell_x + width / 2 - _cs.length * fontSize / 8 -
			_cs.replace(/[()]/g, '').length * fontSize / 8 - _cs.replace(/[-_ ()0-9a-zA-Z]/g, '').length *
			fontSize / 4, cell_y + 78 + bigEnemy, [255, 255, 255, 1], fontSize + "px " + font);
		core.fillText("enemyInfo", _gj, cell_x + width / 2 - _gj.length * fontSize / 8 -
			_gj.replace(/[()]/g, '').length * fontSize / 8 - _gj.replace(/[-_ ()0-9a-zA-Z]/g, '').length *
			fontSize / 4, cell_y + 22 + bigEnemy, [255, 255, 255, 1], "Bold " + fontSize + "px " + font);
	}

	//这个子程序调整字体的亮度
	this.changeColor = function (color, Increment) {
		var r = parseInt(color.slice(1, 3), 16);
		var g = parseInt(color.slice(3, 5), 16);
		var b = parseInt(color.slice(5, 7), 16);
		//I代表灰度
		var I = (r + g + b) / 3 + 0.001;
		//PS亮度算法
		var I_new = I + Increment - 128.0;
		var r_new = core.clamp(Math.round(r + (256.0 - r) * I_new / 128.0), 0, 255);
		var g_new = core.clamp(Math.round(g + (256.0 - g) * I_new / 128.0), 0, 255);
		var b_new = core.clamp(Math.round(b + (256.0 - b) * I_new / 128.0), 0, 255);
		r = r_new.toString(16);
		g = g_new.toString(16);
		b = b_new.toString(16);
		color = "#" + r + g + b;
		return color;
	}

	//这个子程序用来绘制怪物的攻防等信息，由于代码理解简单便不怎么单独注释。
	//前一半绘制"生命"等等提示，后一半绘制怪物信息。
	this.addEnemyInfo = function (info, i, cell_x, cell_y, mon_id, fontSize, width, font) {
		//下面这两行用来放怪物境界，如果需要就uncomment
		/*
		i += 2;
		core.fillText("enemyInfo", info[mon_id].level, cell_x + width / 2 -
			info[mon_id].level.length * fontSize / 2, cell_y + 96 + 10 * i, [255, 255, 255, 1], fontSize + "px heiti");
		*/
		core.setTextAlign('enemyInfo', 'left');
		core.fillText("enemyInfo", "生产/研发", cell_x + 8,
			cell_y + 118 + 10 * i, [192, 224, 255, 1], fontSize + "px " + font);
		core.fillText("enemyInfo", "可用人数", cell_x + 8,
			cell_y + 138 + 10 * i, [192, 224, 255, 1], fontSize + "px " + font);
		core.fillText("enemyInfo", "ＨＰ", cell_x + 8,
			cell_y + 158 + 10 * i, [192, 224, 255, 1], fontSize + "px " + font);
		core.fillText("enemyInfo", "部队数", cell_x + 8,
			cell_y + 178 + 10 * i, [192, 224, 255, 1], fontSize + "px " + font);
		core.fillText("enemyInfo", "敌方部队", cell_x + 8,
			cell_y + 198 + 10 * i, [192, 224, 255, 1], fontSize + "px " + font);
		core.fillText("enemyInfo", "正在生产", cell_x + 8,
			cell_y + 218 + 10 * i, [192, 224, 255, 1], fontSize + "px " + font);
		core.fillText("enemyInfo", "剩余进度", cell_x + 8,
			cell_y + 238 + 10 * i, [192, 224, 255, 1], fontSize + "px " + font);
		core.setTextAlign('enemyInfo', 'right');
		core.fillText("enemyInfo", flags.cs[mon_id].ic + "/" + flags.cs[mon_id].kj, cell_x + width - 8,
			cell_y + 118 + 10 * i, [255, 255, 255, 1], fontSize + "px " + font);
		core.fillText("enemyInfo", flags.cs[mon_id].rk, cell_x + width - 8,
			cell_y + 138 + 10 * i, [255, 255, 255, 1], fontSize + "px " + font);
		core.fillText("enemyInfo", flags.cs[mon_id].hp, cell_x + width - 8,
			cell_y + 158 + 10 * i, [255, 255, 255, 1], fontSize + "px " + font);
		core.fillText("enemyInfo", flags.cs[mon_id].v.length ? flags.cs[mon_id].v.length : "空", cell_x + width - 8,
			cell_y + 178 + 10 * i, [255, 255, 255, 1], fontSize + "px " + font);
		core.fillText("enemyInfo", flags.cs[mon_id].lin.length ? flags.cs[mon_id].lin.length : "无", cell_x + width - 8,
			cell_y + 198 + 10 * i, [255, 255, 255, 1], fontSize + "px " + font);
		core.fillText("enemyInfo", flags.cs[mon_id].sc[0] ? flags.cs[mon_id].sc[0].lx == 8 ? "工厂" : flags.cs[mon_id].sc[0].lx == 9 ? "研究所" : flags.mil[flags.cs[mon_id].sc[0].lx][flags.cs[mon_id].sc[0].xh].nm : "空", cell_x + width - 8,
			cell_y + 218 + 10 * i, [255, 255, 255, 1], fontSize + "px " + font);
		core.fillText("enemyInfo", flags.cs[mon_id].sc[0] ? flags.cs[mon_id].sc[0].ys : "无", cell_x + width - 8,
			cell_y + 238 + 10 * i, [255, 255, 255, 1], fontSize + "px " + font);

		//这里单独注释一下，如果金币经验>1000且<100w文字会覆盖，处理了一下
		//最后这两行用来加其他信息，在"......"里填上属性名，如果需要就uncomment
		/*
		i += 2;
		core.setTextAlign('enemyInfo', 'left');
		core.fillText("enemyInfo", "......", cell_x + 8,
			cell_y + 178 + 10 * i, [192, 224, 255, 1], fontSize + "px " + font);
		core.setTextAlign('enemyInfo', 'right');
		core.fillText("enemyInfo", core.formatBigNumber(info[mon_id]."......", true), cell_x + width - 8,
			cell_y + 178 + 10 * i, [255, 255, 255, 1], fontSize + "px " + font);
		*/
	}

	//这个子程序处理了金币和经验在1000 ~ 999999时的情况，不处理的话文字会覆盖。
	this.ThousandTransform = function (info, mon_id) {
		var displayMoney = "",
			displayEXP = "";
		if (info[mon_id].money >= 1000 && info[mon_id].money < 100000) {
			displayMoney = info[mon_id].money / 1000;
			displayMoney = displayMoney.toString() + "k";
		} else if (info[mon_id].money >= 100000 && info[mon_id].money < 1000000) {
			displayMoney = info[mon_id].money / 10000;
			displayMoney = displayMoney.toString() + "w";
		} else
			displayMoney = core.formatBigNumber(info[mon_id].money, true);
		if (info[mon_id].exp >= 1000 && info[mon_id].exp < 100000) {
			displayEXP = info[mon_id].exp / 1000;
			displayEXP = displayEXP.toString() + "k";
		} else if (info[mon_id].exp >= 100000 && info[mon_id].exp < 1000000) {
			displayEXP = info[mon_id].exp / 10000;
			displayEXP = displayEXP.toString() + "w";
		} else
			displayEXP = core.formatBigNumber(info[mon_id].exp, true);
		return [displayMoney, displayEXP];
	}

	//如果鼠标移动，则Register Action
	core.registerAction('onmove', 'enemyInfoDisplay', function (mouse_x, mouse_y) {
		core.plugin.enemyInfoDisplay(mouse_x, mouse_y);
		return false;
	}, 100);

	core.registerAction('onmove', 'enemyInfoDisplay', function (mouse_x, mouse_y) {
		core.plugin.enemyInfoDisplay(mouse_x, mouse_y);
		return false;
	}, 100);

	if (main.mode === 'play') {
		// 鼠标移出时清除悬浮窗
		core.dom.data.onmouseout = function() {
			core.clearMap("enemyInfo");
		}
	}

	//主程序，当鼠标移动时进行判断
	this.enemyInfoDisplay = function (mouse_x, mouse_y) {
		//使用需要3个条件：打开开关、拥有怪物手册和玩家在电脑端上游戏
		if (core.getFlag("useEnemyInfoDisplay") == true && core.platform.isPC == true && !core.status.lockControl) {
			core.createCanvas("enemyInfo", 0, 0, 1000, 700, 140);
			//这里处理大地图带来的影响
			offsetX = core.bigmap.offsetX;
			offsetY = core.bigmap.offsetY;
			//获得鼠标对应的图块坐标位置
			var enemy_x = core.clamp(Math.floor((mouse_x + offsetX / (32 * core.domStyle.scale))), core.bigmap.offsetX /
				(32 * core.domStyle.scale), core.__WIDTH__ - 1 + core.bigmap.offsetX / (32 * core.domStyle.scale));
			var enemy_y = core.clamp(Math.floor((mouse_y + offsetY / (32 * core.domStyle.scale))), core.bigmap.offsetY /
				(32 * core.domStyle.scale), core.__HEIGHT__ - 1 + core.bigmap.offsetY / (32 * core.domStyle.scale));
			//如果该图块有怪物，则绘制窗口
			if (core.enemyExists(enemy_x, enemy_y)) core.plugin.startEnemyInfoDisplay(enemy_x, enemy_y);
		}
	}

	//备用程序，获得鼠标的位置，出错时使用
	main.dom.data.onmousemove2 = function (e) {
		e.stopPropagation();
		var loc = main.core.actions._getClickLoc(e.clientX, e.clientY);
		if (loc == null) return;
		main.core.onmove(loc);
		return [e.clientX, e.clientY];
	}

	//楼层转换后，怪物消失。但是如果鼠标不移动，窗口会继续显示降低玩家体验
	//复写一下楼层转换，使得楼层转换后窗口不再继续显示
	events.prototype.changeFloor = function (floorId, stair, heroLoc, time, callback) {
		var info = this._changeFloor_getInfo(floorId, stair, heroLoc, time);
		if (info == null) {
			if (callback) callback();
			return;
		}
		floorId = info.floorId;
		info.locked = core.status.lockControl;

		// core.dom.floorNameLabel.innerText = core.status.maps[floorId].title;
		core.lockControl();
		core.stopAutomaticRoute();
		core.clearContinueAutomaticRoute();
		core.status.replay.animate = true;
		clearInterval(core.interval.onDownInterval);
		core.interval.onDownInterval = 'tmp';
		core.clearMap("enemyInfo");
		this._changeFloor_beforeChange(info, callback);
	}

	//战斗后怪物消失，同理需要复写一下
	events.prototype.battle = function (id, x, y, force, callback) {
		core.saveAndStopAutomaticRoute();
		id = id || core.getBlockId(x, y);
		if (!id) return core.clearContinueAutomaticRoute(callback);
		// 非强制战斗
		if (!core.enemys.canBattle(id, x, y) && !force && !core.status.event.id) {
			core.drawTip("你打不过此怪物！");
			return core.clearContinueAutomaticRoute(callback);
		}
		// 自动存档
		if (!core.status.event.id) core.autosave(true);
		// 战前事件
		if (!this.beforeBattle(id, x, y))
			return core.clearContinueAutomaticRoute(callback);
		//战后事件
		this.afterBattle(id, x, y);
		if (callback) callback();
		core.clearMap("enemyInfo");
	}

	// 以下处理新UI
	extendUI.init(core.dom.gameDraw);

	core.drawStatusBar = function() {
		extendUI.update();
	}

	extendUI.registerCommand("openSave", function() {
		core.save(true);
	});

	extendUI.registerCommand("openLoad", function() {
		core.load(true);
	});

	extendUI.registerCommand("openSettings", function() {
		core.openSettings(true);
	});
	
	core.control.lockControl = function () {
		core.status.lockControl = true;
		extendUI.update();
	}

	core.control.unlockControl = function () {
		core.status.lockControl = false;
		extendUI.update();
	}

	// 进入标题画面时关闭
	core.control.showStartAnimate = function(noAnimate, callback) {
		this._showStartAnimate_resetDom();
		extendUI.execCommand("eject");
		if (core.flags.startUsingCanvas || noAnimate)
			return this._showStartAnimate_finished(core.flags.startUsingCanvas, callback);
		core.hideWithAnimate(core.dom.startTop, 20, function () {
			core.control._showStartAnimate_finished(false, callback);
		});
	}

	core.loader._loadMaterials_afterLoad = function () {
		var images = core.splitImage(core.material.images['icons']);
		for (var key in core.statusBar.icons) {
			if (typeof core.statusBar.icons[key] == 'number') {
				core.statusBar.icons[key] = images[core.statusBar.icons[key]];
			}
		}
	}

	core.control.clearStatusBar = function() {

	}

	core.control.setToolbarButton = function() {

	}

	core.control.resize = function() {
		if (main.mode=='editor') return;
		var clientWidth = main.dom.body.clientWidth, clientHeight = main.dom.body.clientHeight;
		var CANVAS_WIDTH = core.__PX_WIDTH__, CANVAS_HEIGHT = core.__PX_HEIGHT__;
		var BORDER = 0;
	
		var horizontalMaxRatio = (clientHeight - 2 * BORDER) / (CANVAS_HEIGHT);
	
		if (clientWidth - 3 * BORDER >= CANVAS_WIDTH || (clientWidth > clientHeight && horizontalMaxRatio < 1)) {
			// 横屏
			core.domStyle.isVertical = false;
	
			core.domStyle.availableScale = [];
			[1, 1.25, 1.5, 1.75, 2].forEach(function (v) {
				if (clientWidth - 3 * BORDER >= v*(CANVAS_WIDTH) && horizontalMaxRatio >= v) {
					core.domStyle.availableScale.push(v);
				}
			});
			if (core.domStyle.availableScale.indexOf(core.domStyle.scale) < 0) {
				core.domStyle.scale = Math.min(1, horizontalMaxRatio);
			}
		}
		else {
			// 竖屏
			core.domStyle.isVertical = true;
			core.domStyle.scale = Math.min(1, (clientWidth - 2 * BORDER) / CANVAS_WIDTH);
			core.domStyle.availableScale = [];
			extendToolbar = false;
		}
	
		var globalAttribute = core.status.globalAttribute || core.initStatus.globalAttribute;
	
		var obj = {
			clientWidth: clientWidth,
			clientHeight: clientHeight,
			CANVAS_WIDTH: CANVAS_WIDTH,
			CANVAS_HEIGHT: CANVAS_HEIGHT,
			BORDER: BORDER,
			outerWidth: CANVAS_WIDTH * core.domStyle.scale + 2 * BORDER,
			outerHeight: CANVAS_HEIGHT * core.domStyle.scale + 2 * BORDER,
			globalAttribute: globalAttribute,
		};
	
		this._doResize(obj);
	}

	core.control.unregisterResize("gameGroup");
	core.control.unregisterResize("statusBar");
	core.control.unregisterResize("status");
	core.control.unregisterResize("toolBar");
	core.control.unregisterResize("tools");

	core.control.registerResize("gameGroup", function (obj) {
		var startBackground = core.domStyle.isVertical ? (main.styles.startVerticalBackground || main.styles.startBackground) : main.styles.startBackground;
		if (main.dom.startBackground.getAttribute('__src__') != startBackground) {
			main.dom.startBackground.setAttribute('__src__', startBackground);
			main.dom.startBackground.src = startBackground;
		}
	
		var gameGroup = core.dom.gameGroup;
		var totalWidth, totalHeight;
		if (core.domStyle.isVertical) {
			totalWidth = obj.outerWidth;
			totalHeight = obj.outerHeight;
		}
		else {
			totalWidth = obj.outerWidth;
			totalHeight = obj.outerHeight;
		}
		gameGroup.style.width = totalWidth + "px";
		gameGroup.style.height = totalHeight + "px";
		gameGroup.style.left = (obj.clientWidth - totalWidth) / 2 + "px";
		gameGroup.style.top = (obj.clientHeight - totalHeight) / 2 + "px";
		// floorMsgGroup
		var floorMsgGroup = core.dom.floorMsgGroup;
		floorMsgGroup.style = obj.globalAttribute.floorChangingStyle;
		floorMsgGroup.style.width = obj.outerWidth - 2 * obj.BORDER + "px";
		floorMsgGroup.style.height = totalHeight - 2 * obj.BORDER + "px";
		floorMsgGroup.style.fontSize = 16 * core.domStyle.scale + "px";
		// startPanel
		core.dom.startPanel.style.fontSize = 16 * core.domStyle.scale + "px";
		// musicBtn
		if (core.domStyle.isVertical || core.domStyle.scale < 1) {
			core.dom.musicBtn.style.right = core.dom.musicBtn.style.bottom = "3px";
			core.dom.enlargeBtn.style.right = "34px";
			core.dom.enlargeBtn.style.bottom = "3px"
		}
		else {
			core.dom.musicBtn.style.right = (obj.clientWidth - totalWidth) / 2 + "px";
			core.dom.musicBtn.style.bottom = (obj.clientHeight - totalHeight) / 2 - 27 + "px";
			core.dom.enlargeBtn.style.right = (obj.clientWidth - totalWidth) / 2 + 31 + "px";
			core.dom.enlargeBtn.style.bottom = (obj.clientHeight - totalHeight) / 2 - 27 + "px";
		}
	});

	core.control.registerResize("newUI", function (obj) {
		document.documentElement.style.fontSize = core.domStyle.scale + 'px';
	});

	core.control.updateHeroIcon = function (name) {

	}

	core.control._updateStatusBar_setToolboxIcon = function() {

	}

	core.control.hideStatusBar = function (showToolbox) {
		if (main.mode == 'editor') return;
	
		// 如果原本就是隐藏的，则先显示
		if (!core.domStyle.showStatusBar)
			this.showStatusBar();
		if (core.isReplaying()) showToolbox = true;

		core.domStyle.showStatusBar = false;
		core.setFlag('hideStatusBar', true);
		core.setFlag('showToolbox', showToolbox || null);

		extendUI.update();
	}

	core.control.showStatusBar = function () {
		if (main.mode == 'editor') return;
		if (core.domStyle.showStatusBar) return;
		core.domStyle.showStatusBar = true;
		core.removeFlag('hideStatusBar');

		extendUI.update();
	}

	////// 获得点击事件相对左上角的坐标 //////
	core.actions._getClickLoc = function (x, y) {

		var size = 32;
		size = size * core.domStyle.scale;

		if (core.domStyle.isVertical) {
		}
		else {
		}

		var left = core.dom.gameGroup.offsetLeft;
		var top = core.dom.gameGroup.offsetTop;
		var loc = {'x': Math.max(x - left), 'y': Math.max(y - top, 0), 'size': size};
		return loc;
	}

	// tip 要下移 32
	core.ui._drawTip_drawOne = function (tip) {
		core.setAlpha('data', tip.opacity);
		core.fillRect('data', 5, 5 + 32, tip.width, 42, '#000000');
		if (tip.image)
			core.drawImage('data', tip.image, (tip.posX + tip.frame) * 32, tip.posY * tip.height, 32, 32, 10, 10 + 32, 32, 32);
		core.fillText('data', tip.text, tip.textX, 33 + 32, '#FFFFFF');
		core.setAlpha('data', 1);
	}

    core.unregisterAnimationFrame("tip");
	core.registerAnimationFrame("tip", true, function (timestamp) {
		if (core.animateFrame.tip == null) return;
		var tip = core.animateFrame.tip;
		if (timestamp - tip.time <= 30) return;
		var delta = timestamp - tip.time;
		tip.time = timestamp;
	
		core.setFont('data', "16px Consolas");
		core.setTextAlign('data', 'left');
		core.clearMap('data', 0, 32, core.__PX_WIDTH__, 50 + 32);
		core.ui._drawTip_drawOne(tip);
		if (tip.stage == 1) {
			tip.opacity += 0.05;
			if (tip.opacity >= 0.6) {
				tip.stage = 2;
				tip.displayTime = 0;
			}
		} else if (tip.stage == 2) {
			tip.displayTime += delta;
			if (tip.displayTime >= 1000) tip.stage = 3;
		} else tip.opacity -= 0.05;
	
		if (tip.opacity <= 0) {
			core.animateFrame.tip = null;
		}
	});

	// 修改楼层绘制
	if (main.mode == "play") {
		core.maps._drawMap_drawAll = function (floorId, config) {
			floorId = floorId || core.status.floorId;
			this.drawBg(floorId, config);

			core.clearMap('fg');
			for (var x = 0; x < 20; x++) {
				for (var y = 0; y < 14; y++) {
					var id = flags.tu[y][x];
					if (id === 0) continue;
					var color = flags.color[flags.cs[id].gj];
					core.fillRect('fg', x * 32, (y+1) * 32, 32, 32, color);
				}
			}
		}
	}
},
    "drawLight": function () {

	// 绘制灯光/漆黑层效果。调用方式 core.plugin.drawLight(...)
	// 【参数说明】
	// name：必填，要绘制到的画布名；可以是一个系统画布，或者是个自定义画布；如果不存在则创建
	// color：可选，只能是一个0~1之间的数，为不透明度的值。不填则默认为0.9。
	// lights：可选，一个数组，定义了每个独立的灯光。
	//        其中每一项是三元组 [x,y,r] x和y分别为该灯光的横纵坐标，r为该灯光的半径。
	// lightDec：可选，0到1之间，光从多少百分比才开始衰减（在此范围内保持全亮），不设置默认为0。
	//        比如lightDec为0.5代表，每个灯光部分内圈50%的范围全亮，50%以后才开始快速衰减。
	// 【调用样例】
	// core.plugin.drawLight('curtain'); // 在curtain层绘制全图不透明度0.9，等价于更改画面色调为[0,0,0,0.9]。
	// core.plugin.drawLight('ui', 0.95, [[25,11,46]]); // 在ui层绘制全图不透明度0.95，其中在(25,11)点存在一个半径为46的灯光效果。
	// core.plugin.drawLight('test', 0.2, [[25,11,46,0.1]]); // 创建一个test图层，不透明度0.2，其中在(25,11)点存在一个半径为46的灯光效果，灯光中心不透明度0.1。
	// core.plugin.drawLight('test2', 0.9, [[25,11,46],[105,121,88],[301,221,106]]); // 创建test2图层，且存在三个灯光效果，分别是中心(25,11)半径46，中心(105,121)半径88，中心(301,221)半径106。
	// core.plugin.drawLight('xxx', 0.3, [[25,11,46],[105,121,88,0.2]], 0.4); // 存在两个灯光效果，它们在内圈40%范围内保持全亮，40%后才开始衰减。
	this.drawLight = function (name, color, lights, lightDec) {

		// 清空色调层；也可以修改成其它层比如animate/weather层，或者用自己创建的canvas
		var ctx = core.getContextByName(name);
		if (ctx == null) {
			if (typeof name == 'string')
				ctx = core.createCanvas(name, 0, 0, core.__PX_WIDTH__, core.__PX_HEIGHT__, 98);
			else return;
		}

		ctx.mozImageSmoothingEnabled = false;
		ctx.webkitImageSmoothingEnabled = false;
		ctx.msImageSmoothingEnabled = false;
		ctx.imageSmoothingEnabled = false;

		core.clearMap(name);
		// 绘制色调层，默认不透明度
		if (color == null) color = 0.9;
		ctx.fillStyle = "rgba(0,0,0," + color + ")";
		ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

		lightDec = core.clamp(lightDec, 0, 1);

		// 绘制每个灯光效果
		ctx.globalCompositeOperation = 'destination-out';
		lights.forEach(function (light) {
			// 坐标，半径，中心不透明度
			var x = light[0],
				y = light[1],
				r = light[2];
			// 计算衰减距离
			var decDistance = parseInt(r * lightDec);
			// 正方形区域的直径和左上角坐标
			var grd = ctx.createRadialGradient(x, y, decDistance, x, y, r);
			grd.addColorStop(0, "rgba(0,0,0,1)");
			grd.addColorStop(1, "rgba(0,0,0,0)");
			ctx.beginPath();
			ctx.fillStyle = grd;
			ctx.arc(x, y, r, 0, 2 * Math.PI);
			ctx.fill();
		});
		ctx.globalCompositeOperation = 'source-over';
		// 可以在任何地方（如afterXXX或自定义脚本事件）调用函数，方法为  core.plugin.xxx();
	}
},
    "shop": function () {
	// 【全局商店】相关的功能
	// 
	// 打开一个全局商店
	// shopId：要打开的商店id；noRoute：是否不计入录像
	this.openShop = function (shopId, noRoute) {
		var shop = core.status.shops[shopId];
		// Step 1: 检查能否打开此商店
		if (!this.canOpenShop(shopId)) {
			core.drawTip("该商店尚未开启",'shop');
			return false;
		}

		// Step 2: （如有必要）记录打开商店的脚本事件
		if (!noRoute) {
			core.status.route.push("shop:" + shopId);
		}

		// Step 3: 检查道具商店 or 公共事件
		if (shop.item) {
			if (core.openItemShop) {
				core.openItemShop(shopId);
			} else {
				core.playSound('操作失败');
				core.insertAction("道具商店插件不存在！请检查是否存在该插件！");
			}
			return;
		}
		if (shop.commonEvent) {
			core.insertCommonEvent(shop.commonEvent, shop.args);
			return;
		}

		_shouldProcessKeyUp = true;

		// Step 4: 执行标准公共商店    
		core.insertAction(this._convertShop(shop));
		return true;
	}

	////// 将一个全局商店转变成可预览的公共事件 //////
	this._convertShop = function (shop) {
		return [
			{ "type": "function", "function": "function() {core.addFlag('@temp@shop', 1);}" },
			{
				"type": "while",
				"condition": "true",
				"data": [
					// 检测能否访问该商店
					{
						"type": "if",
						"condition": "core.isShopVisited('" + shop.id + "')",
						"true": [
							// 可以访问，直接插入执行效果
							{ "type": "function", "function": "function() { core.plugin._convertShop_replaceChoices('" + shop.id + "', false) }" },
						],
						"false": [
							// 不能访问的情况下：检测能否预览
							{
								"type": "if",
								"condition": shop.disablePreview,
								"true": [
									// 不可预览，提示并退出
									{ "type": "playSound", "name": "操作失败" },
									"当前无法访问该商店！",
									{ "type": "break" },
								],
								"false": [
									// 可以预览：将商店全部内容进行替换
									{ "type": "tip", "text": "当前处于预览模式，不可购买" },
									{ "type": "function", "function": "function() { core.plugin._convertShop_replaceChoices('" + shop.id + "', true) }" },
								]
							}
						]
					}
				]
			},
			{ "type": "function", "function": "function() {core.addFlag('@temp@shop', -1);}" }
		];
	}

	this._convertShop_replaceChoices = function (shopId, previewMode) {
		var shop = core.status.shops[shopId];
		var choices = (shop.choices || []).filter(function (choice) {
			if (choice.condition == null || choice.condition == '') return true;
			try { return core.calValue(choice.condition); } catch (e) { return true; }
		}).map(function (choice) {
			var ableToBuy = core.calValue(choice.need);
			return {
				"text": choice.text,
				"icon": choice.icon,
				"color": ableToBuy && !previewMode ? choice.color : [153, 153, 153, 1],
				"action": ableToBuy && !previewMode ? [{ "type": "playSound", "name": "商店" }].concat(choice.action) : [
					{ "type": "playSound", "name": "操作失败" },
					{ "type": "tip", "text": previewMode ? "预览模式下不可购买" : "购买条件不足" }
				]
			};
		}).concat({ "text": "离开", "action": [{ "type": "playSound", "name": "取消" }, { "type": "break" }] });
		core.insertAction({ "type": "choices", "text": shop.text, "choices": choices });
	}

	/// 是否访问过某个快捷商店
	this.isShopVisited = function (id) {
		if (!core.hasFlag("__shops__")) core.setFlag("__shops__", {});
		var shops = core.getFlag("__shops__");
		if (!shops[id]) shops[id] = {};
		return shops[id].visited;
	}

	/// 当前应当显示的快捷商店列表
	this.listShopIds = function () {
		return Object.keys(core.status.shops).filter(function (id) {
			return core.isShopVisited(id) || !core.status.shops[id].mustEnable;
		});
	}

	/// 是否能够打开某个商店
	this.canOpenShop = function (id) {
		if (this.isShopVisited(id)) return true;
		var shop = core.status.shops[id];
		if (shop.item || shop.commonEvent || shop.mustEnable) return false;
		return true;
	}

	/// 启用或禁用某个快捷商店
	this.setShopVisited = function (id, visited) {
		if (!core.hasFlag("__shops__")) core.setFlag("__shops__", {});
		var shops = core.getFlag("__shops__");
		if (!shops[id]) shops[id] = {};
		if (visited) shops[id].visited = true;
		else delete shops[id].visited;
	}

	/// 能否使用快捷商店
	this.canUseQuickShop = function (id) {
		// 如果返回一个字符串，表示不能，字符串为不能使用的提示
		// 返回null代表可以使用

		// 检查当前楼层的canUseQuickShop选项是否为false
		if (core.status.thisMap.canUseQuickShop === false)
			return '当前楼层不能使用快捷商店。';
		return null;
	}

	var _shouldProcessKeyUp = true;

	/// 允许商店X键退出
	core.registerAction('keyUp', 'shops', function (keycode) {
		if (!core.status.lockControl || core.status.event.id != 'action') return false;
		if ((keycode == 13 || keycode == 32) && !_shouldProcessKeyUp) {
			_shouldProcessKeyUp = true;
			return true;
		}

		if (!core.hasFlag("@temp@shop") || core.status.event.data.type != 'choices') return false;
		var data = core.status.event.data.current;
		var choices = data.choices;
		var topIndex = core.actions._getChoicesTopIndex(choices.length);
		if (keycode == 88 || keycode == 27) { // X, ESC
			core.actions._clickAction(core.actions.H_WIDTH, topIndex + choices.length - 1);
			return true;
		}
		return false;
	}, 60);

	/// 允许长按空格或回车连续执行操作
	core.registerAction('keyDown', 'shops', function (keycode) {
		if (!core.status.lockControl || !core.hasFlag("@temp@shop") || core.status.event.id != 'action') return false;
		if (core.status.event.data.type != 'choices') return false;
		var data = core.status.event.data.current;
		var choices = data.choices;
		var topIndex = core.actions._getChoicesTopIndex(choices.length);
		if (keycode == 13 || keycode == 32) { // Space, Enter
			core.actions._clickAction(core.actions.H_WIDTH, topIndex + core.status.event.selection);
			_shouldProcessKeyUp = false;
			return true;
		}
		return false;
	}, 60);

	// 允许长按屏幕连续执行操作
	core.registerAction('longClick', 'shops', function (x, y, px, py) {
		if (!core.status.lockControl || !core.hasFlag("@temp@shop") || core.status.event.id != 'action') return false;
		if (core.status.event.data.type != 'choices') return false;
		var data = core.status.event.data.current;
		var choices = data.choices;
		var topIndex = core.actions._getChoicesTopIndex(choices.length);
		if (x >= core.actions.CHOICES_LEFT && x <= core.actions.CHOICES_RIGHT && y >= topIndex && y < topIndex + choices.length) {
			core.actions._clickAction(x, y);
			return true;
		}
		return false;
	}, 60);
},
    "routeFixing": function () {
	// 是否开启本插件，true 表示启用，false 表示禁用。
	var __enable = true;
	if (!__enable) return;
	/*
	 使用说明：启用本插件后，录像回放时您可以用数字键1或6分别切换到原速或24倍速。
	 暂停播放时按数字键7（电脑按N）可以单步播放，数字键2-5可以进行录像自助精修。
	 具体描述见下（实际弹窗请求您输入时不要带有任何空格）：
	 
	 up down left right 勇士向某个方向行走一步
	 item:ID 使用某件道具，如item:bomb表示使用炸弹
	 unEquip:n 卸掉身上第(n+1)件装备（n从0开始），如unEquip:1默认表示卸掉盾牌
	 equip:ID 穿上某件装备，如equip:sword1表示装上铁剑
	 saveEquip:n 将身上的当前套装保存到第n套快捷套装（n从0开始）
	 loadEquip:n 快捷换上之前保存好的第n套套装
	 fly:ID 使用楼传飞到某一层，如fly:MT10表示飞到主塔10层
	 choices:none 确认框/选择项超时（作者未设置超时时间则此项视为缺失）
	 choices:n 确认框/选择项选择第(n+1)项（选择项n从0开始，确认框n为0表示确定，1表示取消），n越界将会报错
	 选择项n为负数时表示选择倒数第-n项，如-1表示最后一项（V2.8.2起标准全局商店的“离开”项）
	 此项缺失的话，确认框将选择作者指定的默认项（初始光标位置），选择项将弹窗请求补选（后台录像验证中则选第一项0，可以复写函数来修改）
	 shop:ID 打开某个全局商店，如shop:itemShop表示打开道具商店。因此连载塔千万不要中途修改商店ID！
	 turn 单击勇士（Z键）转身
	 turn:dir 勇士转向某个方向，dir可以为up down left right
	 getNext 轻按获得身边道具，优先获得面前的，身边如果没有道具则此项会导致报错
	 input:none “等待用户操作事件”中超时（作者未设置超时时间则此项会导致报错）
	 input:xxx 可能表示“等待用户操作事件”的一个操作（如按键操作将直接记录input:keycode），也可能表示一个“接受用户输入数字”的输入，后者的情况下xxx为输入的数字。此项缺失的话前者将直接报错，后者将用0代替
	 input2:xxx 可能表示“读取全局存储（core.getGlobal）”读取到的值，也可能表示一个“接受用户输入文本”的输入，两种情况下xxx都为base64编码。此项缺失的话前者将重新现场读取，后者将用空字符串代替
	 no 走到可穿透的楼梯上不触发楼层切换事件
	 move:x:y 尝试瞬移到[x,y]点
	 key:n 按下键值为n的键，如key:49表示按下大键盘数字键1，默认会触发使用破墙镐
	 click:n:px:py 点击自绘状态栏，n为0表示横屏1表示竖屏，[px,py]为点击的像素坐标
	 random:n 生成了随机数n，即core.rand2(num)的返回结果，n必须在[0,num-1]范围，num必须为正整数。此项缺失将导致现场重新随机生成数值，可能导致回放结果不一致！
	 作者自定义的新项（一般为js对象，可以先JSON.stringify()再core.encodeBase64()得到纯英文数字的内容）需要用(半角圆括弧)括起来。
	 
	 当您使用数字键5将一些项追加到即将播放内容的开头时，请注意要逆序逐项追加，或者每追加一项就按下数字键7或字母键N单步播放。
	 电脑端熟练以后推荐直接在控制台操作core.status.route和core.status.replay.toReplay（后者录像回放时才有），配合var以及core.push()和core.unshift()更加灵活自由哦！
	 */
	core.registerAction('onkeyUp', '_sys_onkeyUp_replay', function (e) { // 重新注册录像回放时的按键处理行为，将7设为单步播放，2-5设为录像精修
		if (this._checkReplaying()) {
			if (e.keyCode == 27) // ESCAPE
				core.stopReplay();
			else if (e.keyCode == 90) // Z
				core.speedDownReplay();
			else if (e.keyCode == 67) // C
				core.speedUpReplay();
			else if (e.keyCode == 32) // SPACE
				core.triggerReplay();
			else if (e.keyCode == 65) // A
				core.rewindReplay();
			else if (e.keyCode == 83) // S
				core.control._replay_SL();
			else if (e.keyCode == 88) // X
				core.control._replay_book();
			else if (e.keyCode == 33 || e.keyCode == 34) // PgUp/PgDn
				core.control._replay_viewMap();
			else if (e.keyCode == 78 || e.keyCode == 55) // N/7，单步播放
				core.stepReplay();
			else if (e.keyCode == 84) // T
				core.control._replay_toolbox();
			else if (e.keyCode == 81) // Q
				core.control._replay_equipbox();
			else if (e.keyCode == 66) // B
				core.ui._drawStatistics();
			else if (e.keyCode == 49 || e.keyCode == 54) // 1/6，原速/24倍速播放
				core.setReplaySpeed(e.keyCode == 49 ? 1 : 24);
			else if (e.keyCode > 49 && e.keyCode < 54) { // 2-5，录像精修
				switch (e.keyCode - 48) {
				case 2: // pop
					alert("您已移除已录制内容的最后一项：" + core.status.route.pop());
					break;
				case 3: // push
					core.utils.myprompt("请输入您要追加到已录制内容末尾的项：", "", function (value) {
						if (value != null) core.status.route.push(value);
					});
					break;
				case 4: // shift
					alert("您已移除即将播放内容的第一项：" + core.status.replay.toReplay.shift());
					break;
				case 5: // unshift
					core.utils.myprompt("请输入您要追加到即将播放内容开头的项：", "", function (value) {
						if (value != null) core.status.replay.toReplay.unshift(value);
					});
				}
			}
			return true;
		}
	}, 100);
},
    "myNumpad": function () {
	// 样板自带的整数输入事件为白屏弹窗且可以误输入任意非法内容，观感较差。本插件可以将其美化成仿RM样式，同时带有音效
	// 另一方面，4399等第三方平台不允许使用包括core.myprompt和core.myconfirm在内的弹窗，因此也需要此插件来替代，不然类似生命魔杖的道具就不好实现了

	// 是否启用本插件，false表示禁用，true表示启用
	var __enable = true;
	if (!__enable) return;

	core.events._action_input = function (data, x, y, prefix) { // 复写整数输入事件
		if (core.isReplaying()) { // 录像回放时，处理方式不变，但增加负整数支持
			core.events.__action_getInput(core.replaceText(data.text, prefix), false, function (value) {
				value = parseInt(value) || 0; // 去掉了取绝对值的步骤
				core.status.route.push("input:" + value);
				core.setFlag("input", value);
				core.doAction();
			});
		} else {
			// 正常游戏中，采用暂停录制的方式然后用事件流循环“绘制-等待-变量操作”三板斧实现（按照13*13适配的）。
			// 您可以自行修改下述公共事件的内容来适配15*15或其他需求，但请务必注意要在事件结尾裁剪录像。
			core.setFlag('@temp@text', core.replaceText(data.text, prefix)); // 预替换提示文字，因为公共事件里无法引用data和prefix这两个自变量
			core.setFlag('@temp@length', core.status.route.length); // 记录当前录像长度，公共事件结束后裁剪，达到“暂停录制”的效果
			core.setFlag('input', 0); // 输入值归零
			core.insertCommonEvent('整数输入', null, x, y); // 插入公共事件
			core.events.doAction(); // 重要！继续处理刚刚插入的公共事件
		}
	}
},
    "precompile": function () {
	// 使用说明：将原本写在core.insertAction([...])处的json事件指令数组用（即事件编辑器右侧的文本内容，如果是公共事件则可以用core.events.getCommonEvent('公共事件名')得到）
	// var script = core.plugin.compile([...])编译成字符串，然后
	// try { eval(script); } catch (e) { if (e != 'exit') console.log(e); }
	// 即可，尤其适用于UI绘制事件（甚至伤害计算？）。此插件尚在公测中，如有bug请立即向群内ad、小艾、古祠、理派四阵 等技术人员反馈
	this.compile = function (arr) { // json事件指令编译为js脚本，不能编译异步事件和独立开关，不支持“省略当前点”、地图处理、多层跳出/继续循环等
		if (!(arr instanceof Array) || arr.length <= 0) return ''; // arr不为数组或长度不为正数，则直接返回空串
		var s = ''; // 编译的结果，可被eval，最好套一层 try{...}catch(e){...} 并在第二对花括弧中特判 e === 'exit'
		for (var i in arr) {
			var data = arr[i];
			switch (data.type) {
				/* 显示文字 Start */
			case 'setText': // 设置剧情文本的属性
				s += 'core.events.setTextAttribute(' + JSON.stringify(data) + ');';
				break;
			case 'tip': // 左上角的气泡提示，这里提供frame参数
				s += 'core.ui.drawTip(core.utils.replaceText("' + data.text + '"),"' + data.icon + '",' + data.frame + ');';
				break;
			case 'win': // 游戏胜利
				s += 'core.events.win(core.utils.replaceText("' + data.reason + '"),' + data.norank + ',' + data.noexit + ');';
				break;
			case 'lose': // 游戏失败
				s += 'core.events.lose(core.utils.replaceText("' + data.reason + '"));';
				break;
			case 'restart': // 重启游戏，瞬间完成且不切换背景音乐
				s += 'core.showStartAnimate(true);';
				break;
				/* 显示文字 End */
				/* 数据相关 Start */
			case 'setValue': // 数值操作，强制不刷新状态栏
				s += 'core.events.setValue("' + data.name + '","' + (data.operator || '=') + '","' + data.value + '");';
				break;
			case 'setEnemy': // 设置某个id的怪物属性
				s += 'core.events.setEnemy("' + data.id + '","' + data.name + '","' + data.value + '","' + (data.operator || '=') + '",null,true);'; // 强制不刷新显伤
				break; // “定点设置/重置/移动怪物属性”等可以填多个坐标的事件还在研究
			case 'setEquip': // 设置某个id的装备属性，如果是已经穿在身上的装备则会触发【刷新状态栏】，请务必注意！
				s += 'core.items.setEquip("' + data.id + '","' + data.valueType + '","' + data.name + '","' + data.value + '","' + (data.operator || '=') + '");';
				break;
			case 'setFloor': // 设置某个id或当前层的楼层属性
				s += 'core.status.maps.' + (data.floorId || core.status.floorId) + '.' + data.name + '=' + JSON.stringify(data.value) + ';'; // 强制不刷新状态栏
				break;
			case 'setGlobalAttribute': // 设置全局属性/主样式
				s += 'core.events.setGlobalAttribute("' + data.name + '","' + data.value + '");';
				break;
			case 'setGlobalValue': // 设置全局数值，不建议使用，因为不支持运算符且data.value只能写常数，建议直接写脚本
				s += 'core.values.' + data.name + '=' + data.value + ';';
				break;
			case 'setGlobalFlag': // 设置系统开关，注意不要出现开启“自绘状态栏”却没开启“横屏底部工具栏”的情况，否则横屏工具栏会挤在左下角！
				s += 'core.events.setGlobalFlag("' + data.name + '",' + data.value + ');';
				break;
			case 'setNameMap': // 设置文件别名，并计入存档
				s += 'core.events.setNameMap("' + data.name + '","' + (data.value || '') + '");';
				break;
			case 'update': // 刷新状态栏和地图显伤
				s += 'core.updateStatusBar(' + data.doNotCheckAutoEvents + ');';
				break;
			case 'loadEquip':
			case 'unloadEquip':
				s += 'core.items.' + data.type + '(' + (data.id ? '"' + data.id + '"' : data.pos) + ');'; // 穿脱装备
				break;
			case 'openShop':
			case 'disableShop':
				s += 'core.plugin.setShopVisited("' + data.id + '",' + (data.type.charAt(0) == 'o') + ');'; // 开关全局商店，注意这里不支持设为启用后立即打开
				break;
			case 'setHeroIcon': // 更改勇士行走图
				s += 'core.events.setHeroIcon("' + data.name + '",true);'; // 强制不重绘
				break;
			case 'follow':
			case 'unfollow':
				s += 'core.events.' + data.type + '("' + (data.name || '') + '");'; // 跟随者入队/离队，会触发勇士重绘
				break;
				/* 数据相关 End */
				// 地图处理类除了战斗、开门、移动、跳跃，都可以写多个坐标，而这四个是异步的，因此全都摸了
				/* 事件控制 Start */
			case 'if': // 条件分歧
				s += 'if(core.utils.calValue("' + data.condition + '")){' + this.compile(data['true']) + '}';
				if (data['false']) s += 'else{' + this.compile(data['false']) + '}'; // “否则”分支
				break;
			case 'switch': // 多重分歧，使用匿名函数闭包防止“判别值”的作用域污染，同时使得“跳出”能够用 return 关键字实现。
				s += '(function(){var key=core.utils.calValue("' + data.condition + '");'; // “判别值”只计算一次
				for (var i in data.caseList) {
					s += 'if(' + (data.caseList[i].case != 'default' ? 'core.utils.calValue("' + data.caseList[i].case+'")===key' : 'true') + '){';
					s += this.compile(data.caseList[i].action) + (data.caseList[i].nobreak ? '' : 'return') + '}';
				}
				s += '})();';
				break;
			case 'for': // 计数循环遍历
				var temp = "'@temp@" + data.name.substring(5) + "'",
					step = core.utils.calValue(data.step); // 循环变量的flag名和步长
				s += 'for(core.setFlag(' + temp + ',core.utils.calValue("' + data.from + '"));';
				if (step) s += 'core.getFlag(' + temp + ',0)' + (step > 0 ? '<=' : '>=') + 'core.utils.calValue("' + data.to + '")';
				s += ';core.addFlag(' + temp + ',' + step + ')){' + this.compile(data.data) + '}';
				break;
			case 'forEach': // 数组循环遍历
				var listName = "'@temp@forEach@" + data.name.substring(5) + "'";
				s += 'for(core.setFlag(' + listName + ',core.clone(' + JSON.stringify(data.list) + '));core.getFlag(' + listName + ',[]).length>0;){core.setFlag(';
				s += ("'@temp@" + data.name.substring(5) + "'") + ',core.getFlag(' + listName + ',[]).shift());' + this.compile(data.data) + '}';
				break;
			case 'while': // 前置条件循环
				s += 'while(core.utils.calValue("' + data.condition + '")){' + this.compile(data['true']) + '}';
				break;
			case 'dowhile': // 后置条件循环
				s += 'do{' + this.compile(data['true']) + '}while(core.utils.calValue("' + data.condition + '"));';
				break;
			case 'break':
			case 'continue':
				s += data.type + ';'; // 跳出/提前结束本轮的最内层循环，这里不支持指定层数
				break;
			case 'exit': // 立刻结束当前事件，直接抛出异常
				s += "throw 'exit';";
				break;
				/* 事件控制 End */
				/* 特效表现 Start */
			case 'stopAsync': // 停止所有异步事件
			case 'showStatusBar': // 显示/隐藏状态栏
			case 'hideStatusBar':
				s += 'core.' + data.type + '(' + data.toolbox + ');';
				break;
			case 'animate': // 播放动画，强制不等待执行完毕，位置不填视为勇士
				if (!data.loc || data.loc == 'hero') s += 'core.maps.drawHeroAnimate("' + data.name + '");';
				else s += 'core.drawAnimate("' + data.name + '",' + 'core.calValue("' + data.loc[0] + '"),' + 'core.calValue("' + data.loc[1] + '"),' + data.alignWindow + ');';
				break;
			case 'stopAnimate': // 停止所有动画，可以选择是否执行回调（例如不执行回调从而让自我回调的循环动画彻底停止）
				s += 'core.stopAnimate(null,' + data.doCallback + ');';
				break;
			case 'lockViewport': // 锁定/解锁视角
				s += 'core.setFlag("__lockViewport__",' + data.lock + ');';
				break;
			case 'setHeroOpacity': // 设置勇士不透明度，瞬间完成，强制不重绘
				s += 'core.setFlag("__heroOpacity__",' + data.opacity + ');';
				break;
			case 'setCurtain': // 更改画面色调，瞬间完成
				data.color = JSON.stringify(data.color);
				s += 'core.clearMap("curtain");core.fillRect("curtain",0,0,core.__PX_WIDTH__,core.__PX_HEIGHT__,core.arrayToRGBA(core.status.curtainColor=';
				s += (data.color || 'core.status.thisMap.color') + '||[0,0,0,0]));'
				s += 'if(!' + data.color + '||' + data.keep + ')core.setFlag("__color__",' + data.color + ');';
				break;
			case 'setWeather': // 更改天气
				s += data.name ? 'core.setWeather("' + data.name + '",' + data.level + ');' : 'core.setWeather();';
				s += 'if(' + data.keep + ')core.setFlag("__weather__",["' + data.name + '",' + data.level + ']);else core.removeFlag("__weather__");';
				break;
			case 'autoSave': // 自动存档，强制不提示，且不能无视下面的禁止存档状态
				s += 'core.control.autosave();';
				break;
			case 'forbidSave': // 是否禁止存档
				s += 'core.setFlag("__forbidSave__",' + data.forbid + ');';
				break;
				/* 特效表现 End */
				/* 音像处理 Start */
			case 'showGif': // 显示或清空动图
				if (data.loc) s += 'core.events.showGif("' + (data.name || '') + '",' + 'core.calValue("' + data.loc[0] + '"),' + 'core.calValue("' + data.loc[1] + '"));';
				else s += 'core.events.showGif("' + (data.name || '') + '");'
				break;
			case 'playBgm': // 播放背景音乐
				s += 'core.playBgm("' + data.name + '",' + data.startTime + ');core.setFlag("__bgm__",' + (data.keep ? '"' + data.name + '"' : null) + ');';
				break;
			case 'pauseBgm': // 暂停/继续背景音乐
			case 'resumeBgm':
			case 'loadBgm': // 预加载/释放背景音乐
			case 'freeBgm':
				s += 'core.' + data.type + '(' + (data.name ? '"' + data.name + '"' : data.resume) + ');'
				break;
			case 'playSound': // 播放音效
				s += 'if(' + data.stop + ')core.stopSound();core.playSound("' + data.name + '",' + data.pitch + ');';
				break;
			case 'stopSound': // 停止所有音效
				s += 'core.control.stopSound();';
				break;
			case 'setVolume': // 设置bgm音量，瞬间完成
				s += 'core.setFlag("__volume__",' + (data.value = core.utils.clamp(parseInt(data.value) / 100, 0, 1)) + ');core.setVolume(flags.__volume__,0);';
				break;
			case 'setBgmSpeed': // 更改背景音乐播放速度，可以选择是否同时改变音调（由勾选框改为下拉框，确保 null false true 三种值都有效）
				s += 'core.setBgmSpeed(' + data.value + ',' + data.pitch + ');';
				break;
				/* 音像处理 End */
			case 'function': // 原生js脚本，data.function 已经是匿名函数了，直接闭包即可
				s += '(' + data.function+')();';
				break;
			case 'previewUI': // UI绘制预览
				s += this.compile(data.action);
				break;
			default: // UI绘制
				if (core.ui['_uievent_' + data.type]) s += 'core.ui._uievent_' + data.type + '(' + JSON.stringify(data) + ');';
			}
		}
		return s;
	}
},
    "initGameData": function () {
	// 在此增加新插件
	core.plugin.initGameData = function () {

		core.status.hero.flags.useEnemyInfoDisplay = true;
		core.status.hero.items.constants = { book: 1, fly: 1 }
		var gjm = [""]
		var gjm_ = [
			"01495", "305836qwe", "alex", "bdf", "BerylliuMM", "box", "castor_v_pollux", "cyf", "CZERNY_Op.740", "DCleanMeow", "Fab777", "freudia", "Kyuuri", "lilie500", "LOL解说：雷霆", "NekoChocolate", "qweasz687", "Skylink", "Solomonhume", "StarInShadow", "Takanashi_Hinata", "x2c2y4", "Yao Fu",
			"艾之葵", "白露久远", "北海小羊", "冰语の梦雪", "怠惰", "非寒", "风曦流光", "好丽友派新掌门", "见见", "霖", "鹿间裕贵", "魔塔忠实爱好者", "茉莉花茶", "欧耶", "胖伯", "千夜", "前往饿啊是", "乾隆汽车", "若愚", "上财mary随便拆拆", "食猫兽杨子默", "水塔製作員", "太难了", "婉约诗人", "我能听见风的声音", "筱米库", "戌亥とこ", "杨超越天下无敌", "银河爱丽丝", "再顶lz", "终末之扉"
		]
		var nickname = [""]
		var nickname_ = [
			"01495", "qwe", "alex", "bdf", "B", "box", "c", "cyf", "C", "DC", "Fab", "f", "K", "l", "L", "N", "q", "Sk", "So", "St", "T", "x2", "Y", "艾", "白", "北", "冰", "怠惰", "非寒", "风", "好", "见见", "霖", "鹿", "魔", "茉莉", "欧耶", "胖伯", "千夜", "前", "乾", "若愚", "上财", "食", "水", "太难了", "婉", "听风", "筱", "戌亥", "杨", "银", "再顶", "终末"
		]
		for (var i = gjm_.length; i > 0; i--) {
			var t = core.rand(i);
			gjm.push(gjm_[t]);
			gjm_.splice(t, 1);
			nickname.push(nickname_[t]);
			nickname_.splice(t, 1);
		}
		core.status.hero.flags.nickname = nickname;
		core.status.hero.flags.gjm = gjm;
		var cs = [{}],
			gj = [{}];
		for (var i in gjm)
			if (gjm[i]) {
				cs.push({ nm: gjm[i] + " 1", gj: i, ic: 10, rk: 60, hp: 30000, kj: 10, rkzz: 2, HP: 30000, sc: [], v: [], lin: [] });
				cs.push({ nm: gjm[i] + " 2", gj: i, ic: 6, rk: 45, hp: 20000, kj: 6, rkzz: 1, HP: 20000, sc: [], v: [], lin: [] });
				cs.push({ nm: gjm[i] + " 3", gj: i, ic: 4, rk: 30, hp: 10000, kj: 4, rkzz: 1, HP: 10000, sc: [], v: [], lin: [] });
				cs.push({ nm: gjm[i] + " 4", gj: i, ic: 2, rk: 15, hp: 5000, kj: 2, rkzz: 1, HP: 5000, sc: [], v: [], lin: [] });
				gj.push({
					nm: gjm[i],
					sile: false,
					dd: [],
					yffx: 0,
					yffy: [
						[],
						[0, 0, 0, 4000, 1e4, 2e4],
						[0, 0, 2000, 8000, 2e4, 4.8e4],
						[0, 0, 1e4, 4e4, 7e4, 11e4],
						[0, 3000, 1e4, 6e4],
						[0, 2e4]
					]
				});
			}
		var mil = [
			[],
			[{},
				{ nm: "步兵师", zdl: 15, hp: 10, sd: 1, xh: 32 },
				{ nm: "机械化师", zdl: 25, hp: 20, sd: 1, xh: 48 },
				{ nm: "信息化步兵师", zdl: 50, hp: 40, sd: 2, xh: 64 },
				{ nm: "特种部队", zdl: 90, hp: 80, sd: 3, xh: 108 },
				{ nm: "高科技部队", zdl: 150, hp: 120, sd: 3, xh: 180 }
			],
			[{},
				{ nm: "83式152毫米加农炮", zdl: 60, hp: 5, sd: 3, xh: 60 },
				{ nm: "89式自行火炮", zdl: 100, hp: 10, sd: 3, xh: 100 },
				{ nm: "PLZ-45自行火炮", zdl: 220, hp: 20, sd: 3, xh: 150 },
				{ nm: "WS-3d自行火箭炮", zdl: 320, hp: 20, sd: 3, xh: 200 },
				{ nm: "C-1激光炮", zdl: 400, hp: 30, sd: 3, xh: 240 }
			],
			[{},
				{ nm: "80式坦克", zdl: 40, hp: 120, sd: 6, xh: 120 },
				{ nm: "96式坦克", zdl: 80, hp: 220, sd: 6, xh: 180 },
				{ nm: "99式坦克", zdl: 135, hp: 450, sd: 6, xh: 240 },
				{ nm: "11式坦克", zdl: 200, hp: 810, sd: 6, xh: 320 },
				{ nm: "24式坦克", zdl: 250, hp: 1260, sd: 6, xh: 420 }
			],
			[{},
				{ nm: "东风-13导弹", zdl: 400, hp: 1, sd: 5, xh: 80 },
				{ nm: "东风-22导弹", zdl: 900, hp: 1, sd: 5, xh: 150 },
				{ nm: "东风-35式导弹", zdl: 3000, hp: 1, sd: 5, xh: 220 }
			],
			[{},
				{ nm: "核弹", zdl: 20000, hp: 1, sd: 5, xh: 1500 }
			],
			[],
			[],
			[{},
				{ nm: "工厂", zdl: 0, hp: 0, sd: 0, xh: 100 }
			],
			[{},
				{ nm: "研究所", zdl: 0, hp: 0, sd: 0, xh: 100 }
			],
		]
		core.status.hero.flags.cs = cs;
		core.status.hero.flags.gj = gj;
		core.status.hero.flags.dw = [{}];
		core.status.hero.flags.mil = mil;
		var tu = [
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[1, 2, 5, 6, 9, 10, 0, 13, 14, 17, 18, 21, 22, 0, 25, 26, 29, 30, 33, 34],
			[3, 4, 7, 8, 11, 12, 0, 15, 16, 19, 20, 23, 24, 0, 27, 28, 31, 32, 35, 36],
			[37, 38, 41, 42, 45, 46, 0, 49, 50, 53, 54, 57, 58, 0, 61, 62, 65, 66, 69, 70],
			[39, 40, 43, 44, 47, 48, 0, 51, 52, 55, 56, 59, 60, 0, 63, 64, 67, 68, 71, 72],
			[73, 74, 77, 78, 81, 82, 0, 85, 86, 89, 90, 93, 94, 0, 97, 98, 101, 102, 105, 106],
			[75, 76, 79, 80, 83, 84, 0, 87, 88, 91, 92, 95, 96, 0, 99, 100, 103, 104, 107, 108],
			[109, 110, 113, 114, 117, 118, 0, 121, 122, 125, 126, 129, 130, 0, 133, 134, 137, 138, 141, 142],
			[111, 112, 115, 116, 119, 120, 0, 123, 124, 127, 128, 131, 132, 0, 135, 136, 139, 140, 143, 144],
			[145, 146, 149, 150, 153, 154, 0, 157, 158, 161, 162, 165, 166, 0, 169, 170, 173, 174, 177, 178],
			[147, 148, 151, 152, 155, 156, 0, 159, 160, 163, 164, 167, 168, 0, 171, 172, 175, 176, 179, 180],
			[181, 182, 185, 186, 189, 190, 0, 193, 194, 197, 198, 201, 202, 0, 205, 206, 209, 210, 213, 214],
			[183, 184, 187, 188, 191, 192, 0, 195, 196, 199, 200, 203, 204, 0, 207, 208, 211, 212, 215, 216],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		];
		for (var i = 0; i < tu.length; i++) {
			for (var j = 0; j < tu[i].length; j++) {
				var cityId = tu[i][j];
				if (cityId === 0) continue;
				cs[cityId].x = j;
				cs[cityId].y = i;
			}
		}
		core.status.hero.flags.tu = tu;
		var lt = [];
		for (var i = cs.length; i >= 0; i--) lt.push([]);
		for (var i = cs.length; i >= 0; i--)
			for (var j = cs.length; j >= 0; j--) lt[i].push(0);
		for (var i = 1; i <= 54; i++) {
			for (var j = i * 4 - 3; j <= i * 4; j++)
				for (var k = i * 4 - 3; k <= i * 4; k++) lt[k][j] = lt[j][k] = 1;
			if (i % 9)
				for (var j = i * 4 - 3; j <= i * 4; j++)
					for (var k = i * 4 + 1; k <= i * 4 + 4; k++) lt[k][j] = lt[j][k] = 1;
			if (i <= 45)
				for (var j = i * 4 - 3; j <= i * 4; j++)
					for (var k = i * 4 + 33; k <= i * 4 + 36; k++) lt[k][j] = lt[j][k] = 1;
		}
		core.status.hero.flags.lt = lt;
		core.status.hero.flags.color = [""];
		var zz = [];
		for (var i = gjm.length; i >= 0; i--) zz.push([]);
		for (var i = gjm.length; i >= 0; i--)
			for (var j = gjm.length; j >= 0; j--) zz[i].push(0);
		core.status.hero.flags.zz = zz;
		var LIMIT = 144,
			UPPER = LIMIT * LIMIT * LIMIT;
		for (var i = 1; i <= gjm.length; i++) {
			var value = core.rand(UPPER);
			var r = value % LIMIT + 48;
			value = ~~(value / LIMIT);
			var g = value % LIMIT + 48;
			value = ~~(value / LIMIT);
			var b = value % LIMIT + 48;
			value = ~~(value / LIMIT);
			var colorString = '#' + ("000000" + ((r << 16) + (g << 8) + b).toString(16)).substr(-6);
			core.status.hero.flags.color.push(colorString);
		}
	}
},
	"shimSetting": function() {
	// 轻量化的设定菜单

	// 系统设置中直接显示音乐和画面设置
	core.ui._drawSwitchs = function() {
		core.status.event.id = 'switchs';
		var choices = [
			"音乐： " + (core.musicStatus.bgmStatus ? "[ON]" : "[OFF]"),
			"音效： " + (core.musicStatus.soundStatus ? "[ON]" : "[OFF]"),
			// 显示为 0~10 十挡
			" <     音量：" + Math.round(Math.sqrt(100 * core.musicStatus.userVolume)) + "     > ",
			" <     放缩：" + Math.max(core.domStyle.scale, 1) + "     > ",
			"高清画面： " + (core.flags.enableHDCanvas ? "[ON]" : "[OFF]"),
			"返回主菜单"
		];
		this.drawChoices(null, choices);
	}
	
	core.actions._clickSwitchs = function (x, y) {
		var choices = core.status.event.ui.choices;
		var topIndex = this._getChoicesTopIndex(choices.length);
		var selection = y - topIndex;
		if (x < this.CHOICES_LEFT || x > this.CHOICES_RIGHT) {
			if (selection != 2) return;
		}
		if (selection >= 0 && selection < choices.length) {
			var width = choices[selection].width;
			var leftPos = (core.__PX_WIDTH__ - width) / 2, rightPos = (core.__PX_WIDTH__ + width) / 2;
			var leftGrid = parseInt(leftPos / 32), rightGrid = parseInt(rightPos / 32) - 1;
			core.status.event.selection = selection;
			switch (selection) {
				case 0:
					return this._clickSwitchs_sounds_bgm();
				case 1:
					return this._clickSwitchs_sounds_se();
				case 2:
					if (x == leftGrid || x == leftGrid + 1) return this._clickSwitchs_sounds_userVolume(-1);
					if (x == rightGrid || x == rightGrid + 1) return this._clickSwitchs_sounds_userVolume(1);
					return;
				case 3:
					if (x == leftGrid || x == leftGrid + 1) return this._clickSwitchs_display_setSize(-1);
					if (x == rightGrid || x == rightGrid + 1) return this._clickSwitchs_display_setSize(1);
					return;
				case 4:
					core.playSound('确定');
					return this._clickSwitchs_display_enableHDCanvas();
				case 5:
					core.status.event.selection = 0;
					core.playSound('取消');
					core.ui._drawSettings();
					return;
			}
		}
	}

	core.actions._clickSwitchs_sounds_se = function () {
		core.musicStatus.soundStatus = !core.musicStatus.soundStatus;
		core.setLocalStorage('soundStatus', core.musicStatus.soundStatus);
		core.playSound('确定');
		core.ui._drawSwitchs();
	}
	
	core.actions._clickSwitchs_sounds_userVolume = function (delta) {
		var value = Math.round(Math.sqrt(100 * core.musicStatus.userVolume));
		if (value == 0 && delta < 0) return;
		core.musicStatus.userVolume = core.clamp(Math.pow(value + delta, 2) / 100, 0, 1);
		//audioContext 音效 不受designVolume 影响
		if (core.musicStatus.gainNode != null) core.musicStatus.gainNode.gain.value = core.musicStatus.userVolume;
		if (core.musicStatus.playingBgm) core.material.bgms[core.musicStatus.playingBgm].volume = core.musicStatus.userVolume * core.musicStatus.designVolume;
		core.setLocalStorage('userVolume', core.musicStatus.userVolume);
		core.playSound('确定');
		core.ui._drawSwitchs();
	}
	
	core.actions._clickSwitchs_display_setSize = function (delta) {
		core.setDisplayScale(delta);
		var currentRatio = Math.max(window.devicePixelRatio || 1, core.domStyle.scale);
		if (currentRatio > core.domStyle.ratio) {
			core.drawTip("需刷新页面以调整UI清晰度",'settings');
		}
		core.ui._drawSwitchs();
	}
	
	core.actions._clickSwitchs_display_enableHDCanvas = function () {
		core.flags.enableHDCanvas = !core.flags.enableHDCanvas;
		core.setLocalStorage('enableHDCanvas', core.flags.enableHDCanvas);
		core.drawTip("开关高清UI，需刷新页面方可生效",'settings');
		core.ui._drawSwitchs();
	}

	////// 系统设置界面时，放开某个键的操作 //////
	core.actions._keyUpSwitchs = function (keycode) {
		if (keycode == 27 || keycode == 88) {
			core.status.event.selection = 0;
			core.playSound('取消');
			core.ui._drawSettings();
			return;
		}
		if (keycode == 37) {
			switch (core.status.event.selection) {
				case 2: core.playSound('确定'); return this._clickSwitchs_sounds_userVolume(-1);
				case 3: core.playSound('确定'); return this._clickSwitchs_display_setSize(1);
			}
		} else if (keycode == 39) {
			switch (core.status.event.selection) {
				case 2: core.playSound('确定'); return this._clickSwitchs_sounds_userVolume(1);
				case 3: core.playSound('确定'); return this._clickSwitchs_display_setSize(1);
			}
		}
		this._selectChoices(core.status.event.ui.choices.length, keycode, this._clickSwitchs);
	}

	// 去掉浏览地图，将录像回放设为一级菜单
	core.ui._drawSettings = function () {
		core.status.event.id = 'settings';
		this.drawChoices(null, [
			"系统设置", "虚拟键盘", "存档笔记", "同步存档", "录像回放", "游戏信息", "返回标题", "返回游戏"
		]);
	}
	
	core.actions._clickSettings = function (x, y) {
		if (x < this.CHOICES_LEFT || x > this.CHOICES_RIGHT) return;
		var choices = core.status.event.ui.choices;
		var topIndex = this._getChoicesTopIndex(choices.length);
		if (y >= topIndex && y < topIndex + choices.length) {
			var selection = y - topIndex;
			core.status.event.selection = selection;
			switch (selection) {
				case 0:
					core.status.event.selection = 0;
					core.playSound('确定');
					core.ui._drawSwitchs();
					break;
				case 1:
					// core.playSound('确定');
					core.ui._drawKeyBoard();
					break;
				case 2:
					core.status.event.selection = 0;
					core.playSound('确定');
					core.ui._drawNotes();
					break;
				case 3:
					core.status.event.selection = 0;
					core.playSound('确定');
					core.ui._drawSyncSave();
					break;
				case 4:
					core.status.event.selection = 0;
					core.playSound('确定');
					core.ui._drawReplay();
					break;
				case 5:
					core.status.event.selection = 0;
					core.playSound('确定');
					core.ui._drawGameInfo();
					break;
				case 6:
					return core.confirmRestart();
				case 7:
					core.playSound('取消');
					core.ui.closePanel();
					break;
			}
		}
		return;
	}
},
	"click": function() {
		
	core.control.setAutomaticRoute = function (destX, destY, stepPostfix) {
		var cityId = flags.tu[destY-1][destX];
		if (cityId === 0) return;
		var city = flags.cs[cityId];
		if (!flags.xzgj) {
			flags.selection = city.gj;
			extendUI.update();
		} else {
			extendUI.execCommand("sidebar/goto", {
				link: "CityDetail",
				params: {
					id: cityId,
				}
			});
		}
	}
	core.control._setAutomaticRoute_drawRoute = function (moveStep) {

	}
    core.unregisterAction('ondown', '_sys_ondown');
    core.registerAction('ondown', '_sys_ondown', function (x, y, px, py) {
		if (core.status.lockControl) return false;
		core.status.downTime = new Date();
		core.deleteCanvas('route');
		var pos = {'x': parseInt((px + core.bigmap.offsetX) / 32), 'y': parseInt((py + core.bigmap.offsetY) / 32)};
		core.status.stepPostfix = [];
		core.status.stepPostfix.push(pos);
		// core.fillRect('ui', pos.x*32+12-core.bigmap.offsetX,pos.y*32+12-core.bigmap.offsetY,8,8, '#bfbfbf');
	
		clearTimeout(core.timeout.onDownTimeout);
		core.timeout.onDownTimeout = null;
		core.status.preview.prepareDragging = false;
		if (!core.hasFlag('__lockViewport__') && (core.status.thisMap.width > core.__WIDTH__ || core.status.thisMap.height > core.__HEIGHT__)) {
			core.status.preview.prepareDragging = true;
			core.status.preview.px = px;
			core.status.preview.py = py;
			core.timeout.onDownTimeout = setTimeout(function () {
				core.clearMap('ui');
				core.status.preview.prepareDragging = false;
				core.status.preview.enabled = true;
				core.status.preview.dragging = true;
				core.drawTip('已进入预览模式，可直接拖动大地图','upFloor');
				core.status.stepPostfix = [];
			}, 500);
		} 
	}, 0);
    core.unregisterAction('onmove', '_sys_onmove');
    core.registerAction('onmove', '_sys_onmove', function (x, y, px, py) {
		if (core.status.lockControl) return false;
	
		if (core.status.preview.dragging) {
			core.setViewport(core.bigmap.offsetX - px + core.status.preview.px, core.bigmap.offsetY - py + core.status.preview.py);
			core.status.preview.px = px;
			core.status.preview.py = py;
			return true;
		}
		if (core.status.preview.prepareDragging) {
			if (Math.abs(px - core.status.preview.px) <= 20 && Math.abs(py - core.status.preview.py) <= 20) 
				return true;
			else core.status.preview.prepareDragging = false;
		}
	
		clearTimeout(core.timeout.onDownTimeout);
		core.timeout.onDownTimeout = null;
	
		if ((core.status.stepPostfix || []).length > 0) {
			var pos = {'x': parseInt((px + core.bigmap.offsetX) / 32), 'y': parseInt((py + core.bigmap.offsetY) / 32)};
			var pos0 = core.status.stepPostfix[core.status.stepPostfix.length - 1];
			var directionDistance = [pos.y - pos0.y, pos0.x - pos.x, pos0.y - pos.y, pos.x - pos0.x];
			var max = 0, index = 4;
			for (var ii = 0; ii < 4; ii++) {
				if (directionDistance[ii] > max) {
					index = ii;
					max = directionDistance[ii];
				}
			}
			pos = [{'x': 0, 'y': 1}, {'x': -1, 'y': 0}, {'x': 0, 'y': -1}, {'x': 1, 'y': 0}, false][index]
			if (pos) {
				pos.x += pos0.x;
				pos.y += pos0.y;
				core.status.stepPostfix.push(pos);
				// core.fillRect('ui', pos.x*32+12-core.bigmap.offsetX,pos.y*32+12-core.bigmap.offsetY,8,8, '#bfbfbf');
			}
		}
		return true;
	}, 0);
},
	"gameLogic": function() {

	function updateStat() {
		var playerIC = 0,
			playerRD = 0,
			globalIC = 0,
			globalRD = 0;
		for (var i = 1; i < flags.cs.length; i++) {
			var city = flags.cs[i];
			if (city.gj == flags.xzgj) {
				playerIC += city.ic, playerRD += city.kj;
			}
			globalIC += city.ic, globalRD += city.kj;
		}
		core.status.hero.atk = playerIC, core.status.hero.def = playerRD;
		core.status.hero.mdef = globalIC, core.status.hero.exp =globalRD;
	}

	var startGame = function() {
		flags.xzgj = flags.selection;
		updateStat();
		extendUI.update();
	};

	extendUI.registerCommand("startGame", function() {
		core.status.route.push("start:"+flags.selection);
		startGame();
	});

	core.registerReplayAction("startGame", function(action) {
		if (!action.startsWith("start:")) return false;
		flags.selection = action.substring(6);
		extendUI.update();
		setTimeout(function() {
			startGame();
			setTimeout(function() {
				core.replay();
			}, core.control.__replay_getTimeout());
		}, core.control.__replay_getTimeout());
	});
	
	function nextTurn() {
		// money 代表时间 (很奇怪)
		core.status.hero.money++;
		
		// 30 回合前不宣战, 30回合之后每个AI 在未宣战时会选择一个国家开战
		(function() {
			if (core.status.hero.money >= 30) {
				var _ = [],
					__ = [0];
				for (var i = 0; i < flags.gj.length; i++) _.push([]);
				for (var i = 0; i < flags.gj.length; i++)
					for (var j = 0; j < flags.gj.length; j++) _[i].push(0);
				for (var i = 1; i < flags.cs.length; i++) {
					for (var j = 1; j < flags.cs.length; j++)
						if (flags.lt[i][j] && flags.cs[i].gj != flags.cs[j].gj) _[flags.cs[i].gj][flags.cs[j].gj] = 1;
				}
				for (var i = 1; i < flags.gj.length; i++) {
					var t = [];
					for (var j = 1; j < flags.gj.length; j++)
						if (_[i][j] && !flags.zz[i][j]) t.push(j);
					for (var j = 1; j < flags.gj.length; j++)
						if (_[i][j] && flags.zz[i][j]) t = [];
					if (i == flags.xzgj) t = [];
					if (t.length) __.push(t[core.rand(t.length)]);
					else __.push(0);
				}
				var s = "",
					cnt = 0;
				_ = [];
				for (var i = 1; i < flags.gj.length; ++i)
					if (__[i] && core.rand(20) == 0) {
						s += flags.gj[i].nm + "和" + flags.gj[__[i]].nm + "宣战" + String.fromCharCode(10);
						cnt += 1;
						if (cnt >= 20) _.push(s), cnt = 0, s = "";
						flags.zz[i][__[i]] = flags.zz[__[i]][i] = 1;
					}
				if (s) _.push(s);
				core.insertAction(_);
			}
		})();

		// 处理死亡国家
		(function() {
			flags.city = [0];
			for (var i = 1; i < flags.gj.length; i++) flags.city.push(0);
			for (var i = 1; i < flags.cs.length; i++) flags.city[flags.cs[i].gj] += 1;
			for (var i = 1; i < flags.cs.length; i++)
				if (flags.cs[i].hp > 0 && flags.cs[i].hp < flags.cs[i].HP) flags.cs[i].hp += Math.max(10, Math.floor((flags.cs[i].HP - flags.cs[i].hp) / 100));
			for (var i = 1; i < flags.gj.length; i++)
				if (flags.city[i] == 0 && !flags.gj[i].sile) {
					flags.gj[i].sile = 1;
					core.insertAction("         " + flags.gj[i].nm + "  战败!");
				}
			for (var i = 1; i < flags.dw.length; i++)
				if (flags.gj[flags.dw[i].gj].sile) flags.dw[i].hp = -1;
		})();
		
		if (flags.city[flags.xzgj] >= flags.cs.length-1) {
			core.status.hero.hp = 1000 - core.status.hero.money;
			core.win("恭喜 " + flags.gj[flags.xzgj].nm + " 胜利！", true);
		}
		if (flags.gj[flags.xzgj].sile) {
			core.status.hero.hp = 0;
			for (var i = 1; i < flags.gj.length; i++)
				if (!flags.gj[i].sile) core.status.hero.hp -= 1;
			core.win("你死了！", true);
		}

		// 处理转移
		(function() {
			for (var i = 1; i < flags.cs.length; i++) flags.cs[i].lin = [];
			for (var i = 1; i < flags.dw.length; i++)
				if (flags.dw[i].hp > 0 && flags.dw[i].mbsj <= 0 && flags.dw[i].mb > 0 && flags.cs[flags.dw[i].mb].gj != flags.dw[i].gj) {
					flags.cs[flags.dw[i].mb].lin.push(i);
				}
			for (var i = 1; i < flags.cs.length; i++) flags.cs[i].lin.sort(function (a, b) { return flags.dw[a].mbsj - flags.dw[b].mbsj; });
			var _ = "";
			for (var i = 1; i < flags.cs.length; i++)
				if (flags.cs[i].lin.length > 0 && flags.cs[i].v.length == 0 && flags.cs[i].hp <= 0 && flags.dw[flags.cs[i].lin[0]].mbsj <= 0) {
					flags.cs[i].hp = 1;
					flags.cs[i].gj = flags.dw[flags.cs[i].lin[0]].gj;
					_ += ("     " + flags.gj[flags.cs[i].gj].nm + "  占领了  " + flags.cs[i].nm + "  ！") + String.fromCharCode(10);
					flags.cs[i].sc = [];
				}
			if (_) core.insertAction(_);
			for (var i = 1; i < flags.dw.length; i++)
				if (flags.dw[i].hp > 0) {
					if (flags.dw[i].mbsj > 0) flags.dw[i].mbsj -= flags.mil[flags.dw[i].zl][flags.dw[i].xh].sd;
					else if (flags.dw[i].mb) flags.dw[i].mbsj -= 10;
					if (flags.dw[i].mbsj < 0) {
						if (flags.zz[flags.dw[i].gj][flags.cs[flags.dw[i].mb].gj]) continue;
						if (flags.dw[i].zl >= 4) flags.dw[i].mb = flags.dw[i].mbsj = 0, flags.gj[flags.dw[i].gj].dd.push(i);
						else if (flags.cs[flags.dw[i].mb].gj == flags.dw[i].gj) flags.cs[flags.dw[i].mb].v.push(i), flags.dw[i].mb = flags.dw[i].mbsj = 0;
						else {
							for (var k = 1; k < flags.cs.length; k++)
								if (flags.cs[k].gj == flags.dw[i].gj) flags.dw[i].mb = k, flags.dw[i].mbsj = 10;
						}
					}
				}
		})();
		
		// 处理科研
		(function() {
			for (var i = 1; i < flags.gj.length; i++) {
				var kynl = 0,
				yffx = flags.gj[i].yffx;
				var f1 = flags.gj[i].yffy[1][5] < 0,
					f2 = flags.gj[i].yffy[2][5] < 0,
					f3 = flags.gj[i].yffy[3][5] < 0,
					f4 = flags.gj[i].yffy[4][3] < 0,
					f5 = flags.gj[i].yffy[5][1] < 0;
				if (yffx == 0) yffx = 3;
				if (yffx == 5 && f5) yffx = 1;
				if (yffx == 1 && f1) yffx = 2;
				if (yffx == 2 && f2) yffx = 3;
				if (yffx == 3 && f3) yffx = 4;
				if (yffx == 4 && f4) yffx = 1;
				if (yffx == 1 && f1) yffx = 2;
				if (yffx == 2 && f2) yffx = 3;
				if (yffx == 3 && f3) yffx = 4;
				if (yffx == 4 && f4) yffx = 5;
				if (yffx == 5 && f5) yffx = 0;
				flags.gj[i].yffx = yffx;
				if (yffx) {
					var now = 1;
					while (flags.gj[i].yffy[yffx][now] <= 0) now = now + 1;
				}
				for (var j = 1; j < flags.cs.length; j++)
					if (flags.cs[j].gj == i) kynl += flags.cs[j].kj;
				flags.gj[i].yffy[yffx][now] -= kynl;
				if (flags.gj[i].yffy[yffx][now] <= 0 && i == flags.xzgj) {
					// 消息提示
				}
			}
		})();

		// 处理生产/人口增长
		(function() {
			var str = "";
			for (var i = 1; i < flags.cs.length; i++) {
				flags.cs[i].rk += flags.cs[i].rkzz;
				if (flags.cs[i].sc.length > 0) {
					flags.cs[i].sc[0].ys -= flags.cs[i].ic;
					if (flags.cs[i].sc[0].ys <= 0 && flags.cs[i].rk >= [10, 10, 10, 10, 10, 10, 10, 10, 100, 50][flags.cs[i].sc[0].lx]) {
						if (flags.cs[i].sc[0].lx == 8) {
							flags.cs[i].ic += 1;
							flags.cs[i].rk -= 100;
							if (flags.cs[i].gj == flags.xzgj) str += "   工厂   于    " + flags.cs[i].nm + " 制造厂  生产完成 ！" + String.fromCharCode(10);
						} else if (flags.cs[i].sc[0].lx == 9) {
							flags.cs[i].kj += 1;
							flags.cs[i].rk -= 50;
							if (flags.cs[i].gj == flags.xzgj) str += "  科研所  于    " + flags.cs[i].nm + " 制造厂  生产完成 ！" + String.fromCharCode(10);
						} else if (flags.cs[i].sc[0].lx >= 4) {
							flags.cs[i].rk -= 10;
							flags.dw.push({
								zl: flags.cs[i].sc[0].lx,
								xh: flags.cs[i].sc[0].xh,
								mb: 0,
								mbsj: 0,
								hp: flags.mil[flags.cs[i].sc[0].lx][flags.cs[i].sc[0].xh].hp,
								gj: flags.cs[i].gj
							});
							flags.gj[flags.cs[i].gj].dd.push(flags.dw.length - 1);
							if (flags.cs[i].gj == flags.xzgj) str += "   " + flags.mil[flags.cs[i].sc[0].lx][flags.cs[i].sc[0].xh].nm + "   于    " + flags.cs[i].nm + " 制造厂  生产完成 ！" + String.fromCharCode(10);
						} else {
							flags.cs[i].rk -= 10;
							flags.dw.push({
								zl: flags.cs[i].sc[0].lx,
								xh: flags.cs[i].sc[0].xh,
								mb: 0,
								mbsj: 0,
								hp: flags.mil[flags.cs[i].sc[0].lx][flags.cs[i].sc[0].xh].hp,
								gj: flags.cs[i].gj
							});
							flags.cs[i].v.push(flags.dw.length - 1);
							if (flags.cs[i].gj == flags.xzgj) str += "   " + flags.mil[flags.cs[i].sc[0].lx][flags.cs[i].sc[0].xh].nm + "   于    " + flags.cs[i].nm + " 制造厂  生产完成 ！" + String.fromCharCode(10);
						}
						var ys = flags.cs[i].sc[0].ys;
						flags.cs[i].sc.splice(0, 1);
						if (flags.cs[i].sc.length > 0) flags.cs[i].sc[0].ys += ys;
					}
				}
			}
			if (str) core.insertAction(str);
			for (var i = 1; i < flags.cs.length; i++) flags.cs[i].lin = [];
			for (var i = 1; i < flags.dw.length; i++)
				if (flags.dw[i].hp > 0 && flags.dw[i].mbsj <= 0 && flags.dw[i].mb > 0 && flags.cs[flags.dw[i].mb].gj != flags.dw[i].gj) {
					flags.cs[flags.dw[i].mb].lin.push(i);
				}
			for (var i = 1; i < flags.cs.length; i++) flags.cs[i].lin.sort(function (a, b) { return flags.dw[a].mbsj - flags.dw[b].mbsj; });
		})();

		// 战争！
		(function() {
			for (let i = 1; i < flags.cs.length; i++) {
				flags._ = i;
				if (flags.cs[flags._].lin.length === 0) {
					if (flags.cs[flags._].hp < 0) flags.cs[flags._].hp = 1;
					if (flags.cs[flags._].hp < 10) flags.cs[flags._].hp += 10;
					else if (flags.cs[flags._].hp < flags.cs[flags._].HP) flags.cs[flags._].hp += Math.max(500, Math.floor((flags.cs[flags._].HP - flags.cs[flags._].hp) / 30));
					continue;
				}
				
				flags.show = flags.cs[flags._].gj == flags.xzgj;
				for (let i = 0; i < flags.cs[flags._].lin.length; i++)
					if (flags.dw[flags.cs[flags._].lin[i]].gj == flags.xzgj) flags.show = true;
				if (flags.show) {

				}
				let t = flags.cs[flags._].lin,
					u = flags.cs[flags._].v;
				let __ = [];
				for (let i = 0; i < t.length; i++) {
					let zdl = flags.mil[flags.dw[t[i]].zl][flags.dw[t[i]].xh].zdl;
					if (flags.dw[t[i]].zl < 4) continue;
					if (flags.dw[t[i]].zl == 5) __.push("${flags.cs[flags._].nm} 受到了来自 " + flags.gj[flags.dw[t[i]].gj].nm + "  的核打击！ ");
					if (flags.cs[flags._].hp >= zdl / 10) flags.cs[flags._].hp -= zdl;
					else {
						console.log('ATTACK');
						flags.cs[flags._].hp = 0;
						let count = flags.dw[t[i]].zl == 5 ? 50 : [0, 1, 3, 10][flags.dw[t[i]].xh];
						let damage = flags.dw[t[i]].zl == 5 ? 400 : 300;
						for (let j = 0, k = 0; j < u.length && k < count; j++) {
							if (flags.dw[u[j]].hp > 0) flags.dw[u[j]].hp -= damage, k += 1;
						}
					}
					flags.dw[t[i]].hp = 0;
				}
				for (let i = 0; i < t.length; i++) {
					if (flags.dw[t[i]].zl > 3) continue;
					let zdl = flags.mil[flags.dw[t[i]].zl][flags.dw[t[i]].xh].zdl;
					if (u.length == 0 || flags.cs[flags._].hp > 0 && core.rand(5) < 3) { flags.cs[flags._].hp -= zdl; continue; }
					let v = [];
					for (let j = 0; j < u.length; j++)
						if (flags.dw[u[j]].hp > 0) v.push(u[j]);
					if (v.length == 0) { flags.cs[flags._].hp -= zdl; continue; }
					let w = v[core.rand(v.length)];
					zdl = Math.round(zdl * (0.9 + 0.2 * core.rand()));
					flags.dw[w].hp -= zdl;
				}
				for (let i = 0; i < u.length; i++) {
					let zdl = flags.mil[flags.dw[u[i]].zl][flags.dw[u[i]].xh].zdl;
					let v = [];
					for (let j = 0; j < t.length; j++)
						if (flags.dw[t[j]].hp > 0) v.push(t[j]);
					if (v.length == 0) continue;
					let w = v[core.rand(v.length)];
					zdl = Math.round(zdl * (0.9 + 0.2 * core.rand()));
					flags.dw[w].hp -= zdl;
				}
				if (flags.show) {
					//lin
					let v = [],
						w = 25;
					for (let i = 0; i < t.length; i++) {
						let s = "";
						if (flags.dw[t[i]].hp <= 0 && flags.dw[t[i]].zl < 4) {
							if (flags.cs[flags._].gj == flags.xzgj) s = "  对方损失  " + flags.mil[flags.dw[t[i]].zl][flags.dw[t[i]].xh].nm + "  ！" + String.fromCharCode(10);
							else if (flags.dw[t[i]].gj == flags.xzgj) s = "  我方损失  " + flags.mil[flags.dw[t[i]].zl][flags.dw[t[i]].xh].nm + "  ！" + String.fromCharCode(10);
						}
						if (s) {
							if (w >= 25) v.push(s), w = 1;
							else v[v.length - 1] += s, w += 1;
						}

					}
					for (let i = 0; i < v.length; i++) __.push(v[i]);
					v = [], w = 25;
					for (let i = 0; i < u.length; i++) {
						let s = "";
						if (flags.dw[u[i]].hp <= 0 && flags.dw[u[i]].zl < 4) {
							if (flags.cs[flags._].gj == flags.xzgj) s = "  我方损失  " + flags.mil[flags.dw[u[i]].zl][flags.dw[u[i]].xh].nm + "  ！" + String.fromCharCode(10);
							else s = "  对方损失  " + flags.mil[flags.dw[u[i]].zl][flags.dw[u[i]].xh].nm + "  ！" + String.fromCharCode(10);
						}
						if (s) {
							if (w >= 25) v.push(s), w = 1;
							else v[v.length - 1] += s, w += 1;
						}

					}
					for (let i = 0; i < v.length; i++) __.push(v[i]);
					console.log(__);
					core.insertAction(__);
					core.fillText('test2', "      " + (flags.cs[flags._].gj == flags.xzgj ? "我" : "对") + "方城市【" + flags.cs[flags._].nm + " (" + flags._ + ")" + "】防御值剩余： " + flags.cs[flags._].hp, 0, 320 - 5, [255, 255, 255, 1], "20px Arial");
				}
				let v = [],
					w = [];
				for (let i = 0; i < t.length; i++)
					if (flags.dw[t[i]].hp > 0) v.push(t[i]);
				for (let i = 0; i < u.length; i++)
					if (flags.dw[u[i]].hp > 0) w.push(u[i]);
				flags.cs[flags._].lin = v, flags.cs[flags._].v = w;
			}
		})();

		// AI
		(function() {
			for (var i = 1; i < flags.gj.length; i++)
				if (i != flags.xzgj && !flags.gj[i].sile) {
					var city = [],
						cnt = 0;
					for (var j = 1; j < flags.cs.length; j++)
						if (flags.cs[j].gj == i) {
							var kyzz = 0;
							cnt = cnt + 1;
							for (var k = 1; k < flags.cs.length; k++)
								if (flags.lt[k][j] && flags.zz[flags.cs[j].gj][flags.cs[k].gj] && (kyzz == 0 || flags.cs[k].hp < flags.cs[kyzz].hp)) kyzz = k;
							if (kyzz > 0 || flags.cs[j].lin.length > 0) city.push(j);
						}
					if (city.length == 0) {
						for (var j = 1; j < flags.cs.length; j++)
							if (flags.cs[j].gj == i) city.push(j);
					}
					// 科研
					flags.gj[i].yffx = core.rand(4) + 1;
					if (flags.gj[i].yffx <= 2 && flags.gj[i].yffy[5][1] > 0) flags.gj[i].yffx = 5;
					for (var j = 1; j < flags.cs.length; j++)
						if (flags.cs[j].gj == i) {
							var kyzz = 0;
							for (var k = 1; k < flags.cs.length; k++)
								if (flags.lt[k][j] && flags.zz[flags.cs[j].gj][flags.cs[k].gj] && (kyzz == 0 || flags.cs[k].hp < flags.cs[kyzz].hp)) kyzz = k;
							if (kyzz && flags.gj[i].dd.length > 0 && core.rand(5) < 2 && (flags.cs[kyzz].hp > 4000 || flags.cs[kyzz].v.length > 5)) {
								flags.dw[flags.gj[i].dd[0]].mb = kyzz;
								flags.dw[flags.gj[i].dd[0]].mbsj = 20;
								flags.gj[i].dd.splice(0, 1);
							}
							if (!kyzz && !flags.cs[j].lin.length) {
								var l = Math.floor((flags.cs[j].v.length - 1) / 2);
								if (l > 0 && cnt > 2) {
									for (var k = 0; k < l; k++) {
										flags.dw[flags.cs[j].v[k]].mb = city[core.rand(city.length)];
										flags.dw[flags.cs[j].v[k]].mbsj = 10;
									}
									flags.cs[j].v.splice(0, l);
								}
							}
							if (kyzz && !flags.cs[j].lin.length) {
								var l = Math.floor((flags.cs[j].v.length - 1) / 1.7);
								if (l > 0) {
									for (var k = 0; k < l; k++) {
										flags.dw[flags.cs[j].v[k]].mb = kyzz;
										flags.dw[flags.cs[j].v[k]].mbsj = 10;
									}
									flags.cs[j].v.splice(0, l);
								}
							}
							if (flags.cs[j].sc.length > 0) continue;
							var sj = core.rand(100);
							var _ = Math.pow(2, flags.cs[j].rk / 100);
							if (sj <= _ && flags.cs[j].rk + (100 / flags.cs[j].ic + 2) * flags.cs[j].rkzz >= 100) flags.cs[j].sc.push({ lx: 8, xh: 1, ys: 100 });
							else if (sj <= _ + _ && flags.cs[j].rk + (100 / flags.cs[j].ic + 2) * flags.cs[j].rkzz >= 50) flags.cs[j].sc.push({ lx: 9, xh: 1, ys: 100 });
							if (flags.cs[j].sc.length > 0) continue;
							sj = core.rand(100);
							if (sj <= 4 && flags.cs[j].ic >= 8 && flags.gj[i].yffy[5][1] <= 0) flags.cs[j].sc.push({ lx: 5, xh: 1, ys: 1500 });
							else {
								var lx = sj <= 57 ? 3 : sj <= 73 ? 2 : sj <= 94 ? 1 : 4;
								var xh = 0;
								while (flags.gj[i].yffy[lx][xh + 1] <= 0 && xh < 5) xh += 1;
								if (lx == 4 && xh > 3) xh = 3;
								if (xh > 0) flags.cs[j].sc.push({ lx: lx, xh: xh, ys: flags.mil[lx][xh].xh });
							}
						}
				}
		})();
		updateStat();
		core.drawMap();
		core.autosave();
		extendUI.update();
	}

	extendUI.registerCommand("nextTurn", function() {
		core.status.route.push("next")
		nextTurn();
	});
	
	core.registerReplayAction("nextTurn", function(action) {
		if (action !== "next") return false;
		nextTurn();
		setTimeout(function() {
			core.replay();
		}, core.control.__replay_getTimeout());
		return true;
	});

	function setResearchField(field) {
		flags.gj[flags.xzgj].yffx = field;
		extendUI.update();
	}

	extendUI.registerCommand("setResearchField", function(payload) {
		var field = payload.field;
		core.status.route.push("research:" + field);
		setResearchField(field);
	});

	core.registerReplayAction("setResearchField", function(action) {
		if (!action.startsWith("research:")) return false;
		var field = action.substring(9);
		setResearchField(field);
	});
	
	this.createResearch = function(gj) {
		research = {
			field: gj.yffx,
			fields: {
				1: { levels: [0, 0, 0, 4000, 1e4, 2e4], level: 2, pass: 0 },
				2: { levels: [0, 0, 2000, 8000, 2e4, 4.8e4], level: 1, pass: 0 },
				3: { levels: [0, 0, 1e4, 4e4, 7e4, 11e4], level: 1, pass: 0 },
				4: { levels: [0, 3000, 1e4, 6e4], level: 0, pass: 0 },
				5: { levels: [0, 2e4], level: 0, pass: 0 },
			},
		}
		for (var i = 1; i <= 5; i++) {
			while (research.fields[i].level + 1 < research.fields[i].levels.length && gj.yffy[i][research.fields[i].level + 1] <= 0) research.fields[i].level += 1;
			research.fields[i].pass = research.fields[i].level + 1 >= research.fields[i].levels.length ? 0 : research.fields[i].levels[research.fields[i].level + 1] - gj.yffy[i][research.fields[i].level + 1];
		}
		return research;
	}
}
}