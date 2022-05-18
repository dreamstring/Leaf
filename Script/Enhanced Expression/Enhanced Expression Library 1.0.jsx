//--- Global Variables ---//
//--- 全局变量 ---//

var frames = Number(thisLayer.timeToFrames(thisLayer.time)); //时间帧数
var compFrameDuration = Number(thisComp.frameDuration); //合成内一帧的持续时长
var fps = 1.0 / compFrameDuration;//合成帧率
var compDuration = thisComp.duration; //当前合成的持续时间
var compStartTime = thisComp.displayStartTime;//当前合成的开始时间
var compEndTime = compStartTime + compDuration;//当前合成的结束时间
var compWidth = thisComp.width;//当前合成的宽度
var compHeight = thisComp.height;//当前合成的高度
var compSize = [compWidth,compHeight];//当前合成大小
var timeCode = timeToTimecode(thisLayer.time + thisComp.displayStartTime, fps, false);//时间码
var timeEpsilon = compFrameDuration / 10;//帧间极小值
var nativeCode = "function () { [native code] }";//原生代码
var fullPath = thisLayer.thisProject.fullPath;//完整路径

//--- Global ---//
//--- 全局 ---//

//抛出错误//
function alert(e) {
    if (getExpressionEngine() == "js") {
        throw new Error(e);
    }
    if (getExpressionEngine() == "es") {
        $.error = e;
    }

}

//从标记调用表达式//
function getExpressionFromMarkerKey(markerKey) {
    eval(markerKey.comment);
    return setExpressionToMarkerKey();
}

//从源文本调用表达式//
function getExpressionFromSourceText(sourceText) {
    eval(sourceText.value);
    return setExpressionToSourceText();
}

//获取当前表达式引擎版本//
function getExpressionEngine() {
    var expressionEngine = this.toString() == "[object Object]" ? "js" : "es";
    return expressionEngine;
}

//获取当前软件语言//
function getLanguage() {
    try { thisLayer(0); }
    catch (error) {
        if (error == "Error: index out of range") return "en_US";
        if (error == "Error: 索引超出范围") return "zh_CN";
        return error;
    }
}

//获得对象的类型//
function getClassName(targetObject) {
    var expressionEngine = getExpressionEngine();
    if (expressionEngine == "js") {
        return targetObject.className.toString();
    }
    if (expressionEngine == "es") {
        return targetObject.constructor.name.toString();
    }
}

//判断属性索引是否有效//
function isValidPropertyIndex(targetProperty, index) {
    try { return !!targetProperty(index); }
    catch (error) { return false; }
}

//判断属性父对象是否有效//
function isValidPropertyGroup(targetProperty, countUp) {
    try { return !!targetProperty.propertyGroup(countUp); }
    catch (error) { return false; }
}

//判断效果是否存在//
function isValidEffectIndex(targetLayer, index) {
    try { return !!targetLayer.effect(index); }
    catch (error) { return false; }
}

//判断是否是效果组//
function isEffectGroup(targetProperty, index) {
    try {
        return !targetProperty(index);
    } catch (error) {
        if (getLanguage() == "zh_CN" && error == "Error: 无法使用此参数类型") return true;
        if (getLanguage() == "en_US" && error == "Error: can’t use this param type") return true;
    }
}

//--- Tool ---//
//--- 工具 ---//
var ToolExtra = function () {
    var module = {};

    //获得格式化时间(JS)//
    module.getFormatTime = function () {
        var expressionEngine = getExpressionEngine();
        if (expressionEngine == "js") {
            var nowDate = new Date();
            var yy = nowDate.getFullYear();
            var mm = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;
            var dd = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
            var hh = new Date().getHours();
            var mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
            var ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
            dateTime = yy + '' + mm + '' + dd + '-' + hh + '' + mf + '' + ss;
            return dateTime;
        }
        if (expressionEngine == "es") {
            if (getLanguage() == "zh_CN") alert("该函数仅适用于js表达式引擎。");
            if (getLanguage() == "en_US") alert("This function is only available for the js expression engine。");
        }
    }

    //去掉首尾空格//
    module.trimString = function (string) {
        return string.replace(/(^\s*)|(\s*$)/g, "");
    }

    //计算字符数//
    module.textCount = function (sourceText, type) {
        type = type || "word";
        switch (type) {
            case "word":
                return sourceText.split(" ").length;
            case "line":
                return Math.max(sourceText.split(/[^\r\n\3]*/gm).length - 1, 0);
            case "char":
                return sourceText.length;
            default:
                return 1;
        }
    }

    return module;
}()

//--- Vector Math ---//
//--- 矢量数学 ---//

var VectorMathExtra = function () {
    var module = {};

    //两交点和交点切向量求圆心//
    module.getCircleParameter = function (tangent1, tangent2, position1, position2) {
        var alpha = VectorMathExtra.getVectorAngle(tangent1, tangent2); //弧度制夹角
        var positionDifferenceValue = thisLayer.sub(position1, position2); //两点位置差值
        var halfChord = thisLayer.length(positionDifferenceValue) / 2; //半弦长
        var R = halfChord / Math.cos(alpha / 2);
        var x1 = position1[0];
        var y1 = position1[1];
        var x2 = position2[0];
        var y2 = position2[1];
        var C1Numerator = Math.pow(x2, 2) - Math.pow(x1, 2) + Math.pow(y2, 2) - Math.pow(y1, 2); //C1分子
        var C1Denominator = 2 * (x2 - x1); //C1分母
        var C1 = C1Numerator / C1Denominator;
        var C2 = (y2 - y1) / (x2 - x1);
        var A = 1 + Math.pow(C2, 2);
        var B = 2 * (x1 - C1) * C2 - 2 * y1;
        var C = Math.pow(x1 - C1, 2) + Math.pow(y1, 2) - Math.pow(R, 2);
        //delta决定了有两个解，但是需要验证第一个交点的切向量垂直于交点径向量
        var y0_1 = (-B + Math.sqrt(Math.pow(B, 2) - 4 * A * C)) / (2 * A);
        var x0_1 = C1 - C2 * y0_1;
        var y0_2 = (-B - Math.sqrt(Math.pow(B, 2) - 4 * A * C)) / (2 * A);
        var x0_2 = C1 - C2 * y0_2;
        var center1 = [x0_1, y0_1];
        var center2 = [x0_2, y0_2];
        var center;
        judge1 = VectorMathExtra.getVectorAngle(thisLayer.sub(center1, position1), tangent1);
        judge2 = VectorMathExtra.getVectorAngle(thisLayer.sub(center2, position1), tangent1);
        //两个切向量和交点径向量夹角夹角小的是正解(或者说叫优解)
        if (Math.abs(Math.PI / 2 - judge1) < Math.abs(Math.PI / 2 - judge2)) {
            center = center1;
        }
        else {
            center = center2;
        }
        return {
            R: R,
            center: center,
        };
    };

    //获取点集相邻点的斜率角//
    module.getAnglesBetweenPoints = function (originPoints) {
        var slopeAngle, angle, point1, point2;
        angle = [];
        for (var i = 0, l = originPoints.length; i < l; i++) {
            point1 = originPoints[i];
            point2 = originPoints[(i + 1) % l];
            slopeAngle = VectorMathExtra.getAngle(point1, point2);
            angle[i] = slopeAngle;
        }
        if (angle[angle.length - 1] === 0) {
            angle[angle.length - 1] = 360;
        }
        return angle;
    };

    //获取点集中相邻点的距离//
    module.getDistancesBetweenPoints = function (originPoints) {
        var lineLength, distance, point1, point2;
        distance = [];
        for (var i = 0, l = originPoints.length; i < l; i++) {
            var point1 = originPoints[i];
            var point2 = originPoints[(i + 1) % l];
            lineLength = VectorMathExtra.getDistance(point1, point2);
            distance[i] = lineLength;
        }
        return distance;
    };

    //计算数量积//
    module.multiply = function (array1, array2) {
        return [array1[0] * array2[0], array1[1] * array2[1]];
    };

    //计算数量商//
    module.divide = function (array1, array2) {
        return [array1[0] / array2[0], array1[1] / array2[1]];
    };

    //线性平移(点2沿点1平移)
    module.transit = function (point1, point2, position) {
        var twoPointSubtraction = thisLayer.sub(point2, point1);
        var x = twoPointSubtraction[0] + position[0] + point1[0];
        var y = twoPointSubtraction[1] + position[1] + point1[1];
        return [MathExtra.retainDecimals(x), MathExtra.retainDecimals(y)];
    };

    //线性旋转(点2绕点1旋转)//
    module.rotate = function (point1, point2, degreeAngle) {
        var radianAngle = MathExtra.degreesToRadians(degreeAngle);
        var twoPointSubtraction = thisLayer.sub(point2, point1);
        var x = twoPointSubtraction[0] * Math.cos(radianAngle) - twoPointSubtraction[1] * Math.sin(radianAngle) + point1[0];
        var y = twoPointSubtraction[0] * Math.sin(radianAngle) + twoPointSubtraction[1] * Math.cos(radianAngle) + point1[1];
        return [MathExtra.retainDecimals(x), MathExtra.retainDecimals(y)];
    };

    //线性缩放(点2以点1缩放)//
    module.scale = function (point1, point2, scaleRate) {
        var normaliseScale = scaleRate;
        var twoPointSubtraction = thisLayer.sub(point2, point1);
        var x = normaliseScale[0] * twoPointSubtraction[0] + point1[0];
        var y = normaliseScale[1] * twoPointSubtraction[1] + point1[1];
        return [MathExtra.retainDecimals(x), MathExtra.retainDecimals(y)];
    };

    //归一化旋转角//
    module.normaliseRotation = function (angle) {
        return MathExtra.getRemainder(angle, 360);
    };

    //获得二维空间内的两点斜率角（纯数学计算，避免错误）//
    module.getAngle = function (point1, point2) {
        var dx = point1[0] - point2[0];
        var dy = point1[1] - point2[1];
        var radians = Math.atan2(dy, dx);
        var degrees = MathExtra.radiansToDegrees(radians);
        var degrees = Math.round(180 - degrees);
        return degrees;
    };

    //获得二维空间内的两点线段长（纯数学计算，避免错误）//
    module.getDistance = function (point1, point2) {
        var dx = point1[0] - point2[0];
        var dy = point1[1] - point2[1];
        var distance = Math.sqrt((dx * dx) + (dy * dy));
        return distance;
    };

    //获得二维空间内的两点斜率角//
    module.getLineAngle = function (point1, point2) {
        var diffreenceArray = thisLayer.sub(point1, point2);
        var radianAngle = Math.atan2(diffreenceArray[1], diffreenceArray[0]);
        var degreeAngle = radiansToDegrees(radianAngle);
        return MathExtra.retainDecimals(180 - degreeAngle);
    };

    //获得二维空间内的两点线段长//
    module.getLineLength = function (point1, point2) {
        return thisLayer.length(thisLayer.sub(point1, point2));
    };

    //两向量夹角//
    module.getVectorAngle = function (vector1, vector2) {
        return Math.acos((vector1[0] * vector2[0] + vector1[1] * vector2[1]) / (thisLayer.length(vector1) * thisLayer.length(vector2)));
    };

    //两路径最短距离(返回点2的百分比)//
    module.getShortestDistanceOnTwoPath = function (path1, path2, percentage1, precision) {
        precision = precision || 1.0; //计算的精度
        var point1 = PathPropertyExtra.getPathParameter(path1, percentage1).point;
        var percentage2 = 0;
        var originPoint2 = PathPropertyExtra.getPathParameter(path2, 0).point;
        var distance = thisLayer.length(point1, originPoint2);
        for (var i = 0; i <= 100; i += precision) {
            var point2 = PathPropertyExtra.getPathParameter(path2, i / 100).point;
            if (thisLayer.length(point1, point2) < distance) {
                distance = thisLayer.length(point1, point2);
                percentage2 = i / 100;
            }
        }
        return percentage2;
    };

    //两曲线交点//
    module.getCrossOverPoint = function (path1, path2, precision) {
        precision = precision || 100;
        pathArray1 = BezierExtra.flattenAllMultisegmentedShape(path1, precision);//路径1细分的点集
        pathArray2 = BezierExtra.flattenAllMultisegmentedShape(path2, precision);//路径2细分的点集
        linesNumber1 = path1.points().length - 1;
        linesNumber2 = path2.points().length - 1;
        var temp = Math.SQRT2 * 5;
        for (var i = 0, il = linesNumber1 * precision; i < il; i++) {
            for (var j = 0, jl = linesNumber2 * precision; j < jl; j++) {
                if (VectorMathExtra.getDistance(pathArray1[i], pathArray2[j]) < temp) {
                    temp = VectorMathExtra.getDistance(pathArray1[i], pathArray2[j]);
                    finalPoint = pathArray1[i];
                }
            }
        }
        return thisLayer.toComp(finalPoint);
    }

    //获得多边形面积
    module.getPolygonArea = function (originPoints) {
        polygonArea = 0;
        for (var i = 0, l = originPoints.length; i < l; i++) {
            p1 = originPoints[i];
            p2 = originPoints[i + 1] || originPoints[0];
            polygonArea += (p1[0] * p2[1]);
            polygonArea -= (p2[0] * p1[1]);
        }
        return polygonArea / 2;
    };

    //获取路径旋转方向(是否是顺时针)//
    module.isClockwise = function (originPoints) {
        var polygonArea = module.getPolygonArea(originPoints);
        return polygonArea > 0;
    };

    //三点构成的两向量叉乘结果（反应向量的旋转方向）//
    module.crossRotationDirection = function (a, b, o) {
        return ((a[0] - o[0]) * (b[1] - o[1])) - ((a[1] - o[1]) * (b[0] - o[0]));
    };

    return module;
}()

