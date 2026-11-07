"""Build Morgan's original concept sculpture without clearing an existing scene.

Run from the project root:
    blender --background --python scripts/generate-signal-engine.py

Optional Blender script arguments (after ``--``): ``--cpu`` or ``--skip-render``.
Cycles uses an available GPU when possible and otherwise falls back to the CPU.
FFmpeg, when installed on PATH, converts the transparent PNG to the public WebP.
The GLB contains only this sculpture. This concept is not project evidence.
"""

import argparse
import json
import math
from pathlib import Path
import shutil
import subprocess
import sys

import bpy
from mathutils import Vector


ROOT = Path(__file__).resolve().parents[1]
PNG_PATH = ROOT / "artifacts" / "lab-signal-engine-01.png"
WEBP_PATH = ROOT / "public" / "images" / "lab-signal-engine-01.webp"
GLB_PATH = ROOT / "public" / "models" / "lab-signal-engine-01.glb"
BLEND_PATH = ROOT / "artifacts" / "lab-signal-engine.blend"


def linear_color(hex_color):
    """Convert the project's sRGB colors to Blender shader input values."""
    channels = [int(hex_color[index:index + 2], 16) / 255 for index in (0, 2, 4)]
    return tuple(
        value / 12.92 if value <= 0.04045 else ((value + 0.055) / 1.055) ** 2.4
        for value in channels
    ) + (1.0,)


def make_material(name, color, metallic=0.0, roughness=0.35):
    material = bpy.data.materials.new(name)
    material.use_nodes = True
    principled = next(node for node in material.node_tree.nodes if node.type == "BSDF_PRINCIPLED")
    principled.inputs["Base Color"].default_value = linear_color(color)
    principled.inputs["Metallic"].default_value = metallic
    principled.inputs["Roughness"].default_value = roughness
    material.diffuse_color = linear_color(color)
    return material


