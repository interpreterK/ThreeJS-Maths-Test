//threejs init
const Scene = new THREE.Scene()
const Camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, .1, 1000)
const Renderer = new THREE.WebGLRenderer()
Renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(Renderer.domElement)
//Classes
const New = {
	Object: function(BoxGeometry, MeshMaterial) {
		const Geometry = new THREE.BoxGeometry(...BoxGeometry)
		const Material = new THREE.MeshBasicMaterial(...MeshMaterial) 
		const Inst = new THREE.Mesh(Geometry, Material)
		Scene.add(Inst)	
		return {Geometry:Geometry,Material:Material,Inst:Inst}
	},
	Light: function(Color) {
		const Light = new THREE.PointLight(Color, 0.8, 18)
		Light.position.set(-3,6,-3)
		Scene.add(Light)
		return {Inst:Light}
	}
}
const Lazy_math = { //This makes lines & things smoler
	Rot_add: function(Obj, x, y, z) {
		const [x1,x2,x3] = [Obj.rotation.x, Obj.rotation.y, Obj.rotation.z]
		const args = [x && x || Obj.rotation.x, y && y || Obj.rotation.y, z && z || Obj.rotation.z]
		Obj.rotation.set(x1+args[0],x2+args[1],x3+args[2])
	},
	Vector3: function(Obj, x, y, z, xx, xy, xz) {
		const [x1,x2,x3] = [xx && xx || Obj.position.x, xy && xy || Obj.position.y, xz && xz || Obj.position.z]
		const args = [x && x || 0, y && y || 0, z && z || 0]
		Obj.position.set(x1+args[0],x2+args[1],x3+args[2])
	}
}
const Color = {
	rgb: function(r, g, b) {
		function toHex(c) {
			var hex = c.toString(16);
			return hex.length == 1?"0"+hex:hex;
		}
		return "0x"+toHex(r)+toHex(g)+toHex(b);
	}
}
//Functions
function assert(cond, __error__) {
	if (!cond) 
	throw __error__
}
function assert_type(cond, __error__, __type__) {
	if (!cond || typeof cond != __type__) 
	throw __error__
}
function RawPosition(Obj) {
	return [Obj.x,Obj.y,Obj.z]
}
//Variables
let cout = 0
const {cos, sin, PI:pi} = Math
const print = console.log

const Cube_Instance = New.Object([2,2,2],[{color:0x0000ff}])
const Floor_Instance = New.Object([10,10,10,10],[{color:0x595959}])
const Cube2_Instance = New.Object([1.5,1.5,1.5],[{color:0xff0000}])
const [Cube, Floor, Cube2] = [
	Cube_Instance.Inst,
	Floor_Instance.Inst,
	Cube2_Instance.Inst
]
const Light = New.Light(0xffffff).Inst
var keyboard = {}
//threejs
Camera.position.z = 0
Floor.rotation.x -= pi/2 //deg(90) (No Math.deg?)
Lazy_math.Vector3(Floor, 0,-8,0)

function Animate() {
	requestAnimationFrame(Animate)
	cout += .1/100
	//Lazy_math.Rot_add(Cube, cos(cout*5)/1e2,sin(cout*5)/1e2)
	Lazy_math.Vector3(Cube, 0,cos(cout*10)/150,0)
	Lazy_math.Vector3(Cube2, 0,cos(cout*30)/50,sin(cout*30)/50)
	Lazy_math.Vector3(Camera, sin(cout*30)/5,0,cos(cout*30)/5,...RawPosition(Cube.position))
	Camera.lookAt(...RawPosition(Cube.position))

	if (keyboard["w"]) {
		
	}
	if (keyboard["a"]) {

	}
	if (keyboard["s"]) {
		
	}
	if (keyboard["d"]) {
		
	}
	Renderer.render(Scene, Camera)
}
Animate()

window.addEventListener("keydown", function(e){keyboard[e.key] = true})
window.addEventListener("keyup", function(e){keyboard[e.key] = false})
window.addEventListener("mousemove", function(e){

})