//--- Interpolation ---//
//--- 插值模式 ---//
var InterpolationExtra = function () {
    var module = {};

    //设置插值模式//
    module.setInterpolation = function (t, tMin, tMax, value1, value2, mode) {
        mode = mode || "linear";
        if (mode == "linear") {
            return thisLayer.linear(t, tMin, tMax, value1, value2);
        }
        if (mode == "ease") {
            return thisLayer.ease(t, tMin, tMax, value1, value2);
        }
        if (mode == "easeIn") {
            return thisLayer.easeIn(t, tMin, tMax, value1, value2);
        }
        if (mode == "easeIOut") {
            return thisLayer.easeOut(t, tMin, tMax, value1, value2);
        }
    };

    //设置缓动模式//
    module.setEasing = function (mode, elapsedTime, beginValue, changeValue, duration) {
        var easingMode = {};

        easingMode.linearTween = function (elapsedTime, beginValue, changeValue, duration) {
            return changeValue * elapsedTime / duration + beginValue;
        };

        easingMode.easeInQuad = function (elapsedTime, beginValue, changeValue, duration) {
            return changeValue * (elapsedTime /= duration) * elapsedTime + beginValue;
        };

        easingMode.easeOutQuad = function (elapsedTime, beginValue, changeValue, duration) {
            return -changeValue * (elapsedTime /= duration) * (elapsedTime - 2) + beginValue;
        };

        easingMode.easeInOutQuad = function (elapsedTime, beginValue, changeValue, duration) {
            if ((elapsedTime /= duration / 2) < 1) return changeValue / 2 * elapsedTime * elapsedTime + beginValue;
            return -changeValue / 2 * ((--elapsedTime) * (elapsedTime - 2) - 1) + beginValue;
        };

        easingMode.easeInCubic = function (elapsedTime, beginValue, changeValue, duration) {
            return changeValue * Math.pow(elapsedTime / duration, 3) + beginValue;
        };

        easingMode.easeOutCubic = function (elapsedTime, beginValue, changeValue, duration) {
            return changeValue * (Math.pow(elapsedTime / duration - 1, 3) + 1) + beginValue;
        };

        easingMode.easeInOutCubic = function (elapsedTime, beginValue, changeValue, duration) {
            if ((elapsedTime /= duration / 2) < 1)
                return changeValue / 2 * Math.pow(elapsedTime, 3) + beginValue;
            return changeValue / 2 * (Math.pow(elapsedTime - 2, 3) + 2) + beginValue;
        };

        easingMode.easeInQuart = function (elapsedTime, beginValue, changeValue, duration) {
            return changeValue * Math.pow(elapsedTime / duration, 4) + beginValue;
        };

        easingMode.easeOutQuart = function (elapsedTime, beginValue, changeValue, duration) {
            return -changeValue * (Math.pow(elapsedTime / duration - 1, 4) - 1) + beginValue;
        };

        easingMode.easeInOutQuart = function (elapsedTime, beginValue, changeValue, duration) {
            if ((elapsedTime /= duration / 2) < 1)
                return changeValue / 2 * Math.pow(elapsedTime, 4) + beginValue;
            return -changeValue / 2 * (Math.pow(elapsedTime - 2, 4) - 2) + beginValue;
        };

        easingMode.easeInQuint = function (elapsedTime, beginValue, changeValue, duration) {
            return changeValue * Math.pow(elapsedTime / duration, 5) + beginValue;
        };

        easingMode.easeOutQuint = function (elapsedTime, beginValue, changeValue, duration) {
            return changeValue * (Math.pow(elapsedTime / duration - 1, 5) + 1) + beginValue;
        };

        easingMode.easeInOutQuint = function (elapsedTime, beginValue, changeValue, duration) {
            if ((elapsedTime /= duration / 2) < 1)
                return changeValue / 2 * Math.pow(elapsedTime, 5) + beginValue;
            return changeValue / 2 * (Math.pow(elapsedTime - 2, 5) + 2) + beginValue;
        };

        easingMode.easeInSine = function (elapsedTime, beginValue, changeValue, duration) {
            return changeValue * (1 - Math.cos(elapsedTime / duration * (Math.PI / 2))) + beginValue;
        };

        easingMode.easeOutSine = function (elapsedTime, beginValue, changeValue, duration) {
            return changeValue * Math.sin(elapsedTime / duration * (Math.PI / 2)) + beginValue;
        };

        easingMode.easeInOutSine = function (elapsedTime, beginValue, changeValue, duration) {
            return changeValue / 2 * (1 - Math.cos(Math.PI * elapsedTime / duration)) + beginValue;
        };

        easingMode.easeInExpo = function (elapsedTime, beginValue, changeValue, duration) {
            return changeValue * Math.pow(2, 10 * (elapsedTime / duration - 1)) + beginValue;
        };

        easingMode.easeOutExpo = function (elapsedTime, beginValue, changeValue, duration) {
            return changeValue * (-Math.pow(2, -10 * elapsedTime / duration) + 1) + beginValue;
        };

        easingMode.easeInOutExpo = function (elapsedTime, beginValue, changeValue, duration) {
            if ((elapsedTime /= duration / 2) < 1)
                return changeValue / 2 * Math.pow(2, 10 * (elapsedTime - 1)) + beginValue;
            return changeValue / 2 * (-Math.pow(2, -10 * --elapsedTime) + 2) + beginValue;
        };

        easingMode.easeInCirc = function (elapsedTime, beginValue, changeValue, duration) {
            return changeValue * (1 - Math.sqrt(1 - (elapsedTime /= duration) * elapsedTime)) + beginValue;
        };

        easingMode.easeOutCirc = function (elapsedTime, beginValue, changeValue, duration) {
            return changeValue * Math.sqrt(1 - (elapsedTime = elapsedTime / duration - 1) * elapsedTime) + beginValue;
        };

        easingMode.easeInOutCirc = function (elapsedTime, beginValue, changeValue, duration) {
            if ((elapsedTime /= duration / 2) < 1)
                return changeValue / 2 * (1 - Math.sqrt(1 - elapsedTime * elapsedTime)) + beginValue;
            return changeValue / 2 * (Math.sqrt(1 - (elapsedTime -= 2) * elapsedTime) + 1) + beginValue;
        };

        easingMode.easeInBounce = function (elapsedTime, beginValue, changeValue, duration) {
            return changeValue - easingMode.easeOutBounce(duration - elapsedTime, 0, changeValue, duration) + beginValue;
        };

        easingMode.easeOutBounce = function (elapsedTime, beginValue, changeValue, duration) {
            if ((elapsedTime /= duration) < (1 / 2.75)) {
                return changeValue * (7.5625 * elapsedTime * elapsedTime) + beginValue;
            } else if (elapsedTime < (2 / 2.75)) {
                return changeValue * (7.5625 * (elapsedTime -= (1.5 / 2.75)) * elapsedTime + 0.75) + beginValue;
            } else if (elapsedTime < (2.5 / 2.75)) {
                return changeValue * (7.5625 * (elapsedTime -= (2.25 / 2.75)) * elapsedTime + 0.9375) + beginValue;
            } else {
                return changeValue * (7.5625 * (elapsedTime -= (2.625 / 2.75)) * elapsedTime + 0.984375) + beginValue;
            }
        };

        easingMode.easeInOutBounce = function (elapsedTime, beginValue, changeValue, duration) {
            if (elapsedTime < duration / 2) return easingMode.easeInBounce(elapsedTime * 2, 0, changeValue, duration) * 0.5 + beginValue;
            return easingMode.easeOutBounce(elapsedTime * 2 - duration, 0, changeValue, duration) * 0.5 + changeValue * 0.5 + beginValue;
        };

        easingMode.easeInBack = function (elapsedTime, beginValue, changeValue, duration, s) {
            if (s == undefined) s = 1.70158;
            return changeValue * (elapsedTime /= duration) * elapsedTime * ((s + 1) * elapsedTime - s) + beginValue;
        };

        easingMode.easeOutBack = function (elapsedTime, beginValue, changeValue, duration, s) {
            if (s == undefined) s = 1.70158;
            return changeValue * ((elapsedTime = elapsedTime / duration - 1) * elapsedTime * ((s + 1) * elapsedTime + s) + 1) + beginValue;
        };

        easingMode.easeInOutBack = function (elapsedTime, beginValue, changeValue, duration, s) {
            if (s == undefined) s = 1.70158;
            if ((elapsedTime /= duration / 2) < 1) return changeValue / 2 * (elapsedTime * elapsedTime * (((s *= (1.525)) + 1) * elapsedTime - s)) + beginValue;
            return changeValue / 2 * ((elapsedTime -= 2) * elapsedTime * (((s *= (1.525)) + 1) * elapsedTime + s) + 2) + beginValue;
        };

        easingMode.easeInElastic = function (elapsedTime, beginValue, changeValue, duration, amplitude, period) {
            period = period || 0.81;
            amplitude = amplitude || 50;
            if (elapsedTime == 0) return beginValue;
            if ((elapsedTime /= duration) == 1) return beginValue + changeValue;
            if (!period) period = duration * 0.3;
            if (amplitude < Math.abs(changeValue)) { amplitude = changeValue; var s = period / 4; }
            else var s = period / (2 * Math.PI) * Math.asin(changeValue / amplitude);
            return -(amplitude * Math.pow(2, 10 * (elapsedTime -= 1)) * Math.sin((elapsedTime * duration - s) * (2 * Math.PI) / period)) + beginValue;
        };

        easingMode.easeOutElastic = function (elapsedTime, beginValue, changeValue, duration, amplitude, period) {
            period = period || 0.81;
            amplitude = amplitude || 50;
            if (elapsedTime == 0) return beginValue;
            if ((elapsedTime /= duration) == 1) return beginValue + changeValue;
            if (!period) period = duration * 0.3;
            if (amplitude < Math.abs(changeValue)) { amplitude = changeValue; var s = period / 4; }
            else var s = period / (2 * Math.PI) * Math.asin(changeValue / amplitude);
            return amplitude * Math.pow(2, -10 * elapsedTime) * Math.sin((elapsedTime * duration - s) * (2 * Math.PI) / period) + changeValue + beginValue;
        };

        easingMode.easeInOutElastic = function (elapsedTime, beginValue, changeValue, duration, amplitude, period) {
            period = period || 0.81;
            amplitude = amplitude || 50;
            if (elapsedTime == 0) return beginValue;
            if ((elapsedTime /= duration / 2) == 2) return beginValue + changeValue;
            if (!period) period = duration * (0.3 * 1.5);
            if (amplitude < Math.abs(changeValue)) { amplitude = changeValue; var s = period / 4; }
            else var s = period / (2 * Math.PI) * Math.asin(changeValue / amplitude);
            if (elapsedTime < 1) return -0.5 * (amplitude * Math.pow(2, 10 * (elapsedTime -= 1)) * Math.sin((elapsedTime * duration - s) * (2 * Math.PI) / period)) + beginValue;
            return amplitude * Math.pow(2, -10 * (elapsedTime -= 1)) * Math.sin((elapsedTime * duration - s) * (2 * Math.PI) / period) * 0.5 + changeValue + beginValue;
        };

        return easingMode[mode](elapsedTime, beginValue, changeValue, duration);
    }
    return module;
}()


