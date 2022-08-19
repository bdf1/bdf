

const rand = function (num: string) {
    var rand = core.getFlag('__rand__');
    rand = this.__next_rand(rand);
    core.setFlag('__rand__', rand);
    var ans = rand / 2147483647;
    if (num && num > 0)
        return Math.floor(ans * num);
    return ans;
}

const rand2 = registerQuery("random", () => {

));

////// 生成随机数（录像方法） //////
utils.prototype.rand2 = function (num) {
    num = num || 2147483648;
    num = Math.abs(num);

    var value;
    if (core.isReplaying()) {
        var action = core.status.replay.toReplay.shift();
        if (action.indexOf("random:") == 0) {
            value = parseInt(action.substring(7));
            if (isNaN(value) || value >= num || value < 0) {
                console.warn('错误！当前random:项超过范围。将重新随机生成！');
                value = Math.floor(Math.random() * num);
            }
        }
        else {
            console.warn('错误！当前需要一个random:项。将重新随机生成！');
            value = Math.floor(Math.random() * num);
        }
    }
    else {
        value = Math.floor(Math.random() * num);
    }
    core.status.route.push("random:" + value);
    return value;
}

utils.prototype.__init_seed = function () {
    var rand = new Date().getTime() % 34834795 + 3534;
    rand = this.__next_rand(rand);
    rand = this.__next_rand(rand);
    rand = this.__next_rand(rand);
    core.setFlag('__seed__', rand);
    core.setFlag('__rand__', rand);
}

utils.prototype.__next_rand = function (_rand) {
    _rand = (_rand % 127773) * 16807 - ~~(_rand / 127773) * 2836;
    _rand += _rand < 0 ? 2147483647 : 0;
    return _rand;
}