main.floors._=
{
    "floorId": "_",
    "title": "",
    "name": "_",
    "width": 25,
    "height": 19,
    "canFlyTo": true,
    "canFlyFrom": true,
    "canUseQuickShop": true,
    "cannotViewMap": false,
    "cannotMoveDirectly": false,
    "images": [],
    "ratio": 1,
    "defaultGround": "ground",
    "firstArrive": [
        {
            "type": "function",
            "function": "function(){\ncore.showStatusBar();\ncore.createCanvas('test', 0, 0, 1000, 800, 45);\nfor (var x = 0; x < 20; x++)\n\tfor (var y = 1; y <= 12; y++)\n\t\tif (flags.cs[flags.tu[y][x]].gj) core.fillRect('test', x * 32, y * 32, 32, 32, flags.color[flags.cs[flags.tu[y][x]].gj] || '#ffffff')\n}"
        },
        {
            "type": "tip",
            "text": "选择你的角色"
        },
        {
            "type": "while",
            "condition": "true",
            "data": [
                {
                    "type": "wait",
                    "forceChild": true,
                    "data": [
                        {
                            "case": "mouse",
                            "px": [
                                0,
                                640
                            ],
                            "py": [
                                32,
                                416
                            ],
                            "action": []
                        }
                    ]
                },
                {
                    "type": "if",
                    "condition": "flags.cs[flags.tu[flags.y][flags.x]].gj",
                    "true": [
                        {
                            "type": "confirm",
                            "text": "确认要选择【${flags.gjm[flags.cs[flags.tu[flags.y][flags.x]].gj]}】吗?",
                            "yes": [
                                {
                                    "type": "setValue",
                                    "name": "flag:xzgj",
                                    "value": "flags.cs[flags.tu[flags.y][flags.x]].gj"
                                },
                                {
                                    "type": "break",
                                    "n": 1
                                }
                            ],
                            "no": []
                        }
                    ]
                }
            ]
        },
        {
            "type": "openShop",
            "id": "shop1",
            "open": true
        },
        {
            "type": "openShop",
            "id": "tutor",
            "open": true
        },
        {
            "type": "openShop",
            "id": "war"
        },
        {
            "type": "openShop",
            "id": "missile"
        },
        {
            "type": "openShop",
            "id": "next"
        }
    ],
    "eachArrive": [
        {
            "type": "function",
            "function": "function(){\ncore.showStatusBar();\ncore.createCanvas('test', 0, 0, 1000, 800, 45);\nfor (var x = 0; x < 20; x++)\n\tfor (var y = 1; y <= 12; y++)\n\t\tif (flags.cs[flags.tu[y][x]].gj) core.fillRect('test', x * 32, y * 32, 32, 32, flags.color[flags.cs[flags.tu[y][x]].gj] || '#ffffff');\nfor (var x = 0; x < 20; x++)\n\tfor (var y = 1; y <= 12; y++)\n\t\tif (flags.cs[flags.tu[y][x]].gj == flags.xzgj) core.maps.setBgFgBlock('fg', 90, x, y);\n\t\telse core.maps.setBgFgBlock('fg', 0, x, y);\ncore.fillRect('test', 0, 448, 640, 160, [0, 0, 0, 1]);\ncore.fillText('test', '下一回合', 128, 18 * 32, [255, 255, 255, 1], \"100px Arial\");\n}"
        },
        {
            "type": "function",
            "function": "function(){\nvar a = 0,\n\tb = 0,\n\tc = 0,\n\td = 0;\nfor (var i = 1; i < flags.cs.length; i++)\n\tif (flags.cs[i].gj == flags.xzgj) a += flags.cs[i].ic, b += flags.cs[i].kj;\n\telse c += flags.cs[i].ic, d += flags.cs[i].kj;\ncore.status.hero.atk = a, core.status.hero.def = b;\ncore.status.hero.mdef = a + c, core.status.hero.exp = b + d;\n}"
        }
    ],
    "parallelDo": "",
    "events": {
        "0,1": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        1
                    ]
                }
            ]
        },
        "1,1": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        2
                    ]
                }
            ]
        },
        "2,1": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        5
                    ]
                }
            ]
        },
        "3,1": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        6
                    ]
                }
            ]
        },
        "4,1": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        9
                    ]
                }
            ]
        },
        "5,1": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        10
                    ]
                }
            ]
        },
        "7,1": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        13
                    ]
                }
            ]
        },
        "8,1": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        14
                    ]
                }
            ]
        },
        "9,1": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        17
                    ]
                }
            ]
        },
        "10,1": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        18
                    ]
                }
            ]
        },
        "11,1": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        21
                    ]
                }
            ]
        },
        "12,1": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        22
                    ]
                }
            ]
        },
        "14,1": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        25
                    ]
                }
            ]
        },
        "15,1": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        26
                    ]
                }
            ]
        },
        "16,1": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        29
                    ]
                }
            ]
        },
        "17,1": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        30
                    ]
                }
            ]
        },
        "18,1": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        33
                    ]
                }
            ]
        },
        "19,1": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        34
                    ]
                }
            ]
        },
        "0,2": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        3
                    ]
                }
            ]
        },
        "1,2": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        4
                    ]
                }
            ]
        },
        "2,2": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        7
                    ]
                }
            ]
        },
        "3,2": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        8
                    ]
                }
            ]
        },
        "4,2": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        11
                    ]
                }
            ]
        },
        "5,2": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        12
                    ]
                }
            ]
        },
        "7,2": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        15
                    ]
                }
            ]
        },
        "8,2": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        16
                    ]
                }
            ]
        },
        "9,2": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        19
                    ]
                }
            ]
        },
        "10,2": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        20
                    ]
                }
            ]
        },
        "11,2": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        23
                    ]
                }
            ]
        },
        "12,2": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        24
                    ]
                }
            ]
        },
        "14,2": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        27
                    ]
                }
            ]
        },
        "15,2": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        28
                    ]
                }
            ]
        },
        "16,2": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        31
                    ]
                }
            ]
        },
        "17,2": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        32
                    ]
                }
            ]
        },
        "18,2": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        35
                    ]
                }
            ]
        },
        "19,2": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        36
                    ]
                }
            ]
        },
        "0,3": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        37
                    ]
                }
            ]
        },
        "1,3": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        38
                    ]
                }
            ]
        },
        "2,3": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        41
                    ]
                }
            ]
        },
        "3,3": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        42
                    ]
                }
            ]
        },
        "4,3": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        45
                    ]
                }
            ]
        },
        "5,3": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        46
                    ]
                }
            ]
        },
        "7,3": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        49
                    ]
                }
            ]
        },
        "8,3": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        50
                    ]
                }
            ]
        },
        "9,3": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        53
                    ]
                }
            ]
        },
        "10,3": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        54
                    ]
                }
            ]
        },
        "11,3": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        57
                    ]
                }
            ]
        },
        "12,3": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        58
                    ]
                }
            ]
        },
        "14,3": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        61
                    ]
                }
            ]
        },
        "15,3": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        62
                    ]
                }
            ]
        },
        "16,3": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        65
                    ]
                }
            ]
        },
        "17,3": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        66
                    ]
                }
            ]
        },
        "18,3": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        69
                    ]
                }
            ]
        },
        "19,3": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        70
                    ]
                }
            ]
        },
        "0,4": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        39
                    ]
                }
            ]
        },
        "1,4": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        40
                    ]
                }
            ]
        },
        "2,4": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        43
                    ]
                }
            ]
        },
        "3,4": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        44
                    ]
                }
            ]
        },
        "4,4": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        47
                    ]
                }
            ]
        },
        "5,4": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        48
                    ]
                }
            ]
        },
        "7,4": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        51
                    ]
                }
            ]
        },
        "8,4": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        52
                    ]
                }
            ]
        },
        "9,4": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        55
                    ]
                }
            ]
        },
        "10,4": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        56
                    ]
                }
            ]
        },
        "11,4": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        59
                    ]
                }
            ]
        },
        "12,4": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        60
                    ]
                }
            ]
        },
        "14,4": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        63
                    ]
                }
            ]
        },
        "15,4": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        64
                    ]
                }
            ]
        },
        "16,4": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        67
                    ]
                }
            ]
        },
        "17,4": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        68
                    ]
                }
            ]
        },
        "18,4": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        71
                    ]
                }
            ]
        },
        "19,4": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        72
                    ]
                }
            ]
        },
        "0,5": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        73
                    ]
                }
            ]
        },
        "1,5": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        74
                    ]
                }
            ]
        },
        "2,5": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        77
                    ]
                }
            ]
        },
        "3,5": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        78
                    ]
                }
            ]
        },
        "4,5": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        81
                    ]
                }
            ]
        },
        "5,5": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        82
                    ]
                }
            ]
        },
        "7,5": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        85
                    ]
                }
            ]
        },
        "8,5": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        86
                    ]
                }
            ]
        },
        "9,5": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        89
                    ]
                }
            ]
        },
        "10,5": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        90
                    ]
                }
            ]
        },
        "11,5": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        93
                    ]
                }
            ]
        },
        "12,5": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        94
                    ]
                }
            ]
        },
        "14,5": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        97
                    ]
                }
            ]
        },
        "15,5": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        98
                    ]
                }
            ]
        },
        "16,5": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        101
                    ]
                }
            ]
        },
        "17,5": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        102
                    ]
                }
            ]
        },
        "18,5": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        105
                    ]
                }
            ]
        },
        "19,5": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        106
                    ]
                }
            ]
        },
        "0,6": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        75
                    ]
                }
            ]
        },
        "1,6": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        76
                    ]
                }
            ]
        },
        "2,6": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        79
                    ]
                }
            ]
        },
        "3,6": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        80
                    ]
                }
            ]
        },
        "4,6": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        83
                    ]
                }
            ]
        },
        "5,6": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        84
                    ]
                }
            ]
        },
        "7,6": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        87
                    ]
                }
            ]
        },
        "8,6": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        88
                    ]
                }
            ]
        },
        "9,6": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        91
                    ]
                }
            ]
        },
        "10,6": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        92
                    ]
                }
            ]
        },
        "11,6": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        95
                    ]
                }
            ]
        },
        "12,6": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        96
                    ]
                }
            ]
        },
        "14,6": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        99
                    ]
                }
            ]
        },
        "15,6": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        100
                    ]
                }
            ]
        },
        "16,6": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        103
                    ]
                }
            ]
        },
        "17,6": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        104
                    ]
                }
            ]
        },
        "18,6": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        107
                    ]
                }
            ]
        },
        "19,6": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        108
                    ]
                }
            ]
        },
        "0,7": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        109
                    ]
                }
            ]
        },
        "1,7": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        110
                    ]
                }
            ]
        },
        "2,7": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        113
                    ]
                }
            ]
        },
        "3,7": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        114
                    ]
                }
            ]
        },
        "4,7": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        117
                    ]
                }
            ]
        },
        "5,7": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        118
                    ]
                }
            ]
        },
        "7,7": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        121
                    ]
                }
            ]
        },
        "8,7": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        122
                    ]
                }
            ]
        },
        "9,7": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        125
                    ]
                }
            ]
        },
        "10,7": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        126
                    ]
                }
            ]
        },
        "11,7": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        129
                    ]
                }
            ]
        },
        "12,7": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        130
                    ]
                }
            ]
        },
        "14,7": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        133
                    ]
                }
            ]
        },
        "15,7": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        134
                    ]
                }
            ]
        },
        "16,7": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        137
                    ]
                }
            ]
        },
        "17,7": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        138
                    ]
                }
            ]
        },
        "18,7": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        141
                    ]
                }
            ]
        },
        "19,7": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        142
                    ]
                }
            ]
        },
        "0,8": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        111
                    ]
                }
            ]
        },
        "1,8": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        112
                    ]
                }
            ]
        },
        "2,8": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        115
                    ]
                }
            ]
        },
        "3,8": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        116
                    ]
                }
            ]
        },
        "4,8": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        119
                    ]
                }
            ]
        },
        "5,8": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        120
                    ]
                }
            ]
        },
        "7,8": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        123
                    ]
                }
            ]
        },
        "8,8": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        124
                    ]
                }
            ]
        },
        "9,8": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        127
                    ]
                }
            ]
        },
        "10,8": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        128
                    ]
                }
            ]
        },
        "11,8": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        131
                    ]
                }
            ]
        },
        "12,8": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        132
                    ]
                }
            ]
        },
        "14,8": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        135
                    ]
                }
            ]
        },
        "15,8": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        136
                    ]
                }
            ]
        },
        "16,8": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        139
                    ]
                }
            ]
        },
        "17,8": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        140
                    ]
                }
            ]
        },
        "18,8": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        143
                    ]
                }
            ]
        },
        "19,8": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        144
                    ]
                }
            ]
        },
        "0,9": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        145
                    ]
                }
            ]
        },
        "1,9": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        146
                    ]
                }
            ]
        },
        "2,9": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        149
                    ]
                }
            ]
        },
        "3,9": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        150
                    ]
                }
            ]
        },
        "4,9": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        153
                    ]
                }
            ]
        },
        "5,9": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        154
                    ]
                }
            ]
        },
        "7,9": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        157
                    ]
                }
            ]
        },
        "8,9": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        158
                    ]
                }
            ]
        },
        "9,9": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        161
                    ]
                }
            ]
        },
        "10,9": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        162
                    ]
                }
            ]
        },
        "11,9": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        165
                    ]
                }
            ]
        },
        "12,9": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        166
                    ]
                }
            ]
        },
        "14,9": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        169
                    ]
                }
            ]
        },
        "15,9": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        170
                    ]
                }
            ]
        },
        "16,9": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        173
                    ]
                }
            ]
        },
        "17,9": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        174
                    ]
                }
            ]
        },
        "18,9": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        177
                    ]
                }
            ]
        },
        "19,9": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        178
                    ]
                }
            ]
        },
        "0,10": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        147
                    ]
                }
            ]
        },
        "1,10": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        148
                    ]
                }
            ]
        },
        "2,10": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        151
                    ]
                }
            ]
        },
        "3,10": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        152
                    ]
                }
            ]
        },
        "4,10": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        155
                    ]
                }
            ]
        },
        "5,10": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        156
                    ]
                }
            ]
        },
        "7,10": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        159
                    ]
                }
            ]
        },
        "8,10": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        160
                    ]
                }
            ]
        },
        "9,10": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        163
                    ]
                }
            ]
        },
        "10,10": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        164
                    ]
                }
            ]
        },
        "11,10": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        167
                    ]
                }
            ]
        },
        "12,10": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        168
                    ]
                }
            ]
        },
        "14,10": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        171
                    ]
                }
            ]
        },
        "15,10": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        172
                    ]
                }
            ]
        },
        "16,10": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        175
                    ]
                }
            ]
        },
        "17,10": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        176
                    ]
                }
            ]
        },
        "18,10": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        179
                    ]
                }
            ]
        },
        "19,10": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        180
                    ]
                }
            ]
        },
        "0,11": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        181
                    ]
                }
            ]
        },
        "1,11": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        182
                    ]
                }
            ]
        },
        "2,11": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        185
                    ]
                }
            ]
        },
        "3,11": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        186
                    ]
                }
            ]
        },
        "4,11": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        189
                    ]
                }
            ]
        },
        "5,11": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        190
                    ]
                }
            ]
        },
        "7,11": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        193
                    ]
                }
            ]
        },
        "8,11": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        194
                    ]
                }
            ]
        },
        "9,11": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        197
                    ]
                }
            ]
        },
        "10,11": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        198
                    ]
                }
            ]
        },
        "11,11": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        201
                    ]
                }
            ]
        },
        "12,11": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        202
                    ]
                }
            ]
        },
        "14,11": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        205
                    ]
                }
            ]
        },
        "15,11": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        206
                    ]
                }
            ]
        },
        "16,11": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        209
                    ]
                }
            ]
        },
        "17,11": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        210
                    ]
                }
            ]
        },
        "18,11": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        213
                    ]
                }
            ]
        },
        "19,11": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        214
                    ]
                }
            ]
        },
        "0,12": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        183
                    ]
                }
            ]
        },
        "1,12": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        184
                    ]
                }
            ]
        },
        "2,12": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        187
                    ]
                }
            ]
        },
        "3,12": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        188
                    ]
                }
            ]
        },
        "4,12": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        191
                    ]
                }
            ]
        },
        "5,12": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        192
                    ]
                }
            ]
        },
        "7,12": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        195
                    ]
                }
            ]
        },
        "8,12": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        196
                    ]
                }
            ]
        },
        "9,12": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        199
                    ]
                }
            ]
        },
        "10,12": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        200
                    ]
                }
            ]
        },
        "11,12": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        203
                    ]
                }
            ]
        },
        "12,12": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        204
                    ]
                }
            ]
        },
        "14,12": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        207
                    ]
                }
            ]
        },
        "15,12": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        208
                    ]
                }
            ]
        },
        "16,12": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        211
                    ]
                }
            ]
        },
        "17,12": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        212
                    ]
                }
            ]
        },
        "18,12": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        215
                    ]
                }
            ]
        },
        "19,12": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "insert",
                    "name": "加点事件",
                    "args": [
                        216
                    ]
                }
            ]
        },
        "0,14": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "1,14": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "2,14": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "3,14": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "4,14": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "5,14": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "6,14": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "7,14": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "8,14": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "9,14": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "10,14": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "11,14": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "12,14": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "13,14": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "14,14": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "15,14": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "16,14": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "17,14": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "18,14": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "19,14": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "0,15": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "1,15": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "2,15": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "3,15": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "4,15": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "5,15": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "6,15": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "7,15": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "8,15": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "9,15": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "10,15": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "11,15": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "12,15": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "13,15": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "14,15": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "15,15": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "16,15": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "17,15": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "18,15": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "19,15": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "0,16": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "1,16": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "2,16": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "3,16": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "4,16": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "5,16": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "6,16": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "7,16": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "8,16": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "9,16": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "10,16": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "11,16": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "12,16": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "13,16": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "14,16": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "15,16": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "16,16": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "17,16": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "18,16": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "19,16": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "0,17": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "1,17": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "2,17": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "3,17": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "4,17": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "5,17": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "6,17": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "7,17": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "8,17": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "9,17": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "10,17": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "11,17": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "12,17": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "13,17": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "14,17": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "15,17": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "16,17": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "17,17": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "18,17": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "19,17": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "0,18": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "1,18": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "2,18": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "3,18": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "4,18": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "5,18": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "6,18": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "7,18": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "8,18": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "9,18": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "10,18": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "11,18": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "12,18": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "13,18": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "14,18": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "15,18": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "16,18": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "17,18": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "18,18": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ],
        "19,18": [
            {
                "type": "insert",
                "name": "下一回合"
            }
        ]
    },
    "changeFloor": {},
    "beforeBattle": {},
    "afterBattle": {},
    "afterGetItem": {},
    "afterOpenDoor": {},
    "autoEvent": {},
    "cannotMove": {},
    "cannotMoveIn": {},
    "map": [
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,10016,10017,10017,10017,10018],
    [201,201,201,201,201,201,  0,201,201,201,201,201,201,  0,201,201,201,201,201,201,10024,10025,10025,10025,10026],
    [201,201,201,201,201,201,  0,201,201,201,201,201,201,  0,201,201,201,201,201,201,10024,10025,10025,10025,10026],
    [201,201,201,201,201,201,  0,201,201,201,201,201,201,  0,201,201,201,201,201,201,10024,10025,10025,10025,10026],
    [201,201,201,201,201,201,  0,201,201,201,201,201,201,  0,201,201,201,201,201,201,10024,10025,10025,10025,10026],
    [201,201,201,201,201,201,  0,201,201,201,201,201,201,  0,201,201,201,201,201,201,10024,10025,10025,10025,10026],
    [201,201,201,201,201,201,  0,201,201,201,201,201,201,  0,201,201,201,201,201,201,10024,10025,10025,10025,10026],
    [201,201,201,201,201,201,  0,201,201,201,201,201,201,  0,201,201,201,201,201,201,10024,10025,10025,10025,10026],
    [201,201,201,201,201,201,  0,201,201,201,201,201,201,  0,201,201,201,201,201,201,10024,10025,10025,10025,10026],
    [201,201,201,201,201,201,  0,201,201,201,201,201,201,  0,201,201,201,201,201,201,10024,10025,10025,10025,10026],
    [201,201,201,201,201,201,  0,201,201,201,201,201,201,  0,201,201,201,201,201,201,10024,10025,10025,10025,10026],
    [201,201,201,201,201,201,  0,201,201,201,201,201,201,  0,201,201,201,201,201,201,10024,10025,10025,10025,10026],
    [201,201,201,201,201,201,  0,201,201,201,201,201,201,  0,201,201,201,201,201,201,10024,10025,10025,10025,10026],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,10024,10025,10025,10025,10026],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,10024,10025,10025,10025,10026],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,10024,10025,10025,10025,10026],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,10024,10025,10025,10025,10026],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,10024,10025,10025,10025,10026],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,10032,10033,10033,10033,10034]
],
    "bgmap": [

],
    "fgmap": [
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [306,309,306,309,306,309,  0,306,309,306,309,306,309,  0,306,309,306,309,306,309,  0,  0,  0,  0,  0],
    [310,307,310,307,310,307,  0,310,307,310,307,310,307,  0,310,307,310,307,310,307,  0,  0,  0,  0,  0],
    [306,309,306,309,306,309,  0,306,309,306,309,306,309,  0,306,309,306,309,306,309,  0,  0,  0,  0,  0],
    [310,307,310,307,310,307,  0,310,307,310,307,310,307,  0,310,307,310,307,310,307,  0,  0,  0,  0,  0],
    [306,309,306,309,306,309,  0,306,309,306,309,306,309,  0,306,309,306,309,306,309,  0,  0,  0,  0,  0],
    [310,307,310,307,310,307,  0,310,307,310,307,310,307,  0,310,307,310,307,310,307,  0,  0,  0,  0,  0],
    [306,309,306,309,306,309,  0,306,309,306,309,306,309,  0,306,309,306,309,306,309,  0,  0,  0,  0,  0],
    [310,307,310,307,310,307,  0,310,307,310,307,310,307,  0,310,307,310,307,310,307,  0,  0,  0,  0,  0],
    [306,309,306,309,306,309,  0,306,309,306,309,306,309,  0,306,309,306,309,306,309,  0,  0,  0,  0,  0],
    [310,307,310,307,310,307,  0,310,307,310,307,310,307,  0,310,307,310,307,310,307,  0,  0,  0,  0,  0],
    [306,309,306,309,306,309,  0,306,309,306,309,306,309,  0,306,309,306,309,306,309,  0,  0,  0,  0,  0],
    [310,307,310,307,310,307,  0,310,307,310,307,310,307,  0,310,307,310,307,310,307,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0]
]
}