/*
 * シンプルに四角が動く、ゲーム(?)
 */

phina.globalize(); // おまじない(phina.jsをグローバルに展開)


// 定数
const RECTANGLE_DIAMETER = 60; // 正方形の一辺の長さ
const DISPLAY_WIDTH = 640; // ゲーム画面の横幅
const DISPLAY_HEIGHT = 960; // ゲーム画面の縦幅


/*
 * 四角の定義
 */
phina.define('Rec', {
    superClass: 'RectangleShape',

    //初期化
    init: function(options) {
        this.superInit(); //初期化のおまじない

        this.fill = 'red'; // 四角の塗りつぶし色
        this.stroke = 'red'; // 四角のふちの色
        this.width = RECTANGLE_DIAMETER; //四角の縦幅
        this.height = RECTANGLE_DIAMETER; //四角の横幅
    },

    //毎フレームごとに、どうふるまうか
    update: function(app) {
        var speed = 3;

        this.x += speed;
    },
});



/*
 * ゲームのメインシーンの定義
 */
phina.define("MainScene", {
    superClass: 'DisplayScene',

    // 初期化
    init: function() {
        this.superInit(); //初期化のおまじない

        this.backgroundColor = '#1ee'; // 背景色

        // グループを生成
        this.recGroup = DisplayElement().addChildTo(this);
    },


    //毎フレームごとに、どう振る舞うか
    update: function(app) {
        if (app.frame % 30 == 0) { //1秒に一回、四角を追加する

            var tempRec = Rec({}); //tempRecに四角を一旦代入し、初期値を設定する
            tempRec.x = getRandomInt(DISPLAY_WIDTH); //表示位置(x座標)を画面内でランダムに設定する
            tempRec.y = getRandomInt(DISPLAY_HEIGHT); //表示位置(y座標)を画面内でランダムに設定する

            tempRec.addChildTo(this.recGroup); //グループに追加する
        }
    },

    onkeydown: function(e) { //スペースキーが押されると、強制終了
        if (e.keyCode === 32) { //32がスペースキー
            this.app.stop();
        }
    },
});


/*
 * メイン処理
 */
phina.main(function() {
    // アプリケーションを生成
    var app = GameApp({
        startLabel: 'main', // MainScene から開始
        width: DISPLAY_WIDTH, //画面の横幅
        height: DISPLAY_HEIGHT, //画面の縦幅
        fps: 30, //fps
    });

    // 実行
    app.run();
});


// ランダムなint型の数を返す関数
// 0~maxの範囲で返す
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}