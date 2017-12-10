// Vue.config.devtools = true;

var app = new Vue({
    el: '#app',
    data: {
        sName: 'Falana Dhimka',
        sClass: '4th Year',
        sStream: 'CSE',
        sRollno: '11',
        sUnirollno: 'GCECTB-R14-3011',
        sUniregno: '141130110011 of 2014-15',
        sSubject: 'CS400 History Of Computing'
    },
    methods: {
        generateSVG: function (event) {
            let svg = this.$refs.pageSVG;
            let dlink = this.$refs.downloadLink;
            if (!svg || !dlink) {
                console.log("references missing");
                return
            }
            dlink.href = 'data:image/svg+xml;utf8,' + unescape(svg.outerHTML);
            dlink.download = 'coverPage.svg';
            dlink.target = '_blank';
        },
        generatePNG: function (event) {
            let svgText = this.$refs.pageSVG.outerHTML;
            let myCanvas = this.$refs.canvas;
            let ctxt = myCanvas.getContext('2d');

            function drawInlineSVG(ctx, rawSVG, callback) {
                var svg = new Blob([rawSVG], { type: "image/svg+xml;charset=utf-8" }),
                    domURL = self.URL || self.webkitURL || self,
                    url = domURL.createObjectURL(svg),
                    img = new Image;

                img.onload = function () {
                    ctx.drawImage(this, 0, 0);
                    domURL.revokeObjectURL(url);
                    callback(this);
                };

                img.src = url;
            }

            drawInlineSVG(ctxt, svgText, () => {
                let dlink = this.$refs.downloadLink;
                dlink.href = myCanvas.toDataURL();
                dlink.download = 'coverPage.png';
                dlink.target = '_blank';
            });
        }
    }
})
/*
var svgText = document.getElementById("myViewer").outerHTML;
            var myCanvas = document.getElementById("canvas");
var ctxt = myCanvas.getContext("2d");

function drawInlineSVG(ctx, rawSVG, callback) {

    var svg = new Blob([rawSVG], {type:"image/svg+xml;charset=utf-8"}),
        domURL = self.URL || self.webkitURL || self,
        url = domURL.createObjectURL(svg),
        img = new Image;

    img.onload = function () {
        ctx.drawImage(this, 0, 0);
        domURL.revokeObjectURL(url);
        callback(this);
    };

    img.src = url;
}

// usage:
drawInlineSVG(ctxt, svgText, function() {
    console.log(canvas.toDataURL());  // -> PNG
    alert("see console for output...");
});
*/