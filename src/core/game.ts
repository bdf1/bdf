import { defineStore } from "@/modules/state";

export const store = defineStore((seed: number) => {
    return {
        country: null as number | null,
        turn: 0,
        countries: [],
        cities: [],
        seed,
    };
});

const { useState, registerAction } = store;

// function updateStat() {
//     const state = useState();
//     let playerIC = 0,
//         playerRD = 0,
//         globalIC = 0,
//         globalRD = 0;
//     for (var i = 1; i < state.cities.length; i++) {
//         var city = state.cities[i];
//         if (city.gj == flags.xzgj) {
//             playerIC += city.ic, playerRD += city.kj;
//         }
//         globalIC += city.ic, globalRD += city.kj;
//     }
//     core.status.hero.atk = playerIC, core.status.hero.def = playerRD;
//     core.status.hero.mdef = globalIC, core.status.hero.exp =globalRD;
// }

export const selectCountry = registerAction("selectCountry", function(state, country: number) {
    state.country = country;
});

export const nextTurn = registerAction("nextTurn", (state) => {
    state.turn++;
    
    // 30 回合前不宣战, 30回合之后每个AI 在未宣战时会选择一个国家开战
    {
        if (state.turn >= 30) {
            var _ = [],
                __ = [0];
            for (var i = 0; i < state.countries.length; i++) _.push([]);
            for (var i = 0; i < state.countries.length; i++)
                for (var j = 0; j < state.countries.length; j++) _[i].push(0);
            for (var i = 1; i < state.cities.length; i++) {
                for (var j = 1; j < state.cities.length; j++)
                    if (flags.lt[i][j] && state.cities[i].gj != state.cities[j].gj) _[state.cities[i].gj][state.cities[j].gj] = 1;
            }
            for (var i = 1; i < state.countries.length; i++) {
                var t = [];
                for (var j = 1; j < state.countries.length; j++)
                    if (_[i][j] && !flags.zz[i][j]) t.push(j);
                for (var j = 1; j < state.countries.length; j++)
                    if (_[i][j] && flags.zz[i][j]) t = [];
                if (i == flags.xzgj) t = [];
                if (t.length) __.push(t[core.rand(t.length)]);
                else __.push(0);
            }
            var s = "",
                cnt = 0;
            _ = [];
            for (var i = 1; i < state.countries.length; ++i)
                if (__[i] && core.rand(20) == 0) {
                    s += state.countries[i].nm + "和" + state.countries[__[i]].nm + "宣战" + String.fromCharCode(10);
                    cnt += 1;
                    if (cnt >= 20) _.push(s), cnt = 0, s = "";
                    flags.zz[i][__[i]] = flags.zz[__[i]][i] = 1;
                }
            if (s) _.push(s);
            core.insertAction(_);
        }
    }

    // 处理死亡国家
    {
        flags.city = [0];
        for (var i = 1; i < state.countries.length; i++) flags.city.push(0);
        for (var i = 1; i < state.cities.length; i++) flags.city[state.cities[i].gj] += 1;
        for (var i = 1; i < state.cities.length; i++)
            if (state.cities[i].hp > 0 && state.cities[i].hp < state.cities[i].HP) state.cities[i].hp += Math.max(10, Math.floor((state.cities[i].HP - state.cities[i].hp) / 100));
        for (var i = 1; i < state.countries.length; i++)
            if (flags.city[i] == 0 && !state.countries[i].sile) {
                state.countries[i].sile = 1;
                core.insertAction("         " + state.countries[i].nm + "  战败!");
            }
        for (var i = 1; i < flags.dw.length; i++)
            if (state.countries[flags.dw[i].gj].sile) flags.dw[i].hp = -1;
    }
    
    if (flags.city[flags.xzgj] >= state.cities.length-1) {
        core.status.hero.hp = 1000 - state.turn;
        core.win("恭喜 " + state.countries[flags.xzgj].nm + " 胜利！", true);
    }
    if (state.countries[flags.xzgj].sile) {
        core.status.hero.hp = 0;
        for (var i = 1; i < state.countries.length; i++)
            if (!state.countries[i].sile) core.status.hero.hp -= 1;
        core.win("你死了！", true);
    }

    // 处理转移
    {
        for (var i = 1; i < state.cities.length; i++) state.cities[i].lin = [];
        for (var i = 1; i < flags.dw.length; i++)
            if (flags.dw[i].hp > 0 && flags.dw[i].mbsj <= 0 && flags.dw[i].mb > 0 && state.cities[flags.dw[i].mb].gj != flags.dw[i].gj) {
                state.cities[flags.dw[i].mb].lin.push(i);
            }
        for (var i = 1; i < state.cities.length; i++) state.cities[i].lin.sort(function (a, b) { return flags.dw[a].mbsj - flags.dw[b].mbsj; });
        var _ = "";
        for (var i = 1; i < state.cities.length; i++)
            if (state.cities[i].lin.length > 0 && state.cities[i].v.length == 0 && state.cities[i].hp <= 0 && flags.dw[state.cities[i].lin[0]].mbsj <= 0) {
                state.cities[i].hp = 1;
                state.cities[i].gj = flags.dw[state.cities[i].lin[0]].gj;
                _ += ("     " + state.countries[state.cities[i].gj].nm + "  占领了  " + state.cities[i].nm + "  ！") + String.fromCharCode(10);
                state.cities[i].sc = [];
            }
        if (_) core.insertAction(_);
        for (var i = 1; i < flags.dw.length; i++)
            if (flags.dw[i].hp > 0) {
                if (flags.dw[i].mbsj > 0) flags.dw[i].mbsj -= flags.mil[flags.dw[i].zl][flags.dw[i].xh].sd;
                else if (flags.dw[i].mb) flags.dw[i].mbsj -= 10;
                if (flags.dw[i].mbsj < 0) {
                    if (flags.zz[flags.dw[i].gj][state.cities[flags.dw[i].mb].gj]) continue;
                    if (flags.dw[i].zl >= 4) flags.dw[i].mb = flags.dw[i].mbsj = 0, state.countries[flags.dw[i].gj].dd.push(i);
                    else if (state.cities[flags.dw[i].mb].gj == flags.dw[i].gj) state.cities[flags.dw[i].mb].v.push(i), flags.dw[i].mb = flags.dw[i].mbsj = 0;
                    else {
                        for (var k = 1; k < state.cities.length; k++)
                            if (state.cities[k].gj == flags.dw[i].gj) flags.dw[i].mb = k, flags.dw[i].mbsj = 10;
                    }
                }
            }
    }
    
    // 处理科研
    {
        for (var i = 1; i < state.countries.length; i++) {
            var kynl = 0,
            yffx = state.countries[i].yffx;
            var f1 = state.countries[i].yffy[1][5] < 0,
                f2 = state.countries[i].yffy[2][5] < 0,
                f3 = state.countries[i].yffy[3][5] < 0,
                f4 = state.countries[i].yffy[4][3] < 0,
                f5 = state.countries[i].yffy[5][1] < 0;
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
            state.countries[i].yffx = yffx;
            if (yffx) {
                var now = 1;
                while (state.countries[i].yffy[yffx][now] <= 0) now = now + 1;
            }
            for (var j = 1; j < state.cities.length; j++)
                if (state.cities[j].gj == i) kynl += state.cities[j].kj;
            state.countries[i].yffy[yffx][now] -= kynl;
            if (state.countries[i].yffy[yffx][now] <= 0 && i == flags.xzgj) {
                // 消息提示
            }
        }
    }

    // 处理生产/人口增长
    {
        var str = "";
        for (var i = 1; i < state.cities.length; i++) {
            state.cities[i].rk += state.cities[i].rkzz;
            if (state.cities[i].sc.length > 0) {
                state.cities[i].sc[0].ys -= state.cities[i].ic;
                if (state.cities[i].sc[0].ys <= 0 && state.cities[i].rk >= [10, 10, 10, 10, 10, 10, 10, 10, 100, 50][state.cities[i].sc[0].lx]) {
                    if (state.cities[i].sc[0].lx == 8) {
                        state.cities[i].ic += 1;
                        state.cities[i].rk -= 100;
                        if (state.cities[i].gj == flags.xzgj) str += "   工厂   于    " + state.cities[i].nm + " 制造厂  生产完成 ！" + String.fromCharCode(10);
                    } else if (state.cities[i].sc[0].lx == 9) {
                        state.cities[i].kj += 1;
                        state.cities[i].rk -= 50;
                        if (state.cities[i].gj == flags.xzgj) str += "  科研所  于    " + state.cities[i].nm + " 制造厂  生产完成 ！" + String.fromCharCode(10);
                    } else if (state.cities[i].sc[0].lx >= 4) {
                        state.cities[i].rk -= 10;
                        flags.dw.push({
                            zl: state.cities[i].sc[0].lx,
                            xh: state.cities[i].sc[0].xh,
                            mb: 0,
                            mbsj: 0,
                            hp: flags.mil[state.cities[i].sc[0].lx][state.cities[i].sc[0].xh].hp,
                            gj: state.cities[i].gj
                        });
                        state.countries[state.cities[i].gj].dd.push(flags.dw.length - 1);
                        if (state.cities[i].gj == flags.xzgj) str += "   " + flags.mil[state.cities[i].sc[0].lx][state.cities[i].sc[0].xh].nm + "   于    " + state.cities[i].nm + " 制造厂  生产完成 ！" + String.fromCharCode(10);
                    } else {
                        state.cities[i].rk -= 10;
                        flags.dw.push({
                            zl: state.cities[i].sc[0].lx,
                            xh: state.cities[i].sc[0].xh,
                            mb: 0,
                            mbsj: 0,
                            hp: flags.mil[state.cities[i].sc[0].lx][state.cities[i].sc[0].xh].hp,
                            gj: state.cities[i].gj
                        });
                        state.cities[i].v.push(flags.dw.length - 1);
                        if (state.cities[i].gj == flags.xzgj) str += "   " + flags.mil[state.cities[i].sc[0].lx][state.cities[i].sc[0].xh].nm + "   于    " + state.cities[i].nm + " 制造厂  生产完成 ！" + String.fromCharCode(10);
                    }
                    var ys = state.cities[i].sc[0].ys;
                    state.cities[i].sc.splice(0, 1);
                    if (state.cities[i].sc.length > 0) state.cities[i].sc[0].ys += ys;
                }
            }
        }
        if (str) core.insertAction(str);
        for (var i = 1; i < state.cities.length; i++) state.cities[i].lin = [];
        for (var i = 1; i < flags.dw.length; i++)
            if (flags.dw[i].hp > 0 && flags.dw[i].mbsj <= 0 && flags.dw[i].mb > 0 && state.cities[flags.dw[i].mb].gj != flags.dw[i].gj) {
                state.cities[flags.dw[i].mb].lin.push(i);
            }
        for (var i = 1; i < state.cities.length; i++) state.cities[i].lin.sort(function (a, b) { return flags.dw[a].mbsj - flags.dw[b].mbsj; });
    }

    // 战争！
    {
        for (let i = 1; i < state.cities.length; i++) {
            flags._ = i;
            if (state.cities[flags._].lin.length === 0) {
                if (state.cities[flags._].hp < 0) state.cities[flags._].hp = 1;
                if (state.cities[flags._].hp < 10) state.cities[flags._].hp += 10;
                else if (state.cities[flags._].hp < state.cities[flags._].HP) state.cities[flags._].hp += Math.max(500, Math.floor((state.cities[flags._].HP - state.cities[flags._].hp) / 30));
                continue;
            }
            
            flags.show = state.cities[flags._].gj == flags.xzgj;
            for (let i = 0; i < state.cities[flags._].lin.length; i++)
                if (flags.dw[state.cities[flags._].lin[i]].gj == flags.xzgj) flags.show = true;
            if (flags.show) {

            }
            let t = state.cities[flags._].lin,
                u = state.cities[flags._].v;
            let __ = [];
            for (let i = 0; i < t.length; i++) {
                let zdl = flags.mil[flags.dw[t[i]].zl][flags.dw[t[i]].xh].zdl;
                if (flags.dw[t[i]].zl < 4) continue;
                if (flags.dw[t[i]].zl == 5) __.push("${state.cities[flags._].nm} 受到了来自 " + state.countries[flags.dw[t[i]].gj].nm + "  的核打击！ ");
                if (state.cities[flags._].hp >= zdl / 10) state.cities[flags._].hp -= zdl;
                else {
                    console.log('ATTACK');
                    state.cities[flags._].hp = 0;
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
                if (u.length == 0 || state.cities[flags._].hp > 0 && core.rand(5) < 3) { state.cities[flags._].hp -= zdl; continue; }
                let v = [];
                for (let j = 0; j < u.length; j++)
                    if (flags.dw[u[j]].hp > 0) v.push(u[j]);
                if (v.length == 0) { state.cities[flags._].hp -= zdl; continue; }
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
                        if (state.cities[flags._].gj == flags.xzgj) s = "  对方损失  " + flags.mil[flags.dw[t[i]].zl][flags.dw[t[i]].xh].nm + "  ！" + String.fromCharCode(10);
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
                        if (state.cities[flags._].gj == flags.xzgj) s = "  我方损失  " + flags.mil[flags.dw[u[i]].zl][flags.dw[u[i]].xh].nm + "  ！" + String.fromCharCode(10);
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
                core.fillText('test2', "      " + (state.cities[flags._].gj == flags.xzgj ? "我" : "对") + "方城市【" + state.cities[flags._].nm + " (" + flags._ + ")" + "】防御值剩余： " + state.cities[flags._].hp, 0, 320 - 5, [255, 255, 255, 1], "20px Arial");
            }
            let v = [],
                w = [];
            for (let i = 0; i < t.length; i++)
                if (flags.dw[t[i]].hp > 0) v.push(t[i]);
            for (let i = 0; i < u.length; i++)
                if (flags.dw[u[i]].hp > 0) w.push(u[i]);
            state.cities[flags._].lin = v, state.cities[flags._].v = w;
        }
    }

    // AI
    {
        for (var i = 1; i < state.countries.length; i++)
            if (i != flags.xzgj && !state.countries[i].sile) {
                var city = [],
                    cnt = 0;
                for (var j = 1; j < state.cities.length; j++)
                    if (state.cities[j].gj == i) {
                        var kyzz = 0;
                        cnt = cnt + 1;
                        for (var k = 1; k < state.cities.length; k++)
                            if (flags.lt[k][j] && flags.zz[state.cities[j].gj][state.cities[k].gj] && (kyzz == 0 || state.cities[k].hp < state.cities[kyzz].hp)) kyzz = k;
                        if (kyzz > 0 || state.cities[j].lin.length > 0) city.push(j);
                    }
                if (city.length == 0) {
                    for (var j = 1; j < state.cities.length; j++)
                        if (state.cities[j].gj == i) city.push(j);
                }
                // 科研
                state.countries[i].yffx = core.rand(4) + 1;
                if (state.countries[i].yffx <= 2 && state.countries[i].yffy[5][1] > 0) state.countries[i].yffx = 5;
                for (var j = 1; j < state.cities.length; j++)
                    if (state.cities[j].gj == i) {
                        var kyzz = 0;
                        for (var k = 1; k < state.cities.length; k++)
                            if (flags.lt[k][j] && flags.zz[state.cities[j].gj][state.cities[k].gj] && (kyzz == 0 || state.cities[k].hp < state.cities[kyzz].hp)) kyzz = k;
                        if (kyzz && state.countries[i].dd.length > 0 && core.rand(5) < 2 && (state.cities[kyzz].hp > 4000 || state.cities[kyzz].v.length > 5)) {
                            flags.dw[state.countries[i].dd[0]].mb = kyzz;
                            flags.dw[state.countries[i].dd[0]].mbsj = 20;
                            state.countries[i].dd.splice(0, 1);
                        }
                        if (!kyzz && !state.cities[j].lin.length) {
                            var l = Math.floor((state.cities[j].v.length - 1) / 2);
                            if (l > 0 && cnt > 2) {
                                for (var k = 0; k < l; k++) {
                                    flags.dw[state.cities[j].v[k]].mb = city[core.rand(city.length)];
                                    flags.dw[state.cities[j].v[k]].mbsj = 10;
                                }
                                state.cities[j].v.splice(0, l);
                            }
                        }
                        if (kyzz && !state.cities[j].lin.length) {
                            var l = Math.floor((state.cities[j].v.length - 1) / 1.7);
                            if (l > 0) {
                                for (var k = 0; k < l; k++) {
                                    flags.dw[state.cities[j].v[k]].mb = kyzz;
                                    flags.dw[state.cities[j].v[k]].mbsj = 10;
                                }
                                state.cities[j].v.splice(0, l);
                            }
                        }
                        if (state.cities[j].sc.length > 0) continue;
                        var sj = core.rand(100);
                        var _ = Math.pow(2, state.cities[j].rk / 100);
                        if (sj <= _ && state.cities[j].rk + (100 / state.cities[j].ic + 2) * state.cities[j].rkzz >= 100) state.cities[j].sc.push({ lx: 8, xh: 1, ys: 100 });
                        else if (sj <= _ + _ && state.cities[j].rk + (100 / state.cities[j].ic + 2) * state.cities[j].rkzz >= 50) state.cities[j].sc.push({ lx: 9, xh: 1, ys: 100 });
                        if (state.cities[j].sc.length > 0) continue;
                        sj = core.rand(100);
                        if (sj <= 4 && state.cities[j].ic >= 8 && state.countries[i].yffy[5][1] <= 0) state.cities[j].sc.push({ lx: 5, xh: 1, ys: 1500 });
                        else {
                            var lx = sj <= 57 ? 3 : sj <= 73 ? 2 : sj <= 94 ? 1 : 4;
                            var xh = 0;
                            while (state.countries[i].yffy[lx][xh + 1] <= 0 && xh < 5) xh += 1;
                            if (lx == 4 && xh > 3) xh = 3;
                            if (xh > 0) state.cities[j].sc.push({ lx: lx, xh: xh, ys: flags.mil[lx][xh].xh });
                        }
                    }
            }
    }
});

function setResearchField(field) {
    state.countries[flags.xzgj].yffx = field;
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
