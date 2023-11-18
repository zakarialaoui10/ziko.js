const conv1d=(input, kernel , circular = true)=>{
    const LENGTH_INP = input.length;
    const LENGTH_KER = kernel.length;
    const output = [];
    const LENGTH_OUT = circular ? Math.max(LENGTH_INP,LENGTH_KER) : LENGTH_INP + LENGTH_KER - 1;
    for (let i = 0; i < LENGTH_OUT; i++) {
        let sum = 0;
        for (let j = 0; j < LENGTH_KER; j++) {
            const inputIndex = i + j - Math.floor(LENGTH_KER / 2);
            // Apply zero-padding for out-of-bounds indices
            const inputValue = inputIndex >= 0 && inputIndex < LENGTH_INP
                ? input[inputIndex]
                : 0;
            sum += inputValue * kernel[j];
        }
        output.push(sum);
    }
    return output;
}

var convolute=(parent,kernel = [0, -1, 0, -1, 5, -1, 0, -1, 0], x1 = 0, y1 = 0, x2 = parent.element.width, y2 = parent.element.height)=>{
    if(kernel instanceof Matrix)kernel=kernel.arr.flat(1)
    var opaque = 1;
    var pixels = parent.ctx.getImageData(x1, y1, x2, y2);
    var side = Math.round(sqrt(kernel.length));
    var halfSide = Math.floor(side / 2);
    var src = pixels.data;
    var sw = pixels.width;
    var sh = pixels.height;
    // pad output by the convolution matrix
    var w = sw;
    var h = sh;
    var output = parent.ctx.createImageData(w, h);
    var dst = output.data;
    // go through the destination image pixels
    var alphaFac = opaque ? 1 : 0;
    for (var y = 0; y < h; y++) {
        for (var x = 0; x < w; x++) {
            var sy = y;
            var sx = x;
            var dstOff = (y * w + x) * 4;
            // calculate the weighed sum of the source image pixels that
            // fall under the convolution matrix
            var r = 0,
                g = 0,
                b = 0,
                a = 0;
            for (var cy = 0; cy < side; cy++) {
                for (var cx = 0; cx < side; cx++) {
                    var scy = sy + cy - halfSide;
                    var scx = sx + cx - halfSide;
                    if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
                        var srcOff = (scy * sw + scx) * 4;
                        var wt = kernel[cy * side + cx];
                        r += src[srcOff] * wt;
                        g += src[srcOff + 1] * wt;
                        b += src[srcOff + 2] * wt;
                        a += src[srcOff + 3] * wt;
                    }
                }
            }
            dst[dstOff] = r;
            dst[dstOff + 1] = g;
            dst[dstOff + 2] = b;
            dst[dstOff + 3] = a + alphaFac * (255 - a);
        }
    }
    return output;
}

convolute=(parent,kernel = [0, -1, 0, -1, 5, -1, 0, -1, 0], x1 = 0, y1 = 0, x2 = parent.element.width, y2 = parent.element.height)=>{
    if(kernel instanceof Matrix)kernel=kernel.arr.flat(1)
    var opaque = 1;
    var pixels = parent.ctx.getImageData(x1, y1, x2, y2);
    var side = Math.round(sqrt(kernel.length));
    var halfSide = Math.floor(side / 2);
    var src = pixels.data;
    var sw = pixels.width;
    var sh = pixels.height;
    // pad output by the convolution matrix
    var w = sw;
    var h = sh;
    var output = parent.ctx.createImageData(w, h);
    var dst = output.data;
    // go through the destination image pixels
    var alphaFac = opaque ? 1 : 0;
    for (var y = 0; y < h; y++) {
        for (var x = 0; x < w; x++) {
            var sy = y;
            var sx = x;
            var dstOff = (y * w + x) * 4;
            // calculate the weighed sum of the source image pixels that
            // fall under the convolution matrix
            var r = 0,
                g = 0,
                b = 0,
                a = 0;
            for (var cy = 0; cy < side; cy++) {
                for (var cx = 0; cx < side; cx++) {
                    var scy = sy + cy - halfSide;
                    var scx = sx + cx - halfSide;
                    if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
                        var srcOff = (scy * sw + scx) * 4;
                        var wt = kernel[cy * side + cx];
                        r += src[srcOff] * wt;
                        g += src[srcOff + 1] * wt;
                        b += src[srcOff + 2] * wt;
                        a += src[srcOff + 3] * wt;
                    }
                }
            }
            dst[dstOff] = r;
            dst[dstOff + 1] = g;
            dst[dstOff + 2] = b;
            dst[dstOff + 3] = a + alphaFac * (255 - a);
        }
    }
    return output;
}
window.convolute=convolute
window.conv1d=conv1d;
export{conv1d,convolute}