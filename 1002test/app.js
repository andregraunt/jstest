function  main() {
	const canvas=document.querySelector('#c')
	//3 musts
	const fov = 50
	
	//const aspect = 2
	const aspect = canvas.clientWidth / canvas.clientHeight
	const near = 0.1
	const far = 2000
	
	const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
	
	const renderer= new THREE.WebGLRenderer({canvas})
	const width=canvas.clientWidth
	const heigth=canvas.clientHeight
	renderer.setSize(width, heigth)
	
	const scene= new THREE.Scene()
	const loader= new THREE.TextureLoader()
	const texture =loader.load(
	'https://threejs.org/manual/examples/resources/images/equirectangularmaps/tears_of_steel_bridge_2k.jpg',
	()=>{
		scene.background=texture
	}
	
	)
	function render() {
		renderer.render(scene, camera)
		requestAnimationFrame(render)
		
	}
	requestAnimationFrame(render)
}

main()