def build_sculpture(scene):
    porcelain = make_material("MDL | porcelain", "E8EAE5", 0.05, 0.42)
    silver = make_material("MDL | satin aluminium", "ABB6BF", 0.82, 0.34)
    navy = make_material("MDL | ink graphite", "0D1B2A", 0.5, 0.32)
    orange = make_material("MDL | signal enamel", "E66A21", 0.05, 0.39)
    rubber = make_material("MDL | graphite elastomer", "202B35", 0.05, 0.45)
    copper = make_material("MDL | copper contacts", "C89969", 0.8, 0.28)

    root = bpy.data.objects.new("SIGNAL ENGINE | concept assembly", None)
    scene.collection.objects.link(root)

    def finish(obj, name, material, bevel=0.04, segments=4):
        obj.name = name
        obj.data.materials.append(material)
        obj.parent = root
        if bevel:
            modifier = obj.modifiers.new("Machined edge radii", "BEVEL")
            modifier.width = bevel
            modifier.segments = segments
            obj.modifiers.new("Face weighted normals", "WEIGHTED_NORMAL")
        return obj

    def box(name, location, dimensions, material, bevel=0.04, segments=4):
        bpy.ops.mesh.primitive_cube_add(size=1, location=location)
        obj = bpy.context.object
        obj.dimensions = dimensions
        bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
        return finish(obj, name, material, bevel, segments)

    def cylinder(name, location, radius, depth, material, rotation=None, bevel=0.01, segments=4):
        bpy.ops.mesh.primitive_cylinder_add(vertices=32, radius=radius, depth=depth, location=location)
        obj = bpy.context.object
        if rotation:
            obj.rotation_euler = rotation
        return finish(obj, name, material, bevel, segments)

    def ring(name, z, outer, inner, depth, material, bevel=0.055):
        vertices = []
        for height in (z - depth / 2, z + depth / 2):
            for size in (outer, inner):
                for x, y in ((-1, -1), (1, -1), (1, 1), (-1, 1)):
                    vertices.append((x * size / 2, y * size / 2, height))
        faces = []
        for index in range(4):
            following = (index + 1) % 4
            faces.extend([
                (index, following, 8 + following, 8 + index),
                (4 + following, 4 + index, 12 + index, 12 + following),
                (8 + index, 8 + following, 12 + following, 12 + index),
                (following, index, 4 + index, 4 + following),
            ])
        mesh = bpy.data.meshes.new(name)
        mesh.from_pydata(vertices, [], faces)
        mesh.update()
        obj = bpy.data.objects.new(name, mesh)
        scene.collection.objects.link(obj)
        return finish(obj, name, material, bevel)

    box("01 | ceramic foundation", (0, 0, 0.05), (2.55, 2.55, 0.22), porcelain, 0.13)
    box("02 | graphite foundation seam", (0, 0, 0.19), (2.32, 2.32, 0.055), rubber, 0.08)
    ring("03 | floating lower CNC frame", 0.58, 2.35, 1.87, 0.16, silver, 0.025)
    box("04 | graphite intelligence core", (0, 0, 1.02), (1.78, 1.78, 0.53), navy, 0.065)
    box("05 | enamel die cap", (0, 0, 1.315), (1.28, 1.28, 0.09), orange, 0.075)
    ring("06 | upper ceramic enclosure", 1.8, 2.45, 1.68, 0.25, porcelain, 0.045)
    ring("07 | thin aluminium cap lip", 1.957, 2.32, 1.82, 0.045, silver)
    ring("08 | raised signal collar", 2.33, 1.58, 1.2, 0.14, orange, 0.035)

    for x in (-0.98, 0.98):
        for y in (-0.98, 0.98):
            cylinder("Isolation standoff", (x, y, 0.38), 0.055, 0.24, silver)
            cylinder("Upper cap socket", (x, y, 1.95), 0.065, 0.045, navy)
            box("Fastener slot", (x, y, 1.981), (0.065, 0.012, 0.008), silver, 0.002)

    for index in range(17):
        position = -0.64 + index * 0.08
        box("Core front heat spreader", (position, -0.9, 1.01), (0.032, 0.12, 0.35), silver, 0.009)
        box("Core side contact", (0.9, position, 1.035), (0.1, 0.035, 0.2), copper, 0.008)

    for index in range(10):
        box("PCB underside contact", (-1.01, -0.63 + index * 0.14, 0.258), (0.25, 0.07, 0.02), copper, 0.005)
    for index in range(5):
        box("Enclosure ventilation", (1.16, -0.51 + index * 0.255, 1.795), (0.017, 0.14, 0.065), navy, 0.008)

    curve = bpy.data.curves.new("Signal cable routing", "CURVE")
    curve.dimensions = "3D"
    curve.resolution_u = 32
    curve.bevel_depth = 0.09
    curve.bevel_resolution = 5
    spline = curve.splines.new("BEZIER")
    points = [
        (-0.82, -0.08, 2.4), (-1.55, -0.12, 2.8), (-1.95, -0.02, 1.8),
        (-1.55, 0.16, 0.45), (-0.5, 0.38, -0.32), (1.14, 0.46, -0.28),
        (1.78, 0.47, 0.6), (1.67, 0.44, 1.53), (1.14, 0.4, 2.1),
    ]
    spline.bezier_points.add(len(points) - 1)
    for point, coordinate in zip(spline.bezier_points, points):
        point.co = coordinate
        point.handle_left_type = "AUTO"
        point.handle_right_type = "AUTO"
    cable = bpy.data.objects.new("09 | continuous orange signal cable", curve)
    scene.collection.objects.link(cable)
    cable.data.materials.append(orange)
    cable.parent = root
    cylinder("Cable socket left", (-0.8, -0.07, 2.36), 0.14, 0.22, rubber, (0, math.pi / 2, 0))
    cylinder("Cable socket right", (1.15, 0.4, 2.08), 0.14, 0.22, silver, (0, math.pi / 2, 0))

    for x in (-1.065, 1.065):
        for y in (-1.065, 1.065):
            cylinder("Precision steel fastener", (x, y, 1.995), 0.055, 0.027, silver, bevel=0.005, segments=3)
            box("Fastener head slot", (x, y, 2.011), (0.061, 0.009, 0.003), rubber, 0.002, 3)
    for index in range(7):
        box("Enclosure etched calibration", (-0.49 + index * 0.08, -1.119, 1.983),
            (0.008, 0.06 if index % 3 else 0.1, 0.002), navy, 0.001, 3)
    box("Enclosure blank identification insert", (0.62, -1.119, 1.984), (0.28, 0.08, 0.003), navy, 0.006, 3)
    root.rotation_euler.z = math.radians(-12)
    return root


