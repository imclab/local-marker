function localMaker(canvas, opts) {
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,canvas.width, canvas.height);

    opts = opts || {};
    opts.inner = opts.inner || '#4387a9';
    opts.outer = opts.outer || '#a1c3d4';

    var mid = 15,
        bigRight = mid + 13,
        bigLeft = mid - 13,
        smallTop = 4;

    var shadowHeight = 7;
    var shadowWidth = 13;
    var shadowAxis = 38;
    var shades = ['#efefef', '#e0e0e0', '#ccc', '#c1c1c1'];

    for (var i = 0; i < 5; i++) {
        var shadowRight = mid + (shadowWidth),
            shadowLeft = mid - (shadowWidth),
            shadowTop = shadowAxis - (shadowHeight),
            shadowBottom = shadowAxis + (shadowHeight);
        ctx.moveTo(mid, shadowTop);
        ctx.quadraticCurveTo(shadowRight - 2, shadowTop,
            shadowRight, shadowAxis);
        ctx.quadraticCurveTo(shadowRight - 2, shadowBottom,
            mid, shadowBottom);
        ctx.quadraticCurveTo(shadowLeft + 2, shadowBottom,
            shadowLeft, shadowAxis);
        ctx.quadraticCurveTo(shadowLeft + 2, shadowTop,
            mid, shadowTop);
        ctx.fillStyle = shades[i];
        ctx.fill();
        ctx.beginPath();
        shadowWidth -= 2;
        shadowHeight -= 2;
    }

    // inner bubble
    ctx.moveTo(mid, 1);
    ctx.bezierCurveTo(
        bigRight - 10, 1,
        bigRight, 1,
        bigRight, 15);
    ctx.bezierCurveTo(
        bigRight, 15,
        bigRight, 20,
        mid, 37);
    ctx.bezierCurveTo(
        bigLeft, 20,
        bigLeft, 15,
        bigLeft, 15);
    ctx.bezierCurveTo(
        bigLeft, 1,
        mid, 1,
        mid, 1);
    ctx.fillStyle = opts.outer;
    ctx.fill();
    ctx.beginPath();

    ctx.moveTo(15, smallTop);
    // t->l
    ctx.bezierCurveTo(
        15, smallTop,
        25, smallTop,
        25, 15);
    // l->b
    ctx.bezierCurveTo(
        25, 15,
        25, 20,
        15, 32);
    // b->r
    ctx.bezierCurveTo(
        5, 20,
        5, 15,
        5, 15);
    // r->t
    ctx.bezierCurveTo(
        5, smallTop,
        mid, smallTop,
        mid, smallTop);
    ctx.fillStyle = opts.inner;
    ctx.fill();


    if (opts.maki && opts.symbol) {
        var makiCan = document.createElement('canvas');
        makiCan.width = makiCan.height = 22;
        makiCtx = makiCan.getContext('2d');
        makiCtx.drawImage(
            opts.maki,
            opts.symbol[0],
            opts.symbol[1],
            1512/2,
            672/2,
            0,
            0,
            1512/4,
            672/4);
        ctx.drawImage(makiCan, 2, 3);
    }
}

function localMaki(cb, uri) {
    var im = new Image();
    im.onload = function() {
        cb(this);
    };
    im.src = uri || 'maki.png';
}
