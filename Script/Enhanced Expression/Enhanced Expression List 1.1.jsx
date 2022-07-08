var expressionList = {
    //--- 全局变量 ---//
    "全局变量_Node": "",
    "frames_Item": "frames",
    "fps_Item": "fps",
    "compFrameDuration_Item": "compFrameDuration",
    "compDuration_Item": "compDuration",
    "compStartTime_Item": "compStartTime",
    "compEndTime_Item": "compEndTime",
    "compWidth_Item": "compWidth",
    "compHeight_Item": "compHeight",
    "compSize_Item":"compSize",
    "timeCode_Item": "timeCode",
    "timeEpsilon_Item": "timeEpsilon",
    "nativeCode_Item": "nativeCode",
    "fullPath_Item": "fullPath",
    //--- 全局 ---//
    "全局_Node": "",
    "alert_Item": "alert(error)",
    "getExpressionEngine_Item": "getExpressionEngine()",
    "getLanguage_Item": "getLanguage()",
    "getClassName_Item": "getClassName(targetObject)",
    "getExpressionFromSourceText_Item": "getExpressionFromSourceText(sourceText)",
    "setExpressionToSourceText_Item": "(function setExpressionToSourceText(){\n\treturn value;\n})",
    "getExpressionFromMarkerKey_Item": "getExpressionFromMarkerKey(markerKey)",
    "setExpressionToMarkerKey_Item": "function setExpressionToMarkerKey(){\n\treturn value;\n}",
    "isValidPropertyIndex_Item": "isValidPropertyIndex(targetProperty, index)",
    "isValidPropertyGroup_Item": "isValidPropertyGroup(targetProperty, countUp)",
    "isValidEffectIndex_Item": "isValidEffectIndex(targetProperty, index)",
    "isEffectGroup_Item": "isEffectGroup(targetProperty, index)",
    //--- 工具 ---//
    "工具_Node": "ToolExtra",
    "getFormatTime_Item": "ToolExtra.getFormatTime()",
    "trimString_Item": "ToolExtra.trimString(string)",
    "textCount_Item": "ToolExtra.textCount(sourceText, type)",
    //--- 矢量数学 ---//
    "矢量数学_Node": "VectorMathExtra",
    "getCircleParameter_Item": "VectorMathExtra.getCircleParameter(tangent1, tangent2, position1, position2)",
    "getAnglesBetweenPoints_Item": "VectorMathExtra.getAnglesBetweenPoints(originPoints)",
    "getDistancesBetweenPoints_Item": "VectorMathExtra.getDistancesBetweenPoints(originPoints)",
    "multiply_Item": "VectorMathExtra.multiply(array1, array2)",
    "divide_Item": "VectorMathExtra.divide(array1, array2)",
    "transition_Item": "VectorMathExtra.transition(point1, point2, position)",
    "rotate_Item": "VectorMathExtra.rotate(point1, point2, degreeAngle)",
    "scale_Item": "VectorMathExtra.scale(point1, point2, scaleRate)",
    "getLineAngle_Item": "VectorMathExtra.getLineAngle(point1, point2)",
    "getLineLength_Item": "VectorMathExtra.getLineLength(point1, point2)",
    "getVectorAngle_Item": "VectorMathExtra.getVectorAngle(vector1, vector2)",
    "getShortestDistanceOnTwoPath_Item": "VectorMathExtra.getShortestDistanceOnTwoPath(path1, path2, percentage1, precision = 1.0)",
    "getCrossOverPoint_Item": "VectorMathExtra.getCrossOverPoint(path1, path2, precision = 100)",
    "getPolygonArea_Item": "VectorMathExtra.getPolygonArea(originPoints)",
    //--- 插值模式 ---//
    "插值模式_Node": "InterpolationExtra",
    "setInterpolation_Item": "InterpolationExtra.setInterpolation(t, tMin, tMax, value1, value2, mode)",
    "setEasing_Item": "InterpolationExtra.setEasing(mode, elapsedTime, beginValue, changeValue, duration)",
    //--- 颜色转换 ---//
    "颜色转换_Node": "ColorConversionExtra",
    "rgbToHex_Item": "ColorConversionExtra.rgbToHex(rgbaArray)",
    "rgbToHsb_Item": "ColorConversionExtra.rgbToHsb(rgbaArray)",
    "hsbToRgb_Item": "ColorConversionExtra.hsbToRgb(hsbArray)",
    "getColorName_Item": "ColorConversionExtra.getColorName(rgbaArray)",
    //--- 数学 ---//
    "数学_Node": "MathExtra",
    "dataLeftCompleting_Item": "MathExtra.dataLeftCompleting(originData, bits, identifier = \"0\")",
    "getSmallAbsoluteDiffence_Item": "MathExtra.getSmallAbsoluteDiffence(num1, num2, comparedNumber)",
    "getRemainder_Item": "MathExtra.getRemainder(originalData, divisor)",
    "retainDecimals_Item": "MathExtra.retainDecimals(originData, number = 2)",
    "approximatelyEqual_Item": "MathExtra.approximatelyEqual(num1, num2, epsilon)",
    "radiansToDegrees_Item": "MathExtra.radiansToDegrees(radians)",
    "degreesToRadians_Item": "MathExtra.degreesToRadians(degrees)",
    //--- 图层 ---//
    "图层_Node": "LayerExtra",
    "setAnchor_Item": "LayerExtra.setAnchor(xAlignment = \"center\", yAlignment = \"center\")",
    "getLayerSize_Item":"LayerExtra.getLayerSize(targetLayer, targetTime)",
    "scaleToFitSize_Item":"LayerExtra.scaleToFitSize(originSize, targetSize)",
    "fontSwitching_Item": "LayerExtra.fontSwitching(sliderControl, targetComp)",
    "getChildTruePosition_Item": "LayerExtra.getChildTruePosition(targetLayer)",
    "setParentPropertyAtTime_Item": "LayerExtra.setParentPropertyAtTime(targetLayer, delayFrame = 0, mode = \"separate\")",
    "setParentPropertyAtFrame_Item": "LayerExtra.setParentPropertyAtFrame(targetLayer, delayFrame = 0, mode = \"separate\")",
    "typewriterEffect_Item": "LayerExtra.typewriterEffect(delay = 0.1)",
    "opacityControl_Item": "LayerExtra.opacityControl()",
    "compositeMotionPath_Item": "LayerExtra.compositeMotionPath(shapeValue, sliderControl, targetLayer = thisLayer)",
    //--- 摄像机 ---//
    "摄像机_Node": "CameraExtra",
    "cameraSwitching_Item": "CameraExtra.cameraSwitching(sliderControl, mode = \"linear\")",
    //--- 路径属性 ---//
    "路径属性_Node": "PathPropertyExtra",
    //"cycle_Item": "PathPropertyExtra.cycle(originPoints, index)",
    "getPathParameter_Item": "PathPropertyExtra.getPathParameter(shapeValue, percentage, t = thisLayer.time)",
    "getConvexHull_Item": "PathPropertyExtra.getConvexHull(originPoints)",
    "pathResample_Item": "PathPropertyExtra.pathResample(shapeValue = thisProperty, sliderControl, offsetSliderControl = 0)",
    "createPathFromPosition_Item": "PathPropertyExtra.createPathFromPosition(targetLayer, mode = \"all\")",
    "physicalRoll_Item": "PathPropertyExtra.physicalRoll(shapeValue)",
    "createConnectorPath_Item": "PathPropertyExtra.createConnectorPath(sliderControl, firstPath, secondPath)",
    //--- 属性 ---//
    "属性_Node": "PropertyExtra",
    "wigglePlus_Item": "PropertyExtra.wigglePlus(freq = 5.0, amp = 10.0, toggles = undefined)",
    "waveWiggle_Item": "PropertyExtra.waveWiggle(freq = 6.0, amp = 20.0, octaves = 3.0)",
    "velocityContinue_Item": "PropertyExtra.velocityContinue(targetlayerOrComp = thisLayer)",
    "loopPlus_Item": "PropertyExtra.loopPlus(type = \"all\", mode = \"cycle\")",
    "valueAtFrame_Item": "PropertyExtra.valueAtFrame(targetProperty, targetFrame)",
    "valueAtTime_Item": "PropertyExtra.valueAtTime(targetProperty, targetTime)",
    "frameAtValue_Item": "PropertyExtra.frameAtValue(targetProperty, targetValue)",
    "timeAtValue_Item": "PropertyExtra.timeAtValue(targetProperty, targetValue)",
    "getLayerObject_Item": "PropertyExtra.getLayerObject(targetObject = thisProperty)",
    "getPropertyDimension_Item": "PropertyExtra.getPropertyDimension(targetProperty = thisProperty)",
    "setPropertyDimension_Item": "setPropertyDimension(originalData, num)",
    "setPropertyByDimension_Item": "setPropertyByDimension(targetProperty, expressionFormula)",
    //--- 关键帧 ---//
    "关键帧_Node": "KeyExtra",
    "getKeyParameter_Item": "KeyExtra.getKeyParameter(type = \"last\", targetProperty = thisProperty, offsetIndex = 0)",
    "bounce_Item": "KeyExtra.bounce(amp = 0.1, freq = 3.0, decay = 5.0)",
    "bounceSmooth_Item": "KeyExtra.bounceSmooth(amp = 5.0, freq = 3.0, decayDuration = 0.3)",
    "bounceBack_Item": "KeyExtra.bounceBack(elasticity = 5.0, gravity = 6000, nMax = 5)",
    "exponent_Item": "KeyExtra.exponent()",
    "squareShake_Item": "KeyExtra.squareShake(angle = 45, shakeDistance = 100, num = 5, mode = 0)",
    "setKeyCurves_Item": "KeyExtra.setKeyCurves(easingmode, type)",
    "setKeyCurvesByBezier_Item":"KeyExtra.setKeyCurvesByBezier(shapeValue, type)",
    //--- 标记关键帧 ---//
    "标记关键帧_Node": "MarkerKeyExtra",
    "getMarkerParameter_Item": "MarkerKeyExtra.getMarkerParameter(type = \"last\", targetLayerOrComp = thisLayer, offsetIndex = 0)",
    "expressionSwitchingAtMarker_Item": "MarkerKeyExtra.expressionSwitchingAtMarker(expressionFormula, mode = \"linear\", targetLayerOrComp = thisLayer, t = 0.2)",
    "keyPausedAtMarker_Item": "MarkerKeyExtra.keyPausedAtMarker()",
    //--- 树 ---//
    "树_Node": "",
    "createTree_Item": "createTree(targetObject)",
    "setChildren_Item": "setChildren(parent)",
    "treeFind_Item": "treeFind(tree, func, objectArray = [])",
    "treeFindPath_Item": "treeFindPath(tree, func, objectArray = [])",
    "deepTree_Item": "deepTree(tree, func)",
    "deepTreeLater_Item": "deepTreeLater(tree, func",
    "scopeTree_Item": "scopeTree(tree, func)",
    "showDeepTree_Item": "showDeepTree(tree)",
    "showDeepLaterTree_Item": "showDeepLaterTree(tree)",
    "showScopeTree_Item": "showScopeTree(tree)",
    "getNodePath_Item": "getNodePath(node)",
    "getNodeRoot_Item": "getNodeRoot(node, index = 0)",
    "showList_Item": "showList(list)",
    "showListPath_Item": "showListPath(list)",
    "createShowList_Item": "createShowList(list)",
    //--- 贝塞尔曲线 ---//
    "贝塞尔曲线_Node": "BezierExtra",
    "flattenMultisegmentedShape_Item": "BezierExtra.flattenMultisegmentedShape(shapeValue, precision = 10.0)",
    "flattenAllMultisegmentedShape_Item": "BezierExtra.flattenAllMultisegmentedShape(shapeValue, precision = 10.0)",
    "getBezierPoint_Item": "BezierExtra.getBezierPoint(p1, cp1, cp2, p2, t)",
    "flattenCubicBezier_Item": "BezierExtra.flattenCubicBezier(p1, cp1, cp2, p2, precision)",
    "isStraightLine_Item": "BezierExtra.isStraightLine(p1, cp1, cp2, p2)",
    "toBezierFormat_Item": "BezierExtra.toBezierFormat(shapeValue)",
    "customBezier_Item":"BezierExtra.customBezier(t, tMin, tMax, value1, value2, bezierPoints)",
    //--- Text ---//
    "文本_Node": "TextExtra",
    "textRandomShuffle_Item": "TextExtra.textRandomShuffle(rate = 15, sliderControl = 0)",
    "textGlitchRandom_Item": "TextExtra.textGlitchRandom(keyOrMarkerControl = thisLayer.marker, startText = thisProperty.value, endText = undefined, offset = 0, rate = 15)",
    "repeat_Item": "TextExtra.repeat(string, num)",
    "randomText_Item": "TextExtra.randomText(num)",
    //--- Expression Selector ---//
    "表达式选择器_Node": "ExpressionSelectorExtra",
    "direction_Item": "ExpressionSelectorExtra.direction(type, delay)",
    "bounceSelector_Item": "ExpressionSelectorExtra.bounceSelector(type = \"left\", duration = 0.2, freq = 3.0, decay = 5.0, startTime = thisLayer.inPoint, delay = 0.1)",
    "bounceBackSelector_Item": "ExpressionSelectorExtra.bounceBackSelector(type = \"left\", duration = 0.3, freq = 3.0, decay = 5.0, startTime = thisLayer.inPoint, delay = 0.1)",
    "influenceSelector_Item": "ExpressionSelectorExtra.influenceSelector(type = \"left\", delay = 0.1)",
    "easingSelector_Item": "ExpressionSelectorExtra.easingSelector(type = \"left\", mode = \"in\", easingmode, duration = 1.0, delay = 0.05, startTime = thisLayer.inPoint)",
}

