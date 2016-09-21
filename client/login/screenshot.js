import rasterizeHTML from 'rasterizehtml'
class Cov {
    constructor (id) {
        this.canvas = document.createElement('canvas')
        this.canvas.style.width = window.innerWidth
        this.canvas.style.height = window.innerHeight
        this.canvas.setAttribute('style', 'width:' + window.innerWidth + 'px; height:' + window.innerHeight+'px')
        this.ctx = this.canvas.getContext('2d')
    }

    styleWorker () {
        let treeWalker = document.createTreeWalker(
          document.getElementById('app'),
          NodeFilter.SHOW_ELEMENT,
          false
        )

        let styleList = ''
        let styleTmp = null
        let i = 0
        let len = 0

        let defaultNode = document.createElement('div')
        defaultNode.innerText = '1'
        document.body.appendChild(defaultNode)
        let defaultStyle = window.getComputedStyle(defaultNode)

        while (treeWalker.nextNode()) {
            styleTmp = window.getComputedStyle(treeWalker.currentNode)
            len = styleTmp.length
            for (i = 0; i < len; i++) {
                // console.log(styleTmp[i] + ': '+ defaultStyle.getPropertyValue(styleTmp[i]) + ' with ' + styleTmp.getPropertyValue(styleTmp[i]))
                if (defaultStyle.getPropertyValue(styleTmp[i]) !== styleTmp.getPropertyValue(styleTmp[i])) {
                    styleList += styleTmp[i] + ':' + styleTmp.getPropertyValue(styleTmp[i]) + ';'
                }
            }
            treeWalker.currentNode.setAttribute('style', styleList)
            // treeWalker.currentNode.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml')
            styleList = ''
        }
    }

