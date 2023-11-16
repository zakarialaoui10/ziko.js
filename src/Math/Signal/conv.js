function convolution1D(inputArray, kernel) {
    const inputLength = inputArray.length;
    const kernelLength = kernel.length;
    const output = [];

    // Iterate over each element in the input array
    for (let i = 0; i < inputLength; i++) {
        let sum = 0;

        // Iterate over each element in the kernel
        for (let j = 0; j < kernelLength; j++) {
            // Calculate the index in the input array, considering the kernel position
            const inputIndex = i + j - Math.floor(kernelLength / 2);

            // Apply zero-padding for out-of-bounds indices
            const inputValue = inputIndex >= 0 && inputIndex < inputLength
                ? inputArray[inputIndex]
                : 0;

            // Multiply the input value by the corresponding kernel weight
            sum += inputValue * kernel[j];
        }

        // Store the result in the output array
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
export{convolute}