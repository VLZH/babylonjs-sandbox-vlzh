import BABYLON from "babylonjs";
import "babylonjs-loaders";

function createEngine() {
    const canvas = document.getElementById("canva");
    const engine = new BABYLON.Engine(canvas as HTMLCanvasElement, true);
    return engine;
}

function createScene(engine: BABYLON.Engine) {
    var scene = new BABYLON.Scene(engine);
    var camera = new BABYLON.FreeCamera(
        "camera",
        new BABYLON.Vector3(0, 5, -10),
        scene
    );
    camera.setTarget(BABYLON.Vector3.Zero());
    var light = new BABYLON.HemisphericLight(
        "light1",
        new BABYLON.Vector3(0, 1, 0),
        scene
    );
    return scene;
}

function loadMesh(scene: BABYLON.Scene) {
    BABYLON.SceneLoader.ImportMesh(
        "",
        "./models/",
        "clean_bottle_m.babylon",
        scene,
        newMeshes => {
            for (let m of newMeshes) {
                m.scaling = new BABYLON.Vector3(0.7, 0.7, 0.7);
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