//--- Color Conversion ---//
//--- 颜色转换 ---//
var ColorConversionExtra = function () {
    var module = {};

    //rgb颜色数组转十六进制//
    module.rgbToHex = function (rgbaArray) {
        var rgbArray = rgbaArray;
        rgbArray.length = 3;
        var r = Math.round(rgbArray[0] * 255);
        var g = Math.round(rgbArray[1] * 255);
        var b = Math.round(rgbArray[2] * 255);
        var hexArray = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        return hexArray;
    };

    //rgb颜色数组转hsb颜色数组//
    module.rgbToHsb = function (rgbaArray) {
        var rgbArray = rgbaArray;
        rgbArray.length = 3;
        var r = rgbArray[0];
        var g = rgbArray[1];
        var b = rgbArray[2];
        var v = Math.max(r, g, b), n = v - Math.min(r, g, b);
        var h = n === 0 ? 0 : n && v === r ? (g - b) / n : v === g ? 2 + (b - r) / n : 4 + (r - g) / n;
        var hsbArray = [60 * (h < 0 ? h + 6 : h), v && (n / v) * 100, v * 100];
        return hsbArray;
    };

    //hsb颜色数组转rgb颜色数组//
    module.hsbToRgb = function (hsbArray) {
        var h = hsbArray[0];
        var s = hsbArray[1] / 100;
        var b = hsbArray[2] / 100;
        function k(n) { return (n + h / 60) % 6; }
        function f(n) { return b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1))); }
        var rgbaArray = [f(5), f(3), f(1), 1]
        return rgbaArray;
    };

    //获得颜色名字//
    module.getColorName = function (rgbaArray) {
        var hsbArray = ColorConversionExtra.rgbToHsb(rgbaArray);
        var h = hsbArray[0];
        var s = hsbArray[1];
        var b = hsbArray[2];
        var hueArray = [
            "红", "橙红", "橙", "橙黄",
            "黄", "青黄", "黄绿", "叶绿",
            "绿", "蓝绿", "蓝", "群青蓝",
            "群青", "青紫", "紫罗兰", "紫红"
        ];
        var saturationArray = ["浅", "中", "深", ""];
        var brightnessArray = ["暗", "中", "亮", ""];
        var whiteArray = ["灰", "白"];
        var colorName = brightnessArray[Math.floor(b / 100 * 3)];
        if (b == 0) {
            colorName = "黑";
        }
        else if (s == 0) {
            colorName += whiteArray[Math.floor(b / 100)];
        }
        else {
            if (saturationArray[Math.floor(s / 100 * 3)] != colorName) colorName = saturationArray[Math.floor(s / 100 * 3)] + colorName;
            colorName += hueArray[Math.floor(h / 360 * 16)];
        }
        return colorName + "色";
    }

    return module;
}()


//--- Math ---//
//--- 数学 ---//
var MathExtra = function () {
    var module = {};

    //数据补全位数//
    module.dataLeftCompleting = function (originData, bits, identifier) {
        identifier = identifier || "0";
        originData = Array(bits + 1).join(identifier) + originData;
        return originData.slice(-bits);
    };

    //绝对值比较//
    module.getSmallAbsoluteDiffence = function (num1, num2, comparedNumber) {
        if (Math.abs(num1 - comparedNumber) < Math.abs(num2 - comparedNumber)) {
            return num1;
        }
        else {
            return num2;
        }
    };

    //取余(返回正数)//
    module.getRemainder = function (originalData, divisor) {
        return ((originalData % divisor) + divisor) % divisor;
    };

    //保留指定位数小数//
    module.retainDecimals = function (originData, number) {
        var tempNumber;
        if (number == undefined) {
            number = 2;
        }
        tempNumber = Math.pow(10, number);
        return Math.round(originData * tempNumber) / tempNumber;
    };

    //约等于//
    module.approximatelyEqual = function (num1, num2, epsilon) {
        return Math.abs(num1 - num2) < epsilon;
    }

    //弧度转角度//
    module.radiansToDegrees = function (radians) {
        var degrees = (radians * 180) / Math.PI;
        return degrees;
    };

    //角度转弧度//
    module.degreesToRadians = function (degrees) {
        var radians = (degrees * Math.PI) / 180;
        return radians;
    }

    return module;
}()


//--- Layer ---//
//--- 图层 ---//
var LayerExtra = function () {
    var module = {};

    //设置锚点位置//
    module.setAnchor = function (xAlignment, yAlignment, targetLayer) {
        targetLayer = targetLayer || thisLayer;
        var layerSource = targetLayer.sourceRectAtTime();
        var horizontal = { left: 0, center: 0.5, right: 1 };
        var vertical = { top: 0, center: 0.5, bottom: 1 };
        var xValue = xAlignment != undefined ? thisLayer.add(layerSource.left, thisLayer.mul(layerSource.width, horizontal[xAlignment])) : thisProperty.value[0];
        var yValue = yAlignment != undefined ? thisLayer.add(layerSource.top, thisLayer.mul(layerSource.height, vertical[yAlignment])) : thisProperty.value[1];
        return [xValue, yValue];
    }

    //设置锚点比例//
    module.setAnchorByRate = function (xRate, yRate, targetLayer) {
        targetLayer = targetLayer || thisLayer;
        var layerSource = targetLayer.sourceRectAtTime();
        var xValue = xRate != undefined ? thisLayer.add(layerSource.left, thisLayer.mul(layerSource.width, xRate)) : thisProperty.value[0];
        var yValue = yRate != undefined ? thisLayer.add(layerSource.top, thisLayer.mul(layerSource.height, yRate)) : thisProperty.value[1];
        return [xValue, yValue];
    }

    //获得图层大小//
    module.getLayerSize = function (targetLayer, targetTime) {
        targetLayer = targetLayer || thisLayer;
        targetTime = targetTime || thisLayer.time;
        var layerSize = [
            targetLayer.sourceRectAtTime(targetTime, false).width,
            targetLayer.sourceRectAtTime(targetTime, false).height,
        ];
        return layerSize;
    }

    //缩放到合适大小//
    module.scaleToFitSize = function (originSize, targetSize, toggles = {}) {
        originToggles = {
            onlyScaleDown: false,
            onlyScaleUp: false,
            uniform: true,
        };
        for (key in originToggles) {
            if (toggles[key] == undefined) toggles[key] = originToggles[key];
        }
        var scaleFactorWidth = targetSize[0] / originSize[0];
        var scaleFactorHeight = targetSize[1] / originSize[1];
        var scaleFactor = Math.min(scaleFactorWidth, scaleFactorHeight);
        if (toggles.onlyScaleDown) {
            scaleFactor = Math.min(scaleFactor, 1);
            scaleFactorWidth = Math.min(scaleFactorWidth, 1);
            scaleFactorHeight = Math.min(scaleFactorHeight, 1);
            toggles.onlyScaleUp = !toggles.onlyScaleDown;
        }
        if (toggles.onlyScaleUp) {
            scaleFactor = Math.max(scaleFactor, 1);
            scaleFactorWidth = Math.max(scaleFactorWidth, 1);
            scaleFactorHeight = Math.max(scaleFactorHeight, 1);
            toggles.onlyScaleDown = !toggles.onlyScaleUp;
        }
        return toggles.uniform
            ? [100 * scaleFactor, 100 * scaleFactor]
            : [100 * scaleFactorWidth, 100 * scaleFactorHeight];
    }


    //字体切换//
    module.fontSwitching = function (sliderControl, targetComp) {
        var textIndex = Math.floor(MathExtra.getRemainder(sliderControl, targetComp.numLayers) + 1);
        var fontName = targetComp.layer(textIndex).text.sourceText.style.font; //合成内所有文字层的字体
        return text.sourceText.style.setFont(fontName); //设置为当前字体
    }

    //获得子级的真实位置//
    module.getChildTruePosition = function (targetLayer) {
        targetLayer = targetLayer || thisLayer;
        var childLayer = targetLayer;
        while (childLayer.hasParent) {
            childLayer = childLayer.parent;
        }
        var parentLayer = childLayer;
        return targetLayer.toWorld(parentLayer.transform.anchorPoint);
    }

    //设置属性父级(时间)//
    module.setParentPropertyAtTime = function (targetLayer, delayTime, mode) {
        var parentPosition = targetLayer.transform.position;
        var parentRotation = targetLayer.transform.rotation;
        var parentScale = targetLayer.transform.scale;
        if (mode == undefined) {
            mode = "separate";
        }
        delayTime = delayTime || 0;//延迟时间
        var positionResult = thisLayer.transform.position.value;
        var rotationResult = thisLayer.transform.rotation.value;
        var scaleResult = thisLayer.transform.scale.value;
        //线性平移
        if (parentPosition != undefined && parentPosition.numKeys > 1) {
            var positionStartTime = parentPosition.key(1).time;
            var parentPositionChanged = sub(parentPosition.valueAtTime(thisLayer.time - delayTime), parentPosition.valueAtTime(positionStartTime));
            positionResult = VectorMathExtra.transit(parentPosition.valueAtTime(thisLayer.time - delayTime), positionResult, parentPositionChanged);
        }
        //线性旋转
        if (parentRotation != undefined && parentRotation.numKeys > 1) {
            var rotationStartTime = parentRotation.key(1).time;
            var parentRotationChanged = sub(parentRotation.valueAtTime(thisLayer.time - delayTime), parentRotation.valueAtTime(rotationStartTime));
            positionResult = VectorMathExtra.rotate(parentPosition.valueAtTime(thisLayer.time - delayTime), positionResult, parentRotationChanged);
            if (mode == "connect") {
                rotationResult = add(rotationResult, parentRotationChanged);
            }
        }
        //线性缩放
        if (parentScale != undefined && parentScale.numKeys > 1) {
            var scaleStartTime = parentScale.key(1).time;
            var parentScaleChanged = VectorMathExtra.divide(parentScale.valueAtTime(thisLayer.time - delayTime), parentScale.valueAtTime(scaleStartTime));
            positionResult = VectorMathExtra.scale(parentPosition.valueAtTime(thisLayer.time - delayTime), positionResult, parentScaleChanged);
            if (mode == "connect") {
                scaleResult = VectorMathExtra.multiply(scaleResult, parentScaleChanged);
            }
        }
        //合起来是线性变换
        return {
            position: positionResult,
            rotation: rotationResult,
            scale: scaleResult,
        }
    }

    //设置属性父级(帧数)//
    module.setParentPropertyAtFrame = function (targetLayer, delayFrame, mode) {
        var parentPosition = targetLayer.transform.position;
        var parentRotation = targetLayer.transform.rotation;
        var parentScale = targetLayer.transform.scale;
        if (mode == undefined) {
            mode = "separate";
        }
        //线性平移
        delayFrame = delayFrame || 0;//时间
        var positionResult = thisLayer.transform.position.value;
        var rotationResult = thisLayer.transform.rotation.value;
        var scaleResult = thisLayer.transform.scale.value;
        if (parentPosition != undefined && parentPosition.numKeys > 1) {
            var positionStartTime = parentPosition.key(1).time;
            var parentPositionChanged = sub(PropertyExtra.valueAtFrame(parentPosition, frames - delayFrame), PropertyExtra.valueAtFrame(parentPosition, positionStartTime));
            positionResult = VectorMathExtra.transit(parentPosition.valueAtTime(thisLayer.time - delayTime), positionResult, parentPositionChanged);
        }
        //线性旋转
        if (parentRotation != undefined && parentRotation.numKeys > 1) {
            var rotationStartTime = parentRotation.key(1).time;
            var parentRotationChanged = sub(PropertyExtra.valueAtFrame(parentRotation, frames - delayFrame), PropertyExtra.valueAtFrame(parentRotation, rotationStartTime));
            positionResult = VectorMathExtra.rotate(PropertyExtra.valueAtFrame(parentPosition, frames - delayFrame), positionResult, parentRotationChanged);
            if (mode == "connect") {
                rotationResult = add(rotationResult, parentRotationChanged);
            }
        }
        //线性缩放
        if (parentScale != undefined && parentScale.numKeys > 1) {
            var scaleStartTime = parentScale.key(1).time;
            var parentScaleChanged = VectorMathExtra.divide(PropertyExtra.valueAtFrame(parentScale, frames - delayFrame), PropertyExtra.valueAtFrame(parentScale, scaleStartTime));
            positionResult = VectorMathExtra.scale(PropertyExtra.valueAtFrame(parentPosition, frames - delayFrame), positionResult, parentScaleChanged);
            if (mode == "connect") {
                scaleResult = VectorMathExtra.multiply(scaleResult, parentScaleChanged);
            }
        }
        //合起来是线性变换
        return {
            position: positionResult,
            rotation: rotationResult,
            scale: scaleResult,
        }
    }

    //不透明度父子级控制//
    module.opacityControl = function () {
        if (thisLayer.hasParent) {
            return thisLayer.parent.transform.opacity.value * thisLayer.parent.enabled;
        }
        return thisProperty.value;
    }

    //复合路径位移//
    module.compositeMotionPath = function (shapeValue, sliderControl, targetLayer) {
        targetLayer = targetLayer || thisLayer;
        var progress = MathExtra.getRemainder((sliderControl / 100), 1);
        var originPosition = PathPropertyExtra.getPathParameter(shapeValue, progress).point;
        var finalPosition = PathPropertyExtra.getPathParameter(shapeValue, 0).point;
        var offset = thisLayer.sub(targetLayer.toComp(originPosition), targetLayer.toComp(finalPosition));
        return thisLayer.add(thisProperty.value, offset);
    }

    return module;
}()