    render () {
        this.styleWorker()
        // console.log(document.getElementById('app').innerHTML)
        var data = '<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000">' +
           '<foreignObject width="100%" height="100%">' +
           '<div xmlns="http://www.w3.org/1999/xhtml">'+
           '<h1 xmlns="http://www.w3.org/1999/xhtml" >23</h1>'+
            `<button class="login-btn" style="background-image:linear-gradient(30deg, rgb(83, 219, 157), rgb(70, 185, 174));border-bottom-color:rgb(255, 255, 255);border-bottom-left-radius:24px;border-bottom-right-radius:24px;border-left-color:rgb(255, 255, 255);border-right-color:rgb(255, 255, 255);border-top-color:rgb(255, 255, 255);border-top-left-radius:24px;border-top-right-radius:24px;bottom:0px;box-sizing:border-box;color:rgb(255, 255, 255);cursor:default;display:inline-block;font-family:BlinkMacSystemFont;font-size:19.2px;height:48px;left:0px;line-height:48px;outline-color:rgb(255, 255, 255);overflow-x:hidden;overflow-y:hidden;position:relative;right:0px;text-align:center;top:0px;transition-duration:0.3s;transition-property:opacity;width:415px;column-rule-color:rgb(255, 255, 255);align-items:flex-start;perspective-origin:207.5px 24px;-webkit-text-emphasis-color:rgb(255, 255, 255);-webkit-text-fill-color:rgb(255, 255, 255);-webkit-text-stroke-color:rgb(255, 255, 255);transform-origin:207.5px 24px;">
                SIGN IN
            </button>`+
            document.getElementsByClassName('footer')[0].innerHTML + 
            '</div>'+
           '</foreignObject>' +
           '</svg>';
        let data2 = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
           <foreignObject width="100%" height="100%">
           <div xmlns="http://www.w3.org/1999/xhtml" style="font-size:40px">
             <em>I</em> like <div class="login-box" style="background-color:rgb(255, 255, 255);border-bottom-left-radius:2px;border-bottom-right-radius:2px;border-top-left-radius:2px;border-top-right-radius:2px;bottom:0px;box-shadow:rgba(0, 0, 0, 0.298039) 0px 0px 48px 0px;box-sizing:border-box;height:648px;left:0px;padding-bottom:48px;padding-left:48px;padding-right:48px;padding-top:48px;position:relative;right:0px;top:0px;width:511px;perspective-origin:255.5px 324px;transform-origin:255.5px 324px;"><div class="title" style="border-bottom-color:rgb(204, 204, 204);border-left-color:rgb(204, 204, 204);border-right-color:rgb(204, 204, 204);border-top-color:rgb(204, 204, 204);color:rgb(204, 204, 204);height:114px;outline-color:rgb(204, 204, 204);text-align:center;width:415px;column-rule-color:rgb(204, 204, 204);perspective-origin:207.5px 57px;-webkit-text-emphasis-color:rgb(204, 204, 204);-webkit-text-fill-color:rgb(204, 204, 204);-webkit-text-stroke-color:rgb(204, 204, 204);transform-origin:207.5px 57px;"><div class="logo-box" style="border-bottom-color:rgb(204, 204, 204);border-left-color:rgb(204, 204, 204);border-right-color:rgb(204, 204, 204);border-top-color:rgb(204, 204, 204);color:rgb(204, 204, 204);height:50px;margin-bottom:16px;outline-color:rgb(204, 204, 204);text-align:center;width:415px;column-rule-color:rgb(204, 204, 204);perspective-origin:207.5px 25px;-webkit-text-emphasis-color:rgb(204, 204, 204);-webkit-text-fill-color:rgb(204, 204, 204);-webkit-text-stroke-color:rgb(204, 204, 204);transform-origin:207.5px 25px;"><img src="/files/logo.svg" class="logo" style="border-bottom-color:rgb(204, 204, 204);border-left-color:rgb(204, 204, 204);border-right-color:rgb(204, 204, 204);border-top-color:rgb(204, 204, 204);color:rgb(204, 204, 204);display:inline;height:48px;outline-color:rgb(204, 204, 204);text-align:center;width:48px;column-rule-color:rgb(204, 204, 204);perspective-origin:24px 24px;-webkit-text-emphasis-color:rgb(204, 204, 204);-webkit-text-fill-color:rgb(204, 204, 204);-webkit-text-stroke-color:rgb(204, 204, 204);transform-origin:24px 24px;"></div> <h1 style="border-bottom-color:rgb(80, 213, 158);border-left-color:rgb(80, 213, 158);border-right-color:rgb(80, 213, 158);border-top-color:rgb(80, 213, 158);color:rgb(80, 213, 158);font-size:24px;font-weight:bold;height:24px;margin-bottom:8px;outline-color:rgb(80, 213, 158);text-align:center;width:415px;column-rule-color:rgb(80, 213, 158);perspective-origin:207.5px 12px;-webkit-text-emphasis-color:rgb(204, 204, 204);-webkit-text-fill-color:rgb(204, 204, 204);-webkit-text-stroke-color:rgb(204, 204, 204);transform-origin:207.5px 12px;">Welcome to Cov Xss</h1> <p style="border-bottom-color:rgb(204, 204, 204);border-left-color:rgb(204, 204, 204);border-right-color:rgb(204, 204, 204);border-top-color:rgb(204, 204, 204);color:rgb(204, 204, 204);height:16px;outline-color:rgb(204, 204, 204);text-align:center;width:415px;column-rule-color:rgb(204, 204, 204);perspective-origin:207.5px 8px;-webkit-text-emphasis-color:rgb(204, 204, 204);-webkit-text-fill-color:rgb(204, 204, 204);-webkit-text-stroke-color:rgb(204, 204, 204);transform-origin:207.5px 8px;">a simple xss platform</p></div> <div class="content" style="height:108px;padding-top:32px;width:415px;perspective-origin:207.5px 70px;transform-origin:207.5px 70px;"><div class="text-row" style="height:46px;margin-bottom:16px;width:415px;perspective-origin:207.5px 23px;transform-origin:207.5px 23px;"><div class="text-title" style="border-bottom-color:rgb(204, 204, 204);border-left-color:rgb(204, 204, 204);border-right-color:rgb(204, 204, 204);border-top-color:rgb(204, 204, 204);color:rgb(204, 204, 204);font-size:12.8px;height:13px;outline-color:rgb(204, 204, 204);width:415px;column-rule-color:rgb(204, 204, 204);perspective-origin:207.5px 6.5px;-webkit-text-emphasis-color:rgb(204, 204, 204);-webkit-text-fill-color:rgb(204, 204, 204);-webkit-text-stroke-color:rgb(204, 204, 204);transform-origin:207.5px 6.5px;">
        Username
    </div> <div class="text-input" style="height:33px;width:415px;perspective-origin:207.5px 16.5px;transform-origin:207.5px 16.5px;"><input type="text" style="background-color:rgb(255, 255, 255);border-bottom-color:rgb(228, 228, 228);border-bottom-style:solid;border-bottom-width:1px;display:inline-block;font-family:BlinkMacSystemFont;font-size:19.2px;height:32px;line-height:32px;width:415px;perspective-origin:207.5px 16.5px;transform-origin:207.5px 16.5px;"></div></div><div class="text-row" style="height:46px;margin-bottom:16px;width:415px;perspective-origin:207.5px 23px;transform-origin:207.5px 23px;"><div class="text-title" style="border-bottom-color:rgb(204, 204, 204);border-left-color:rgb(204, 204, 204);border-right-color:rgb(204, 204, 204);border-top-color:rgb(204, 204, 204);color:rgb(204, 204, 204);font-size:12.8px;height:13px;outline-color:rgb(204, 204, 204);width:415px;column-rule-color:rgb(204, 204, 204);perspective-origin:207.5px 6.5px;-webkit-text-emphasis-color:rgb(204, 204, 204);-webkit-text-fill-color:rgb(204, 204, 204);-webkit-text-stroke-color:rgb(204, 204, 204);transform-origin:207.5px 6.5px;">
        Password
    </div> <div class="text-input" style="height:33px;width:415px;perspective-origin:207.5px 16.5px;transform-origin:207.5px 16.5px;"><input type="password" style="background-color:rgb(255, 255, 255);border-bottom-color:rgb(228, 228, 228);border-bottom-style:solid;border-bottom-width:1px;display:inline-block;font-family:BlinkMacSystemFont;font-size:19.2px;height:32px;line-height:32px;width:415px;perspective-origin:207.5px 16.5px;-webkit-text-security:disc;transform-origin:207.5px 16.5px;"></div></div> <div class="info-notify" style="border-bottom-color:rgb(255, 87, 34);border-bottom-style:solid;border-bottom-width:1px;border-left-color:rgb(255, 87, 34);border-left-style:solid;border-left-width:1px;border-right-color:rgb(255, 87, 34);border-right-style:solid;border-right-width:1px;border-top-color:rgb(255, 87, 34);border-top-style:solid;border-top-width:1px;box-sizing:border-box;color:rgb(244, 67, 54);display:none;font-size:12.8px;height:auto;left:50%;outline-color:rgb(244, 67, 54);padding-bottom:8px;padding-left:8px;padding-right:8px;padding-top:8px;position:absolute;top:8px;width:415px;z-index:0;column-rule-color:rgb(244, 67, 54);perspective-origin:50% 50%;-webkit-text-emphasis-color:rgb(244, 67, 54);-webkit-text-fill-color:rgb(244, 67, 54);-webkit-text-stroke-color:rgb(244, 67, 54);transform-origin:50% 50%;">
    
</div></div> <div class="footer" style="bottom:0px;box-sizing:border-box;height:80px;left:0px;position:relative;right:0px;top:0px;width:415px;perspective-origin:207.5px 40px;transform-origin:207.5px 40px;"><div class="text-row action" style="height:48px;margin-bottom:16px;margin-top:48px;width:415px;perspective-origin:207.5px 24px;transform-origin:207.5px 24px;"><button class="login-btn" style="background-image:linear-gradient(30deg, rgb(83, 219, 157), rgb(70, 185, 174));border-bottom-color:rgb(255, 255, 255);border-bottom-left-radius:24px;border-bottom-right-radius:24px;border-left-color:rgb(255, 255, 255);border-right-color:rgb(255, 255, 255);border-top-color:rgb(255, 255, 255);border-top-left-radius:24px;border-top-right-radius:24px;bottom:0px;box-sizing:border-box;color:rgb(255, 255, 255);cursor:default;display:inline-block;font-family:BlinkMacSystemFont;font-size:19.2px;height:48px;left:0px;line-height:48px;outline-color:rgb(255, 255, 255);overflow-x:hidden;overflow-y:hidden;position:relative;right:0px;text-align:center;top:0px;transition-duration:0.3s;transition-property:opacity;width:415px;column-rule-color:rgb(255, 255, 255);align-items:flex-start;perspective-origin:207.5px 24px;-webkit-text-emphasis-color:rgb(255, 255, 255);-webkit-text-fill-color:rgb(255, 255, 255);-webkit-text-stroke-color:rgb(255, 255, 255);transform-origin:207.5px 24px;">
                SIGN IN
            </button></div> <div class="text-row toggle-action" style="border-bottom-color:rgb(69, 184, 173);border-left-color:rgb(69, 184, 173);border-right-color:rgb(69, 184, 173);border-top-color:rgb(69, 184, 173);color:rgb(69, 184, 173);cursor:pointer;height:16px;margin-bottom:16px;outline-color:rgb(69, 184, 173);text-align:center;width:415px;column-rule-color:rgb(69, 184, 173);perspective-origin:207.5px 8px;-webkit-text-emphasis-color:rgb(69, 184, 173);-webkit-text-fill-color:rgb(69, 184, 173);-webkit-text-stroke-color:rgb(69, 184, 173);transform-origin:207.5px 8px;"><span style="border-bottom-color:rgb(69, 184, 173);border-left-color:rgb(69, 184, 173);border-right-color:rgb(69, 184, 173);border-top-color:rgb(69, 184, 173);color:rgb(69, 184, 173);cursor:pointer;display:inline;height:auto;outline-color:rgb(69, 184, 173);text-align:center;width:auto;column-rule-color:rgb(69, 184, 173);perspective-origin:0px 0px;-webkit-text-emphasis-color:rgb(69, 184, 173);-webkit-text-fill-color:rgb(69, 184, 173);-webkit-text-stroke-color:rgb(69, 184, 173);transform-origin:0px 0px;">sign up</span></div></div></div> <canvas id="canvas" style="border-bottom-style:solid;border-bottom-width:2px;border-left-style:solid;border-left-width:2px;border-right-style:solid;border-right-width:2px;border-top-style:solid;border-top-width:2px;display:inline;height:200px;width:400px;perspective-origin:202px 102px;transform-origin:202px 102px;" width="400" height="200"></canvas></div>

           </foreignObject>
           </svg>`
           // rasterizeHTML.drawHTML(document.getElementById('app').innerHTML, this.canvas);
             // rasterizeHTML.drawURL('http://127.0.0.1:8080/login', this.canvas)
             //  .then(function success(renderResult) {
             //        console.log(renderResult)
             //        document.body.innerHTML += renderResult.svg
             //  }, function error(e) {
             //      console.log(e)
             //  });
        console.log(document.getElementsByClassName('footer')[0].innerHTML)

        var DOMURL = window.URL || window.webkitURL || window;

        var img = new Image();
        var svg = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
        var url = DOMURL.createObjectURL(svg);

        img.onload = () => {
            console.log('load')
            this.ctx.drawImage(img, 0, 0)
            DOMURL.revokeObjectURL(url)
            let aa = document.createElement('div')
            aa.innerHTML = document.getElementById('app').innerHTML
            document.body.appendChild(this.canvas)
            document.body.appendChild(aa)
        }

        img.src = url;
    }
}

export default Cov