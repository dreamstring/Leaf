﻿var thisFolderPath = File($.fileName).path;//文件夹路径
var resourceFolderPath = thisFolderPath + "/Enhanced Expression";//资源文件夹路径
var toolName = File($.fileName).displayName;//表达式增强脚本名字
var libraryName = folderMatch(resourceFolderPath, /Enhanced Expression Library/g).name;//库名
var libraryFile = folderMatch(resourceFolderPath, /Enhanced Expression Library/g).file;//表达式增强库文件
var libraryPath = libraryFile.fsName;//表达式增强库路径
var listName = folderMatch(resourceFolderPath, /Enhanced Expression List/g).name;//列表名
var listFile = folderMatch(resourceFolderPath, /Enhanced Expression List/g).file;//表达式增强库列表文件
var groupIndex = 0;
$.evalFile(listFile);//在此文件中加载list

var script = {
    name: "Enhanced Expression Tool",
    "tool version": getVersion(toolName, "Enhanced Expression Tool"),
    "library version": getVersion(libraryName, "Enhanced Expression Library"),
    "list version": getVersion(listName, "Enhanced Expression List"),
    developer: "鹤梦离弦",
    developerURL: "https://space.bilibili.com/6885250",
    qq: "http://wpa.qq.com/msgrd?_v=3^&uin=1239245970^&site=qq^&menu=yes",
    qqGroup: "https://jq.qq.com/?_wv=1027^&k=9RJO2iYV",
    chineseEditDocs: "https://docs.qq.com/doc/DVmJvR0JoZ3puZVdP",
    chineseDocs: "https://docs.qq.com/doc/p/afe9c19f12644a0539ae1eadc3a40bff9f297741",
    englishEditDocs: "https://docs.qq.com/doc/DVlVWVmNGa0ROUWxV",
    englishDocs: "https://docs.qq.com/doc/p/e5ec0353216fbfd327153b45d0851d4935e17f20",
    github: "https://github.com/dreamstring/After-Effects-Enhanced-Expression",
};