//--- Camera ---//
//--- 摄像机 ---//
var CameraExtra = function () {
    var module = {};

    //摄像机切换//
    module.cameraSwitching = function (sliderControl, mode) {
        var cameraArray = []; //摄像机图层的数组
        var targetLayer = thisLayer;
        for (var i = targetLayer.index + 1; i <= thisComp.numLayers; i++) {
            //将指定图层下的摄像机遍历存数组
            try {
                if (thisComp.layer(i).cameraOption) {
                    cameraArray.push(thisComp.layer(i));
                }
            }
            catch (e) { }
        }
        var previousLevelProperty = thisProperty.propertyGroup(1).name; //上一级属性的名字
        var num = MathExtra.getRemainder((sliderControl), cameraArray.length); //控制摄像机显示
        if (num < 0) {
            num = num + cameraArray.length;
        }
        mode = mode || "linear";
        if (mode == "hold") {
            //切换模式
            return cameraArray[Math.floor(num)](previousLevelProperty)(thisProperty.name).value;
        }
        else {
            //插值模式
            var inpointIndex = Math.floor(num);
            var outPointIndex = Math.floor(num + 1 >= cameraArray.length ? num + 1 - cameraArray.length : num + 1);
            var cameraInpoint = cameraArray[inpointIndex](previousLevelProperty)(thisProperty.name).value;
            var cameraOutpoint = cameraArray[outPointIndex](previousLevelProperty)(thisProperty.name).value;
            return InterpolationExtra.setInterpolation(num, inpointIndex, inpointIndex + 1, cameraInpoint, cameraOutpoint, mode);
        }
    }

    return module;
}()


//--- Path Property ---//
//--- 路径属性 ---//
var PathPropertyExtra = function () {
    var module = {};

    //将点集的顺序循环偏移//
    module.cycle = function (originPoints, index) {
        var finalPoints, number;
        if (index === 0) {
            return originPoints;
        }
        finalPoints = [];
        number = 0;
        for (var i = index, l = originPoints.length; i < l; i++) {
            finalPoints[number] = originPoints[i];
            number++;
        }
        for (var i = 0; i < index; i++) {
            finalPoints[number] = originPoints[i];
            number++;
        }
        return finalPoints;
    };

    //获得数组指定维度的最小值//
    module.getIndexOfMin = function (originPoints, number) {
        var minIndex, minNumber, temp;
        minIndex = 0;
        minNumber = originPoints[minIndex][number];
        for (var i = 1, l = originPoints.length; i < l; i++) {
            temp = originPoints[i][number];
            if (minNumber > temp) {
                minNumber = temp;
                minIndex = i;
            }
        }
        return minIndex;
    };

    //获得数组指定维度的最大值//
    module.getIndexOfMax = function (originPoints, number) {
        var maxIndex, maxNumber, temp;
        maxIndex = 0;
        maxNumber = originPoints[maxIndex][number];
        for (var i = 1, l = originPoints.length; i < l; i++) {
            temp = originPoints[i][number];
            if (maxNumber < temp) {
                maxNumber = temp;
                maxIndex = i;
            }
        }
        return maxIndex;
    };

    //获得数组中最后一个元素//
    module.getLast = function (originPoints) {
        return originPoints[originPoints.length - 1];
    };

    //点集中的点到首顶点的距离//
    module.progressiveSum = function (array) {
        var sum, sumArray;
        sum = 0;
        sumArray = [];
        for (var i = 0, l = array.length; i < l; i++) {
            sum += array[i];
            sumArray[i] = sum;
        }
        return sumArray;
    };

    //点集和数组两两求数量积//
    module.multiplyOnebyOne = function (points, array) {
        var multiplyResultArray = [];
        for (var i = 0, l = points.length; i < l; i++) {
            multiplyResultArray[i] = VectorMathExtra.multiply(points[i], array);
        }
        return multiplyResultArray;
    }

    //获得最低点索引//
    module.getBottomPointIndex = function (rotationAngle, slopeAngleArray) {
        var index = 0;
        for (var i = 0, l = slopeAngleArray.length - 1; i < l; i++) {
            if (rotationAngle > slopeAngleArray[i] && rotationAngle <= slopeAngleArray[i + 1]) {
                index = i + 1;
                break;
            }
        }
        return index;
    }

    //获得最高点索引//
    module.getTopPointIndex = function (rotationAngle, slopeAngleArray) {
        var index = 0;
        for (var i = 0, l = slopeAngleArray.length - 1; i < l; i++) {
            if (rotationAngle <= slopeAngleArray[i] && rotationAngle > slopeAngleArray[i + 1]) {
                index = i + 1;
                break;
            }
        }
        return index;
    }

    //滚动偏移函数//
    module.rollOffset = function (originPoints) {
        var anchorPoint = thisLayer.transform.anchorPoint.value;//锚点值
        var rotation = thisLayer.transform.rotation.value;//旋转值
        var scale = thisLayer.transform.scale.value;//缩放值
        var normaliseScale = thisLayer.div(scale, 100);//归一化的缩放值
        originPoints = PathPropertyExtra.multiplyOnebyOne(originPoints, normaliseScale);//线性移动后的点集
        anchorPoint = VectorMathExtra.multiply(anchorPoint, normaliseScale);//线性移动后的锚点
        var maxIndex = PathPropertyExtra.getIndexOfMax(originPoints, 1);//获得点击中y方向上最大值，也就是最靠下的点
        originPoints = PathPropertyExtra.cycle(originPoints, maxIndex);//将点集以最低点为首顶点
        var firstPoint = originPoints[0];//获取首顶点
        var distanceBetweenPoints = VectorMathExtra.getDistancesBetweenPoints(originPoints);//获取点集相邻点间距离
        var distanceToFirstPoint = PathPropertyExtra.progressiveSum(distanceBetweenPoints);//点集中的点到首顶点的距离
        distanceToFirstPoint.unshift(0);//首顶点到自己的距离为0
        var graphPerimeter = PathPropertyExtra.getLast(distanceToFirstPoint);//获取图形周长
        var angleBetweenPoints = VectorMathExtra.getAnglesBetweenPoints(originPoints);//获取点集相邻点的斜率角
        var revolutionsNumber = Math.floor(rotation / 360);//旋转圈数
        var normaliseRotatation = VectorMathExtra.normaliseRotation(rotation);//归一化的旋转角(剔除圈数)
        var bottomPointIndex = PathPropertyExtra.getBottomPointIndex(normaliseRotatation, angleBetweenPoints);//最低点的索引
        var pointsAfterRotation = VectorMathExtra.rotate(anchorPoint, originPoints[bottomPointIndex], rotation);//线性旋转后的点集
        var distanceToButtomPoint = distanceToFirstPoint[bottomPointIndex];//首点到最低点的距离
        if (normaliseRotatation > PathPropertyExtra.getLast(angleBetweenPoints) && normaliseRotatation < 360) {
            //如果在在最后两点间，则是周长长度
            distanceToButtomPoint = graphPerimeter;
        }
        distanceToButtomPoint += revolutionsNumber * graphPerimeter;//加上旋转圈数乘以周长的长度(转过的距离)
        var xOffset = -pointsAfterRotation[0] + firstPoint[0] + distanceToButtomPoint;//x方向上的位移
        var yOffset = -pointsAfterRotation[1] + firstPoint[1];//y方向上的位移
        return {
            x: xOffset,
            y: yOffset,
        };
    };

    //路径上百分比数据//
    module.getPathParameter = function (shapeValue, percentage, t) {
        t = t || thisLayer.time;
        var point = shapeValue.pointOnPath(percentage, t); //点
        var tangent = shapeValue.tangentOnPath(percentage, t); //切向量
        var normal = shapeValue.normalOnPath(percentage, t); //法向量
        return {
            point: point,
            tangent: tangent,
            normal: normal,
        };
    }

    //路径重采样//
    module.pathResample = function (shapeValue, sliderControl, offsetSliderControl) {
        shapeValue = shapeValue || thisProperty;
        var offset = (offsetSliderControl || 0) / 100;
        var newPoints = [];
        var sliderControl = sliderControl <= 0 ? 0.001 : sliderControl;
        for (var i = 0, l = sliderControl; i <= l; i++) {
            pointValue = (1 / sliderControl) * i + offset;
            finalPointValue = pointValue - Math.floor(pointValue);
            newPoints.push(shapeValue.pointOnPath(finalPointValue));
        }
        return newPoints;
    }

    //从位置属性空间贝塞尔创建路径//
    module.createPathFromPosition = function (targetlayer, mode) {
        mode = mode || "all";
        var newPoint = [];
        var targetPosition = targetlayer.transform.position;
        var inTime = mode == "all" ? 0 : targetPosition.key(1).time;
        var inFrame = thisLayer.timeToFrames(inTime);
        var outTime = mode == "all" ? thisComp.duration : targetPosition.key(targetPosition.numKeys).thisLayer.time;
        var outFrame = thisLayer.timeToFrames(outTime);
        var compWidth = thisComp.width;
        var compHeight = thisComp.height;
        var offset = [compWidth / 2, compHeight / 2];
        for (i = inFrame, l = outFrame; i <= l; i++) {
            pointAtTime = PropertyExtra.valueAtFrame(targetPosition, i);
            newPoint.push(sub(pointAtTime, offset));
        }
        return frames >= inFrame && frames < outFrame ? createPath(newPoint, [], [], false) : thisProperty;
    }

    //滚动函数//
    module.roll = function (originPoints) {
        var x = thisLayer.transform.position[0] + PathPropertyExtra.rollOffset(originPoints).x;
        var y = thisLayer.transform.position[1] + PathPropertyExtra.rollOffset(originPoints).y;
        var z = 0;
        if (thisLayer.transform.position.value.length > 2) {
            z = transform.position[2];
        }
        return [x, y, z];
    }

    //物理滚动函数//
    module.physicalRoll = function (shapeValue) {
        var vertical = BezierExtra.flattenMultisegmentedShape(shapeValue);
        var shapeConvexHull = PathPropertyExtra.getConvexHull(vertical);
        var rollPosition = PathPropertyExtra.roll(shapeConvexHull);
        return rollPosition;
    }

    //凸包函数//
    module.getConvexHull = function (originPoints) {
        numPoints = originPoints.length;
        //将点重新排列，优先返回y方向上大的（靠下的），假如一致则返回x方向大的(靠右的)
        originPoints.sort(function (a, b) {
            return a[1] == b[1] ? b[0] - a[0] : b[1] - a[1];
        });
        lower = [];
        //从最低点往上扫描
        for (var i = 0; i < numPoints; i += 1) {
            while (lower.length >= 2 && VectorMathExtra.crossRotationDirection(lower[lower.length - 2], lower[lower.length - 1], originPoints[i]) >= 0) {
                //叉乘结果为正，顺时针旋转，出栈
                lower.pop();
            }
            //叉乘结果为负，逆时针旋转，新的点入栈
            lower.push(originPoints[i]);
        }
        //从最高点往下扫描
        upper = [];
        for (var j = numPoints - 1; j >= 0; j--) {
            //叉乘结果为正，顺时针旋转，出栈
            while (upper.length >= 2 && VectorMathExtra.crossRotationDirection(upper[upper.length - 2], upper[upper.length - 1], originPoints[j]) >= 0) {
                upper.pop();
            }
            //叉乘结果为负，逆时针旋转，新的点入栈
            upper.push(originPoints[j]);
        }
        //此时两条线形成封闭图形，但首尾点两条线各计算一次，需要减掉
        upper.pop();
        lower.pop();
        //将两条线上的点合成点集
        convexHull = lower.concat(upper);
        return convexHull;
    }

    //路径插值//
    module.createConnectorPath = function (sliderControl, firstPath, secondPath) {
        var progress = 1 - sliderControl / 100;
        function newPathPoint(firstPoint, secondPoint) {
            return add(firstPoint, mul(sub(secondPoint, firstPoint), progress));
        }
        function forEachPathPoint(pathValue, callback) {
            var result = [];
            var index = pathValue.length;
            while (index--) {
                result[index] = callback(pathValue[index], index);
            }
            return result;
        }
        function newPathValue(property) {
            return forEachPathPoint(firstPath[property](), function (point, index) {
                return newPathPoint(point, secondPath[property]()[index]);
            });
        }
        return createPath(newPathValue("points"), newPathValue("inTangents"), newPathValue("outTangents"), true);
    }

    return module;
}()

