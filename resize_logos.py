from PIL import Image
import os

def resize_logos():
    # Check if generated-logos folder exists
    if not os.path.exists("generated-logos"):
        print("No generated-logos folder found. Run generate_logo.py first.")
        return
    
    # Get the first logo to resize (change this number to use a different logo)
    logo_path = "generated-logos/kinder-brain-logo-4.png"  # ← Change to 2, 3, or 4 if you prefer another
    
    sizes = {
        "favicon-16x16.png": (16, 16),
        "favicon-32x32.png": (32, 32), 
        "apple-touch-icon.png": (180, 180),
        "logo-social.jpg": (1200, 630),
        "brain-logo.png": (512, 512)  # Main logo for website
    }
    
    # Create public folder if it doesn't exist
    os.makedirs("public", exist_ok=True)
    
    original = Image.open(logo_path)
    
    for filename, size in sizes.items():
        resized = original.resize(size, Image.Resampling.LANCZOS)
        
        # Convert to RGB for JPG files
        if filename.endswith('.jpg'):
            if resized.mode in ('RGBA', 'LA'):
                # Create a white background for transparent images
                background = Image.new('RGB', size, (255, 255, 255))
                background.paste(resized, mask=resized.split()[-1])
                resized = background
        
        resized.save(f"public/{filename}")
        print(f"Created public/{filename}")
    
    print("\nAll logo sizes created in public/ folder!")
    print("Update your index.html to use these new logos.")

if __name__ == "__main__":
    resize_logos()