// ---构建UI Panel 函数--- //
var panelGlobal = this;
var palette = (function () {

    //--- 构建UI ---//  
    var mainWindow = (panelGlobal instanceof Panel) ? panelGlobal : new Window("palette", undefined, undefined, { resizeable: true });
    if (!(panelGlobal instanceof Panel)) mainWindow.text = script.name;
    mainWindow.orientation = "row";
    mainWindow.spacing = 5;
    mainWindow.margins = 10;

    //--- 主面板 ---//
    var mainGroup = mainWindow.add("group", undefined, { name: "主面板" });
    mainGroup.preferredSize.width = 210;
    mainGroup.orientation = "column";
    mainGroup.spacing = 3;
    mainGroup.margins = 0;
    mainGroup.properties.resizeable = true;
    mainGroup.alignment = ["left", "fill"];

    //--- 表达式引擎切换面板 ---//
    var expressionEngineSwitchingGroup = mainGroup.add("group", undefined, { name: "expressionEngineSwitchingGroup" });
    expressionEngineSwitchingGroup.orientation = "row";
    expressionEngineSwitchingGroup.spacing = 10;
    expressionEngineSwitchingGroup.margins = 0;
    expressionEngineSwitchingGroup.alignment = ["center", "top"];

    var esButton = expressionEngineSwitchingGroup.add("radiobutton", undefined, undefined, { name: "esButton" });
    esButton.text = "旧版ExtendScript";

    var jsButton = expressionEngineSwitchingGroup.add("radiobutton", undefined, undefined, { name: "jsButton" });
    jsButton.text = "新版JavaScript";

    var helpButton = expressionEngineSwitchingGroup.add("customButton");
    helpButton.size = [22, 22];
    helpButton.text = "❓";

    var graphics = helpButton.graphics;
    var strokeWidth = 2;
    var strokePen = graphics.newPen(graphics.PenType.SOLID_COLOR, [0.44, 0.44, 0.44, 1], strokeWidth);
    var textPen = graphics.newPen(graphics.PenType.SOLID_COLOR, [0.54, 0.54, 0.54, 1], strokeWidth);
    var brush = graphics.newBrush(graphics.BrushType.SOLID_COLOR, [0.14, 0.14, 0.14, 1]);

    graphics.font = "Tahoma:12";

    helpButton.addEventListener("mouseover", function () {
        strokePen = graphics.newPen(graphics.PenType.SOLID_COLOR, [0.54, 0.54, 0.54, 1], strokeWidth);
        textPen = graphics.newPen(graphics.PenType.SOLID_COLOR, [0.09, 0.09, 0.09, 1], strokeWidth);
        brush = graphics.newBrush(graphics.BrushType.SOLID_COLOR, [0.54, 0.54, 0.54, 1]);
        this.notify("onDraw");
    });

    helpButton.addEventListener("mouseout", function () {
        strokePen = graphics.newPen(graphics.PenType.SOLID_COLOR, [0.44, 0.44, 0.44, 1], strokeWidth);
        textPen = graphics.newPen(graphics.PenType.SOLID_COLOR, [0.54, 0.54, 0.54, 1], strokeWidth);
        brush = graphics.newBrush(graphics.BrushType.SOLID_COLOR, [0.14, 0.14, 0.14, 1]);
        this.notify("onDraw");
    });

    helpButton.addEventListener("mousedown", function () {
        strokePen = graphics.newPen(graphics.PenType.SOLID_COLOR, [0.39, 0.39, 0.39, 1], strokeWidth);
        textPen = graphics.newPen(graphics.PenType.SOLID_COLOR, [0.09, 0.09, 0.09, 1], strokeWidth);
        brush = graphics.newBrush(graphics.BrushType.SOLID_COLOR, [0.39, 0.39, 0.39, 1]);
        this.notify("onDraw");
    });

    helpButton.addEventListener("mouseup", function () {
        strokePen = graphics.newPen(graphics.PenType.SOLID_COLOR, [0.44, 0.44, 0.44, 1], strokeWidth);
        textPen = graphics.newPen(graphics.PenType.SOLID_COLOR, [0.54, 0.54, 0.54, 1], strokeWidth);
        brush = graphics.newBrush(graphics.BrushType.SOLID_COLOR, [0.14, 0.14, 0.14, 1]);
        this.notify("onDraw");
    });

    var width = helpButton.size[0];
    var height = helpButton.size[1];
    var boundingWidth = graphics.measureString(helpButton.text, graphics.font, width);
    var ellipseWidth = width - strokeWidth * 2;
    var ellipseHeight = height - strokeWidth * 2;
    var stringWidth = (width - boundingWidth[0]) / 2;
    var stringHeight = (height - boundingWidth[1]) / 2;
    var text = helpButton.text;

    function customDraw() {
        graphics.ellipsePath(strokeWidth, strokeWidth, ellipseWidth, ellipseHeight);
        graphics.fillPath(brush);
        graphics.strokePath(strokePen);
        graphics.drawString(text, textPen, stringWidth, stringHeight, graphics.font);
    }

    helpButton.onDraw = customDraw;
    helpButton.notify("onDraw");

    //--- 错误显示面板 ---//
    var errorGroup = mainGroup.add("group", undefined, { name: "errorGroup" });
    errorGroup.alignment = ["fill", "fill"];
    errorGroup.orientation = "stack";

    var errorPanel = errorGroup.add("edittext", [0, 0, 260, 220], "", { multiline: true, scrolling: false });
    errorPanel.orientation = "column";
    errorPanel.alignment = ["fill", "fill"];
    errorPanel.margins = 0;
    errorPanel.text = "";
    errorPanel.visible = true;

    var scrollingPanel = errorGroup.add("edittext", [0, 0, 260, 220], "", { multiline: true, scrolling: true });
    scrollingPanel.orientation = "column";
    scrollingPanel.alignment = ["fill", "fill"];
    scrollingPanel.margins = 1;
    scrollingPanel.text = "";
    scrollingPanel.visible = false;

    //--- 按钮组 ---//
    var buttonsGroup = mainGroup.add("group", undefined, { name: "buttonsGroup" });
    buttonsGroup.margins = 1;
    buttonsGroup.spacing = 6;
    buttonsGroup.alignment = ["fill", "bottom"];

    var refreshButton = buttonsGroup.add("button", undefined, undefined, { name: "refreshButton" });
    refreshButton.text = "刷新";
    refreshButton.alignment = ["fill", "fill"];

    var injectButton = buttonsGroup.add("button", undefined, undefined, { name: "injectButton" });
    injectButton.text = "注入";
    injectButton.alignment = ["fill", "fill"];

    var expandButton = buttonsGroup.add("button", [0, 0, 27, 27], undefined, { name: "expandButton" });
    expandButton.text = "◁";
    expandButton.alignment = ["right", "fill"];

    //--- 增强表达式列表 ---//
    var listGroup;
    mainWindow.addListGroup = function () {
        listGroup = mainWindow.add("group", undefined, { name: "listGroup" });
        listGroup.orientation = "column";
        listGroup.spacing = 5;
        listGroup.margins = 0;
        listGroup.alignment = ["fill", "fill"];
        listGroup.alignChildren = ["fill", "fill"];

        var treeGroup = listGroup.add("group", undefined, { name: "treeGroup" });
        treeGroup.orientation = "column";
        treeGroup.spacing = 0;
        treeGroup.margins = 0;
        treeGroup.alignment = ["fill", "fill"];
        treeGroup.alignChildren = ["fill", "fill"];
        var treeView = treeGroup.add("treeview", [0, 0, 160, 260], undefined, { name: "treeview" });

        var searchGroup = listGroup.add("group", undefined, { name: "searchGroup" });
        searchGroup.orientation = "column";
        searchGroup.spacing = 0;
        searchGroup.margins = 0;
        searchGroup.alignment = ["fill", "bottom"];
        var inputTips = "请输入搜索关键字";
        var searchText = searchGroup.add("edittext", [0, 0, 160, 30], inputTips, { multiline: false, scrolling: false });
        searchText.alignment = ["fill", "fill"];

        searchText.onActivate = function () {
            if (this.textCache === inputTips) return;
            if (this.text === inputTips) this.text = "";
        };

        searchText.addEventListener("blur", function () {
            this.textCache = this.text;
            if (this.text === "") this.text = inputTips;
        });

        //添加node和item
        for (key in expressionList) {
            var treeElement = key.toString().slice(-4);
            var elementFullName = key.toString();
            var elementName = elementFullName.slice(0, elementFullName.length - 5);
            if (treeElement == "Node") node = treeView.add("node", elementName);
            if (treeElement == "Item") item = node.add("item", elementName);
        }

        searchText.onChanging = function () {
            var textTemp = searchText.text == inputTips ? "" : searchText.text.toLowerCase();
            treeView.removeAll();

            for (key in expressionList) {
                var description = expressionList[key];
                var helpTip = helptipList[key.toString().slice(0, key.length - 5)];
                if (textTemp == "") {
                    var treeElement = key.toString().slice(-4);
                    var elementFullName = key.toString();
                    var elementName = elementFullName.slice(0, elementFullName.length - 5);
                    if (treeElement == "Node") node = treeView.add("node", elementName);
                    if (treeElement == "Item") item = node.add("item", elementName);
                }
                else {
                    itemName = key.toString();
                    if (key.toLowerCase().indexOf(textTemp) >= 0) {
                        item = treeView.add("item", itemName.slice(0, itemName.length - 5));
                        continue;
                    }
                    if (description.toLowerCase().indexOf(textTemp) >= 0) {
                        item = treeView.add("item", itemName.slice(0, itemName.length - 5));
                        continue;
                    }
                    if (helpTip.toLowerCase().indexOf(textTemp) >= 0) {
                        item = treeView.add("item", itemName.slice(0, itemName.length - 5));
                        continue;
                    }
                }
            }
            if (scriptList.items.length > 0) scriptList.selection = 0;
        }

        //树的双击事件
        treeView.onDoubleClick = function () {
            selectionName = treeView.selection.toString();
            expressionStatement = expressionList[selectionName + "_Item"];
            if (expressionStatement != undefined) return addExpression(expressionStatement);
            expressionStatement = expressionList[selectionName + "_Node"];
            if (expressionStatement != undefined) return addExpression(expressionStatement);
        }

        //树的单击事件
        treeView.onChange = treeView.onChanging = function () {
            selectionName = treeView.selection.toString();
            finalError = helptipList[selectionName];
            errorPanel.text = finalError;
        }

        treeView.addEventListener("click", function (e) {
            if (e.button == 2 && treeView.selection) {
                selectionName = treeView.selection.toString();
                expressionStatement = expressionList[selectionName + "_Item"];
                if (expressionStatement != undefined) {
                    expressionArray = expressionStatement.split(".");
                    expressionSugar = expressionStatement.slice(expressionArray[0].length + 1);
                    if (expressionSugar == "") expressionSugar = expressionStatement;
                    addExpression(expressionSugar);
                    return;
                }
                expressionStatement = expressionList[selectionName + "_Node"];
                if (expressionStatement != undefined) {
                    expressionArray = expressionStatement.split(".");
                    expressionSugar = expressionStatement.slice(expressionArray[0].length + 1);
                    if (expressionSugar == "") expressionSugar = expressionStatement;
                    addExpression(expressionSugar);
                    return;
                }
            }
        });

        groupIndex = 1;
    }

    mainWindow.addListGroup();

    //--- 表达式存储列表 ---//
    var saveGroup;
    mainWindow.addSaveGroup = function () {
        saveGroup = mainWindow.add("group", undefined, { name: "saveGroup" });
        saveGroup.orientation = "column";
        saveGroup.spacing = 5;
        saveGroup.margins = 0;
        saveGroup.alignment = ["fill", "fill"];
        saveGroup.alignChildren = ["fill", "fill"];

        var saveTreeGroup = saveGroup.add("group", undefined, { name: "saveTreeGroup" });
        saveTreeGroup.orientation = "column";
        saveTreeGroup.spacing = 0;
        saveTreeGroup.margins = 0;
        saveTreeGroup.alignment = ["fill", "fill"];
        saveTreeGroup.alignChildren = ["fill", "fill"];
        var saveTreeView = saveTreeGroup.add("treeview", [0, 0, 160, 260], undefined, { name: "saveTreeView" });

        var searchGroup = saveGroup.add("group", undefined, { name: "searchGroup" });
        searchGroup.orientation = "column";
        searchGroup.spacing = 0;
        searchGroup.margins = 0;
        searchGroup.alignment = ["fill", "bottom"];
        var inputTips = "请输入搜索关键字";
        var searchText = searchGroup.add("edittext", [0, 0, 160, 30], inputTips, { multiline: false, scrolling: false });
        searchText.alignment = ["fill", "fill"];

        searchText.onActivate = function () {
            if (this.textCache === inputTips) return;
            if (this.text === inputTips) this.text = "";
        };

        searchText.addEventListener("blur", function () {
            this.textCache = this.text;
            if (this.text === "") this.text = inputTips;
        });

        groupIndex = 2;
    }

    //--- 主界面按钮事件 ---//
    function setEngineButton() {
        return function () {
            if (app.project.expressionEngine == "javascript-1.0") jsButton.value = true;
            else esButton.value = true;
        }
    }
    (setEngineButton())();

    esButton.onClick = jsButton.onClick = clickEvent;
    function clickEvent() {
        esButton.value = !jsButton.value;
        jsButton.value = !esButton.value;
        if (esButton.value) {
            app.project.expressionEngine = "extendscript";
        }
        if (jsButton.value) {
            app.project.expressionEngine = "javascript-1.0";
        }
        onlyOpenActiveComp();
        libraryFile.open("a", undefined, undefined);
        libraryFile.write("");
        libraryFile.close();
        if (app.project.expressionEngine == "javascript-1.0") {
            expressionEngineName = "JavaScript";
        }
        if (app.project.expressionEngine == "extendscript") {
            expressionEngineName = "旧版 ExtendScript";
        }
        finalError = "表达式引擎已成功切换至" + "\n" + expressionEngineName;
        errorPanel.text = finalError;
    }

    expandButton.onClick = function () {
        if (expandButton.text == "◁") {
            if (groupIndex == 1) mainWindow.remove(listGroup);
            if (groupIndex == 2) mainWindow.remove(saveGroup);
            mainWindow.layout.layout(1);
            mainWindow.layout.resize();
            groupIndex = 0;
            return expandButton.text = "▶";
        }
        if (expandButton.text == "▶") {
            var tempSize = mainWindow.size;
            mainWindow.addListGroup();
            mainWindow.layout.layout(1);
            mainWindow.size = tempSize;
            mainWindow.layout.resize();
            return expandButton.text = "◁";
        }
    }

    expandButton.addEventListener("click", function (e) {
        if (e.button == 2) {
            if (!groupIndex) {
                var tempSize = mainWindow.size;
                mainWindow.addSaveGroup();
                mainWindow.layout.layout(1);
                mainWindow.size = tempSize;
                mainWindow.layout.resize();
                return expandButton.text = "◁";
            }
            if (groupIndex == 1) {
                var tempSize = mainWindow.size;
                mainWindow.remove(listGroup);
                mainWindow.addSaveGroup();
                mainWindow.layout.layout(1);
                mainWindow.size = tempSize;
                mainWindow.layout.resize();
                return;
            }
            if (groupIndex == 2) {
                var tempSize = mainWindow.size;
                mainWindow.remove(saveGroup);
                mainWindow.addListGroup();
                mainWindow.layout.layout(1);
                mainWindow.size = tempSize;
                mainWindow.layout.resize();
                return;
            }
        }
    })

    if (!(panelGlobal instanceof Panel)) {
        expandButton.text = "◁";
        expandButton.onClick();
    }

    mainWindow.addEventListener("mouseover", setEngineButton());

    var getWindow = new SingletonWindow("palette", "帮助面板");

    function SingletonWindow(type, name) {
        var container = null;
        return function () {
            if (container === null || container.visible === false) container = new Window(type, name);
            return container;
        };
    }
    var identifierstxt = createIdentifiersList("Identifiers List " + script["list version"], resourceFolderPath);
    var qq1_imgString = "%C2%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%1E%00%00%00%1E%08%06%00%00%00%3B0%C2%AE%C2%A2%00%00%00%09pHYs%00%00%0B%12%00%00%0B%12%01%C3%92%C3%9D~%C3%BC%00%00%01%3CIDATH%C2%89%C3%AD%C2%96%3F%C2%92E%40%10%C3%86%7B%C2%B7%5E%11%C2%89DD%24DD%C3%8E%C3%A1%1A%C3%AE%C3%A2%06%C3%AE%20r%01%17%C2%909%00%11%C2%91HD%C2%B2%5B%3DU%C2%A3T%C2%BDW%C2%BA%C3%9B%C2%BE%7D%C2%B6v%C3%B7K%C3%BC%C3%BB%C2%BA%7FfL%C3%ABy%C3%8B%C3%B3%C3%BC%03.%C3%90%C3%BB%15P%C3%94M%C2%9F%14E%C3%B1%12%60%C2%96e%C3%AAx%C3%99%C2%88%C3%BF%1E%C3%B8%C3%86%C3%B0l%C2%B2%2C%0B%C2%92%24%01%C3%8F%C3%B3%C3%800%0Cu%7B%5DW%C3%A8%C3%BB%1E%C2%9A%C2%A6%C2%81y%C2%9E%C2%9F%0F%C2%B6m%1B%C3%924%C3%9D%C2%80Zx%1D%04%C2%81z%C2%99%C2%AA%C2%AA%60%C2%9A%26V%3E%C3%96Tc%C3%B2GP%C2%A9G%0C%0E%C3%83%C2%90%C2%95%10%3D%C3%A8%7D%1A%C3%98%C3%B7%7DV2%C2%89%C2%97%05v%1C%C2%87%0D%C3%A6zI0w%C3%AA%C2%A41%24%18KH*N%C3%8C%C3%8F%04c%C3%ADb%C2%8DJ%C2%851%18%7B%1A%1C%C3%87%C2%B1%18%C3%8A%C2%8D%25G%7CV%C3%94%C3%AA%C3%BE60%C3%B5%C2%9D%0F%C3%BF%C3%95%C3%A38%C2%AA%C2%A3%C2%A4%C2%8E%C3%B7q%C2%A7%C3%81u%5D%C3%83%C2%B2%2C%C2%AA%23EQ%C3%84%C2%82%C2%B6m%C2%AB%3A%C2%95i%C2%9A%C2%87%C2%BE%C3%83%C2%A9%C3%96m%C2%8EJ%C2%B2%C2%97%C3%B6R-%C2%92%C2%ACc%5C%C2%9D%C2%92%C2%92B%2F%C2%A7%1A%C3%88~%C3%9Cu%C2%9D%C3%AA%C2%B5%C3%BB%C2%85%C2%86%3Dw%18%06u%C3%AE%C2%BA%C3%AE%C3%9D3%C2%8C%C3%B92%18%13%C2%95eI%26%C2%92%C3%AA%7F%C2%97%C3%B92m%C3%9FX%C3%AF%C3%B0%7F%C3%B7%C2%88%01%C3%A0%13%C2%83eO%C2%99%07%12%C2%BE%C2%A4%00%00%00%00IEND%C2%AEB%60%C2%82";
    var qq2_imgString = "%C2%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%1E%00%00%00%1E%08%06%00%00%00%3B0%C2%AE%C2%A2%00%00%00%09pHYs%00%00%0B%12%00%00%0B%12%01%C3%92%C3%9D~%C3%BC%00%00%01%20IDATH%C2%89%C3%AD%C2%96%3D%0ED%60%10%C2%86g7%1B*%C2%95%C2%8A%C2%8A%03%C3%A8%5C%C3%80%05TN%C3%A58%C3%8E%C2%A1%C2%A2%C2%A2%C2%A1%C2%A2R%C2%A9hl%C3%A6Kl%24%C2%BB13%C2%96%C3%98d%C2%BD%C2%8D%C2%BFw%C3%A6a%7Cc%C3%9C%C3%A28%C2%9E%C3%A0%04%C3%9D%C3%8F%C2%80%C3%82%05%C3%BE%0B%C3%B0Cb%C3%AE%C3%BB%1E%C3%924%C2%85%C2%BA%C2%AEa%1CGuN%C3%934p%1C%07%7C%C3%9F%07%C3%830%C3%B6%07w%5D%07I%C2%92%C2%BC%C2%80%C2%B3%C3%B0%C2%B8%2CKu3a%18%C2%82i%C2%9A%C2%AC%7C%C2%ACRc%C3%B2OP%C2%A9G%0C.%C2%8A%C2%82%C2%95%10%3D%C3%A8%C3%9D%0D%5CU%15%2B%C2%99%C3%84%C3%8B%02%C2%B7m%C3%8B%06s%C2%BD%24%C2%98%5B%3Ai%0C%09%C3%86%16%C2%92%C2%8A%13%C3%B3%C2%9B%60%C3%AC%5D%C3%ACQ%C2%A90%06c7%C2%83%C2%B3%2C%13C%C2%B9%C2%B1%C3%A4%13o%15%C2%B5%C2%BA%0F%03S%C3%AFy%C3%B5%5BmY%C2%96%C3%9AJ%C3%BAx%19%C2%B7%19%1C%04%01%C3%A8%C2%BA%C2%AE%26R%C2%9E%C3%A7%2C%C2%A8%C3%A7yjR%0D%C3%83%C2%B0%C3%AA%5B-%C3%B5%3C%C3%A6%C2%A8%24K%C3%8D%5EjD%C2%92%7D%C2%8C%C2%ABS%C3%92R%C3%A8%C3%A5t%039%C2%8F%5D%C3%97U%C2%B3v%C2%B9%C3%90p%C3%A6%C3%9A%C2%B6%C2%AD%C3%B6%C2%9B%C2%A6y%C2%BB%C2%861_%C2%831Q%14Ed%22%C2%A9%C2%AE%C3%BF%C3%AA%0B%7C%C2%8C%00%C3%A0%09a%C2%A2%C2%9Bj%40%C2%86%7D%60%00%00%00%00IEND%C2%AEB%60%C2%82";
    var qq3_imgString = "%C3%BF%C3%98%C3%BF%C3%A1%00%18Exif%00%00II*%00%08%00%00%00%00%00%00%00%00%00%00%00%C3%BF%C3%AC%00%11Ducky%00%01%00%04%00%00%00%3C%00%00%C3%BF%C3%A1%03%2Fhttp%3A%2F%2Fns.adobe.com%2Fxap%2F1.0%2F%00%3C%3Fxpacket%20begin%3D%22%C3%AF%C2%BB%C2%BF%22%20id%3D%22W5M0MpCehiHzreSzNTczkc9d%22%3F%3E%20%3Cx%3Axmpmeta%20xmlns%3Ax%3D%22adobe%3Ans%3Ameta%2F%22%20x%3Axmptk%3D%22Adobe%20XMP%20Core%205.6-c145%2079.163499%2C%202018%2F08%2F13-16%3A40%3A22%20%20%20%20%20%20%20%20%22%3E%20%3Crdf%3ARDF%20xmlns%3Ardf%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%22%3E%20%3Crdf%3ADescription%20rdf%3Aabout%3D%22%22%20xmlns%3Axmp%3D%22http%3A%2F%2Fns.adobe.com%2Fxap%2F1.0%2F%22%20xmlns%3AxmpMM%3D%22http%3A%2F%2Fns.adobe.com%2Fxap%2F1.0%2Fmm%2F%22%20xmlns%3AstRef%3D%22http%3A%2F%2Fns.adobe.com%2Fxap%2F1.0%2FsType%2FResourceRef%23%22%20xmp%3ACreatorTool%3D%22Adobe%20Photoshop%20CC%202019%20(Windows)%22%20xmpMM%3AInstanceID%3D%22xmp.iid%3A2DD251BEE33011ECB2CEDEBB47F66E69%22%20xmpMM%3ADocumentID%3D%22xmp.did%3A2DD251BFE33011ECB2CEDEBB47F66E69%22%3E%20%3CxmpMM%3ADerivedFrom%20stRef%3AinstanceID%3D%22xmp.iid%3A2DD251BCE33011ECB2CEDEBB47F66E69%22%20stRef%3AdocumentID%3D%22xmp.did%3A2DD251BDE33011ECB2CEDEBB47F66E69%22%2F%3E%20%3C%2Frdf%3ADescription%3E%20%3C%2Frdf%3ARDF%3E%20%3C%2Fx%3Axmpmeta%3E%20%3C%3Fxpacket%20end%3D%22r%22%3F%3E%C3%BF%C3%AE%00%0EAdobe%00d%C3%80%00%00%00%01%C3%BF%C3%9B%00%C2%84%00%06%04%04%04%05%04%06%05%05%06%09%06%05%06%09%0B%08%06%06%08%0B%0C%0A%0A%0B%0A%0A%0C%10%0C%0C%0C%0C%0C%0C%10%0C%0E%0F%10%0F%0E%0C%13%13%14%14%13%13%1C%1B%1B%1B%1C%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%01%07%07%07%0D%0C%0D%18%10%10%18%1A%15%11%15%1A%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%C3%BF%C3%80%00%11%08%00%1E%00%1E%03%01%11%00%02%11%01%03%11%01%C3%BF%C3%84%00s%00%00%03%01%01%00%00%00%00%00%00%00%00%00%00%00%00%00%05%07%04%03%01%00%03%01%01%01%00%00%00%00%00%00%00%00%00%00%00%00%02%06%04%03%05%10%00%02%01%04%01%01%07%05%00%00%00%00%00%00%00%00%01%02%04%00%11%03%05%12!1AQ%C2%81%22%13%06q%C2%A1B%14%07%11%00%01%04%02%02%03%01%00%00%00%00%00%00%00%00%00%00%01%11%02%03!%12Q%041a%052%C3%BF%C3%9A%00%0C%03%01%00%02%11%03%11%00%3F%00aW%C3%A4%40%C3%87W%C3%B1%C3%9D%C3%96%C3%91%19%C3%A0%C3%85l%C3%98%C3%90%C3%99%C2%9E%C3%AA%C2%8B%7F%0ENT%13%5C-%C3%AC%C3%97%5E%24%C2%ACv%C2%AB%C2%AF9%C3%BEP%C3%8F%C2%B0%C3%96O%C3%97H%C3%BDy%C2%B8%5B%06%5B%5C%2B%5B%C2%A8%C3%B1%04%5C%11%C3%B4%C2%AE%C2%95%C3%9B%19%C2%A3%C3%85%5D%04%C2%B2%C2%B9AZH%C3%86jq%00%02M%C2%87Rh%02%C3%9F%C2%A2%C2%82%C2%B04%C3%B0%C3%A2%01%C3%84%C3%A2%C3%84%C2%A1%C3%85%C2%AD%C3%AB%22%C3%AE%7C%C3%98%C2%9A%C2%92%C3%ACY%C2%BD%C2%8B%2Fe%3D%10%C3%92%08%C2%9E%C2%84%1F%C3%92%C2%A0%0C%C3%BA4%C2%94%16%C3%B9%22e%04%C2%B0%17%C2%B2%3F%C2%A5%C2%BE%C3%BCkg%C3%8B%C2%B1%C2%ACnP%C3%89%C3%B4kz%C3%9F%C2%82_T'%C2%86v%C2%83%20F%C2%9B%1EIOp%60%C3%88%C2%99%0E3%C3%93%C2%97%06%06%C3%9Ev%C2%A5%C2%B2%3BES%C2%94%1A%12%C3%96H%C2%BC%16%C3%883%C2%BD%C3%BDv%09r%02%C3%A09Q%5D%C2%97%C2%98e%1C%C2%BB%C2%B9v%1A%C2%92%C2%B2%C2%B6%C2%9A%C3%852%C3%85%3C%26%C3%B1E%5C%0A%3Es%C2%B3hZ%1C%C2%A0a%5C%C3%98%C3%A5%C2%86%C3%80%C3%8CX%0E%3C%C3%94%C3%B1%60%3F.%C2%B5%C2%AB%C3%A7%C3%95%C2%BD%C2%89%C2%96l%C2%99%C2%BB%C2%B6%C3%AB_%C2%87%7C%12J%C2%A5'%C3%82%C2%80%0A%00(%00%C2%A0%0F%C3%BF%C3%99";
    var qqGroup1_imgString = "%C2%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%1E%00%00%00%1E%08%06%00%00%00%3B0%C2%AE%C2%A2%00%00%00%09pHYs%00%00%0B%12%00%00%0B%12%01%C3%92%C3%9D~%C3%BC%00%00%01%C2%B1IDATH%C2%89%C3%AD%C2%96%C2%B1%C2%8A%C3%82%40%10%C2%86%C3%A7%0E%C2%89%C2%95(%C2%98F%2Bm%C2%92*%C2%95%C2%A9%C2%AC%C2%B4%C2%B2%C3%8B%03%C3%B8%02%C2%BE%C2%8Bo%C3%A0%0B%C3%B8%0EV%C3%9Ahe!%C2%A4Hk%15%1B%05A%10%C2%92%C3%A6%C2%8E%7F%C2%B8%0D%C2%A7%C2%B7%C2%BBY%15M%C3%A1%C3%BD%20%09C%C2%92o%C3%A6%C3%9F%C3%99q%3F%C3%86%C3%A3%C3%B1%17%15%C2%A0%C3%8F%22%C2%A0PI%C3%9CL%26%C2%93%C2%97%00G%C2%A3%11_%0B%C2%AB%C3%B8%C3%BD%C3%80%25%C2%83g25%C2%9BM%C2%BEM%C2%92%C2%84%0E%C2%87%C3%83%C3%B3%C3%81%C2%BE%C3%AF%C2%93%C3%A7ydYV%16%C3%9B%C3%ADv%C2%B4%5C.%C3%AFN%20%17%C3%9C%C3%ADv%19z%C2%ADF%C2%A3A%C2%AE%C3%ABR%18%C2%86%C3%94j%C2%B5%C2%A8%5C.S%1C%C3%87%C3%BC%7B%18%5C%C2%A9T%C2%A4Ph%C2%B1XP%C2%BD%5E%C2%A7%C3%A1p%C2%98%C3%85%3A%C2%9D%0E%3B0%C2%9F%C3%8Fs%C2%9D%C3%906%17*%C2%92i%C2%BB%C3%9D2T%C2%96%14%C3%A2%C2%83%C3%81%C3%A0bYn%06%3B%C2%8E%23%C2%8DGQ%C2%A4t%C2%82~%C2%9CR%25%C2%9D%0B%C3%86%C2%8B%C3%B8%C3%80%C2%B5%C3%924%C2%A5j%C2%B5%C2%AA%C3%BD(%C3%94n%C2%B7%C3%AF%03%C2%AB%C2%ACB3%C3%A9%C2%AA%15B%C3%B3%C2%89%C3%ADg%0CF%C2%A5%C3%98B2%1D%C2%8FG%C2%A9%132%C3%9D%0C%C2%86%C3%8D%C2%B2%C2%8A%C3%91%C2%A9%C2%B5Z%C3%8D%08J%C2%9A%1EQ%C2%82U%C2%99n6%1B%C3%9E2%C2%A6%C3%92mG)%18%23%C3%B1t%3A%C3%BD%C2%89%C2%9F%C3%8Fgch%5E%11%C3%92%012%C2%9B%C3%8D%C3%B8%1A%04%017%C3%89%23%C3%82D3%06%0B%5D%C2%AF3%C2%AC%C2%9BN%C2%A7%C3%9C%03y%C2%96%C3%831%3C%C2%AB%C2%92%16%C2%8C)%C3%B4%5B%C2%BD%5E%C2%8F%1B%C3%8Ct%1E%23q%C3%AC%7B%C2%99%C2%B4%C3%A0%C3%95jE%C2%B6ms%C2%A5%C3%BB%C3%BD%C2%9E%C2%81%00%C3%B7%C3%BB%C3%BD%5C(%C3%9E%C3%81%C2%BB%C2%AA%24%C2%B5%60%0C%0B%C2%99%C3%96%C3%AB%C3%B5E%C3%93%20)T%06%C2%87%C3%84%C2%9A%C2%A2A%11W%C3%A9%C2%A6%C2%83%C2%80%C2%90%C3%AA%C3%AF%C3%8Ft%09%C3%A8%C3%BF%C2%B0%C3%B7%16%C3%A0%C2%AC%C2%B9%C3%84%09%C3%BFU*%C2%A6b%22%C3%BA%06%00%C2%B7%C2%8FpOE%C3%A8!%00%00%00%00IEND%C2%AEB%60%C2%82";
    var qqGroup2_imgString = "%C2%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%1E%00%00%00%1E%08%06%00%00%00%3B0%C2%AE%C2%A2%00%00%00%09pHYs%00%00%0B%12%00%00%0B%12%01%C3%92%C3%9D~%C3%BC%00%00%01%C2%98IDATH%C2%89%C3%AD%C2%96%C2%BD%C2%8A%C3%82P%10%C2%85g%C2%97E!%10%10bc*%C3%9B%14B%C2%8AT%C2%B1I%C2%AA%C2%BC%C2%83%C2%8F%C3%A4%C2%83%C3%B8%00%C3%A9%C2%ACb%C2%95*%C2%A9%C2%AC%C2%B41Ul%14%14%C2%AB%C2%A4%C3%99%C3%A5%5C6%C2%B2%C2%BA%C3%B7%2F%C2%8A%08%C2%BB%1E%08%C2%81!7%C3%9F%C3%8C%C2%B9s'y%C2%9BN%C2%A7%C2%9F%C3%B4%04%C2%BD%3F%03J%2F%C3%B0%C2%BF%00%7F%C2%B4y%C2%B8%2CKv%C3%AFv%C2%BBdY%C3%96%C3%A3%C3%81Y%C2%96%C3%91r%C2%B9%C2%A4%C2%BA%C2%AE%C3%8F%C2%B1%C3%81%60%40%C3%A3%C3%B1%C3%B8%C3%A6%04%C2%94%C3%A04M%19%C3%B4Z%C3%9B%C3%AD%C2%96V%C2%AB%15%C2%8DF%23*%C2%8A%C2%82%C2%AA%C2%AA%22%C3%9B%C2%B6%C3%99u7%C3%B8t%3Aq%C2%A1P%10%04%C2%B4%C3%9F%C3%AFi6%C2%9B%C2%9Dcy%C2%9E3%07%C3%820T%3A!m.T%C3%84%C3%93p8dP%5ER%C2%88%C3%8F%C3%A7%C3%B3%C2%8Bmi%0D%5E%C2%AF%C3%97%C3%9C%C2%B8%C3%A38B'%C3%A8%C3%9B)Q%C3%92J0%16%C3%A2%05%C3%97%C3%AAt%3At%3C%1E%C2%A5%2F%C2%856%C2%9B%C3%8Dm%60%C2%91Uh%26Y%C2%B5%C2%8D%C3%90%7C%C3%8D%C3%B1%C3%93%06%C2%A3R%1C!%C2%9Ez%C2%BD%1E%C3%97%09%C2%9EZ%C2%83a3%C2%AFbt%C3%AA%C3%A1p%C3%90%C2%82%C2%92%C2%A4G%C2%84%60Q%C2%A6%C2%AE%C3%AB%C2%B2%23%C2%A3%2B%C3%99q%C3%A4%C2%821%12M%C3%93%C3%BC%157%0CC%1B%C2%AA*%C2%82%3B%40%C2%A2(b%C3%B78%C2%8EY%C2%93%C3%9C%23L4mp%C2%A3%C3%AB%7D%C2%86u%C2%93%C3%89%C2%84%C3%B5%C2%80%C3%8Ar8%C2%86gE%C2%92%C2%821%C2%85~j%C2%B1X%C2%B0%06%C3%93%C2%9D%C3%87H%1C%C3%A7%C2%9E')%C3%98%C3%B7%7D%C3%9A%C3%ADv%C2%AC%C3%92~%C2%BF%C3%8F%C2%80%00'I%C2%A2%C2%84b%0D%C3%96%C2%8A%C2%92%C2%94%C2%821%2Cx%C3%B2%3C%C3%AF%C2%A2i%C2%90%14*%C2%83C%C3%8D%C2%9E%C2%A2A%11%17%C2%A9%C3%95%C2%8F%40%23%C3%91%C3%A7Ow%0B%C3%A8%C3%B5%C2%97%C3%B9%02%C3%BF%3D0%11%7D%01%C3%91%0E%C2%BB%C2%A3%C3%96%0BP~%00%00%00%00IEND%C2%AEB%60%C2%82";
    var qqGroup3_imgString = "%C3%BF%C3%98%C3%BF%C3%A1%00%18Exif%00%00II*%00%08%00%00%00%00%00%00%00%00%00%00%00%C3%BF%C3%AC%00%11Ducky%00%01%00%04%00%00%00%3C%00%00%C3%BF%C3%A1%03%2Fhttp%3A%2F%2Fns.adobe.com%2Fxap%2F1.0%2F%00%3C%3Fxpacket%20begin%3D%22%C3%AF%C2%BB%C2%BF%22%20id%3D%22W5M0MpCehiHzreSzNTczkc9d%22%3F%3E%20%3Cx%3Axmpmeta%20xmlns%3Ax%3D%22adobe%3Ans%3Ameta%2F%22%20x%3Axmptk%3D%22Adobe%20XMP%20Core%205.6-c145%2079.163499%2C%202018%2F08%2F13-16%3A40%3A22%20%20%20%20%20%20%20%20%22%3E%20%3Crdf%3ARDF%20xmlns%3Ardf%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%22%3E%20%3Crdf%3ADescription%20rdf%3Aabout%3D%22%22%20xmlns%3Axmp%3D%22http%3A%2F%2Fns.adobe.com%2Fxap%2F1.0%2F%22%20xmlns%3AxmpMM%3D%22http%3A%2F%2Fns.adobe.com%2Fxap%2F1.0%2Fmm%2F%22%20xmlns%3AstRef%3D%22http%3A%2F%2Fns.adobe.com%2Fxap%2F1.0%2FsType%2FResourceRef%23%22%20xmp%3ACreatorTool%3D%22Adobe%20Photoshop%20CC%202019%20(Windows)%22%20xmpMM%3AInstanceID%3D%22xmp.iid%3A3C451436E33011EC8E4A8EF7D5455109%22%20xmpMM%3ADocumentID%3D%22xmp.did%3A3C451437E33011EC8E4A8EF7D5455109%22%3E%20%3CxmpMM%3ADerivedFrom%20stRef%3AinstanceID%3D%22xmp.iid%3A3C451434E33011EC8E4A8EF7D5455109%22%20stRef%3AdocumentID%3D%22xmp.did%3A3C451435E33011EC8E4A8EF7D5455109%22%2F%3E%20%3C%2Frdf%3ADescription%3E%20%3C%2Frdf%3ARDF%3E%20%3C%2Fx%3Axmpmeta%3E%20%3C%3Fxpacket%20end%3D%22r%22%3F%3E%C3%BF%C3%AE%00%0EAdobe%00d%C3%80%00%00%00%01%C3%BF%C3%9B%00%C2%84%00%06%04%04%04%05%04%06%05%05%06%09%06%05%06%09%0B%08%06%06%08%0B%0C%0A%0A%0B%0A%0A%0C%10%0C%0C%0C%0C%0C%0C%10%0C%0E%0F%10%0F%0E%0C%13%13%14%14%13%13%1C%1B%1B%1B%1C%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%01%07%07%07%0D%0C%0D%18%10%10%18%1A%15%11%15%1A%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%C3%BF%C3%80%00%11%08%00%1E%00%1E%03%01%11%00%02%11%01%03%11%01%C3%BF%C3%84%00u%00%00%03%01%01%00%00%00%00%00%00%00%00%00%00%00%00%00%05%07%04%03%01%00%03%01%01%01%00%00%00%00%00%00%00%00%00%00%00%00%03%06%05%02%04%10%00%02%01%03%02%05%04%03%00%00%00%00%00%00%00%00%01%02%03%00%11%04%12%05!1%13%14%06Qa%C2%81%22A%C2%A1%23%11%00%02%02%02%02%01%04%03%00%00%00%00%00%00%00%00%00%01%11%02%03%04!%12%C3%B0Qaq%221A%13%C3%BF%C3%9A%00%0C%03%01%00%02%11%03%11%00%3F%00aW%C3%A4A%C2%ADv%7D%C3%99%C2%B1%7B%C2%B5%C3%83%C2%98%C3%A3%5BWXF%C3%9Am%C3%AB%7Br%C3%B7%C2%A5%C2%BC%C3%B4%C3%AD%C3%96T%C2%8CXo%13%0E%0C%C2%94%C3%81a%40%0C%7C%7Bl%3B%C2%9E%C3%B3%C2%8B%C2%87bcw%06k~%23%5E-%C3%BA%C2%A4l%C3%A5%C3%BEx%C3%9D%C2%87k%C3%A2%C3%AFt%C2%8B%06Z%09%1E%0C%25%C3%BA%C3%86%C3%A0%C2%BC%C2%AA%C2%BF_%C3%A5%18%03H%23%C2%95%C3%99%C2%97%C3%A2%C3%B51G%13o%24%C2%A2%C2%BA%C2%98%C2%A8%C2%B3%C3%89%7Ccn%C3%8D%C3%99%C3%A6H1c%C2%8F%26%24-%C2%8C%C3%B1%C2%A0R%0A%C3%B1%C3%93%C3%B5%1C%C2%8F%2BW%C2%A3Wn%C3%94%C2%BA%C2%96%C3%A1%C3%BEDl%C3%ABV%C3%94p%C2%B9%C3%BD%12%1A%C2%A6'%C2%86%1B%0E%C3%AB6%C3%99%C2%BAA%C2%93%1C%C2%86%24%C3%94%C2%AB%3B*%C2%86%26%22%C3%80%C2%B8%00%C3%BB%0AN%C3%86%15%C2%92%C2%8D5%C3%B1%C3%B2%3B%06WK%C2%A7%C3%A4%14%18%7C%C3%9Bb%C2%93x%0F%1EV%C2%88%24%C2%84%2C%C3%86X%C3%99%401%C2%96%2B%C2%A5%C2%AF%C3%8F%C3%BAq%1A~k%12%C3%9A%19%16%3EW3%C3%AB%C3%A7%C2%A1%C2%AE%C2%B7q%C2%BB%C3%B0%C3%B8%C2%83no%C2%9AlI%C2%87%C2%90%C3%B8%C2%B9%C3%90%C2%BELh%C3%86%14%60%C3%96g%02%C3%AA8%01pO%C2%A5*%C2%9A9%1D%C2%97j%C2%B8%19%7D%C3%8C%7D%5C5%24%C2%A3%C2%BC~%C3%BF%00%C2%BC%C3%90%C2%9A%C3%BA%C2%BDn%C2%9D%C2%8E%C2%8B%C3%AA%C3%95k%5E%C3%BA~j%C2%8F%C2%A7%C3%97%C2%AF%C2%B4%18%3D%C3%BE%C3%9D%C2%BD%C3%8E%15%C3%99%C3%80P%01%40%05%00%7F%C3%BF%C3%99";
    var bili1_imgString = "%C2%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%1E%00%00%00%1E%08%06%00%00%00%3B0%C2%AE%C2%A2%00%00%00%09pHYs%00%00%0B%12%00%00%0B%12%01%C3%92%C3%9D~%C3%BC%00%00%01pIDATH%C2%89%C3%AD%C2%96!%C2%8E%C2%840%14%C2%86%C3%9Fn%26%C2%A0P(P(%24%17%40%C2%8D%C3%82q%0D%C3%AE%C3%82%0D%C2%B8%03%0A%C2%87%C3%A2%02(p%1C%00%14%0A%05f6%7F%C2%93NX%C2%B6%5DZv%02%C3%89f%3E3%03m%C3%9F%C3%9F%C3%BF%C3%B5%C3%B1%C3%A0%23M%C3%93%07%5D%C3%80%C3%A7%15%C2%A2%C3%A0%C3%86%C3%BFdYv%C2%8A%60%C2%92%24%C3%AC%C3%B72%C3%87o%C3%A1%C3%93%C2%B8%C2%A9%08%C3%85qL%C2%8E%C3%A3P%C3%97uTU%C2%95p%C3%8E%C3%BD~'%C3%9F%C3%B7i%18%06*%C2%8A%C3%A2%C2%B5%C2%8E%11%18%022Q%1Dv%1D%7B%C2%9EG%C3%B3%3C%7F%137%0C%C2%83%C3%86qd%C3%97%C2%B6m%C2%B39%1C%C3%8Cu%5D%C2%97%C3%BA%C2%BE%C3%BF5%C2%AET%18%01%C2%A3(%22%C3%8B%C2%B2%C2%84%C2%9BY%C2%8B%C2%89%C3%86%C2%A6i%C2%A2%C2%B2%2C%C2%9F%1B%C3%9C%22Mu%18%C2%86BQU%C2%B0%161%C2%B4%1D%C2%A3%C2%98%C3%80%C2%B2%2C%C2%ACXd%3B%C3%9F%C2%82L%C2%A1%18q%1C%3C%C2%86%C2%96c%0E%C2%AAXU%14%60%C2%AE%C2%AC%C3%B2%C2%B5%C2%84%C3%A1%18%C3%80%01%C2%9C%C3%80%C3%91%C2%96%C2%B5%C3%8B%C3%B5%C2%9A%3F%09s%C2%82%20%60%C2%A9%13%C2%9D%1B%C3%AEa%0CsTQ%16%C3%A6%C2%8F%C3%94%C3%BA%C3%91R%19%C2%93%C2%A1%C3%94%C2%B9%40%C3%9B%C2%B6d%C2%9A%265M%C3%B3c%0Cg%0A%C2%B7%C2%98%C3%B3raP%C3%97%C2%B5%C3%B0%3E%C3%8ET6%26c7%C3%95%C2%BC%60tPY%C2%B3%C3%AB%18%7D%18%C2%A9T%C2%A9T%C2%BEQQ%3FW%16%C3%86%5B%06%C2%95%C2%8A%40h%C2%9DG%40%0C%19%C3%92T%C3%AB6%C2%8E-%7B%C2%8DD%C3%AA%18M%3E%C3%8Fs%C3%B6%C2%A69%C3%82%C3%A1%C2%B7%13g%2F%C3%80Q%C3%9E%1F%7B%C2%A7%C3%B1%3Cc%C3%BE%C2%85%C3%BF%C2%BF%1D%13%C3%91%17-%26%C2%8D%C2%8A%C3%87%C2%9AVu%00%00%00%00IEND%C2%AEB%60%C2%82";
    var bili2_imgString = "%C2%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%1E%00%00%00%1E%08%06%00%00%00%3B0%C2%AE%C2%A2%00%00%00%09pHYs%00%00%0B%12%00%00%0B%12%01%C3%92%C3%9D~%C3%BC%00%00%01XIDATH%C2%89%C3%AD%C2%96!r%C2%850%10%C2%86%C2%B7%C2%9D%0E(%14%0A%0E%C2%80%03%C3%85%05P8%14%C2%A7%C3%A288%14%C2%8A%0B%20Q(P(%14%C2%98v%C3%BE%C3%8C%C2%A4Ci%C2%B6I%C3%A8%7B%C3%B3%0C%C2%9F%7Bd%C3%99%3F%C3%BFf%C3%99%C2%BC%C2%B7%C2%AA%C2%AA%3E%C3%A9%05%C2%BC%C2%BFB%C2%94n%C3%A1%5B%C3%B8%C2%99%7C%C2%98%C3%A4%C2%AE%C3%AB%C2%9A%C3%A6y%C2%A6(%C2%8A(%C3%8B2eL%C3%9B%C2%B64%0C%03%05A%40EQ%3C%C3%961%12C%C2%80%13%C2%B5A%C3%ABx%1CGr%5D%C3%B7%C2%87%C3%B8%C2%BE%C3%AF%C3%A4%C3%BB%C2%BE%C3%B8%C2%BD%2C%C2%8B%C2%88%C2%91%20v%C2%9A%26%0A%C3%83%C3%B0%C3%8F%C2%BC%C3%AC%C3%A4B%C3%82%C2%A6ih%5DW%2B'%12%C3%8F%C3%B3(%C3%8F%C3%B3%C3%AF%0D%C2%9EaK%C3%9Du%C3%9DeQ%C2%80w%C2%91%C2%83%C2%83-5%C2%9A%098%C2%8E%23%C2%9A%C2%85%C3%9B%C3%B9%19T%0A%C3%8D%C2%88%C3%A3%C2%909Th%C2%9B%0B%5Dl*%0A%10%C3%8Bu%C2%BE%C2%950%1C%038%C2%80%138%3Asty%7C%C3%A7_%C3%82%C2%92%C2%BE%C3%AFE%C3%A9T%C3%A7%C2%86gXC%C2%8C)%C3%86%C3%82%C3%B2%C2%93%3A~Z%26k%1CF%C2%93%0B%C3%84qL%C3%9B%C2%B6Q%C2%92%24%C2%BF%C3%96p%C2%A6p%C2%8B%C2%98%C2%87%0B%C2%834M%C2%95%C3%8Fq%C2%A6%C3%9C%1A%C2%87%C2%B6%C3%94%C2%B2al0yG%C3%AB%18s%18%C2%A54%C3%A9T%C2%B9Q%C3%95%3C7%16%C3%86-%C2%83NE%22%C2%8C%C3%8E%2B%20%07%07%5Bj%C3%9B%C3%81qF7HX%C3%87%18%C3%B2eY%C2%8A%C2%9B%C3%A6%0A%C2%BA%C3%9BI%7B%C3%86%C2%BA%04W%C2%B9%C3%BF%C3%AC%C3%9D%C3%82%C3%8F%C2%81%C2%88%C2%BE%00%C2%A7%0D%C2%94%C2%A3%20s%15F%00%00%00%00IEND%C2%AEB%60%C2%82";
    var bili3_imgString = "%C3%BF%C3%98%C3%BF%C3%A1%00%18Exif%00%00II*%00%08%00%00%00%00%00%00%00%00%00%00%00%C3%BF%C3%AC%00%11Ducky%00%01%00%04%00%00%00%3C%00%00%C3%BF%C3%A1%03%2Fhttp%3A%2F%2Fns.adobe.com%2Fxap%2F1.0%2F%00%3C%3Fxpacket%20begin%3D%22%C3%AF%C2%BB%C2%BF%22%20id%3D%22W5M0MpCehiHzreSzNTczkc9d%22%3F%3E%20%3Cx%3Axmpmeta%20xmlns%3Ax%3D%22adobe%3Ans%3Ameta%2F%22%20x%3Axmptk%3D%22Adobe%20XMP%20Core%205.6-c145%2079.163499%2C%202018%2F08%2F13-16%3A40%3A22%20%20%20%20%20%20%20%20%22%3E%20%3Crdf%3ARDF%20xmlns%3Ardf%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%22%3E%20%3Crdf%3ADescription%20rdf%3Aabout%3D%22%22%20xmlns%3Axmp%3D%22http%3A%2F%2Fns.adobe.com%2Fxap%2F1.0%2F%22%20xmlns%3AxmpMM%3D%22http%3A%2F%2Fns.adobe.com%2Fxap%2F1.0%2Fmm%2F%22%20xmlns%3AstRef%3D%22http%3A%2F%2Fns.adobe.com%2Fxap%2F1.0%2FsType%2FResourceRef%23%22%20xmp%3ACreatorTool%3D%22Adobe%20Photoshop%20CC%202019%20(Windows)%22%20xmpMM%3AInstanceID%3D%22xmp.iid%3AE6E118B3E32F11EC8B67D246D8E994A7%22%20xmpMM%3ADocumentID%3D%22xmp.did%3AE6E118B4E32F11EC8B67D246D8E994A7%22%3E%20%3CxmpMM%3ADerivedFrom%20stRef%3AinstanceID%3D%22xmp.iid%3AE6E118B1E32F11EC8B67D246D8E994A7%22%20stRef%3AdocumentID%3D%22xmp.did%3AE6E118B2E32F11EC8B67D246D8E994A7%22%2F%3E%20%3C%2Frdf%3ADescription%3E%20%3C%2Frdf%3ARDF%3E%20%3C%2Fx%3Axmpmeta%3E%20%3C%3Fxpacket%20end%3D%22r%22%3F%3E%C3%BF%C3%AE%00%0EAdobe%00d%C3%80%00%00%00%01%C3%BF%C3%9B%00%C2%84%00%06%04%04%04%05%04%06%05%05%06%09%06%05%06%09%0B%08%06%06%08%0B%0C%0A%0A%0B%0A%0A%0C%10%0C%0C%0C%0C%0C%0C%10%0C%0E%0F%10%0F%0E%0C%13%13%14%14%13%13%1C%1B%1B%1B%1C%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%01%07%07%07%0D%0C%0D%18%10%10%18%1A%15%11%15%1A%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%C3%BF%C3%80%00%11%08%00%1E%00%1E%03%01%11%00%02%11%01%03%11%01%C3%BF%C3%84%00r%00%00%02%03%01%00%00%00%00%00%00%00%00%00%00%00%00%00%05%03%04%06%07%01%00%02%03%01%00%00%00%00%00%00%00%00%00%00%00%00%00%04%02%03%05%06%10%00%02%02%02%01%04%01%04%03%00%00%00%00%00%00%00%01%02%03%04%00%05%111A%12%06!Qaq%C2%91%22R%13%11%00%02%02%01%04%03%01%00%00%00%00%00%00%00%00%00%01%02%00%03%11!1%12%04Q%C3%A1%13q%C3%BF%C3%9A%00%0C%03%01%00%02%11%03%11%00%3F%00a%C2%9D%C3%BC%C3%A2%24%C2%92%C3%95%C2%B3%0AF%C3%B3B%C3%B1%C2%A4%C3%83%C3%8A%26u*%1D~%C2%AAOQ%C3%B8%C3%88%C2%AB%C2%83%C2%B1%C3%9AH%C2%A9%1B%C2%8D%C3%A0%C3%95l%C2%ADu%C2%B2%C3%90%C2%B8%C2%AE%C3%A7%C3%85%26*B%16%1D%C2%83t%C3%A7%0Ec8%C3%8E%C2%B0%C3%A2q%C2%9Ci%23%C3%89H%C3%86%C2%BE%C2%AD%C2%AD%C2%AF%C2%B2%C3%9F%C3%94%C2%A7d%13%04%C2%85%C2%8C%C2%80%1E%09%08%C2%8C%C3%BCr%3E%C2%BE8%C2%BFn%C3%93%5DE%C2%86%C3%B2%C3%BE%C2%ADa%C3%AC%0Av%C2%9Ak%C3%BE%C3%97%40%C3%AB%C2%A3%C2%8EO_%C3%BF%00mL2%C2%B45%24%C2%92%5E%071%C2%8E%C3%9F%C3%81%C2%88%C3%B8%C3%BB%C3%A6%7D%7D6%C3%A5%C2%91f%1C%C2%8C%C2%9D%3D%C3%87%C2%AC%C3%AD%2F%1Cp%C3%8A%0D%06%C2%B2%C3%9Dk%C3%B4w%C3%A2%C2%A6%C2%9A%C3%B6%C2%A1%C2%A8%C3%97%C2%9E%16%C2%97%5E%C3%A9'%20%05%04%06%00*v%07%C2%AF%C3%AB%C3%A7*j%C3%9A%C2%9C%C3%98%C2%AF%C3%88%C2%83%C2%86%C3%92X%C2%B6-%C2%B8F%5E%20%C2%8D'9%C3%8D%C3%99%C2%8D%1Cz%7D%C3%8A%C3%94%C3%BD%C2%92%C2%95%C2%8B.%23%C2%85K%C2%ABHz%0F8%C3%99%07%3Fn%5B%15%C3%AE%C2%A1j%C2%98%0D%C3%BD%C3%86z%C2%8E%16%C3%90N%C3%91%C2%BD%C2%9FT%C2%9ADj%C3%AB%C2%BE%C2%A4%C3%94%C3%96V%C2%96(%C2%9An%00-%C3%9F%C3%84r9%C3%A3%16%5E%C3%A0%1A%C3%BC%C3%9B%C2%96%3CF%1B%C2%AAN%C2%9C%C3%97%1F%C2%B2%C3%BE%C2%93%5C%C2%9A%C2%9B%C3%90%C3%ACv%3B%C2%BA%C2%B3%C3%97%C2%A3%0B%C2%A4QG%2F%C2%9B%05%20%C2%8F%15%07%C2%8F%C3%AD%C3%9B%C3%B1%C2%94%C3%9Fo%C3%91J%C2%A20%2C%7CKi%C2%AF%C3%A6%C3%81%C2%99%C3%81%0A%3C%C3%8C%0El%C3%8C%C2%98a%08a%08a%08a%09%C3%BF%C3%99";
    var github1_imgString = "%C2%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%1E%00%00%00%1E%08%06%00%00%00%3B0%C2%AE%C2%A2%00%00%00%09pHYs%00%00%0B%12%00%00%0B%12%01%C3%92%C3%9D~%C3%BC%00%00%01%C2%90IDATH%C2%89%C3%A5%C2%96%3D%C2%8E%C2%82P%10%C3%87g7%06%1A%C2%AD%C2%B4%C2%91%C2%8A%0A**%C2%AD%C2%A4%C3%B1%02p%00%2F%C3%80%5D%C2%B8%C2%81%07%C3%A0%04%1C%40%1A%C2%AC%C2%BC%C2%80VV%C3%9AHE%05%C3%8Dn%C3%BE%C2%93%C2%B0%C3%85.%C2%BE%2F6%C2%B2%C3%89%C3%BE%13%23%C3%AA%C2%9B%C3%B9%C2%BDy%C3%B3%C3%A1%7BK%C3%93%C3%B4%C2%83F%C3%90%C3%BB%18Ph%C3%92%3D%C3%AC%C3%B7%C3%BB%C2%97%00%C2%93%24%C3%A1%C3%B7%C3%91%22%C3%BE%C3%9B%60%C3%87qh6%C2%9B)9%C2%B4%2C%C2%8B%C3%97%C3%8B4%C2%91-%000%C2%8A%22~%C2%BE%C3%9F%C3%AFt8%1C%C3%98%C2%B9m%C3%9B4%C2%9F%C3%8F%C2%A9%C2%AA*j%C2%9A%C2%86%C3%AA%C2%BA%C2%A60%0C%C3%89%C3%B3%3C%5E%C2%9B%C3%A79%C3%9Dn%C2%B7%C2%A7~%C2%95%C3%80%C2%9D%C2%96%C3%8B%25%C3%ADv%3B%C2%A5%C3%88%11%C2%B5%08%2C%3DjDc%C2%A2%C3%87%C3%A3!%C2%B4%C2%92%C2%82U%C3%B2eb'%05%07A%60%04%C2%86%1Dj%C3%81%08%0CC%C3%95j%C3%AE%C3%93b%C2%B10%03%C2%8B%0C%C2%87J%08%C2%96%15%C3%88%10%09%C3%81m%C3%9Br%7F%C2%9AJ%C2%B4qiq%5D.%17%23%2C%C3%AC%C2%B0qc%C3%B0%C3%A9t%C3%92%C2%86c%C2%9A%C2%95e)%5C%C3%B3tra%1C%C3%86q%C3%8C%60%C2%8CIL!%C3%97u%C2%B9%3F%C3%BB%C3%9A%04%C3%91%01x%3E%C2%9F%C3%B9%25%C3%93S0%C2%9C%1C%C2%8FG%C3%9An%C2%B7%C3%AC%C2%B4s%C2%88%C3%BE%C3%9Cl6%3F%C3%96_%C2%AFW%C3%9E%C2%A0%C2%AA%C2%84%C2%B3%1A%20%C3%9F%C3%B7%19%C2%8E~F%C2%B1%C3%A0s%C2%9Ft%C3%BB%5D%C3%BA'%C2%81%5C%C3%A1%C3%88W%C2%AB%C2%95%C2%96%C3%A3%C3%81%60%1Cy%C2%96e%3CL%C2%90%C3%9B%C3%B5z%C3%8D%C3%B9%1F*%C2%A5%C2%8B%00r%C2%8C%C3%A2B%1EE-%C2%A2%23%C2%AD%C2%AB%0F%22%C2%9EN%C2%A7%C2%BD%C2%BF%C3%A1%7B%C2%9D%3CK%C2%8F%C3%BA%C2%BB%C2%8A%C2%A2%C3%905%19%0E%C3%AE%C2%8E%C3%BC7%C3%B4%C3%BF%C2%AE%C2%B7_G%C3%9D%C3%9D%C3%B0_%C2%A5q%22%26%C2%A2O%06%C3%AB%C2%93%40%13%C3%A2%5B%C2%AB%00%00%00%00IEND%C2%AEB%60%C2%82";
    var github2_imgString = "%C2%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%1E%00%00%00%1E%08%06%00%00%00%3B0%C2%AE%C2%A2%00%00%00%09pHYs%00%00%0B%12%00%00%0B%12%01%C3%92%C3%9D~%C3%BC%00%00%01xIDATH%C2%89%C3%AD%C2%96%3D%C2%8E%C2%82P%10%C3%87g7%1B%C2%AC%C2%AC%C2%A4%C2%81%C2%8A%0A%2F%60%C2%85%0D%1E%C2%80%13p%23%0E%C3%82%01%C3%A4%026ZAe%05%C2%95%C2%954PI%03%C3%8Dn%C3%BE%C2%93%C3%90%C3%AC%C3%82%C3%BBb%137%1B%C3%BF%09%C2%89%C3%A2%C2%9B%C3%B9%C2%BDy%C3%B3%C3%A1%7BK%C2%92%C3%A4%C2%93%C2%9E%C2%A0%C3%B7g%40%C3%A9%05%C3%BEs%C3%A0%C3%BB%C3%BDN%C2%8F%C3%87C%C3%89%C3%A10%0C%C2%BC%5E%C2%A6%0F%C3%99%02%00%C2%B3%2C%C3%A3%C3%8F%C2%8E%C3%A3%C3%90%C3%A1p%60%C3%A7%7D%C3%9FS%C3%9B%C2%B6%C2%B4%C3%99lh%C2%B5Z%C3%91z%C2%BD%C2%A6%C3%B3%C3%B9LUU%C3%B1%C3%9A(%C2%8A%C3%88u%C3%9DY%C2%BFJ%C3%A0Qu%5DS%C2%9A%C2%A6J%C2%91%23j%11Xz%C3%94%C2%88%C3%86D%C2%B6m%0B%C2%AD%C2%A4%60%C2%95%7C%C2%99%C3%98I%C3%81%C3%97%C3%AB%C3%95%08%0C%3B%C3%94%C2%82%11%18%C2%86%C2%AA%C3%95%3C%C2%A5%C2%A6i%C3%8C%C3%80%22%C3%83%C2%A5%12%C2%82e%05%C2%B2DB%C2%B0eY%C3%9C%C2%9F%C2%A6%12m%5CZ%5C%C2%BE%C3%AF%1Baa%C2%87%C2%8D%1B%C2%83w%C2%BB%C2%9D6%1C%C3%93l%C2%BF%C3%9F%0B%C3%97%C3%8CN.%C2%8C%C3%83%C3%A3%C3%B1%C3%88%60%C2%8CIL%C2%A1%C3%9B%C3%AD%C3%86%C3%BD9%C3%95%26%C2%88%0E%C3%80%C3%ADv%C3%8B%C2%8FL%C2%B3%608%09%C2%82%C2%80N%C2%A7%13%3B%1D%1D%C2%A2%3F%2F%C2%97%C3%8B%C2%8F%C3%B5%C2%9E%C3%A7%C3%B1%06U%25%C2%9C%C3%95%00%C2%95e%C3%89p%C3%B43%C2%8A%05%C3%9F%C2%A7%C2%A4%C3%9B%C3%AF%C3%92%3F%09%C3%A4%0AG%5E%14%C2%85%C2%96%C3%A3%C3%85%60%1Cy%1C%C3%87%3CL%C2%90%C3%9B%3C%C3%8F9%C3%BFK%C2%A5t%11%40%C2%8EQ%5C%C3%88%C2%A3%C2%A8Et%C2%A4u%C3%B5A%C3%84%5D%C3%97M%C3%BE%C2%86%C3%B7%3Ay%C2%96%1E%C3%B5w%C2%85a%C2%A8k%C2%B2%1C%3C%1E%C3%B9o%C3%A8u%C2%A1%C3%BF%C3%A7%60%22%C3%BA%02Q%C2%B1%C2%90%C3%8F%C3%8B%C3%A3D%C3%82%00%00%00%00IEND%C2%AEB%60%C2%82";
    var github3_imgString = "%C3%BF%C3%98%C3%BF%C3%A1%00%18Exif%00%00II*%00%08%00%00%00%00%00%00%00%00%00%00%00%C3%BF%C3%AC%00%11Ducky%00%01%00%04%00%00%00%3C%00%00%C3%BF%C3%A1%03%2Fhttp%3A%2F%2Fns.adobe.com%2Fxap%2F1.0%2F%00%3C%3Fxpacket%20begin%3D%22%C3%AF%C2%BB%C2%BF%22%20id%3D%22W5M0MpCehiHzreSzNTczkc9d%22%3F%3E%20%3Cx%3Axmpmeta%20xmlns%3Ax%3D%22adobe%3Ans%3Ameta%2F%22%20x%3Axmptk%3D%22Adobe%20XMP%20Core%205.6-c145%2079.163499%2C%202018%2F08%2F13-16%3A40%3A22%20%20%20%20%20%20%20%20%22%3E%20%3Crdf%3ARDF%20xmlns%3Ardf%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%22%3E%20%3Crdf%3ADescription%20rdf%3Aabout%3D%22%22%20xmlns%3Axmp%3D%22http%3A%2F%2Fns.adobe.com%2Fxap%2F1.0%2F%22%20xmlns%3AxmpMM%3D%22http%3A%2F%2Fns.adobe.com%2Fxap%2F1.0%2Fmm%2F%22%20xmlns%3AstRef%3D%22http%3A%2F%2Fns.adobe.com%2Fxap%2F1.0%2FsType%2FResourceRef%23%22%20xmp%3ACreatorTool%3D%22Adobe%20Photoshop%20CC%202019%20(Windows)%22%20xmpMM%3AInstanceID%3D%22xmp.iid%3A00686BC8E33011EC9EB9E445D1D5B3E3%22%20xmpMM%3ADocumentID%3D%22xmp.did%3A00686BC9E33011EC9EB9E445D1D5B3E3%22%3E%20%3CxmpMM%3ADerivedFrom%20stRef%3AinstanceID%3D%22xmp.iid%3A00686BC6E33011EC9EB9E445D1D5B3E3%22%20stRef%3AdocumentID%3D%22xmp.did%3A00686BC7E33011EC9EB9E445D1D5B3E3%22%2F%3E%20%3C%2Frdf%3ADescription%3E%20%3C%2Frdf%3ARDF%3E%20%3C%2Fx%3Axmpmeta%3E%20%3C%3Fxpacket%20end%3D%22r%22%3F%3E%C3%BF%C3%AE%00%0EAdobe%00d%C3%80%00%00%00%01%C3%BF%C3%9B%00%C2%84%00%06%04%04%04%05%04%06%05%05%06%09%06%05%06%09%0B%08%06%06%08%0B%0C%0A%0A%0B%0A%0A%0C%10%0C%0C%0C%0C%0C%0C%10%0C%0E%0F%10%0F%0E%0C%13%13%14%14%13%13%1C%1B%1B%1B%1C%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%01%07%07%07%0D%0C%0D%18%10%10%18%1A%15%11%15%1A%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%C3%BF%C3%80%00%11%08%00%1E%00%1E%03%01%11%00%02%11%01%03%11%01%C3%BF%C3%84%00v%00%00%03%01%01%01%00%00%00%00%00%00%00%00%00%00%00%00%02%05%07%04%06%01%00%02%03%01%00%00%00%00%00%00%00%00%00%00%00%00%01%06%00%03%04%05%10%00%02%01%03%02%05%03%05%00%00%00%00%00%00%00%00%01%02%03%00%11%04!%121A%13%05%06Q%C3%81%14a%C2%81%C2%A13%07%11%00%02%01%03%04%02%03%00%00%00%00%00%00%00%00%00%00%01%11%02%12%031AQ%04q%22!%14%05%C3%BF%C3%9A%00%0C%03%01%00%02%11%03%11%00%3F%00%C2%A1O%C3%A2AY%C2%BCO%C3%88DpH%C2%B82I%1EB%09%23h%C3%80q%C2%B5%C2%80%23v%C3%9B%C3%AD%C3%A3%C3%8E%C2%B3%7D%C3%8CR%C3%95%C3%9A%1A%3E%C2%AEHN5%11%C3%BCc%C2%BFG%C2%876d%C3%98rE%06%3F%C3%ACi%06%C3%83%C2%AD%C2%B8%2BX%C2%9E%3C%C2%85%15%C3%9B%C3%86%C3%AAT%C2%A7-%C2%81%C3%B5%C2%B2%24%C3%9B_%08%C2%99Z%0A%00Z%C3%A2%C3%BA%0Ef%C2%A1%0D%C3%A7%19!%C2%8F%1E%24%C2%82%C3%9D%14EX%C2%AD%C2%A8%C3%9A%05%C2%96%C3%9FjM%C2%A9%C2%B6%C3%9Bz%C2%8Dt%C2%A4%C2%92%C2%8D%0E%2F%23%C2%8E%07%C3%AC%3D%C3%81g%C2%B7O%C2%A1!7%C3%B5%0AJ%C3%BE%40%C2%AB%C2%BA%C3%8D%C2%AC%C2%94%C3%87%25%5D%C2%84%C2%9E%3A%C2%A7%C2%83%13%C2%A6%C3%81dhe1J%C2%92%C2%85V(C%05u%0C%C2%A6%C3%9C%C2%8A%C2%9D%08%C2%A1R%C2%95%01N%1C%C2%9A%C2%8F%C2%84w%1CL%C3%83%C2%900%C3%A5%C2%9CA%1A%C2%A1%C3%B82%C2%851%C3%82Z%C3%B7%11%C2%BD%C3%8B%15%C3%93A%C3%A9K%C3%9D%C3%BCUS%17%25%3C%C3%B3%C3%A4%C3%AE%C3%B4%C2%B2*%C2%A6%C3%96%C3%A3%C2%8E%3C%10%3F%C2%A5w%0C%C3%B5%C3%AEk%C2%82%26q%C2%86%C3%91%24%C2%86%11%C2%A2%C2%96%C3%9Cu6%C3%A3%C3%83%C2%9Dm%C3%BC%C2%BCt%C3%99t%7BI%C2%8F%C3%B4%C2%B2Uu%C2%B3%C3%AB%07%C2%8B%C2%AE%C2%A9%C3%8D%0A%C2%84%1E%2F%C2%91%C2%AFK%7F%C3%97m%C3%BD%C2%A88%C3%9C*v%09z%C3%97%1D%5D%C3%97%C3%A5%C2%BA%C3%BE%C3%B5%14lG%3B%C2%89D%07%C3%BF%C3%99";
    var tencentDocs1_imgString = "%C2%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%1E%00%00%00%1E%08%06%00%00%00%3B0%C2%AE%C2%A2%00%00%00%09pHYs%00%00%0B%12%00%00%0B%12%01%C3%92%C3%9D~%C3%BC%00%00%01ZIDATH%C2%89%C3%AD%C2%96%3F%C2%AED%40%1C%C3%87%7F%C3%AFe%23%0A*%0Aq%00%C3%9D%1E%C3%82%01%C2%A8%C3%9C%C3%81%5D%C3%9C%C3%805%5C%40%C2%A7%C3%A2%02*%15%12Th46%3F%C3%89%C3%88%C2%AC0%C3%83zo%25%C2%9B%C3%BD%2623%0C%C2%9F%C3%9F%3F%C2%BF%C3%8C%C2%8F%C3%A7y%23%5C%C2%A0%C3%9F%2B%C2%A0%C2%A8%1B%C2%99%C3%B8%C2%BE%C3%BF%16%C2%A0%C3%AB%C2%BA%C3%93x%C2%99%C3%87_%C3%B0%C3%9Bt%C3%A3%C2%81t%5D%07%C3%8B%C2%B2v%C3%9BSU%15%C2%94e%09Q%14%C2%9D%C3%B3%18%C3%81%5BJ%C2%92%04%C2%8A%C2%A2xz%3A%C2%8E%23%C3%9C%C3%AFw0M%C3%B3%1CXQ%C2%94%C3%8Dgy%C2%9EC%10%04%C2%90%C2%A6%C3%A9%7CO%14%C3%85i4%0C%C2%83%09%C3%A7%C2%86%C2%9A%05n%C3%9Bv%1A%C3%830%C2%9Ca%7D%C3%9FO%17J%C2%96e%C3%904m%0A%C3%BDa0%C2%BE%C2%9Ce%194M%C2%B3%09%5E%C3%82i%C2%ADA%C2%B9%60%C2%92_%1C%C3%A38%5E%C2%85%C3%93Z%C3%82Y%C3%BB%C2%999%26a%16%04%01l%C3%9Bf%C2%86%C2%9D%08%C3%A1%24%C3%A7%2C0%C3%93cUU%C3%A79%C3%82%1D%C3%87%C2%99%C3%97X%C3%91%18%05%60%C3%BCrt*%C2%96%C3%9A%C3%A5%C3%B1%C2%9A%C3%AA%C2%BA%C3%A6%C3%AE%C3%83%C2%AA%C3%BFs0%C3%AD%0D%16%20%C3%8F%C2%B8%C3%9D%60V%C3%A3%C2%80E%C3%BE%C3%A8%C2%94%C3%90%C2%86%0D%C3%83p%1C%C2%BC%C3%97%5B%C2%94%24IL%C3%83%0E%C2%81%C3%97%C2%BC%20%C3%AA%C2%BA%C3%AEi%C2%BD%16%C3%AA%C2%97%C3%81%C3%BFYX%2F%C2%83%C3%8F%16%C3%96%26%C2%98%C3%97(%C3%8E%16%16l5%10%C3%BC%C3%B0%C3%9E%C3%83%1F6%11%C3%92H%C2%8E%C3%A8%7B%C3%A6%C3%BA%7C%C3%B0%5C%5C%C3%A4%C2%84%C3%BF%C3%99%1E%03%C3%80%03%C3%BC%05%C2%9C%C3%81%12a%C3%B7%24%00%00%00%00IEND%C2%AEB%60%C2%82";
    var tencentDocs2_imgString = "%C2%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%1E%00%00%00%1E%08%06%00%00%00%3B0%C2%AE%C2%A2%00%00%00%09pHYs%00%00%0B%12%00%00%0B%12%01%C3%92%C3%9D~%C3%BC%00%00%016IDATH%C2%89%C3%AD%C2%96%3F%C3%AED%40%14%C3%87%C2%9F%C3%8DF%C2%83%0A%09*%C2%95%0BP%C3%A9%5C%C3%80%C3%81%C2%9CE%C3%85%01%1CB%C3%A7%00%C2%A2%C2%A0%C2%A2%10%C3%8D%C3%AF%C2%97'%19%C2%99%C2%951%C3%83%C3%9A%C3%8D6%C3%B3M%C3%A4%193%7C%C3%9E%C2%BF%C2%99P%C2%B2%2C%C3%BB%C2%83%1F%C3%A8%C3%B1%0B(H%C2%B0%04%7FSO%C3%91%C2%B7%C3%9B%C2%B6%C2%85%C2%B2%2CO%C2%BB%60%C3%9B68%C2%8E%03q%1C%C3%9F%C2%8B%18%C3%81G%0A%C3%83%10%5C%C3%97%7D%C2%99U%14%05%C3%AA%C2%BA%C2%86%C2%AA%C2%AA%C3%AE%C2%81%C2%87a8%C2%9C%C3%B3%3C%0F%C3%924%C2%85%20%08%C2%B6g%C3%B3%3C%C2%AF%C2%B6i%1A.%5C%C2%98j%1E%C3%980%C2%8C%C3%95%26I%C2%B2%C3%814M%5B%2F%C3%948%C2%8E%C3%90u%C3%9D%C2%9A%C3%BA%C3%8B%60%7C%C3%99%C3%B7%7D0M%C3%B3%10%C2%BC%C2%87%C3%93bA%C2%85%60R_%C2%B4Q%141%C3%A1%C2%B4%C3%B6p%C3%9Ezn%C2%8DI%C2%9A%C2%97e%C2%81%C2%A2(%C2%B8i'B8%C2%A99%0F%C3%8C%C2%8D%C2%B8%C3%AF%C3%BB%C3%AD%1E%C3%A1y%C2%9Eoc%C3%ACh%C3%8C%02p%C2%B6%1C%5D%C2%8A%C2%BDNE%C3%8C%C2%92eY%C3%82u%C3%98%C3%B5%1F%07%C3%93%C3%91%60%03%C2%8A%C2%9C%3B%0D%C3%A6%1D%1C%C2%B0%C2%AB%1F%5D%12%C3%9A1UU%C2%AF%C2%83%C3%8FF%C2%8B%C2%9A%C2%A6%C2%89%C3%AB%C3%98%250%2B%0A%22%5D%C3%97_%C3%86%C2%ACT%C2%BF%0D%C3%BEfc%C2%BD%0D%C2%BE%C3%9BX%C2%87%60%C3%91Aq%C2%B7%C2%B1P%C3%B2%C3%B7V%C2%82%25%C3%B83%02%C2%80%7F%C3%9F%15%C2%876%C2%84W.%C2%BE%00%00%00%00IEND%C2%AEB%60%C2%82";
    var tencentDocs3_imgString = "%C3%BF%C3%98%C3%BF%C3%A1%00%18Exif%00%00II*%00%08%00%00%00%00%00%00%00%00%00%00%00%C3%BF%C3%AC%00%11Ducky%00%01%00%04%00%00%00%3C%00%00%C3%BF%C3%A1%03%2Fhttp%3A%2F%2Fns.adobe.com%2Fxap%2F1.0%2F%00%3C%3Fxpacket%20begin%3D%22%C3%AF%C2%BB%C2%BF%22%20id%3D%22W5M0MpCehiHzreSzNTczkc9d%22%3F%3E%20%3Cx%3Axmpmeta%20xmlns%3Ax%3D%22adobe%3Ans%3Ameta%2F%22%20x%3Axmptk%3D%22Adobe%20XMP%20Core%205.6-c145%2079.163499%2C%202018%2F08%2F13-16%3A40%3A22%20%20%20%20%20%20%20%20%22%3E%20%3Crdf%3ARDF%20xmlns%3Ardf%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%22%3E%20%3Crdf%3ADescription%20rdf%3Aabout%3D%22%22%20xmlns%3Axmp%3D%22http%3A%2F%2Fns.adobe.com%2Fxap%2F1.0%2F%22%20xmlns%3AxmpMM%3D%22http%3A%2F%2Fns.adobe.com%2Fxap%2F1.0%2Fmm%2F%22%20xmlns%3AstRef%3D%22http%3A%2F%2Fns.adobe.com%2Fxap%2F1.0%2FsType%2FResourceRef%23%22%20xmp%3ACreatorTool%3D%22Adobe%20Photoshop%20CC%202019%20(Windows)%22%20xmpMM%3AInstanceID%3D%22xmp.iid%3A46620DA6E33011ECAF74AC804E949E82%22%20xmpMM%3ADocumentID%3D%22xmp.did%3A46620DA7E33011ECAF74AC804E949E82%22%3E%20%3CxmpMM%3ADerivedFrom%20stRef%3AinstanceID%3D%22xmp.iid%3A46620DA4E33011ECAF74AC804E949E82%22%20stRef%3AdocumentID%3D%22xmp.did%3A46620DA5E33011ECAF74AC804E949E82%22%2F%3E%20%3C%2Frdf%3ADescription%3E%20%3C%2Frdf%3ARDF%3E%20%3C%2Fx%3Axmpmeta%3E%20%3C%3Fxpacket%20end%3D%22r%22%3F%3E%C3%BF%C3%AE%00%0EAdobe%00d%C3%80%00%00%00%01%C3%BF%C3%9B%00%C2%84%00%06%04%04%04%05%04%06%05%05%06%09%06%05%06%09%0B%08%06%06%08%0B%0C%0A%0A%0B%0A%0A%0C%10%0C%0C%0C%0C%0C%0C%10%0C%0E%0F%10%0F%0E%0C%13%13%14%14%13%13%1C%1B%1B%1B%1C%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%01%07%07%07%0D%0C%0D%18%10%10%18%1A%15%11%15%1A%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%1F%C3%BF%C3%80%00%11%08%00%1E%00%1E%03%01%11%00%02%11%01%03%11%01%C3%BF%C3%84%00%7B%00%00%02%03%01%01%00%00%00%00%00%00%00%00%00%00%00%00%04%03%05%07%02%06%01%00%02%02%03%00%00%00%00%00%00%00%00%00%00%00%00%00%05%01%03%02%04%06%10%00%02%01%04%01%02%04%07%00%00%00%00%00%00%00%00%01%02%03%00%11%04%05%06!%12%222%13%141aq%C2%91BR%16%11%00%01%04%01%02%06%03%01%00%00%00%00%00%00%00%00%01%00%11%02%03%041%12!a%C2%81%C2%91%22BQ%13%23%05%C3%BF%C3%9A%00%0C%03%01%00%02%11%03%11%00%3F%00%C2%B0%C2%AE%C3%BDq%09%C3%A4%C3%90%C3%AF%1D%15%C3%93%5D%C2%92%C3%88%C3%802%C2%B2%C3%83!%04%1E%C2%A0%C2%82%05Tr%2B%1E%C3%91%C3%AE%15%C2%A2%C2%8B%0F%C2%A9%C3%AC%C2%A3%C3%89%C3%94%C3%ADqc%C3%B52p%C3%A7%C2%82%3F%C3%9EH%C2%9D%17%C3%AE%C3%80T%C3%86%C3%A8H%C2%B0%20%C3%B5Q*%C2%A7%10%C3%A4%11%C3%91%2BV*%C3%94%C2%98%C3%90%3C%C3%B9%11%40%C2%9Ey%5DQ~%C2%ACl*%25%26%04%C3%BC)%C2%8C%5C%C2%80%C2%B5%0EQ%C2%9F%C3%885%C3%B8Y1%C3%A3a%C3%84%C3%BA%C3%91%09A%C2%94%24%0A%C3%91%C2%86%5E%C3%8E%C2%AAH7%1F*%C3%A7%C2%B1%2B%C2%AAr%04%C2%93%C2%BD%C3%B4Orl%C2%B2%11%2C%06%C3%96%C3%95%2F%C3%85%C3%B2%C2%B6%C3%99Z6%1B%C2%98%0C%C2%BA%C3%B1%0B%C2%B4Yl%C3%91%C2%B7%7Cc%C3%A2%C2%92%2B%12%C3%9F%C2%8FCj%C3%8F.%10%C2%8D%C2%9F%C2%99%C3%B2%7D8%C3%AB%C3%89a%C2%8B)%C3%8A%C2%BF1%C3%A2%C3%9A%C3%B0Y%C2%9D%C3%87u%C3%AC-%7F%2F%5BS%C3%B4%C2%91%5BqA%C2%8B%C3%BD%0E%13%C3%A5J%C2%90%C3%81%1C%C2%9E%C2%A3I%23%05Pc%05%C2%96%C3%A5%C2%AC%3C%C3%80V%C2%B6c%C3%BDR%60%C3%A5lb%C2%B7%C3%98%1F%C2%80%5E%C3%A3%C2%9C%C3%AFur%C3%B1%C3%99%C3%A0%C3%85%C3%8C%C2%82yfx%C3%97%C2%B2)%11%C3%9A%C3%81%C2%83%13e'%C2%A7%C2%86%C2%94%7F%3F%1Eb%C3%90d%08%03%C2%92i%C2%9D%7C%0Dd%02%0B%C2%AE3%C2%B7%1A%C2%BC%5E%0D%C3%AD%60%C3%8C%C2%82L%C2%9Fh%C2%90%C2%98c%C2%95%19%C3%BB%C2%9C%04%7F%08%24%C3%B4%C3%AE%26%C2%A6%C2%BA'%2C%C2%8D%C3%84%16%C3%9C%C3%BA(%C2%9D%C3%90%C2%8D%0C%08%7D%C2%AC%C2%B3J~%C2%92%22%C2%84%22%C2%84%22%C2%84%22%C2%84%2F%C3%BF%C3%99";

    var qq1 = createImageFile("qqButton1", qq1_imgString, getIconsFolder());
    var qq2 = createImageFile("qqButton2", qq2_imgString, getIconsFolder());
    var qq3 = createImageFile("qqButton3", qq3_imgString, getIconsFolder());
    var qqGroup1 = createImageFile("qqGroupButton1", qqGroup1_imgString, getIconsFolder());
    var qqGroup2 = createImageFile("qqGroupButton2", qqGroup2_imgString, getIconsFolder());
    var qqGroup3 = createImageFile("qqGroupButton3", qqGroup3_imgString, getIconsFolder());
    var bili1 = createImageFile("biliButton1", bili1_imgString, getIconsFolder());
    var bili2 = createImageFile("biliButton2", bili2_imgString, getIconsFolder());
    var bili3 = createImageFile("biliButton3", bili3_imgString, getIconsFolder());
    var github1 = createImageFile("githubButton1", github1_imgString, getIconsFolder());
    var github2 = createImageFile("githubButton2", github2_imgString, getIconsFolder());
    var github3 = createImageFile("githubButton3", github3_imgString, getIconsFolder());
    var tencentDocs1 = createImageFile("tencentDocs1", tencentDocs1_imgString, getIconsFolder());
    var tencentDocs2 = createImageFile("tencentDocs2", tencentDocs2_imgString, getIconsFolder());
    var tencentDocs3 = createImageFile("tencentDocs3", tencentDocs3_imgString, getIconsFolder());

    var qqIcons = ScriptUI.newImage(qq1, qq3, qq3, qq2);
    var qqGroupIcons = ScriptUI.newImage(qqGroup1, qqGroup3, qqGroup3, qqGroup2);
    var biliIcons = ScriptUI.newImage(bili1, bili3, bili3, bili2);
    var githubIcons = ScriptUI.newImage(github1, github3, github3, github2);
    var tencentDocsIcons = ScriptUI.newImage(tencentDocs1, tencentDocs3, tencentDocs3, tencentDocs2);

    helpButton.onClick = function () {
        var keyboardState = ScriptUI.environment.keyboardState;
        if (keyboardState.ctrlKey) return (function () {
            File(getPreferencespath()).execute();
            errorPanel.text = "请在AE关闭后找到Identifiers或Keywords修改并保存txt文件。\n重新启动AE即可实现表达式提示词的添加。";
        })()
        if (keyboardState.shiftKey) return (function () {
            Folder(resourceFolderPath).execute();
            errorPanel.text = "已打开库路径文件夹。";
        })()

        if (keyboardState.altKey) return (function () {
            var txt = trimString(readTxt(File(identifierstxt)).toString());
            sendToClipboard(txt);
            errorPanel.text = txt;
        })()
        var settingWindow = getWindow();
        settingWindow.alignment = ["center", "center"];
        settingWindow.orientation = "column";
        settingWindow.margins = 6;
        settingWindow.spacing = 6;

        var introduction = settingWindow.add("statictext");
        introduction.text = script.name;
        introduction.justify = "center";
        introduction.alignment = ["fill", "fill"];

        var buttonGroup = settingWindow.add("group");
        buttonGroup.orientation = "row";
        buttonGroup.margins = 2;
        buttonGroup.spacing = 6;

        size = 30;
        var button1 = buttonGroup.add("iconbutton", [0, 0, size, size], tencentDocsIcons, { style: "toolbutton", toggle: 0 });
        var button2 = buttonGroup.add("iconbutton", [0, 0, size, size], qqGroupIcons, { style: "toolbutton", toggle: 0 });
        var button3 = buttonGroup.add("iconbutton", [0, 0, size, size], biliIcons, { style: "toolbutton", toggle: 0 });
        var button4 = buttonGroup.add("iconbutton", [0, 0, size, size], githubIcons, { style: "toolbutton", toggle: 0 });

        var versionGroup = settingWindow.add("group");
        versionGroup.orientation = "column";
        versionGroup.margins = 0;
        versionGroup.spacing = 0;

        var tool = versionGroup.add("statictext");
        tool.text = "tool version:" + script["tool version"];
        tool.justify = "center";
        tool.alignment = ["fill", "fill"];

        var library = versionGroup.add("statictext");
        library.text = "library version:" + script["library version"];
        library.justify = "center";
        library.alignment = ["fill", "fill"];

        var list = versionGroup.add("statictext");
        list.text = "list version:" + script["list version"];
        list.justify = "center";
        list.alignment = ["fill", "fill"];

        settingWindow.show();

        button1.onClick = function () {
            var docs;
            if ($.locale == "zh_CN") docs = script.chineseDocs;
            if ($.locale == "en_US") docs = script.englishDocs
            urlOpen(docs);
            finalError = "腾讯文档: " + docs;
            errorPanel.text = finalError;
        };
        button2.onClick = function () {
            urlOpen(script.qqGroup);
            finalError = "QQ群: 963669024";
            errorPanel.text = finalError;
        };
        button3.onClick = function () {
            urlOpen(script.developerURL);
            finalError = "bilibili昵称: 鹤梦离弦";
            errorPanel.text = finalError;
        };
        button4.onClick = function () {
            urlOpen(script.github);
            finalError = "脚本发布网址: " + script.github;
            errorPanel.text = finalError;
        };
    };

    helpButton.addEventListener("click", function (e) {
        if (e.button == 2) {
            newLibrary = File.openDialog("请选择一个表达式库", "表达式库:*.jsx");
            if (newLibrary != null) {
                libraryFile = newLibrary;
                libraryName = libraryFile.displayName;
                libraryPath = libraryFile.fsName;
                script["library version"] = getVersion(libraryName, "Enhanced Expression Library");
                injectButton.text = "注入";
                finalError = "临时载入表达式库: " + "\n" + libraryName;
            }
            else finalError = "仍使用表达式库: " + "\n" + libraryName;
            errorPanel.text = finalError;
        }
    });

    errorGroup.addEventListener("focus", function () {
        scrollingPanel.text = errorPanel.text;
        errorPanel.hide();
        scrollingPanel.show();
    });

    errorGroup.addEventListener("blur", function () {
        scrollingPanel.hide();
        errorPanel.show();
    });

    refreshButton.onClick = function () {
        try {
            var selectedProperty = app.project.activeItem.selectedProperties[0];
            if (!selectedProperty) return errorPanel.text = "";
            var selectedPropertys = app.project.activeItem.selectedProperties;
            for (i = 0, l = selectedPropertys.length; i < l; i++) {
                if (selectedPropertys[i].propertyType == PropertyType.PROPERTY) {
                    selectedProperty = selectedPropertys[i];
                    break;
                }
            }
            var expressionError = selectedProperty.expressionError;
            var finalError = "";
            finalError = finalError + expressionError.toString();
            if (finalError == "") {
                finalError = "没有捕捉到错误。";
            }
            errorPanel.text = finalError;
            errorPanel.show();
        }
        catch (e) { }
    }

    refreshButton.addEventListener("click", function (e) {
        try {
            if (e.button == 2) {
                var selectedProperty = app.project.activeItem.selectedProperties[0];
                var selectedPropertys = app.project.activeItem.selectedProperties;
                for (i = 0, l = selectedPropertys.length; i < l; i++) {
                    if (selectedPropertys[i].propertyType == PropertyType.PROPERTY) {
                        selectedProperty = selectedPropertys[i];
                        break;
                    }
                }
                var expressionString = removeStringEndBlank(selectedProperty.expression);
                var expressionArray = expressionString.split("\n");
                var newExpressionArray = [];
                for (i = 0, l = expressionArray.length; i < l; i++) {
                    if (expressionArray[i].indexOf("alert") == -1) {
                        newExpressionArray.push(expressionArray[i]);
                    }
                }
                selectedProperty.expression = newExpressionArray.join("\n");
                finalError = "已清除选中属性中所有alert函数。";
                errorPanel.text = finalError;
            }
        }

        catch (e) {
            return;
        }
    })

    injectButton.onClick = function () {
        try {
            //注入的情况
            if (injectButton.text == "注入") {
                injectButton.text = "声明";
                for (var i = 1; i <= app.project.numItems; i += 1) {
                    var item = app.project.item(i);
                    if (item instanceof FootageItem && item.name == libraryName) {
                        finalError = "项目中已存在表达式增强库。";
                        errorPanel.text = finalError;
                        return;
                    }
                }
                app.project.importFile(new ImportOptions(new File(libraryPath)));
                finalError = "项目成功注入表达式增强库。";
                errorPanel.text = finalError;
                return;
            }
            //声明的情况
            if (injectButton.text == "声明") {
                app.beginUndoGroup("Expression Statement");
                finalError = "";
                //选中的属性进行声明
                if (app.project.activeItem.selectedProperties.length == 0) {
                    finalError = "未选中属性。";
                }
                for (var i = 0; i < app.project.activeItem.selectedProperties.length; i++) {
                    var cantSetExpression = !app.project.activeItem.selectedProperties[i].canSetExpression;
                    var expressionNotEnabled = !app.project.activeItem.selectedProperties[i].expressionEnabled;
                    if (cantSetExpression) {
                        continue;
                    }
                    var selectedExpression = app.project.activeItem.selectedProperties[i].expression;
                    var statement = 'eval(footage("' + libraryName + '").sourceText);';
                    if (selectedExpression.slice(0, libraryName.length + 14 + 16 - 1) == statement) {
                        finalError = "该属性已声明表达式增强库。";
                        continue;
                    }
                    app.project.activeItem.selectedProperties[i].expression = statement + "\n" + selectedExpression.toString();
                    finalError = "该属性成功声明表达式增强库。";
                }

                //活动合成进行调用
                for (var i = 1; i <= app.project.activeItem.numLayers; i++) {
                    var layer = app.project.activeItem.layer(i);
                    if (app.project.activeItem.layer(i).constructor.name === "AVLayer") {
                        if (layer.source.name == libraryName) {
                            finalError += "\n该合成已调用表达式增强库。";
                            errorPanel.text = finalError;
                            return;
                        }
                    }
                }
                var libraryIndex = 0;
                for (var i = 1; i <= app.project.numItems; i++) {
                    if (app.project.item(i).name == libraryName) {
                        libraryIndex = i;
                        break;
                    }
                }
                app.project.activeItem.layers.add(app.project.item(libraryIndex));
                finalError += "\n该合成成功调用表达式增强库。";
                errorPanel.text = finalError;
                app.endUndoGroup();
            }

        }
        catch (e) { }
    }

    injectButton.addEventListener("click", function (e) {
        if (e.button == 2) {
            if (injectButton.text == "声明") {
                injectButton.text = "注入";
                return;
            }
            if (injectButton.text == "注入") {
                injectButton.text = "声明";
                return;
            }
        }
    });


    function onlyOpenActiveComp() {
        var myComp = app.project.activeItem;
        var selCompID = app.project.item(indexOfComp(myComp.name)).id;
        var thisFile = app.project.file;
        if (!thisFile) {
            var projectFile = new File(Folder('~/Documents').fsName.replace("\\", "/") + "/Temporary Folder" + "/test " + getFormatTime() + ".aep");
            projectFileFolderPath = projectFile.path;
            projectFileFolder = Folder(projectFileFolderPath);
            if (!projectFileFolderPath.exist) {
                projectFileFolder.create();
            }
            app.project.save(projectFile);
            thisFile = projectFile;
        }
        app.project.close(CloseOptions.SAVE_CHANGES);
        app["openFast"](thisFile);
        app.project.itemByID(selCompID).openInViewer();
    }

    //--- 表达式增强库列表事件 ---//
    function addExpression(statement) {
        app.beginUndoGroup("Expression Statement");
        for (var i = 0; i < app.project.activeItem.selectedProperties.length; i++) {
            var cantSetExpression = !app.project.activeItem.selectedProperties[i].canSetExpression;
            if (cantSetExpression) {
                continue;
            }
            var selectedExpression = app.project.activeItem.selectedProperties[i].expression;
            lineBreak = selectedExpression == false ? "" : "\n";
            selectedExpression = removeStringEndBlank(selectedExpression);
            app.project.activeItem.selectedProperties[i].expression = selectedExpression.toString() + lineBreak + statement;
        }
        app.endUndoGroup();
        return;
    }

    //--- 面板自适应以及显示 ---//
    mainWindow.addEventListener("keydown", function (e) {
        if (e.keyName == "Escape") this.close();

    });
    mainWindow.layout.layout(true);
    mainWindow.layout.resize();
    mainWindow.onResizing = mainWindow.onResize = function () { this.layout.resize(); }
    if (mainWindow instanceof Window) mainWindow.show();
    return mainWindow;
}());