//--- Property ---//
//--- 属性 ---//
var PropertyExtra = function () {
    var module = {};

    //高级抖动//
    module.wigglePlus = function (freq, amp, toggles = {}) {
        originToggles = {
            type: "cycle",
            loopTime: "1.0",
        }
        for (key in originToggles) {
            if (toggles[key] == undefined) toggles[key] = originToggles[key];
        }
        freq = freq || 5.0;//频率
        amp = amp || 10.0;//幅度
        var octaves = 1.0; //随机噪波
        var ampMult = 0.5; //细节
        var targetProperty = thisProperty; //循环属性
        if (targetProperty.numKeys > 1) {
            //当有关键帧的时候，在关键帧周期内循环
            var firstKeyTime = targetProperty.key(1).time;
            var lastKeyTime = targetProperty.key(targetProperty.numKeys).time;
            toggles.loopTime = lastKeyTime - firstKeyTime; //wiggle的循环周期
        }
        else {
            //当没有关键帧的时候，自定义循环周期
            var firstKeyTime = 0;
        }
        var elapsedTime = thisLayer.time % toggles.loopTime; //除以循环周期
        var wiggle1 = wiggle(freq, amp, octaves, ampMult, elapsedTime + firstKeyTime); //第一个wiggle
        var wiggle2 = wiggle(freq, amp, octaves, ampMult, elapsedTime - toggles.loopTime + firstKeyTime); //第二个wiggle
        if (targetProperty.numKeys > 1) {
            //当有关键帧的时候，在关键帧周期内循环
            return thisLayer.linear(elapsedTime, 0, toggles.loopTime, thisLayer.add(wiggle1, loopOut(toggles.type)), thisLayer.add(wiggle2, loopOut(toggles.type))); - value;
        }
        else {
            //当没有关键帧的时候，自定义循环周期
            return thisLayer.linear(elapsedTime, 0, toggles.loopTime, wiggle1, wiggle2);
        }
    }

    //波形抖动//
    module.waveWiggle = function (freq, amp, octaves) {
        freq = freq || 6.0;
        amp = amp || 20.0;
        octaves = octaves = 3.0;

        function wave(i) {
            var result = 0;
            seedRandom(i, true);
            for (var i = 1, l = octaves; i <= l; i++) {
                var randomValue = random(0, 100);
                var sin = (Math.sin((time * freq) / i + randomValue) * amp) / i;
                result += sin;
            }
            return result;
        }
        return thisLayer.add(PropertyExtra.setPropertyByDimension(thisProperty, wave), thisProperty.value);
    }

    //末尾速度延伸//
    module.velocityContinue = function (targetLayerOrComp) {
        targetLayerOrComp = targetLayerOrComp || thisLayer;
        var targetProperty = thisProperty;
        var keyNumber = targetProperty.numKeys;
        if (targetLayerOrComp.marker.numKeys) {
            finalTime = clamp(time, 0, targetLayerOrComp.marker.key(1).time);
        }
        var thisTime = (targetLayerOrComp.marker.numKeys > 0) ? finalTime : thisLayer.time;
        if (keyNumber) {
            var maxTime = targetProperty.key(keyNumber).time;
            var timeEpsilon = compFrameDuration / 10;
            var velocityVector = velocityAtTime(maxTime - timeEpsilon);
            var stopResult = add(thisProperty.value, mul(velocityVector, thisTime - maxTime - timeEpsilon));
            var finalResult = (thisLayer.time < maxTime) ? thisProperty.value : stopResult;
        }
        else {
            finalResult = thisProperty.value;
        }
        return finalResult;
    }

    //时间上的万能循环//
    module.loopPlusAtTime = function (type, mode) {
        var mode = mode || "all"; //默认是all
        var type = type || "cycle"; //默认是cycle，pingpong以及任意其他字符是pingpong
        var num = thisProperty.numKeys;
        if (num > 1) {
            var startTime = thisProperty.key(1).time;
            var endTime = thisProperty.key(num).time;
            var loopTime = thisLayer.time;
            if (mode == "in") {
                loopTime = thisLayer.clamp(thisLayer.time, compStartTime, endTime);
            }
            if (mode == "out") {
                loopTime = thisLayer.clamp(thisLayer.time, startTime, compEndTime);
            }
            var elapsedTime = loopTime - startTime;
            var trueDuration = (endTime - startTime);
            var timeRemainder = MathExtra.getRemainder(elapsedTime, trueDuration);
            var cycleTime = timeRemainder;
            var pingpongTime = (MathExtra.getRemainder(elapsedTime, 2 * trueDuration) >= trueDuration) ? trueDuration - timeRemainder : timeRemainder;
            var t = type == "cycle" ? cycleTime : pingpongTime;
            var finalTime = t + startTime;
            return thisProperty.valueAtTime(finalTime);
        }
        else {
            return thisProperty.value;
        }
    }

    //帧上的万能循环//
    module.loopPlusAtFrame = function (type, mode) {
        var mode = mode || "all"; //默认是all
        var type = type || "cycle"; //默认是cycle，pingpong以及任意其他字符是pingpong
        num = thisProperty.numKeys;
        if (num > 1) {
            var startFrame = KeyExtra.getKeyParameter(undefined, thisProperty, 1).frame;
            var endFrame = KeyExtra.getKeyParameter(undefined, thisProperty, "num").frame;
            var loopFrame = frames;
            if (mode == "in") {
                loopFrame = thisLayer.clamp(frames, thisLayer.timeToFrames(compStartTime), endFrame);
            }
            if (mode == "out") {
                loopFrame = thisLayer.clamp(thisLayer.time, startFrame, thisLayer.timeToFrames(compEndTime));
            }
            var elapsedFrame = loopFrame - startFrame;
            var trueDuration = (endFrame - startFrame);
            var timeRemainder = MathExtra.getRemainder(elapsedFrame, trueDuration);
            var cycleTime = timeRemainder;
            var pingpongTime = (MathExtra.getRemainder(elapsedFrame, 2 * trueDuration) >= trueDuration) ? trueDuration - timeRemainder : timeRemainder;
            var t = type == "cycle" ? cycleTime : pingpongTime;
            var finalFrame = t + startFrame;
            return PropertyExtra.valueAtFrame(thisProperty, finalFrame);
        }
        else {
            return thisProperty.value;
        }
    }

    //万能循环//
    module.loopPlus = module.loopPlusAtFrame;

    //具体帧下的值//
    module.valueAtFrame = function (targetProperty, targetFrame) {
        var finalTime = thisLayer.framesToTime(targetFrame);
        return targetProperty.valueAtTime(finalTime);
    }

    //具体时间下的值//
    module.valueAtTime = function (targetProperty, targetTime) {
        return targetProperty.valueAtTime(targetTime);
    }

    //具体值下的帧//
    module.frameAtValue = function (targetProperty, targetValue) {
        var inTime = targetProperty.key(1).time;
        var outTime = targetProperty.key(targetProperty.numKeys).time;
        var isIncreasing = PropertyExtra.valueAtTime(targetProperty, inTime) < PropertyExtra.valueAtTime(targetProperty, outTime);
        var lowValue = PropertyExtra.valueAtTime(targetProperty, isIncreasing ? inTime : outTime);
        var highValue = PropertyExtra.valueAtTime(targetProperty, isIncreasing ? outTime : inTime);
        var inFrame = thisLayer.timeToFrames(inTime);
        var outFrame = thisLayer.timeToFrames(outTime);
        return PropertyExtra.frameDichotomousComparision(inFrame, outFrame, lowValue, highValue, targetProperty, targetValue);
    }

    //具体值下的时间//
    module.timeAtValue = function (targetProperty, targetValue) {
        var inTime = targetProperty.key(1).time;
        var outTime = targetProperty.key(targetProperty.numKeys).time;
        var isIncreasing = PropertyExtra.valueAtTime(targetProperty, inTime) < PropertyExtra.valueAtTime(targetProperty, outTime);
        var lowValue = PropertyExtra.valueAtTime(targetProperty, isIncreasing ? inTime : outTime);
        var highValue = PropertyExtra.valueAtTime(targetProperty, isIncreasing ? outTime : inTime);
        return PropertyExtra.timeDichotomousComparision(inTime, outTime, lowValue, highValue, targetProperty, targetValue);
    }

    //和具体值进行帧上的比较比较//
    module.frameDichotomousComparision = function (inFrame, outFrame, lowValue, highValue, targetProperty, targetValue) {
        var midFrame = Math.floor(inFrame / 2 + outFrame / 2); //中间帧
        var midValue = PropertyExtra.valueAtFrame(targetProperty, midFrame); //在中间帧下的值
        var precision = 1; //精度是一帧
        //如果二分还没结束
        if (targetValue < midValue && inFrame + precision < outFrame) {
            //小于中间值去更大的区间寻找
            return PropertyExtra.frameDichotomousComparision(inFrame, midFrame, lowValue, midValue, targetProperty, targetValue);
        }
        else if (targetValue > midValue && inFrame + precision < outFrame) {
            //大于中间值去更小的区间寻找
            return PropertyExtra.frameDichotomousComparision(midFrame, outFrame, midValue, highValue, targetProperty, targetValue);
        }
        else {
            //如果二分结束，找到最符合的值
            function getMidFrame(frame1, frame2) {
                var value1 = PropertyExtra.valueAtFrame(targetProperty, frame1);
                var value2 = PropertyExtra.valueAtFrame(targetProperty, frame2);
                var finalValue = MathExtra.getSmallAbsoluteDiffence(value1, value2, targetValue);
                return finalValue == value1 ? frame1 : frame2;
            }
            midFrame = getMidFrame(midFrame - precision, midFrame);
            midFrame = getMidFrame(midFrame + precision, midFrame);
            return midFrame;
        }
    }

    //和具体值进行时间上的比较比较//
    module.timeDichotomousComparision = function (inTime, outTime, lowValue, highValue, targetProperty, targetValue) {
        var midTime = inTime / 2 + outTime / 2; //中间时间
        var midValue = targetProperty.valueAtTime(midTime); //在中间时间下的值
        var precision = thisComp.frameDuration; //精度是0.05秒
        //如果二分还没结束
        if (targetValue < midValue && inTime + precision < outTime) {
            //小于中间值去更大的区间寻找
            return PropertyExtra.timeDichotomousComparision(inTime, midTime, lowValue, midValue, targetProperty, targetValue);
        }
        else if (targetValue > midValue && inTime + precision < outTime) {
            //大于中间值去更小的区间寻找
            return PropertyExtra.timeDichotomousComparision(midTime, outTime, midValue, highValue, targetProperty, targetValue);
        }
        else {
            //如果二分结束，找到最符合的值
            function getMidTime(time1, time2) {
                var value1 = targetProperty.valueAtTime(time1);
                var value2 = targetProperty.valueAtTime(time2);
                var finalValue = MathExtra.getSmallAbsoluteDiffence(value1, value2, targetValue);
                return finalValue == value1 ? time1 : time2;
            }
            midTime = getMidTime(midTime - precision, midTime);
            midTime = getMidTime(midTime + precision, midTime);
            return midTime.toFixed(3); //保留位数;
        }
    }

    //获得属性所在图层对象//
    module.getLayerObject = function (targetObject) {
        targetObject = targetObject || thisProperty;
        countUp = 0
        while (++countUp) {
            if (isValidPropertyGroup(targetObject, countUp)) {
                targetLayer = targetObject.propertyGroup(countUp);
                if (getClassName(targetLayer) == "Layer") {
                    return targetLayer;
                }
            }
        }
    }

    //获得属性维度//
    module.getPropertyDimension = function (targetProperty) {
        targetProperty = targetProperty || thisProperty;
        var dimension;
        if (targetProperty.value) targetProperty = targetProperty.value;
        if (!targetProperty) return dimension = 0;
        if (typeof targetProperty == "number") {
            dimension = 1;
        }
        else {
            dimension = targetProperty.length;
        }
        return dimension;
    }

    //设置属性维度//
    module.setPropertyDimension = function (originalData, num) {
        var finalData = [];
        for (i = 0, l = num; i < l; i++) {
            finalData.push(originalData);
        }
        return finalData;
    }

    //每个维度进行表达式处理//
    module.setPropertyByDimension = function (targetProperty, expressionFormula) {
        var dimension = PropertyExtra.getPropertyDimension(targetProperty);
        var finalResult = Array(dimension);
        for (i = 0, l = dimension; i < l; i++) {
            finalResult[i] = expressionFormula(i);
        }
        return finalResult;
    }

    return module;
}()


