import BABYLON from "babylonjs";
import "babylonjs-loaders";

let canvas: HTMLElement | null;
const GOLD = new BABYLON.Color3(0.776, 0.554, 0.241);

function createEngine() {
    canvas = document.getElementById("canva");
    const engine = new BABYLON.Engine(canvas as HTMLCanvasElement, true);
    return engine;
}

function createScene(engine: BABYLON.Engine) {
    const scene = new BABYLON.Scene(engine);
    const camera = new BABYLON.ArcRotateCamera(
        "camera",
        1,
        1,
        13,
        BABYLON.Vector3.Zero(),
        scene
    );
    camera.attachControl(canvas as HTMLCanvasElement, true);
    const light = new BABYLON.HemisphericLight(
        "light1",
        new BABYLON.Vector3(0, 1, 0),
        scene
    );
    const spot = new BABYLON.PointLight(
        "spot1",
        new BABYLON.Vector3(0.5, -0.5, -0.5),
        scene
    );
    new BABYLON.Debug.AxesViewer(scene, 10);
    BABYLON.MeshBuilder.CreateBox(
        "outbox",
        {
            width: 2,
            height: 2,
            depth: 2,
            size: 
        },
        scene
    );
    return scene;
}

function createBungMaterial(scene: BABYLON.Scene) {
    const mat = new BABYLON.StandardMaterial("myMaterial", scene);
    mat.diffuseColor = GOLD;
    mat.specularColor = GOLD;
    mat.specularPower = 0.1;
    return mat;
}

function loadMesh(scene: BABYLON.Scene) {
    BABYLON.SceneLoader.ImportMesh(
        "",
        "./models/",
        "clean_bottle_m.babylon",
        scene,
        newMeshes => {
            for (let m of newMeshes) {
                console.log(m);
                m.scaling = new BABYLON.Vector3(0.7, 0.7, 0.7);
                switch (m.id) {
                    case "bung":
                        m.material = createBungMaterial(scene);
                        break;
                }
            }
        }
    );
}

(function() {
    const engine = createEngine();
    const scene = createScene(engine);
    loadMesh(scene);
    engine.runRenderLoop(function() {
        scene.render();
    });
    document.addEventListener("resize", () => {
        scene.render();
    });
})();