//--- 调用函数 ---//
function indexOfComp(compName) {
    for (var i = 1; i <= app.project.numItems; i += 1) {
        if (app.project.item(i) instanceof CompItem && app.project.item(i).name == compName) {
            return i;
        }
    }
}

function urlOpen(url) {
    if ($.os.indexOf("Windows") != -1) {
        //Windows系统
        system.callSystem("cmd.exe /c\"start " + url + "\"");
    }
    else {
        //MAC系统
        system.callSystem("open http://" + url + "\"");
    }
}

function getFormatTime() {
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

function removeStringEndBlank(string) {
    string = string.replace(/\s+$/, "");
    return string;
}

function createImageFile(filename, imgString, resourceFolder) {
    var binaryString = File.decode(imgString)
    var myFile = new File(resourceFolder + "/" + filename + ".png");
    if (!File(myFile).exists) {
        if (!isSecurityPrefSet()) {
            alert("此脚本需要访问权限才能写入文件。转到应用程序首选项的“常规”面板，确保选中“允许脚本写入文件和访问网络”。");
            try {
                app.executeCommand(2359);
            }
            catch (e) {
                alert(e);
            }
            if (!isSecurityPrefSet()) return null;
        }
        myFile.encoding = "BINARY";
        myFile.open("w");
        myFile.write(binaryString);
        myFile.close();
    }
    return myFile;
}

function copyToClipboard(str) {
    var cmd = 'mshta vbscript:clipboarddata.setdata("text","' + str + '")(close)';
    system.callSystem(cmd);
}

function createIdentifiersList(filename, resourceFolderPath) {
    var str = "";
    for (key in expressionList) {
        str += getIdentifiersList(expressionList, key);
    }
    str += "easeInQuad() " + "easeOutQuad() " + "easeInOutQuad()";
    var myFile = new File(resourceFolderPath + "/" + filename + ".txt");
    if (!isSecurityPrefSet()) {
        alert("此脚本需要访问权限才能写入文件。转到应用程序首选项的“常规”面板，确保选中“允许脚本写入文件和访问网络”。");
        try {
            app.executeCommand(2359);
        }
        catch (e) {
            alert(e);
        }
        if (!isSecurityPrefSet()) return null;
    }
    else {
        myFile.open("w");
        myFile.write(str);
        myFile.close();
    }
    return myFile;
}

function getIdentifiersList(list, key) {
    if (key.indexOf("Node") > 0) return list[key] + " ";
    if (list[key].indexOf("(") == -1) return key.toString().slice(0, key.length - 5) + " ";
    return key.toString().slice(0, key.length - 5) + "() ";
}

function isSecurityPrefSet() {
    try {
        var securitySetting = app.preferences.getPrefAsLong("Main Pref Section", "Pref_SCRIPTING_FILE_NETWORK_SECURITY");
        return securitySetting == 1;
    } catch (e) {
        return securitySetting = 1;
    }
}

function getIconsFolder() {
    var userDataFolder = Folder.userData;
    var aescriptsFolder = Folder(userDataFolder.toString() + "/Enhanced Expression Tool/Icons");
    if (!aescriptsFolder.exists) {
        var checkFolder = aescriptsFolder.create();
        if (!checkFolder) {
            alert("创建出错");
            aescriptsFolder = Folder.temp;
        }
    }
    return aescriptsFolder.toString();
}

function getPreferencespath() {
    var win = ($.os.indexOf("Windows") != -1) ? 1 : 0;
    var userData = Folder.userData;
    var version = app.version.substring(0, 4);
    var prefixName = "";
    var aeLanguage = app.isoLanguage;
    if (aeLanguage == "zh_CN") {
        prefName = " 设置";
    }
    if (aeLanguage == "en_US") {
        prefName = " Prefs";
    }

    if (win == 1) {
        prefFilePath = userData.toString() + "/Adobe/After Effects/" + version + "/" + prefixName + "Adobe After Effects " + version + prefName + ".txt";
    }
    else {
        macPath1 = userData.toString();
        macPath = macPath1.substring(0, macPath1.lastIndexOf("/") + 1);
        prefFilePath = macPath + "Preferences/Adobe/After Effects/" + version + "/" + prefixName + "Adobe After Effects " + version + prefName + ".txt";
    }
    return prefFilePath;
}

function readTxt(txtFile) {
    var txtArray = [];
    txtFile.open("r");
    while (!txtFile.eof) {
        currentLine = txtFile.readln();
        txtArray.push(currentLine);
    }
    txtFile.close();
    return txtArray;
}

function trimString(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

function folderMatch(resourceFolderPath, regexp) {
    var files = Folder(resourceFolderPath).getFiles();//资源文件
    for (var i = files.length - 1; i >= 0; i--) {
        if (files[i].displayName.match(regexp) !== null) {
            return {
                name: files[i].displayName,
                file: files[i],
            }
        }
    }
}

function getVersion(fileName, name) {
    str = fileName.slice(name.length, fileName.length - 4);
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

function sendToClipboard(info) {
    var cmd, isWindows;

    // 判断是不是字符串
    info = typeof info === "string" ? info : info.toString();
    var isWindows = $.os.indexOf("Windows") !== -1;

    //mac的命令
    var cmd = 'echo "' + info + '" | pbcopy';
    //windows的命令
    if (isWindows) {
        cmd = 'cmd.exe /c cmd.exe /c "echo ' + info + ' | clip"';
    }

    system.callSystem(cmd);
}