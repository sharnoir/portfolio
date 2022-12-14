var RippleEffect = function (e) {
    var n, t = 0,
        i = (n = 1) + (2 - n) * Math.random();
    const a = e.parent || console.warn("no parent!"),
        o = e.intensity || 1,
        r = e.strength || 2,
        s = e.area || 6,
        m = e.waveSpeed || .01,
        v = e.speedIn || 1.4,
        c = e.speedOut || 1.2;
    var u = e.texture || console.error("no texture!"),
        l = void 0 === e.hover || e.hover,
        d = e.easing || "Expo.easeOut";
    const p = new THREE.Scene,
        f = new THREE.OrthographicCamera(a.offsetWidth / -2, a.offsetWidth / 2, a.offsetHeight / 2, a.offsetHeight / -2, 1, 1e3);
    f.position.z = 1;
    const g = new THREE.WebGLRenderer({
        antialias: !1
    });
    g.setPixelRatio(window.devicePixelRatio), g.setClearColor(16777215, 0), g.setSize(a.offsetWidth, a.offsetHeight), a.appendChild(g.domElement);
    const h = new THREE.TextureLoader;
    h.crossOrigin = "";
    u = h.load(u);
    var w = h.load(w);
    u.minFilter = THREE.LinearFilter, u.anisotropy = g.getMaxAnisotropy();
    const x = new THREE.ShaderMaterial({
            uniforms: {
                time: {
                    type: "f",
                    value: 0
                },
                image: {
                    type: "t",
                    value: u
                },
                image2: {
                    type: "t",
                    value: w
                },
                mouseOver: {
                    type: "f",
                    value: 0
                },
                intensity: {
                    type: "f",
                    value: o * i
                },
                strength: {
                    type: "f",
                    value: r * i
                },
                area: {
                    type: "f",
                    value: s * i
                },
                waveSpeed: {
                    type: "f",
                    value: m * i
                }
            },
            vertexShader: "\n        varying vec2 vUv;\n        \n        void main() {\n            vUv = uv;\n            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n        }\n    ",
            fragmentShader: "\n        uniform sampler2D image;\n        uniform sampler2D image2;\n        uniform float time;\n        uniform float mouseOver;\n        uniform float intensity;\n        uniform float strength;\n        uniform float area;\n        uniform float waveSpeed;\n        varying vec2 vUv;\n\n        #define NUM_OCTAVES 5\n\n        float rand(vec2 n) { \n            return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);\n        }\n\n        float noise(vec2 p) {\n            vec2 ip = floor(p);\n            vec2 u = fract(p);\n            u = u*u*(3.0-2.0*u);\n            \n            float res = mix(\n                mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),\n                mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);\n            return res*res;\n        }\n\n        float fbm(vec2 x) {\n            float v = 0.0;\n            float a = 0.5;\n            vec2 shift = vec2(100);\n            // Rotate to reduce axial bias\n            mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));\n            for (int i = 0; i < NUM_OCTAVES; ++i) {\n                v += a * noise(x);\n                x = rot * x * 2.0 + shift;\n                a *= 0.5;\n            }\n            return v;\n        }\n\n        void main(void) {\n            vec2 uv = vUv;\n            \n            vec2 surface = strength * vec2(\n                mix(-0.1, 0.2, fbm(5.*uv + waveSpeed * time)),\n                mix(-0.1, 0.2, fbm(5.*uv + waveSpeed * time))\n            );\n\n            uv += mouseOver * intensity * refract(\n                vec2(0, 0), \n                surface, \n                1.0 / 1.333\n            );\n\n            vec3 _texture = texture2D(image, uv).rgb;\n            gl_FragColor = vec4(_texture,1.0);\n            \n            // enable this to change between images\n            // vec3 _texture2 = texture2D(image2, uv).rgb;\n            // vec3 final_texture = mix(_texture, _texture2, mouseOver);\n            // gl_FragColor = vec4(final_texture,1.0);\n            \n        }   \n    ",
            transparent: !0
        }),
        b = new THREE.PlaneBufferGeometry(a.offsetWidth, a.offsetHeight, 1),
        y = new THREE.Mesh(b, x);
    p.add(y), l && function () {
        const e = "mouseenter",
            n = "mouseleave";
        var t, i;
        i = !1, t = navigator.userAgent || navigator.vendor || window.opera, (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(t) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0, 4))) && (i = !0), i && (e = "touchstart", n = "touchend"), a.addEventListener(e, function (e) {
            gsap.to(x.uniforms.mouseOver, {
                duration: v,
                value: 1,
                ease: d
            })
        }), a.addEventListener(n, function (e) {
            gsap.to(x.uniforms.mouseOver, {
                duration: c,
                value: 0,
                ease: d
            })
        })
    }(), window.addEventListener("resize", function (e) {
        g.setSize(a.offsetWidth, a.offsetHeight)
    }), this.start = function () {
        gsap.to(x.uniforms.mouseOver, {
            duration: v,
            value: 1,
            ease: d
        })
    }, this.stop = function () {
        gsap.to(x.uniforms.mouseOver, {
            duration: c,
            value: 0,
            ease: d
        })
    };
    const k = function () {
        t++, x.uniforms.time.value = t, requestAnimationFrame(k), g.render(p, f)
    };
    k()
};