//--- Key ---//
//--- 关键帧 ---//
var KeyExtra = function () {
    var module = {};

    //获取关键帧的信息//
    module.getKeyParameter = function (type, targetProperty, offsetIndex) {
        targetProperty = targetProperty || thisProperty;
        //关键帧总数
        var keyNumber = targetProperty.numKeys;
        //偏移索引数
        if (!isNaN(offsetIndex) || offsetIndex == "num") {
            offsetIndex = (!isNaN(offsetIndex)) ? Number(offsetIndex) : keyNumber;
        }
        else {
            offsetIndex = offsetIndex || 0;
        }
        //图层信息
        var targetLayer = PropertyExtra.getLayerObject(targetProperty);
        var inTime = targetLayer.inPoint;
        var outTime = targetLayer.outPoint;
        //标记的信息
        var nearestKeyIndex = targetProperty.nearestKey(thisLayer.time).index;
        var nearestKeyTime = targetProperty.key(nearestKeyIndex).time;
        var lastKeyIndex = nearestKeyTime > thisLayer.time ? nearestKeyIndex - 1 : nearestKeyIndex;
        var nextKeyIndex = nearestKeyTime > thisLayer.time ? nearestKeyIndex : nearestKeyIndex + 1;
        //返回信息的刘表
        var indexList = { last: lastKeyIndex, next: nextKeyIndex, nesrest: nearestKeyIndex, undefined: 0 };
        //关键帧索引
        var keyIndex = indexList[type] + offsetIndex;
        if (keyIndex <= 0) {
            keyIndex = 0;
        }
        if (keyIndex > keyNumber) {
            keyIndex = keyNumber + 1;
        }
        //关键帧时间
        if (keyIndex <= 0) {
            keyTime = inTime;
        }
        if (keyIndex > keyNumber) {
            keyTime = outTime;
        }
        if (keyIndex > 0 && keyIndex <= keyNumber) {
            keyTime = targetProperty.key(keyIndex).time;
        }
        //关键帧值
        keyValue = keyIndex > 0 && keyIndex <= keyNumber ? targetProperty.key(keyIndex).value : targetProperty.valueAtTime(keyTime);
        return {
            time: keyTime,
            frame: thisLayer.timeToFrames(keyTime),
            index: keyIndex,
            value: keyValue,
        };
    }

    //弹性表达式//
    module.bounce = function (amp, freq, decay) {
        amp = amp || 0.1; //振幅
        freq = freq || 3.0; //频率
        decay = decay || 5.0; //衰减
        var lastKeyIndex = 0;
        var limitTime = 5;
        var lastKeyIndex = KeyExtra.getKeyParameter("last", thisProperty).index;
        var lastKeyTime = KeyExtra.getKeyParameter("last", thisProperty).time
        var keyTime = thisLayer.time - lastKeyTime;
        if (lastKeyIndex > 0 && thisLayer.time <= lastKeyTime + limitTime) {
            var velocity = thisProperty.velocityAtTime(lastKeyTime - thisComp.frameDuration / 10);
            var exp = Math.exp(decay * keyTime);
            var circularMotion = thisLayer.mul(velocity, amp * Math.sin(freq * keyTime * 2 * Math.PI));
            return thisLayer.add(value, thisLayer.div(circularMotion, exp));
        }
        else {
            return value;
        }
    }

    //平滑的弹性表达式//
    module.bounceSmooth = function (amp, freq, decayDuration) {
        amp = amp || 5.0; //振幅
        freq = freq || 3.0; //频率
        decayDuration = decayDuration || 0.3; //衰减时间
        var lastKeyIndex = KeyExtra.getKeyParameter("last", thisProperty).index;
        var lastKeyTime = KeyExtra.getKeyParameter("last", thisProperty).time;
        var keyTime = thisLayer.time - lastKeyTime;
        if (lastKeyIndex > 0) {
            var velocity = thisProperty.velocityAtTime(lastKeyTime - timeEpsilon);
            var sin1 = Math.sin(freq * keyTime * 2 * Math.PI);
            var decay = -1 * Math.pow(Math.E * keyTime, 2);
            var sin2 = Math.pow(Math.E, decay);
            if (decayDuration == 0) {
                return thisLayer.add(value, thisLayer.mul(velocity, amp / 100 * sin1 * sin2));
            } else {
                return thisLayer.add(value, thisLayer.mul(velocity, amp / 100 * sin1 * sin2 * Math.max(decayDuration - keyTime, 0)));
            }
        }
        else {
            return value;
        }
    }

    //反弹表达式//
    module.bounceBack = function (elasticity, gravity, nMax) {
        elasticity = elasticity || 0.3; //弹性
        gravity = gravity || 2; //重力
        nMax = nMax || 5; //最大反弹次数
        var lastKeyIndex = KeyExtra.getKeyParameter("last", thisProperty).index;
        var lastKeyTime = KeyExtra.getKeyParameter("last", thisProperty).time;
        var keyTime = thisLayer.time - lastKeyTime;
        if (lastKeyIndex > 0) {
            var velocityValue = thisLayer.mul(thisProperty.velocityAtTime(lastKeyTime - timeEpsilon), -elasticity);
            var velocityLength = thisLayer.length(velocityValue);
            if (value instanceof Array) {
                var direction = velocityLength > 0 ? thisLayer.normalize(velocityValue) : [0, 0, 0];
            }
            else {
                var direction = velocityValue < 0 ? -1 : 1;
            }
            var tCur = 0;
            var segDur = thisLayer.mul(velocityLength, 2 / (gravity * 1000));
            var tNext = segDur;
            var bouncesNumber = 1;
            while (tNext < keyTime && bouncesNumber <= nMax) {
                velocityLength *= elasticity;
                segDur *= elasticity;
                tCur = tNext;
                tNext += segDur;
                bouncesNumber++;
            }
            if (bouncesNumber <= nMax) {
                delta = keyTime - tCur;
                return thisLayer.add(value, thisLayer.mul(direction, delta * (velocityLength - gravity * 1000 * delta / 2)));
            } else {
                return value;
            }
        }
        else return value;
    }

    //指数表达式//
    module.exponent = function () {
        function calculateExponent(i) {
            var lastKey = KeyExtra.getKeyParameter("last", thisProperty);
            var nextKey = KeyExtra.getKeyParameter("next", thisProperty);
            var lastKeyComponent = lastKey.value[i];
            var nextKeyComponent = nextKey.value[i];
            if (lastKeyComponent == 0) {
                lastKeyComponent = timeEpsilon;
            }
            if (nextKeyComponent == 0) {
                nextKeyComponent = timeEpsilon;
            }
            var keyComponent = Math.log(nextKeyComponent) / Math.log(lastKeyComponent);
            exp = thisLayer.linear(thisLayer.time, lastKey.time, nextKey.time, 1, keyComponent);
            return val = Math.pow(lastKeyComponent, exp);
        }

        var numKey = KeyExtra.getKeyParameter(undefined, thisProperty ,"num");
        var firstKey = KeyExtra.getKeyParameter(undefined, thisProperty ,1);
        if (numKeys > 1 && numKey.time > thisLayer.time && firstKey.time <= thisLayer.time) {
            return PropertyExtra.setPropertyByDimension(thisProperty,calculateExponent);
        }
        else {
            return thisProperty.value;
        }
    }

    //四方抖动//
    module.squareShake = function (angle, shakeDistance, num, mode) {
        angle = MathExtra.degreesToRadians(angle || 45); //角度
        shakeDistance = shakeDistance || 100; //抖动距离
        num = num || 5; //抖动次数
        mode = mode || 0; //抖动模式
        modeCase = []; //不同情况下抖动的方向顺序
        if (mode == 0) {
            modeCase = [0, 1, 2, 3];
        }
        if (mode == 1) {
            modeCase = [3, 2, 1, 0];
        }
        if (mode == 2) {
            modeCase = [0, 2, 1, 3];
        }
        if (mode == 3) {
            modeCase = [0, 2, 3, 1];
        }
        //按照帧数进行运算
        if (thisLayer.marker.numKeys == 0) {
            var shakeTime = thisLayer.timeToFrames(thisLayer.time);
        }
        else {
            var markerTime = thisLayer.marker.key(1).time;
            var shakeTime = thisLayer.timeToFrames(thisLayer.time) - thisLayer.timeToFrames(markerTime);
        }

        var shakeRatio = 1 - Math.floor(shakeTime / 4) / num; //单次抖动比率
        var shakeCase = 0;
        var shakeCase = Math.round(shakeTime % 4);
        //四种不同的抖动情况
        if (shakeCase == modeCase[0]) {
            relativePositionX = -1;
            relativePositionY = -1;
        }
        if (shakeCase == modeCase[1]) {
            relativePositionX = -1;
            relativePositionY = 1;
        }
        if (shakeCase == modeCase[2]) {
            relativePositionX = 1;
            relativePositionY = 1;
        }
        if (shakeCase == modeCase[3]) {
            relativePositionX = 1;
            relativePositionY = -1;
        }

        if (shakeTime >= 4 * num || shakeTime < 0) {
            //抖动结束之后返回原值
            return value;
        }
        else {
            positionX = shakeDistance * shakeRatio * Math.sin(angle) * relativePositionX; //x方向抖动偏移
            positionY = shakeDistance * shakeRatio * Math.cos(angle) * relativePositionY; //y方向抖动偏移
            return add(value, [positionX, positionY]);
        }
    }

    //设置关键帧曲线//
    module.setKeyCurves = function (easingmode, type) {
        var lastKey = KeyExtra.getKeyParameter("last", thisProperty);
        var nextKey = KeyExtra.getKeyParameter("next", thisProperty);
        var numKeys = thisProperty.numKeys;
        var situation = true;
        if (!isNaN(type)) {
            num = Number(type) >= numKeys - 1 ? numKeys - 1 : Number(type);
            situation = lastKey.index >= num && lastKey.index < num + 1;
        }
        if (type == "start") {
            situation = lastKey.index <= 1;
        }
        if (type == "end") {
            situation = lastKey.index >= numKeys - 1;
        }
        if (type == "start&end") {
            situation = lastKey.index <= 1 || lastKey.index >= numKeys - 1;
        }
        var elapsedTime = thisLayer.time - lastKey.time;
        var duration = nextKey.time - lastKey.time - timeEpsilon;

        function easing(i) {
            beginValue = lastKey.value[i];
            changeValue = nextKey.value[i] - lastKey.value[i];
            return InterpolationExtra.setEasing(easingmode, elapsedTime, beginValue, changeValue, duration);
        }

        if (situation) {
            return PropertyExtra.setPropertyByDimension(thisProperty, easing);
        }
        else {
            return thisProperty.value;
        }
    }

    //通过自定义贝塞尔设置关键帧曲线
    module.setKeyCurvesByBezier = function(shapeValue, type){
        var lastKey = KeyExtra.getKeyParameter("last", thisProperty);
        var nextKey = KeyExtra.getKeyParameter("next", thisProperty);
        var numKeys = thisProperty.numKeys;
        var situation = true;
        if (!isNaN(type)) {
            num = Number(type) >= numKeys - 1 ? numKeys - 1 : Number(type);
            situation = lastKey.index >= num && lastKey.index < num + 1;
        }
        if (type == "start") {
            situation = lastKey.index <= 1;
        }
        if (type == "end") {
            situation = lastKey.index >= numKeys - 1;
        }
        if (type == "start&end") {
            situation = lastKey.index <= 1 || lastKey.index >= numKeys - 1;
        }
        var inPoint = shapeValue.points()[0];
        var outPoint = shapeValue.points()[1];
        var inTangent = shapeValue.outTangents()[0];
        var outTangent = shapeValue.inTangents()[1];
        var rate = thisLayer.sub(outPoint, inPoint);
        var bezierPoints = [...VectorMathExtra.divide(inTangent, rate), ...thisLayer.add([1, 1], VectorMathExtra.divide(outTangent, rate))];
        if (numKeys > 0 && situation) {
            animationStartTime = KeyExtra.getKeyParameter("last", thisProperty).time;
            animationEndTime = KeyExtra.getKeyParameter("next", thisProperty).time;
            startValue = KeyExtra.getKeyParameter("last", thisProperty).value;
            endValue = KeyExtra.getKeyParameter("next", thisProperty).value;
            return BezierExtra.customBezier(time, animationStartTime, animationEndTime, startValue, endValue, bezierPoints);
        }
        else return thisProperty.value;
    }

    return module;
}()


//--- Marker Key--- //
//--- 标记关键帧 ---//

