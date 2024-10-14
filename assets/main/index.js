System.register("chunks:///_virtual/debug-view-runtime-control.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Color, Canvas, UITransform, instantiate, Label, RichText, Toggle, Button, director, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Color = module.Color;
      Canvas = module.Canvas;
      UITransform = module.UITransform;
      instantiate = module.instantiate;
      Label = module.Label;
      RichText = module.RichText;
      Toggle = module.Toggle;
      Button = module.Button;
      director = module.director;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;

      cclegacy._RF.push({}, "b2bd1+njXxJxaFY3ymm06WU", "debug-view-runtime-control", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var DebugViewRuntimeControl = exports('DebugViewRuntimeControl', (_dec = ccclass('internal.DebugViewRuntimeControl'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(DebugViewRuntimeControl, _Component);

        function DebugViewRuntimeControl() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "compositeModeToggle", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "singleModeToggle", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "EnableAllCompositeModeButton", _descriptor3, _assertThisInitialized(_this));

          _this._single = 0;
          _this.strSingle = ['No Single Debug', 'Vertex Color', 'Vertex Normal', 'Vertex Tangent', 'World Position', 'Vertex Mirror', 'Face Side', 'UV0', 'UV1', 'UV Lightmap', 'Project Depth', 'Linear Depth', 'Fragment Normal', 'Fragment Tangent', 'Fragment Binormal', 'Base Color', 'Diffuse Color', 'Specular Color', 'Transparency', 'Metallic', 'Roughness', 'Specular Intensity', 'IOR', 'Direct Diffuse', 'Direct Specular', 'Direct All', 'Env Diffuse', 'Env Specular', 'Env All', 'Emissive', 'Light Map', 'Shadow', 'AO', 'Fresnel', 'Direct Transmit Diffuse', 'Direct Transmit Specular', 'Env Transmit Diffuse', 'Env Transmit Specular', 'Transmit All', 'Direct Internal Specular', 'Env Internal Specular', 'Internal All', 'Fog'];
          _this.strComposite = ['Direct Diffuse', 'Direct Specular', 'Env Diffuse', 'Env Specular', 'Emissive', 'Light Map', 'Shadow', 'AO', 'Normal Map', 'Fog', 'Tone Mapping', 'Gamma Correction', 'Fresnel', 'Transmit Diffuse', 'Transmit Specular', 'Internal Specular', 'TT'];
          _this.strMisc = ['CSM Layer Coloration', 'Lighting With Albedo'];
          _this.compositeModeToggleList = [];
          _this.singleModeToggleList = [];
          _this.miscModeToggleList = [];
          _this.textComponentList = [];
          _this.labelComponentList = [];
          _this.textContentList = [];
          _this.hideButtonLabel = void 0;
          _this._currentColorIndex = 0;
          _this.strColor = ['<color=#ffffff>', '<color=#000000>', '<color=#ff0000>', '<color=#00ff00>', '<color=#0000ff>'];
          _this.color = [Color.WHITE, Color.BLACK, Color.RED, Color.GREEN, Color.BLUE];
          return _this;
        }

        var _proto = DebugViewRuntimeControl.prototype;

        _proto.start = function start() {
          // get canvas resolution
          var canvas = this.node.parent.getComponent(Canvas);

          if (!canvas) {
            console.error('debug-view-runtime-control should be child of Canvas');
            return;
          }

          var uiTransform = this.node.parent.getComponent(UITransform);
          var halfScreenWidth = uiTransform.width * 0.5;
          var halfScreenHeight = uiTransform.height * 0.5;
          var x = -halfScreenWidth + halfScreenWidth * 0.1,
              y = halfScreenHeight - halfScreenHeight * 0.1;
          var width = 200,
              height = 20; // new nodes

          var miscNode = this.node.getChildByName('MiscMode');
          var buttonNode = instantiate(miscNode);
          buttonNode.parent = this.node;
          buttonNode.name = 'Buttons';
          var titleNode = instantiate(miscNode);
          titleNode.parent = this.node;
          titleNode.name = 'Titles'; // title

          for (var i = 0; i < 2; i++) {
            var newLabel = instantiate(this.EnableAllCompositeModeButton.getChildByName('Label'));
            newLabel.setPosition(x + (i > 0 ? 50 + width * 2 : 150), y, 0.0);
            newLabel.setScale(0.75, 0.75, 0.75);
            newLabel.parent = titleNode;

            var _labelComponent = newLabel.getComponent(Label);

            _labelComponent.string = i ? '----------Composite Mode----------' : '----------Single Mode----------';
            _labelComponent.color = Color.WHITE;
            _labelComponent.overflow = 0;
            this.labelComponentList[this.labelComponentList.length] = _labelComponent;
          }

          y -= height; // single

          var currentRow = 0;

          for (var _i = 0; _i < this.strSingle.length; _i++, currentRow++) {
            if (_i === this.strSingle.length >> 1) {
              x += width;
              currentRow = 0;
            }

            var newNode = _i ? instantiate(this.singleModeToggle) : this.singleModeToggle;
            newNode.setPosition(x, y - height * currentRow, 0.0);
            newNode.setScale(0.5, 0.5, 0.5);
            newNode.parent = this.singleModeToggle.parent;
            var textComponent = newNode.getComponentInChildren(RichText);
            textComponent.string = this.strSingle[_i];
            this.textComponentList[this.textComponentList.length] = textComponent;
            this.textContentList[this.textContentList.length] = textComponent.string;
            newNode.on(Toggle.EventType.TOGGLE, this.toggleSingleMode, this);
            this.singleModeToggleList[_i] = newNode;
          }

          x += width; // buttons

          this.EnableAllCompositeModeButton.setPosition(x + 15, y, 0.0);
          this.EnableAllCompositeModeButton.setScale(0.5, 0.5, 0.5);
          this.EnableAllCompositeModeButton.on(Button.EventType.CLICK, this.enableAllCompositeMode, this);
          this.EnableAllCompositeModeButton.parent = buttonNode;
          var labelComponent = this.EnableAllCompositeModeButton.getComponentInChildren(Label);
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          var changeColorButton = instantiate(this.EnableAllCompositeModeButton);
          changeColorButton.setPosition(x + 90, y, 0.0);
          changeColorButton.setScale(0.5, 0.5, 0.5);
          changeColorButton.on(Button.EventType.CLICK, this.changeTextColor, this);
          changeColorButton.parent = buttonNode;
          labelComponent = changeColorButton.getComponentInChildren(Label);
          labelComponent.string = 'TextColor';
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          var HideButton = instantiate(this.EnableAllCompositeModeButton);
          HideButton.setPosition(x + 200, y, 0.0);
          HideButton.setScale(0.5, 0.5, 0.5);
          HideButton.on(Button.EventType.CLICK, this.hideUI, this);
          HideButton.parent = this.node.parent;
          labelComponent = HideButton.getComponentInChildren(Label);
          labelComponent.string = 'Hide UI';
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          this.hideButtonLabel = labelComponent; // misc

          y -= 40;

          for (var _i2 = 0; _i2 < this.strMisc.length; _i2++) {
            var _newNode = instantiate(this.compositeModeToggle);

            _newNode.setPosition(x, y - height * _i2, 0.0);

            _newNode.setScale(0.5, 0.5, 0.5);

            _newNode.parent = miscNode;

            var _textComponent = _newNode.getComponentInChildren(RichText);

            _textComponent.string = this.strMisc[_i2];
            this.textComponentList[this.textComponentList.length] = _textComponent;
            this.textContentList[this.textContentList.length] = _textComponent.string;

            var toggleComponent = _newNode.getComponent(Toggle);

            toggleComponent.isChecked = _i2 ? true : false;

            _newNode.on(Toggle.EventType.TOGGLE, _i2 ? this.toggleLightingWithAlbedo : this.toggleCSMColoration, this);

            this.miscModeToggleList[_i2] = _newNode;
          } // composite


          y -= 150;

          for (var _i3 = 0; _i3 < this.strComposite.length; _i3++) {
            var _newNode2 = _i3 ? instantiate(this.compositeModeToggle) : this.compositeModeToggle;

            _newNode2.setPosition(x, y - height * _i3, 0.0);

            _newNode2.setScale(0.5, 0.5, 0.5);

            _newNode2.parent = this.compositeModeToggle.parent;

            var _textComponent2 = _newNode2.getComponentInChildren(RichText);

            _textComponent2.string = this.strComposite[_i3];
            this.textComponentList[this.textComponentList.length] = _textComponent2;
            this.textContentList[this.textContentList.length] = _textComponent2.string;

            _newNode2.on(Toggle.EventType.TOGGLE, this.toggleCompositeMode, this);

            this.compositeModeToggleList[_i3] = _newNode2;
          }
        };

        _proto.isTextMatched = function isTextMatched(textUI, textDescription) {
          var tempText = new String(textUI);
          var findIndex = tempText.search('>');

          if (findIndex === -1) {
            return textUI === textDescription;
          } else {
            tempText = tempText.substr(findIndex + 1);
            tempText = tempText.substr(0, tempText.search('<'));
            return tempText === textDescription;
          }
        };

        _proto.toggleSingleMode = function toggleSingleMode(toggle) {
          var debugView = director.root.debugView;
          var textComponent = toggle.getComponentInChildren(RichText);

          for (var i = 0; i < this.strSingle.length; i++) {
            if (this.isTextMatched(textComponent.string, this.strSingle[i])) {
              debugView.singleMode = i;
            }
          }
        };

        _proto.toggleCompositeMode = function toggleCompositeMode(toggle) {
          var debugView = director.root.debugView;
          var textComponent = toggle.getComponentInChildren(RichText);

          for (var i = 0; i < this.strComposite.length; i++) {
            if (this.isTextMatched(textComponent.string, this.strComposite[i])) {
              debugView.enableCompositeMode(i, toggle.isChecked);
            }
          }
        };

        _proto.toggleLightingWithAlbedo = function toggleLightingWithAlbedo(toggle) {
          var debugView = director.root.debugView;
          debugView.lightingWithAlbedo = toggle.isChecked;
        };

        _proto.toggleCSMColoration = function toggleCSMColoration(toggle) {
          var debugView = director.root.debugView;
          debugView.csmLayerColoration = toggle.isChecked;
        };

        _proto.enableAllCompositeMode = function enableAllCompositeMode(button) {
          var debugView = director.root.debugView;
          debugView.enableAllCompositeMode(true);

          for (var i = 0; i < this.compositeModeToggleList.length; i++) {
            var _toggleComponent = this.compositeModeToggleList[i].getComponent(Toggle);

            _toggleComponent.isChecked = true;
          }

          var toggleComponent = this.miscModeToggleList[0].getComponent(Toggle);
          toggleComponent.isChecked = false;
          debugView.csmLayerColoration = false;
          toggleComponent = this.miscModeToggleList[1].getComponent(Toggle);
          toggleComponent.isChecked = true;
          debugView.lightingWithAlbedo = true;
        };

        _proto.hideUI = function hideUI(button) {
          var titleNode = this.node.getChildByName('Titles');
          var activeValue = !titleNode.active;
          this.singleModeToggleList[0].parent.active = activeValue;
          this.miscModeToggleList[0].parent.active = activeValue;
          this.compositeModeToggleList[0].parent.active = activeValue;
          this.EnableAllCompositeModeButton.parent.active = activeValue;
          titleNode.active = activeValue;
          this.hideButtonLabel.string = activeValue ? 'Hide UI' : 'Show UI';
        };

        _proto.changeTextColor = function changeTextColor(button) {
          this._currentColorIndex++;

          if (this._currentColorIndex >= this.strColor.length) {
            this._currentColorIndex = 0;
          }

          for (var i = 0; i < this.textComponentList.length; i++) {
            this.textComponentList[i].string = this.strColor[this._currentColorIndex] + this.textContentList[i] + '</color>';
          }

          for (var _i4 = 0; _i4 < this.labelComponentList.length; _i4++) {
            this.labelComponentList[_i4].color = this.color[this._currentColorIndex];
          }
        };

        _proto.onLoad = function onLoad() {};

        _proto.update = function update(deltaTime) {};

        return DebugViewRuntimeControl;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "compositeModeToggle", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "singleModeToggle", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "EnableAllCompositeModeButton", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FLEditorUtil.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _asyncToGenerator, _regeneratorRuntime, cclegacy;

  return {
    setters: [function (module) {
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "00830db9TVB7bbPBHIb09Dc", "FLEditorUtil", undefined);

      var FLEditorUtil = exports('default', /*#__PURE__*/function () {
        function FLEditorUtil() {}
        /**
         * 编辑器模式下加载资源
         * @param url db://assets/
         */


        FLEditorUtil.load = function load(url) {
          return new Promise(function (resolve, reject) {
            {
              resolve(null);
              return;
            }
          });
        }
        /**
         * 异步等待 - cc.Component.scheduleOnce
         */
        ;

        FLEditorUtil.waitCmpt = function waitCmpt(cmpt, seconds) {
          return new Promise(function (resolve, reject) {
            cmpt.scheduleOnce(function () {
              resolve();
            }, seconds);
          });
        };

        FLEditorUtil.isUnicodeCJK = function isUnicodeCJK(ch) {
          var __CHINESE_REG = /^[\u4E00-\u9FFF\u3400-\u4DFF]+$/;
          var __JAPANESE_REG = /[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g;
          var __KOREAN_REG = /^[\u1100-\u11FF]|[\u3130-\u318F]|[\uA960-\uA97F]|[\uAC00-\uD7AF]|[\uD7B0-\uD7FF]+$/;
          return __CHINESE_REG.test(ch) || __JAPANESE_REG.test(ch) || __KOREAN_REG.test(ch);
        } // Checking whether the character is a whitespace
        ;

        FLEditorUtil.isUnicodeSpace = function isUnicodeSpace(ch) {
          var chCode = ch.charCodeAt(0);
          return chCode >= 9 && chCode <= 13 || chCode === 32 || chCode === 133 || chCode === 160 || chCode === 5760 || chCode >= 8192 && chCode <= 8202 || chCode === 8232 || chCode === 8233 || chCode === 8239 || chCode === 8287 || chCode === 12288;
        };

        FLEditorUtil.urlToUuid = /*#__PURE__*/function () {
          var _urlToUuid = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(url) {
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return Editor.Message.request("asset-db", 'query-uuid', url);

                case 2:
                  return _context.abrupt("return", _context.sent);

                case 3:
                case "end":
                  return _context.stop();
              }
            }, _callee);
          }));

          function urlToUuid(_x) {
            return _urlToUuid.apply(this, arguments);
          }

          return urlToUuid;
        }();

        FLEditorUtil.uuidToUrl = /*#__PURE__*/function () {
          var _uuidToUrl = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(uuid) {
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return Editor.Message.request("asset-db", 'query-url', uuid);

                case 2:
                  return _context2.abrupt("return", _context2.sent);

                case 3:
                case "end":
                  return _context2.stop();
              }
            }, _callee2);
          }));

          function uuidToUrl(_x2) {
            return _uuidToUrl.apply(this, arguments);
          }

          return uuidToUrl;
        }();

        FLEditorUtil.urlToFspath = /*#__PURE__*/function () {
          var _urlToFspath = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(uuidOrUrl) {
            return _regeneratorRuntime().wrap(function _callee3$(_context3) {
              while (1) switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return Editor.Message.request("asset-db", 'query-path', uuidOrUrl);

                case 2:
                  return _context3.abrupt("return", _context3.sent);

                case 3:
                case "end":
                  return _context3.stop();
              }
            }, _callee3);
          }));

          function urlToFspath(_x3) {
            return _urlToFspath.apply(this, arguments);
          }

          return urlToFspath;
        }();

        FLEditorUtil.uuidToFspath = /*#__PURE__*/function () {
          var _uuidToFspath = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(uuidOrUrl) {
            return _regeneratorRuntime().wrap(function _callee4$(_context4) {
              while (1) switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.next = 2;
                  return Editor.Message.request("asset-db", 'query-path', uuidOrUrl);

                case 2:
                  return _context4.abrupt("return", _context4.sent);

                case 3:
                case "end":
                  return _context4.stop();
              }
            }, _callee4);
          }));

          function uuidToFspath(_x4) {
            return _uuidToFspath.apply(this, arguments);
          }

          return uuidToFspath;
        }();

        FLEditorUtil.fspathToUuid = /*#__PURE__*/function () {
          var _fspathToUuid = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(fsPath, prsPath) {
            var url;
            return _regeneratorRuntime().wrap(function _callee5$(_context5) {
              while (1) switch (_context5.prev = _context5.next) {
                case 0:
                  url = "db://" + fsPath.replace(/\\/g, '/').replace(prsPath, '').substr(6);
                  _context5.next = 3;
                  return Editor.Message.request("asset-db", 'query-uuid', url);

                case 3:
                  return _context5.abrupt("return", _context5.sent);

                case 4:
                case "end":
                  return _context5.stop();
              }
            }, _callee5);
          }));

          function fspathToUuid(_x5, _x6) {
            return _fspathToUuid.apply(this, arguments);
          }

          return fspathToUuid;
        }();

        FLEditorUtil.existsByUuid = /*#__PURE__*/function () {
          var _existsByUuid = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(urlOrUUID) {
            return _regeneratorRuntime().wrap(function _callee6$(_context6) {
              while (1) switch (_context6.prev = _context6.next) {
                case 0:
                  _context6.next = 2;
                  return Editor.Message.request("asset-db", 'query-asset-info', urlOrUUID);

                case 2:
                  return _context6.abrupt("return", _context6.sent);

                case 3:
                case "end":
                  return _context6.stop();
              }
            }, _callee6);
          }));

          function existsByUuid(_x7) {
            return _existsByUuid.apply(this, arguments);
          }

          return existsByUuid;
        }();

        FLEditorUtil.existsByUrl = /*#__PURE__*/function () {
          var _existsByUrl = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(urlOrUUID) {
            return _regeneratorRuntime().wrap(function _callee7$(_context7) {
              while (1) switch (_context7.prev = _context7.next) {
                case 0:
                  _context7.next = 2;
                  return Editor.Message.request("asset-db", 'query-asset-info', urlOrUUID);

                case 2:
                  return _context7.abrupt("return", _context7.sent);

                case 3:
                case "end":
                  return _context7.stop();
              }
            }, _callee7);
          }));

          function existsByUrl(_x8) {
            return _existsByUrl.apply(this, arguments);
          }

          return existsByUrl;
        }();

        FLEditorUtil.assetInfoByUuid = /*#__PURE__*/function () {
          var _assetInfoByUuid = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(urlOrUUID) {
            return _regeneratorRuntime().wrap(function _callee8$(_context8) {
              while (1) switch (_context8.prev = _context8.next) {
                case 0:
                  _context8.next = 2;
                  return Editor.Message.request("asset-db", 'query-asset-info', urlOrUUID);

                case 2:
                  return _context8.abrupt("return", _context8.sent);

                case 3:
                case "end":
                  return _context8.stop();
              }
            }, _callee8);
          }));

          function assetInfoByUuid(_x9) {
            return _assetInfoByUuid.apply(this, arguments);
          }

          return assetInfoByUuid;
        }();

        FLEditorUtil.assetInfoByUrl = /*#__PURE__*/function () {
          var _assetInfoByUrl = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(urlOrUUID) {
            return _regeneratorRuntime().wrap(function _callee9$(_context9) {
              while (1) switch (_context9.prev = _context9.next) {
                case 0:
                  _context9.next = 2;
                  return Editor.Message.request("asset-db", 'query-asset-info', urlOrUUID);

                case 2:
                  return _context9.abrupt("return", _context9.sent);

                case 3:
                case "end":
                  return _context9.stop();
              }
            }, _callee9);
          }));

          function assetInfoByUrl(_x10) {
            return _assetInfoByUrl.apply(this, arguments);
          }

          return assetInfoByUrl;
        }();

        return FLEditorUtil;
      }());
      /** TextMeshPro组件默认材质路径 */

      FLEditorUtil.TMP_MAT = "textMeshPro/resources/shader/materials/textMeshPro.mtl";

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FLEditorUtil2.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _asyncToGenerator, _regeneratorRuntime, cclegacy;

  return {
    setters: [function (module) {
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "016119qQCVKmJTjk8oCZZV8", "FLEditorUtil", undefined);

      var FLEditorUtil = exports('default', /*#__PURE__*/function () {
        function FLEditorUtil() {}
        /**
         * 编辑器模式下加载资源
         * @param url db://assets/
         */


        FLEditorUtil.load = function load(url) {
          return new Promise(function (resolve, reject) {
            {
              resolve(null);
              return;
            }
          });
        }
        /**
         * 异步等待 - cc.Component.scheduleOnce
         */
        ;

        FLEditorUtil.waitCmpt = function waitCmpt(cmpt, seconds) {
          return new Promise(function (resolve, reject) {
            cmpt.scheduleOnce(function () {
              resolve();
            }, seconds);
          });
        };

        FLEditorUtil.isUnicodeCJK = function isUnicodeCJK(ch) {
          var __CHINESE_REG = /^[\u4E00-\u9FFF\u3400-\u4DFF]+$/;
          var __JAPANESE_REG = /[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g;
          var __KOREAN_REG = /^[\u1100-\u11FF]|[\u3130-\u318F]|[\uA960-\uA97F]|[\uAC00-\uD7AF]|[\uD7B0-\uD7FF]+$/;
          return __CHINESE_REG.test(ch) || __JAPANESE_REG.test(ch) || __KOREAN_REG.test(ch);
        } // Checking whether the character is a whitespace
        ;

        FLEditorUtil.isUnicodeSpace = function isUnicodeSpace(ch) {
          var chCode = ch.charCodeAt(0);
          return chCode >= 9 && chCode <= 13 || chCode === 32 || chCode === 133 || chCode === 160 || chCode === 5760 || chCode >= 8192 && chCode <= 8202 || chCode === 8232 || chCode === 8233 || chCode === 8239 || chCode === 8287 || chCode === 12288;
        };

        FLEditorUtil.urlToUuid = /*#__PURE__*/function () {
          var _urlToUuid = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(url) {
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return Editor.Message.request("asset-db", 'query-uuid', url);

                case 2:
                  return _context.abrupt("return", _context.sent);

                case 3:
                case "end":
                  return _context.stop();
              }
            }, _callee);
          }));

          function urlToUuid(_x) {
            return _urlToUuid.apply(this, arguments);
          }

          return urlToUuid;
        }();

        FLEditorUtil.uuidToUrl = /*#__PURE__*/function () {
          var _uuidToUrl = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(uuid) {
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return Editor.Message.request("asset-db", 'query-url', uuid);

                case 2:
                  return _context2.abrupt("return", _context2.sent);

                case 3:
                case "end":
                  return _context2.stop();
              }
            }, _callee2);
          }));

          function uuidToUrl(_x2) {
            return _uuidToUrl.apply(this, arguments);
          }

          return uuidToUrl;
        }();

        FLEditorUtil.urlToFspath = /*#__PURE__*/function () {
          var _urlToFspath = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(uuidOrUrl) {
            return _regeneratorRuntime().wrap(function _callee3$(_context3) {
              while (1) switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return Editor.Message.request("asset-db", 'query-path', uuidOrUrl);

                case 2:
                  return _context3.abrupt("return", _context3.sent);

                case 3:
                case "end":
                  return _context3.stop();
              }
            }, _callee3);
          }));

          function urlToFspath(_x3) {
            return _urlToFspath.apply(this, arguments);
          }

          return urlToFspath;
        }();

        FLEditorUtil.uuidToFspath = /*#__PURE__*/function () {
          var _uuidToFspath = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(uuidOrUrl) {
            return _regeneratorRuntime().wrap(function _callee4$(_context4) {
              while (1) switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.next = 2;
                  return Editor.Message.request("asset-db", 'query-path', uuidOrUrl);

                case 2:
                  return _context4.abrupt("return", _context4.sent);

                case 3:
                case "end":
                  return _context4.stop();
              }
            }, _callee4);
          }));

          function uuidToFspath(_x4) {
            return _uuidToFspath.apply(this, arguments);
          }

          return uuidToFspath;
        }();

        FLEditorUtil.fspathToUuid = /*#__PURE__*/function () {
          var _fspathToUuid = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(fsPath, prsPath) {
            var url;
            return _regeneratorRuntime().wrap(function _callee5$(_context5) {
              while (1) switch (_context5.prev = _context5.next) {
                case 0:
                  url = "db://" + fsPath.replace(/\\/g, '/').replace(prsPath, '').substr(6);
                  _context5.next = 3;
                  return Editor.Message.request("asset-db", 'query-uuid', url);

                case 3:
                  return _context5.abrupt("return", _context5.sent);

                case 4:
                case "end":
                  return _context5.stop();
              }
            }, _callee5);
          }));

          function fspathToUuid(_x5, _x6) {
            return _fspathToUuid.apply(this, arguments);
          }

          return fspathToUuid;
        }();

        FLEditorUtil.existsByUuid = /*#__PURE__*/function () {
          var _existsByUuid = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(urlOrUUID) {
            return _regeneratorRuntime().wrap(function _callee6$(_context6) {
              while (1) switch (_context6.prev = _context6.next) {
                case 0:
                  _context6.next = 2;
                  return Editor.Message.request("asset-db", 'query-asset-info', urlOrUUID);

                case 2:
                  return _context6.abrupt("return", _context6.sent);

                case 3:
                case "end":
                  return _context6.stop();
              }
            }, _callee6);
          }));

          function existsByUuid(_x7) {
            return _existsByUuid.apply(this, arguments);
          }

          return existsByUuid;
        }();

        FLEditorUtil.existsByUrl = /*#__PURE__*/function () {
          var _existsByUrl = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(urlOrUUID) {
            return _regeneratorRuntime().wrap(function _callee7$(_context7) {
              while (1) switch (_context7.prev = _context7.next) {
                case 0:
                  _context7.next = 2;
                  return Editor.Message.request("asset-db", 'query-asset-info', urlOrUUID);

                case 2:
                  return _context7.abrupt("return", _context7.sent);

                case 3:
                case "end":
                  return _context7.stop();
              }
            }, _callee7);
          }));

          function existsByUrl(_x8) {
            return _existsByUrl.apply(this, arguments);
          }

          return existsByUrl;
        }();

        FLEditorUtil.assetInfoByUuid = /*#__PURE__*/function () {
          var _assetInfoByUuid = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(urlOrUUID) {
            return _regeneratorRuntime().wrap(function _callee8$(_context8) {
              while (1) switch (_context8.prev = _context8.next) {
                case 0:
                  _context8.next = 2;
                  return Editor.Message.request("asset-db", 'query-asset-info', urlOrUUID);

                case 2:
                  return _context8.abrupt("return", _context8.sent);

                case 3:
                case "end":
                  return _context8.stop();
              }
            }, _callee8);
          }));

          function assetInfoByUuid(_x9) {
            return _assetInfoByUuid.apply(this, arguments);
          }

          return assetInfoByUuid;
        }();

        FLEditorUtil.assetInfoByUrl = /*#__PURE__*/function () {
          var _assetInfoByUrl = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(urlOrUUID) {
            return _regeneratorRuntime().wrap(function _callee9$(_context9) {
              while (1) switch (_context9.prev = _context9.next) {
                case 0:
                  _context9.next = 2;
                  return Editor.Message.request("asset-db", 'query-asset-info', urlOrUUID);

                case 2:
                  return _context9.abrupt("return", _context9.sent);

                case 3:
                case "end":
                  return _context9.stop();
              }
            }, _callee9);
          }));

          function assetInfoByUrl(_x10) {
            return _assetInfoByUrl.apply(this, arguments);
          }

          return assetInfoByUrl;
        }();

        return FLEditorUtil;
      }());
      /** TextMeshPro组件默认材质路径 */

      FLEditorUtil.TMP_MAT = "textMeshPro/resources/shader/materials/textMeshPro.mtl";

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FLEngineVersionUtil.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _createClass, cclegacy, VERSION;

  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      VERSION = module.VERSION;
    }],
    execute: function () {
      cclegacy._RF.push({}, "03ed2vjAwxHHJ6Dh2b5j2u+", "FLEngineVersionUtil", undefined);

      var FLEngineVersionUtil = exports('FLEngineVersionUtil', /*#__PURE__*/function () {
        function FLEngineVersionUtil() {}

        _createClass(FLEngineVersionUtil, null, [{
          key: "isVersion3_7_4",
          get: function get() {
            return FLEngineVersionUtil.CUR_VERSION == FLEngineVersionUtil.VERSION_3_7_4;
          }
        }, {
          key: "isVersion3_8_1",
          get: function get() {
            return FLEngineVersionUtil.CUR_VERSION == FLEngineVersionUtil.VERSION_3_8_1;
          }
        }, {
          key: "isVersion3_8_2",
          get: function get() {
            return FLEngineVersionUtil.CUR_VERSION == FLEngineVersionUtil.VERSION_3_8_2;
          }
        }, {
          key: "isVersion3_8_3",
          get: function get() {
            return FLEngineVersionUtil.CUR_VERSION == FLEngineVersionUtil.VERSION_3_8_3;
          }
        }, {
          key: "isVersion3_8_x",
          get: function get() {
            return FLEngineVersionUtil.isVersion3_8_1 || FLEngineVersionUtil.isVersion3_8_2 || FLEngineVersionUtil.isVersion3_8_3;
          }
        }]);

        return FLEngineVersionUtil;
      }());
      FLEngineVersionUtil.VERSION_3_7_4 = "3.7.4";
      FLEngineVersionUtil.VERSION_3_8_1 = "3.8.1";
      FLEngineVersionUtil.VERSION_3_8_2 = "3.8.2";
      FLEngineVersionUtil.VERSION_3_8_3 = "3.8.3";
      FLEngineVersionUtil.CUR_VERSION = VERSION;

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FLMulityLabelUtils.ts", ['cc'], function (exports) {
  var cclegacy, Mat4, Color;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Mat4 = module.Mat4;
      Color = module.Color;
    }],
    execute: function () {
      exports('fillMeshVertices3D', fillMeshVertices3D);

      cclegacy._RF.push({}, "c8550Ib0shFrrYk00uiryCv", "FLMulityLabelUtils", undefined);

      var m = new Mat4();

      function fillMeshVertices3D(node, renderer, renderData, color) {
        var chunk = renderData.chunk;
        var dataList = renderData.data;
        var vData = chunk.vb;
        var vertexCount = renderData.vertexCount;
        var stride = renderData.floatStride;
        node.getWorldMatrix(m);
        var vertexOffset = 0;

        for (var i = 0; i < vertexCount; i++) {
          var vert = dataList[i];
          var x = vert.x;
          var y = vert.y;
          var rhw = m.m03 * x + m.m07 * y + m.m15;
          rhw = rhw ? 1 / rhw : 1;
          vData[vertexOffset + 0] = (m.m00 * x + m.m04 * y + m.m12) * rhw;
          vData[vertexOffset + 1] = (m.m01 * x + m.m05 * y + m.m13) * rhw;
          vData[vertexOffset + 2] = (m.m02 * x + m.m06 * y + m.m14) * rhw;
          Color.toArray(vData, color, vertexOffset + 5);
          vertexOffset += stride;
        } // fill index data


        var bid = chunk.bufferId;
        var vid = chunk.vertexOffset;
        var meshBuffer = chunk.meshBuffer;
        var ib = chunk.meshBuffer.iData;
        var indexOffset = meshBuffer.indexOffset;

        for (var _i = 0, count = vertexCount / 4; _i < count; _i++) {
          var start = vid + _i * 4;
          ib[indexOffset++] = start;
          ib[indexOffset++] = start + 1;
          ib[indexOffset++] = start + 2;
          ib[indexOffset++] = start + 1;
          ib[indexOffset++] = start + 3;
          ib[indexOffset++] = start + 2;
        }

        meshBuffer.indexOffset += renderData.indexCount;
        meshBuffer.setDirty();
      }

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FLMultityAssembler2D.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "770bfZfUD5BarLVT4O4pzXp", "FLMultityAssembler2D", undefined);
      /*
       * @Author: Feeling
       * @Date: 2023-09-13 14:59:17
       * @LastEditTime: 2024-10-12 09:31:47
       * @LastEditors: Feeling
       * @FilePath: \3.6.3\assets\fl-multity-ui\base\FLMultityAssembler2D.ts
       * @Description:多纹理合批2d数据组装基类
       */


      var FLMultityAssembler2D = exports('default', /*#__PURE__*/function () {
        function FLMultityAssembler2D() {
          // 每个顶点属性由5个32位数据组成
          // 顶点属性数据排列，每一格是32位 (float32/uint32)
          // 原本排列为 pos.x|pos.y|uv.x|uv.y|color|pos.x|pos.y|uv.x|uv.y|color|...
          // 自定义排列为 pos.x|pos.y|uv.x|uv.y|color|extra|pos.x|pos.y|uv.x|uv.y|color|extra|...
          // 其中uv在一组数据中的偏移是2，color的偏移是4,pos的偏移是3
          // 一个四边形4个顶点
          this.verticesCount = 4; // 一个四边形按照对角拆分成2个三角形，2*3 = 6个顶点索引

          this.indicesCount = 6; // uv的值在vfmtPosUvColor结构里下标从2开始算

          this.uvOffset = 3; // color的值在vfmtPosUvColor结构里下标从4开始算

          this.colorOffset = 5;
          /**图集index数据偏移*/

          this.textureIndexOffset = 9;
          /**hsv颜色值偏移 */

          this.hsvOffset = 10;
          /**一组顶点数据偏移 pos+uv+color+txeIndex+hsv = 3 + 2 + 4 + 1 + 3 = 13*/

          this.oneVfmDadaOffset = 10;
          this.QUAD_INDICES = void 0;
        }

        var _proto = FLMultityAssembler2D.prototype;
        /**多纹理sp使用hsv代替color，使用extra顶点数据传递hsv数据 */

        _proto.fillMultityExtData = function fillMultityExtData(sprite) {
          return; // console.log(`fillMultityExtData ${sprite.name} 图集index:${sprite.textureIndex} 图集id:${"..."}`);
        };

        _proto.updateTextureIdx = function updateTextureIdx(sprite) {
          var renderData = sprite.renderData;

          if (!renderData.chunk) {
            return;
          }

          var oneVfmDadaOffset = renderData.floatStride;
          var vData = renderData.chunk.vb;
          var texIndex = sprite.node.flTextureIndex;
          var textureIndexOffest = this.textureIndexOffset;
          var maxLen = vData.length;

          while (textureIndexOffest <= maxLen) {
            vData[textureIndexOffest] = texIndex;
            textureIndexOffest += oneVfmDadaOffset;
          } // console.log(`updateTextureIdx ${sprite.name} 图集index:${sprite.textureIndex} 图集id:${"..."}`);

        };

        return FLMultityAssembler2D;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FLMultityBarFilledAssembler.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './FLMultitySprite.ts', './FLMultityAssembler2D.ts'], function (exports) {
  var _inheritsLoose, _createForOfIteratorHelperLoose, cclegacy, Mat4, dynamicAtlasManager, errorID, FLMultitySprite, FLMultityAssembler2D;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      Mat4 = module.Mat4;
      dynamicAtlasManager = module.dynamicAtlasManager;
      errorID = module.errorID;
    }, function (module) {
      FLMultitySprite = module.default;
    }, function (module) {
      FLMultityAssembler2D = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "ac1108ElyFD3pMV6PCYN3Zm", "FLMultityBarFilledAssembler", undefined);

      var FillType = FLMultitySprite.FillType;
      var m = new Mat4();
      var QUAD_INDICES = Uint16Array.from([0, 1, 2, 1, 3, 2]);
      var FLMultityBarFilledAssembler = exports('FLMultityBarFilledAssembler', /*#__PURE__*/function (_FLMultityAssembler2D) {
        _inheritsLoose(FLMultityBarFilledAssembler, _FLMultityAssembler2D);

        function FLMultityBarFilledAssembler() {
          return _FLMultityAssembler2D.apply(this, arguments) || this;
        }

        var _proto = FLMultityBarFilledAssembler.prototype;

        _proto.updateRenderData = function updateRenderData(sprite) {
          var frame = sprite.spriteFrame;
          dynamicAtlasManager.packToDynamicAtlas(sprite, frame); // TODO update material and uv

          var renderData = sprite.renderData;

          if (renderData && frame) {
            var vertDirty = renderData.vertDirty;

            if (!vertDirty) {
              return;
            } // if(renderData.chunk) {
            //     this.updateTextureIdx(sprite);
            // }


            var fillStart = sprite.fillStart;
            var fillRange = sprite.fillRange;

            if (fillRange < 0) {
              fillStart += fillRange;
              fillRange = -fillRange;
            }

            fillRange = fillStart + fillRange;
            fillStart = fillStart > 1.0 ? 1.0 : fillStart;
            fillStart = fillStart < 0.0 ? 0.0 : fillStart;
            fillRange = fillRange > 1.0 ? 1.0 : fillRange;
            fillRange = fillRange < 0.0 ? 0.0 : fillRange;
            fillRange -= fillStart;
            fillRange = fillRange < 0 ? 0 : fillRange;
            var fillEnd = fillStart + fillRange;
            fillEnd = fillEnd > 1 ? 1 : fillEnd;
            this.updateUVs(sprite, fillStart, fillEnd); // need Dirty

            this.updateVertexData(sprite, fillStart, fillEnd);
            /**更新HSV颜色数据， native/ts通用 */

            if (this.fillMultityExtData) {
              this.fillMultityExtData(sprite);
            }

            renderData.updateRenderData(sprite, frame);
          }
        };

        _proto.updateUVs = function updateUVs(sprite, fillStart, fillEnd) {
          var spriteFrame = sprite.spriteFrame;
          var renderData = sprite.renderData;
          var vData = renderData.chunk.vb; // build uvs

          var atlasWidth = spriteFrame.width;
          var atlasHeight = spriteFrame.height;
          var textureRect = spriteFrame.rect; // uv computation should take spriteSheet into account.

          var ul = 0;
          var vb = 0;
          var ur = 0;
          var vt = 0;
          var quadUV0 = 0;
          var quadUV1 = 0;
          var quadUV2 = 0;
          var quadUV3 = 0;
          var quadUV4 = 0;
          var quadUV5 = 0;
          var quadUV6 = 0;
          var quadUV7 = 0;

          if (spriteFrame.isRotated()) {
            ul = textureRect.x / atlasWidth;
            vb = (textureRect.y + textureRect.width) / atlasHeight;
            ur = (textureRect.x + textureRect.height) / atlasWidth;
            vt = textureRect.y / atlasHeight;
            quadUV0 = quadUV2 = ul;
            quadUV4 = quadUV6 = ur;
            quadUV3 = quadUV7 = vb;
            quadUV1 = quadUV5 = vt;
          } else {
            ul = textureRect.x / atlasWidth;
            vb = (textureRect.y + textureRect.height) / atlasHeight;
            ur = (textureRect.x + textureRect.width) / atlasWidth;
            vt = textureRect.y / atlasHeight;
            quadUV0 = quadUV4 = ul;
            quadUV2 = quadUV6 = ur;
            quadUV1 = quadUV3 = vb;
            quadUV5 = quadUV7 = vt;
          } //


          var uvStart = 3;
          var stride = renderData.floatStride;

          switch (sprite.fillType) {
            case FillType.HORIZONTAL:
              vData[uvStart] = quadUV0 + (quadUV2 - quadUV0) * fillStart;
              vData[uvStart + 1] = quadUV1 + (quadUV3 - quadUV1) * fillStart;
              uvStart += stride;
              vData[uvStart] = quadUV0 + (quadUV2 - quadUV0) * fillEnd;
              vData[uvStart + 1] = quadUV1 + (quadUV3 - quadUV1) * fillEnd;
              uvStart += stride;
              vData[uvStart] = quadUV4 + (quadUV6 - quadUV4) * fillStart;
              vData[uvStart + 1] = quadUV5 + (quadUV7 - quadUV5) * fillStart;
              uvStart += stride;
              vData[uvStart] = quadUV4 + (quadUV6 - quadUV4) * fillEnd;
              vData[uvStart + 1] = quadUV5 + (quadUV7 - quadUV5) * fillEnd;
              break;

            case FillType.VERTICAL:
              vData[uvStart] = quadUV0 + (quadUV4 - quadUV0) * fillStart;
              vData[uvStart + 1] = quadUV1 + (quadUV5 - quadUV1) * fillStart;
              uvStart += stride;
              vData[uvStart] = quadUV2 + (quadUV6 - quadUV2) * fillStart;
              vData[uvStart + 1] = quadUV3 + (quadUV7 - quadUV3) * fillStart;
              uvStart += stride;
              vData[uvStart] = quadUV0 + (quadUV4 - quadUV0) * fillEnd;
              vData[uvStart + 1] = quadUV1 + (quadUV5 - quadUV1) * fillEnd;
              uvStart += stride;
              vData[uvStart] = quadUV2 + (quadUV6 - quadUV2) * fillEnd;
              vData[uvStart + 1] = quadUV3 + (quadUV7 - quadUV3) * fillEnd;
              break;

            default:
              errorID(2626);
              break;
          }
        };

        _proto.updateVertexData = function updateVertexData(sprite, fillStart, fillEnd) {
          var renderData = sprite.renderData;
          var dataList = renderData.data;
          var uiTrans = sprite.node._uiProps.uiTransformComp;
          var width = uiTrans.width;
          var height = uiTrans.height;
          var appX = uiTrans.anchorX * width;
          var appY = uiTrans.anchorY * height;
          var l = -appX;
          var b = -appY;
          var r = width - appX;
          var t = height - appY;
          var progressStart = 0;
          var progressEnd = 0;

          switch (sprite.fillType) {
            case FillType.HORIZONTAL:
              progressStart = l + (r - l) * fillStart;
              progressEnd = l + (r - l) * fillEnd;
              l = progressStart;
              r = progressEnd;
              break;

            case FillType.VERTICAL:
              progressStart = b + (t - b) * fillStart;
              progressEnd = b + (t - b) * fillEnd;
              b = progressStart;
              t = progressEnd;
              break;

            default:
              errorID(2626);
              break;
          }

          dataList[0].x = l;
          dataList[0].y = b;
          dataList[1].x = r;
          dataList[1].y = b;
          dataList[2].x = l;
          dataList[2].y = t;
          dataList[3].x = r;
          dataList[3].y = t;
        };

        _proto.createData = function createData(sprite) {
          var renderData = sprite.requestRenderData(); // 0-4 for local vertex

          renderData.dataLength = 4;
          renderData.resize(4, 6);
          renderData.chunk.setIndexBuffer(QUAD_INDICES); // not need

          var dataList = renderData.data;

          for (var _iterator = _createForOfIteratorHelperLoose(dataList), _step; !(_step = _iterator()).done;) {
            var data = _step.value;
            data.z = 0;
          }

          return renderData;
        };

        _proto.updateWorldVertexData = function updateWorldVertexData(sprite, chunk) {
          var node = sprite.node;
          node.getWorldMatrix(m);
          var renderData = sprite.renderData;
          var stride = renderData.floatStride;
          var dataList = sprite.renderData.data;
          var vData = chunk.vb;
          var offset = 0;

          for (var i = 0; i < 4; i++) {
            var local = dataList[i];
            var x = local.x;
            var y = local.y;
            var rhw = m.m03 * x + m.m07 * y + m.m15;
            rhw = rhw ? 1 / rhw : 1;
            offset = i * stride;
            vData[offset] = (m.m00 * x + m.m04 * y + m.m12) * rhw;
            vData[offset + 1] = (m.m01 * x + m.m05 * y + m.m13) * rhw;
            vData[offset + 2] = (m.m02 * x + m.m06 * y + m.m14) * rhw;
          }
        };

        _proto.fillBuffers = function fillBuffers(sprite, renderer) {
          var renderData = sprite.renderData;
          var chunk = renderData.chunk; //@ts-ignore

          if (sprite._flagChangedVersion !== sprite.node.flagChangedVersion || renderData.vertDirty) {
            this.updateWorldVertexData(sprite, chunk);
            renderData.vertDirty = false; //@ts-ignore

            sprite._flagChangedVersion = sprite.node.flagChangedVersion;
          }

          var bid = chunk.bufferId;
          var vid = chunk.vertexOffset;
          var meshBuffer = chunk.meshBuffer;
          var ib = chunk.meshBuffer.iData;
          var indexOffset = meshBuffer.indexOffset;
          ib[indexOffset++] = vid;
          ib[indexOffset++] = vid + 1;
          ib[indexOffset++] = vid + 2;
          ib[indexOffset++] = vid + 2;
          ib[indexOffset++] = vid + 1;
          ib[indexOffset++] = vid + 3;
          meshBuffer.indexOffset += 6;
        };

        _proto.updateColor = function updateColor(sprite) {
          var renderData = sprite.renderData;
          var vData = renderData.chunk.vb;
          var stride = renderData.floatStride;
          var colorOffset = 5;
          var color = sprite.color;
          var colorR = color.r / 255;
          var colorG = color.g / 255;
          var colorB = color.b / 255;
          var colorA = sprite.node._uiProps.opacity;

          for (var i = 0; i < 4; i++) {
            vData[colorOffset] = colorR;
            vData[colorOffset + 1] = colorG;
            vData[colorOffset + 2] = colorB;
            vData[colorOffset + 3] = colorA;
            colorOffset += stride;
          }
        };

        return FLMultityBarFilledAssembler;
      }(FLMultityAssembler2D));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FLMultityLabel.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './FLMultiVertexFormat.ts', './FLEditorUtil2.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, RenderData, Label, vfmtPosUvColorMultiUI, FLEditorUtil;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      RenderData = module.RenderData;
      Label = module.Label;
    }, function (module) {
      vfmtPosUvColorMultiUI = module.vfmtPosUvColorMultiUI;
    }, function (module) {
      FLEditorUtil = module.default;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;

      cclegacy._RF.push({}, "1f5e5d6VcxLr5y+oPgWid4M", "FLMultityLabel", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          executeInEditMode = _decorator.executeInEditMode,
          menu = _decorator.menu;
      var FLMultityLabel = exports('default', (_dec = ccclass('FLMultityLabel'), _dec2 = menu('FLMultiUI/FLMultityLabel'), _dec3 = property({
        serializable: false
      }), _dec(_class = executeInEditMode(_class = _dec2(_class = (_class2 = /*#__PURE__*/function (_Label) {
        _inheritsLoose(FLMultityLabel, _Label);

        function FLMultityLabel() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Label.call.apply(_Label, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "textureIndex", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "multiNodeIndex", _descriptor2, _assertThisInitialized(_this));
          /** 是否使用multiUI材质 */


          _this.useMultiBatch = true;
          /** 自动切换材质 */

          _this.autoCheckMaterial = false;
          return _this;
        }

        var _proto = FLMultityLabel.prototype;

        _proto.onLoad = function onLoad() {
          // -1表示采用多纹理渲染
          this.node.flTextureIndex = -1; //是否需要自动切换材质，暂定

          if (this.useMultiBatch && this.autoCheckMaterial) {
            if (window.FLMultityUIMgr.multiUIMaterial) {
              this.customMaterial = window.FLMultityUIMgr.multiUIMaterial;
            }
          }

          _Label.prototype.onLoad.call(this);
        };

        _proto.resetInEditor = function resetInEditor() {
          var _this2 = this;

          FLEditorUtil.load("resources/shaders/multi-texture-2d.mtl").then(function (mat) {
            if (mat) {
              _this2.customMaterial = mat;
            }
          });
        };

        _proto._render = function _render(render) {
          //this.updateMaterial();
          if (!window.FLMultityUIMgr) {
            // console.warn("window.FLMultityUIMgr is null",window.FLMultityUIMgr);
            return;
          }

          window.FLMultityUIMgr.commitCompBatch(render, this, this.renderData, this._texture, this._assembler, null);
        }
        /**
         * @en Request new render data object.
         * @zh 请求新的渲染数据对象。
         * @return @en The new render data. @zh 新的渲染数据。
         */
        //__private._cocos_2d_renderer_render_draw_info__RenderDrawInfoType.COMP
        ;

        _proto.requestRenderData = function requestRenderData(drawInfoType) {
          if (drawInfoType === void 0) {
            drawInfoType = 0;
          } //定义新的渲染数据格式


          var data = RenderData.add(vfmtPosUvColorMultiUI);
          data.initRenderDrawInfo(this, drawInfoType);
          this._renderData = data;
          return data;
        };

        _proto._flushAssembler = function _flushAssembler() {
          var assembler = FLMultityLabel.Assembler.getAssembler(this);

          if (this._assembler !== assembler) {
            var _this$_textStyle, _this$_textLayout, _this$_textLayoutData, _this$_textRenderData;

            this.destroyRenderData();
            this._assembler = assembler;
            (_this$_textStyle = this._textStyle) == null ? void 0 : _this$_textStyle.reset();
            (_this$_textLayout = this._textLayout) == null ? void 0 : _this$_textLayout.reset();
            (_this$_textLayoutData = this._textLayoutData) == null ? void 0 : _this$_textLayoutData.reset();
            (_this$_textRenderData = this._textRenderData) == null ? void 0 : _this$_textRenderData.reset();
          }

          if (!this.renderData) {
            if (this._assembler && this._assembler.createData) {
              this._renderData = this._assembler.createData(this);
              this.renderData.material = this.material;

              this._updateColor();
            }
          }
        };

        _proto.updateMaterial = function updateMaterial() {
          if (this._customMaterial) {
            if (this.getSharedMaterial(0) !== this._customMaterial) {
              this.setMaterial(this._customMaterial, 0);
            }

            var mt = this.material;
            var flMultityUIMgr = window.FLMultityUIMgr;
            var textureType = mt.getDefine("TEXTURES_TYPE");

            if (textureType === undefined || textureType === null) {
              // console.warn(this.node.name + " label : No TEXTURES_TYPE , Please Use `multi-texture` material.");
              return;
            } // let flMultityUIMgr = window.FLMultityUIMgr;


            if (flMultityUIMgr) {
              var index = flMultityUIMgr.TEXTURES_INDEX;
              mt.recompileShaders({
                TEXTURES_TYPE: index,
                USE_HSV_COLOR: true
              });
            }

            return;
          } else {
            //应该报一个错
            return;
          }
        };

        return FLMultityLabel;
      }(Label), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "textureIndex", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return -1;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "multiNodeIndex", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      })), _class2)) || _class) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FLMultityLabelBitmapFontAssembler.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './FLMultityAssembler2D.ts', './FLMulityLabelUtils.ts'], function (exports) {
  var _inheritsLoose, cclegacy, Color, FLMultityAssembler2D, fillMeshVertices3D;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      Color = module.Color;
    }, function (module) {
      FLMultityAssembler2D = module.default;
    }, function (module) {
      fillMeshVertices3D = module.fillMeshVertices3D;
    }],
    execute: function () {
      cclegacy._RF.push({}, "c28467KY9RLwLil1H11yWQT", "FLMultityLabelBitmapFontAssembler", undefined);

      var tempColor = new Color(255, 255, 255, 255);
      var FLMultityLabelBitmapFontAssembler = exports('FLMultityLabelBitmapFontAssembler', /*#__PURE__*/function (_FLMultityAssembler2D) {
        _inheritsLoose(FLMultityLabelBitmapFontAssembler, _FLMultityAssembler2D);

        function FLMultityLabelBitmapFontAssembler() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _FLMultityAssembler2D.call.apply(_FLMultityAssembler2D, [this].concat(args)) || this;
          _this.oneVfmDadaOffset = 10;
          return _this;
        }

        var _proto = FLMultityLabelBitmapFontAssembler.prototype;

        _proto.createData = function createData(comp) {
          var renderData = comp.requestRenderData();
          renderData.resize(0, 0);
          return renderData;
        };

        _proto.fillBuffers = function fillBuffers(comp, renderer) {
          var node = comp.node;
          tempColor.set(comp.color);
          tempColor.a = node._uiProps.opacity * 255; // Fill All

          fillMeshVertices3D(node, renderer, comp.renderData, tempColor);
        };

        _proto.appendQuad = function appendQuad(comp, spriteFrame, rect, rotated, x, y, scale) {
          var renderData = comp.renderData;

          if (!renderData) {
            return;
          }

          var dataOffset = renderData.dataLength;
          renderData.dataLength += 4;
          renderData.resize(renderData.dataLength, renderData.dataLength / 2 * 3);
          var dataList = renderData.data;
          var texW = spriteFrame.width;
          var texH = spriteFrame.height;
          var rectWidth = rect.width;
          var rectHeight = rect.height;
          var l = 0;
          var b = 0;
          var t = 0;
          var r = 0;

          if (!rotated) {
            l = rect.x / texW;
            r = (rect.x + rectWidth) / texW;
            b = (rect.y + rectHeight) / texH;
            t = rect.y / texH;
            dataList[dataOffset].u = l;
            dataList[dataOffset].v = b;
            dataList[dataOffset + 1].u = r;
            dataList[dataOffset + 1].v = b;
            dataList[dataOffset + 2].u = l;
            dataList[dataOffset + 2].v = t;
            dataList[dataOffset + 3].u = r;
            dataList[dataOffset + 3].v = t;
          } else {
            l = rect.x / texW;
            r = (rect.x + rectHeight) / texW;
            b = (rect.y + rectWidth) / texH;
            t = rect.y / texH;
            dataList[dataOffset].u = l;
            dataList[dataOffset].v = t;
            dataList[dataOffset + 1].u = l;
            dataList[dataOffset + 1].v = b;
            dataList[dataOffset + 2].u = r;
            dataList[dataOffset + 2].v = t;
            dataList[dataOffset + 3].u = r;
            dataList[dataOffset + 3].v = b;
          }

          dataList[dataOffset].x = x;
          dataList[dataOffset].y = y - rectHeight * scale;
          dataList[dataOffset + 1].x = x + rectWidth * scale;
          dataList[dataOffset + 1].y = y - rectHeight * scale;
          dataList[dataOffset + 2].x = x;
          dataList[dataOffset + 2].y = y;
          dataList[dataOffset + 3].x = x + rectWidth * scale;
          dataList[dataOffset + 3].y = y;
        };

        _proto.updateUVs = function updateUVs(label) {
          var renderData = label.renderData;
          var vData = renderData.chunk.vb;
          var vertexCount = renderData.vertexCount;
          var dataList = renderData.data;
          var vertexOffset = 3;
          var stride = renderData.floatStride;

          for (var i = 0; i < vertexCount; i++) {
            var vert = dataList[i];
            vData[vertexOffset] = vert.u;
            vData[vertexOffset + 1] = vert.v;
            vertexOffset += stride;
          }
        };

        return FLMultityLabelBitmapFontAssembler;
      }(FLMultityAssembler2D));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FLMultityLabelLetterAssembler.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './FLMultityAssembler2D.ts', './FLMulityLabelUtils.ts'], function (exports) {
  var _inheritsLoose, cclegacy, Color, FLMultityAssembler2D, fillMeshVertices3D;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      Color = module.Color;
    }, function (module) {
      FLMultityAssembler2D = module.default;
    }, function (module) {
      fillMeshVertices3D = module.fillMeshVertices3D;
    }],
    execute: function () {
      cclegacy._RF.push({}, "8c94bzDthVMBoEqHuih3c7G", "FLMultityLabelLetterAssembler", undefined);

      var tempColor = new Color(255, 255, 255, 255);
      /**
       * letter 组装器
       * 可通过 `UI.letter` 获取该组装器。
       */

      var FLMultityLabelLetterAssembler = exports('FLMultityLabelLetterAssembler', /*#__PURE__*/function (_FLMultityAssembler2D) {
        _inheritsLoose(FLMultityLabelLetterAssembler, _FLMultityAssembler2D);

        function FLMultityLabelLetterAssembler() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _FLMultityAssembler2D.call.apply(_FLMultityAssembler2D, [this].concat(args)) || this;
          _this.oneVfmDadaOffset = 10;
          return _this;
        }

        var _proto = FLMultityLabelLetterAssembler.prototype;

        _proto.createData = function createData(comp) {
          var renderData = comp.requestRenderData();
          renderData.resize(0, 0);
          return renderData;
        };

        _proto.fillBuffers = function fillBuffers(comp, renderer) {
          if (!comp.renderData) {
            return;
          }

          var node = comp.node;
          tempColor.a = node._uiProps.opacity * 255; // Fill All

          fillMeshVertices3D(node, renderer, comp.renderData, tempColor);
        } // updateColor (label: FLMultityLabel) {
        //     if (JSB) {
        //         const renderData = label.renderData!;
        //         const vertexCount = renderData.vertexCount;
        //         if (vertexCount === 0) return;
        //         const vData = renderData.chunk.vb;
        //         const stride = renderData.floatStride;
        //         let colorOffset = 5;
        //         for (let i = 0; i < vertexCount; i++) {
        //             vData[colorOffset] = 1;
        //             vData[colorOffset + 1] = 1;
        //             vData[colorOffset + 2] = 1;
        //             vData[colorOffset + 3] = 1;
        //             colorOffset += stride;
        //         }
        //     }
        // }
        ;

        _proto.updateUVs = function updateUVs(label) {
          var renderData = label.renderData;
          var vData = renderData.chunk.vb;
          var vertexCount = renderData.vertexCount;
          var dataList = renderData.data;
          var vertexOffset = 3;
          var stride = renderData.floatStride;

          for (var i = 0; i < vertexCount; i++) {
            var vert = dataList[i];
            vData[vertexOffset] = vert.u;
            vData[vertexOffset + 1] = vert.v;
            vertexOffset += stride;
          }
        };

        return FLMultityLabelLetterAssembler;
      }(FLMultityAssembler2D));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FLMultityLabelTTFAssembler.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './FLMultityAssembler2D.ts', './FLEngineVersionUtil.ts'], function (exports) {
  var _inheritsLoose, cclegacy, Color, FLMultityAssembler2D, FLEngineVersionUtil;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      Color = module.Color;
    }, function (module) {
      FLMultityAssembler2D = module.default;
    }, function (module) {
      FLEngineVersionUtil = module.FLEngineVersionUtil;
    }],
    execute: function () {
      cclegacy._RF.push({}, "b0a2fC5bSlLZb2NV05RE/3S", "FLMultityLabelTTFAssembler", undefined);

      var WHITE = Color.WHITE.clone();
      var QUAD_INDICES = Uint16Array.from([0, 1, 2, 1, 3, 2]);
      var FLMultityLabelTTFAssembler = exports('FLMultityLabelTTFAssembler', /*#__PURE__*/function (_FLMultityAssembler2D) {
        _inheritsLoose(FLMultityLabelTTFAssembler, _FLMultityAssembler2D);

        function FLMultityLabelTTFAssembler() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _FLMultityAssembler2D.call.apply(_FLMultityAssembler2D, [this].concat(args)) || this;
          _this.oneVfmDadaOffset = 10;
          return _this;
        }

        var _proto = FLMultityLabelTTFAssembler.prototype;

        _proto.createData = function createData(comp) {
          var renderData = comp.requestRenderData();
          renderData.dataLength = 4;
          renderData.resize(4, 6);

          if (FLEngineVersionUtil.isVersion3_8_x) {
            //@ts-ignore
            // hard code
            comp._textRenderData.quadCount = 4;
          }

          var vData = renderData.chunk.vb;
          var startOffest = 3;
          var oneVsmOffest = renderData.floatStride; // vData[3] = vData[21] = vData[22] = vData[31] = 0;
          // vData[4] = vData[12] = vData[13] = vData[30] = 1;

          var offset = 5;

          for (var i = 0; i < 4; i++) {
            Color.toArray(vData, WHITE, offset);
            vData[startOffest] = 0;
            vData[startOffest + 1] = 1;
            offset += oneVsmOffest;
            startOffest += oneVsmOffest;
          }

          renderData.chunk.setIndexBuffer(QUAD_INDICES);
          return renderData;
        };

        _proto.fillBuffers = function fillBuffers(comp, renderer) {
          var renderData = comp.renderData;
          var chunk = renderData.chunk;
          var dataList = renderData.data;
          var node = comp.node;
          var vData = chunk.vb; // normal version

          var m = node.worldMatrix;
          var stride = renderData.floatStride;
          var offset = 0;
          var length = dataList.length;

          for (var i = 0; i < length; i++) {
            var curData = dataList[i];
            var x = curData.x;
            var y = curData.y;
            var rhw = m.m03 * x + m.m07 * y + m.m15;
            rhw = rhw ? 1 / rhw : 1;
            offset = i * stride;
            vData[offset + 0] = (m.m00 * x + m.m04 * y + m.m12) * rhw;
            vData[offset + 1] = (m.m01 * x + m.m05 * y + m.m13) * rhw;
            vData[offset + 2] = (m.m02 * x + m.m06 * y + m.m14) * rhw;
          } // quick version


          var vid = chunk.vertexOffset;
          var meshBuffer = chunk.meshBuffer;
          var ib = chunk.meshBuffer.iData;
          var indexOffset = meshBuffer.indexOffset;
          ib[indexOffset++] = vid;
          ib[indexOffset++] = vid + 1;
          ib[indexOffset++] = vid + 2;
          ib[indexOffset++] = vid + 2;
          ib[indexOffset++] = vid + 1;
          ib[indexOffset++] = vid + 3;
          meshBuffer.indexOffset += 6; // slow version
          // const chunk = renderData.chunk;
          // renderer.getBufferAccessor().appendIndices(chunk);
        };

        _proto.updateVertexData = function updateVertexData(comp) {
          var renderData = comp.renderData;

          if (!renderData) {
            return;
          }

          var uiTrans = comp.node._uiProps.uiTransformComp;
          var width = uiTrans.width;
          var height = uiTrans.height;
          var appX = uiTrans.anchorX * width;
          var appY = uiTrans.anchorY * height;
          var data = renderData.data;
          data[0].x = -appX; // l

          data[0].y = -appY; // b

          data[1].x = width - appX; // r

          data[1].y = -appY; // b

          data[2].x = -appX; // l

          data[2].y = height - appY; // t

          data[3].x = width - appX; // r

          data[3].y = height - appY; // t
        };

        _proto.updateUVs = function updateUVs(comp) {
          var renderData = comp.renderData;

          if (!renderData || !comp.ttfSpriteFrame) {
            return;
          }

          var vData = renderData.chunk.vb;
          var uv = comp.ttfSpriteFrame.uv;
          var startOffest = 3;
          var oneVsmOffest = renderData.floatStride;
          vData[startOffest] = uv[0];
          vData[startOffest + 1] = uv[1];
          startOffest += oneVsmOffest;
          vData[startOffest] = uv[2];
          vData[startOffest + 1] = uv[3];
          startOffest += oneVsmOffest;
          vData[startOffest] = uv[4];
          vData[startOffest + 1] = uv[5];
          startOffest += oneVsmOffest;
          vData[startOffest] = uv[6];
          vData[startOffest + 1] = uv[7];
        };

        _proto.updateColor = function updateColor(comp) {// no needs to update color
        };

        return FLMultityLabelTTFAssembler;
      }(FLMultityAssembler2D));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FLMultityRadialFilledAssembler.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './FLMultityAssembler2D.ts'], function (exports) {
  var _inheritsLoose, cclegacy, Mat4, Vec2, dynamicAtlasManager, FLMultityAssembler2D;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      Mat4 = module.Mat4;
      Vec2 = module.Vec2;
      dynamicAtlasManager = module.dynamicAtlasManager;
    }, function (module) {
      FLMultityAssembler2D = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "ab6fe2qGB9IuZBZqaLvyTHg", "FLMultityRadialFilledAssembler", undefined);

      var PI_2 = Math.PI * 2;
      var EPSILON = 1e-6;
      var m = new Mat4();
      var _vertPos = [new Vec2(), new Vec2(), new Vec2(), new Vec2()];

      var _vertices = new Array(4);

      var _uvs = new Array(8);

      var _intersectPoint_1 = [new Vec2(), new Vec2(), new Vec2(), new Vec2()];
      var _intersectPoint_2 = [new Vec2(), new Vec2(), new Vec2(), new Vec2()];

      var _center = new Vec2();

      var _triangles = [new Vec2(), new Vec2(), new Vec2(), new Vec2()];
      var QUAD_INDICES;

      function _calcIntersectedPoints(left, right, bottom, top, center, angle, intersectPoints) {
        // left bottom, right, top
        var sinAngle = Math.sin(angle);
        sinAngle = Math.abs(sinAngle) > EPSILON ? sinAngle : 0;
        var cosAngle = Math.cos(angle);
        cosAngle = Math.abs(cosAngle) > EPSILON ? cosAngle : 0;
        var tanAngle = 0;
        var cotAngle = 0;

        if (cosAngle !== 0) {
          tanAngle = sinAngle / cosAngle; // calculate right and left

          if ((left - center.x) * cosAngle > 0) {
            var yLeft = center.y + tanAngle * (left - center.x);
            intersectPoints[0].x = left;
            intersectPoints[0].y = yLeft;
          }

          if ((right - center.x) * cosAngle > 0) {
            var yRight = center.y + tanAngle * (right - center.x);
            intersectPoints[2].x = right;
            intersectPoints[2].y = yRight;
          }
        }

        if (sinAngle !== 0) {
          cotAngle = cosAngle / sinAngle; // calculate  top and bottom

          if ((top - center.y) * sinAngle > 0) {
            var xTop = center.x + cotAngle * (top - center.y);
            intersectPoints[3].x = xTop;
            intersectPoints[3].y = top;
          }

          if ((bottom - center.y) * sinAngle > 0) {
            var xBottom = center.x + cotAngle * (bottom - center.y);
            intersectPoints[1].x = xBottom;
            intersectPoints[1].y = bottom;
          }
        }
      }

      function _calculateVertices(sprite) {
        var uiTrans = sprite.node._uiProps.uiTransformComp;
        var width = uiTrans.width;
        var height = uiTrans.height;
        var appX = uiTrans.anchorX * width;
        var appY = uiTrans.anchorY * height;
        var l = -appX;
        var b = -appY;
        var r = width - appX;
        var t = height - appY;
        var vertices = _vertices;
        vertices[0] = l;
        vertices[1] = b;
        vertices[2] = r;
        vertices[3] = t;
        var fillCenter = sprite.fillCenter;
        var cx = _center.x = Math.min(Math.max(0, fillCenter.x), 1) * (r - l) + l;
        var cy = _center.y = Math.min(Math.max(0, fillCenter.y), 1) * (t - b) + b;
        _vertPos[0].x = _vertPos[3].x = l;
        _vertPos[1].x = _vertPos[2].x = r;
        _vertPos[0].y = _vertPos[1].y = b;
        _vertPos[2].y = _vertPos[3].y = t;

        for (var _i = 0, _triangles2 = _triangles; _i < _triangles2.length; _i++) {
          var num = _triangles2[_i];
          Vec2.set(num, 0, 0);
        }

        if (cx !== vertices[0]) {
          Vec2.set(_triangles[0], 3, 0);
        }

        if (cx !== vertices[2]) {
          Vec2.set(_triangles[2], 1, 2);
        }

        if (cy !== vertices[1]) {
          Vec2.set(_triangles[1], 0, 1);
        }

        if (cy !== vertices[3]) {
          Vec2.set(_triangles[3], 2, 3);
        }
      }

      function _calculateUVs(spriteFrame) {
        var atlasWidth = spriteFrame.width;
        var atlasHeight = spriteFrame.height;
        var textureRect = spriteFrame.getRect();
        var u0 = 0;
        var u1 = 0;
        var v0 = 0;
        var v1 = 0;
        var uvs = _uvs;

        if (spriteFrame.isRotated()) {
          u0 = textureRect.x / atlasWidth;
          u1 = (textureRect.x + textureRect.height) / atlasWidth;
          v0 = textureRect.y / atlasHeight;
          v1 = (textureRect.y + textureRect.width) / atlasHeight;
          uvs[0] = uvs[2] = u0;
          uvs[4] = uvs[6] = u1;
          uvs[3] = uvs[7] = v1;
          uvs[1] = uvs[5] = v0;
        } else {
          u0 = textureRect.x / atlasWidth;
          u1 = (textureRect.x + textureRect.width) / atlasWidth;
          v0 = textureRect.y / atlasHeight;
          v1 = (textureRect.y + textureRect.height) / atlasHeight;
          uvs[0] = uvs[4] = u0;
          uvs[2] = uvs[6] = u1;
          uvs[1] = uvs[3] = v1;
          uvs[5] = uvs[7] = v0;
        }
      }

      function _getVertAngle(start, end) {
        var placementX = end.x - start.x;
        var placementY = end.y - start.y;

        if (placementX === 0 && placementY === 0) {
          return 0;
        } else if (placementX === 0) {
          if (placementY > 0) {
            return Math.PI * 0.5;
          } else {
            return Math.PI * 1.5;
          }
        } else {
          var angle = Math.atan(placementY / placementX);

          if (placementX < 0) {
            angle += Math.PI;
          }

          return angle;
        }
      }

      function _generateTriangle(dataList, offset, vert0, vert1, vert2) {
        var vertices = _vertices;
        var v0x = vertices[0];
        var v0y = vertices[1];
        var v1x = vertices[2];
        var v1y = vertices[3];
        dataList[offset].x = vert0.x;
        dataList[offset].y = vert0.y;
        dataList[offset + 1].x = vert1.x;
        dataList[offset + 1].y = vert1.y;
        dataList[offset + 2].x = vert2.x;
        dataList[offset + 2].y = vert2.y;
        var progressX = 0;
        var progressY = 0;
        progressX = (vert0.x - v0x) / (v1x - v0x);
        progressY = (vert0.y - v0y) / (v1y - v0y);

        _generateUV(progressX, progressY, dataList, offset);

        progressX = (vert1.x - v0x) / (v1x - v0x);
        progressY = (vert1.y - v0y) / (v1y - v0y);

        _generateUV(progressX, progressY, dataList, offset + 1);

        progressX = (vert2.x - v0x) / (v1x - v0x);
        progressY = (vert2.y - v0y) / (v1y - v0y);

        _generateUV(progressX, progressY, dataList, offset + 2);
      }

      function _generateUV(progressX, progressY, data, offset) {
        var uvs = _uvs;
        var px1 = uvs[0] + (uvs[2] - uvs[0]) * progressX;
        var px2 = uvs[4] + (uvs[6] - uvs[4]) * progressX;
        var py1 = uvs[1] + (uvs[3] - uvs[1]) * progressX;
        var py2 = uvs[5] + (uvs[7] - uvs[5]) * progressX;
        var uv = data[offset];
        uv.u = px1 + (px2 - px1) * progressY;
        uv.v = py1 + (py2 - py1) * progressY;
      }
      /**
       * radialFilled 组装器
       * 可通过 `UI.radialFilled` 获取该组装器。
       */


      var FLMultityRadialFilledAssembler = exports('FLMultityRadialFilledAssembler', /*#__PURE__*/function (_FLMultityAssembler2D) {
        _inheritsLoose(FLMultityRadialFilledAssembler, _FLMultityAssembler2D);

        function FLMultityRadialFilledAssembler() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _FLMultityAssembler2D.call.apply(_FLMultityAssembler2D, [this].concat(args)) || this;
          _this.useModel = false;
          return _this;
        }

        var _proto = FLMultityRadialFilledAssembler.prototype;

        _proto.createData = function createData(sprite) {
          return sprite.requestRenderData();
        };

        _proto.updateRenderData = function updateRenderData(sprite) {
          var frame = sprite.spriteFrame;
          dynamicAtlasManager.packToDynamicAtlas(sprite, frame); // TODO update material and uv

          this.updateUVs(sprite);
          var renderData = sprite.renderData;

          if (renderData && frame) {
            if (!renderData.vertDirty) {
              return;
            } // if(renderData.chunk) {
            //     this.updateTextureIdx(sprite);
            // }


            var dataList = renderData.data;
            var fillStart = sprite.fillStart;
            var fillRange = sprite.fillRange;

            if (fillRange < 0) {
              fillStart += fillRange;
              fillRange = -fillRange;
            } // do round fill start [0,1), include 0, exclude 1


            while (fillStart >= 1.0) {
              fillStart -= 1.0;
            }

            while (fillStart < 0.0) {
              fillStart += 1.0;
            }

            fillStart *= PI_2;
            fillRange *= PI_2;
            var fillEnd = fillStart + fillRange; // build vertices

            _calculateVertices(sprite); // build uvs


            _calculateUVs(frame);

            _calcIntersectedPoints(_vertices[0], _vertices[2], _vertices[1], _vertices[3], _center, fillStart, _intersectPoint_1);

            _calcIntersectedPoints(_vertices[0], _vertices[2], _vertices[1], _vertices[3], _center, fillStart + fillRange, _intersectPoint_2);

            var offset = 0;

            for (var triangleIndex = 0; triangleIndex < 4; ++triangleIndex) {
              var triangle = _triangles[triangleIndex];

              if (!triangle) {
                continue;
              } // all in


              if (fillRange >= PI_2) {
                renderData.dataLength = offset + 3;

                _generateTriangle(dataList, offset, _center, _vertPos[triangle.x], _vertPos[triangle.y]);

                offset += 3;
                continue;
              } // test against


              var startAngle = _getVertAngle(_center, _vertPos[triangle.x]);

              var endAngle = _getVertAngle(_center, _vertPos[triangle.y]);

              if (endAngle < startAngle) {
                endAngle += PI_2;
              }

              startAngle -= PI_2;
              endAngle -= PI_2; // testing

              for (var testIndex = 0; testIndex < 3; ++testIndex) {
                if (startAngle >= fillEnd) ;else if (startAngle >= fillStart) {
                  renderData.dataLength = offset + 3;

                  if (endAngle >= fillEnd) {
                    // startAngle to fillEnd
                    _generateTriangle(dataList, offset, _center, _vertPos[triangle.x], _intersectPoint_2[triangleIndex]);
                  } else {
                    // startAngle to endAngle
                    _generateTriangle(dataList, offset, _center, _vertPos[triangle.x], _vertPos[triangle.y]);
                  }

                  offset += 3;
                } else if (endAngle > fillStart) {
                  // startAngle < fillStart
                  if (endAngle <= fillEnd) {
                    renderData.dataLength = offset + 3; // fillStart to endAngle

                    _generateTriangle(dataList, offset, _center, _intersectPoint_1[triangleIndex], _vertPos[triangle.y]);

                    offset += 3;
                  } else {
                    renderData.dataLength = offset + 3; // fillStart to fillEnd

                    _generateTriangle(dataList, offset, _center, _intersectPoint_1[triangleIndex], _intersectPoint_2[triangleIndex]);

                    offset += 3;
                  }
                } // add 2 * PI

                startAngle += PI_2;
                endAngle += PI_2;
              }
            } // hack for native when offset is 0


            if (offset === 0) {
              renderData.dataLength = 0;
            }

            renderData.resize(offset, offset);
            /**更新HSV颜色数据， native/ts通用 */

            if (this.fillMultityExtData) {
              this.fillMultityExtData(sprite);
            }

            renderData.updateRenderData(sprite, frame);
          }
        };

        _proto.createQuadIndices = function createQuadIndices(indexCount) {
          QUAD_INDICES = null;
          QUAD_INDICES = new Uint16Array(indexCount);
          var offset = 0;

          for (var i = 0; i < indexCount; i++) {
            QUAD_INDICES[offset++] = i;
          }
        };

        _proto.fillBuffers = function fillBuffers(comp, renderer) {
          var node = comp.node;
          var renderData = comp.renderData;
          var chunk = renderData.chunk;

          if (node.hasChangedFlags || renderData.vertDirty) {
            this.updateWorldVertexAndUVData(comp, chunk);
            renderData.vertDirty = false;
          } // forColor


          this.updateColorLate(comp);
          var bid = chunk.bufferId;
          var vid = chunk.vertexOffset;
          var meshBuffer = chunk.meshBuffer;
          var ib = chunk.meshBuffer.iData;
          var indexOffset = meshBuffer.indexOffset;

          for (var i = 0; i < renderData.indexCount; i++) {
            ib[indexOffset + i] = vid + i;
          }

          meshBuffer.indexOffset += renderData.indexCount;
          meshBuffer.setDirty();
        };

        _proto.updateWorldUVData = function updateWorldUVData(sprite) {
          var renderData = sprite.renderData;
          var stride = renderData.floatStride;
          var dataList = renderData.data;
          var vData = renderData.chunk.vb;

          for (var i = 0; i < dataList.length; i++) {
            var offset = i * stride;
            vData[offset + 3] = dataList[i].u;
            vData[offset + 4] = dataList[i].v;
          }
        } // only for TS
        ;

        _proto.updateWorldVertexAndUVData = function updateWorldVertexAndUVData(sprite, chunk) {
          var node = sprite.node;
          node.getWorldMatrix(m);
          var renderData = sprite.renderData;
          var stride = renderData.floatStride;
          var dataList = sprite.renderData.data;
          var vData = chunk.vb;
          var vertexCount = renderData.vertexCount;
          var vertexOffset = 0;

          for (var i = 0; i < vertexCount; i++) {
            var vert = dataList[i];
            var x = vert.x;
            var y = vert.y;
            var rhw = m.m03 * x + m.m07 * y + m.m15;
            rhw = rhw ? 1 / rhw : 1;
            vData[vertexOffset + 0] = (m.m00 * x + m.m04 * y + m.m12) * rhw;
            vData[vertexOffset + 1] = (m.m01 * x + m.m05 * y + m.m13) * rhw;
            vData[vertexOffset + 2] = (m.m02 * x + m.m06 * y + m.m14) * rhw;
            vData[vertexOffset + 3] = vert.u;
            vData[vertexOffset + 4] = vert.v;
            vertexOffset += stride;
          }
        } // dirty Mark
        // the real update uv is on updateWorldUVData
        ;

        _proto.updateUVs = function updateUVs(sprite) {
          var renderData = sprite.renderData;
          renderData.vertDirty = true;
          sprite.markForUpdateRenderData();
        } // fill color here
        ;

        _proto.updateColorLate = function updateColorLate(sprite) {
          var renderData = sprite.renderData;
          var vData = renderData.chunk.vb;
          var stride = renderData.floatStride;
          var vertexCount = renderData.vertexCount;
          var colorOffset = 5;
          var color = sprite.color;
          var colorR = color.r / 255;
          var colorG = color.g / 255;
          var colorB = color.b / 255;
          var colorA = sprite.node._uiProps.opacity;

          for (var i = 0; i < vertexCount; i++) {
            vData[colorOffset] = colorR;
            vData[colorOffset + 1] = colorG;
            vData[colorOffset + 2] = colorB;
            vData[colorOffset + 3] = colorA;
            colorOffset += stride;
          }
        } // Too early
        ;

        _proto.updateColor = function updateColor(sprite) {};

        return FLMultityRadialFilledAssembler;
      }(FLMultityAssembler2D));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FLMultityRichText.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './FLMultityLabel.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, HtmlTextParser, Vec2, js, isValid, LabelOutline, Node, CCObject, Sprite, HorizontalTextAlignment, VerticalTextAlignment, RichText, FLMultityLabel;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      HtmlTextParser = module.HtmlTextParser;
      Vec2 = module.Vec2;
      js = module.js;
      isValid = module.isValid;
      LabelOutline = module.LabelOutline;
      Node = module.Node;
      CCObject = module.CCObject;
      Sprite = module.Sprite;
      HorizontalTextAlignment = module.HorizontalTextAlignment;
      VerticalTextAlignment = module.VerticalTextAlignment;
      RichText = module.RichText;
    }, function (module) {
      FLMultityLabel = module.default;
    }],
    execute: function () {
      var _dec, _dec2, _class;

      cclegacy._RF.push({}, "10c20RfEbhCEozhasxqFhLe", "FLMultityRichText", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          executeInEditMode = _decorator.executeInEditMode,
          menu = _decorator.menu;

      var _htmlTextParser = new HtmlTextParser();

      var RichTextChildName = 'RICHTEXT_CHILD';
      var RichTextChildImageName = 'RICHTEXT_Image_CHILD';

      var _tempSize = new Vec2();

      var _tempSizeLeft = new Vec2();
      /**
       * 富文本池。<br/>
       */


      var labelPool = new js.Pool(function (seg) {
        if (!isValid(seg.node)) {
          return false;
        } else {
          var outline = seg.node.getComponent(LabelOutline);

          if (outline) {
            outline.width = 0;
          }
        }

        return true;
      }, 20);
      var imagePool = new js.Pool(function (seg) {
        return isValid(seg.node);
      }, 10); //

      function createSegment(type) {
        return {
          node: new Node(type),
          comp: null,
          lineCount: 0,
          styleIndex: 0,
          imageOffset: '',
          clickParam: '',
          clickHandler: '',
          type: type
        };
      }

      function getSegmentByPool(type, content) {
        var seg;

        if (type === RichTextChildName) {
          seg = labelPool._get();
        } else if (type === RichTextChildImageName) {
          seg = imagePool._get();
        }

        seg = seg || createSegment(type);
        var node = seg.node;

        if (!node) {
          node = new Node(type);
        }

        node.hideFlags |= CCObject.Flags.DontSave | CCObject.Flags.HideInHierarchy;

        if (type === RichTextChildImageName) {
          seg.comp = node.getComponent(Sprite) || node.addComponent(Sprite);
          seg.comp.spriteFrame = content;
          seg.comp.type = Sprite.Type.SLICED;
          seg.comp.sizeMode = Sprite.SizeMode.CUSTOM;
        } else {
          // RichTextChildName
          seg.comp = node.getComponent(FLMultityLabel) || node.addComponent(FLMultityLabel);
          seg.comp.autoCheckMaterial = true;
          seg.comp.string = content;
          seg.comp.horizontalAlign = HorizontalTextAlignment.LEFT;
          seg.comp.verticalAlign = VerticalTextAlignment.TOP;
          seg.comp.underlineHeight = 2;
        }

        node.setPosition(0, 0, 0);
        var trans = node._uiProps.uiTransformComp;
        trans.setAnchorPoint(0.5, 0.5);
        seg.node = node;
        seg.lineCount = 0;
        seg.styleIndex = 0;
        seg.imageOffset = '';
        seg.clickParam = '';
        seg.clickHandler = '';
        return seg;
      }

      var FLMultityRichText = exports('default', (_dec = ccclass('FLMultityRichText'), _dec2 = menu('FLMultiUI/FLMultityRichText'), _dec(_class = executeInEditMode(_class = _dec2(_class = /*#__PURE__*/function (_RichText) {
        _inheritsLoose(FLMultityRichText, _RichText);

        function FLMultityRichText() {
          return _RichText.apply(this, arguments) || this;
        }

        var _proto = FLMultityRichText.prototype;

        _proto._createFontLabel = function _createFontLabel(str) {
          return getSegmentByPool(RichTextChildName, str);
        };

        _proto._createImage = function _createImage(spriteFrame) {
          return getSegmentByPool(RichTextChildImageName, spriteFrame);
        };

        return FLMultityRichText;
      }(RichText)) || _class) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FLMultitySimpleAssembler.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './FLMultityAssembler2D.ts'], function (exports) {
  var _inheritsLoose, cclegacy, dynamicAtlasManager, FLMultityAssembler2D;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      dynamicAtlasManager = module.dynamicAtlasManager;
    }, function (module) {
      FLMultityAssembler2D = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "4da16Pu5XRJtbHO8FlY1Tp0", "FLMultitySimpleAssembler", undefined);

      var QUAD_INDICES = Uint16Array.from([0, 1, 2, 1, 3, 2]);
      /**
       * FLMultitySimpleAssembler 组装器
       */

      var FLMultitySimpleAssembler = exports('FLMultitySimpleAssembler', /*#__PURE__*/function (_FLMultityAssembler2D) {
        _inheritsLoose(FLMultitySimpleAssembler, _FLMultityAssembler2D);

        function FLMultitySimpleAssembler() {
          return _FLMultityAssembler2D.apply(this, arguments) || this;
        }

        var _proto = FLMultitySimpleAssembler.prototype;

        _proto.createData = function createData(sprite) {
          var renderData = sprite.requestRenderData();
          renderData.dataLength = 4;
          renderData.resize(4, 6); // renderData.vertexRow = 2;
          // renderData.vertexCol = 2;

          renderData.chunk.setIndexBuffer(QUAD_INDICES);
          return renderData;
        };

        _proto.updateRenderData = function updateRenderData(sprite) {
          var frame = sprite.spriteFrame;
          dynamicAtlasManager.packToDynamicAtlas(sprite, frame);
          this.updateUVs(sprite); // dirty need
          //this.updateColor(sprite);// dirty need

          var renderData = sprite.renderData;

          if (renderData && frame) {
            if (renderData.vertDirty) {
              this.updateVertexData(sprite);
            }
            /**更新HSV颜色数据， native/ts通用 */
            // if(this.fillMultityExtData){
            //     this.fillMultityExtData(sprite);
            // }


            renderData.updateRenderData(sprite, frame);
          }
        } //原本排列为 pos.x|pos.y|pos.z|uv.x|uv.y|color|pos.x|pos.y|uv.x|uv.y|color|...
        //pos Vec3 0,1,2 坐标  3,4 uv  颜色 5,6,7,8  图集id 9,hue颜色 10,11,12
        ;

        _proto.updateWorldVerts = function updateWorldVerts(sprite, chunk) {
          var renderData = sprite.renderData;
          var vData = chunk.vb;
          var dataList = renderData.data;
          var node = sprite.node;
          var m = node.worldMatrix;
          var stride = renderData.floatStride; //9

          var offset = 0;
          var length = dataList.length; //4

          for (var i = 0; i < length; i++) {
            var curData = dataList[i];
            var x = curData.x;
            var y = curData.y;
            var rhw = m.m03 * x + m.m07 * y + m.m15;
            rhw = rhw ? 1 / rhw : 1;
            offset = i * stride; //0,1,2  10,11,12  20,21,22  30,31,32

            vData[offset + 0] = (m.m00 * x + m.m04 * y + m.m12) * rhw;
            vData[offset + 1] = (m.m01 * x + m.m05 * y + m.m13) * rhw;
            vData[offset + 2] = (m.m02 * x + m.m06 * y + m.m14) * rhw;
          }
        }
        /**
         * 每帧都会调用
         * @param sprite 
         * @param renderer 
         * @returns 
         */
        ;

        _proto.fillBuffers = function fillBuffers(sprite, renderer) {
          if (sprite === null) {
            return;
          }

          var renderData = sprite.renderData;
          var chunk = renderData.chunk; //如果节点的世界坐标发生变化，重新从当前节点的世界坐标计算一次顶点数据

          if (sprite.node.hasChangedFlags || renderData.vertDirty) {
            // const vb = chunk.vertexAccessor.getVertexBuffer(chunk.bufferId);
            this.updateWorldVerts(sprite, chunk);
            renderData.vertDirty = false;
          } // quick version
          // 获取准备好的顶点数据
          // vData包含pos、uv、color数据
          // iData包含三角剖分后的顶点索引数据


          var bid = chunk.bufferId;
          var vidOrigin = chunk.vertexOffset;
          var meshBuffer = chunk.meshBuffer;
          var ib = chunk.meshBuffer.iData;
          var indexOffset = meshBuffer.indexOffset;
          /***
           *  矩形定点格式，一个矩形由2个三角形构成(0,1,2) (1,2,3)
           *   2 *********** 3
           *     *         *
           *     *         *
           *     *         *
           *   0 *********** 1
           * 
           */

          var vid = vidOrigin; // left bottom

          ib[indexOffset++] = vid; // right bottom

          ib[indexOffset++] = vid + 1; // left top

          ib[indexOffset++] = vid + 2; // right bottom

          ib[indexOffset++] = vid + 1; // right top

          ib[indexOffset++] = vid + 3; // left top

          ib[indexOffset++] = vid + 2; // IndexOffset should add 6 when vertices of a rect are visited.

          meshBuffer.indexOffset += 6;
        }
        /**
         * 更新了局部顶点坐标，但仅缓存到renderData.data中，而不是直接填充进顶点缓冲（VBO）中。
         * 因为此处的顶点坐标需要转换成世界顶点坐标，再传入顶点着色器中，而这个转换过程是由的root.ts
         * 中的frameMove函数实现的。（注：此处实现Native是在C++层实现的）
         * @param sprite 
         * @returns 
         */
        ;

        _proto.updateVertexData = function updateVertexData(sprite) {
          var renderData = sprite.renderData;

          if (!renderData) {
            return;
          }

          var uiTrans = sprite.node._uiProps.uiTransformComp;
          var dataList = renderData.data;
          var cw = uiTrans.width;
          var ch = uiTrans.height;
          var appX = uiTrans.anchorX * cw;
          var appY = uiTrans.anchorY * ch;
          var l = 0;
          var b = 0;
          var r = 0;
          var t = 0;

          if (sprite.trim) {
            l = -appX;
            b = -appY;
            r = cw - appX;
            t = ch - appY;
          } else {
            var frame = sprite.spriteFrame;
            var originSize = frame.originalSize;
            var ow = originSize.width;
            var oh = originSize.height;
            var scaleX = cw / ow;
            var scaleY = ch / oh;
            var trimmedBorder = frame.trimmedBorder;
            l = trimmedBorder.x * scaleX - appX;
            b = trimmedBorder.z * scaleY - appY;
            r = cw + trimmedBorder.y * scaleX - appX;
            t = ch + trimmedBorder.w * scaleY - appY;
          }

          dataList[0].x = l;
          dataList[0].y = b;
          dataList[1].x = r;
          dataList[1].y = b;
          dataList[2].x = l;
          dataList[2].y = t;
          dataList[3].x = r;
          dataList[3].y = t;
          renderData.vertDirty = true;
        } // 获取当前cc.Sprite组件设置的spriteFrame对应的uv
        // uv数组长度=8，分别表示4个顶点的uv.x, uv.y
        // 按照左下、右下、左上、右上的顺序存储，注意这里的顺序和顶点索引的数据需要对应上，
        //0,1,2  10,11,12  20,21,22  30,31,32
        ;

        _proto.updateUVs = function updateUVs(sprite) {
          if (!sprite.spriteFrame) return;
          var renderData = sprite.renderData;
          var vData = renderData.chunk.vb;
          var uv = sprite.spriteFrame.uv;
          var stride = renderData.floatStride;
          var offset = 3;
          vData[offset] = uv[0];
          vData[offset + 1] = uv[1];
          offset += stride;
          vData[offset] = uv[2];
          vData[offset + 1] = uv[3];
          offset += stride;
          vData[offset] = uv[4];
          vData[offset + 1] = uv[5];
          offset += stride;
          vData[offset] = uv[6];
          vData[offset + 1] = uv[7]; // renderData.vertDirty = false;
        };

        _proto.updateColor = function updateColor(sprite) {
          var renderData = sprite.renderData;
          var vData = renderData.chunk.vb;
          var colorOffset = 5;
          var color = sprite.color;
          var colorR = color.r / 255;
          var colorG = color.g / 255;
          var colorB = color.b / 255;
          var colorA = color.a / 255; //多纹理图片的COLOR作为HSV值传递，与Label保持一致，不一致的话无法合批 TODO
          //颜色 5,6,7,8   14,15,16,17   23,24,25,26  32,33,34,35

          for (var i = 0; i < 4; i++, colorOffset += renderData.floatStride) {
            vData[colorOffset] = colorR;
            vData[colorOffset + 1] = colorG;
            vData[colorOffset + 2] = colorB;
            vData[colorOffset + 3] = colorA;
          }
        };

        return FLMultitySimpleAssembler;
      }(FLMultityAssembler2D));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FLMultitySlicedAssembler.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './FLMultityAssembler2D.ts'], function (exports) {
  var _inheritsLoose, cclegacy, Mat4, Color, dynamicAtlasManager, FLMultityAssembler2D;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      Mat4 = module.Mat4;
      Color = module.Color;
      dynamicAtlasManager = module.dynamicAtlasManager;
    }, function (module) {
      FLMultityAssembler2D = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "baf71P+06FIHpPX1KNqahvT", "FLMultitySlicedAssembler", undefined);

      var m = new Mat4();
      var tempRenderData = [];

      for (var i = 0; i < 4; i++) {
        tempRenderData.push({
          x: 0,
          y: 0,
          z: 0,
          u: 0,
          v: 0,
          color: new Color()
        });
      }

      var FLMultitySlicedAssembler = exports('FLMultitySlicedAssembler', /*#__PURE__*/function (_FLMultityAssembler2D) {
        _inheritsLoose(FLMultitySlicedAssembler, _FLMultityAssembler2D);

        function FLMultitySlicedAssembler() {
          return _FLMultityAssembler2D.apply(this, arguments) || this;
        }

        var _proto = FLMultitySlicedAssembler.prototype;

        _proto.createData = function createData(sprite) {
          var renderData = sprite.requestRenderData(); // 0-4 for local vertex

          renderData.dataLength = 16;
          renderData.resize(16, 54);
          renderData.vertexRow = 4;
          renderData.vertexCol = 4;
          this.QUAD_INDICES = new Uint16Array(54);
          this.createQuadIndices(4, 4);
          renderData.chunk.setIndexBuffer(this.QUAD_INDICES);
          return renderData;
        };

        _proto.createQuadIndices = function createQuadIndices(vertexRow, vertexCol) {
          var offset = 0;

          for (var curRow = 0; curRow < vertexRow - 1; curRow++) {
            for (var curCol = 0; curCol < vertexCol - 1; curCol++) {
              // vid is the index of the left bottom vertex in each rect.
              var vid = curRow * vertexCol + curCol; // left bottom

              this.QUAD_INDICES[offset++] = vid; // right bottom

              this.QUAD_INDICES[offset++] = vid + 1; // left top

              this.QUAD_INDICES[offset++] = vid + vertexCol; // right bottom

              this.QUAD_INDICES[offset++] = vid + 1; // right top

              this.QUAD_INDICES[offset++] = vid + 1 + vertexCol; // left top

              this.QUAD_INDICES[offset++] = vid + vertexCol;
            }
          }
        };

        _proto.updateRenderData = function updateRenderData(sprite) {
          var frame = sprite.spriteFrame; // TODO: Material API design and export from editor could affect the material activation process
          // need to update the logic here
          // if (frame) {
          //     if (!frame._original && dynamicAtlasManager) {
          //         dynamicAtlasManager.insertSpriteFrame(frame);
          //     }
          //     if (sprite._material._texture !== frame._texture) {
          //         sprite._activateMaterial();
          //     }
          // }
          //动态合图

          dynamicAtlasManager.packToDynamicAtlas(sprite, frame); // TODO update material and uv

          this.updateUVs(sprite); // dirty need
          //this.updateColor(sprite); // dirty need

          var renderData = sprite.renderData;

          if (renderData && frame) {
            var vertDirty = renderData.vertDirty;

            if (vertDirty) {
              this.updateVertexData(sprite);
            }
            /**更新HSV颜色数据， native/ts通用 */


            if (this.fillMultityExtData) {
              this.fillMultityExtData(sprite);
            }

            renderData.updateRenderData(sprite, frame);
          }
        };

        _proto.updateVertexData = function updateVertexData(sprite) {
          var renderData = sprite.renderData;
          var dataList = renderData.data;
          var uiTrans = sprite.node._uiProps.uiTransformComp;
          var width = uiTrans.width;
          var height = uiTrans.height;
          var appX = uiTrans.anchorX * width;
          var appY = uiTrans.anchorY * height;
          var frame = sprite.spriteFrame;
          var leftWidth = frame.insetLeft;
          var rightWidth = frame.insetRight;
          var topHeight = frame.insetTop;
          var bottomHeight = frame.insetBottom;
          var sizableWidth = width - leftWidth - rightWidth;
          var sizableHeight = height - topHeight - bottomHeight;
          var xScale = width / (leftWidth + rightWidth);
          var yScale = height / (topHeight + bottomHeight);
          xScale = Number.isNaN(xScale) || xScale > 1 ? 1 : xScale;
          yScale = Number.isNaN(yScale) || yScale > 1 ? 1 : yScale;
          sizableWidth = sizableWidth < 0 ? 0 : sizableWidth;
          sizableHeight = sizableHeight < 0 ? 0 : sizableHeight;
          tempRenderData[0].x = -appX;
          tempRenderData[0].y = -appY;
          tempRenderData[1].x = leftWidth * xScale - appX;
          tempRenderData[1].y = bottomHeight * yScale - appY;
          tempRenderData[2].x = tempRenderData[1].x + sizableWidth;
          tempRenderData[2].y = tempRenderData[1].y + sizableHeight;
          tempRenderData[3].x = width - appX;
          tempRenderData[3].y = height - appY;

          for (var curRow = 0; curRow < renderData.vertexRow; curRow++) {
            for (var curCol = 0; curCol < renderData.vertexCol; curCol++) {
              var curIndex = curRow * renderData.vertexCol + curCol;

              if (curIndex < renderData.dataLength && curRow < tempRenderData.length && curCol < tempRenderData.length) {
                dataList[curIndex].x = tempRenderData[curCol].x;
                dataList[curIndex].y = tempRenderData[curRow].y;
              }
            }
          }
        };

        _proto.fillBuffers = function fillBuffers(sprite, renderer) {
          var renderData = sprite.renderData;
          var chunk = renderData.chunk;

          if (sprite.node.hasChangedFlags || renderData.vertDirty) {
            this.updateWorldVertexData(sprite, chunk);
            renderData.vertDirty = false;
          }

          var bid = chunk.bufferId;
          var vid = chunk.vertexOffset;
          var meshBuffer = chunk.meshBuffer;
          var ib = chunk.meshBuffer.iData;
          var indexOffset = meshBuffer.indexOffset;

          for (var r = 0; r < 3; ++r) {
            for (var c = 0; c < 3; ++c) {
              var start = vid + r * 4 + c;
              ib[indexOffset++] = start;
              ib[indexOffset++] = start + 1;
              ib[indexOffset++] = start + 4;
              ib[indexOffset++] = start + 1;
              ib[indexOffset++] = start + 5;
              ib[indexOffset++] = start + 4;
            }
          }

          meshBuffer.indexOffset = indexOffset;
        };

        _proto.updateWorldVertexData = function updateWorldVertexData(sprite, chunk) {
          var node = sprite.node;
          node.getWorldMatrix(m);
          var renderData = sprite.renderData;
          var stride = renderData.floatStride;
          var dataList = renderData.data;
          var vData = chunk.vb;
          var offset = 0;

          for (var row = 0; row < 4; ++row) {
            var rowD = dataList[row * 4];

            for (var col = 0; col < 4; ++col) {
              var colD = dataList[col];
              var x = colD.x;
              var y = rowD.y;
              var rhw = m.m03 * x + m.m07 * y + m.m15;
              rhw = rhw ? 1 / rhw : 1;
              offset = (row * 4 + col) * stride;
              vData[offset + 0] = (m.m00 * x + m.m04 * y + m.m12) * rhw;
              vData[offset + 1] = (m.m01 * x + m.m05 * y + m.m13) * rhw;
              vData[offset + 2] = (m.m02 * x + m.m06 * y + m.m14) * rhw;
            }
          }
        };

        _proto.updateUVs = function updateUVs(sprite) {
          if (!sprite.spriteFrame) return;
          var renderData = sprite.renderData;
          var vData = renderData.chunk.vb;
          var stride = renderData.floatStride;
          var uv = sprite.spriteFrame.uvSliced;
          var uvOffset = 3;

          for (var _i = 0; _i < 16; _i++) {
            vData[uvOffset] = uv[_i].u;
            vData[uvOffset + 1] = uv[_i].v;
            uvOffset += stride;
          }
        };

        _proto.updateColor = function updateColor(sprite) {
          var renderData = sprite.renderData;
          var vData = renderData.chunk.vb;
          var stride = renderData.floatStride;
          var colorOffset = 5;
          var color = sprite.color;
          var colorR = color.r / 255;
          var colorG = color.g / 255;
          var colorB = color.b / 255;
          var colorA = sprite.node._uiProps.opacity;

          for (var _i2 = 0; _i2 < 16; _i2++) {
            vData[colorOffset] = colorR;
            vData[colorOffset + 1] = colorG;
            vData[colorOffset + 2] = colorB;
            vData[colorOffset + 3] = colorA;
            colorOffset += stride;
          }
        };

        return FLMultitySlicedAssembler;
      }(FLMultityAssembler2D));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FLMultitySprite.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './FLMultiVertexFormat.ts', './FLEditorUtil2.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, RenderData, SpriteFrame, Sprite, vfmtPosUvColorMultiUI, FLEditorUtil;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      RenderData = module.RenderData;
      SpriteFrame = module.SpriteFrame;
      Sprite = module.Sprite;
    }, function (module) {
      vfmtPosUvColorMultiUI = module.vfmtPosUvColorMultiUI;
    }, function (module) {
      FLEditorUtil = module.default;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _class3;

      cclegacy._RF.push({}, "f7616z9DbpJfrLj+XhaTL90", "FLMultitySprite", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          executeInEditMode = _decorator.executeInEditMode,
          menu = _decorator.menu;
      var FLMultitySprite = exports('default', (_dec = ccclass('FLMultitySprite'), _dec2 = menu('FLMultiUI/FLMultitySprite'), _dec3 = property({
        serializable: false
      }), _dec4 = property({
        visible: true
      }), _dec(_class = executeInEditMode(_class = _dec2(_class = (_class2 = (_class3 = /*#__PURE__*/function (_Sprite) {
        _inheritsLoose(FLMultitySprite, _Sprite);

        function FLMultitySprite() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Sprite.call.apply(_Sprite, [this].concat(args)) || this; //useMultityUI: boolean = true;

          _initializerDefineProperty(_this, "textureIndex", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "multiNodeIndex", _descriptor2, _assertThisInitialized(_this)); // @property({tooltip:"是否开启多纹理合批"})
          // useMultityUI: boolean = true;
          // @property({visible:false})
          // protected _flHue1 = 0;
          // @property({visible:false})
          // protected _flSaturation = 1;
          // @property({visible:false})
          // protected _flValue = 1;
          // @property({displayName:"色相[0-359]",tooltip:"精灵色相",group:"HSV",slide:true,step:1,range:[0,360]})
          // get flHue(){
          //     return this._flHue1;
          // }
          // set flHue(value){
          //     if(this._flHue1 === value){
          //         return;
          //     }
          //     this._flHue1 = value;
          //     this._markShaderDataChange();
          // }
          // @property({displayName:"饱和度[0-3.0]",tooltip:"精灵饱和度",group:"HSV",slide:true,step:0.1,range:[0,3]})
          // get flSaturation(){
          //     return this._flSaturation;
          // }
          // set flSaturation(value) {
          //     if(this._flSaturation === value){
          //         return;
          //     }
          //     this._flSaturation = value;
          //     this._markShaderDataChange();
          // }
          // @property({displayName:"色调[0-3.0]",tooltip:"精灵色调",group:"HSV",slide:true,step:0.1,range:[0,3]})
          // get flValue(){
          //     return this._flValue;
          // }
          // set flValue(value) {
          //     if(this._flValue === value){
          //         return;
          //     }
          //     this._flValue = value;
          //     this._markShaderDataChange();
          // }

          /** 自动切换材质 */


          _this.autoCheckMaterial = false;
          return _this;
        }

        var _proto = FLMultitySprite.prototype;
        /**后续考虑sprite的 color属性都将会转为 HSV格式传给shader*/
        // @property
        // get color (): Readonly<Color> {
        //     return this._color;
        // }
        // set color (value) {
        //     if (this._color.equals(value)) {
        //         return;
        //     }
        //     this._color.set(value);
        //     this._updateColor();
        //     if (EDITOR) {
        //         const clone = this._color.clone();
        //         this.node.emit(NodeEventType.COLOR_CHANGED, clone);
        //     }
        // }

        _proto.__preload = function __preload() {
          _Sprite.prototype.__preload.call(this); // this.updateMaterial();

        }
        /**继承自uiRender的渲染组件，如要重写onLoad方法，请务必调用super,否则原生端将不会绑定，渲染不出来 */
        ;

        _proto.onLoad = function onLoad() {
          // -1表示采用多纹理渲染
          this.node.flTextureIndex = -1;

          _Sprite.prototype.onLoad.call(this);
        };

        _proto.resetInEditor = function resetInEditor() {
          var _this2 = this;

          FLEditorUtil.load("resources/shaders/multi-texture-2d.mtl").then(function (mat) {
            if (mat) {
              _this2.customMaterial = mat;
            }
          });
        }
        /**
        * @en Request new render data object.
        * @zh 请求新的渲染数据对象。
        * @return @en The new render data. @zh 新的渲染数据。
        */
        //__private._cocos_2d_renderer_render_draw_info__RenderDrawInfoType.COMP
        ;

        _proto.requestRenderData = function requestRenderData(drawInfoType) {
          if (drawInfoType === void 0) {
            drawInfoType = 0;
          } //定义新的渲染数据格式


          var data = RenderData.add(vfmtPosUvColorMultiUI);
          data.initRenderDrawInfo(this, drawInfoType);
          this._renderData = data;
          return data;
        };

        _proto._render = function _render(render) {
          //return super._render(render);
          // this.updateMaterial();
          if (window.FLMultityUIMgr) {
            window.FLMultityUIMgr.commitCompBatch(render, this, this.renderData, this._spriteFrame, this._assembler, null);
          } // if(this._assembler){
          //     this._assembler.fillMultityExtData(this);
          // }

        };

        _proto._flushAssembler = function _flushAssembler() {
          var assembler = FLMultitySprite.Assembler.getAssembler(this);

          if (this._assembler !== assembler) {
            this.destroyRenderData();
            this._assembler = assembler;
          }

          if (!this._renderData) {
            if (this._assembler && this._assembler.createData) {
              this._renderData = this._assembler.createData(this);
              this._renderData.material = this.material;
              this.markForUpdateRenderData();

              if (this.spriteFrame) {
                this._assembler.updateUVs(this);
              }

              this._updateColor(); // assembler.fillMultityExtData && assembler.fillMultityExtData(this);

            }
          } // Only Sliced type need update uv when sprite frame insets changed


          if (this._spriteFrame) {
            if (this._type === FLMultitySprite.Type.SLICED) {
              //@ts-ignore
              this._spriteFrame.on(SpriteFrame.EVENT_UV_UPDATED, this._updateUVs, this);
            } else {
              //@ts-ignore
              this._spriteFrame.off(SpriteFrame.EVENT_UV_UPDATED, this._updateUVs, this);
            }
          }
        };

        _proto.updateMaterial = function updateMaterial() {
          if (this._customMaterial) {
            if (this.getSharedMaterial(0) !== this._customMaterial) {
              this.setMaterial(this._customMaterial, 0);
            }

            var mt = this.material;
            var flMultityUIMgr = window.FLMultityUIMgr;
            var textureType = mt.getDefine("TEXTURES_TYPE");

            if (textureType === undefined || textureType === null) {
              // console.warn(this.node.name + " sprite : No TEXTURES_TYPE , Please Use `multi-texture` material.");
              return;
            } // let flMultityUIMgr = window.FLMultityUIMgr;


            if (flMultityUIMgr) {
              var index = flMultityUIMgr.TEXTURES_INDEX; // mt.recompileShaders({
              //     TEXTURES_TYPE: index,
              //     // USE_HSV_COLOR:false
              // });

              this.getMaterialInstance(0).recompileShaders({
                TEXTURES_TYPE: index,
                USE_HSV_COLOR: true
              });
            }

            return;
          } else {
            //应该报一个错
            return;
          }
        }
        /**
         * 更新HSV颜色
         * @returns 
         */
        ;

        _proto.updateHSVCorlorData = function updateHSVCorlorData() {
          if (!this._customMaterial) {
            return;
          }

          if (this._assembler && this._assembler.fillMultityExtData) {
            this._assembler.fillMultityExtData(this);
          }
        }
        /**
         * 设置材质属性
         * @param name 
         * @param val 
         * @returns 
         */
        ;

        _proto._setProperty = function _setProperty(name, val) {
          /**
           * _customMaterial自定义材质为共享材质，修改它会影响其它所有的材质实例，共享材质可以合批
           * material 为材质实例，修改它只会影响自己，但是无法参与合批
           */
          if (!this._customMaterial) {
            return;
          } //this._customMaterial.setProperty(name,val);
          //频繁刷新这样效率更高


          var pass = this._customMaterial.passes[0];
          var handler = pass.getHandle(name);
          pass.setUniform(handler, val);
        };

        _proto._markShaderDataChange = function _markShaderDataChange() {//更新材质之前，传递HSV颜色值进去
          // this.updateHSVCorlorData();
          // this.updateMaterial();
          // this.markForUpdateRenderData(true);
          // this._flushAssembler();
        }
        /**
         * 重载onDestroy时请务必调用super.onDestroy();
         * @returns 
         */
        ;

        _proto.onDestroy = function onDestroy() {
          _Sprite.prototype.onDestroy.call(this);

          return FLMultitySprite.callSuperOnDestroy;
        } // input: r,g,b in [0,1], out: h in [0,360) and s,v in [0,1]
        ;

        _proto.rgbConvertToHSV = function rgbConvertToHSV(r, g, b) {
          var v = Math.max(r, g, b),
              c = v - Math.min(r, g, b);
          var h = c && (v == r ? (g - b) / c : v == g ? 2 + (b - r) / c : 4 + (r - g) / c);
          return [60 * (h < 0 ? h + 6 : h), v && c / v, v];
        };

        _proto.f = function f(n, h, s, v) {
          var k = (n + h / 60) % 6;
          return v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
        };

        _proto.hsvConvertToRGB = function hsvConvertToRGB(h, s, v, f) {
          if (!f) {
            f = function f(n, k) {
              if (k === void 0) {
                k = (n + h / 60) % 6;
              }

              return v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
            };
          }

          return [f(5), f(3), f(1)];
        };

        _proto._updateColor = function _updateColor() {
          _Sprite.prototype._updateColor.call(this);
        };

        _createClass(FLMultitySprite, [{
          key: "grayscale",
          get: function get() {
            return this._useGrayscale;
          },
          set: function set(value) {
            if (this._useGrayscale === value) {
              return;
            }

            this._useGrayscale = value; //多纹理使用hsv颜色模式

            var mt = this.material;
            mt.recompileShaders({
              IS_GRAY: value
            });
          }
        }]);

        return FLMultitySprite;
      }(Sprite), _class3.callSuperOnDestroy = Symbol('Calling super.onDestroy is mandatory'), _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "textureIndex", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return -1;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "multiNodeIndex", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      })), _class2)) || _class) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FLMultityTiledAssembler.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './FLMultityAssembler2D.ts'], function (exports) {
  var _inheritsLoose, cclegacy, Mat4, Color, FLMultityAssembler2D;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      Mat4 = module.Mat4;
      Color = module.Color;
    }, function (module) {
      FLMultityAssembler2D = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "49eed1e7T5FJa1jlZ2QY8MR", "FLMultityTiledAssembler", undefined);

      var m = new Mat4();
      var origin;
      var leftInner;
      var rightInner;
      var rightOuter;
      var bottomInner;
      var topInner;
      var topOuter;
      var tempRenderDataLength = 0;
      var tempRenderData = [];
      var QUAD_INDICES = null;

      function has9SlicedOffsetVertexCount(spriteFrame) {
        if (spriteFrame) {
          if (spriteFrame.insetTop > 0 || spriteFrame.insetBottom > 0 || spriteFrame.insetLeft > 0 || spriteFrame.insetRight > 0) {
            return 2; // left + right
          }
        }

        return 0;
      }

      var FLMultityTiledAssembler = exports('FLMultityTiledAssembler', /*#__PURE__*/function (_FLMultityAssembler2D) {
        _inheritsLoose(FLMultityTiledAssembler, _FLMultityAssembler2D);

        function FLMultityTiledAssembler() {
          return _FLMultityAssembler2D.apply(this, arguments) || this;
        }

        var _proto = FLMultityTiledAssembler.prototype;

        _proto.createData = function createData(sprite) {
          return sprite.requestRenderData();
        };

        _proto.updateRenderData = function updateRenderData(sprite) {
          var renderData = sprite.renderData;
          var frame = sprite.spriteFrame;

          if (!frame || !renderData) {
            return;
          }

          if (!renderData.vertDirty) {
            return;
          } // if(renderData.chunk) {
          //     this.updateTextureIdx(sprite);
          // }


          var uiTrans = sprite.node._uiProps.uiTransformComp;
          var contentWidth = Math.abs(uiTrans.width);
          var contentHeight = Math.abs(uiTrans.height);
          var rect = frame.getRect();
          var leftWidth = frame.insetLeft;
          var rightWidth = frame.insetRight;
          var centerWidth = rect.width - leftWidth - rightWidth;
          var topHeight = frame.insetTop;
          var bottomHeight = frame.insetBottom;
          var centerHeight = rect.height - topHeight - bottomHeight;
          var sizableWidth = contentWidth - leftWidth - rightWidth;
          var sizableHeight = contentHeight - topHeight - bottomHeight;
          sizableWidth = sizableWidth > 0 ? sizableWidth : 0;
          sizableHeight = sizableHeight > 0 ? sizableHeight : 0;
          var hRepeat = centerWidth === 0 ? sizableWidth : sizableWidth / centerWidth;
          var vRepeat = centerHeight === 0 ? sizableHeight : sizableHeight / centerHeight;
          var offsetVertexCount = has9SlicedOffsetVertexCount(frame);
          var row = Math.ceil(vRepeat + offsetVertexCount);
          var col = Math.ceil(hRepeat + offsetVertexCount);
          renderData.dataLength = row * 2 * (col * 2);
          this.updateVerts(sprite, sizableWidth, sizableHeight, row, col);

          if (renderData.vertexCount !== row * col * 4) {
            sprite.renderEntity.colorDirty = true;
          } // update data property


          renderData.resize(row * col * 4, row * col * 6);
          /**更新HSV颜色数据， native/ts通用 */

          if (this.fillMultityExtData) {
            this.fillMultityExtData(sprite);
          }

          renderData.updateRenderData(sprite, frame);
        };

        _proto.createQuadIndices = function createQuadIndices(indexCount) {
          if (indexCount % 6 !== 0) {
            console.error('illegal index count!');
            return;
          }

          var quadCount = indexCount / 6;
          QUAD_INDICES = null;
          QUAD_INDICES = new Uint16Array(indexCount);
          var offset = 0;

          for (var i = 0; i < quadCount; i++) {
            QUAD_INDICES[offset++] = 0 + i * 4;
            QUAD_INDICES[offset++] = 1 + i * 4;
            QUAD_INDICES[offset++] = 2 + i * 4;
            QUAD_INDICES[offset++] = 1 + i * 4;
            QUAD_INDICES[offset++] = 3 + i * 4;
            QUAD_INDICES[offset++] = 2 + i * 4;
          }
        } // dirty Mark
        // the real update uv is on updateWorldUVData
        ;

        _proto.updateUVs = function updateUVs(sprite) {
          var renderData = sprite.renderData;
          renderData.vertDirty = true;
          sprite.markForUpdateRenderData();
        };

        _proto.fillBuffers = function fillBuffers(sprite, renderer) {
          var node = sprite.node;
          var renderData = sprite.renderData;
          var chunk = renderData.chunk; //@ts-ignore

          if (sprite._flagChangedVersion !== node.flagChangedVersion || renderData.vertDirty) {
            this.updateWorldVertexAndUVData(sprite, chunk);
            renderData.vertDirty = false; //@ts-ignore

            sprite._flagChangedVersion = node.flagChangedVersion;
          } // forColor


          this.updateColorLate(sprite); // update indices

          var bid = chunk.bufferId;
          var vid = chunk.vertexOffset;
          var meshBuffer = chunk.meshBuffer;
          var ib = chunk.meshBuffer.iData;
          var indexOffset = meshBuffer.indexOffset;

          for (var i = 0; i < renderData.indexCount; i += 6) {
            ib[indexOffset++] = vid;
            ib[indexOffset++] = vid + 1;
            ib[indexOffset++] = vid + 2;
            ib[indexOffset++] = vid + 1;
            ib[indexOffset++] = vid + 3;
            ib[indexOffset++] = vid + 2;
            vid += 4;
            meshBuffer.indexOffset += 6;
          }

          meshBuffer.setDirty();
        };

        _proto.updateWorldUVData = function updateWorldUVData(sprite) {
          var renderData = sprite.renderData;
          var stride = renderData.floatStride;
          var dataList = renderData.data;
          var vData = renderData.chunk.vb;

          for (var i = 0; i < dataList.length; i++) {
            var offset = i * stride;
            vData[offset + 3] = dataList[i].u;
            vData[offset + 4] = dataList[i].v;
          }
        } // only for TS
        ;

        _proto.updateWorldVertexAndUVData = function updateWorldVertexAndUVData(sprite, chunk) {
          var node = sprite.node;
          node.getWorldMatrix(m);
          var renderData = sprite.renderData;
          var stride = renderData.floatStride;
          var dataList = renderData.data;
          var vData = chunk.vb;
          var length = dataList.length;

          for (var i = 0; i < length; i++) {
            var x = dataList[i].x;
            var y = dataList[i].y;
            var z = dataList[i].z;
            var rhw = m.m03 * x + m.m07 * y + m.m11 * z + m.m15;
            rhw = rhw ? 1 / rhw : 1;
            var offset = i * stride;
            vData[offset] = (m.m00 * x + m.m04 * y + m.m08 * z + m.m12) * rhw;
            vData[offset + 1] = (m.m01 * x + m.m05 * y + m.m09 * z + m.m13) * rhw;
            vData[offset + 2] = (m.m02 * x + m.m06 * y + m.m10 * z + m.m14) * rhw;
          }

          this.updateWorldUVData(sprite);
        };

        _proto.updateVerts = function updateVerts(sprite, sizableWidth, sizableHeight, row, col) {
          var uiTrans = sprite.node._uiProps.uiTransformComp;
          var renderData = sprite.renderData;
          var dataList = renderData.data;
          var frame = sprite.spriteFrame;
          var rect = frame.rect;
          var contentWidth = Math.abs(uiTrans.width);
          var contentHeight = Math.abs(uiTrans.height);
          var appx = uiTrans.anchorX * contentWidth;
          var appy = uiTrans.anchorY * contentHeight;
          var leftWidth = frame.insetLeft;
          var rightWidth = frame.insetRight;
          var centerWidth = rect.width - leftWidth - rightWidth;
          var topHeight = frame.insetTop;
          var bottomHeight = frame.insetBottom;
          var centerHeight = rect.height - topHeight - bottomHeight;
          var xScale = uiTrans.width / (leftWidth + rightWidth) > 1 ? 1 : uiTrans.width / (leftWidth + rightWidth);
          var yScale = uiTrans.height / (topHeight + bottomHeight) > 1 ? 1 : uiTrans.height / (topHeight + bottomHeight);
          var offsetWidth = 0;
          var offsetHeight = 0;

          if (centerWidth > 0) {
            /*
             * Because the float numerical calculation in javascript is not accurate enough,
             * there is an expected result of 1.0, but the actual result is 1.000001.
             */
            offsetWidth = Math.floor(sizableWidth * 1000) / 1000 % centerWidth === 0 ? centerWidth : sizableWidth % centerWidth;
          } else {
            offsetWidth = sizableWidth;
          }

          if (centerHeight > 0) {
            offsetHeight = Math.floor(sizableHeight * 1000) / 1000 % centerHeight === 0 ? centerHeight : sizableHeight % centerHeight;
          } else {
            offsetHeight = sizableHeight;
          } // 临时变量存前置数据


          tempRenderData.length = 0;
          tempRenderDataLength = Math.max(row + 1, col + 1);

          for (var i = 0; i < tempRenderDataLength; i++) {
            tempRenderData.push({
              x: 0,
              y: 0,
              z: 0,
              u: 0,
              v: 0,
              color: new Color()
            });
          }

          var offsetVertexCount = has9SlicedOffsetVertexCount(frame);

          if (offsetVertexCount === 0) {
            for (var _i = 0; _i < tempRenderDataLength; _i++) {
              // for x
              if (_i >= col) {
                tempRenderData[_i].x = contentWidth - appx;
              } else {
                tempRenderData[_i].x = -appx + _i * centerWidth;
              } // for y


              if (_i >= row) {
                tempRenderData[_i].y = contentHeight - appy;
              } else {
                tempRenderData[_i].y = -appy + _i * centerHeight;
              }
            }
          } else {
            for (var _i2 = 0; _i2 < tempRenderDataLength; _i2++) {
              // for x
              if (_i2 === 0) {
                tempRenderData[_i2].x = -appx;
              } else if (_i2 === 1) {
                tempRenderData[_i2].x = -appx + leftWidth * xScale;
              } else if (_i2 > 1 && _i2 < col - 1) {
                if (centerWidth > 0) {
                  tempRenderData[_i2].x = -appx + leftWidth * xScale + centerWidth * (_i2 - 1);
                } else {
                  tempRenderData[_i2].x = leftWidth + sizableWidth - appx;
                }
              } else if (_i2 === col - 1) {
                tempRenderData[_i2].x = -appx + leftWidth * xScale + offsetWidth + centerWidth * (_i2 - 2);
              } else if (_i2 >= col) {
                tempRenderData[_i2].x = Math.min(leftWidth + sizableWidth + rightWidth, contentWidth) - appx;
              } // for y


              if (_i2 === 0) {
                tempRenderData[_i2].y = -appy;
              } else if (_i2 === 1) {
                tempRenderData[_i2].y = -appy + bottomHeight * yScale;
              } else if (_i2 > 1 && _i2 < row - 1) {
                if (centerHeight > 0) {
                  tempRenderData[_i2].y = -appy + bottomHeight * yScale + centerHeight * (_i2 - 1);
                } else {
                  tempRenderData[_i2].y = bottomHeight + sizableHeight - appy;
                }
              } else if (_i2 === row - 1) {
                tempRenderData[_i2].y = -appy + bottomHeight * yScale + offsetHeight + centerHeight * (_i2 - 2);
              } else if (_i2 >= row) {
                tempRenderData[_i2].y = Math.min(bottomHeight + sizableHeight + topHeight, contentHeight) - appy;
              }
            }
          } // 填datalist


          var x = 0;
          var x1 = 0;
          var y = 0;
          var y1 = 0;

          for (var yIndex = 0; yIndex < row; ++yIndex) {
            y = tempRenderData[yIndex].y;
            y1 = tempRenderData[yIndex + 1].y;

            for (var xIndex = 0; xIndex < col; ++xIndex) {
              x = tempRenderData[xIndex].x;
              x1 = tempRenderData[xIndex + 1].x; // 4 vertices in a rect

              var curIndex = 4 * (yIndex * col + xIndex); //left bottom

              dataList[curIndex].x = x;
              dataList[curIndex].y = y; //right bottom

              dataList[curIndex + 1].x = x1;
              dataList[curIndex + 1].y = y; //left top

              dataList[curIndex + 2].x = x;
              dataList[curIndex + 2].y = y1; //right top

              dataList[curIndex + 3].x = x1;
              dataList[curIndex + 3].y = y1;
            }
          }

          var rotated = frame.rotated;
          var uv = frame.uv;
          var uvSliced = frame.uvSliced; // origin at left bottom

          origin = uvSliced[0]; // on bottom edge

          leftInner = uvSliced[1];
          rightInner = uvSliced[2];
          rightOuter = uvSliced[3]; // on left edge

          bottomInner = uvSliced[4];
          topInner = uvSliced[8];
          topOuter = uvSliced[12];
          var coefU = 0;
          var coefV = 0;
          var hRepeat = centerWidth === 0 ? sizableWidth : sizableWidth / centerWidth;
          var vRepeat = centerHeight === 0 ? sizableHeight : sizableHeight / centerHeight;
          var tempXVerts = [];
          var tempYVerts = [];

          for (var yIndexUV = 0; yIndexUV < row; ++yIndexUV) {
            if (sizableHeight > centerHeight) {
              //if 9 sliced, we should exclude bottom border vertex (yIndex-1)
              var curYRectCount = offsetVertexCount > 0 ? yIndexUV : yIndexUV + 1; // The height of the rect which contains the left bottom vertex in current loop should be calculated in total height.

              if (sizableHeight >= curYRectCount * centerHeight) {
                coefV = 1;
              } else {
                coefV = vRepeat % 1;
              }
            } else {
              coefV = vRepeat;
            }

            for (var xIndexUV = 0; xIndexUV < col; ++xIndexUV) {
              if (sizableWidth > centerWidth) {
                //if 9 sliced, we should exclude left border vertex (xIndex-1)
                var curXRectCount = offsetVertexCount > 0 ? xIndexUV : xIndexUV + 1; // The width of the rect which contains the left bottom vertex in current loop should be calculated in total width.
                // Example: xIndex = 2 means that these is the third vertex, we should take the rect whose left bottom vertex is this
                // vertex into account, so the following condition should be comparing the values of content size and (2+1)*centerWidth.

                if (sizableWidth >= curXRectCount * centerWidth) {
                  coefU = 1;
                } else {
                  coefU = hRepeat % 1;
                }
              } else {
                coefU = hRepeat;
              }

              if (rotated) {
                if (offsetVertexCount === 0) {
                  //无九宫
                  tempXVerts[0] = bottomInner.u;
                  tempXVerts[1] = bottomInner.u;
                  tempXVerts[2] = bottomInner.u + (topInner.u - bottomInner.u) * coefV;
                  tempYVerts[0] = leftInner.v;
                  tempYVerts[1] = leftInner.v + (rightInner.v - leftInner.v) * coefU;
                  tempYVerts[2] = leftInner.v;
                } else {
                  //有九宫
                  if (yIndexUV === 0) {
                    tempXVerts[0] = origin.u;
                    tempXVerts[1] = origin.u;
                    tempXVerts[2] = bottomInner.u;
                  } else if (yIndexUV < row - 1) {
                    tempXVerts[0] = bottomInner.u;
                    tempXVerts[1] = bottomInner.u;
                    tempXVerts[2] = bottomInner.u + (topInner.u - bottomInner.u) * coefV;
                  } else if (yIndexUV === row - 1) {
                    tempXVerts[0] = topInner.u;
                    tempXVerts[1] = topInner.u;
                    tempXVerts[2] = topOuter.u;
                  }

                  if (xIndexUV === 0) {
                    tempYVerts[0] = origin.v;
                    tempYVerts[1] = leftInner.v;
                    tempYVerts[2] = origin.v;
                  } else if (xIndexUV < col - 1) {
                    tempYVerts[0] = leftInner.v;
                    tempYVerts[1] = leftInner.v + (rightInner.v - leftInner.v) * coefU;
                    tempYVerts[2] = leftInner.v;
                  } else if (xIndexUV === col - 1) {
                    tempYVerts[0] = rightInner.v;
                    tempYVerts[1] = rightOuter.v;
                    tempYVerts[2] = rightInner.v;
                  }
                }

                tempXVerts[3] = tempXVerts[2];
                tempYVerts[3] = tempYVerts[1];
              } else {
                if (offsetVertexCount === 0) {
                  //无九宫
                  tempXVerts[0] = leftInner.u;
                  tempXVerts[1] = leftInner.u + (rightInner.u - leftInner.u) * coefU;
                  tempXVerts[2] = leftInner.u;
                  tempYVerts[0] = bottomInner.v;
                  tempYVerts[1] = bottomInner.v;
                  tempYVerts[2] = bottomInner.v + (topInner.v - bottomInner.v) * coefV;
                } else {
                  //有九宫
                  if (xIndexUV === 0) {
                    tempXVerts[0] = origin.u;
                    tempXVerts[1] = leftInner.u;
                    tempXVerts[2] = origin.u;
                  } else if (xIndexUV < col - 1) {
                    tempXVerts[0] = leftInner.u;
                    tempXVerts[1] = leftInner.u + (rightInner.u - leftInner.u) * coefU;
                    tempXVerts[2] = leftInner.u;
                  } else if (xIndexUV === col - 1) {
                    tempXVerts[0] = rightInner.u;
                    tempXVerts[1] = rightOuter.u;
                    tempXVerts[2] = rightInner.u;
                  }

                  if (yIndexUV === 0) {
                    tempYVerts[0] = origin.v;
                    tempYVerts[1] = origin.v;
                    tempYVerts[2] = bottomInner.v;
                  } else if (yIndexUV < row - 1) {
                    tempYVerts[0] = bottomInner.v;
                    tempYVerts[1] = bottomInner.v;
                    tempYVerts[2] = bottomInner.v + (topInner.v - bottomInner.v) * coefV;
                  } else if (yIndexUV === row - 1) {
                    tempYVerts[0] = topInner.v;
                    tempYVerts[1] = topInner.v;
                    tempYVerts[2] = topOuter.v;
                  }
                }

                tempXVerts[3] = tempXVerts[1];
                tempYVerts[3] = tempYVerts[2];
              } // it represents the left bottom corner vertex of a rect


              var _curIndex = 4 * (yIndexUV * col + xIndexUV); // lb


              dataList[_curIndex].u = tempXVerts[0];
              dataList[_curIndex].v = tempYVerts[0]; // rb

              dataList[_curIndex + 1].u = tempXVerts[1];
              dataList[_curIndex + 1].v = tempYVerts[1]; // lt

              dataList[_curIndex + 2].u = tempXVerts[2];
              dataList[_curIndex + 2].v = tempYVerts[2]; // rt

              dataList[_curIndex + 3].u = tempXVerts[3];
              dataList[_curIndex + 3].v = tempYVerts[3];
            }
          }
        } // fill color here
        ;

        _proto.updateColorLate = function updateColorLate(sprite) {
          var renderData = sprite.renderData;
          var vData = renderData.chunk.vb;
          var stride = renderData.floatStride;
          var vertexCount = renderData.vertexCount;
          var colorOffset = 5;
          var color = sprite.color;
          var colorR = color.r / 255;
          var colorG = color.g / 255;
          var colorB = color.b / 255;
          var colorA = sprite.node._uiProps.opacity;

          for (var i = 0; i < vertexCount; i++) {
            vData[colorOffset] = colorR;
            vData[colorOffset + 1] = colorG;
            vData[colorOffset + 2] = colorB;
            vData[colorOffset + 3] = colorA;
            colorOffset += stride;
          }
        } // Too early
        ;

        _proto.updateColor = function updateColor(sprite) {};

        return FLMultityTiledAssembler;
      }(FLMultityAssembler2D));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FLMultityTiledLayer.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, TiledLayer;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      TiledLayer = module.TiledLayer;
    }],
    execute: function () {
      var _dec, _dec2, _class;

      cclegacy._RF.push({}, "d8591pA4D5PQ5szz9GnaKgi", "FLMultityTiledLayer", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          executeInEditMode = _decorator.executeInEditMode,
          menu = _decorator.menu;
      var FLMultityTiledLayer = exports('default', (_dec = ccclass('FLMultityTiledLayer'), _dec2 = menu('FLMultiUI/FLMultityTileLayer'), _dec(_class = executeInEditMode(_class = _dec2(_class = /*#__PURE__*/function (_TiledLayer) {
        _inheritsLoose(FLMultityTiledLayer, _TiledLayer);

        function FLMultityTiledLayer() {
          return _TiledLayer.apply(this, arguments) || this;
        }

        return FLMultityTiledLayer;
      }(TiledLayer)) || _class) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FLMultityUIManager.ts", ['cc', './FLMultiUISetting.ts', './FLEditorUtil.ts'], function () {
  var cclegacy, game, Game, isValid, resources, Material, Texture2D, Sprite, Label, SpriteFrame, TiledLayer, sp, StencilManager, assert, FLMultiUISetting;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      game = module.game;
      Game = module.Game;
      isValid = module.isValid;
      resources = module.resources;
      Material = module.Material;
      Texture2D = module.Texture2D;
      Sprite = module.Sprite;
      Label = module.Label;
      SpriteFrame = module.SpriteFrame;
      TiledLayer = module.TiledLayer;
      sp = module.sp;
      StencilManager = module.StencilManager;
      assert = module.assert;
    }, function (module) {
      FLMultiUISetting = module.FLMultiUISetting;
    }, null],
    execute: function () {
      cclegacy._RF.push({}, "309e2LrfwNLkLagpTq2fUuB", "FLMultityUIManager", undefined);

      var FLMultityUIManager = /*#__PURE__*/function () {
        function FLMultityUIManager() {
          //最大图集数量
          this.maxTexturesNum = 4;
          this.TEXTURES_INDEX = 1;
          this.emptyTexture = void 0;
          this.maxMultiNodeIndex = 0; //是否强制打断合批

          this.forceBreak = false; //当前的图集id

          this.curTextureIndex = 0;
          /**存放每个贴图id对应的图集index Map<贴图id,图集index>*/

          this.addedTextures = {};
          /**存放每个渲染节点的node index对应的 渲染组件 Map<节点index,节点渲染器> */

          this.addedSprites = {};
          /**多纹理材质 */

          this.multiUIMaterial = void 0;
          /**当前渲染的材质*/

          this.curRenderMaterial = void 0;
        } // public isUseMuilyityJSB = !!JSB;


        FLMultityUIManager.getInstance = function getInstance() {
          if (!this._instance) {
            this._instance = new FLMultityUIManager();

            this._instance.init();
          }

          return this._instance;
        };

        var _proto = FLMultityUIManager.prototype;

        _proto.init = function init() {
          var _this = this;

          this.emptyTexture = this.createEmptyTexture();
          game.on(Game.EVENT_HIDE, function () {
            _this.reset();

            _this.forceBreak = true;
          });
          game.on(Game.EVENT_POST_PROJECT_INIT, function () {
            _this.maxTexturesNum = FLMultiUISetting.maxTexturesNum;
            _this.TEXTURES_INDEX = FLMultiUISetting.TEXTURES_INDEX; //将合批的材质加载到内存中来

            _this.preloadMultiUIMaterial();
          });
          this.preloadMultiUIMaterial();
          this.reset();
        };

        _proto.preloadMultiUIMaterial = function preloadMultiUIMaterial() {
          var _this2 = this;

          if (isValid(this.multiUIMaterial)) {
            return;
          }

          var mtPath = 'shaders/multi-texture-2d';
          resources.load(mtPath, Material, function (error, result) {
            if (error || !result) {
              console.error("[EditorTool.load] \u8D44\u6E90\u52A0\u8F7D\u5931\u8D25 url: " + mtPath, error);
              return;
            } // console.warn("resources.load.multiUIMaterial",result);
            //运行时未实现Material instantiate
            // this.multiUIMaterial = instantiate(result);


            _this2.multiUIMaterial = result; // this.multiUIMaterial.recompileShaders({
            //     "TEXTURES_TYPE": FLMultiUISetting.TEXTURES_INDEX,
            //     USE_HSV_COLOR:true
            // });
            //动态引用的资源需要手动增加引用计数，否则当被销毁时会直接删除掉

            result.addRef();
            _this2.multiUIMaterial.__destroy = _this2.multiUIMaterial.destroy;

            _this2.multiUIMaterial.destroy = function () {
              this.multiUIMaterial.__destroy();
            };

            _this2.multiUIMaterial.__decRef = _this2.multiUIMaterial.decRef;

            _this2.multiUIMaterial.decRef = function (autoRelease) {
              if (this._ref > 0) {
                this._ref--;
              }

              if (autoRelease) {
                //@ts-ignore
                assetManager._releaseManager.tryRelease(this);
              }

              return this;
            };
          });
        }
        /**
         * 创建于一个空的纹理
         * @returns 
         */
        ;

        _proto.createEmptyTexture = function createEmptyTexture() {
          var textureData = Texture2D.PixelFormat.RGBA8888;
          var buffer = new ArrayBuffer(4);
          var data = new Uint8Array(buffer);
          var texture = new Texture2D();
          texture.reset({
            width: 1,
            height: 1,
            format: textureData
          });
          texture.uploadData(data);
          return texture;
        };

        _proto.reset = function reset(mt, com) {
          // this.curRenderMaterial = undefined;
          this.forceBreak = false;
          this.curTextureIndex = 0;
          this.addedSprites = {};
          this.addedTextures = {};

          if (com) {
            return;
          }

          if (mt && !mt.__flTexturesInited && this.emptyTexture) {
            var textureType = mt.getDefine("TEXTURES_TYPE");

            if (textureType === undefined || textureType === null) {
              //console.warn(com?.node.name + " : No TEXTURES_TYPE , Please Use `multi-texture` material.");
              return;
            }

            mt.__flTexturesInited = true;
          }
        };

        _proto.setProperty = function setProperty(mt, propertyName, propertyVal) {
          if (!mt) {
            return;
          }

          var pass = mt.passes[0];
          var handler = pass == null ? void 0 : pass.getHandle(propertyName);

          if (!handler) {
            return;
          }
          /**texture类型的数据无法使用pass传递 */
          // pass?.setUniform(handler, propertyVal);


          mt.setProperty(propertyName, propertyVal, 0); //采用pass减少开销
          // const binding = renderer.Pass.getBindingFromHandle(handler);
          // pass.bindTexture(binding,propertyVal);
        };

        _proto.getTextureByComponent = function getTextureByComponent(com) {
          var texture;

          if (com instanceof Sprite) {
            var _com$spriteFrame;

            texture = (_com$spriteFrame = com.spriteFrame) == null ? void 0 : _com$spriteFrame.texture;
          }

          if (com instanceof Label) {
            if (com.spriteFrame instanceof SpriteFrame) {
              var _com$spriteFrame2;

              texture = (_com$spriteFrame2 = com.spriteFrame) == null ? void 0 : _com$spriteFrame2.texture;
            } else {
              texture = com.spriteFrame;
            }
          }

          if (com instanceof TiledLayer) {
            var tex = com.getTexture();

            if (tex instanceof SpriteFrame) {
              texture = tex == null ? void 0 : tex.texture;
            } else {
              texture = tex;
            }
          }

          if (com instanceof sp.Skeleton && com.skeletonData && com.skeletonData.textures) {
            texture = com.skeletonData.textures[0];
          }

          return texture;
        };

        _proto.checkTexturesFull = function checkTexturesFull() {
          return this.curTextureIndex >= this.maxTexturesNum;
        };

        _proto.addTextureWithMaterial = function addTextureWithMaterial(mt, com) {
          if (!com) {
            return false;
          }

          var texture = this.getTextureByComponent(com);
          var node = com.node;

          if (!texture) {
            console.error("当前UI渲染器无图集");
            node.flTextureIndex = -1;
            com.textureIndex = -1;
            return false;
          }

          var gfsTexture = texture.getGFXTexture();
          var textureType = mt.getDefine("TEXTURES_TYPE");

          if (textureType === undefined || textureType === null) {
            //console.warn(com?.node.name + " : No TEXTURES_TYPE , Please Use `multi-texture` material.");
            return false;
          } //贴图的id


          var id = gfsTexture.objectID; //检测当前贴图是不是在这一批可参与合批的队列中

          var textureIndex = this.addedTextures[id];

          if (textureIndex !== undefined) {
            //可以直接合批
            node.flTextureIndex = textureIndex;
            com.textureIndex = textureIndex;
            return true;
          } //该贴图不在本次合批中，需要新贴图


          if (this.checkTexturesFull()) {
            //本次队列已经超出了可容纳的最大贴图,需要重建下一批渲染队列
            node.flTextureIndex = -1;
            com.textureIndex = -1;
            return false;
          }

          textureIndex = this.curTextureIndex;
          node.flTextureIndex = textureIndex;
          com.textureIndex = textureIndex;
          this.setProperty(mt, "texture" + node.flTextureIndex, gfsTexture);
          this.addedTextures[id] = textureIndex;
          this.curTextureIndex++;
          return true;
        };

        _proto.createNewRenderBatch = function createNewRenderBatch(mt, com) {
          if (!com) {
            return;
          }

          var texture = this.getTextureByComponent(com);
          var node = com.node;

          if (!texture) {
            console.error("当前UI渲染器无图集");
            node.flTextureIndex = -1;
            com.textureIndex = -1;
            return;
          }

          var textureType = mt.getDefine("TEXTURES_TYPE");

          if (textureType === undefined || textureType === null) {
            //console.warn(com?.node.name + " : No TEXTURES_TYPE , Please Use `multi-texture` material.");
            return;
          }

          var gfsTexture = texture.getGFXTexture(); //贴图的id

          var id = gfsTexture.objectID;
          node.flTextureIndex = 0;
          com.textureIndex = 0;
          this.addedTextures[id] = 0;
          this.setProperty(mt, "texture0", gfsTexture);
          this.curTextureIndex = 1;
        };

        _proto.checkJSBMuiltyBatch = function checkJSBMuiltyBatch(count) {
          console.log("checkJSBMuiltyBatch:" + count);
        };

        _proto.commitCompBatch = function commitCompBatch(render, comp, renderData, frame, assembler, transform) {
          this.commitCompCustom(render, comp, renderData, frame, assembler, transform);
        }
        /**
         * 合批hack
         * @param render 
         * @param comp 
         * @param renderData 
         * @param frame 
         * @param assembler 
         * @param transform 
         * @returns 
         */
        ;

        _proto.commitCompCustom = function commitCompCustom(render, comp, renderData, frame, assembler, transform) {
          var mt = comp.material;

          if (!mt) {
            return;
          }

          var bufferID = -1;

          if (renderData && renderData.chunk) {
            if (!renderData.isValid()) return;
            renderData.dataHash;
            renderData.material;
            bufferID = renderData.chunk.bufferId;
          } // Notice: A little hack, if it is for mask, not need update here, while control by stencilManger
          // if (comp.stencilStage === Stage.ENTER_LEVEL || comp.stencilStage === Stage.ENTER_LEVEL_INVERTED) {


          if (comp.stencilStage === 2 || comp.stencilStage === 6) {
            render._insertMaskBatch(comp);
          } else {
            comp.stencilStage = StencilManager.sharedManager.stage;
          }

          var depthStencilStateStage = comp.stencilStage;
          var flMultityUIMgr = window.FLMultityUIMgr;
          var rendererMaterial = render._currMaterial; //cocos datahash条件 bid + node.layer + texture.hash,因为使用了多纹理，去掉texture.hash条件
          //不能使用datahash，因为texturehash改变会导致datahash变化

          var renderDataHashFlag = render._currBID == bufferID && render._currLayer === comp.node.layer; //render._currBID == bufferID;//render._currHash !== dataHash || dataHash === 0;

          var mtHashFlag = Material.getHash(rendererMaterial) !== Material.getHash(mt); //正常可以合批的条件

          var breakBatchFlag = !renderDataHashFlag || mtHashFlag; //满足部分合批条件，这里检测是否可以合批

          if (rendererMaterial && !mtHashFlag && renderDataHashFlag) {
            flMultityUIMgr.addTextureWithMaterial(rendererMaterial, comp);

            if (comp.node.flTextureIndex == -1) {
              //超出了图集，重建渲染
              breakBatchFlag = true;
            }
          }

          if (breakBatchFlag) {
            render.autoMergeBatches(render._currComponent);

            if (renderData && !renderData._isMeshBuffer) {
              render.updateBuffer(renderData.vertexFormat, bufferID);
            }

            render._currRenderData = renderData;
            render._currHash = renderData ? renderData.dataHash : 0;
            render._currComponent = comp;
            render._currTransform = transform;
            render._currMaterial = comp.getRenderMaterial(0);
            render._currDepthStencilStateStage = depthStencilStateStage;
            render._currLayer = comp.node.layer;

            if (frame) {
              {
                assert(frame.isValid, 'frame should not be invalid, it may have been released');
              }
              render._currTexture = frame.getGFXTexture();
              render._currSampler = frame.getGFXSampler();
              render._currTextureHash = frame.getHash();
              render._currSamplerHash = render._currSampler.hash;
            } else {
              render._currTexture = null;
              render._currSampler = null;
              render._currTextureHash = 0;
              render._currSamplerHash = 0;
            }

            flMultityUIMgr.reset(render._currMaterial, comp);
            flMultityUIMgr.createNewRenderBatch(render._currMaterial, comp);
          } // assembler&&assembler.updateRenderData(this);
          // assembler.fillMultityExtData && assembler.fillMultityExtData(comp,render);


          assembler.fillBuffers(comp, render);

          if (comp._assembler) {
            if (renderData && renderData.chunk) {
              comp._assembler.updateTextureIdx(comp);
            }
          }
        };

        return FLMultityUIManager;
      }();

      FLMultityUIManager._instance = void 0;
      {
        // let FLMultityUIMgr = FLMultityUIManager.getInstance();
        window.FLMultityUIMgr = FLMultityUIManager.getInstance();
      }

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FLMultityUIRenderInterface.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "d511dbo0yxP7ox7Ga/2OW53", "FLMultityUIRenderInterface", undefined);
      /*
       * @Author: Feeling
       * @Date: 2023-09-12 09:59:02
       * @LastEditTime: 2024-10-09 11:44:04
       * @LastEditors: Feeling
       * @FilePath: \3.6.3\assets\fl-multity-ui\base\FLMultityUIRenderInterface.ts
       * @Description: 
       */
      // import FLSpriteMultity from "../flSprite/FLSpriteMultity";


      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FLMultiUICCExtend.ts", ['cc'], function () {
  var cclegacy, Material;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Material = module.Material;
    }],
    execute: function () {
      cclegacy._RF.push({}, "cbec2QNrclNiYj89SlBKy/C", "FLMultiUICCExtend", undefined);

      Material.prototype.getDefine = function (name) {
        var pass = this.passes[0];

        if (!pass) {
          return;
        }

        var defines = pass.defines;
        return defines[name];
      };

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FLMultiUISetting.ts", ['cc'], function (exports) {
  var cclegacy, game, Game, gfx;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      game = module.game;
      Game = module.Game;
      gfx = module.gfx;
    }],
    execute: function () {
      cclegacy._RF.push({}, "56b6fxV8EdGE5l3I0+lUIEq", "FLMultiUISetting", undefined);

      var FLMultiUISetting = exports('FLMultiUISetting', function FLMultiUISetting() {});
      /**
       * 设备最多支持几张图集
       */

      FLMultiUISetting.allowMaxTexturesNum = 16;
      /**
       * 当前图片属于哪个图集
       */

      FLMultiUISetting.TEXTURES_INDEX = 0;
      /**
       * 最大图集数量
       */

      FLMultiUISetting.maxTexturesNum = 4;
      game.once(Game.EVENT_RENDERER_INITED, function () {
        FLMultiUISetting.TEXTURES_INDEX = 1;
        FLMultiUISetting.maxTexturesNum = 8; // console.warn("当前设备最终图集支持数量: " + FLMultiUISetting.maxTexturesNum);

        var device = gfx.deviceManager.gfxDevice.capabilities;
        var textureNum = device.maxTextureUnits;

        if (!textureNum) {
          //某些平台拿不到maxTextureUnits（windows等）
          var _device = gfx.deviceManager.gfxDevice;
          var grenderContext = _device.gl;

          if (grenderContext && grenderContext.getParameter) {
            textureNum = grenderContext.getParameter(grenderContext.MAX_TEXTURE_TEXTURE_UNITS);
          }
        }

        console.warn("当前设备最大图集支持数量: " + textureNum);

        if ((textureNum = Math.min(FLMultiUISetting.allowMaxTexturesNum, textureNum)) >= 16) {
          FLMultiUISetting.TEXTURES_INDEX = 5;
          FLMultiUISetting.maxTexturesNum = 16;
        } else if (textureNum >= 14) {
          FLMultiUISetting.TEXTURES_INDEX = 4;
          FLMultiUISetting.maxTexturesNum = 14;
        } else if (textureNum >= 12) {
          FLMultiUISetting.TEXTURES_INDEX = 3;
          FLMultiUISetting.maxTexturesNum = 12;
        } else if (textureNum >= 10) {
          FLMultiUISetting.TEXTURES_INDEX = 2;
          FLMultiUISetting.maxTexturesNum = 10;
        } else if (textureNum >= 8) {
          FLMultiUISetting.TEXTURES_INDEX = 1;
          FLMultiUISetting.maxTexturesNum = 8;
        } else {
          FLMultiUISetting.TEXTURES_INDEX = 0;
          FLMultiUISetting.maxTexturesNum = 4;
        }

        console.warn("当前设备最终图集支持数量: " + textureNum + " " + FLMultiUISetting.maxTexturesNum);
      });

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FLMultiVertexFormat.ts", ['cc'], function (exports) {
  var cclegacy, gfx;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      gfx = module.gfx;
    }],
    execute: function () {
      cclegacy._RF.push({}, "1e2bf2ks8NC1pAcr9FS3YI+", "FLMultiVertexFormat", undefined);
      /**
       *  bool型为布尔型，占1个字节，取值0或1。
            BOOL型为int型，一般认为占4个字节，取值TRUE/FALSE/ERROR。
            sbyte型为有符号8位整数，占1个字节，取值范围在128~127之间。
            bytet型为无符号16位整数，占2个字节，取值范围在0~255之间。
            short型为有符号16位整数，占2个字节，取值范围在-32,768~32,767之间。
            ushort型为无符号16位整数，占2个字节，取值范围在0~65,535之间。
            int型为有符号32位整数，占4个字节，取值范围在-2,147,483,648~2,147,483,647之间。
            uint型为无符号32位整数，占4个字节，取值范围在0~4,294,967,295之间。
            long型为64位有符号整数，占8个字节，取值范围在9,223,372,036,854,775,808~9,223,372,036,854,775,807之间。
            ulong型为64位无符号整数，占8个字节，取值范围在0~18,446,744,073,709,551,615之间。
            float型为32位单精度实数，占4个字节，取值范围3.4E+10的负38次方~3.4E+10的38次方之间。
            double型为64位实数，占8个字节，取值范围1.7E+10的负308次方~1.7E+10的正308次方。
            指针占4个字节。
       */

      /**  2d渲染原本的数据格式
       * @zh 包含以下数据的顶点格式
       * 1. 三维位置属性（Float32）
       * 2. 二维贴图 UV 属性（Float32）
       * 3. RGBA 颜色属性（Float32）
       */


      var Attribute = gfx.Attribute;
      var vfmtPosUvColor = exports('vfmtPosUvColor', [new Attribute(gfx.AttributeName.ATTR_POSITION, gfx.Format.RGB32F), new Attribute(gfx.AttributeName.ATTR_TEX_COORD, gfx.Format.RG32F), new Attribute(gfx.AttributeName.ATTR_COLOR, gfx.Format.RGBA32F)]);
      /**
       *  包含以下数据的顶点格式
       * 1. 三维位置属性（Float32）
       * 2. 二维贴图 UV 属性（Float32）
       * 3. RGBA 颜色属性（Float32）
       * 4. R float32 图集index
       * 4. RGB 颜色属性（Float32）用作HSV颜色以及图集index用,R=Hue,G=Stration,B=Value
       */

      var vfmtPosUvColorMultiUIHSV = exports('vfmtPosUvColorMultiUIHSV', [new Attribute(gfx.AttributeName.ATTR_POSITION, gfx.Format.RGB32F), //3
      new Attribute(gfx.AttributeName.ATTR_TEX_COORD, gfx.Format.RG32F), //2
      new Attribute(gfx.AttributeName.ATTR_COLOR, gfx.Format.RGBA32F), //4
      new Attribute('a_texture_idx', gfx.Format.R32F), //1
      new Attribute('a_hue_color', gfx.Format.RGB32F) //3
      ]);
      var vfmtPosUvColorMultiUI = exports('vfmtPosUvColorMultiUI', [new Attribute(gfx.AttributeName.ATTR_POSITION, gfx.Format.RGB32F), //3
      new Attribute(gfx.AttributeName.ATTR_TEX_COORD, gfx.Format.RG32F), //2
      new Attribute(gfx.AttributeName.ATTR_COLOR, gfx.Format.RGBA32F), //4
      new Attribute('a_texture_idx', gfx.Format.R32F) //1
      // new Attribute('a_hue_color', gfx.Format.RGB32F),                    //3
      ]);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/index.ts", ['cc', './FLMultitySprite.ts', './FLMultitySimpleAssembler.ts', './FLMultitySlicedAssembler.ts', './FLMultityTiledAssembler.ts', './FLMultityRadialFilledAssembler.ts', './FLMultityBarFilledAssembler.ts'], function (exports) {
  var cclegacy, FLMultitySprite, FLMultitySimpleAssembler, FLMultitySlicedAssembler, FLMultityTiledAssembler, FLMultityRadialFilledAssembler, FLMultityBarFilledAssembler;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      FLMultitySprite = module.default;
    }, function (module) {
      FLMultitySimpleAssembler = module.FLMultitySimpleAssembler;
      exports('FLMultitySimpleAssembler', module.FLMultitySimpleAssembler);
    }, function (module) {
      FLMultitySlicedAssembler = module.FLMultitySlicedAssembler;
      exports('FLMultitySlicedAssembler', module.FLMultitySlicedAssembler);
    }, function (module) {
      FLMultityTiledAssembler = module.FLMultityTiledAssembler;
      exports('FLMultityTiledAssembler', module.FLMultityTiledAssembler);
    }, function (module) {
      FLMultityRadialFilledAssembler = module.FLMultityRadialFilledAssembler;
      exports('FLMultityRadialFilledAssembler', module.FLMultityRadialFilledAssembler);
    }, function (module) {
      FLMultityBarFilledAssembler = module.FLMultityBarFilledAssembler;
      exports('FLMultityBarFilledAssembler', module.FLMultityBarFilledAssembler);
    }],
    execute: function () {
      cclegacy._RF.push({}, "51c5dsIz4hJC4slMHj9NLmO", "index", undefined);

      var SpriteType = FLMultitySprite.Type;
      var FillType = FLMultitySprite.FillType;
      var FLMultitySpriteAssembler = exports('FLMultitySpriteAssembler', {
        getAssembler: function getAssembler(spriteComp) {
          var util = new FLMultitySimpleAssembler();
          var comp = spriteComp;

          switch (comp.type) {
            case SpriteType.SLICED:
              util = new FLMultitySlicedAssembler();
              break;

            case SpriteType.TILED:
              util = new FLMultityTiledAssembler();
              break;

            case SpriteType.FILLED:
              if (comp.fillType === FillType.RADIAL) {
                util = new FLMultityRadialFilledAssembler();
              } else {
                util = new FLMultityBarFilledAssembler();
              }

              break;
          }

          return util;
        } // Skip invalid sprites (without own _assembler)
        // updateRenderData (sprite) {
        //     return sprite.__allocedDatas;
        // },

      });
      FLMultitySprite.Assembler = FLMultitySpriteAssembler;

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/index2.ts", ['cc', './FLMultityLabel.ts', './FLMultityLabelTTFAssembler.ts', './FLMultityLabelBitmapFontAssembler.ts', './FLMultityLabelLetterAssembler.ts'], function (exports) {
  var cclegacy, Label, BitmapFont, js, FLMultityLabel, FLMultityLabelTTFAssembler, FLMultityLabelBitmapFontAssembler, FLMultityLabelLetterAssembler;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Label = module.Label;
      BitmapFont = module.BitmapFont;
      js = module.js;
    }, function (module) {
      FLMultityLabel = module.default;
    }, function (module) {
      FLMultityLabelTTFAssembler = module.FLMultityLabelTTFAssembler;
      exports('FLMultityLabelTTFAssembler', module.FLMultityLabelTTFAssembler);
    }, function (module) {
      FLMultityLabelBitmapFontAssembler = module.FLMultityLabelBitmapFontAssembler;
      exports('FLMultityLabelBitmapFontAssembler', module.FLMultityLabelBitmapFontAssembler);
    }, function (module) {
      FLMultityLabelLetterAssembler = module.FLMultityLabelLetterAssembler;
      exports('FLMultityLabelLetterAssembler', module.FLMultityLabelLetterAssembler);
    }],
    execute: function () {
      cclegacy._RF.push({}, "eeb7fOckXpGmpMxy+7NcVMv", "index", undefined);

      var FLMultityLabelAssembler = exports('FLMultityLabelAssembler', {
        getAssembler: function getAssembler(comp) {
          var assembler = new FLMultityLabelTTFAssembler();
          var labelAssembler = Label.Assembler.getAssembler(comp);

          if (comp.font instanceof BitmapFont) {
            assembler = new FLMultityLabelBitmapFontAssembler();
          } else if (comp.cacheMode == FLMultityLabel.CacheMode.CHAR) {
            assembler = new FLMultityLabelLetterAssembler();
          }

          js.addon(assembler, labelAssembler);
          return assembler;
        } // Skip invalid sprites (without own _assembler)
        // updateRenderData (sprite) {
        //     return sprite.__allocedDatas;
        // },

      });
      FLMultityLabel.Assembler = FLMultityLabelAssembler;

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./debug-view-runtime-control.ts', './FLMultityUIManager.ts', './TestSample.ts', './FLMultityAssembler2D.ts', './FLMultityUIRenderInterface.ts', './FLMultiUICCExtend.ts', './FLMultiUISetting.ts', './FLMultiVertexFormat.ts', './FLMultityLabel.ts', './FLMulityLabelUtils.ts', './FLMultityLabelBitmapFontAssembler.ts', './FLMultityLabelLetterAssembler.ts', './FLMultityLabelTTFAssembler.ts', './index2.ts', './FLMultityRichText.ts', './FLMultityBarFilledAssembler.ts', './FLMultityRadialFilledAssembler.ts', './FLMultitySimpleAssembler.ts', './FLMultitySlicedAssembler.ts', './FLMultitySprite.ts', './FLMultityTiledAssembler.ts', './index.ts', './FLMultityTiledLayer.ts', './node.jsb.ts', './FLEditorUtil.ts', './FLEngineVersionUtil.ts', './Main.ts', './NodeTest.ts', './ScaleNode.ts', './TestUI.ts', './test.ts', './FLEditorUtil2.ts'], function () {
  return {
    setters: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    execute: function () {}
  };
});

