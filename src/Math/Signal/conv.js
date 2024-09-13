import { Matrix , matrix } from "../matrix/index.js";
import { sqrt } from "../functions/index.js";
const conv1d=(input, kernel , circular = true)=>{
    const INPUT_LENGTH = input.length;
    const KERNEL_LENGTH = kernel.length;
    const output = [];
    const LENGTH_OUT = circular ? Math.max(INPUT_LENGTH,KERNEL_LENGTH) : INPUT_LENGTH + KERNEL_LENGTH - 1;
    for (let i = 0; i < LENGTH_OUT; i++) {
        let sum = 0;
        for (let j = 0; j < KERNEL_LENGTH; j++) {
            const inputIndex = i + j - Math.floor(KERNEL_LENGTH / 2);
            // Apply zero-padding for out-of-bounds indices
            const inputValue = inputIndex >= 0 && inputIndex < INPUT_LENGTH
                ? input[inputIndex]
                : 0;
            sum += inputValue * kernel[j];
        }
        output.push(sum);
    }
    return output;
}

const conv2d = (input, kernel, circular = true) => {
    if(!(input instanceof Matrix)) input = matrix(input);
    if(!(kernel instanceof Matrix)) kernel = matrix(kernel);
    const INPUT_ROWS=input.rows;
    const INPUT_COLS=input.cols;
    const OUTPUT_ROWS = circular ? Math.max(input.rows,kernel.rows) : input.rows + kernel.rows-1;
    const OUTPUT_COLS = circular ? Math.max(input.cols,kernel.cols) : input.cols + kernel.cols-1;
    const KERNEL_SIZE = kernel.rows;
    const output = [];
    for (let i = 0; i < OUTPUT_ROWS ; i++) {
        const row = [];
        for (let j = 0; j < OUTPUT_COLS ; j++) {
            let sum = 0;
            for (let k = 0; k < KERNEL_SIZE; k++) {
                for (let l = 0; l < KERNEL_SIZE; l++) {
                    const rowIndex = i + k - Math.floor(KERNEL_SIZE / 2);
                    const colIndex = j + l - Math.floor(KERNEL_SIZE / 2);
                    // Apply zero-padding for out-of-bounds indices
                    const inputValue = (rowIndex >= 0 && rowIndex < INPUT_ROWS &&
                                        colIndex >= 0 && colIndex < INPUT_COLS)
                        ? input[rowIndex][colIndex]
                        : 0;
                    sum += inputValue * kernel[k][l];
                }
            }
            row.push(sum);
        }
        output.push(row);
    }
    return output;
};

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
const conv=(input,kernel,circular)=>{
    if(input instanceof Matrix || (input instanceof Array && input[0][0]))return conv2d(input,kernel,circular);
    return conv1d(input,kernel,circular)
}
const circularConv=(input,kernel)=>conv(input,kernel,true);
const linearConv=(input,kernel)=>conv(input,kernel,false);
const circularConv1d=(input,kernel)=>conv1d(input,kernel,true);
const circularConv2d=(input,kernel)=>conv2d(input,kernel,true);
const linearConv1d=(input,kernel)=>conv1d(input,kernel,false);
const linearConv2d=(input,kernel)=>conv2d(input,kernel,false);
export{
    conv1d,
    conv2d,
    conv,
    circularConv,
    linearConv,
    circularConv1d,
    linearConv1d,
    circularConv2d,
    linearConv2d,
    convolute
}