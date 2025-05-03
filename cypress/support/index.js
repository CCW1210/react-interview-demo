// 在 window 還沒 load 前先把全域 WebSocket 換成 mock
Cypress.on("window:before:load", function (win) {
    var MockWebSocket = /** @class */ (function () {
        function MockWebSocket(_url, _protocols) {
            var _this = this;
            this.readyState = MockWebSocket.OPEN;
            this.onopen = null;
            this.onmessage = null;
            // 模擬立即 open
            setTimeout(function () { var _a; return (_a = _this.onopen) === null || _a === void 0 ? void 0 : _a.call(_this); }, 0);
        }
        MockWebSocket.prototype.send = function (data) {
            var _this = this;
            // echo
            setTimeout(function () { var _a; return (_a = _this.onmessage) === null || _a === void 0 ? void 0 : _a.call(_this, { data: data }); }, 0);
        };
        MockWebSocket.prototype.close = function () { };
        MockWebSocket.prototype.addEventListener = function (type, cb) {
            if (type === "message")
                this.onmessage = cb;
            if (type === "open")
                this.onopen = cb;
        };
        MockWebSocket.prototype.removeEventListener = function () { };
        MockWebSocket.OPEN = 1;
        return MockWebSocket;
    }());
    win.WebSocket = MockWebSocket;
});
