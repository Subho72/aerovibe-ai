import os
import shutil

# Local system paths
brain_dir = r"C:\Users\saiva\.gemini\antigravity\brain\6ac55659-4f22-4d8e-90a1-3cd13d29909b"
dest_dir = r"C:\Users\saiva\.gemini\antigravity\scratch\aerovibe-ai"

# Dictionary mapping local file names to relative file names in workspace
assets = {
    "aerovibe_hero_twin_1783609884025.jpg": "aerovibe_hero_twin.jpg",
    "aerovibe_hardware_module_1784019807186.jpg": "aerovibe_hardware_module.jpg",
    "aerovibe_hardware_setup_1784020945656.jpg": "aerovibe_hardware_setup.jpg",
    "aerovibe_workflow_1783677984038.jpg": "aerovibe_workflow.jpg",
    "aerovibe_architecture_1783678026070.jpg": "aerovibe_architecture.jpg",
    "aerovibe_dashboard_1783678049354.jpg": "aerovibe_dashboard.jpg",
    "aerovibe_detailed_architecture_1783873377939.jpg": "aerovibe_detailed_architecture.jpg",
    "aerovibe_detailed_tech_stack_1783959511650.jpg": "aerovibe_detailed_tech_stack.jpg",
    "aerovibe_edge_ai_flow_1783934877533.jpg": "aerovibe_edge_ai_flow.jpg",
    "aerovibe_grid_dashboard_1783956304162.jpg": "aerovibe_grid_dashboard.jpg",
    "aerovibe_innovation_1783960647015.jpg": "aerovibe_innovation.jpg",
    "aerovibe_premium_simple_dashboard_1783956229157.jpg": "aerovibe_premium_simple_dashboard.jpg",
    "aerovibe_process_flow_1783934682677.jpg": "aerovibe_process_flow.jpg",
    "aerovibe_simple_dashboard_1783955947870.jpg": "aerovibe_simple_dashboard.jpg",
    "aerovibe_tech_stack_1783956414423.jpg": "aerovibe_tech_stack.jpg"
}

print("Searching and migrating image assets to local workspace...")
copied_count = 0
for src_name, dest_name in assets.items():
    src_path = os.path.join(brain_dir, src_name)
    dest_path = os.path.join(dest_dir, dest_name)
    if os.path.exists(src_path):
        shutil.copy2(src_path, dest_path)
        print(f"[OK] Migrated {src_name} -> {dest_name}")
        copied_count += 1
    else:
        print(f"[FAIL] Missing in brain: {src_name}")

print(f"\nMigration complete. {copied_count} assets successfully copied to: {dest_dir}")