var MarkerKeyExtra = function () {
    var module = {};

    //获取标记的信息//
    module.getMarkerParameter = function (type, targetLayerOrComp, offsetIndex) {
        targetLayerOrComp = targetLayerOrComp || thisLayer;
        //标记总数
        var markerNumber = targetLayerOrComp.marker.numKeys;
        //偏移索引数
        if (!isNaN(offsetIndex) || offsetIndex == "num") {
            offsetIndex = (!isNaN(offsetIndex)) ? Number(offsetIndex) : markerNumber;
        }
        else {
            offsetIndex = offsetIndex || 0;
        }
        //对象属性判断
        if (getClassName(targetLayerOrComp) == "Layer") {
            //如果是图层
            var inTime = targetLayerOrComp.inPoint;
            var outTime = targetLayerOrComp.outPoint;
        }
        if (getClassName(targetLayerOrComp) == "Comp") {
            //如果是合成
            var inTime = targetLayerOrComp.displayStartTime;
            var outTime = inTime + targetLayerOrComp.duration;
        }
        //标记的信息
        var nearestMarkerIndex = targetLayerOrComp.marker.nearestKey(thisLayer.time).index;
        var nearestMarkerTime = targetLayerOrComp.marker.key(nearestMarkerIndex).time;
        var lastMarkerIndex = nearestMarkerTime > thisLayer.time ? nearestMarkerIndex - 1 : nearestMarkerIndex;
        var nextMarkerIndex = nearestMarkerTime > thisLayer.time ? nearestMarkerIndex : nearestMarkerIndex + 1;
        //返回信息的刘表
        var indexList = { last: lastMarkerIndex, next: nextMarkerIndex, nearest: nearestMarkerIndex, undefined: 0 };
        var markerIndex = offsetIndex + indexList[type];
        //标记索引
        if (markerIndex <= 0) {
            markerIndex = 0;
        }
        if (markerIndex > markerNumber) {
            markerIndex = markerNumber + 1;
        }
        //标记时间
        if (markerIndex <= 0) {
            markerTime = inTime;
        }
        if (markerIndex > markerNumber) {
            markerTime = outTime;
        }
        if (markerIndex > 0 && markerIndex <= markerNumber) {
            markerTime = targetLayerOrComp.marker.key(markerIndex).time;
        }
        //标记持续时间
        var markerDuration = (markerIndex > 0 && markerIndex <= markerNumber) ? targetLayerOrComp.marker.key(markerIndex).duration : 0;
        //标记入点
        var markerInPoint = markerTime;
        //标记出点
        var markerOutPoint = markerInPoint + markerDuration;
        //标记评论
        var markerComment = (markerIndex > 0 && markerIndex <= markerNumber) ? targetLayerOrComp.marker.key(markerIndex).comment : "";
        return {
            time: markerTime,
            frame: thisLayer.timeToFrames(markerTime),
            index: markerIndex,
            duration: markerDuration,
            inPoint: markerInPoint,
            outPoint: markerOutPoint,
            comment: markerComment,
        }
    }

    //在标记持续时间内表达式起作用//
    module.expressionSwitchingAtMarker = function (expressionFormula, mode, targetLayerOrComp, t) {
        t = t || 0.2;
        mode = mode || "linear";
        targetLayerOrComp = targetLayerOrComp || thisLayer;
        var markerInPoint = MarkerKeyExtra.getMarkerParameter("last", targetLayerOrComp).inPoint;
        var markerOutPoint = MarkerKeyExtra.getMarkerParameter("last", targetLayerOrComp).outPoint;
        if (mode == "hold") {
            //硬切模式
            if (thisLayer.time >= markerInPoint && thisLayer.time < markerOutPoint) {
                return expressionFormula;
            } else {
                return thisProperty.value;
            }
        } else if (mode == "linear") {
            //过渡模式
            if (thisLayer.time >= markerInPoint && thisLayer.time < markerOutPoint) {
                var animationDegree = 0;
                var t1 = markerInPoint + t;
                var t2 = markerOutPoint - t;
                if (thisLayer.time < t1) {
                    animationDegree = thisLayer.linear(thisLayer.time, markerInPoint, t1, 0, 1);
                }
                else if (thisLayer.time >= t2) {
                    animationDegree = thisLayer.linear(thisLayer.time, t2, markerOutPoint, 1, 0);
                }
                else {
                    animationDegree = 1;
                }
                return thisLayer.ease(animationDegree, 0, 1, thisProperty.value, expressionFormula);
            }
            else {
                return thisProperty.value;
            }
        }
    }

    //时停函数//
    module.keyPausedAtMarker = function (targetLayerOrComp) {
        targetLayerOrComp = targetLayerOrComp || thisLayer;
        //当前标记
        var markerIndex = MarkerKeyExtra.getMarkerParameter("last", targetLayerOrComp).index;
        var markerInpoint = MarkerKeyExtra.getMarkerParameter("last", targetLayerOrComp).inPoint;
        var markerOutpoint = MarkerKeyExtra.getMarkerParameter("last", targetLayerOrComp).outPoint;
        var markerDuration = MarkerKeyExtra.getMarkerParameter("last", targetLayerOrComp).duration;
        var pauseTime = 0;
        for (var i = markerIndex; i > 0; i--) {
            pauseTime += MarkerKeyExtra.getMarkerParameter(undefined, targetLayerOrComp, i).duration;
        }
        if (time < markerOutpoint && time >= markerInpoint) {
            return thisProperty.valueAtTime(markerInpoint - pauseTime + markerDuration);
        } else {
            return thisProperty.valueAtTime(thisLayer.time - pauseTime);
        }
    }

    return module;
}()

//--- Tree ---//
//--- 树 ---//

//创建树//
function createTree(targetObject) {
    var tree = [];
    if (getClassName(targetObject) == "Comp") {
        var tree = [];
        for (var i = 1, l = targetObject.numLayers; i <= l; i++) {
            tree.push(targetObject.layer(i));
        }
    }
    else {
        var index = 0;
        while (++index) {
            if (getClassName(targetObject) == "Effect") {
                if (isEffectGroup(targetObject, index)) {
                    tree.push("undefined");
                    continue;
                }
            }
            if (isValidPropertyIndex(targetObject, index)) {
                tree.push(targetObject(index));
            }
            else {
                break;
            }
        }
    }
    for (var i = 0, l = tree.length; i < l; i++) {
        setChildren(tree[i]);
    }
    return tree;
};

//设置树的子节点//
function setChildren(parent) {
    if (parent == "undefined") return;
    var childrenArray = [];
    var index = 0;
    while (++index) {
        if (getClassName(parent) == "Effect") {
            if (isEffectGroup(parent, index)) {
                childrenArray.push("undefined");
                continue;
            }
        }
        if (isValidPropertyIndex(parent, index)) {
            childrenArray.push(parent(index));
        }
        else {
            break;
        }
    }
    //链接子节点
    parent.children = childrenArray;
    for (var i = 0, l = childrenArray.length; i < l; i++) {
        //子节点反链父节点
        childrenArray[i].parent = parent;
        setChildren(childrenArray[i]);
    }
}

//查找节点//
function treeFind(tree, func, objectArray = []) {
    for (const data of tree) {
        if (func(data)) {
            objectArray.push(data);
        }
        if (data.children) {
            const res = treeFind(data.children, func, objectArray);
        }
    }
    return objectArray;
}

//查找节点路径(回溯法)//
function treeFindPath(tree, func, objectArray = []) {
    if (!tree) return [];
    for (const data of tree) {
        objectArray.push(data);
        if (func(data)) return objectArray;
        if (data.children) {
            const res = treeFindPath(data.children, func, objectArray);
            // 只有当数组的长度大于0才返回值
            if (res.length) return res;
        }
        // 条件都不满足,则直接删除,对应前面的push
        objectArray.pop();
    }
    return [];
}

//树结构筛选//
function treeFilter(tree, func) {
    return tree.map(node => ({ ...node })).filter(node => {
        node.children = node.children && treeFilter(node.children, func)
        return func(node) || (node.children && node.children.length)
    })
}

//深度优先遍历(先序遍历)//
function deepTree(tree, func, i = 0) {
    i++;
    tree.forEach(node => {
        func(node);
        node.treeDepth = i;
        node.children && deepTree(node.children, func, i);
    })
}

//深度优先遍历(后序遍历)//
function deepTreeLater(tree, func, i = 0) {
    i++;
    tree.forEach(node => {
        node.children && deepTreeLater(node.children, func, i);
        node.treeDepthLater = i;
        func(node);
    })
}

//广度优先遍历//
function scopeTree(tree, func, i = 0) {
    var node, list = [...tree];
    var childrenList = [];
    while (node = list.shift()) {
        func(node);
        node.treeBreadth = ++i;
        node.children && childrenList.push(...node.children);
        if (list.length == 0) {
            list = childrenList;
            i = 0;
            childrenList = [];
        }
    }
}

//列表转树结构//
function listToTree(list) {
    for (var i = 0; i < list.length; i++) {
        for (var j = 0; j < list.length; j++) {
            if (i == j) continue;
            if (list[i].id == list[j].parent) {
                if (!list[i].children) {
                    list[i].children = [];
                }
                list[i].children.push(list[j]);
            }
        }
    }
    return list.filter(item => !item.parent);
}

//树结构转列表//
function treeToList(tree, result = [], level = 0) {
    tree.forEach(node => {
        result.push(node);
        node.level = level + 1;
        node.children && treeToList(node.children, result, level + 1);
    })
    return result;
}

//展示深度遍历结果(先序遍历)//
function showDeepTree(tree) {
    var str = "";
    deepTree(tree, node => str += "> ".repeat(node.treeDepth - 1) + node.name + ": " + node.value + "\n");
    return str;
}

//展示深度遍历结果(后序遍历)//
function showDeepLaterTree(tree) {
    posterizeTime(0);
    var str = "";
    deepTreeLater(tree, node => str += "> ".repeat(node.treeDepthLater - 1) + node.name + ": " + node.value + "\n");
    return str;
}

//展示广度遍历结果//
function showScopeTree(tree) {
    posterizeTime(0);
    var str = "";
    scopeTree(tree, node => str += node.treeBreadth + " " + node.name + ": " + node.value + "\n");
    return str;
}

//获得节点路径//
function getNodePath(node) {
    var str = node.name;
    var i = node.treeDepth - 1;
    var nodeParent = node;
    while (i--) {
        nodeParent = nodeParent.parent;
        str = nodeParent.name + " > " + str;
    }
    return str;
}

//获得根节点//
function getNodeRoot(node, index = 0) {
    var i = node.treeDepth - 1 - index;
    var root = node;
    while (i--) {
        root = root.parent;
    }
    return root;
}

//展示列表结果//
function showList(list) {
    var str = "";
    list.forEach(node => str += node.name + ": " + node.value + "\n");
    return str;
}

//展示路径列表结果//
function showListPath(list) {
    var str = "";
    list.forEach(node => str += getNodePath(node) + ": " + node.value + "\n");
    return str;
}

//创建自定义展示列表//
function createShowList(list) {
    var str = "";
    list.forEach(node => {
        var i = 1;
        var l = arguments.length;
        while (--l) {
            if (typeof arguments[i] === "function") {
                str += arguments[i](node);
            }
            if (typeof arguments[i] === "string") {
                if (!!node[arguments[i]]) str += node[arguments[i]];
                if (!node[arguments[i]]) str += arguments[i].toString();
            }
            i++;
        }
    });
    return str;
}