var helptipList = {
    //--- 全局变量 ---//
    "全局变量": "//--- 全局变量 ---//"
        + "\n"
        + "\n当声明增强函数库后,全局变量可以在任何属性中调用。",
    "frames": "frames"
        + "\n"
        + "\n说明:当前合成播放头所在帧数值。"
        + "\n返回:数值(Number)。",
    "fps": "fps"
        + "\n"
        + "\n说明:当前合成每秒的帧数，即合成的帧速率(单位秒除以当前合成单帧持续时间)。"
        + "\n返回:数值(Number)。",
    "compFrameDuration": "compFrameDuration"
        + "\n"
        + "\n说明:当前合成单帧持续时间。"
        + "\n返回:数值(Number)。",
    "compDuration": "compDuration"
        + "\n"
        + "\n说明:当前合成时长。"
        + "\n返回:数值(Number)。",
    "compStartTime": "compStartTime"
        + "\n"
        + "\n说明:当前合成的开始时间。"
        + "\n返回:数值(Number)。",
    "compEndTime": "compEndTime"
        + "\n"
        + "\n说明:当前合成的结束时间。"
        + "\n返回:数值(Number)。",
    "compWidth": "compWidth"
        + "\n"
        + "\n说明:当前合成的宽度。"
        + "\n返回:数值(Number)。",
    "compHeight": "compHeight"
        + "\n"
        + "\n说明:当前合成的高度。"
        + "\n返回:数值(Number)。",
    "compSize": "compSize"
        + "\n"
        + "\n说明:当前合成的大小。"
        + "\n返回:二维数组(Array)。",
    "timeCode": "timeCode"
        + "\n"
        + "\n说明:当前合成播放头所在时间码。"
        + "\n返回:字符串(String)。",
    "timeEpsilon": "timeEpsilon"
        + "\n"
        + "\n说明:以当前合成单帧持续时间为量度下的极小值数值。"
        + "\n返回:数值(Number)。",
    "nativeCode": "nativeCode"
        + "\n"
        + "\n说明:原生代码,用于判断原生部分。"
        + "\n返回:字符串(String)。",
    "fullPath": "fullPath"
        + "\n"
        + "\n说明:工程完整路径。"
        + "\n返回:字符串(String)。",
    //--- 全局 ---//
    "全局": "//--- 全局 ---//"
        + "\n"
        + "\n全局函数主要用于开发和在合成中设置跨属性表达式调用。",
    "getExpressionEngine": "getExpressionEngine()"
        + "\n"
        + "\n说明:获取当前表达式的引擎,返回字符串es或js。"
        + "\n参数:无。"
        + "\n返回:字符串(String)。",
    "getClassName": "getClassName()"
        + "\n"
        + "\n全名:getClassName(targetObject)"
        + "\n说明:获取对象类的名称。"
        + "\n参数:"
        + "\n  1.targetObject:目标对象。"
        + "\n返回:字符串(String)。",
    "getLanguage": "getLanguage( )"
        + "\n"
        + "\n全名:getLanguage( )"
        + "\n说明:获取当前软件语言,返回字符串zh_CN或en_US。"
        + "\n参数:无。"
        + "\n返回:字符串(String)。",
    "alert": "alert()"
        + "\n"
        + "\n全名:alert(error)"
        + "\n说明:在表达式错误警告中抛出异常,用于观察中间值。"
        + "\n参数:"
        + "\n  1.error:任意类型。"
        + "\n返回:错误(Error)。",
    "getExpressionFromSourceText": "getExpressionFromSourceText( )"
        + "\n"
        + "\n全名:getExpressionFromSourceText(sourceText)。"
        + "\n说明:从文本层源文本中调用表达式。"
        + "\n参数:"
        + "\n  1.sourceText:文本层源文本。"
        + "\n返回:函数(Function)。",
    "setExpressionToSourceText": "setExpressionToSourceText"
        + "\n"
        + "\n说明:设置文本层源文本中被调用的表达式。"
        + "\n参数:在函数体中设置需要被调用的表达式。",
    "getExpressionFromMarkerKey": "getExpressionFromMarkerKey( )"
        + "\n"
        + "\n全名:getExpressionFromMarkerKey(markerKey)"
        + "\n说明:从标记注释中调用表达式。"
        + "\n参数:"
        + "\n  1.markerKey:图层或合成标记关键帧。"
        + "\n返回:函数(Function)。",
    "setExpressionToMarkerKey": "setExpressionToMarkerKey"
        + "\n"
        + "\n说明:设置图层或合成标记评论中被调用的表达式。"
        + "\n参数:在函数体中设置需要被调用的表达式。",
    "isValidPropertyIndex": "isValidPropertyIndex( )"
        + "\n"
        + "\n全名:isValidPropertyIndex(targetProperty, index)"
        + "\n说明:判断属性索引是否有效。"
        + "\n参数:"
        + "\n  1.targetProperty:目标属性。"
        + "\n  2.index:属性子元素对象索引。"
        + "\n返回:布尔值(Boolean)。",
    "isValidPropertyGroup": "isValidPropertyGroup( )"
        + "\n"
        + "\n全名:isValidPropertyGroup(targetProperty, countUp)"
        + "\n说明:判断属性父对象是否有效。"
        + "\n参数:"
        + "\n  1.targetProperty:目标属性。"
        + "\n  2.countUp:属性父对象级数。"
        + "\n返回:布尔值(Boolean)。",
    "isValidEffectIndex": "isValidEffectIndex( )"
        + "\n"
        + "\n全名:isValidEffectIndex(targetLayer, index)"
        + "\n说明:判断效果是否存在。"
        + "\n参数:"
        + "\n  1.targetLayer:目标图层。"
        + "\n  2.index:属性子元素对象索引。"
        + "\n返回:布尔值(Boolean)。",
    "isEffectGroup": "isEffectGroup( )"
        + "\n"
        + "\n全名:isEffectGroup(targetProperty, index)"
        + "\n说明:判断是否是效果组,即无法从索引获得的效果子对象。"
        + "\n参数:"
        + "\n  1.targetProperty:目标属性。"
        + "\n  2.index:属性子元素对象索引。"
        + "\n返回:布尔值(Boolean)。",
    //--- 工具 ---//
    "工具": "//--- 工具 ---//"
        + "\n"
        + "\n工具函数主要封装着重复性质的工具类方法。",
    "getExpressionFromMarkerKey": "getExpressionFromMarkerKey( )"
        + "\n"
        + "\n全名:getExpressionFromMarkerKey(markerKey)"
        + "\n说明:从标记注释中调用表达式。"
        + "\n参数:"
        + "\n  1.markerKey:图层或合成标记关键帧。"
        + "\n返回:函数(Function)。",
    "getFormatTime": "getFormatTime( )"
        + "\n"
        + "\n全名:ToolExtra.getFormatTime()。"
        + "\n说明:获取当前系统时间(JS引擎)。"
        + "\n参数:无。"
        + "\n返回:字符串(String)。",
    "textCount": "textCount( )"
        + "\n"
        + "\n全名:ToolExtra.textCount(sourceText, type)。"
        + "\n说明:源文本字符数统计。"
        + "\n参数:"
        + "\n  1.sourceText:源文本属性。"
        + "\n  2.type:统计的类型,可选「word」「line」「char」,未输入时默认为「word」。"
        + "\n  word模式统计单词数量,line模式统计行数,char模式统计字符数量。"
        + "\n返回:字符串(String)。",
    "trimString": "trimString( )"
        + "\n"
        + "\n全名:ToolExtra.trimString(string)"
        + "\n说明:截取中间的非空白字符。"
        + "\n参数:"
        + "\n  1.string:传入的字符串。"
        + "\n返回:字符串(String)。",
    //--- 矢量数学 ---//
    "矢量数学": "//--- 矢量数学 ---//"
        + "\n"
        + "\nVectorMathExtra是一个类,它拥有一些对数组进行运算的矢量数学方法。",
    "getCircleParameter": "getCircleParameter( )"
        + "\n"
        + "\n全名:VectorMathExtra.getCircleParameter(tangent1, tangent2, position1, position2)"
        + "\n说明:通过圆上两交点和交点切向量确定圆心和半径。"
        + "\n参数:"
        + "\n  1.tangent1:交点1的切向量。"
        + "\n  2.tangent2:交点2的切向量。"
        + "\n  3.position1:交点1的位置坐标。"
        + "\n  4.position2:交点2的位置坐标。"
        + "\n返回:对象(Object)。"
        + "\n  1.R:圆的半径长。"
        + "\n  2.center:圆心坐标。",
    "getAnglesBetweenPoints": "getAnglesBetweenPoints( )"
        + "\n"
        + "\n全名:VectorMathExtra.getAnglesBetweenPoints(originPoints)"
        + "\n说明:获取点集相邻点之间的斜率角。"
        + "\n参数:"
        + "\n  1.originPoints:点集,即为元素均为点的数组。"
        + "\n返回:数组(Array),与点集相同维度。",
    "getDistancesBetweenPoints": "getDistancesBetweenPoints( )"
        + "\n"
        + "\n全名:VectorMathExtra.getDistancesBetweenPoints(originPoints)"
        + "\n说明:获取点集相邻点之间的距离长。"
        + "\n参数:"
        + "\n  1.originPoints:点集,即为元素均为点的数组。"
        + "\n返回:数组(Array),与点集相同维度。",
    "multiply": "multiply( )"
        + "\n"
        + "\n全名:VectorMathExtra.multiply(array1, array2)"
        + "\n说明:计算二维数组的数量积。"
        + "\n参数:"
        + "\n  1.array1:二维数组1。"
        + "\n  2.array2:二维数组2。"
        + "\n返回:二维数组(Array)。",
    "divide": "divide( )"
        + "\n"
        + "\n全名:VectorMathExtra.divide(array1, array2)"
        + "\n说明:计算二维数组的数量商。"
        + "\n参数:"
        + "\n  1.array1:二维数组1。"
        + "\n  2.array2:二维数组2。"
        + "\n返回:二维数组(Array)。",
    "transition": "transition( )"
        + "\n"
        + "\n全名:VectorMathExtra.transition(point1, point2, position)"
        + "\n说明:线性平移(点2沿点1平移)。"
        + "\n参数:"
        + "\n  1.point1:点1,类型为二维数组。"
        + "\n  2.point2:点2,类型为二维数组。"
        + "\n  3.position:平移的位移长度。"
        + "\n返回:二维数组(Array)。",
    "rotate": "rotate( )"
        + "\n"
        + "\n全名:VectorMathExtra.rotate(point1, point2, degreeAngle)"
        + "\n说明:线性旋转(点2绕点1旋转)。"
        + "\n参数:"
        + "\n  1.point1:点1,类型为二维数组。"
        + "\n  2.point2:点2,类型为二维数组。"
        + "\n  3.degreeAngle:旋转的角度。"
        + "\n返回:二维数组(Array)。",
    "scale": "scale( )"
        + "\n"
        + "\n全名:VectorMathExtra.scale(point1, point2, scaleRate)"
        + "\n说明:线性缩放(点2以点1缩放)。"
        + "\n参数:"
        + "\n  1.point1:点1,类型为二维数组。"
        + "\n  2.point2:点2,类型为二维数组。"
        + "\n  3.scaleRate:缩放的比例。"
        + "\n返回:二维数组(Array)。",
    "getLineAngle": "getLineAngle( )"
        + "\n"
        + "\n全名:VectorMathExtra.getLineAngle(point1, point2)"
        + "\n说明:计算二维空间内的两点间的斜率角。"
        + "\n参数:"
        + "\n  1.point1:点1,类型为二维数组。"
        + "\n  2.point2:点2,类型为二维数组。"
        + "\n返回:数值(Number)。",
    "getLineLength": "getLineLength( )"
        + "\n"
        + "\n全名:VectorMathExtra.getLineLength(point1, point2)"
        + "\n说明:计算二维空间内的两点间的线段长。"
        + "\n参数:"
        + "\n  1.point1:点1,类型为二维数组。"
        + "\n  2.point2:点2,类型为二维数组。"
        + "\n返回:数值(Number)。",
    "getVectorAngle": "getVectorAngle( )"
        + "\n"
        + "\n全名:VectorMathExtra.getVectorAngle(vector1, vector2)"
        + "\n说明:计算二维空间内的两向量间的夹角。"
        + "\n参数:"
        + "\n  1.vector1:向量1,类型为二维数组。"
        + "\n  2.vector2:向量2,类型为二维数组。"
        + "\n返回:数值(Number)。",
    "getShortestDistanceOnTwoPath": "getShortestDistanceOnTwoPath( )"
        + "\n"
        + "\n全名:VectorMathExtra.getShortestDistanceOnTwoPath(path1, path2, percentage1, precision)"
        + "\n说明:计算两路径最短距离(返回点2最近点的百分比)。"
        + "\n参数:"
        + "\n  1.path1:路径1。"
        + "\n  2.path2:路径2。"
        + "\n  3.percentage1:路径1上点的百分比。"
        + "\n  4.precision:采样的精度,百分制,数值越小精度越高,未定义时默认为1.0。"
        + "\n返回:数值(Number)。",
    "getCrossOverPoint": "getCrossOverPoint( )"
        + "\n"
        + "\n全名:VectorMathExtra.getCrossOverPoint(path1, path2, precision)"
        + "\n说明:计算两贝塞尔曲线的交点(优先返回离入点近的一个),返回在合成空间下的值。"
        + "\n参数:"
        + "\n  1.path1:路径1。"
        + "\n  2.path2:路径2。"
        + "\n  3.precision:采样的精度,数值越大精度越高,未定义时默认为100。"
        + "\n返回:二维数组(Array)。",
    "getPolygonArea": "getPolygonArea( )"
        + "\n"
        + "\n全名:VectorMathExtra.getPolygonArea(originPoints)"
        + "\n说明:计算路径围成的多边形面积(仅计算顶点直线相连的封闭多边形部分)。"
        + "\n参数:"
        + "\n  1.originPoints:点集,即为元素均为点的数组。"
        + "\n返回:数值(Number)。",
    //--- 插值模式 ---//
    "插值模式": "//--- 插值模式 ---//"
        + "\n"
        + "\n插值模式函数主要将数据插入设定好的数学函数,进行中间数值的补充。",
    "setInterpolation": "setInterpolation( )"
        + "\n"
        + "\n全名:InterpolationExtra.setInterpolation(t, tMin, tMax, value1, value2, mode)"
        + "\n说明:将输入的t在tMin和tMax之间以相应的模式插值映射到value1和value2间。"
        + "\n参数:"
        + "\n  1.t:输入的数值。"
        + "\n  2.tMin:数值范围的最小值。"
        + "\n  3.tMax:数值范围的最大值。"
        + "\n  4.value1:输入数值处于最小值时输出的数值或数组。"
        + "\n  5.value2:输入数值处于最大值时输出的数值或数组。"
        + "\n  6.mode:插值模式,可选「linear」「ease」「easeIn」「easeOut」,未定义时默认为linear。"
        + "\n返回:数值(Number)或数组(Array)。",
    "setEasing": "setEasing( )"
        + "\n"
        + "\n全名:InterpolationExtra.setEasing(mode, elapsedTime, beginValue, changeValue, duration)"
        + "\n说明:将开始值(beginValue)在指定时间内(elapsedTime,duration)以某种缓动模式(mode)变化一定范围(changeValue)。"
        + "\n参数:"
        + "\n  1.mode:缓动模式。"
        + "\n  2.elapsedTime:映射的起始时间。"
        + "\n  3.beginValue:起始的数值。"
        + "\n  4.changeValue:变化的数值。"
        + "\n  5.duration:动画持续的时长。"
        + "\n  6.mode:插值模式,所有模式详见Enhanced Expressions Library中Interpolation的setEasing函数。"
        + "\n返回:数值(Number)或数组(Array),与输入维度相同。",
    //--- 颜色转换 ---//
    "颜色转换": "//--- 颜色转换 ---//"
        + "\n"
        + "\n颜色转换函数主要将输入的颜色格式值转换为另一种颜色格式值。",
    "rgbToHex": "rgbToHex( )"
        + "\n"
        + "\n全名:ColorConversionExtra.rgbToHex(rgbaArray)"
        + "\n说明:将rgb样式颜色数组转换为十六进制颜色值。"
        + "\n参数:"
        + "\n  1.rgbaArray:rgb样式颜色数组(带alpha的rgba颜色数组)。"
        + "\n返回:字符串(String),以#开头的十六进制颜色值。",
    "rgbToHsb": "rgbToHsb( )"
        + "\n"
        + "\n全名:ColorConversionExtra.rgbToHsb(rgbaArray)"
        + "\n说明:将rgb样式颜色数组转换为hsb样式颜色数组。"
        + "\n参数:"
        + "\n  1.rgbaArray:rgb样式颜色数组(带alpha的rgba颜色数组)。"
        + "\n返回:三维数组(Array),hsb样式颜色数组。",
    "hsbToRgb": "hsbToRgb( )"
        + "\n"
        + "\n全名:ColorConversionExtra.hsbToRgb(hsbArray)"
        + "\n说明:将hsb样式颜色数组转换为rgb样式颜色数组。"
        + "\n参数:"
        + "\n  1.hsbArray:hsb样式颜色数组。"
        + "\n返回:四维数组(Array),rgba样式颜色数组。",
    "getColorName": "getColorName( )"
        + "\n"
        + "\n全名:ColorConversionExtra.getColorName(rgbaArray)"
        + "\n说明:获得颜色名字。"
        + "\n参数:"
        + "\n  1.rgbaArray:rgb样式颜色数组(带alpha的rgba颜色数组)。"
        + "\n返回:字符串(String),颜色描述性名字。",
    //--- 数学 ---//
    "数学": "//--- 数学 ---//"
        + "\n"
        + "\n数学函数主要是对数值运算的数学矢量方法。",
    "dataLeftCompleting": "dataLeftCompleting( )"
        + "\n"
        + "\n全名:MathExtra.dataLeftCompleting(originData, bits, identifier)"
        + "\n说明:将数据左方补齐位数。"
        + "\n参数:"
        + "\n  1.originData:原始数据。"
        + "\n  2.bits:补齐的位数。"
        + "\n  3.identifier:用于向左补齐位数的数据,未定义时默认为0。"
        + "\n返回:字符串(String)。",
    "getSmallAbsoluteDiffence": " getSmallAbsoluteDiffence( )"
        + "\n"
        + "\n全名:MathExtra.getSmallAbsoluteDiffence(num1, num2, comparedNumber)"
        + "\n说明:获得距离指定数值绝对差值小的数字。"
        + "\n参数:"
        + "\n  1.num1:数字1,类型为数值。"
        + "\n  2.num2:数字2,类型为数值。"
        + "\n  3.comparedNumber:用以比较的基准数据,类型为数值。"
        + "\n返回:数值(Number)。",
    "getRemainder": "getRemainder( )"
        + "\n"
        + "\n全名:MathExtra.getRemainder(originalData, divisor)"
        + "\n说明:取余,即取得整数除法中被除数未被除尽部分,和直接取余的区别在于可以正确处理负数范围。"
        + "\n参数:"
        + "\n  1.originalData:原始数值,除数。"
        + "\n  2.divisor:被除数。"
        + "\n返回:数值(Number)。",
    "retainDecimals": "retainDecimals( )"
        + "\n"
        + "\n全名:MathExtra.retainDecimals(originData, number)"
        + "\n说明:保留指定位数小数。"
        + "\n参数:"
        + "\n  1.originalData:原始数值。"
        + "\n  2.number:保留的小数位数。"
        + "\n返回:数值(Number)。",
    "approximatelyEqual": "approximatelyEqual( )"
        + "\n"
        + "\n全名:MathExtra.approximatelyEqual(num1, num2, epsilon)"
        + "\n说明:约等于。"
        + "\n参数:"
        + "\n  1.num1:数字1,类型为数值。"
        + "\n  2.num2:数字2,类型为数值。"
        + "\n  3.epsilon:约等于判断的精度。"
        + "\n返回:布尔值(Boolean)。",
    "radiansToDegrees": "radiansToDegrees( )"
        + "\n"
        + "\n全名:MathExtra.radiansToDegrees(radians)"
        + "\n说明:弧度转角度。"
        + "\n参数:"
        + "\n  1.radians:弧度制下的度数。"
        + "\n返回:数值(Number)。",
    "degreesToRadians": "degreesToRadians( )"
        + "\n"
        + "\n全名:MathExtra.degreesToRadians(degrees)"
        + "\n说明:角度转弧度。"
        + "\n参数:"
        + "\n  1.degrees:角度制下的度数。"
        + "\n返回:数值(Number)。",
    //--- 图层 ---//
    "图层": "//--- 图层 ---//"
        + "\n"
        + "\n图层函数主要是返回图层本身的属性,大多要配合其他属性协同使用。",
    "setAnchor": "setAnchor( )"
        + "\n"
        + "\n全名:LayerExtra.setAnchor(xAlignment, yAlignment)"
        + "\n说明:设置锚点固定的位置。"
        + "\n参数:"
        + "\n  1.xAlignment:在x方向上的对齐,可选「left」「center」「right」,未定义时为原始锚点x值。"
        + "\n  2.yAlignment:在y方向上的对齐,可输入参数为「top」「center」「bottom」,未定义时为原始锚点y值。"
        + "\n返回:二维数组(Array)。",
    "getLayerSize": "getLayerSize( )"
        + "\n"
        + "\n全名:LayerExtra.getLayerSize(targetLayer, targetTime)"
        + "\n说明:获得图层大小。"
        + "\n参数:"
        + "\n  1.targetLayer:目标图层,未输入时默认为thisLayer。"
        + "\n  2.targetTime:指定的时间,未输入时默认为thisLayer.time。"
        + "\n返回:二维数组(Array)。",
    "scaleToFitSize": "scaleToFitSize( )"
        + "\n"
        + "\n全名:LayerExtra.scaleToFitSize(originSize, targetSize, toggles = undefined)"
        + "\n说明:获得图层大小。"
        + "\n参数:"
        + "\n  1.originSize:原始大小。"
        + "\n  2.targetSize:目标缩放大小。"
        + "\n  3.toggles:一些可选选项开关,对象。"
        + "\n  onlyScaleDown为true只缩小适配,onlyScaleUp为true时只放大适配,uniform为false时适配长宽比例不统一。"
        + "\n返回:二维数组(Array)。",
    "fontSwitching": "fontSwitching( )"
        + "\n"
        + "\n全名:LayerExtra.fontSwitching(sliderControl, targetComp)"
        + "\n说明:设置锚点固定的位置(2020版之后的js表达式引擎可用)。"
        + "\n参数:"
        + "\n  1.sliderControl:滑块控制器。"
        + "\n  2.targetComp:目标合成。"
        + "\n返回:对象(Object)。",
    "getChildTruePosition": "getChildTruePosition( )"
        + "\n"
        + "\n全名:LayerExtra.getChildTruePosition(targetLayer)"
        + "\n说明:获得子图层在当前合成内的真实位置。"
        + "\n参数:"
        + "\n  1.targetLayer:目标图层。"
        + "\n返回:二维或三维数组(Array),与输入维度相同。",
    "setParentPropertyAtTime": "setParentPropertyAtTime( )"
        + "\n"
        + "\n全名:LayerExtra.setParentPropertyAtTime(targetLayer, delayTime, mode)"
        + "\n说明:在属性中进行绑定父子级,可设置时间延迟。"
        + "\n参数:"
        + "\n  1.targetLayer:目标图层。"
        + "\n  2.delayTime:延迟时间。"
        + "\n  3.mode:父子级绑定模式,可选「separate」「connect」。"
        + "\n  未定义时默认为separate,分离的情况下受到父子级的距离影响但并不统一属性,链接的情况下和默认父子级完全一致。"
        + "\n返回:对象(Object)。"
        + "\n  1.position:位置属性。"
        + "\n  2.rotation:旋转属性。"
        + "\n  3.scale:缩放属性。",
    "setParentPropertyAtFrame": "setParentPropertyAtTime( )"
        + "\n"
        + "\n全名:LayerExtra.setParentPropertyAtFrame(targetLayer, delayFrame, mode)"
        + "\n说明:在属性中进行绑定父子级,可设置帧数延迟。"
        + "\n参数:"
        + "\n  1.targetLayer:目标图层。"
        + "\n  2.delayFrame:延迟帧数。"
        + "\n  3.mode:父子级绑定模式,可选「separate」「connect」。"
        + "\n  未定义时默认为separate,分离的情况下受到父子级的距离影响但并不统一属性,链接的情况下和默认父子级完全一致。"
        + "\n返回:对象(Object)。"
        + "\n  1.position:位置属性。"
        + "\n  2.rotation:旋转属性。"
        + "\n  3.scale:缩放属性。",
    "typewriterEffect": "typewriterEffect( )"
        + "\n"
        + "\n全名:LayerExtra.LayerExtra.typewriterEffect(delay = 0.1)"
        + "\n说明:打字机效果。"
        + "\n参数:"
        + "\n  1.delay:字符间延迟时间。"
        + "\n返回:对象(Object)。",
    "opacityControl": "opacityControl( )"
        + "\n"
        + "\n全名:LayerExtra.opacityControl( )"
        + "\n说明:子级不透明度受父级控制,具体表现为父级可视开启的情况下子级不透明度与父级保持一致,父级可视关闭的情况下子级不透明度归零。"
        + "\n参数:无。"
        + "\n返回:数值(Number)。",
    "compositeMotionPath": "compositeMotionPath( )"
        + "\n"
        + "\n全名:LayerExtra.compositeMotionPath(shapeValue, sliderControl, targetLayer)"
        + "\n说明:复合路径位移,具体为图层位置绕着路径进行运动。"
        + "\n参数:"
        + "\n  1.shapeValue:形状层或蒙版路径属性。"
        + "\n  2.sliderControl:滑块控制器。"
        + "\n  3.targetLayer:目标图层。"
        + "\n返回:二维或三维数组(Array),与输入维度相同。",
    //--- 摄像机 ---//
    "摄像机": "//--- 摄像机 ---//"
        + "\n"
        + "\n摄像机函数主要是返回摄像机中的属性,一般需要作用在摄像机图层属性上。",
    "cameraSwitching": "cameraSwitching( )"
        + "\n"
        + "\n全名:CameraExtra.cameraSwitching(sliderControl, mode)"
        + "\n说明:摄像机切换,需要添加在合成活动摄像机的属性中。"
        + "\n参数:"
        + "\n  1.sliderControl:滑块控制器。"
        + "\n  2.mode:摄像机切换模式,可选「linear」「hold」,未定义时默认为linear,linear模式下线性插值切换,hold模式下定格切换。"
        + "\n返回:对象(Object),具体为表达式所在的摄像机属性。",
    //--- 路径属性 ---//
    "路径属性": "//--- 路径属性 ---//"
        + "\n"
        + "\n路径属性函数主要用于处理形状路径或蒙版路径,一般需要作用在路径属性上。",
    "getPathParameter": "getPathParameter( )"
        + "\n"
        + "\n全名:PathPropertyExtra.getPathParameter(shapeValue, percentage, t)"
        + "\n说明:获得路径上百分比数据。"
        + "\n参数:"
        + "\n  1.shapeValue:形状层或蒙版路径属性。"
        + "\n  2.percentage:百分数值。"
        + "\n  3.t:路径的时间,未定义时默认为time。"
        + "\n返回:对象(Object)。"
        + "\n  1.point:该点坐标。"
        + "\n  2.tangent:该点切向量。"
        + "\n  3.normal:该点法向量。",
    "getConvexHull": "getConvexHull( )"
        + "\n"
        + "\n全名:PathPropertyExtra.getConvexHull(originPoints)"
        + "\n说明:获得凸包处理后的凸多边形。"
        + "\n参数:"
        + "\n  1.originPoints:原多边形顶点集。"
        + "\n返回:数组(Array),维度和输入点集的数量一致。",
    "pathResample": "pathResample( )"
        + "\n"
        + "\n全名:PathPropertyExtra.pathResample(shapeValue, sliderControl, offsetSliderControl)"
        + "\n说明:路径重采样,整个路径按一定间隔采集顶点转换成封闭多边形。"
        + "\n参数:"
        + "\n  1.shapeValue:形状层或蒙版路径属性。"
        + "\n  2.sliderControl:滑块控制器。"
        + "\n  3.offsetSliderControl:偏移控制器。"
        + "\n返回:数组(Array),维度和输入点集的数量一致。",
    "createPathFromPosition": "createPathFromPosition( )"
        + "\n"
        + "\n全名:PathPropertyExtra.createPathFromPosition(targetLayer, mode)"
        + "\n说明:创建与指定图层的位置属性空间贝塞尔曲线一致的路径。"
        + "\n参数:"
        + "\n  1.targetLayer:目标图层。"
        + "\n  2.mode:路径存在时时间模式,可选「all」「limit」,未定义时默认为limit."
        + "\n  limit模式下仅在指定图层持续时间内路径存在,all模式下存在于整个合成时间。"
        + "\n返回:对象(Object)或者函数(Function),具体为路径属性。",
    "physicalRoll": "physicalRoll( )"
        + "\n"
        + "\n全名:PathPropertyExtra.physicalRoll(shapeValue)"
        + "\n说明:物理滚动函数,使路径形成的封闭图形能够在水平面上物理滚动。"
        + "\n参数:"
        + "\n  1.shapeValue:形状层或蒙版路径属性。"
        + "\n返回:三维数组(Array)。",
    "createConnectorPath": "createConnectorPath( )"
        + "\n"
        + "\n全名:PathPropertyExtra.createConnectorPath(sliderControl, firstPath, secondPath)"
        + "\n说明:路径插值函数,从两个路径曲线信息创建插值路径。"
        + "\n参数:"
        + "\n  1.sliderControl:滑块控制器。"
        + "\n  2.firstPath:形状层或蒙版路径1。"
        + "\n  3.secondPath:形状层或蒙版路径2。"
        + "\n返回:对象(Object)或者函数(Function),具体为路径属性。",
    //--- 属性 ---//
    "属性": "//--- 属性 ---//"
        + "\n"
        + "\n属性函数主要用于处理属性的值。",
    "wigglePlus": "wigglePlus( )"
        + "\n"
        + "\n全名:PropertyExtra.wigglePlus(freq, amp, toggles)"
        + "\n说明:高级摆动函数,无关键帧的情况下可以自定义循环周期,有关键帧的情况下以关键帧时间范围作为循环范围。"
        + "\n参数:"
        + "\n  1.freq:频率,即每秒随机变化的次数,未定义时默认为5.0。"
        + "\n  2.amp:振幅,即随机抖动位置移动的大小,未定义时默认为10.0。"
        + "\n  3.toggles:一些可选选项开关,对象。"
        + "\n  type为循环模式,可选「cycle」「pingpong」,未定义时默认为cycle"
        + "\n  loopTime为循环时间,存在关键帧时为关键帧持续时长,不存在关键帧时自定义循环时长,自定义时为定义默认为1.0。"
        + "\n返回:对象(Object)或者函数(Function)。",
    "waveWiggle": "waveWiggle( )"
        + "\n"
        + "\n全名:PropertyExtra.waveWiggle(amp, freq, octaves)"
        + "\n说明:波形摆动函数,属性呈波形变化。"
        + "\n参数:"
        + "\n  1.freq:频率,即每秒随机变化的次数,未定义时默认为6.0。"
        + "\n  2.amp:振幅,即随机抖动位置移动的大小,未定义时默认为20.0。"
        + "\n  3.octaves : 阶度,参数越大分型越细致,未定义时默认为3.0。"
        + "\n返回:对象(Object)或者函数(Function)。",
    "velocityContinue": "velocityContinue( )"
        + "\n"
        + "\n全名:PropertyExtra.velocityContinue(targetLayerOrComp)"
        + "\n说明:关键帧末尾速度持续延伸,可以用标记来控制延伸停止进行。"
        + "\n参数:"
        + "\n  1.targetLayerOrComp:标记所在目标图层或图层,未定义时默认为thisLayer。"
        + "\n返回:对象(Object)或者函数(Function)。",
    "loopPlus": "loopPlus( )"
        + "\n"
        + "\n全名:PropertyExtra.loopPlus(type, mode)"
        + "\n说明:万能循环,可以作用在任何可设置关键帧的属性。"
        + "\n参数:"
        + "\n  1.type:循环类型,可选「cycle」「pingpong」,未定义时默认为cycle。"
        + "\n  cycle类型下重复关键帧整体片段,pingpong类型下向前和向后交替重复关键帧整体片段。"
        + "\n  2.mode:循环模式,可选「all」「out」「in」,未定义时默认为all。"
        + "\n  all模式下整个合成区间都会循环,out模式从第一个关键帧所在时间开始循环到合成末尾,in模式从合成开始循环到最后一个关键帧所在时间。"
        + "\n返回:对象(Object)或者函数(Function)。",
    "valueAtFrame": "valueAtFrame( )"
        + "\n"
        + "\n全名:PropertyExtra.valueAtFrame(targetProperty, targetFrame)"
        + "\n说明:属性在指定帧数下的值。"
        + "\n参数:"
        + "\n  1.targetProperty:目标属性。"
        + "\n  2.targetFrame:指定的帧数。"
        + "\n返回:对象(Object)或者函数(Function)。",
    "valueAtTime": "valueAtTime( )"
        + "\n"
        + "\n全名:PropertyExtra.valueAtTime(targetProperty, targetTime)"
        + "\n说明:属性在指定时间下的值。"
        + "\n参数:"
        + "\n  1.targetProperty:目标属性。"
        + "\n  2.targetTime:指定的时间。"
        + "\n返回:对象(Object)或者函数(Function)。",
    "frameAtValue": "frameAtValue( )"
        + "\n"
        + "\n全名:PropertyExtra.frameAtValue(targetProperty, targetValue)"
        + "\n说明:属性在具体值下的帧。"
        + "\n参数:"
        + "\n  1.targetProperty:目标属性。"
        + "\n  2.targetValue:指定的值。"
        + "\n返回:对象(Object)或者函数(Function)。",
    "timeAtValue": "timeAtValue( )"
        + "\n"
        + "\n全名:PropertyExtra.timeAtValue(targetProperty, targetValue)"
        + "\n说明:属性在具体值下的时间。"
        + "\n参数:"
        + "\n  1.targetProperty:目标属性。"
        + "\n  2.targetValue:指定的值。"
        + "\n返回:对象(Object)或者函数(Function)。",
    "getLayerObject": "getLayerObject( )"
        + "\n"
        + "\n全名:PropertyExtra.getLayerObject(targetObject)"
        + "\n说明:获得属性所处的图层对象。"
        + "\n参数:"
        + "\n  1.targetObject:目标对象。"
        + "\n返回:对象(Object)或者函数(Function)。",
    "getPropertyDimension": "getPropertyDimension( )"
        + "\n"
        + "\n全名:PropertyExtra.getPropertyDimension(targetProperty)"
        + "\n说明:获取属性的维度。"
        + "\n参数:"
        + "\n  1.targetProperty:目标属性。"
        + "\n返回:对象(Object)或者函数(Function)。",
    "setPropertyDimension": "getPropertyDimension( )"
        + "\n"
        + "\n全名:PropertyExtra.setPropertyDimension(originalData, num)"
        + "\n说明:将属性的所有维度设置相同值(相同值)。"
        + "\n参数:"
        + "\n  1.originalData:设置的值。"
        + "\n  2.num:属性的维度。"
        + "\n返回:对象(Object)或者函数(Function)。",
    "setPropertyByDimension": "setPropertyByDimension( )"
        + "\n"
        + "\n全名:setPropertyByDimension(targetProperty, expressionFormula)"
        + "\n说明:将属性的所有维度设置函数处理后的值(不同值)。"
        + "\n参数:"
        + "\n  1.targetProperty:目标属性。"
        + "\n  2.expressionFormula:处理不同维度值的函数。"
        + "\n返回:对象(Object)或者函数(Function)。",
    //--- 关键帧 ---//
    "关键帧": "//--- 关键帧 ---//"
        + "\n"
        + "\n关键帧函数主要用于获得或处理关键帧的属性。",
    "getKeyParameter": "getKeyParameter( )"
        + "\n"
        + "\n全名:KeyExtra.getKeyParameter(type, targetProperty, offsetIndex)"
        + "\n说明:获取关键帧的属性信息(时间、帧数、索引或值)。"
        + "\n参数:"
        + "\n  1.type:获得关键帧的类型,可选「last」「next」「nearnest」「undefined」,未定义时默认为undefined。"
        + "\n  last类型获取当前时间上一个关键帧,next类型获取当前时间下一个关键帧,nearest类型获取当前时间最近的关键帧。"
        + "\n  2.targetProperty:目标属性,未定义时默认为thisProperty。"
        + "\n  3.offsetIndex:偏移的索引数,未定义时默认为0即不偏移。"
        + "\n返回:对象(Object)。"
        + "\n  1.time:关键帧时间,输入小于1为targetLayer入点时间,输入大于numKeys为targetLayer出点时间。"
        + "\n  2.frame:关键帧帧数,输入小于1为targetLayer入点帧数,输入大于numKeys为targetLayer出点帧数。"
        + "\n  3.index:关键帧索引,输入小于1则为0,输入大于numKeys则为numKeys。"
        + "\n  4.value:关键帧值,输入小于1为targetLayer入点时间下的值,输入大于numKeys为targetLayer出点时间下的值。",
    "bounce": "bounce( )"
        + "\n"
        + "\n全名:KeyExtra.bounce(amp, freq, decay)"
        + "\n说明:弹性表达式。"
        + "\n参数:"
        + "\n  1.amp:振幅,即振动可达到的最大值,未定义时默认为0.1。"
        + "\n  2.freq:频率,即单位时间内完成周期性变化的次数,未定义时默认为3.0。"
        + "\n  3.decay:衰减,即弹性势能消散的速率,未定义时默认为5.0。"
        + "\n返回:对象(Object)或者函数(Function)。",
    "bounceSmooth": "bounceSmooth( )"
        + "\n"
        + "\n全名:KeyExtra.bounceSmooth(amp, freq, decayDuration)"
        + "\n说明:平滑弹性表达式。"
        + "\n参数:"
        + "\n  1.amp:振幅,即振动可达到的最大值,未定义时默认为5.0。"
        + "\n  2.freq:频率,即单位时间内完成周期性变化的次数,未定义时默认为3.0。"
        + "\n  3.decayDuration:衰减时间,即弹性势能完全消散的时间,未定义时默认为0.3。"
        + "\n返回:对象(Object)或者函数(Function)。",
    "bounceBack": "bounceBack( )"
        + "\n"
        + "\n全名:KeyExtra.bounceBack(elasticity, gravity, nMax)"
        + "\n说明:反弹表达式。"
        + "\n参数:"
        + "\n  1.elasticity:弹性,即反弹的高度与下落高度的比值,未定义时默认为0.3。"
        + "\n  2.gravity:重力,即加速到地面的速度大小,未定义时默认为2。"
        + "\n  3.nMax:反弹最大次数,未定义时默认为5。"
        + "\n返回:对象(Object)或者函数(Function)。",
    "exponent": "exponent( )"
        + "\n"
        + "\n全名:KeyExtra.exponent()"
        + "\n说明:指数表达式。"
        + "\n参数:无。"
        + "\n返回:对象(Object)或者函数(Function)。",
    "squareShake": "squareShake( )"
        + "\n"
        + "\n全名:KeyExtra.squareShake(angle, shakeDistance, num, mode)"
        + "\n说明:四方抖动。"
        + "\n参数:"
        + "\n  1.angle:抖动的角度,未定义时默认为0.5。"
        + "\n  2.shakeDIstance:抖动的距离,未定义时默认为100.0"
        + "\n  3.num:抖动的次数,未定义时默认为5。"
        + "\n  4.mode:抖动的顺序,可选0-4,未定义时默认为0。"
        + "\n返回:对象(Object)或者函数(Function)。",
    "setKeyCurves": "setKeyCurves( )"
        + "\n"
        + "\n全名:KeyExtra.setKeyCurves(easingmode, type)"
        + "\n说明:设置关键帧曲线。"
        + "\n参数:"
        + "\n  1.easingmode:缓动模式,所有模式详见Enhanced Expressions Library中Interpolation的setEasing函数。"
        + "\n  2.type:设置指定关键帧的类型,可选「start」「end」「start&end」或关键帧的数值。"
        + "\n返回:对象(Object)或者函数(Function)。",
    "setKeyCurvesByBezier": "setKeyCurvesByBezier( )"
        + "\n"
        + "\n全名:KeyExtra.setKeyCurvesByBezier(shapeValue, type)"
        + "\n说明:通过自定义贝塞尔设置关键帧曲线。"
        + "\n参数:"
        + "\n  1.shapeValue:形状层或蒙版路径属性,此处超出一段也只有前两个点形成的第一段起作用。"
        + "\n  2.type:设置指定关键帧的类型,可选「start」「end」「start&end」或关键帧的数值。"
        + "\n返回:对象(Object)或者函数(Function)。",
    //--- 标记关键帧 ---//
    "标记关键帧": "//--- 标记关键帧 ---//"
        + "\n"
        + "\n标记关键帧函数主要用于获得或处理标记关键帧的属性。",
    "getMarkerParameter": "getMarkerParameter( )"
        + "\n"
        + "\n全名:KeyExtra.getMarkerParameter(type, targetLayerOrComp, offsetIndex)"
        + "\n说明:获取标记关键帧的属性信息(时间、帧数、索引、持续时间、入点、出点和注释)。"
        + "\n参数:"
        + "\n  1.type:获得标记关键帧的类型,可选「last」「next」「nearnest」「undefined」,未定义时默认为undefined。"
        + "\n  last类型获取当前时间上一个标记关键帧,next类型获取当前时间下一个标记关键帧,nearest类型获取当前时间最近的标记关键帧。"
        + "\n  2.targetLayerOrComp:标记所在目标图层或合成,未定义时默认为thisLayer。"
        + "\n  3.offsetIndex:偏移的索引数,未定义时默认为0即不偏移。"
        + "\n返回:对象(Object)。"
        + "\n  1.time:标记关键帧时间,输入小于1为targetLayerOrComp入点时间,输入大于numKeys为targetLayerOrComp出点时间。"
        + "\n  2.frame:标记关键帧帧数,输入小于1为targetLayerOrComp入点帧数,输入大于numKeys为targetLayerOrComp出点帧数。"
        + "\n  3.index:标记关键帧索引,输入小于1则为0,输入大于numKeys则为numKeys。"
        + "\n  4.duration:标记关键帧持续时间,输入小于1或大于numKeys为0。"
        + "\n  5.inPoint:标记关键帧入点,溢出情况同time。"
        + "\n  6.outPoint:标记关键帧出点,溢出情况同time。"
        + "\n  7.comment:标记关键帧注释,输入小于1或大于numKeys为空。",
    "expressionSwitchingAtMarker": "expressionSwitchingAtMarker( )"
        + "\n"
        + "\n全名:MarkerKeyExtra.expressionSwitchingAtMarker(expressionFormula, mode, targetLayerOrComp, t)"
        + "\n说明:在标记持续时间内表达式起作用。"
        + "\n参数:"
        + "\n  1.expressionFormula:作用的表达式函数。"
        + "\n  2.mode:切换插值模式,可选「linear」「hold」,未定义时默认为linear,linear模式下线性插值切换,hold模式下定格切换。"
        + "\n  3.targetLayerOrComp:标记所在目标图层或图层,未定义时默认为thisLayer。"
        + "\n  4.t:插值模式下切换的时长,未定义时默认为0.2。"
        + "\n返回:对象(Object)或者函数(Function)。",
    "keyPausedAtMarker": "expressionSwitchingAtMarker( )"
        + "\n"
        + "\n全名:MarkerKeyExtra.keyPausedAtMarker()"
        + "\n说明:在标记持续时间内关键帧变化停止,即时停函数。"
        + "\n返回:对象(Object)或者函数(Function)。",
    //--- 树 ---//
    "树": "//--- 树 ---//"
        + "\n"
        + "\n树函数主要用于获得属性有限节点组成一个具有层次关系的集合。",
    "createTree": "createTree( )"
        + "\n"
        + "\n全名:createTree(targetObject)"
        + "\n说明:创建属性的树结构。"
        + "\n参数:"
        + "\n  1.targetObject:目标对象。"
        + "\n返回:对象(Object),树结构。",
    "setChildren": "setChildren( )"
        + "\n"
        + "\n全名:setChildren(parent)"
        + "\n说明:设置树的子节点。"
        + "\n参数:"
        + "\n  1.parent:父对象。"
        + "\n返回:无。",
    "treeFind": "treeFind( )"
        + "\n"
        + "\n全名:treeFind(tree, func, objectArray = [])"
        + "\n说明:查找树中节点,将符合条件的节点以数组形式返回。"
        + "\n参数:"
        + "\n  1.tree:树结构。"
        + "\n  2.func:执行函数。"
        + "\n  3.objectArray:返回的对象数组,未定义时默认为空数组。"
        + "\n返回:数组(Array),符合条件的树节点对象的数组集合。",
    "treeFindPath": "treeFindPath( )"
        + "\n"
        + "\n全名:treeFindPath(tree, func, objectArray = [])"
        + "\n说明:回溯法查找树中节点,将符合条件的节点以数组形式返回。"
        + "\n参数:"
        + "\n  1.tree:树结构。"
        + "\n  2.func:执行函数。"
        + "\n  3.objectArray:返回的对象数组,未定义时默认为空数组。"
        + "\n返回:数组(Array),符合条件的树节点对象的数组集合。",
    "deepTree": "deepTree( )"
        + "\n"
        + "\n全名:deepTree(tree, func)"
        + "\n说明:将树中节点进行深度优先遍历(先序遍历)。"
        + "\n参数:"
        + "\n  1.tree:树结构。"
        + "\n  2.func:执行函数。"
        + "\n返回:无。",
    "deepTreeLater": "deepTreeLater( )"
        + "\n"
        + "\n全名:deepTreeLater(tree, func)"
        + "\n说明:将树中节点进行深度优先遍历(后序遍历)。"
        + "\n参数:"
        + "\n  1.tree:树结构。"
        + "\n  2.func:执行函数。"
        + "\n返回:无。",
    "scopeTree": "scopeTree( )"
        + "\n"
        + "\n全名:scopeTree(tree, func)"
        + "\n说明:将树中节点进行广度优先遍历。"
        + "\n参数:"
        + "\n  1.tree:树结构。"
        + "\n  2.func:执行函数。"
        + "\n返回:无。",
    "listToTree": "listToTree( )"
        + "\n"
        + "\n全名:listToTree(list)"
        + "\n说明:列表转树结构。"
        + "\n参数:"
        + "\n  1.list:列表。"
        + "\n返回:对象(Object),树结构。",
    "treeToList": "treeToList( )"
        + "\n"
        + "\n全名:treeToList(tree, result = [], level = 0)"
        + "\n说明:树结构转列表。"
        + "\n参数:"
        + "\n  1.tree:树结构。"
        + "\n  2.result:转成树结构的结果,即最终的树"
        + "\n  3.level:节点的级别。"
        + "\n返回:对象(Object),列表。",
    "showDeepTree": "showDeepTree( )"
        + "\n"
        + "\n全名:showDeepTree(tree)"
        + "\n说明:展示深度遍历结果(先序遍历)。"
        + "\n参数:"
        + "\n  1.tree:树结构。"
        + "\n返回:字符串(String)。",
    "showDeepLaterTree": "showDeepLaterTree( )"
        + "\n"
        + "\n全名:showDeepLaterTree(tree)"
        + "\n说明:展示深度遍历结果(后序遍历)。"
        + "\n参数:"
        + "\n  1.tree:树结构。"
        + "\n返回:字符串(String)。",
    "showScopeTree": "showScopeTree( )"
        + "\n"
        + "\n全名:showScopeTree(tree)"
        + "\n说明:展示广度遍历结果。"
        + "\n参数:"
        + "\n  1.tree:树结构。"
        + "\n返回:字符串(String)。",
    "getNodePath": "getNodePath( )"
        + "\n"
        + "\n全名:getNodePath(node)"
        + "\n说明:获得节点路径。"
        + "\n参数:"
        + "\n  1.node:树节点。"
        + "\n返回:字符串(String)。",
    "getNodeRoot": "getNodeRoot( )"
        + "\n"
        + "\n全名:getNodeRoot(node, index = 0)"
        + "\n说明:获得根节点。"
        + "\n参数:"
        + "\n  1.node:树节点。"
        + "\n  2.index:距离根节点的节点位置数,未定义时默认为0即底层根节点。"
        + "\n返回:对象(Object),节点。",
    "showList": "showList( )"
        + "\n"
        + "\n全名:showList(list)"
        + "\n说明:查找树节点之后批量展示列表结果。"
        + "\n参数:"
        + "\n  1.list:节点列表(或数组)。"
        + "\n返回:字符串(String)。",
    "showListPath": "showListPath( )"
        + "\n"
        + "\n全名:showListPath(list)"
        + "\n说明:查找树节点之后批量展示路径列表结果,即显示从根节点到目标节点的路径。"
        + "\n参数:"
        + "\n  1.list:节点列表(或数组)。"
        + "\n返回:字符串(String)。",
    "createShowList": "createShowList( )"
        + "\n"
        + "\n全名:createShowList(list)"
        + "\n说明:创建自定义展示列表,规定第一个参数外其他可以输入任意个参数。"
        + "\n参数:"
        + "\n  1.list:节点列表(或数组)。"
        + "\n  2.string:节点子对象属性的字符串,除去第一个参数后的参数可输入此类型,结果会返回属性值。"
        + "\n  3.string:非节点子对象属性的任意字符串,除去第一个参数后的参数可输入此类型,结果会返回字符串的值。"
        + "\n  4.function:针对节点的执行函数,除去第一个参数后的参数可输入此类型,结果会返回执行后的值。"
        + "\n返回:字符串(String)。",
    //--- 贝塞尔曲线 ---//
    "贝塞尔曲线": "//--- 贝塞尔曲线 ---//"
        + "\n"
        + "\n贝塞尔曲线函数对贝塞尔曲线定制度相比原生函数更高。",
    "flattenMultisegmentedShape": "flattenMultisegmentedShape( )"
        + "\n"
        + "\n全名:BezierExtra.flattenMultisegmentedShape(shapeValue, precision)"
        + "\n说明:细分形状(直线线段不被细化)。"
        + "\n参数:"
        + "\n  1.shapeValue:形状层或蒙版路径属性。"
        + "\n  2.precision:采样的精度,百分制,数值越大精度越高,未定义时默认为10.0。"
        + "\n返回:数组(Array),细分后的点集。",
    "flattenAllMultisegmentedShape": "flattenAllMultisegmentedShape( )"
        + "\n"
        + "\n全名:BezierExtra.flattenAllMultisegmentedShape(shapeValue, precision)"
        + "\n说明:细分所有形状(直线和曲线线段都被细化)。"
        + "\n参数:"
        + "\n  1.shapeValue:形状层或蒙版路径属性。"
        + "\n  2.precision:采样的精度,百分制,数值越大精度越高,未定义时默认为10.0。"
        + "\n返回:数组(Array),细分后的点集。",
    "getBezierPoint": "getBezierPoint( )"
        + "\n"
        + "\n全名:BezierExtra.getBezierPoint(p1, cp1, cp2, p2, t)"
        + "\n说明:获得贝塞尔曲线上的点。"
        + "\n参数:"
        + "\n  1.p1:入点。"
        + "\n  2.cp1:入点手柄的实际位置。"
        + "\n  3.cp2:出点手柄的实际位置。"
        + "\n  4.p2:出点。"
        + "\n  5.t:贝塞尔曲线参数方程的中间变量,表达点在曲线上的位置比值,入点为0出点为1。"
        + "\n返回:二维数组(Array)。",
    "flattenCubicBezier": "flattenCubicBezier( )"
        + "\n"
        + "\n全名:BezierExtra.flattenCubicBezier(p1, cp1, cp2, p2, precision)"
        + "\n说明:细分单段贝塞尔曲线。"
        + "\n参数:"
        + "\n  1.p1:入点。"
        + "\n  2.cp1:入点手柄的实际位置。"
        + "\n  3.cp2:出点手柄的实际位置。"
        + "\n  4.p2:出点。"
        + "\n  5.precision:采样的精度,百分制,数值越大精度越高,未定义时默认为10.0。"
        + "\n返回:数组(Array),细分后的点集。",
    "isStraightLine": "isStraightLine( )"
        + "\n"
        + "\n全名:BezierExtra.isStraightLine(p1, cp1, cp2, p2)"
        + "\n说明:单端贝塞尔曲线是否为一条线段。"
        + "\n参数:"
        + "\n  1.p1:入点。"
        + "\n  2.cp1:入点手柄的实际位置。"
        + "\n  3.cp2:出点手柄的实际位置。"
        + "\n  4.p2:出点。"
        + "\n返回:布尔值(Boolean)。",
    "toBezierFormat": "toBezierFormat( )"
        + "\n"
        + "\n全名:BezierExtra.toBezierFormat(shapeValue)"
        + "\n说明:路径转为转为贝塞尔参数方程格式。"
        + "\n参数:"
        + "\n  1.shapeValue:形状层或蒙版路径属性。"
        + "\n返回:数组(Array),点集,即用入点位置、入点手柄实际位置、出点手柄实际位置、出点位置形式来描述。",
    "customBezier": "customBezier( )"
        + "\n"
        + "\n全名:BezierExtra.flattenCubicBezier(t, tMin, tMax, value1, value2, bezierPoints)"
        + "\n说明:自定义贝塞尔曲线。"
        + "\n参数:"
        + "\n  1.t:时间。"
        + "\n  2.tMin:开始时间。"
        + "\n  3.tMax:结束时间。"
        + "\n  4.value1:开始值。"
        + "\n  5.value2:结束值。"
        + "\n  6.bezierPoints:贝塞尔曲线点,四维数组,前两位是入点切点实际位置归一化的坐标,后两位是出点切点实际位置归一化的坐标。"
        + "\n返回:数组(Array),和输入值的维度一致。",
    //--- Text ---//
    "文本": "//--- 文本 ---//"
        + "\n"
        + "\n文本函数主要用在文本属性上,进行字符串的处理。",
    "textRandomShuffle": "textRandomShuffle( )"
        + "\n"
        + "\n全名:TextExtra.textRandomShuffle(rate, sliderControl)"
        + "\n说明:字符洗牌算法随机。"
        + "\n参数:"
        + "\n  1.rate:刷新的速率,未输入时默认为每秒15帧。"
        + "\n  2.sliderControl:滑块控制器,未输入时默认为0。"
        + "\n返回:字符串(String)。",
    "textGlitchRandom": "textGlitchRandom( )"
        + "\n"
        + "\n全名:textGlitchRandom = function (keyOrMarkerControl, startText, endText, offset, mode, rate)"
        + "\n说明:字符故障随机。"
        + "\n参数:"
        + "\n  1.keyOrMarkerControl:将关键帧或标记关键帧属性用作控制器,关键帧一般用滑块控制器。"
        + "\n  2.startText:初始字符串,未输入时默认为sourceText。"
        + "\n  3.endText:末尾字符串,未输入时默认为和初始字符串个数相同的/。"
        + "\n  4.offset:偏移时间,未输入时默认为0。"
        + "\n  5.mode:随机字符范围模式,可选「full」「letters」,未输入时默认为full。"
        + "\n  full模式下随机字符范围为全英文字符,letters模式下随机字符范围为全英文字母。"
        + "\n  6.rate:刷新的速率,未输入时默认为每秒15帧。"
        + "\n返回:字符串(String)。",
    "repeat": "repeat( )"
        + "\n"
        + "\n全名:TextExtra.repeat(string, num)"
        + "\n说明:字符重复输出。"
        + "\n参数:"
        + "\n  1.string:原始字符串。"
        + "\n  2.num:重复次数。"
        + "\n返回:字符串(String)。",
    "randomText": "randomText( )"
        + "\n"
        + "\n全名:TextExtra.randomText(num)"
        + "\n说明:字符随机输出。"
        + "\n参数:"
        + "\n  1.num:输出的随机字符个数。"
        + "\n返回:字符串(String)。",
    //--- Expression Selector ---//
    "表达式选择器": "//--- 表达式选择器 ---//"
        + "\n"
        + "\n表达式选择器函数主要用在文本表达式选择器上,进行字符串范围的函数化处理。",
    "direction": "direction( )"
        + "\n"
        + "\n全名:ExpressionSelectorExtra.direction(type, delay)"
        + "\n说明:表达式选择器的方向。"
        + "\n参数:"
        + "\n  1.type:字符偏移方向类型,未定义时默认为left。"
        + "\n  可选「left」「right」「inward」「outward」「random」。"
        + "\n  left类型从左往右选择,right类型从右往左选择。"
        + "\n  inward类型从内往外选择,outward类型从外往内选择,random类型随机选择。"
        + "\n  2.delay:字符间延迟时长。"
        + "\n返回:对象(Object)或者函数(Function)。",
    "bounceSelector": "bounceSelector( )"
        + "\n"
        + "\n全名:ExpressionSelectorExtra.bounceSelector(type, duration, freq, decay, startTime, delay)"
        + "\n说明:弹性表达式选择器。"
        + "\n参数:"
        + "\n  1.type:字符偏移方向类型,未定义时默认为left,所有模式详见Enhanced Expressions Library中ExpressionSelectorExtra的direction函数。"
        + "\n  2.duration:进场的持续时间,未定义时默认为0.2。"
        + "\n  3.freq:频率,即单位时间内完成周期性变化的次数,未定义时默认为3.0。"
        + "\n  4.decay:衰减,即弹性势能消散的速率,未定义时默认为5.0。"
        + "\n  5.startTime:选择器开始作用时间,未定义时默认为thisLayer.inPoint。"
        + "\n  6.delay:字符间延迟时长,未定义时默认为0.1。"
        + "\n返回:三维数组(Array)。",
    "bounceBackSelector": "bounceBackSelector( )"
        + "\n"
        + "\n全名:ExpressionSelectorExtra.bounceBackSelector(type, duration, freq, decay, startTime, delay)"
        + "\n说明:反弹表达式选择器。"
        + "\n参数:"
        + "\n  1.type:字符偏移方向类型,未定义时默认为left,所有模式详见Enhanced Expressions Library中ExpressionSelectorExtra的direction函数。"
        + "\n  2.duration:进场的持续时间,未定义时默认为0.3。"
        + "\n  3.freq:频率,即单位时间内完成周期性变化的次数,未定义时默认为3.0。"
        + "\n  4.decay:衰减,即弹性势能消散的速率,未定义时默认为5.0。"
        + "\n  5.startTime:选择器开始作用时间,未定义时默认为thisLayer.inPoint。"
        + "\n  6.delay:字符间延迟时长,未定义时默认为0.1。"
        + "\n返回:三维数组(Array)。",
    "influenceSelector": "influenceSelector( )"
        + "\n"
        + "\n全名:ExpressionSelectorExtra.influenceSelector(type, delay)"
        + "\n说明:影响表达式选择器,即受到曲线影响,需要给选择器的amout打关键帧控制。"
        + "\n参数:"
        + "\n  1.type:字符偏移方向类型,未定义时默认为left,所有模式详见Enhanced Expressions Library中ExpressionSelectorExtra的direction函数。"
        + "\n  2.delay:字符间延迟时长,未定义时默认为0.1。"
        + "\n返回:三维数组(Array)。",
    "easingSelector": "influenceSelector( )"
        + "\n"
        + "\n全名:easingSelector(type, mode, easingmode, duration, delay, startTime)"
        + "\n说明:缓动表达式选择器。"
        + "\n参数:"
        + "\n  1.type:字符偏移方向类型,未定义时默认为left,所有模式详见Enhanced Expressions Library中ExpressionSelectorExtra的direction函数。"
        + "\n  2.mode:动画模式,可选「in」「out」,未定义时默认为in。"
        + "\n  3.easingmode:缓动模式,所有模式详见Enhanced Expressions Library中Interpolation的setEasing函数。"
        + "\n  4.duration:动画的持续时间,未定义时默认为1.0。"
        + "\n  5.delay:字符间延迟时长,未定义时默认为0.05。"
        + "\n  6.startTime:选择器开始作用时间,未定义时,in模式默认为thisLayer.inPoint,out模式默认为thisLayer.outPoint - duration。"
        + "\n返回:三维数组(Array)。",
}