def setup_studio(scene):
    world = bpy.data.worlds.new("MDL | soft studio")
    world.use_nodes = True
    background = next(node for node in world.node_tree.nodes if node.type == "BACKGROUND")
    background.inputs["Color"].default_value = (0.7, 0.75, 0.8, 1)
    background.inputs["Strength"].default_value = 0.45
    scene.world = world

    def area(name, location, power, size):
        data = bpy.data.lights.new(name, "AREA")
        data.energy = power
        data.shape = "DISK"
        data.size = size
        obj = bpy.data.objects.new(name, data)
        scene.collection.objects.link(obj)
        obj.location = location
        obj.rotation_euler = (Vector((0, 0, 1)) - obj.location).to_track_quat("-Z", "Y").to_euler()

    area("Studio key", (1, -4, 7), 850, 5)
    area("Studio fill", (-4, -1, 3), 500, 4)
    area("Studio rim", (3, 5, 5), 1000, 3)
    data = bpy.data.cameras.new("MDL | product camera")
    camera = bpy.data.objects.new("MDL | product camera", data)
    scene.collection.objects.link(camera)
    camera.location = (5.5, -8.5, 5.7)
    camera.rotation_euler = (Vector((-0.05, 0, 1.05)) - camera.location).to_track_quat("-Z", "Y").to_euler()
    data.type = "ORTHO"
    data.ortho_scale = 5.2
    scene.camera = camera


def configure_render(scene, cpu=False):
    scene.render.engine = "CYCLES"
    scene.cycles.samples = 96
    scene.cycles.use_denoising = True
    scene.cycles.device = "CPU"
    if not cpu:
        preferences = bpy.context.preferences.addons.get("cycles")
        if preferences:
            preferences = preferences.preferences
            # Choose a backend from the identifiers this Blender exposes.
            backends = [item.identifier for item in preferences.bl_rna.properties["compute_device_type"].enum_items]
            for backend in ("OPTIX", "CUDA", "HIP", "METAL", "ONEAPI"):
                if backend not in backends:
                    continue
                try:
                    preferences.compute_device_type = backend
                    preferences.get_devices()
                    devices = [device for device in preferences.devices if device.type == backend]
                    if devices:
                        for device in preferences.devices:
                            device.use = device in devices
                        scene.cycles.device = "GPU"
                        break
                except (TypeError, RuntimeError):
                    continue
    scene.render.resolution_x = 1600
    scene.render.resolution_y = 1600
    scene.render.resolution_percentage = 100
    scene.render.film_transparent = True
    scene.render.image_settings.file_format = "PNG"
    scene.render.image_settings.color_mode = "RGBA"
    scene.render.image_settings.color_depth = "8"
    scene.view_settings.view_transform = "Standard"
    scene.view_settings.exposure = -0.55
    scene.render.filepath = str(PNG_PATH)