System.register("chunks:///_virtual/Main.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Button, director, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Button = module.Button;
      director = module.director;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;

      cclegacy._RF.push({}, "eb775Ka1dFLY4VwuLg7+Xud", "Main", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var Main = exports('Main', (_dec = ccclass('Main'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Main, _Component);

        function Main() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "btnCocosUI", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "btnMultityUI", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "btnSpriteTest", _descriptor3, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = Main.prototype;

        _proto.start = function start() {
          var _this2 = this;

          this.btnCocosUI.on(Button.EventType.CLICK, function () {
            director.loadScene('cocosUI');
            _this2.btnCocosUI.getComponent(Button).interactable = false;
          });
          this.btnMultityUI.on(Button.EventType.CLICK, function () {
            director.loadScene('multiUI');
            _this2.btnMultityUI.getComponent(Button).interactable = false;
          });
          this.btnSpriteTest.on(Button.EventType.CLICK, function () {
            director.loadScene('NodeTest');
            _this2.btnSpriteTest.getComponent(Button).interactable = false;
          });
        };

        _proto.update = function update(deltaTime) {};

        return Main;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "btnCocosUI", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "btnMultityUI", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "btnSpriteTest", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/node.jsb.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "0da91yPVfZByq2r0czGcplh", "node.jsb", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/NodeTest.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, SpriteFrame, Label, Button, profiler, director, instantiate, UITransform, Sprite, gfx, dynamicAtlasManager, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      SpriteFrame = module.SpriteFrame;
      Label = module.Label;
      Button = module.Button;
      profiler = module.profiler;
      director = module.director;
      instantiate = module.instantiate;
      UITransform = module.UITransform;
      Sprite = module.Sprite;
      gfx = module.gfx;
      dynamicAtlasManager = module.dynamicAtlasManager;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _descriptor21;

      cclegacy._RF.push({}, "d4fd5cPa8BC8LviSXXpTeAl", "NodeTest", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var NodeTest = exports('NodeTest', (_dec = ccclass('NodeTest'), _dec2 = property({
        tooltip: '普通图片预设',
        type: Node
      }), _dec3 = property({
        tooltip: '多纹理图片预设',
        type: Node
      }), _dec4 = property({
        tooltip: '普通Label预设',
        type: Node
      }), _dec5 = property({
        tooltip: '多纹理Label预设',
        type: Node
      }), _dec6 = property({
        tooltip: '普通图文预设',
        type: Node
      }), _dec7 = property({
        tooltip: '多纹理图文预设',
        type: Node
      }), _dec8 = property({
        tooltip: '节点容器',
        type: Node
      }), _dec9 = property({
        tooltip: 'Slider',
        type: Node
      }), _dec10 = property({
        tooltip: 'Label',
        type: Node
      }), _dec11 = property({
        tooltip: '生成普通图片节点',
        type: Node
      }), _dec12 = property({
        tooltip: '生成多纹理图片节点',
        type: Node
      }), _dec13 = property({
        tooltip: '生成普通文本节点',
        type: Node
      }), _dec14 = property({
        tooltip: '生成多纹理文本节点',
        type: Node
      }), _dec15 = property({
        tooltip: '生成普通图文节点',
        type: Node
      }), _dec16 = property({
        tooltip: '生成多纹理图文节点',
        type: Node
      }), _dec17 = property({
        tooltip: '清除Content',
        type: Node
      }), _dec18 = property({
        tooltip: '返回主场景',
        type: Node
      }), _dec19 = property([SpriteFrame]), _dec20 = property({
        type: Label
      }), _dec21 = property({
        type: Label
      }), _dec22 = property(Button), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(NodeTest, _Component);

        function NodeTest() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "prefab1", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "prefab2", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "prefab3", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "prefab4", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "prefab5", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "prefab6", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "content", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "slider", _descriptor8, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "showNum", _descriptor9, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "btn1", _descriptor10, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "btn2", _descriptor11, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "btn3", _descriptor12, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "btn4", _descriptor13, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "btn5", _descriptor14, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "btn6", _descriptor15, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "btnClear", _descriptor16, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "btnBackMain", _descriptor17, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "spriteFrames", _descriptor18, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "lbFPS", _descriptor19, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "lbRender", _descriptor20, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "btnDynamic", _descriptor21, _assertThisInitialized(_this));

          _this.curMaxNum = 0;
          _this.maxSpriteNum = 10000;
          return _this;
        }

        var _proto = NodeTest.prototype;

        _proto.start = function start() {
          var _this2 = this;

          profiler.showStats();
          this.slider.on('slide', function (slider) {
            var value = Math.floor(slider.progress * _this2.maxSpriteNum);
            _this2.curMaxNum = value;
            _this2.showNum.getComponent(Label).string = _this2.curMaxNum;
          }, this);
          this.btn1.on('click', function () {
            _this2.updateSpriteContent(_this2.prefab1);
          }, this);
          this.btn2.on('click', function () {
            _this2.updateSpriteContent(_this2.prefab2);
          }, this);
          this.btn3.on('click', function () {
            _this2.updateSpriteContent(_this2.prefab3);
          }, this);
          this.btn4.on('click', function () {
            _this2.updateSpriteContent(_this2.prefab4);
          }, this);
          this.btn5.on('click', function () {
            _this2.updateSpriteContent(_this2.prefab5);
          }, this);
          this.btn6.on('click', function () {
            _this2.updateSpriteContent(_this2.prefab6);
          }, this);
          this.btnClear.on('click', function () {
            _this2.destroyAllChildren(_this2.content);
          }, this);
          this.btnBackMain.on('click', function () {
            _this2.btnBackMain.getComponent(Button).interactable = false;
            director.loadScene("main");
          }, this); //动态合图需在项目开始前开启，运行中开启会导致已渲染的贴图出错
          // this._updateDynamic();
          // this.btnDynamic.node.on('click', () => {
          //     const dynamicEnable = !dynamicAtlasManager.enabled;
          //     macro.CLEANUP_IMAGE_CACHE = !dynamicEnable;
          //     dynamicAtlasManager.enabled = dynamicEnable;
          //     this._updateDynamic();
          // }, this);
        };

        _proto.updateSpriteContent = function updateSpriteContent(prefabNode) {
          for (var i = 0; i < this.curMaxNum; i++) {
            var node = instantiate(prefabNode);
            node.parent = this.content;
            var uiContentSize = this.content.getComponent(UITransform);
            var x = -uiContentSize.width / 2 + uiContentSize.width * Math.random();
            var y = -uiContentSize.height / 2 + uiContentSize.height * Math.random();
            node.setPosition(x, y);
            this.updateItem(node);
            var nodeTran = node.getComponent(UITransform); // tween(node).delay(0.5 + Math.random()).call(()=>{
            //     if(node.getComponent(Label)){
            //         node.getComponent(Label).string = "测试" + Math.floor(Math.random() * 100);
            //     }
            // }).union().repeatForever().start();
          }
        };

        _proto.destroyAllChildren = function destroyAllChildren(node) {
          var children = node.children;
          children.forEach(function (child) {
            // if(isValid(child)){
            //     // child.stopAllActions();
            //     // TweenSystem.instance.ActionManager.removeAllActionsFromTarget(child);
            //     // Tween.stopAllByTarget(node);
            //     child.destroy();
            // }
            child.destroy();
          });
        };

        _proto.updateItem = function updateItem(node) {
          var sp = node.getComponent(Sprite);

          if (sp) {
            sp.spriteFrame = this.spriteFrames[Math.floor(Math.random() * this.spriteFrames.length)];
          }

          var lbCom = node.getComponent(Label);

          if (lbCom) {
            lbCom.string = "测试" + Math.floor(Math.random() * 100);
          }

          var icon = node.getChildByName('icon');

          if (icon) {
            var _sp = icon.getComponent(Sprite);

            _sp.spriteFrame = this.spriteFrames[Math.floor(Math.random() * this.spriteFrames.length)];
          }

          var numNode = node.getChildByName('lbNum');

          if (numNode) {
            var lbNum = numNode.getComponent(Label);
            lbNum.string = Math.floor(Math.random() * 100).toString();
          }

          var nameNode = node.getChildByName('lbName');

          if (nameNode) {
            var lbName = nameNode.getComponent(Label);
            lbName.string = '测试' + Math.floor(Math.random() * 100).toString();
          }
        };

        _proto.lateUpdate = function lateUpdate(deltaTime) {
          if (this.lbFPS) {
            this.lbFPS.string = "FPS:" + profiler._profilerStats.fps.counter.value.toFixed(2);
          }

          var device = gfx.deviceManager.gfxDevice;

          if (this.lbRender) {
            this.lbRender.string = "DC:" + device.numDrawCalls;
          }
        };

        _proto._updateDynamic = function _updateDynamic() {
          if (!this.btnDynamic) {
            return;
          }

          var lb = this.btnDynamic.node.getComponentInChildren(Label);
          /**是否开启动态合图 */

          var dynamicEnable = dynamicAtlasManager.enabled;
          console.log("\u52A8\u6001\u5408\u56FE\u5DF2" + (dynamicEnable ? "开启" : "关闭"));
          lb.string = dynamicEnable ? "自动合图:开启" : "自动合图:关闭";
        };

        return NodeTest;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "prefab1", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "prefab2", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "prefab3", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "prefab4", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "prefab5", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "prefab6", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "content", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "slider", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "showNum", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "btn1", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "btn2", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "btn3", [_dec13], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "btn4", [_dec14], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "btn5", [_dec15], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "btn6", [_dec16], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "btnClear", [_dec17], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor17 = _applyDecoratedDescriptor(_class2.prototype, "btnBackMain", [_dec18], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor18 = _applyDecoratedDescriptor(_class2.prototype, "spriteFrames", [_dec19], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor19 = _applyDecoratedDescriptor(_class2.prototype, "lbFPS", [_dec20], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor20 = _applyDecoratedDescriptor(_class2.prototype, "lbRender", [_dec21], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor21 = _applyDecoratedDescriptor(_class2.prototype, "btnDynamic", [_dec22], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ScaleNode.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, tween, lerp, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      tween = module.tween;
      lerp = module.lerp;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor;

      cclegacy._RF.push({}, "210cc6D2eJHIrAeoc8B9Did", "ScaleNode", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var ScaleNode = exports('ScaleNode', (_dec = ccclass('ScaleNode'), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ScaleNode, _Component);

        function ScaleNode() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this._state = 1;

          _initializerDefineProperty(_this, "IsUseUpdate", _descriptor, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = ScaleNode.prototype;

        _proto.onLoad = function onLoad() {
          var node = this.node;

          if (!this.IsUseUpdate) {
            var scaleTo1 = tween(node).to(0.5, {
              angle: 60
            });
            var scaleTo2 = tween(node).to(0.5, {
              angle: 0
            });
            tween(node).sequence(scaleTo1, scaleTo2).repeatForever().start();
          }
        };

        _proto.update = function update(dt) {
          if (!this.IsUseUpdate) return;
          var curAngle = this.node.angle;

          if (curAngle >= 60) {
            this._state = 1;
          } else if (curAngle <= 0) {
            this._state = 2;
          }

          var angle = 0;

          if (this._state == 2) {
            angle = lerp(0, 12, 0.1);
          } else {
            angle = -lerp(0, 12, 0.1);
          }

          this.node.angle += angle;
        };

        return ScaleNode;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "IsUseUpdate", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/test.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      exports('default', test);

      cclegacy._RF.push({}, "a7c48D6hExMi6k6K2z64jhT", "test", undefined);
      /*
      	* Add integers, wrapping at 2^32. This uses 16-bit operations internally
      	* to work around bugs in some JS interpreters.
      	*/


      function safe_add(x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF),
            msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return msw << 16 | lsw & 0xFFFF;
      }
      /*
      * Bitwise rotate a 32-bit number to the left.
      */


      function bit_rol(num, cnt) {
        return num << cnt | num >>> 32 - cnt;
      }
      /*
      * These functions implement the four basic operations the algorithm uses.
      */


      function cmn(q, a, b, x, s, t) {
        return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
      }

      function ff(a, b, c, d, x, s, t) {
        return cmn(b & c | ~b & d, a, b, x, s, t);
      }

      function gg(a, b, c, d, x, s, t) {
        return cmn(b & d | c & ~d, a, b, x, s, t);
      }

      function hh(a, b, c, d, x, s, t) {
        return cmn(b ^ c ^ d, a, b, x, s, t);
      }

      function ii(a, b, c, d, x, s, t) {
        return cmn(c ^ (b | ~d), a, b, x, s, t);
      }

      function transform(states, block, index, length, buffer) {
        buffer.length = 0;

        for (var i = index; i < index + length; i += 4) buffer.push(block[i] | block[i + 1] << 8 | block[i + 2] << 16 | block[i + 3] << 24);

        var olda = states[0];
        var oldb = states[1];
        var oldc = states[2];
        var oldd = states[3];
        states[0] = ff(states[0], states[1], states[2], states[3], buffer[0], 7, -680876936);
        states[3] = ff(states[3], states[0], states[1], states[2], buffer[1], 12, -389564586);
        states[2] = ff(states[2], states[3], states[0], states[1], buffer[2], 17, 606105819);
        states[1] = ff(states[1], states[2], states[3], states[0], buffer[3], 22, -1044525330);
        states[0] = ff(states[0], states[1], states[2], states[3], buffer[4], 7, -176418897);
        states[3] = ff(states[3], states[0], states[1], states[2], buffer[5], 12, 1200080426);
        states[2] = ff(states[2], states[3], states[0], states[1], buffer[6], 17, -1473231341);
        states[1] = ff(states[1], states[2], states[3], states[0], buffer[7], 22, -45705983);
        states[0] = ff(states[0], states[1], states[2], states[3], buffer[8], 7, 1770035416);
        states[3] = ff(states[3], states[0], states[1], states[2], buffer[9], 12, -1958414417);
        states[2] = ff(states[2], states[3], states[0], states[1], buffer[10], 17, -42063);
        states[1] = ff(states[1], states[2], states[3], states[0], buffer[11], 22, -1990404162);
        states[0] = ff(states[0], states[1], states[2], states[3], buffer[12], 7, 1804603682);
        states[3] = ff(states[3], states[0], states[1], states[2], buffer[13], 12, -40341101);
        states[2] = ff(states[2], states[3], states[0], states[1], buffer[14], 17, -1502002290);
        states[1] = ff(states[1], states[2], states[3], states[0], buffer[15], 22, 1236535329);
        states[0] = gg(states[0], states[1], states[2], states[3], buffer[1], 5, -165796510);
        states[3] = gg(states[3], states[0], states[1], states[2], buffer[6], 9, -1069501632);
        states[2] = gg(states[2], states[3], states[0], states[1], buffer[11], 14, 643717713);
        states[1] = gg(states[1], states[2], states[3], states[0], buffer[0], 20, -373897302);
        states[0] = gg(states[0], states[1], states[2], states[3], buffer[5], 5, -701558691);
        states[3] = gg(states[3], states[0], states[1], states[2], buffer[10], 9, 38016083);
        states[2] = gg(states[2], states[3], states[0], states[1], buffer[15], 14, -660478335);
        states[1] = gg(states[1], states[2], states[3], states[0], buffer[4], 20, -405537848);
        states[0] = gg(states[0], states[1], states[2], states[3], buffer[9], 5, 568446438);
        states[3] = gg(states[3], states[0], states[1], states[2], buffer[14], 9, -1019803690);
        states[2] = gg(states[2], states[3], states[0], states[1], buffer[3], 14, -187363961);
        states[1] = gg(states[1], states[2], states[3], states[0], buffer[8], 20, 1163531501);
        states[0] = gg(states[0], states[1], states[2], states[3], buffer[13], 5, -1444681467);
        states[3] = gg(states[3], states[0], states[1], states[2], buffer[2], 9, -51403784);
        states[2] = gg(states[2], states[3], states[0], states[1], buffer[7], 14, 1735328473);
        states[1] = gg(states[1], states[2], states[3], states[0], buffer[12], 20, -1926607734);
        states[0] = hh(states[0], states[1], states[2], states[3], buffer[5], 4, -378558);
        states[3] = hh(states[3], states[0], states[1], states[2], buffer[8], 11, -2022574463);
        states[2] = hh(states[2], states[3], states[0], states[1], buffer[11], 16, 1839030562);
        states[1] = hh(states[1], states[2], states[3], states[0], buffer[14], 23, -35309556);
        states[0] = hh(states[0], states[1], states[2], states[3], buffer[1], 4, -1530992060);
        states[3] = hh(states[3], states[0], states[1], states[2], buffer[4], 11, 1272893353);
        states[2] = hh(states[2], states[3], states[0], states[1], buffer[7], 16, -155497632);
        states[1] = hh(states[1], states[2], states[3], states[0], buffer[10], 23, -1094730640);
        states[0] = hh(states[0], states[1], states[2], states[3], buffer[13], 4, 681279174);
        states[3] = hh(states[3], states[0], states[1], states[2], buffer[0], 11, -358537222);
        states[2] = hh(states[2], states[3], states[0], states[1], buffer[3], 16, -722521979);
        states[1] = hh(states[1], states[2], states[3], states[0], buffer[6], 23, 76029189);
        states[0] = hh(states[0], states[1], states[2], states[3], buffer[9], 4, -640364487);
        states[3] = hh(states[3], states[0], states[1], states[2], buffer[12], 11, -421815835);
        states[2] = hh(states[2], states[3], states[0], states[1], buffer[15], 16, 530742520);
        states[1] = hh(states[1], states[2], states[3], states[0], buffer[2], 23, -995338651);
        states[0] = ii(states[0], states[1], states[2], states[3], buffer[0], 6, -198630844);
        states[3] = ii(states[3], states[0], states[1], states[2], buffer[7], 10, 1126891415);
        states[2] = ii(states[2], states[3], states[0], states[1], buffer[14], 15, -1416354905);
        states[1] = ii(states[1], states[2], states[3], states[0], buffer[5], 21, -57434055);
        states[0] = ii(states[0], states[1], states[2], states[3], buffer[12], 6, 1700485571);
        states[3] = ii(states[3], states[0], states[1], states[2], buffer[3], 10, -1894986606);
        states[2] = ii(states[2], states[3], states[0], states[1], buffer[10], 15, -1051523);
        states[1] = ii(states[1], states[2], states[3], states[0], buffer[1], 21, -2054922799);
        states[0] = ii(states[0], states[1], states[2], states[3], buffer[8], 6, 1873313359);
        states[3] = ii(states[3], states[0], states[1], states[2], buffer[15], 10, -30611744);
        states[2] = ii(states[2], states[3], states[0], states[1], buffer[6], 15, -1560198380);
        states[1] = ii(states[1], states[2], states[3], states[0], buffer[13], 21, 1309151649);
        states[0] = ii(states[0], states[1], states[2], states[3], buffer[4], 6, -145523070);
        states[3] = ii(states[3], states[0], states[1], states[2], buffer[11], 10, -1120210379);
        states[2] = ii(states[2], states[3], states[0], states[1], buffer[2], 15, 718787259);
        states[1] = ii(states[1], states[2], states[3], states[0], buffer[9], 21, -343485551);
        states[0] = safe_add(states[0], olda);
        states[1] = safe_add(states[1], oldb);
        states[2] = safe_add(states[2], oldc);
        states[3] = safe_add(states[3], oldd);
      }

      function split(output, input) {
        output.push(input & 0xff, input >> 8 & 0xff, input >> 16 & 0xff, input >> 24 & 0xff);
      }
      /*
      * Calculate the MD5 of a byte array.
      */


      function calculate(input) {
        var states = [1732584193, -271733879, -1732584194, 271733878];
        var buffer = new Array();
        var i = 0;

        for (; i < input.length - 63; i += 64) {
          transform(states, input, i, 64, buffer);
        }

        var block = new Array();

        for (var j = i; j < input.length; j++) block.push(input[j]);

        if (block.length >= 56) {
          block.push(128);

          for (var _j = block.length; _j < 64; _j++) block.push(0);

          transform(states, block, 0, 64, buffer);
          block.length = 0;
        } else {
          block.push(128);
        }

        for (var _j2 = block.length; _j2 < 56; _j2++) block.push(0);

        split(block, input.length * 8 & 0xffffffff);
        split(block, input.length >> 29);
        transform(states, block, 0, 64, buffer);
        var result = new Array();

        for (var _j3 = 0; _j3 < states.length; _j3++) split(result, states[_j3]);

        return result;
      }
      /*
      * Calculate the HMAC-MD5, of a key and some data (raw byte array)
      */


      function hmac(input, key) {
        var hkey = calculate(key);
        var ipad = new Array();
        var opad = new Array();

        for (var i = 0; i < hkey.length; i += 1) {
          ipad[i] = hkey[i] ^ 0x36;
          opad[i] = hkey[i] ^ 0x5C;
        }

        for (var _i = 0; _i < input.length; _i++) ipad.push(input[_i]);

        var hash = calculate(ipad);

        for (var _i2 = 0; _i2 < hash.length; _i2++) opad.push(hash[_i2]);

        return calculate(opad);
      }

      function calc(input, key) {
        if (key == undefined) return new Uint8Array(calculate(input));
        return new Uint8Array(hmac(input, key));
      }

      function fromutf8(value) {
        var bytes = [];

        for (var i = 0, n = value.length; i < n; ++i) {
          var c = value.charCodeAt(i);

          if (c < 0x80) {
            bytes.push(c);
          } else if (c < 0x800) {
            bytes.push(0xC0 | c >> 6, 0x80 | c & 0x3f);
          } else if (c < 0xd800 || c >= 0xe000) {
            bytes.push(0xe0 | c >> 12, 0x80 | c >> 6 & 0x3f, 0x80 | c & 0x3f);
          } else {
            ++i;
            var cp = 0x10000 + ((c & 0x3ff) << 10 | value.charCodeAt(i) & 0x3ff);
            bytes.push(0xf0 | cp >> 18 & 0x7, 0x80 | cp >> 12 & 0x3f, 0x80 | cp >> 6 & 0x3f, 0x80 | cp & 0x3f);
          }
        }

        return new Uint8Array(bytes);
      }

      function toutf8(value) {
        var length = value.length;
        if (length == 0) return "";
        var parts = undefined;
        var chunk = new Array();
        var size = 0;
        var index = 0;

        while (index < length) {
          var c = value[index++];

          if (c < 128) {
            chunk[size++] = c;
          } else if (c > 191 && c < 224) {
            chunk[size++] = (c & 31) << 6 | value[index++] & 63;
          } else if (c > 239 && c < 365) {
            c = ((c & 7) << 18 | (value[index++] & 63) << 12 | (value[index++] & 63) << 6 | value[index++] & 63) - 0x10000;
            chunk[size++] = 0xD800 + (c >> 10);
            chunk[size++] = 0xDC00 + (c & 1023);
          } else {
            chunk[size++] = (c & 15) << 12 | (value[index++] & 63) << 6 | value[index++] & 63;
          }

          if (size > 8191) {
            (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
            size = 0;
          }
        }

        if (parts != undefined) {
          if (size) parts.push(String.fromCharCode.apply(String, chunk.slice(0, size)));
          return parts.join("");
        }

        return String.fromCharCode.apply(String, chunk.slice(0, size));
      }

      function test(value) {
        var input = fromutf8(value);
        var randoms = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var count = 2;
        var append = new Uint8Array(0);
        var every = new Array();

        for (var i = 0; i < count; i++) every[i] = 0;

        while (true) {
          var cursor = 0;

          while (true) {
            if (every[cursor] < randoms.length) break;

            if (cursor == count - 1) {
              count++;

              for (var _i3 = 0; _i3 < count; _i3++) every[_i3] = 0;

              break;
            }

            every[cursor] = 0;
            cursor++;
            every[cursor]++;
          }

          if (append.length != input.byteLength + count) {
            append = new Uint8Array(input.byteLength + count);
            append.set(input);
          }

          for (var _i4 = 0; _i4 < count; _i4++) append[input.byteLength + _i4] = randoms.charCodeAt(every[_i4]);

          var result = calc(append);
          if (result.reduce(function (str, _byte) {
            var result = _byte.toString(16);

            while (result.length < 2) result = "0" + result;

            return str + result;
          }, "").indexOf("000000") >= 0) return toutf8(append.slice(input.byteLength));
          every[0]++;
        }
      }

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TestSample.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Component;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "0d6a5egH4dOZIkcloxFsllK", "TestSample", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var TestSample = exports('TestSample', (_dec = ccclass('TestSample'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(TestSample, _Component);

        function TestSample() {
          return _Component.apply(this, arguments) || this;
        }

        var _proto = TestSample.prototype;

        _proto.start = function start() {};

        _proto.update = function update(deltaTime) {};

        return TestSample;
      }(Component)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TestUI.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Prefab, ScrollView, SpriteFrame, Label, Button, profiler, director, instantiate, UIOpacity, tween, UITransform, Sprite, gfx, dynamicAtlasManager, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Prefab = module.Prefab;
      ScrollView = module.ScrollView;
      SpriteFrame = module.SpriteFrame;
      Label = module.Label;
      Button = module.Button;
      profiler = module.profiler;
      director = module.director;
      instantiate = module.instantiate;
      UIOpacity = module.UIOpacity;
      tween = module.tween;
      UITransform = module.UITransform;
      Sprite = module.Sprite;
      gfx = module.gfx;
      dynamicAtlasManager = module.dynamicAtlasManager;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10;

      cclegacy._RF.push({}, "b4ecc91nv9O0YudIzP5Pm54", "TestUI", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var TestUI = exports('TestUI', (_dec = ccclass('TestUI'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec5 = property(Prefab), _dec6 = property(ScrollView), _dec7 = property([SpriteFrame]), _dec8 = property(Node), _dec9 = property({
        type: Label
      }), _dec10 = property({
        type: Label
      }), _dec11 = property(Button), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(TestUI, _Component);

        function TestUI() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "btnBakMainNode", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "btnSpriteTest", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "loadContent", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "prefabItem", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "scrollView", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "spriteFrames", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "NodeTestBtn", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "lbFPS", _descriptor8, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "lbRender", _descriptor9, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "btnDynamic", _descriptor10, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = TestUI.prototype;

        _proto.onLoad = function onLoad() {
          profiler.showStats();
        };

        _proto.start = function start() {
          var _this2 = this;

          this.btnBakMainNode.on(Button.EventType.CLICK, function () {
            director.loadScene('main');
            _this2.btnBakMainNode.getComponent(Button).interactable = false;
          });
          this.btnSpriteTest.on(Button.EventType.CLICK, function () {
            director.loadScene('NodeTest');
            _this2.btnSpriteTest.getComponent(Button).interactable = false;
          });
          this.schedule(function () {
            _this2.addContentNode();
          }, 0.25);

          for (var index = 0; index < 100; index++) {
            this.addItem();
          }

          this.NodeTestBtn.on(Button.EventType.CLICK, function () {
            director.loadScene('NodeTest');
          }); //动态合图需在项目开始前开启，运行中开启会导致已渲染的贴图出错
          // this._updateDynamic();
          // this.btnDynamic.node.on('click', () => {
          //     const dynamicEnable = !dynamicAtlasManager.enabled;
          //     macro.CLEANUP_IMAGE_CACHE = !dynamicEnable;
          //     dynamicAtlasManager.enabled = dynamicEnable;
          //     this._updateDynamic();
          // }, this);
        };

        _proto.update = function update(deltaTime) {};

        _proto.addContentNode = function addContentNode() {
          var prefabNode = this.prefabItem;
          var node = instantiate(prefabNode);
          node.parent = this.loadContent; // node.getComponent(UIOpacity).opacity = 0.1

          var uiOpacaity = node.getComponent(UIOpacity);
          uiOpacaity.opacity = 0.1;
          var fadeIn = tween(uiOpacaity).to(0.5, {
            opacity: 255
          }).delay(3 + 2 * Math.random());
          var fadeOut = tween(uiOpacaity).to(0.5, {
            opacity: 255
          });
          this.updateItem(node);
          tween(uiOpacaity).sequence(fadeIn, fadeOut).call(function () {
            node.destroy();
          }).start();
          var uiTran = this.loadContent.getComponent(UITransform);
          var x = -uiTran.width / 2 + uiTran.width * Math.random();
          var y = -uiTran.height / 2 + uiTran.height * Math.random();
          node.setPosition(x, y);
        };

        _proto.updateItem = function updateItem(node) {
          var icon = node.getChildByName('icon');
          var sp = icon.getComponent(Sprite);
          sp.spriteFrame = this.spriteFrames[Math.floor(Math.random() * this.spriteFrames.length)];
          var lbNum = node.getChildByName('lbNum').getComponent(Label);
          var lbName = node.getChildByName('lbName').getComponent(Label);
          lbNum.string = Math.floor(Math.random() * 100).toString();
          lbName.string = 'test' + Math.floor(Math.random() * 100).toString();
        };

        _proto.addItem = function addItem() {
          var prefabNode = this.prefabItem;
          var node = instantiate(prefabNode);
          node.parent = this.scrollView.content;
          this.updateItem(node);
        };

        _proto.lateUpdate = function lateUpdate(deltaTime) {
          if (this.lbFPS) {
            this.lbFPS.string = "FPS:" + profiler._profilerStats.fps.counter.value.toFixed(2);
          }

          var device = gfx.deviceManager.gfxDevice;

          if (this.lbRender) {
            this.lbRender.string = "DC:" + device.numDrawCalls;
          }
        };

        _proto._updateDynamic = function _updateDynamic() {
          if (!this.btnDynamic) {
            return;
          }

          var lb = this.btnDynamic.node.getComponentInChildren(Label);
          /**是否开启动态合图 */

          var dynamicEnable = dynamicAtlasManager.enabled;
          console.log("\u52A8\u6001\u5408\u56FE\u5DF2" + (dynamicEnable ? "开启" : "关闭"));
          lb.string = dynamicEnable ? "自动合图:开启" : "自动合图:关闭";
        };

        return TestUI;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "btnBakMainNode", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "btnSpriteTest", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "loadContent", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "prefabItem", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "scrollView", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "spriteFrames", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "NodeTestBtn", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "lbFPS", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "lbRender", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "btnDynamic", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});