//--- Bezier--- //
//--- 贝塞尔曲线 ---//
var BezierExtra = function () {
    var module = {};

    //细分形状(非曲线线段不被细化)
    module.flattenMultisegmentedShape = function (shapeValue, precision) {
        if (precision == undefined) {
            precision = 10;
        }
        curves = BezierExtra.toBezierFormat(shapeValue);
        var vertices = [];
        for (i = 0, il = curves.length; i < il; i++) {
            p1 = curves[i][0];
            cp1 = curves[i][1];
            cp2 = curves[i][2];
            p2 = curves[i][3];
            if (BezierExtra.isStraightLine(p1, cp1, cp2, p2)) {
                vertices.push(p1);
                vertices.push(p2);
            }
            else {
                flatCurve = BezierExtra.flattenCubicBezier(p1, cp1, cp2, p2, precision);
                for (j = 0, jl = flatCurve.length; j < jl; j++) {
                    vertices.push(flatCurve[j]);
                }
            }
        }
        return vertices;
    }

    //细分所有形状(曲线线段也被细化)
    module.flattenAllMultisegmentedShape = function (shapeValue, precision) {
        if (precision == undefined) {
            precision = 10;
        }
        curves = BezierExtra.toBezierFormat(shapeValue);
        var vertices = [];
        for (i = 0, il = curves.length; i < il; i++) {
            p1 = curves[i][0];
            cp1 = curves[i][1];
            cp2 = curves[i][2];
            p2 = curves[i][3];
            flatCurve = BezierExtra.flattenCubicBezier(p1, cp1, cp2, p2, precision);
            for (j = 0, jl = flatCurve.length; j < jl; j++) {
                vertices.push(flatCurve[j]);
            }
        }
        return vertices;
    }

    //获得贝塞尔曲线上的点
    module.getBezierPoint = function (p1, cp1, cp2, p2, t) {
        x = (Math.pow(1 - t, 3) * p1[0]) + (3 * Math.pow(1 - t, 2) * t * cp1[0]) + (3 * (1 - t) * Math.pow(t, 2) * cp2[0]) + (Math.pow(t, 3) * p2[0]);
        y = (Math.pow(1 - t, 3) * p1[1]) + (3 * Math.pow(1 - t, 2) * t * cp1[1]) + (3 * (1 - t) * Math.pow(t, 2) * cp2[1]) + (Math.pow(t, 3) * p2[1]);
        return [x, y];
    }

    //细分单段贝塞尔曲线
    module.flattenCubicBezier = function (p1, cp1, cp2, p2, precision) {
        if (precision == undefined) {
            precision = 10;
        }
        index = 0;
        points = [];
        step = 1 / precision;
        for (var elapsedTime = 0; elapsedTime <= 1; elapsedTime = elapsedTime + step) {
            point = BezierExtra.getBezierPoint(p1, cp1, cp2, p2, elapsedTime);
            points.push(point);
            index++;
        }
        return points;
    }

    //是否为一条直线
    module.isStraightLine = function (p1, cp1, cp2, p2) {
        var incident1 = ((VectorMathExtra.getDistance(p1, cp1) + VectorMathExtra.getDistance(p2, cp1)) == VectorMathExtra.getDistance(p1, p2));
        var incident2 = ((VectorMathExtra.getDistance(p1, cp2) + VectorMathExtra.getDistance(p2, cp2)) == VectorMathExtra.getDistance(p1, p2));
        if (incident1 && incident2) {
            return true;
        }
        return false;
    }

    //转为贝塞尔格式
    module.toBezierFormat = function (shapeValue) {
        bezierPoints = [];
        var vertices = shapeValue.points();
        var inTangents = shapeValue.inTangents();
        var outTangents = shapeValue.outTangents();
        var closed = shapeValue.isClosed();
        for (i = 0, l = vertices.length - 1; i < l; i++) {
            bezierPoints.push([vertices[i], thisLayer.add(vertices[i], outTangents[i]), thisLayer.add(vertices[i + 1], inTangents[i + 1]), vertices[i + 1]]);
        }
        if (closed) {
            bezierPoints.push([vertices[vertices.length - 1], thisLayer.add(vertices[vertices.length - 1], outTangents[vertices.length - 1]), thisLayer.add(vertices[0], inTangents[0]), vertices[0]]);
        }
        return bezierPoints;
    }

    //自定义贝塞尔曲线
    module.customBezier = function (t, tMin, tMax, value1, value2, bezierPoints) {
        if (arguments.length !== 6) return thisProperty.value;
        var valueDifference = thisLayer.sub(value2, value1);
        var rate = linear(t, tMin, tMax, 0, 1);
        if (!(bezierPoints instanceof Array) || bezierPoints.length !== 4) bezierPoints = [0, 0, 1, 1];
        return thisLayer.add(thisLayer.mul(valueDifference, getBezierCurve(rate, bezierPoints)), value1);

        //在标准坐标系下贝塞尔曲线的方程
        function getBezierCurve(rate, bezierPoints) {
            var x0 = 3 * bezierPoints[0];
            var x1 = 3 * (bezierPoints[2] - bezierPoints[0]) - x0;
            var x2 = 1 - x0 - x1;
            var y0 = 3 * bezierPoints[1];
            var y1 = 3 * (bezierPoints[3] - bezierPoints[1]) - y0;
            var y2 = 1 - y0 - y1;
            for (var i = 0; i < 5; i++) {
                var z = rate * (x0 + rate * (x1 + rate * x2)) - rate;
                if (Math.abs(z) < 1e-3) break;
                rate -= z / (x0 + rate * (2 * x1 + 3 * x2 * rate));
            }
            return rate * (y0 + rate * (y1 + rate * y2));
        }
    }

    return module;
}()

//--- Text ---//
//--- 文本 ---//

var TextExtra = function () {
    var module = {};

    //洗牌算法(插入法)//
    module.shuffle = function (arr, sliderControl) {
        num = clamp(sliderControl, 0, arr.length);
        //获取第一个牌堆
        var arr1 = new Array(arr.length);
        for (var i = 0, l = arr.length; i < l; i++) {
            arr1[i] = arr[i];
        }

        //插入第二个牌堆
        var arr2 = new Array();

        for (var i = 0; i < num; i++) {
            arr2.push(arr1[i]);
        }
        for (var i = arr1.length; i > num;) {
            var rnd = Math.floor(random() * (i - num) + num);
            arr2.push(arr1[rnd]);
            arr1[rnd] = arr1[--i];
        }
        return arr2;
    }

    //字符洗牌随机//
    module.textRandomShuffle = function (rate, sliderControl) {
        if (sliderControl == undefined) {
            sliderControl = 0;
        }
        rate = rate || 15;//速率
        posterizeTime(rate);
        originArray = text.sourceText.value;
        result = TextExtra.shuffle(originArray, sliderControl).join("");
        return result;
    }

    //重复//
    module.repeat = function (string, num) {
        finalResult = "";
        for (i = 0, l = num; i < l; i++) {
            finalResult += string;
        }
        return finalResult;
    }

    //随机字符//
    module.randomText = function (num) {
        var finalResult = "";
        for (i = 0, l = num; i < l; i++) {
            seedRandom(i, true);
            finalResult += String.fromCharCode(random(33, 127));
        }
        return finalResult;
    }

    //字符故障随机//
    module.textGlitchRandom = function (keyOrMarkerControl, startText, endText, offset, rate) {
        var arr = [];
        var inCtrolTime;
        var outCtrolTime;
        var targetLayer = PropertyExtra.getLayerObject(keyOrMarkerControl);
        if (getClassName(keyOrMarkerControl) == "MarkerProperty") {
            inCtrolTime = MarkerKeyExtra.getMarkerParameter(undefined, targetLayer, 1).time;
            outCtrolTime = MarkerKeyExtra.getMarkerParameter(undefined, targetLayer, "num").time;
        }
        if (getClassName(keyOrMarkerControl) == "Property") {
            inCtrolTime = KeyExtra.getKeyParameter(undefined, keyOrMarkerControl, 1).time;
            outCtrolTime = KeyExtra.getKeyParameter(undefined, keyOrMarkerControl, "num").time;
        }
        if (startText == undefined) {
            startText = thisProperty.value;//初始值
        }
        if (endText == undefined) {
            endText = TextExtra.repeat("/", startText.length);//末尾值
        }
        middleText = TextExtra.randomText(startText.length);//随机值
        offset = offset || 0.05;//偏移时间
        rate = rate || 15;//帧率
        posterizeTime(rate);

        var result = "";
        for (i = 0, l = startText.length; i < l; i++) {
            var offsetTime = offset > 0 ? offset * i : offset * (i - l);
            inTime = inCtrolTime + offsetTime;
            outTime = outCtrolTime + offsetTime;
            if (time < inTime) {
                arr.push(startText[i].charCodeAt());
            }
            else if (time > outTime) {
                arr.push(endText[i].charCodeAt());
            }
            else {
                arr.push(random(33, 127));
            }
        }//输出一遍ascii
        for (i = 0, l = arr.length; i < l; i++) {
            result += String.fromCharCode(arr[i])
        }//转字符
        return result;
    }

    return module;
}()

//--- Expression Selector ---//
//--- 文本表达式选择器 ---//
var ExpressionSelectorExtra = function () {
    var module = {};

    //弹性选择器//
    module.bounceSelector = function (type, duration, freq, decay, startTime, delay) {
        duration = duration || 0.2;//进场时间
        freq = freq || 3.0;//频率
        decay = decay || 5.0;//衰减
        startTime = startTime || thisLayer.inPoint;//选择器开始作用时间
        type = type || "left";
        delay = delay || 0.1;//字符间延迟时长
        var retard = ExpressionSelectorExtra.direction(type, delay);
        var elapsedTime = thisLayer.time - (startTime + retard);
        var startVal = [100, 100, 100];
        var endVal = [0, 0, 0];
        var amp = div(sub(endVal, startVal), duration);
        if (elapsedTime < duration) {
            return linear(elapsedTime, 0, duration, startVal, endVal);
        }
        var w = freq * Math.PI * 2;
        return add(endVal, mul(amp, (Math.sin((elapsedTime - duration) * w) / Math.exp(decay * (elapsedTime - duration)) / w)));
    }

    //反弹选择器//
    module.bounceBackSelector = function (type, duration, freq, decay, startTime, delay) {
        duration = duration || 0.3;//进场时间
        freq = freq || 3.0;//频率
        decay = decay || 5.0;//衰减
        startTime = startTime || thisLayer.inPoint;//选择器开始作用时间
        type = type || "left";
        delay = delay || 0.1;//字符间延迟时长
        var retard = ExpressionSelectorExtra.direction(type, delay);
        var elapsedTime = thisLayer.time - (startTime + retard);
        var startVal = [100, 100, 100];
        var endVal = [0, 0, 0];
        var amp = div(sub(endVal, startVal), duration);
        if (elapsedTime < duration) {
            return linear(elapsedTime, 0, duration, startVal, endVal);
        }
        else {
            var w = freq * Math.PI * 2;
            var amount = add(endVal, mul(amp, (Math.sin((elapsedTime - duration) * w) / Math.exp(decay * (elapsedTime - duration)) / w)));
            return amount.map(function (index) {
                return Math.abs(index);
            });
        }
    }

    //区域影响选择器//
    module.influenceSelector = function (type, delay) {
        type = type || "left";
        delay = delay || 0.1;
        var retard = ExpressionSelectorExtra.direction(type, delay);
        var elapsedTime = thisLayer.time - retard;
        return thisProperty.valueAtTime(elapsedTime);
    }

    //缓动选择器//
    module.easingSelector = function (type, mode, easingmode, duration, delay, startTime) {
        mode = mode || "in";
        type = type || "left";
        duration = duration || 1.0;
        delay = delay || 0.05;
        if (startTime == undefined) {
            startTime = mode == "in" ? thisLayer.inPoint : thisLayer.outPoint - duration;
        }
        var endTime = startTime + duration;
        var retard = ExpressionSelectorExtra.direction(type, delay);
        var elapsedTime = linear(time, startTime + retard, endTime + retard, 0, duration);
        if (mode == "in") {
            var easing = InterpolationExtra.setEasing(easingmode, elapsedTime, 100, -100, duration);
        }
        if (mode == "out") {
            var easing = InterpolationExtra.setEasing(easingmode, elapsedTime, 0, +100, duration);
        }
        return PropertyExtra.setPropertyDimension(easing, 3);
    }

    //选择器方向//
    module.direction = function (type, delay) {
        if (type == "random") {
            seedRandom(textIndex + thisLayer.index, true);
            retard = delay * random(textTotal) + random(textTotal) * compFrameDuration;
        }
        else if (type == "left") {
            retard = delay * (textIndex - 1);
        }
        else if (type == "right") {
            retard = delay * (textTotal - textIndex);
        }
        else if (type == "outward") {
            if (textIndex > Math.round((textTotal / 2) - 0.5)) {
                retard = delay * (textIndex - 1);
            }
            else {
                retard = delay * (textTotal - textIndex);
            }
        }
        else if (type == "inward") {
            if (textIndex < Math.round((textTotal / 2) + 0.5)) {
                retard = delay * (textIndex - 1);
            }
            else {
                retard = delay * (textTotal - textIndex);
            }
        }
        return retard;
    }

    return module;
}()

//--- Syntactic sugar ---//
//--- 语法糖 ---//
var syntacticSugar = function () {
    setSyntacticSugar(ToolExtra);
    setSyntacticSugar(VectorMathExtra);
    setSyntacticSugar(InterpolationExtra);
    setSyntacticSugar(ColorConversionExtra);
    setSyntacticSugar(MathExtra);
    setSyntacticSugar(LayerExtra);
    setSyntacticSugar(CameraExtra);
    setSyntacticSugar(PathPropertyExtra);
    setSyntacticSugar(PropertyExtra);
    setSyntacticSugar(KeyExtra);
    setSyntacticSugar(MarkerKeyExtra);
    setSyntacticSugar(BezierExtra);
    setSyntacticSugar(TextExtra);
    setSyntacticSugar(ExpressionSelectorExtra);

    thisProperty.frameAtValue = function (targetValue) {
        return PropertyExtra.frameAtValue(thisProperty, targetValue);
    }

    thisProperty.timeAtValue = function (targetValue) {
        return PropertyExtra.timeAtValue(thisProperty, targetValue);
    }

    function setSyntacticSugar(targetClass) {
        for (key in targetClass) {
            thisProperty[key] = targetClass[key];
        }
    }
}()