def export_optimized_glb(scene, root):
    """Bake temporary copies and merge by material: six static draw calls.

    The authored hierarchy and the poster's geometry remain intact. Applied
    modifiers and preserved mesh data keep bevels and weighted normals in the
    exported copies; world transforms preserve the exploded layer positions.
    """
    collection = bpy.data.collections.new("MDL | temporary optimized export")
    scene.collection.children.link(collection)
    copies = []
    try:
        bpy.context.view_layer.update()
        depsgraph = bpy.context.evaluated_depsgraph_get()
        groups = {}
        for original in root.children_recursive:
            if original.type not in {"MESH", "CURVE"}:
                continue
            evaluated = original.evaluated_get(depsgraph)
            mesh = bpy.data.meshes.new_from_object(
                evaluated, preserve_all_data_layers=True, depsgraph=depsgraph,
            )
            clone = bpy.data.objects.new("Export | " + original.name, mesh)
            collection.objects.link(clone)
            clone.matrix_world = original.matrix_world.copy()
            copies.append(clone)
            # Each authored part uses exactly one material.
            material = mesh.materials[0] if mesh.materials else None
            key = material.name if material else "unassigned"
            groups.setdefault(key, []).append(clone)

        for obj in scene.objects:
            obj.select_set(False)
        merged = []
        for material_name, objects in groups.items():
            for obj in objects:
                obj.select_set(True)
            active = objects[0]
            bpy.context.view_layer.objects.active = active
            with bpy.context.temp_override(
                active_object=active, object=active,
                selected_objects=objects, selected_editable_objects=objects,
            ):
                bpy.ops.object.join()
            active.name = "SIGNAL ENGINE | " + material_name
            merged.append(active)
            active.select_set(False)

        for obj in merged:
            obj.select_set(True)
        bpy.context.view_layer.objects.active = merged[0]
        # Active-scene filtering excludes selections in the user's other scene.
        bpy.ops.export_scene.gltf(
            filepath=str(GLB_PATH), export_format="GLB", use_selection=True,
            use_active_scene=True, export_apply=True,
            export_cameras=False, export_lights=False,
        )
        return len(merged)
    finally:
        # Delete only newly created export copies; never the authored sculpture.
        for obj in list(collection.objects):
            mesh = obj.data
            bpy.data.objects.remove(obj, do_unlink=True)
            if mesh and mesh.users == 0:
                bpy.data.meshes.remove(mesh)
        bpy.data.collections.remove(collection)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--cpu", action="store_true", help="Use Cycles CPU rendering.")
    parser.add_argument("--skip-render", action="store_true", help="Rebuild GLB and blend without rendering the poster.")
    options = parser.parse_args(sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else [])
    for output in (PNG_PATH, WEBP_PATH, GLB_PATH, BLEND_PATH):
        output.parent.mkdir(parents=True, exist_ok=True)

    window = bpy.context.window
    previous_scene = window.scene if window else None
    scene = bpy.data.scenes.new("MORGAN | Signal engine | original concept")
    try:
        if window:
            window.scene = scene
        with bpy.context.temp_override(scene=scene, view_layer=scene.view_layers[0]):
            root = build_sculpture(scene)
            setup_studio(scene)
            configure_render(scene, options.cpu)
            if not options.skip_render:
                bpy.ops.render.render(write_still=True, scene=scene.name)
                ffmpeg = shutil.which("ffmpeg")
                if ffmpeg:
                    subprocess.run([
                        ffmpeg, "-y", "-i", str(PNG_PATH), "-c:v", "libwebp",
                        "-q:v", "85", "-compression_level", "6", str(WEBP_PATH),
                    ], check=True, capture_output=True)
                else:
                    print("FFmpeg is unavailable: PNG rendered; install FFmpeg to produce the WebP automatically.")

            export_meshes = export_optimized_glb(scene, root)
            # Write only the new scene and its dependencies. Do not save over,
            # rename, or include the user's current working blend file.
            bpy.data.libraries.write(str(BLEND_PATH), {scene}, fake_user=True)
            print(json.dumps({
                "provenance": "self-authored-3d", "role": "concept / not project evidence",
                "png": str(PNG_PATH), "webp": str(WEBP_PATH),
                "glb": str(GLB_PATH), "blend": str(BLEND_PATH),
                "sculpture_objects": len(root.children_recursive),
                "export_meshes": export_meshes,
                "glb_bytes": GLB_PATH.stat().st_size,
            }, ensure_ascii=False))
    finally:
        if window and previous_scene:
            window.scene = previous_scene


if __name__ == "__main__":
    main()
